export function storeCurrentUser(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("token"));
  return user;
}

export function clearCurrentUser() {
  localStorage.removeItem("token");
}
