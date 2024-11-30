export interface User {
  name: string;
}

export interface Budget {
  id: string; // Changed from number to string
  name: string;
  amount: number;
  createdAt: number;
  color: string;
}
