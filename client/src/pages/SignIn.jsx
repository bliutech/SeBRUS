import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

function SignIn() {
  document.title = "GSET23BSG";

  return (
    <div>
      <p>Sign In Below!</p>
      <form action="/LoginForm.jsx" method="post">
        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
        ></input>
        <input
          type="password"
          required
          name="password"
          placeholder="Your password"
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      <p></p>
    </div>
  );
}

export { SignIn };
