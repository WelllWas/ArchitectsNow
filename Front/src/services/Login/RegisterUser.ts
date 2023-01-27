import axios from "axios";

export async function Register(props: any) {
    const user = { ...props };
    const payload = await axios.post("http://localhost:8080/users" || "", {
        user
    });
    return payload;
}