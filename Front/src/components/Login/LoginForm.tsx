import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import useAuth from '../../Authorization/UseAuth';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css'
import LoginUser from '../../services/Login/LoginUser';
import React, { useState } from 'react';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';

export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const controller = new LoginUser();

    function toggleModal() {
        setModal(!modal);
    }

    const login = async (data: any) => {
        const response = await controller.Login(data);
        if (response.data.statusCode == 200) {
            signIn(response.data.body);
            navigate("/Home");
        } else {
            setError(response.data.body)
            toggleModal();
        }
    }

    function cadastrarNavigate() {
        navigate("/register");
    }

    return (
        <>
            <ErrorModal errorDescription={error} trigger={modal} setTrigger={toggleModal}></ErrorModal>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit(login)}>
                    <div className="form-group">
                        <label htmlFor='inputEmail'>Email</label>
                        <input required type="email" {...register("email")} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputPassword'>Senha</label>
                        <input required {...register("password")} type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" />
                    </div>
                    <p onClick={cadastrarNavigate} className={styles.hyperlink}>Ainda não tem uma conta? Cadastre-se!</p>
                    <br />
                    <button type="submit" className='btn btn-primary'>Entrar</button>
                </form>
            </div>
        </>
    )
}