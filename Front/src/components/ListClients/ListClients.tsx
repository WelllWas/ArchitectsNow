import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ClientModal from '../Modal/ClientModal/ClientModal';
import styles from "./ListClients.module.css";
import GetUserById from '../../services/User/GetUserById';
import GetRequisitionsByContract from '../../services/Requisitions/GetReqsByContract';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function ListClients(props: any) {
    const buttonStyle = `btn rounded-pill ${styles.buttonStyle}`;
    const [modal, setModal] = useState(false);
    const [requests, setRequests] = useState([]);
    const [singleReq, setSingleReq] = useState();
    const [client, setClient] = useState();
    const controllerUser = new GetUserById();
    const controller = new GetRequisitionsByContract();
    const navigate = useNavigate();


    async function toggleModal(props: any) {
        const user = await controllerUser.GetUserById(props.idClient);
        setClient(user.data.body);
        setSingleReq(props);
        setModal(!modal);
    }

    useEffect(() => {
        const getUsersFromType = async () => {
            const user = localStorage.getItem("user_token") || "";
            const userId = JSON.parse(user).id;
            const data = { id: userId, contract: "A", status: "Active" }
            const response = await controller.GetReqsByContract(data)
            const usersList = response.data.body;
            setRequests(usersList);
        }
        getUsersFromType()
    }, [])

    return (
        <>
            <ClientModal trigger={modal} setTrigger={toggleModal} requisition={singleReq} client={client}></ClientModal>
            <div className={styles.tableStyle}>
                <h1>Propostas de Clientes</h1>
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
                                requests.map((item: any) =>
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