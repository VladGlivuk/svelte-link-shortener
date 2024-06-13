export type Link = {
  history: Array<History>;
  clicks: number;
  url: string;
};

export type Stats = { history: Array<History>, totalClicks: number, shortUrl: string }

type History = {
  time: string;
  userAgent: string | null;
  ip: string | null;
  geo: string | null;
};