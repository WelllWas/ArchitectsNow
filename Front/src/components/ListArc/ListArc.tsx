import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import AdvModal from '../Modal/ArcModal/ArcModal';
import styles from "./ListArc.module.css";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ListArc(props: any) {
    const buttonStyle = `btn rounded-pill ${styles.buttonStyle}`;
    const [modal, setModal] = useState(false);
    const [architect, setArchitect] = useState();
    const navigate = useNavigate();

    async function toggleModal(props: any) {
        setArchitect(props);
        setModal(!modal);
    }

    const { data, isFetching } = useQuery('architects', async () => {
        const payload = await axios.get(`http://localhost:8080/users/findbytype/A`);
        return payload.data.body;
    }, {
        staleTime: 1000 * 30
    })

    return (
        <>
            <AdvModal trigger={modal} setTrigger={toggleModal} architect={architect}></AdvModal>
            <div className={styles.tableStyle}>
                <h1>Arquitetos disponíveis</h1>
                {isFetching && <p>Carregando...</p>}

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

                                data?.map((item: any) =>
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