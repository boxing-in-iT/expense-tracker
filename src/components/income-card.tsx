import React, { useState } from "react";
import styled from "styled-components";
import { Income, IncomeSource } from "../data/interfaces";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const Card = styled.div`
  /* width: 100%; */
  width: 800px;
  /* max-width: 450px; */
  height: 350px;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffd700, #ffecb3); /* Градиент */
  box-shadow: 0 8px 15px rgba(255, 215, 0, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 20px rgba(255, 215, 0, 0.7);
  }
`;

const Header = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #5d4037; /* Тёмно-коричневый */
  margin-bottom: 15px;
  text-align: center;
`;

const Amount = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  text-align: center;
`;

const HoveredInfo = styled.div`
  font-size: 1rem;
  color: #666;
  margin-top: 10px;
  text-align: center;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  incomeSources: IncomeSource[];
  income: Income[];
};

const IncomeCard = ({ income, incomeSources }: Props) => {
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const incomeSourceMap = incomeSources.reduce<{ [key: string]: IncomeSource }>(
    (acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    },
    {}
  );

  const groupedData = income.reduce<{
    [key: string]: { name: string; amount: number; color: string };
  }>((acc, curr) => {
    const source = incomeSourceMap[curr.incomeSourceId];
    if (!source) return acc;
    if (!acc[source.name]) {
      acc[source.name] = { name: source.name, amount: 0, color: source.color };
    }
    acc[source.name].amount += curr.amount;
    return acc;
  }, {});

  const chartData = Object.values(groupedData);

  const totalIncome = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card>
      <Header>Доходы</Header>
      <Amount>{totalIncome.toLocaleString()} $</Amount>
      <ChartContainer>
        <PieChart width={200} height={200}>
          <Pie
            data={chartData}
            cx={100}
            cy={100}
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="amount"
            onMouseEnter={(data, index) => setHoveredSource(data.name)}
            onMouseLeave={() => setHoveredSource(null)}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ChartContainer>
      {hoveredSource && <HoveredInfo>Источник: {hoveredSource}</HoveredInfo>}
    </Card>
  );
};

export default IncomeCard;
