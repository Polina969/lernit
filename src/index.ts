import express from 'express'

const app = express()
const PORT = 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/', (req, res) => {
    res.send({message: 'IT-INCUBAR FOR YOU'})
})

// app.get('/courses/:id', (req, res) => {
//     res.json([
//         {id: 1, title: 'front-end'},
//         {id: 2, title: 'back-end'},
//         {id: 3, title: 'automation qa'},
//         {id: 4, title: 'devops'}
//     ].find(c => c.id === +req.params.id))
// })

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation qa'},
        {id: 4, title: 'devops'}        
    ]
}

app.get('/courses', (req, res) => {
    res.json(db.courses)
})

app.post('/courses', (req, res) => {
    const createdCourse = {
        id: +(new Date),
        title: req.body.title
    }
    db.courses.push(createdCourse)
        console.log(createdCourse)
        res.json(db.courses)
        res.json(createdCourse)
    })

// fetch('http://localhost:3000/courses',{method: 'POST', body: JSON.stringify({title: 'new c'}), headers: {
//         'content-type': 'application/json'
//     }})
//     .then(res => res.json())
//     .then(json => console.log(json))

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id)
    res.sendStatus(204) // в целом можно поставить выпел программ
})

// fetch('http://localhost:3000/courses/1',{method: 'DELETE'})
// .then(res => res.json())
// .then(json => console.log(json))


app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})