import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import AdvModal from '../Modal/ArcModal/ArcModal';
import styles from "./ListArc.module.css";
import GetUsersByType from '../../services/User/GetByType';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function ListArc(props: any) {
    const buttonStyle = `btn rounded-pill ${styles.buttonStyle}`;
    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [architect, setArchitect] = useState();
    const controller = new GetUsersByType();
    const navigate = useNavigate();
    
    async function toggleModal(props: any) {
        setArchitect(props);
        setModal(!modal);
    }

    useEffect(() => {
        const getUsersFromType = async () => {
            const response = await controller.GetUsers("A");
            const usersList = response.data.body;
            setUsers(usersList);
        }
        getUsersFromType()
    }, [])

    return (
        <>
            <AdvModal trigger={modal} setTrigger={toggleModal} architect={architect}></AdvModal>
            <div className={styles.tableStyle}>
                <h1>Arquitetos disponíveis</h1>
                <div className={styles.divBtn}>
                    <button className={buttonStyle} onClick={() => navigate("/requests")}>Requisições</button>
                </div>
                <div>
                    <table className="table table-bordered">
                        <thead className={styles.theadStyle}>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                users.map((item: any) =>
                                    <tr className={styles.bodyStyle} key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <div className={styles.actionBtn}>
                                                <button className={buttonStyle} onClick={() => toggleModal(item)}> Contratar</button>
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