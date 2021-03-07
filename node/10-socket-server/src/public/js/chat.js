let user = null;
let socket = null;
const url = window.location.hostname.includes("localhost") ? "http://localhost:8080/api" : "http://localhost:8080/api";

const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length <= 1) {
    window.location = "index.html";
    throw new Error("No hay token en el servidor");
  }

  const response = await fetch(url + "/auth/validate-token", { headers: { "x-token": token } });
  const { ok, user: userDB, token: tokenDB } = await response.json();
  localStorage.setItem("token", tokenDB);
  user = userDB;
  document.title = user.name;
  await connectSocket();
};

const connectSocket = async () => {
  const socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });
};

const main = async () => {
  await validateJWT();
};

main();
