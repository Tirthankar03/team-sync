import SignIn from "@/pages/auth/Sign-in";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import SignUp from "@/pages/auth/Sign-up";
import GoogleOAuthFailure from "@/pages/auth/GoogleOAuthFailure";
import WorkspaceDashboard from "@/pages/workspace/Dashboard";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
];

