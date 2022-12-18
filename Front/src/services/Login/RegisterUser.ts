import axios from "axios";

export default class RegisterUser {
    
    public async Register(props: any) {
        const user = {...props};
        const payload = await axios.post("http://localhost:8080/users" || "", {
            user
        });
        return payload;
    }
}