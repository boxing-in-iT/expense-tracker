import React from "react";
import styled from "styled-components";
import { Expense } from "../data/interfaces";
import { formatDateToLocaleString, getAllMatchingItems } from "../util/util";

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #e0f7fa;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

interface Props {
  expense: Expense;
}

const ExpenseTableRow = (props: Props) => {
  const { expense } = props;
  const { id, budgetId, name, amount, createdAt } = expense;

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: budgetId,
  })[0];

  return (
    <TableRow key={expense.id}>
      <TableCell>{budget.name}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>{formatDateToLocaleString(expense.createdAt)}</TableCell>
    </TableRow>
  );
};

export default ExpenseTableRow;
