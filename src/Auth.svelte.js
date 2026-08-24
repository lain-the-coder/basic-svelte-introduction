// shared state for auth

export const auth = $state({
  user: "Guest (logged out)",
  role: "Viewer",
  accessToken: "None",
  isLoggedIn: false,
});

export function LogIn() {
  auth.user = "lain iwakura";
  auth.role = "Admin";
  auth.accessToken = "isjdosjKiojos";
  auth.isLoggedIn = true;
}

export function LogOut() {
  auth.user = "Guest (Logged out)";
  auth.role = "Viewer";
  auth.accessToken = "None";
  auth.isLoggedIn = false;
}
