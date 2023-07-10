import React, { useState,useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const loginDemoUser = async() =>{
    await dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
    closeModal();
  }

  useEffect(()=>{
    let errors = {}

    if(credential.length<4){
      errors.credential = "Username can't be less than 4 characters"
    }

    if(password.length<6){
      errors.password="Password can't be less than 6 characters"
    }

    setErrors(errors)
  },[credential,password])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({...errors,apiError:data.errors});
        }
      });
  };

  return (
    <div id='loginFormModal'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
         
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
        </label>
        {errors.credential && (
          <div className="error">{errors.credential}</div>
        )}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </label>
        {errors.password && (
          <div className="error">{errors.password}</div>
        )}
        {errors.apiError?.credential && (
          <div className="error">{errors.apiError.credential}</div>
        )}
        <button type="submit" disabled={!!Object.keys(errors).length}>Log In</button>
        <button onClick={loginDemoUser} className='cursor-button'>Login as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;