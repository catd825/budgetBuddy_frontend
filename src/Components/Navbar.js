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
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  console.log(props)
  return (
    <div>
      <Navbar color="light" className="sticky" light expand="md">
        <NavbarBrand href="/">finance app</NavbarBrand>
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
                <NavLink tag={Link} to="/signup">
                 Signup
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} onClick={props.clickHandler} to="/login">
                 Logout
                </NavLink>
              </NavItem>




            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}


          </Nav>
          <NavbarText>{props.currentUser? `Welcome, ${props.currentUser.name}! ` : null} </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;