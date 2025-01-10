"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
const utils_1 = require("../utils");
const transformCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
    };
}; // это сократит код на даннный момент этот блок в коде применен не везде//
exports.coursesRepository = {
    messageText() {
        return "IT-INCUBAR FOR YOU";
    },
    findCourses(title) {
        if (title) {
            let foundCourses = db_1.db.courses.filter((p) => p.title.indexOf(title) > -1);
            return foundCourses.map(transformCourseViewModel); // для того тобы избежать излишков объекта courses *return foundCourses.map(CourseViewModel);*
        }
        else {
            return db_1.db.courses.map(transformCourseViewModel);
        }
    },
    findWithIDCourses(id) {
        const foundIDCourse = db_1.db.courses.find((p) => p.id === id);
        if (!foundIDCourse) {
            throw new Error(`Course with id ${id} not found`); // не поняла че зачем но эта тема не выводиться
        }
        return transformCourseViewModel(foundIDCourse);
    },
    createCours(title) {
        const createdCourse = {
            id: +new Date(),
            title: title,
            studentsCount: 0,
        };
        // console.log(db.courses.push(createdCourse));
        // if (!createdCourse) {
        //   throw new Error(`Course with id ${title} not found`); // не поняла че зачем но эта тема не выводиться
        // } else {
        db_1.db.courses.push(createdCourse); // добавила эту строку
        return transformCourseViewModel(createdCourse);
        // }
    },
    deleteCourse(id) {
        db_1.db.courses = db_1.db.courses.filter((c) => c.id !== id);
        return utils_1.HTTP_STATUSES.NO_CONTENT_204;
    },
    putCourses(id, title) {
        if (!title) {
            return utils_1.HTTP_STATUSES.BAD_REQUEST_400;
        }
        const foundCourse = db_1.db.courses.find((c) => c.id === id);
        if (!foundCourse) {
            return utils_1.HTTP_STATUSES.NOT_FOUND_404;
        }
        foundCourse.title = title;
        console.log("** # УСПЕШНОЕ ОБНОВЛЕНИЕ **");
        return utils_1.HTTP_STATUSES.NO_CONTENT_204;
    },
};
