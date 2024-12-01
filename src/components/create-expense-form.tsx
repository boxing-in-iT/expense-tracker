import React, { useState } from "react";
import styled from "styled-components";
import { Budget } from "../data/interfaces";

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
interface ExpenseFormProps {
  onSubmit: (expense: {
    name: string;
    amount: number;
    budgetId: string;
  }) => void;
  budgets: Budget[]; // Список доступных бюджетов
}

const CreateExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  budgets,
}) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [budgetId, setBudgetId] = useState<string>(
    budgets.length === 1 ? budgets[0].id : "" // Устанавливаем id, если бюджет только один
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount && budgetId) {
      onSubmit({ name, amount: Number(amount), budgetId });
      setName("");
      setAmount("");
      setBudgetId("");
    }
  };

  console.log("budgets", budgets.length);

  return (
    <Card>
      <FormTitle>
        Создать трату{" "}
        {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
      </FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            placeholder="Название траты"
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
            placeholder="Сумма траты"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
            min="0"
          />
        </FormField>
        <FormField style={{ display: budgets.length === 1 ? "none" : "flex" }}>
          <Label htmlFor="budget">Бюджет</Label>
          <Select
            id="budget"
            value={budgetId}
            onChange={(e) => setBudgetId(e.target.value)}
            required
          >
            <option value="" disabled>
              Выберите бюджет
            </option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </Select>
        </FormField>
        <SubmitButton type="submit" disabled={!name || !amount || !budgetId}>
          Добавить трату
        </SubmitButton>
      </form>
    </Card>
  );
};

export default CreateExpenseForm;
