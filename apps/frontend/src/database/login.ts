import axios from "axios";

export interface Login {
    username: string;
    password: string;
    email: string;
}

export async function SubmitLogin(request: Login) {
    await axios.post('/api/login', request);
}

export async function GetLogin() {
    return await axios.get('/api/login');
}