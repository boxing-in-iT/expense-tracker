import React from "react";
import styled from "styled-components";
import { Expense } from "../data/interfaces";
import ExpenseTableRow from "./expenses-table-row";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  color: #333;
`;

const TableHeader = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const expensesData = [
  { id: 1, category: "Food", amount: 20, date: "2024-11-28" },
  { id: 2, category: "Transport", amount: 10, date: "2024-11-27" },
  { id: 3, category: "Entertainment", amount: 50, date: "2024-11-26" },
];

interface ExpensesTableProps {
  expenses: Expense[];
}

const ExpensesTable = (props: ExpensesTableProps) => {
  const { expenses } = props;

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Бюджет</TableHeader>
          <TableHeader>Комментарий</TableHeader>
          <TableHeader>Сума платежа</TableHeader>
          <TableHeader>Дата</TableHeader>
        </tr>
      </thead>
      <tbody>
        {expenses.slice(0, 5).map((expense) => (
          <ExpenseTableRow key={expense.id} expense={expense} />
        ))}
      </tbody>
    </Table>
  );
};

export default ExpensesTable;
