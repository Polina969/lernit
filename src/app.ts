import express, { Request, Response } from "express";
import { CourseViewModel } from "./models/CourseViewModel";
import { getCourseRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { db } from "./db/db";

export const app = express();
export const PORT = 5000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/courses", getCourseRouter(db));
app.use("/__test__", getTestsRouter(db));
