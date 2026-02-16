import axios from "axios";
import { jwtDecode } from "jwt-decode";


export async function handleLogin(login:string , password:string) {
    try {
      const requestBody = { login, password };
      const response = await axios.post(
        "http://localhost:5030/api/users/login",
        requestBody,
      );
      console.log(response.data);
    localStorage.setItem("access_token", response.data);
      // navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
export const getLogin = () => {
  const token = localStorage.getItem("access_token");

  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded.name;
  }
};
export function handleLogout() {
  localStorage.removeItem("access_token");
  
}
