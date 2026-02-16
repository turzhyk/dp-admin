import React, { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { getLogin, handleLogout } from "../../Controllers/LoginController";

export default function Login() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const nav = useNavigate();
  
  
  async function handleLogin(e: any) {
    console.log("try");
    e.preventDefault();
    try {
      const requestBody = { login, password };
      const response = await axios.post(
        "http://localhost:5030/api/users/login",
        requestBody,
      );
      console.log(response.data);
      setHasError(false);
      localStorage.setItem("access_token", response.data);
      nav("/");
      // navigate('/')
    } catch (error) {
      console.log(error);
      setHasError(true);
    }
  }
  return (
    <div className="mt-60 w-120 h-full p-10  bg-amber-100">
        <h1 className="text-center">Logowanie pracownika</h1>
      {getLogin() != null && <div>allready logged in </div>}
      <form onSubmit={(e) => handleLogin(e)}>
        <div className={styles.input_field + " mt-5"}>
          <label htmlFor="login">Login:</label>
          <input
            type="login"
            name="login"
            placeholder="enter your login"
            onChange={(e) => setLogin(e.target.value)}
          ></input>
        </div>
        <div className={styles.input_field}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </form>
      {hasError && (
        <strong className="text-red-800">Invalid login or/and password</strong>
      )}

      <button
        type="submit"
        onClick={handleLogin}
        className={styles.login_button}
      >
        Log In
      </button>
      <button
        type="submit"
        onClick={handleLogout}
        className={styles.login_button + " mt-4"}
      >
        Log Out
      </button>
    </div>
  );
}
