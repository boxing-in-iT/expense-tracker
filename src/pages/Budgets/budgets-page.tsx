import React from "react";
import styled from "styled-components";
import { Budget, Expense } from "../../data/interfaces";
import { calculateSpentByBudget, createExpense } from "../../util/util";
import BudgetCard from "../../components/budget-card";
import CreateExpenseForm from "../../components/create-expense-form";
import { useAppContext } from "../../AppContext";

const colors = {
  background: "#f9f9f9",
  border: "#ddd",
  text: "#333",
  emptyText: "#888",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const PageContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-template-rows: auto 1fr;
  gap: 20px;
  height: 100vh;
  padding: 50px 20px;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface BudgetProps {
  budget: Budget;
  //   expenses: Expense[];
}

const BudgetsPage = (props: BudgetProps) => {
  const { setExpenses, expenses } = useAppContext();
  const { budget } = props;
  const { id, name, amount } = budget;
  const spent = calculateSpentByBudget(id);

  const handleAddExpense = (expense: {
    name: string;
    amount: number;
    budgetId: string;
  }) => {
    const newExpense: Expense = createExpense(expense);
    setExpenses([...expenses, newExpense]);
  };

  return (
    <PageContainer>
      <FormContainer>
        <BudgetCard budget={budget} />
      </FormContainer>
      <FormContainer>
        <CreateExpenseForm budgets={[budget]} onSubmit={handleAddExpense} />
      </FormContainer>
    </PageContainer>
  );
};

export default BudgetsPage;
