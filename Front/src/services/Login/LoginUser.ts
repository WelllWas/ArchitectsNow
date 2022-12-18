import axios from "axios";

export default class LoginUser{
    public async Login(props:any){
        const user = {...props};
        const payload = await axios.post("http://localhost:8080/users/login" || "", {
            user
        });
        return payload;
    }
}