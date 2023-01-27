import axios from "axios";

export async function Login(props: any) {
    const user = { ...props };
    const payload = await axios.post("http://localhost:8080/users/login" || "", {
        user
    });
    return payload;
}