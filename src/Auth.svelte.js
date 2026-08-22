// shared state for auth

export const auth = $state({
  user: "Guest (logged out)",
  role: "Viewer",
  accessToken: "None",
});

export function LogIn() {
  auth.user = "lain iwakura";
  auth.role = "Admin";
  auth.accessToken = "isjdosjKiojos";
}

export function LogOut() {
  auth.user = "Guest (Logged out)";
  auth.role = "Viewer";
  auth.accessToken = "None";
}
