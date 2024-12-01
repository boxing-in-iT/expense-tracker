import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../AppContext";
import { logout } from "../util/util";

// Styled component for the brand (HomeBudget)
const HomeBudgetSpan = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336; /* Add a pop of color on hover */
    cursor: pointer;
  }
`;

// Styled component for the button
const DeleteUserButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50px; /* Rounded edges */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #d32f2f; /* Slightly darker red */
    transform: scale(1.05); /* Slight scaling effect */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
  }
`;

// Container for the navigation bar
const NavContainer = styled.nav`
  margin-top: 25px;
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Flex container for spacing the elements
const NavLinks = styled.div`
  display: flex;
  gap: 20px; /* Add spacing between nav links */
`;

const Nav = () => {
  const {
    user,
    setBudgets,
    setExpenses,
    setUser,
    setIncomeSources,
    setIncome,
  } = useAppContext();

  const handleLogout = () => {
    logout();
    setUser(null);
    setBudgets([]);
    setExpenses([]);
    setIncomeSources([]);
    setIncome([]);
  };

  return (
    <NavContainer>
      <NavLink to="/">
        <HomeBudgetSpan>HomeBudget</HomeBudgetSpan>
      </NavLink>
      <NavLinks>
        {user && (
          <DeleteUserButton onClick={handleLogout}>
            Delete user
          </DeleteUserButton>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Nav;
