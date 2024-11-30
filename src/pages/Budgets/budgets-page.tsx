import React from "react";
import styled from "styled-components";
import { Budget, Expense } from "../../data/interfaces";
import {
  calculateSpentByBudget,
  createExpense,
  getAllMatchingItems,
} from "../../util/util";
import BudgetCard from "../../components/budget-card";
import CreateExpenseForm from "../../components/create-expense-form";
import { useAppContext } from "../../AppContext";
import { useParams, useSearchParams } from "react-router-dom";
import ExpensesTable from "../../components/expenses-table";

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

interface BudgetProps {
  budget: Budget;
  //   expenses: Expense[];
}

const BudgetsPage = () => {
  const { setExpenses } = useAppContext();
  const { id } = useParams();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: id,
  })[0];

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: id,
  });

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
      <TableContainer>
        {expenses.length > 0 ? (
          <>
            <h3>Траты</h3>
            <ExpensesTable expenses={expenses} />
          </>
        ) : (
          <h3 style={{ color: colors.emptyText }}>Нет трат по бюджету</h3>
        )}
      </TableContainer>
    </PageContainer>
  );
};

export default BudgetsPage;
