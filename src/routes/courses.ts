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

const CourseViewModel = (dbCourse: CourseType): CourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
}; // это сократит код на даннный момент этот блок в коде применен не везде//

// создание роутера на express
export const getCourseRouter = (db: DBType) => {
  const coursesRouter = express.Router(); // наш роутер
  ///////////////////
  coursesRouter.get("/itMessage", (req: Request, res: Response) => {
    res.send({ message: "IT-INCUBAR FOR YOU" });
  });

  coursesRouter.get(
    "/",
    (
      req: RequestWithQuery<QueryCoursesModel>,
      res: Response<CourseViewModel[]>
    ) => {
      // используем CourseViewModel[] потому что выводим несколько таких объектов наличие массива тут нормально

      let foundCourses = db.courses;

      if (req.query.title) {
        foundCourses = foundCourses.filter(
          (c) => c.title.indexOf(req.query.title) > -1
        );
      }
      // для того чтобы избежать излишков объекта courses
      res.json(foundCourses.map(CourseViewModel));
    }
  );
  coursesRouter.get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const foundCourse = db.courses.find((c) => c.id === +req.params.id);

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }
      //  для того чтобы избежать излишков объекта courses но так как здесь надо вытащить один объект решение немно отличается
      res.json({
        id: foundCourse.id,
        title: foundCourse.title,
      });
    }
  );
  coursesRouter.post(
    "/",
    (
      req: RequestWithdResBodyAndReqBody<
        ResCreateCourseModel,
        ReqCreateCourseModel
      >,
      res: Response<CourseViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }
      const createdCourse = {
        id: +new Date(),
        title: req.body.title,
        studentsCount: 0,
      };
      db.courses.push(createdCourse);

      res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
    }
  );
  // fetch('http://localhost:3000/courses',{method: 'POST', body: JSON.stringify({title: 'new c'}), headers: {
  //         'content-type': 'application/json'
  //     }})
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  coursesRouter.delete(
    "/:id",
    (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<{}>) => {
      // res считается что нельзя типпизровать при удаление
      db.courses = db.courses.filter((c) => c.id !== +req.params.id);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204); // в целом можно поставить выпел программ
    }
  );
  // fetch('http://localhost:3000/courses/1',{method: 'DELETE'})
  // .then(res => res.json())
  // .then(json => console.log(json))
  coursesRouter.put(
    "/courses/:id",
    (
      req: RequestWithParamsAndReqBody<
        URIParamsCourseIdModel,
        ReqCreateCourseModel
      >,
      res: Response<{}>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const foundCourse = db.courses.find((c) => c.id === +req.params.id);
      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      foundCourse.title = req.body.title;

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  return coursesRouter;
};
