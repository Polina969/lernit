import express, { Request, Response } from "express";

export const app = express();
const PORT = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

//

type CourseType = {
  id: number;
  title: string;
};

const db: { courses: CourseType[] } = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "automation qa" },
    { id: 4, title: "devops" },
  ],
};

//

app.get("/", (req: Request<{}, {}, {}, {}>, res: Response) => {
  res.send({ message: "IT-INCUBAR FOR YOU" });
});

app.get(
  "/courses",
  (req: Request<{}, {}, {}, { title: string }>, res: Response<{}>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
      foundCourses = foundCourses.filter(
        (c) => c.title.indexOf(req.query.title) > -1
      );
    }

    res.json(foundCourses);
  }
);

app.get(
  "/courses/:id",
  (req: Request<{ id: string }>, res: Response<CourseType>) => {
    const foundCourse = db.courses.find((c) => c.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json(foundCourse);
  }
);

app.post(
  "/courses",
  (req: Request<{}, {}, { title: string }>, res: Response<CourseType>) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const createdCourse = {
      id: +new Date(),
      title: req.body.title,
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

app.delete("/courses/:id", (req: Request<{ id: string }>, res) => {
  // res считается что нельзя типпизровать при удаление
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204); // в целом можно поставить выпел программ
});

app;
// fetch('http://localhost:3000/courses/1',{method: 'DELETE'})
// .then(res => res.json())
// .then(json => console.log(json))

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
