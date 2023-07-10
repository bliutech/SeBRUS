import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/index.css';
import { createUser, getUser, changeUser, deleteUser} from "../api/user"

function SignUp() {
    document.title = "signin";


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const formEntries = [
        {
            label: "Username",
            placeholder: "Create a unique username for this website",
            onChange: setUsername,
            onKeyPress: handleEnter,
        },
        {
            label: "Enter Password",
            placeholder: "Enter your password for this website",
            onChange: setPassword,
            onKeyPress: handleEnter,
        }
    ]

    function handleEnter(key) {
        if (key == "Enter") {
            handleSignUp();
        }
    }

    async function handleSignUp() {
        if (!username || username.length < 6) {
            window.alert("Your username must be 6+ characters long");
            return;
        }
    

        const user = await getUser(username);
        if (user.password !== null) {
            window.alert("This username is taken." +
            "Please try a different one");
            return;
        }
    }

    createUser(username, password);

    async function postJSON(data) {
        try {
          const response = await fetch("http://localhost:5000/signup", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "email",
                password: "password"
            }),
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      const data = { username: "example" };
      postJSON(data);
      
    async function getEndpoint() {
        let res = await fetch("http://localhost:3000/signup")
        let data = await res.json()
        console.log(data);
    }

 


    return (
        <div>
            <b>Sign up!</b>
            
            form={formEntries}
            button="Sign up"
            onClick={handleSignUp}
            
        </div>
        );
    }
    
    export { SignUp };