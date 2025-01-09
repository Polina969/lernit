import { findAncestor } from "typescript";
import { db } from "../db/db";
import express from "express";
import { CourseType } from "../db/db";
import { CourseViewModel } from "../models/CourseViewModel";
import { HTTP_STATUSES } from "../utils";

const transformCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
}; // это сократит код на даннный момент этот блок в коде применен не везде//

export const coursesRepository = {
  messageText() {
    return "IT-INCUBAR FOR YOU";
  },
  findCourses(title?: string) {
    if (title) {
      let foundCourses = db.courses.filter((p) => p.title.indexOf(title) > -1);
      return foundCourses.map(transformCourseViewModel); // для того тобы избежать излишков объекта courses *return foundCourses.map(CourseViewModel);*
    } else {
      return db.courses.map(transformCourseViewModel);
    }
  },

  findWithIDCourses(id: number): CourseViewModel {
    const foundIDCourse = db.courses.find((p) => p.id === id);
    if (!foundIDCourse) {
      throw new Error(`Course with id ${id} not found`); // не поняла че зачем но эта тема не выводиться
    }
    return transformCourseViewModel(foundIDCourse);
  },

  createCours(title: string): CourseViewModel {
    const createdCourse = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    // console.log(db.courses.push(createdCourse));
    // if (!createdCourse) {
    //   throw new Error(`Course with id ${title} not found`); // не поняла че зачем но эта тема не выводиться
    // } else {
    db.courses.push(createdCourse); // добавила эту строку
    return transformCourseViewModel(createdCourse);
    // }
  },

  deleteCourse(id: number) {
    db.courses = db.courses.filter((c) => c.id !== id);
    return HTTP_STATUSES.NO_CONTENT_204;
  },
  putCourses(id: number, title: string) {
    if (!title) {
      return HTTP_STATUSES.BAD_REQUEST_400;
    }

    const foundCourse = db.courses.find((c) => c.id === id);
    if (!foundCourse) {
      return HTTP_STATUSES.NOT_FOUND_404;
    }

    foundCourse.title = title;
    console.log("** # УСПЕШНОЕ ОБНОВЛЕНИЕ **");

    return HTTP_STATUSES.NO_CONTENT_204;
  },
};
