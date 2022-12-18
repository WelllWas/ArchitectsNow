import axios from "axios";

export default class DeleteRequisitions{
    public async DeleteReqs(props:any){
        const id = props.id;
        const payload = await axios.delete(`http://localhost:8080/requests/${id}`);
        return payload;
    }
}