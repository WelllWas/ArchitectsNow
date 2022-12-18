import axios from "axios";

export default class GetUserById{
    public async GetUserById(props:any){
        const payload = await axios.get(`http://localhost:8080/users/${props}`);
        return payload;
    }
}