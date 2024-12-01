import React from "react";
import { Income } from "../data/interfaces";
import styled from "styled-components";
import IncomeTableRow from "./income-table-row";

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

type IncomeTableProps = {
  income: Income[];
};

const IncomeTable = (props: IncomeTableProps) => {
  const { income } = props;

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Источник дохода</TableHeader>
          <TableHeader>Комментарий</TableHeader>
          <TableHeader>Сума дохода</TableHeader>
          <TableHeader>Дата</TableHeader>
        </tr>
      </thead>
      <tbody>
        {income.slice(0, 5).map((item) => (
          <IncomeTableRow key={item.id} income={item} />
        ))}
      </tbody>
    </Table>
  );
};

export default IncomeTable;
