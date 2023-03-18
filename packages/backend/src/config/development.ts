import dotenv from "dotenv";
dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET
};