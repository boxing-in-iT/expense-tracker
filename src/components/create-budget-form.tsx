import React, { useState } from "react";
import styled from "styled-components";

// Стили

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  :nth-child(1) {
    margin-top: 20px;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  width: 75%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 3px rgba(76, 175, 80, 0.5);
  }
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Типы для формы
interface CreateBudgetFormProps {
  onSubmit: (budget: { name: string; amount: number }) => void;
}

const CreateBudgetForm: React.FC<CreateBudgetFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount) {
      onSubmit({ name, amount: Number(amount) });
      setName("");
      setAmount("");
    }
  };

  return (
    <>
      <FormTitle>Создать бюджет</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            placeholder="Название бюджета"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="amount">Сумма</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Сумма бюджета"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
            min="0"
          />
        </FormField>
        <SubmitButton type="submit" disabled={!name || !amount}>
          Создать
        </SubmitButton>
      </form>
    </>
  );
};

export default CreateBudgetForm;
