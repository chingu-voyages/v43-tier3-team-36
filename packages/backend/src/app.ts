import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import config from "config";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import API from "./routes";
import usePassportLocal from "./utils/passportLocal";

const file = fs.readFileSync('../docs/swagger.yaml', 'utf8')

const swaggerDocument = YAML.parse(file)

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(session({
  secret: config.get("SESSION_SECRET"),
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
usePassportLocal(passport);
app.use("/api", API);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error'
  })
} )


app.listen(config.get("PORT") || 3000, () => {
	console.log(`App running on port ${config.get("PORT")}...`)
})
