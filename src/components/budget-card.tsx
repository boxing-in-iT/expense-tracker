import React from "react";
import styled from "styled-components";
import { Budget } from "../data/interfaces";
import { calculatePercentangle, calculateSpentByBudget } from "../util/util";

// Стили для карточки
const Card = styled.div<{ color: string; isOverBudget: boolean }>`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ isOverBudget }) =>
    isOverBudget ? "#ffe6e6" : "#f9f9f9"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const Amount = styled.div<{ isOverBudget: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ isOverBudget }) => (isOverBudget ? "#f44336" : "#333")};
  margin: 10px 0;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressBarFill = styled.div<{
  percentage: number;
  color: string;
  isOverBudget: boolean;
}>`
  width: ${({ percentage }) => Math.min(percentage, 100)}%;
  height: 100%;
  background-color: ${({ isOverBudget }) =>
    isOverBudget ? "#f44336" : "#4caf50"};
  transition: width 0.3s ease;
`;

type Props = {
  budget: Budget;
};

// Компонент BudgetCard
const BudgetCard = (props: Props) => {
  const { budget } = props;
  const { id, name, amount, createdAt, color } = budget;
  const spent = calculateSpentByBudget(id);
  const percentagle = calculatePercentangle(spent, amount);
  const isOverBudget = spent > amount;

  return (
    <Card color={color} isOverBudget={isOverBudget}>
      <Header>{name}</Header>
      <Amount isOverBudget={isOverBudget}>
        {isOverBudget
          ? `Превышение на ${spent - amount}$`
          : `${amount - spent}$ осталось`}
      </Amount>
      <Details>Из {amount} бюджета</Details>
      <ProgressBarContainer>
        <ProgressBarFill
          percentage={+percentagle}
          color={color}
          isOverBudget={isOverBudget}
        />
      </ProgressBarContainer>
    </Card>
  );
};

export default BudgetCard;
