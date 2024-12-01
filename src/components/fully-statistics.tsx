import React from "react";
import styled from "styled-components";
import { Budget, Expense, Income, IncomeSource } from "../data/interfaces";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExpenseIncomeCard from "./ExpenseIncomeCard";

const Card = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Два столбца */
  grid-template-rows: 1fr 1fr; /* Два ряда */
  grid-template-areas:
    "left right" /* Верхний ряд: левая и правая части */
    "left bottom"; /* Нижний ряд: левая часть и нижняя правая часть */
  gap: 20px;
`;

const LeftPart = styled.div`
  grid-area: left;
  /* background-color: lightblue; */
`;

const RightPart = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: 1fr 1fr; /* Разделение на верхнюю и нижнюю части */
  gap: 10px;
`;

const UpperRight = styled.div`
  background-color: lightcoral;
  height: 150px;
`;

const LowerRight = styled.div`
  background-color: lightgreen;
`;

interface FullyStatisticProps {
  budgets: Budget[];
  expenses: Expense[];
  incomes: Income[];
  incomeSources: IncomeSource[];
}

const filterIncomes = (incomes: Income[]) => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getTime(); // Начало текущего месяца
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getTime(); // Конец текущего месяца

  const filteredIncome = incomes.filter((income) => {
    return income.createdAt >= startOfMonth && income.createdAt <= endOfMonth;
  });

  const sortedIncome = filteredIncome.sort((a, b) => b.amount - a.amount);

  return sortedIncome;
};

const FullyStatistic = (props: FullyStatisticProps) => {
  const { budgets, expenses, incomes, incomeSources } = props;

  console.log("Incomes: ", incomes);

  console.log("Expenses: ", incomes);

  const sortedIncome = filterIncomes(incomes);

  console.log("Sorted Incomes: ", sortedIncome);

  return (
    <Card>
      <LeftPart>
        <ExpenseIncomeCard incomes={incomes} />
      </LeftPart>
      <RightPart>
        <UpperRight>Верхняя правая часть</UpperRight>
        <LowerRight>Нижняя правая часть</LowerRight>
      </RightPart>
    </Card>
  );
};

export default FullyStatistic;
