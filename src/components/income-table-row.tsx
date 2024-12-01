import React from "react";
import { Income } from "../data/interfaces";
import { formatDateToLocaleString, getAllMatchingItems } from "../util/util";
import styled from "styled-components";

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
  income: Income;
}

const IncomeTableRow = (props: Props) => {
  const { income } = props;
  const { id, name, amount, createdAt } = income;

  const incomeSource = getAllMatchingItems({
    category: "incomeSources",
    key: "id",
    value: income.incomeSourceId,
  })[0];

  return (
    <TableRow key={id}>
      <TableCell>{incomeSource.name}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>{formatDateToLocaleString(createdAt)}</TableCell>
    </TableRow>
  );
};

export default IncomeTableRow;
