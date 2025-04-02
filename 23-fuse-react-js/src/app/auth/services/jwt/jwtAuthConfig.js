const jwtAuthConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "mock-api/auth/sign-in",
  signUpUrl: "mock-api/auth/sign-up",
  tokenRefreshUrl: "mock-api/auth/refresh",
  getUserUrl: "mock-api/auth/user",
  updateUserUrl: "mock-api/auth/user",
  updateTokenFromHeader: true,
};
export default jwtAuthConfig;


// const firebaseConfig = {
// 	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// 	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// 	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
// 	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// 	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
// };
// export default firebaseConfig;
