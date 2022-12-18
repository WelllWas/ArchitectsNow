import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./DeleteReqModal.module.css";
import React from 'react';
import DeleteRequisitions from '../../../services/Requisitions/DeleteReq';

export default function DeleteReqModal(props: any) {
    const controller = new DeleteRequisitions();
    const requisition = props.requisition;

    async function deleteRequest(){
        await controller.DeleteReqs(requisition);
        props.setTrigger();
        window.location.reload();
    }

    return (props.trigger) ? (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                <div className={styles.modalContent}>
                    <h2>Tem certeza que deseja excluir essa requisição?</h2>
                    <br />
                    <button
                        className="btn btn-secondary"
                        onClick={() => props.setTrigger()}>
                        Fechar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteRequest()}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    ) : <div></div>;
}