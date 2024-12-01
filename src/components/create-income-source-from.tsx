import React, { useState } from "react";
import styled from "styled-components";

// Стили
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

interface CreateIncomeSourceFormProps {
  onSubmit: (incomeSource: { name: string }) => void;
}

const CreateIncomeSourceForm = (props: CreateIncomeSourceFormProps) => {
  const { onSubmit } = props;
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      onSubmit({ name });
      setName("");
    }
  };

  return (
    <Card>
      <FormTitle>Создать источник дохода</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            placeholder="Название источника дохода"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            required
          />
        </FormField>
        <SubmitButton type="submit" disabled={!name}>
          Создать
        </SubmitButton>
      </form>
    </Card>
  );
};

export default CreateIncomeSourceForm;
