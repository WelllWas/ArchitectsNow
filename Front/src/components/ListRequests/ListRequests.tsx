import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import styles from "./ListRequests.module.css";
import { useNavigate } from 'react-router-dom';
import EditReqModal from '../Modal/EditReqModal/EditReqModal';
import DeleteReqModal from '../Modal/DeleteReqModal/DeleteReqModal';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ListRequests(props: any) {
    const buttonStyle = `btn rounded-pill ${styles.buttonStyle}`;
    const buttonStyleDanger = `btn rounded-pill ${styles.buttonStyleDanger}`;
    const buttonStyleBack = `btn btn-danger ${styles.buttonStyleBack}`;
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [singleRequest, setSingleRequest] = useState([]);
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();
    let type: string;

    async function toggleModal(props: any) {
        setSingleRequest(props);
        setModal(!modal);
    }

    async function toggleModalDelete(props: any) {
        setSingleRequest(props);
        setModalDelete(!modalDelete);
    }

    const { data, isFetching } = useQuery('requests', async () => {
        const user = localStorage.getItem("user_token") || "";
        const userId = JSON.parse(user).id;
        const parsedType = JSON.parse(user).type;
        type = parsedType;
        setUserType(type);
        const payload = await axios.get(`http://localhost:8080/requests/findbycontract/${userId}/${type}/NoFilter`);
        return payload.data.body;
    }, {
        staleTime: 1000 * 30
    })

    return (
        <>
            <EditReqModal trigger={modal} setTrigger={toggleModal} requisition={singleRequest}></EditReqModal>
            <DeleteReqModal trigger={modalDelete} setTrigger={toggleModalDelete} requisition={singleRequest}></DeleteReqModal>
            <div className={styles.tableStyle}>
                <h1>Todas as Requisições</h1>
                {isFetching && <p>Carregando...</p>}
                <div>
                    <table className="table table-bordered">
                        <thead className={styles.theadStyle}>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                data?.map((item: any) =>
                                    <tr className={styles.bodyStyle} key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td className={styles.btnRow}>
                                            {
                                                (item.status == "Active" && userType == "C") &&
                                                <div className={styles.actionBtn}>
                                                    <button className={buttonStyle} onClick={() => toggleModal(item)}> Editar</button>
                                                </div>
                                            }

                                            <div className={styles.actionBtn}>
                                                <button className={buttonStyleDanger} onClick={() => toggleModalDelete(item)}> Excluir</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <button className={buttonStyleBack} onClick={() => { navigate('/Home') }}>Voltar</button>
            </div>
        </>
    )
}