import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import '../styles/index.css';
import styles from "../styles/pages/SignInPage.module.css";

function SignIn() {
    document.title = "signin";

    return (
        
        <div className={styles.rounded} style={{
                border: '1px solid white',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',                
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px'
            }}>
            <p>
                <br></br>
                <header>Sign In</header>
                <br></br>
                <br></br>
                </p>
                    <form action="/LoginForm.jsx" method="post">
                        <text>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter your username:&nbsp;
                        </text>
                        <input type="email" required name="email" placeholder="Your email"></input>
                        <text>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </text>
                        <br></br>
                        <br></br>
                        <text>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter your password:&nbsp;
                        </text>
                        <input type="password" required name="password" placeholder="Your password"></input>
                        <text>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </text>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <button className={styles.button}>
                            <buttonText>Submit</buttonText>
                        </button>
                        <button>
                            <buttonText>test</buttonText>
                        </button>
                        <br></br>
                        <br></br>
                    </form>
                <p>
            </p>
        </div>
        );
    }
    
export { SignIn };