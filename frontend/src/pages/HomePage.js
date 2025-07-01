import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return React.createElement(
    "div",
    { style: { textAlign: "center", marginTop: "100px" } },
    React.createElement("h1", null, "Witamy w aplikacji zarządzania pacjentami 👩‍⚕️"),
    React.createElement(
      "p",
      null,
      "Przejdź do logowania lub zarejestruj się, aby kontynuować."
    ),
    React.createElement(
      Link,
      { to: "/login" },
      React.createElement("button", { style: { margin: "10px" } }, "Zaloguj się")
    ),
    React.createElement(
      Link,
      { to: "/register" },
      React.createElement("button", null, "Zarejestruj się")
    )
  );
}

export default HomePage;