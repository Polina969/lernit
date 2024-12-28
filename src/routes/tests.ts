import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../utils";
import { DBType } from "../db/db";
import express, { Express } from "express";

export const getTestsRouter = (db: DBType) => {
  const testsRouter = express.Router(); // our router
  testsRouter.delete("/data", (req: Request, res: Response) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  return testsRouter;
};
