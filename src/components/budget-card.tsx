import React from "react";
import styled from "styled-components";

// Стили для карточки
const Card = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const Amount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
  margin: 10px 0;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

// Стили для прогресс-бара
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressBarFill = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${({ percentage }) =>
    percentage > 75 ? "#f44336" : percentage > 50 ? "#ff9800" : "#4caf50"};
  transition: width 0.3s ease;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// Компонент BudgetCard
const BudgetCard = () => {
  const totalBudget = 1250; // Общий бюджет
  const spent = 800; // Потрачено
  const remaining = totalBudget - spent; // Остаток
  const percentageSpent = (spent / totalBudget) * 100; // Процент потраченного

  return (
    <Card>
      <Header>Мой Бюджет</Header>
      <Amount>${remaining} осталось</Amount>
      <Details>Из $1250 бюджета</Details>
      <ProgressBarContainer>
        <ProgressBarFill percentage={percentageSpent} />
      </ProgressBarContainer>
      <Button>Добавить транзакцию</Button>
    </Card>
  );
};

export default BudgetCard;
