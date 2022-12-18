import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Authorization/UseAuth';
import ManageLists from '../../components/ManageLists/ManageLists';
import styles from "./Home.module.css";
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [type, setType] = useState([]);
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const buttonStyle = `btn btn-danger ${styles.buttonStyle}`;

    useEffect(() => {
        let user = localStorage.getItem("user_token") || "";;
        let userType = JSON.parse(user).type;
        setType(userType);
    }, [])


    function logout() {
        signOut();
        navigate("/login")
    }

    return (
        <>
            <ManageLists type={type}></ManageLists>
            <button className={buttonStyle} onClick={logout}>Sair</button>
        </>
    )
}