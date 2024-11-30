import React from "react";
import styled from "styled-components";
import { Budget } from "../data/interfaces";
import { calculatePercentangle, calculateSpentByBudget } from "../util/util";
import { Link } from "react-router-dom";

// Стили для карточки
const Card = styled.div<{ color: string; isOverBudget: boolean }>`
  /* width: 400px; */
  width: 100%;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ isOverBudget }) =>
    isOverBudget ? "#ffe6e6" : "#f9f9f9"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div<{ color: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ color }) => color};
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
  /* background-color: ${({ isOverBudget }) =>
    isOverBudget ? "#f44336" : "#4caf50"}; */
  background-color: ${({ color }) => color};
  transition: width 0.3s ease;
`;

const DetailButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;

type Props = {
  budget: Budget;
  showDetailButton?: boolean;
};

// Компонент BudgetCard
const BudgetCard = ({ budget, showDetailButton = false }: Props) => {
  const { id, name, amount, createdAt, color } = budget;
  const spent = calculateSpentByBudget(id);
  const percentagle = calculatePercentangle(spent, amount);
  const isOverBudget = spent > amount;

  return (
    <Card color={color} isOverBudget={isOverBudget}>
      <Header color={color}>{name}</Header>
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
      {showDetailButton && (
        <Link to={`/budgets/${id}`}>
          <DetailButton>Подробнее</DetailButton>
        </Link>
      )}
    </Card>
  );
};

export default BudgetCard;
