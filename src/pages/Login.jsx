import "../style.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <Loading />
      <div className="form_container">
        <div className="form" onSubmit={handleSubmit}>
          <h1> Sherif Altiby Chat </h1>
          <h2> Login </h2>
          <form>
            <input type="text" placeholder="Emain" />
            <input type="password" placeholder="Password" />
            <input type="submit" className="btn" value={"Sign in "} />
          </form>
          {err && <span>Something went wrong</span>}
          <p>
            You don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
