import axios from "axios";

export default class GetRequisitionsByContract{
    public async GetReqsByContract(props:any){
        const payload = await axios.get(`http://localhost:8080/requests/findbycontract/${props.id}/${props.contract}/${props.status}`);
        return payload;
    }
}