import axios from "axios";

export default class UpdateRequisitions{
    public async UpdateReqs(props:any){
        const id = props.id;
        const requisition = props.body;
        const payload = await axios.patch(`http://localhost:8080/requests/${id}`,{
            requisition
        });
        return payload;
    }
}