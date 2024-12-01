import React, { useState } from "react";
import styled from "styled-components";
import { Budget, IncomeSource } from "../data/interfaces";

const colors = {
  background: "#f9f9f9",
  border: "#ddd",
  text: "#333",
  emptyText: "#888",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px ${colors.shadow};
  border: 1px solid ${colors.border};
  border-radius: 10px;
  width: 100%;
  padding: 20px;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
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

const Select = styled.select`
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
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 25px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Типы
interface IncomeFormProps {
  onSubmit: (income: {
    name: string;
    amount: number;
    incomeSourceId: string;
  }) => void;
  incomeSources: IncomeSource[]; // Список доступных бюджетов
}

const CreateIncomeForm = ({ onSubmit, incomeSources }: IncomeFormProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [incomeSourceId, setIncomeSourceId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount && incomeSourceId) {
      onSubmit({ name, amount: Number(amount), incomeSourceId });
      setName("");
      setAmount("");
      setIncomeSourceId("");
    }
  };

  return (
    <Card>
      <FormTitle>Добавить доход</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            placeholder="Название дохода"
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
            placeholder="Сумма дохода"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
            min="0"
          />
        </FormField>
        <FormField
          style={{ display: incomeSources.length === 1 ? "none" : "flex" }}
        >
          <Label htmlFor="budget">Источник дохода</Label>
          <Select
            id="budget"
            value={incomeSourceId}
            onChange={(e) => setIncomeSourceId(e.target.value)}
            required
          >
            <option value="" disabled>
              Выберите источник дохода
            </option>
            {incomeSources.map((income) => (
              <option key={income.id} value={income.id}>
                {income.name}
              </option>
            ))}
          </Select>
        </FormField>
        <SubmitButton
          type="submit"
          disabled={!name || !amount || !incomeSourceId}
        >
          Добавить доход
        </SubmitButton>
      </form>
    </Card>
  );
};

export default CreateIncomeForm;
