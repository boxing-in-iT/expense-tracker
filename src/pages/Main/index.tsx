import React from "react";
import styled from "styled-components";
import BudgetCard from "../../components/budget-card";
import { Budget, Expense, Income, IncomeSource } from "../../data/interfaces";
import CreateBudgetForm from "../../components/create-budget-form";
import CreateExpenseForm from "../../components/create-expense-form";
import {
  createBudget,
  createExpense,
  createIncome,
  createIncomeSource,
} from "../../util/util";
import { useAppContext } from "../../AppContext";
import ExpensesTable from "../../components/expenses-table";
import CreateIncomeSourceForm from "../../components/create-income-source-from";
import CreateIncomeForm from "../../components/create-income-form";
import IncomeCard from "../../components/income-card";
import IncomeTable from "../../components/income-table";

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
  position: relative;
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

const IncomeButton = styled.button`
  position: absolute;
  top: 24%;
  right: -70px;
  height: 350px;
  transform: translateY(-50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl; /* Rotate text */
  text-align: center;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #45a049;
  }
`;

// const IncomeContainer = styled.div`
//   grid-column: span 2;
//   gap: 75px;
//   padding: 100px 0;
//   display: grid;
//   border-top: 1px solid ${colors.border};
//   grid-template-columns: repeat(
//     auto-fill,
//     minmax(300px, 1fr)
//   ); /* Автоматическое заполнение */
//   grid-auto-rows: min-content; /* Автоматическая высота строк */
// `;
const IncomeContainer = styled.div`
  border-top: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IncomeSourcesList = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

// Main component
const Main = () => {
  const {
    budgets,
    setBudgets,
    expenses,
    setExpenses,
    isExpense,
    setIsExpense,
    incomeSources,
    setIncomeSources,
    income,
    setIncome,
  } = useAppContext();
  const handleAddBudget = (budget: { name: string; amount: number }) => {
    const newBudget: Budget = createBudget(budget);
    setBudgets([...budgets, newBudget]);
    console.log(newBudget);
    console.log(typeof newBudget);
  };

  const handleAddIncomeSource = (incomeSource: { name: string }) => {
    const newIncomeSource: IncomeSource = createIncomeSource(incomeSource);
    setIncomeSources([...incomeSources, newIncomeSource]);
  };

  const handleAddExpense = (expense: {
    name: string;
    amount: number;
    budgetId: string;
  }) => {
    const newExpense: Expense = createExpense(expense);
    setExpenses([...expenses, newExpense]);
  };

  const handleAddIncome = (incomeArguments: {
    name: string;
    amount: number;
    incomeSourceId: string;
  }) => {
    const newIncome: Income = createIncome(incomeArguments);
    setIncome([...income, newIncome]);
  };

  const handleToggleExpense = () => {
    setIsExpense(!isExpense);
  };

  return (
    <PageContainer>
      {/* Budget creation form */}

      <IncomeButton onClick={handleToggleExpense}>
        {isExpense ? "Доход" : "Расход"}
      </IncomeButton>

      {isExpense ? (
        <>
          {/* Expense creation form */}
          <FormContainer>
            <CreateBudgetForm onSubmit={handleAddBudget} />
          </FormContainer>
          <FormContainer>
            {budgets && budgets.length > 0 ? (
              <CreateExpenseForm
                onSubmit={handleAddExpense}
                budgets={budgets}
              />
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
        </>
      ) : (
        <>
          <FormContainer>
            <CreateIncomeSourceForm onSubmit={handleAddIncomeSource} />{" "}
          </FormContainer>
          <FormContainer>
            {incomeSources && incomeSources.length > 0 ? (
              <CreateIncomeForm
                onSubmit={handleAddIncome}
                incomeSources={incomeSources}
              />
            ) : (
              <EmptyMessage>Сначала создайте источник дохода</EmptyMessage>
            )}
          </FormContainer>

          <IncomeContainer>
            {incomeSources && incomeSources.length > 0 ? (
              <IncomeCard income={income} incomeSources={incomeSources} />
            ) : (
              <EmptyMessage>Нет источников дохода</EmptyMessage>
            )}
          </IncomeContainer>
          <IncomeContainer>
            <IncomeSourcesList>
              <ListTitle>Источники дохода</ListTitle>
              <ul>
                {incomeSources && incomeSources.length > 0 ? (
                  incomeSources.map((source) => (
                    <ListItem key={source.id}>{source.name}</ListItem>
                  ))
                ) : (
                  <p>Нет источников дохода</p>
                )}
              </ul>
            </IncomeSourcesList>
          </IncomeContainer>
          {/* Список источников дохода */}

          <TableContainer>
            {income && income.length > 0 ? (
              <IncomeTable income={income} />
            ) : (
              <EmptyMessage>Нет доходов</EmptyMessage>
            )}
          </TableContainer>
        </>
      )}
    </PageContainer>
  );
};

export default Main;
