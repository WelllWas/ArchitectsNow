import axios from "axios";

export default class GetUsersByType{
    public async GetUsers(props:any){
        const payload = await axios.get(`http://localhost:8080/users/findbytype/${props}`);
        return payload;
    }
}