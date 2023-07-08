import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../styles/index.css';

function SignUp() {
    document.title = "signin";

    return (
        <div>
            <style>

            </style>
            <p>
                Enter Info Below
            </p>
            <form action="/LoginForm.jsx" method="post">
                <input type="email" required name="email" placeholder="Your email"></input>
                <input type="password" required name="password" placeholder="Your password"></input>
                <input type="submit" value="Submit"></input>
                <button class="btn">
                    test
                </button>
            </form>
            <p>

      </p>
        </div>
        );
    }
    
    export { SignUp };