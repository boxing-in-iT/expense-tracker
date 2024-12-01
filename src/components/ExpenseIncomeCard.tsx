import React from "react";
import styled from "styled-components";
import { Expense, Income } from "../data/interfaces";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExpenseIncomeCardProps {
  incomes: Income[];
}

const transformData = (data: any[]) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString(); // Преобразуем метку времени в строку даты
    if (groupedData[date]) {
      groupedData[date] += item.amount;
    } else {
      groupedData[date] = item.amount;
    }
  });

  return Object.keys(groupedData).map((date) => ({
    date,
    income: groupedData[date],
  }));
};

const ExpenseIncomeCard = (props: ExpenseIncomeCardProps) => {
  const { incomes } = props;

  const chartData = transformData(incomes);

  console.log("chartData", chartData);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseIncomeCard;
