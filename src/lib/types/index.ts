export type History = {
  time: string;
  userAgent: string | null;
  ip: string | null;
  geo: string | null;
};

export type Link = {
  history: Array<History>;
  clicks: number;
  url: string;
};