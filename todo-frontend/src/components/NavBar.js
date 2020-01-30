import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">WhatToDo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "15px"
                }}
              >
                My Todos
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="/add"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "15px"
                }}
              >
                Add To do
              </Link>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
