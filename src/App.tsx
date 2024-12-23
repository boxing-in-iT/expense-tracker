import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Register from "./pages/register/Register";
import { User } from "./data/interfaces";
import { useAppContext } from "./AppContext";
import Main from "./pages/Main";
import { fetchData } from "./util/util";
import BudgetsPage from "./pages/Budgets/budgets-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/navbar";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { user, setUser, budgets } = useAppContext();

  // Проверяем, есть ли пользователь в localStorage
  useEffect(() => {
    const storedUser = fetchData("user"); // Получаем пользователя из localStorage
    if (storedUser) {
      setUser(storedUser); // Если пользователь есть, обновляем состояние
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <AppContainer>
        {user ? (
          <>
            <Nav />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/budgets/:id" element={<BudgetsPage />} />
            </Routes>
          </>
        ) : (
          <Register />
        )}
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
