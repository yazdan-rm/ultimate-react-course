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
import Cookies from "js-cookie";

const defaultAuthContext = {
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

function JwtAuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState("configuring");
  const { children } = props;
  /**
   * Handle sign-in success
   */
  const handleSignInSuccess = useCallback(
    (userData, accessToken, xsrfToken) => {
      setSession(accessToken, xsrfToken);
      setIsAuthenticated(true);
      setUser(userData);
    },
    [],
  );
  /**
   * Handle sign-up success
   */
  const handleSignUpSuccess = useCallback(
    (userData, accessToken, xsrfToken) => {
      setSession(accessToken, xsrfToken);
      setIsAuthenticated(true);
      setUser(userData);
    },
    [],
  );
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
  const setSession = useCallback((accessToken, xsrfToken) => {
    if (accessToken) {
      localStorage.setItem(config.jwtTokenStorageKey, accessToken);
      localStorage.setItem(config.xsrfTokenStorageKey, xsrfToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      axios.defaults.headers.common["X-XSRF-TOKEN"] = xsrfToken;
    }
  }, []);
  // Reset session
  const resetSession = useCallback(() => {
    localStorage.removeItem(config.jwtTokenStorageKey);
    localStorage.removeItem(config.xsrfTokenStorageKey);
    delete axios.defaults.headers.common["X-XSRF-TOKEN"];
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
          const xsrfToken = Cookies.get("XSRF-TOKEN");

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
  // Refactor signIn function
  const signIn = (credentials) => {
    return handleRequest(
      config.signInUrl,
      credentials,
      handleSignInSuccess,
      handleSignInFailure,
    );
  };
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
  }, []);
  /**
   * Update user
   */
  const updateUser = useCallback(async (userData) => {
    try {
      const response = await axios.put(config.updateUserUrl, userData);
      const updatedUserData = response?.data;
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
    setIsLoading(true);
    try {
      const response = await axios.post(config.tokenRefreshUrl);
      const accessToken = response?.headers?.["New-Access-Token"];

      if (accessToken) {
        setSession(accessToken, null);
        return accessToken;
      }

      return null;
    } catch (error) {
      const axiosError = error;
      handleError(axiosError);
      return axiosError;
    }
  };
  /**
   * if a successful response contains a new Authorization header,
   * updates the access token from it.
   *
   */
  useEffect(() => {
    if (config.updateTokenFromHeader && isAuthenticated) {
      axios.interceptors.response.use(
        (response) => {
          const newAccessToken = response?.headers?.["New-Access-Token"];
          const xsrfToken = Cookies.get("XSRF-TOKEN");
          if (newAccessToken) {
            setSession(newAccessToken, xsrfToken);
          }

          return response;
        },
        (error) => {
          const axiosError = error;

          if (axiosError?.response?.status === 401) {
            signOut();
            // eslint-disable-next-line no-console
            console.warn("Unauthorized request. User was signed out.");
          }

          return Promise.reject(axiosError);
        },
      );
    }
  }, [isAuthenticated]);
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
      signIn,
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
      signIn,
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
