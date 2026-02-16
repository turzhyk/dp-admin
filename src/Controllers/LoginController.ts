import { jwtDecode } from "jwt-decode";

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
