import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "./jwtAuthConfig";
import UserModel from "../../user/models/UserModel.js";
import Keycloak from "keycloak-js";

const defaultAuthContext = {
  keycloak: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  updateUser: null,
  signIn: null,
  signUp: null,
  signOut: null,
  refreshToken: null,
  setIsLoading: () => {},
  authStatus: "configuring",
};
export const JwtAuthContext = createContext(defaultAuthContext);

const initOption = {
  url: config.authUrl,
  realm: config.realm,
  clientId: config.clientId,
};

function JwtAuthProvider(props) {
  const [keycloak, setKeycloak] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState("configuring");
  const { children } = props;
  /**
   * Handle sign-in success
   */
  const handleSignInSuccess = useCallback((userData, accessToken) => {
    setSession(accessToken);
    setIsAuthenticated(true);
    setUser(userData);
  }, []);
  /**
   * Handle sign-up success
   */
  const handleSignUpSuccess = useCallback((userData, accessToken) => {
    setSession(accessToken);
    setIsAuthenticated(true);
    setUser(userData);
  }, []);
  /**
   * Handle sign-in failure
   */
  const handleSignInFailure = useCallback((error) => {
    resetSession();
    setIsAuthenticated(false);
    setUser(null);
    handleError(error);
  }, []);
  /**
   * Handle sign-up failure
   */
  const handleSignUpFailure = useCallback((error) => {
    resetSession();
    setIsAuthenticated(false);
    setUser(null);
    handleError(error);
  }, []);
  /**
   * Handle error
   */
  const handleError = useCallback((_error) => {
    resetSession();
    setIsAuthenticated(false);
    setUser(null);
  }, []);
  // Set session
  const setSession = useCallback((accessToken) => {
    if (accessToken) {
      localStorage.setItem(config.jwtTokenStorageKey, accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, []);
  // Reset session
  const resetSession = useCallback(() => {
    localStorage.removeItem(config.jwtTokenStorageKey);
    delete axios.defaults.headers.common.Authorization;
  }, []);
  // Get access token from local storage
  const getAccessToken = useCallback(() => {
    return localStorage.getItem(config.jwtTokenStorageKey);
  }, []);
  // Check if the access token is valid
  const isTokenValid = useCallback((accessToken) => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    }

    return false;
  }, []);
  // Check if the access token exist and is valid on mount
  useEffect(() => {
    const attemptAutoLogin = async () => {
      const accessToken = getAccessToken();
      if (isTokenValid(accessToken)) {
        try {
          setIsLoading(true);
          const response = await axios.get(config.getUserUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userData = response?.data;

          handleSignInSuccess(userData, accessToken, xsrfToken);
          return true;
        } catch (error) {
          handleSignInFailure(error);
          return false;
        }
      } else {
        resetSession();
        return false;
      }
    };

    if (!isAuthenticated) {
      attemptAutoLogin().then((signedIn) => {
        setIsLoading(false);
        setAuthStatus(signedIn ? "authenticated" : "unauthenticated");
      });
    }
  }, [
    isTokenValid,
    setSession,
    handleSignInSuccess,
    handleSignInFailure,
    handleError,
    getAccessToken,
    isAuthenticated,
  ]);
  const handleRequest = async (url, data, handleSuccess, handleFailure) => {
    try {
      const response = await axios.post(url, data);
      const userData = response?.data?.user;
      const accessToken = response?.data?.access_token;
      handleSuccess(userData, accessToken);
      return userData;
    } catch (error) {
      const axiosError = error;
      handleFailure(axiosError);
      return axiosError;
    }
  };

  useEffect(() => {
    const kc = new Keycloak(initOption);
    setKeycloak(kc);

    const initKeycloak = async () => {
      try {
        const authenticated = await kc.init({
          onLoad: "login-required",
          checkLoginIframe: false,
          pkceMethod: "S256",
          enableAutoRefresh: true,
          scope: "openid profile email",
        });

        setIsLoading(false);

        if (authenticated) {
          // Get basic info from the token
          const user = kc.tokenParsed;

          // Fetch additional user info including picture
          const userInfo = await kc.loadUserInfo();

          const userModel = UserModel({
            uid: user.sub,
            role:
              user?.resource_access?.["ums-client-id"]?.roles?.[0] || "guest",
            data: {
              displayName: user.name || user.preferred_username,
              // Use picture from userInfo if available
              photoURL: userInfo?.picture || "",
              email: user?.email || userInfo?.email || "",
              shortcuts: [],
              settings: {},
            },
          });

          handleSignInSuccess(userModel, kc.token);
        }
      } catch (error) {
        console.error("Keycloak init failed:", error);
        handleSignInFailure(error);
      }
    };

    initKeycloak();
  }, []);

  // Refactor signUp function
  const signUp = useCallback((data) => {
    return handleRequest(
      config.signUpUrl,
      data,
      handleSignUpSuccess,
      handleSignUpFailure,
    );
  }, []);

  /**
   * Sign out
   */
  const signOut = useCallback(() => {
    resetSession();
    setIsAuthenticated(false);
    setUser(null);

    keycloak?.logout({
      responseType: window.location.origin,
    });
  }, [keycloak]);
  /**
   * Update user
   */
  const updateUser = useCallback(async (userData) => {
    try {
      // const response = await axios.put(config.updateUserUrl, userData);
      // const updatedUserData = response?.data;
      const updatedUserData = userData;
      setUser(updatedUserData);
      return null;
    } catch (error) {
      const axiosError = error;
      handleError(axiosError);
      return axiosError;
    }
  }, []);
  /**
   * Refresh access token
   */
  const refreshToken = async () => {
    try {
      setIsLoading(true);
      console.log("keycloak object from refreshToken function ", keycloak);
      await keycloak?.updateToken(30);
      setSession(keycloak.token);
      return keycloak.token;
    } catch (error) {
      console.error(error);
      keycloak.logout({
        redirectUri: window.location.origin,
      });
    }
  };

  useEffect(() => {
    if (user) {
      setAuthStatus("authenticated");
    } else {
      setAuthStatus("unauthenticated");
    }
  }, [user]);

  const authContextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      authStatus,
      isLoading,
      signUp,
      signOut,
      updateUser,
      refreshToken,
      setIsLoading,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      signUp,
      signOut,
      updateUser,
      refreshToken,
      setIsLoading,
    ],
  );
  return (
    <JwtAuthContext.Provider value={authContextValue}>
      {children}
    </JwtAuthContext.Provider>
  );
}

export default JwtAuthProvider;
