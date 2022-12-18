import styles from "./Register.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import RegisterForm from "../../components/Register/RegisterForm";
import React from 'react';

export default function Login() {
    const navigate = useNavigate();
    const buttonStyle = `btn btn-danger ${styles.buttonStyle}`;

    function logout() {
        navigate("/login")
    }

    return (
        <>
            <div className={styles.registerForm}>
                <RegisterForm></RegisterForm>
            </div>
            <button className={buttonStyle} onClick={logout}>Voltar</button>
        </>
    )
}