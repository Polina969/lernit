import express, { NextFunction, Request, Response } from "express";
import { CourseViewModel } from "./models/CourseViewModel";
import { getCourseRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { db } from "./db/db";
import { HTTP_STATUSES } from "./utils";

export const app = express();
export const PORT = 4005;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

// export const bodyParser = require("body-parser"); // не очень понятно надо не надо у димыча установлен boduparser в старой версие вроде как уже в новых уроках bodyparser игнорируется
// app.use(bodyParser.json());
// // Для обработки x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// // Для обработки raw (бинарных) данных
// app.use(bodyParser.raw());
// // Для обработки text/plain
// app.use(bodyParser.text()); // так как считается что форма напинаия в виде app.use(body.parser()) устаревшая

// const authGuardMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.query.token === "123") {
//     next();
//   } else {
//     res.send(HTTP_STATUSES.UNAUTHORIZED_401);
//   }
// };
// let requestCounter = 0;
// const requestCounterMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   requestCounter++;
//   next();
// };
// const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   // @ts-ignore
//   req.blabla = "hello";
//   next();
// };
// app.use(requestCounterMiddleware); //этот блок на данный момент в коде не выводится
// app.use(authGuardMiddleware); // этот блок кода выступает как промежуточный заставляющий все запросы обязательно вводить token
// app.use(blablaMiddleware);

app.use("/courses", getCourseRouter(db));
app.use("/__test__", getTestsRouter(db));

// app.get("/products", (req: Request, res: Response) => {
//   //@ts-ignore
//   const blabla = req.blabla;
//   res.send({ value: blabla + "!!!!" });
// });
// app.get("users", (req: Request, res: Response) => {
//   //@ts-ignore
//   const blabla = req.blabla;
//   res.send({ value: blabla + "from users!!!!" });
// });
