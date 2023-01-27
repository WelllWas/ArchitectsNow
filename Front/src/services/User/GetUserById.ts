import axios from "axios";

export async function GetUserById(props: any) {
    const payload = await axios.get(`http://localhost:8080/users/${props}`);
    return payload;
}
