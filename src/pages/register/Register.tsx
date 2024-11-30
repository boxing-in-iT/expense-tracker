import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../AppContext";
import { saveUserToLocalStorage } from "../../util/util";

// Wrapper for the entire page, adding a background and some padding
const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f8b3c3, #b3e0f2);
  padding: 20px;
`;

// Left box with an improved design, added padding and text styling
const LeftBox = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #333;
    margin: 10px 0;
  }
`;

// Right box with a clean and modern form, added input styles and hover effects
const RightBox = styled.div`
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    font-size: 1.1rem;
    color: #555;
    font-weight: 600;
  }

  input {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #a0c4f4;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  button {
    padding: 12px;
    font-size: 1.1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const { setUser } = useAppContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // обновляем состояние при изменении ввода
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { name }; // создаём объект с именем
    saveUserToLocalStorage(user); // сохраняем в localStorage
    setUser(user); // обновляем состояние
  };

  return (
    <RegisterWrapper>
      <LeftBox>
        <p>Откройте для себя мир новых возможностей</p>
        <p>Следите за своим бюджетом</p>
      </LeftBox>
      <RightBox>
        <form onSubmit={handleSubmit}>
          <label>Введите ваше имя</label>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={handleInputChange}
          />
          <button type="submit">Ввести</button>
        </form>
      </RightBox>
    </RegisterWrapper>
  );
};

export default Register;
