import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(()=>{
    let errors = {};

    if(email.length===0){
      errors.email = 'Email is required'
    }

    if(username.length===0){
      errors.username = 'username is required'
    }

    if(username.length<4){
      errors.username = "Username can't be less than 4 characters"
    }

    if(password.length===0){
      errors.password = 'Password is required'
    }

    if(password.length<6){
      errors.password = "Password can't be less than 6 characters"
    }

    if(firstName.length===0){
      errors.firstName = "FirstName is required"
    }

    if(lastName.length===0){
      errors.lastName = "LastName is required"
    }

    if(confirmPassword!==password){
      errors.confirmPassword = "Password doesn't match"
    }

    setErrors(errors)


  },[email,username,password,firstName,lastName,confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <div className="error">{errors.email}</div>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <div className="error">{errors.username}</div>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <div className="error">{errors.lastName}</div>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <div className="error">{errors.password}</div>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
        <button type="submit" disabled={!!Object.keys(errors).length}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;