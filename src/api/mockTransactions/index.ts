export interface Transaction {
  id: number;
  user: {
    name: string;
    wallet_address: string;
  };
  trans_hash: string;
  amount: number;
  incentive: number;
  is_success: boolean;
  created_at: string;
  updated_at: string;
}

// static data
const transactionsData: Transaction[] = [
  {
    id: 1,
    user: { name: "John Doe", wallet_address: "0x12345" },
    trans_hash: "0xabcdef1234567890",
    amount: 100,
    incentive: 5,
    is_success: true,
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:30:00Z",
  },
  {
    id: 2,
    user: { name: "Jane Smith", wallet_address: "0x67890" },
    trans_hash: "0x0987654321fedcba",
    amount: 200,
    incentive: 10,
    is_success: false,
    created_at: "2023-10-02T13:00:00Z",
    updated_at: "2023-10-02T13:30:00Z",
  },
];

export const getMockTransactions = (): Promise<Transaction[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(transactionsData), 500);
  });
