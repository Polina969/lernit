"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const courses_repository_1 = require("../repositories/courses-repository");
const express_validator_1 = require("express-validator");
// создание роутера на express
const getCourseRouter = (db) => {
    const coursesRouter = express_1.default.Router(); // наш роутер
    ///////////////////
    coursesRouter.get("/itMessage", (req, res) => {
        const messageIT = courses_repository_1.coursesRepository.messageText(); // импорт к репозиторию
        res.send(messageIT);
    });
    coursesRouter.get("/", (req, res) => {
        // используем CourseViewModel[] потому что выводим несколько таких объектов наличие массива тут нормально
        const findCours = courses_repository_1.coursesRepository.findCourses(req.query.title); // импорт к репозиторию
        res.send(findCours);
    });
    coursesRouter.get("/:id", (req, res) => {
        try {
            const findWithIDCours = courses_repository_1.coursesRepository.findWithIDCourses(+req.params.id); // импорт к репозиторию
            res.send(findWithIDCours);
        }
        catch (error) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        }
    });
    coursesRouter.post("/", (0, express_validator_1.body)("title")
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage("Title length не соответсвует"), (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res
                    .status(utils_1.HTTP_STATUSES.BAD_REQUEST_400)
                    .json({ errors: errors.array() }); // говорим typescript что это массив, и какого он типа.})
            }
            const createdCours = courses_repository_1.coursesRepository.createCours(req.body.title); // импорт к репозиторию
            res.status(utils_1.HTTP_STATUSES.CREATED_201).json(createdCours);
        }
        catch (error) {
            res
                .status(utils_1.HTTP_STATUSES.BAD_REQUEST_400)
                .send({ message: error.message });
        }
    });
    // fetch("http://localhost:4001/courses/1", {
    //   method: "PUT",
    //   body: JSON.stringify({ title: "OLD progect" }),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
    coursesRouter.delete("/:id", (req, res) => {
        // res считается что нельзя типпизровать при удаление
        const deleteCours = courses_repository_1.coursesRepository.deleteCourse(+req.params.id); // импорт к репозиторию
        res.send(deleteCours);
    });
    // fetch('http://localhost:3000/courses/1',{method: 'DELETE'})
    // .then(res => res.json())
    // .then(json => console.log(json))
    coursesRouter.put("/:id", (req, res) => {
        const putCours = courses_repository_1.coursesRepository.putCourses(+req.params.id, req.body.title); // импорт к репозиторию
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
    });
    return coursesRouter;
};
exports.getCourseRouter = getCourseRouter;
