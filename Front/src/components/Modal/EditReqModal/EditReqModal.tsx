import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./EditReqModal.module.css";
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import UpdateRequisitions from '../../../services/Requisitions/UpdateReq';

export default function EditReqModal(props: any) {
    const { register, handleSubmit } = useForm();
    const requisition = props.requisition;
    const controller = new UpdateRequisitions();

    const editRequest = async (data: any) => {
        const request = { id: requisition.id, body: { description: data.description } }
        await controller.UpdateReqs(request);
        props.setTrigger();
        window.location.reload();
    }

    return (props.trigger) ? (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                <div className={styles.modalContent}>
                    <h2>Edite a sua requisição</h2>

                    <form onSubmit={handleSubmit(editRequest)}>
                        <div className="form-group">
                            <label htmlFor='inputDescription'>Descrição</label>
                            <input required {...register("description")} className="form-control" id="inputDescription" aria-describedby="descriptionHelp" defaultValue={requisition.description} />
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