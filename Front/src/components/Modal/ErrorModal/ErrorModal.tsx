import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./ErrorModal.module.css";
import React from 'react';

export default function ErrorModal(props:any) {

    function close(){
        props.setTrigger();
    }

    return (props.trigger) ? (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                <div className={styles.modalContent}>
                    <h2>Erro</h2>
                    <p>{props.errorDescription}</p>
                    <br />
                    <button
                        className="btn btn-secondary"
                        onClick={() => close()}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    ) : <div></div>;
}