import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" className="sticky" light expand="md">
        <NavbarBrand href="/">budgetBuddy</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

          <NavItem>
                <NavLink tag={Link} to="/transactions">
                  Transactions
                </NavLink>
              </NavItem>


              <NavItem>
                <NavLink tag={Link} to="/budgets">
                  Budgets
                </NavLink>
              </NavItem>

                <NavItem>
                  <NavLink tag={Link} onClick={props.clickHandler} to="/login">
                   Logout
                  </NavLink>
                </NavItem>
          
          </Nav>
          <NavbarText>{props.currentUser? `Welcome, ${props.currentUser.name}! ` : null} </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;