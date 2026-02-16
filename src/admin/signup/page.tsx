import React, { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { getLogin, handleLogout } from "../../Controllers/LoginController";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const nav = useNavigate();

  async function handleSignup(e: any) {
    console.log("try");
    e.preventDefault();
    try {
      const requestBody = { "email":email, "password":password };
      const response = await axios.post(
        "http://localhost:5030/api/users",
        requestBody,
      );
      console.log(response.data);
      setHasError(false);
      // navigate('/')
    } catch (error) {
      console.log(error);
      setHasError(true);
    }
  }
  return (
    <div className="mt-60 w-120 h-full p-10  bg-amber-100">
      <h1 className="text-center">Załóż konto</h1>
      <form onSubmit={(e) => handleSignup(e)}>
        <div className={styles.input_field + " mt-5"}>
          <label htmlFor="login">Email:</label>
          <input
            type="login"
            name="login"
            placeholder="enter your login"
            onChange={(e) => setEmail(e.target.value)}
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
        </div>{" "}
        <button type="submit" className={styles.login_button}>
          Log In
        </button>
      </form>
    </div>
  );
}
