export interface Chat {
  id: string;
  message: string;
  role: "bot" | "user";
  timestamp: Date;
}
