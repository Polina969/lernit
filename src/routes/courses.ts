import { Express } from "express";
import express, { Request, Response } from "express";
import { app } from "../app";
import { CourseViewModel } from "../models/CourseViewModel";
import { QueryCoursesModel } from "../models/QueryCoursesModel";
import { ReqCreateCourseModel } from "../models/ReqCreateCourseModel";
import { ResCreateCourseModel } from "../models/ResCreatedCourseModel";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import {
  RequestWithQuery,
  RequestWithParams,
  RequestWithdResBodyAndReqBody,
  RequestWithParamsAndReqBody,
} from "../types";
import { CourseType, db, DBType } from "../db/db";
import { HTTP_STATUSES } from "../utils";
import { coursesRepository } from "../repositories/courses-repository";
import {
  query,
  body,
  validationResult,
  ValidationError,
} from "express-validator";

//  const transformCourseViewModel = (
//   dbCourse: CourseType
// ): CourseViewModel => {
//   return {
//     id: dbCourse.id,
//     title: dbCourse.title,
//   };
// }; // это сократит код на даннный момент этот блок в коде применен не везде//

type ErrorResponse = {
  errors: ValidationError[];
};

type CatchResponse = {
  message: any;
};
// создание роутера на express
export const getCourseRouter = (db: DBType) => {
  const coursesRouter = express.Router(); // наш роутер
  ///////////////////
  coursesRouter.get("/itMessage", (req: Request, res: Response) => {
    const messageIT = coursesRepository.messageText(); // импорт к репозиторию
    res.send(messageIT);
  });

  coursesRouter.get(
    "/",
    (
      req: RequestWithQuery<QueryCoursesModel>,
      res: Response<CourseViewModel[]>
    ) => {
      // используем CourseViewModel[] потому что выводим несколько таких объектов наличие массива тут нормально
      const findCours = coursesRepository.findCourses(req.query.title); // импорт к репозиторию
      res.send(findCours);
    }
  );
  coursesRouter.get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      try {
        const findWithIDCours: CourseViewModel =
          coursesRepository.findWithIDCourses(+req.params.id); // импорт к репозиторию
        res.send(findWithIDCours);
      } catch (error: any) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );

  coursesRouter.post(
    "/",
    body("title")
      .trim()
      .isLength({ min: 3, max: 10 })
      .withMessage("Title length не соответсвует"),
    (
      req: RequestWithdResBodyAndReqBody<
        ResCreateCourseModel,
        ReqCreateCourseModel
      >,
      res: Response
    ) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json({ errors: errors.array() }); // говорим typescript что это массив, и какого он типа.})
        }

        const createdCours: CourseViewModel = coursesRepository.createCours(
          req.body.title
        ); // импорт к репозиторию
        res.status(HTTP_STATUSES.CREATED_201).json(createdCours);
      } catch (error: any) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST_400)
          .send({ message: error.message });
      }
    }
  );
  // fetch("http://localhost:4001/courses/1", {
  //   method: "PUT",
  //   body: JSON.stringify({ title: "OLD progect" }),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  coursesRouter.delete(
    "/:id",
    (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<{}>) => {
      // res считается что нельзя типпизровать при удаление
      const deleteCours = coursesRepository.deleteCourse(+req.params.id); // импорт к репозиторию
      res.send(deleteCours);
    }
  );
  // fetch('http://localhost:3000/courses/1',{method: 'DELETE'})
  // .then(res => res.json())
  // .then(json => console.log(json))
  coursesRouter.put(
    "/:id",
    (
      req: RequestWithParamsAndReqBody<
        URIParamsCourseIdModel,
        ReqCreateCourseModel
      >,
      res: Response<{}>
    ) => {
      const putCours = coursesRepository.putCourses(
        +req.params.id,
        req.body.title
      ); // импорт к репозиторию
      res.send(putCours);

      // if (!req.body.title) {
      //   res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      //   return;
      // }

      // const foundCourse = db.courses.find((c) => c.id === +req.params.id);
      // if (!foundCourse) {
      //   res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      //   return;
      // }

      // foundCourse.title = req.body.title;

      // res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  return coursesRouter;
};
