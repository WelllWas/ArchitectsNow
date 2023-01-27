import axios from "axios";

export async function DeleteReqs(props: any) {
    const id = props.id;
    const payload = await axios.delete(`http://localhost:8080/requests/${id}`);
    return payload;
}