import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ClientModal from '../Modal/ClientModal/ClientModal';
import styles from "./ListClients.module.css";
import { GetUserById } from '../../services/User/GetUserById';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ListClients(props: any) {
    const buttonStyle = `btn rounded-pill ${styles.buttonStyle}`;
    const [modal, setModal] = useState(false);
    const [singleReq, setSingleReq] = useState();
    const [client, setClient] = useState();
    const navigate = useNavigate();


    async function toggleModal(props: any) {
        const user = await GetUserById(props.idClient);
        setClient(user.data.body);
        setSingleReq(props);
        setModal(!modal);
    }

    const { data, isFetching } = useQuery('clients', async () => {
        const user = localStorage.getItem("user_token") || "";
        const userId = JSON.parse(user).id;
        const payload = await axios.get(`http://localhost:8080/requests/findbycontract/${userId}/A/Active`);
        return payload.data.body;
    }, {
        staleTime: 1000 * 30
    })


    return (
        <>
            <ClientModal trigger={modal} setTrigger={toggleModal} requisition={singleReq} client={client}></ClientModal>
            <div className={styles.tableStyle}>
                <h1>Propostas de Clientes</h1>
                {isFetching && <p>Carregando...</p>}
                <div className={styles.divBtn}>
                    <button className={buttonStyle} onClick={() => navigate("/requests")}>Requisições</button>
                </div>
                <div>
                    <table className="table table-bordered">
                        <thead className={styles.theadStyle}>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item: any) =>
                                    <tr className={styles.bodyStyle} key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className={styles.actionBtn}>
                                                <button className={buttonStyle} onClick={() => toggleModal(item)}> Responder</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}