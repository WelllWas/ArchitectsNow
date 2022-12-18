import axios from "axios";

export default class CreateRequisitions{
    public async CreateReqs(requisition:any){
        const payload = await axios.post(`http://localhost:8080/requests`,{
            requisition
        });
        return payload;
    }
}