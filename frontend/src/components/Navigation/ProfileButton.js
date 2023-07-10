import React, { useState,useEffect,useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
 

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  let sessionLinks;
  if(sessionUser){
    sessionLinks =(
    <ul className={ulClassName} ref={ulRef}>
      <li>Hello, {user.firstName}</li>
      <li>{user.email}</li>
      <hr/>
      <li><NavLink to='/spots/current'>Manage Spots</NavLink></li>
      <hr/>
      <li><NavLink to='/reviews/current'>Manage Reviews</NavLink></li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </ul>)

  }else{
    sessionLinks = (
      <ul className={ulClassName} ref={ulRef}>
        <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className='cursor-button'
        />
        <OpenModalButton
        className='cursor-button'
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          
        />
        
      </li>

      </ul>
      
    )
  }

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {sessionLinks}
    </>
  );
}

export default ProfileButton;