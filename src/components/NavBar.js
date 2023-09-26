import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {

const currentUser = useCurrentUser();
const setCurrentUser = useSetCurrentUser();

const { expanded, setExpanded, ref } = useClickOutsideToggle();



const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addTaskIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/tasks/create"
    >
      <i className="far fa-plus-square"></i>Add task
    </NavLink>
  );

  const addCategoryIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/categories/create"
    >
      <i className="far fa-plus-square"></i>Add Category
    </NavLink>
  );


const loggedInIcons = 
<>
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks"
      >
        <i className="fas fa-stream"></i>Tasks
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/states"
      >
        <i className="fas fa-check"></i>Completed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/categories"
      >
        <i class="fas fa-folder"></i>Categories
      </NavLink>
      { addCategoryIcon}
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
      </NavLink>


</>;
const loggedOutIcons = (
    <>
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
    >
        <i className="fas fa-sign-in-alt"></i>Sign in
    </NavLink>
    <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
    >
        <i className="fas fa-user-plus"></i>Sign up
    </NavLink>
    </>
    );
  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
          {currentUser && addTaskIcon}
        
          

        </NavLink>
        <Navbar.Toggle 
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
         />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
           
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;