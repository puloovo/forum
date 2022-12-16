export default function authHeader() {
  const user = localStorage.getItem("token");

  if (user) {
    // for Node.js Express back-end
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
}
