const formulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/login"
  : "http://localhost:8080/api/auth/login";

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {};
  for (let element of formulario.elements) {
    if (element.name.length > 0) {
      formData[element.name] = element.value;
    }
  }

  fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        localStorage.setItem("token", data.token);
        window.location = "chat.html";
      }
    })
    .catch((error) => console.error(error));
});

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };
  fetch(url + "/google", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        localStorage.setItem("token", data.token);
        window.location = "chat.html";
      }
    })
    .catch(console.log);
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
