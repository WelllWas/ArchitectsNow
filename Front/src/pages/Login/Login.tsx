import LoginForm from "../../components/Login/LoginForm"
import styles from "./Login.module.css";
import React from 'react';

export default function Login() {
    return (
        <>
            <h1 className={styles.title}>Architects Now</h1>
            <div className={styles.loginForm}>
                <LoginForm></LoginForm>
            </div>
        </>
    )
}