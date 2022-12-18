import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import useAuth from '../../Authorization/UseAuth';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css'
import React, { useState } from 'react';
import RegisterUser from '../../services/Login/RegisterUser';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';

export default function RegisterForm() {
    const { register, handleSubmit } = useForm();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const controller = new RegisterUser();

    function toggleModal() {
        setModal(!modal);
    }

    const login = async (data: any) => {
        const response = await controller.Register(data)
        if (response.data.statusCode == 201) {
            signIn(response.data.body);
            navigate("/Home");
        }else{
            setError(response.data.body)
            toggleModal();
        }
    }

    return (
        <>
        <ErrorModal errorDescription={error} trigger={modal} setTrigger={toggleModal}></ErrorModal>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit(login)}>
                    <div className="form-group">
                        <label htmlFor='inputName'>Nome</label>
                        <input required {...register("name")} className="form-control" id="inputName" aria-describedby="nameHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputEmail'>Email</label>
                        <input required {...register("email")} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputPassword'>Senha</label>
                        <input required {...register("password")} type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputPhone'>Telefone</label>
                        <input required {...register("phone")} className="form-control" id="inputPhone" aria-describedby="phoneHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputGender'>Gênero</label>
                        <select {...register("gender")} required name="gender" id="inputGender" className="form-control">
                            <option disabled selected></option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='inputAge'>Idade</label>
                        <input required type="number" {...register("age")} className="form-control" min="1" max="120" id="inputAge" aria-describedby="ageHelp" />
                    </div>
                    <div className="form-group">
                        <div>
                            <label htmlFor="radioArchitect">Architect
                                <input type="radio" id="radioArchitect" {...register("type")} className="form-check-input" value="A" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="radioClient">Client
                                <input type="radio" id="radioClient" {...register("type")} className="form-check-input" value="C" />
                            </label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='btn btn-primary'>Cadastrar</button>
                </form>
            </div>
        </>
    )
}