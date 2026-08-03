import React, { useState } from "react";
import styles from "./Login.module.css";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { getLogin, handleLogout } from "../../Controllers/LoginController";

export default function Login() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorCode, setErrorCode] = useState<number>(100);
  const nav = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const requestBody = { login, password };
      const response = await axios.post(
        "https://api.turzan.pl/api/users/login",
        requestBody,
      );
      console.log(response.data);
      setErrorCode(100);
      localStorage.setItem("access_token", response.data);
      nav("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorCode(error.response?.status ?? 0);
      } else {
        setErrorCode(0);
      }
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
      {errorCode == 401 && (
        <strong className="text-red-800">Invalid login or/and password</strong>
      )}
      {errorCode == 400 && (
        <strong className="text-red-800">Bad request (Most likely the API is acting freaky)</strong>
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
