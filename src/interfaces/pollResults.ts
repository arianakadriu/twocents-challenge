export interface IPollResults {
  question: string;
  createdAt: string;
  options: string[];
  results: {
    [key: string]: {
      votes: number;
      average_balance: number;
    };
  };
  comments: number;
  views: number;
}