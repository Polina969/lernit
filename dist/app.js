"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routes/courses");
const tests_1 = require("./routes/tests");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
exports.PORT = 4005;
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
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
exports.app.use("/courses", (0, courses_1.getCourseRouter)(db_1.db));
exports.app.use("/__test__", (0, tests_1.getTestsRouter)(db_1.db));
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
