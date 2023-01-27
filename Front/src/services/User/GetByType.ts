import axios from "axios";

export async function GetUsers<T = unknown>(props: string) {
    const payload = await axios.get(`http://localhost:8080/users/findbytype/${props}`);
    return payload;
}
