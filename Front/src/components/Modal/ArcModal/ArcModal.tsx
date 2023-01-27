import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./ArcModal.module.css";
import { useForm } from 'react-hook-form';
import {CreateReqs} from '../../../services/Requisitions/CreateReqs';
import React from 'react';

export default function AdvModal(props: any) {
    const { register, handleSubmit } = useForm();
    const architect = props.architect;

    const createRequest = async (data: any) => {
        const user = localStorage.getItem("user_token") || "";
        const clientId = JSON.parse(user).id;
        const request = { idClient: clientId, idArchitect: architect.id, description: data.description }
        await CreateReqs(request);
        props.setTrigger();
    }

    return (props.trigger) ? (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                <div className={styles.modalContent}>
                    <h2>Crie a sua requisição para {architect.name}</h2>

                    <form onSubmit={handleSubmit(createRequest)}>
                        <div className="form-group">
                            <label htmlFor='inputDescription'>Descrição</label>
                            <input required {...register("description")} className="form-control" id="inputDescription" aria-describedby="descriptionHelp" placeholder="Digite a descrição..." />
                        </div>
                        <br />
                        <button
                            className="btn btn-danger"
                            onClick={() => props.setTrigger()}>
                            Fechar
                        </button>
                        <div className={styles.buttons}>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : <div></div>;
}