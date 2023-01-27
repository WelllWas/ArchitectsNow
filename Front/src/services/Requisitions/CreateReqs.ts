import axios from "axios";

export async function CreateReqs(requisition: any) {
    const payload = await axios.post(`http://localhost:8080/requests`, {
        requisition
    });
    return payload;
}