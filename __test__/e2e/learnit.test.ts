import request from "supertest"
import {app} from '../../src'



describe('/cour', () => {

    it('блабла', async () => {
    await request(app)
    .get('/courses')
    .expect(200, [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation qa'},
        {id: 4, title: 'devops'} 
    ])
})

it('should return 200 and empty array', () => {
    expect(1).toBe(1)
})
})