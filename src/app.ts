import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { ErrorRequestHandler } from "express-serve-static-core";
import {
  Store,
  Logger,
  StoreMediator,
  Parser,
  commandMapping,
  format,
  Result,
} from "./lib/api";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// main routes
const parser = new Parser(commandMapping);
const store = new Store();
const storeLogger = new Logger();
const storeMediator = new StoreMediator(store, storeLogger);

app.get("/", (req, res, next) => {
  res.render("cli");
});

app.post("/", (req, res, next) => {
  const requestContent = req.body;
  const commandRes = parser.parse(requestContent);
  if (commandRes.error !== null) res.send(format(commandRes));
  else if (commandRes.value === null)
    res.send(format(Result.err("Unknown error")));
  else res.send(format(storeMediator.acceptCommand(commandRes.value)));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
} as ErrorRequestHandler);

export default app;
