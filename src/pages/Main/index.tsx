import React from "react";
import styled from "styled-components";
import BudgetCard from "../../components/budget-card";
import { Budget, Expense } from "../../data/interfaces";
import CreateBudgetForm from "../../components/create-budget-form";
import CreateExpenseForm from "../../components/create-expense-form";
import { createBudget, createExpense } from "../../util/util";
import { useAppContext } from "../../AppContext";
import ExpensesTable from "../../components/expenses-table";

// Variables for reusable styles
const colors = {
  background: "#f9f9f9",
  border: "#ddd",
  text: "#333",
  emptyText: "#888",
  shadow: "rgba(0, 0, 0, 0.1)",
};

// Styled components
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
  /* background-color: ${colors.background}; */
  /* background-color: #ffffff;
  box-shadow: 0 4px 8px ${colors.shadow}; */
  /* border: 1px solid ${colors.border}; */

  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardsContainer = styled.div`
  grid-column: span 2;
  gap: 75px;
  padding: 100px 0;
  /* overflow-y: auto; */
  display: grid;
  border-top: 1px solid ${colors.border};
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Автоматическое заполнение */
  grid-auto-rows: min-content; /* Автоматическая высота строк */
`;

// const CardsContainer = styled.div`
//   grid-column: span 2;
//   display: grid;
//   grid-template-columns: repeat(
//     auto-fill,
//     minmax(250px, 1fr)
//   ); /* Автоматическое заполнение */
//   grid-auto-rows: min-content; /* Автоматическая высота строк */
//   gap: 20px; /* Расстояние между карточками */
//   justify-items: center; /* Центрирование карточек */
//   padding: 50px 0;
//   border-top: 1px solid ${colors.border};
// `;

const EmptyMessage = styled.p`
  color: ${colors.emptyText};
  font-size: 16px;
  text-align: center;
`;

const TableContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 100px 0;
  /* overflow-y: auto; */
  border-top: 1px solid ${colors.border};
`;

// Main component
const Main = () => {
  const { budgets, setBudgets, expenses, setExpenses } = useAppContext();
  const handleAddBudget = (budget: { name: string; amount: number }) => {
    const newBudget: Budget = createBudget(budget);
    setBudgets([...budgets, newBudget]);
    console.log(newBudget);
    console.log(typeof newBudget);
  };

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
      {/* Budget creation form */}
      <FormContainer>
        <CreateBudgetForm onSubmit={handleAddBudget} />
      </FormContainer>

      {/* Expense creation form */}
      <FormContainer>
        {budgets && budgets.length > 0 ? (
          <CreateExpenseForm onSubmit={handleAddExpense} budgets={budgets} />
        ) : (
          <EmptyMessage>Сначала создайте бюджет</EmptyMessage>
        )}
      </FormContainer>

      {/* Budget cards */}
      <CardsContainer>
        {budgets && budgets.length > 0 ? (
          [...budgets]
            .reverse()
            .slice(0, 4)
            .map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                showDetailButton={true}
              />
            ))
        ) : (
          <EmptyMessage>Нет бюджетов</EmptyMessage>
        )}
      </CardsContainer>

      {/* Expenses table */}
      <TableContainer>
        {expenses && expenses.length > 0 ? (
          <ExpensesTable expenses={expenses} />
        ) : (
          <EmptyMessage>Нет расходов</EmptyMessage>
        )}
      </TableContainer>
    </PageContainer>
  );
};

export default Main;
