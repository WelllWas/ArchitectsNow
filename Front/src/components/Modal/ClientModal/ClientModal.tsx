import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./ClientModal.module.css";
import React from 'react';
import DeleteRequisitions from '../../../services/Requisitions/DeleteReq';
import UpdateRequisitions from '../../../services/Requisitions/UpdateReq';

export default function ClientModal(props: any) {
    const controllerDelete = new DeleteRequisitions();
    const controllerUpdate = new UpdateRequisitions();
    const requisition = props.requisition;
    const client = props.client;

    async function deleteRequest() {
        await controllerDelete.DeleteReqs(requisition);
        props.setTrigger();
        window.location.reload();
    }

    async function updateRequest(data: any) {
        let params;
        if (data == 1)
            params = { id: requisition.id, body: { status: "Accepted" } }
        else
            params = { id: requisition.id, body: { status: "Declined" } }

        await controllerUpdate.UpdateReqs(params);
        props.setTrigger();
        window.location.reload();
    }

    return (props.trigger) ? (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                <div className={styles.modalContent}>
                    <h2>Requisição de contrato de: {client.name}</h2>
                    <p>Descrição:<p>{requisition.description}</p></p>
                    <br />
                    <p>Email para contato: {client.email}</p>
                        <button
                            className='btn btn-secondary'
                            onClick={() => props.setTrigger(client)}>
                            Fechar
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteRequest()}>Excluir</button>
                        <button className="btn btn-warning" onClick={() => updateRequest(2)}>Recusar</button>
                        <button className="btn btn-success" onClick={() => updateRequest(1)}>Aceitar</button>

                </div>
            </div>
        </div>
    ) : <div></div>;
}