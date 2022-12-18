import LoginForm from "../../components/Login/LoginForm"
import styles from "./Login.module.css";
import React from 'react';

export default function Login(){
    return(
        <>
        <div className={styles.loginForm}>
            <LoginForm></LoginForm>
        </div>
        </>
    )
}