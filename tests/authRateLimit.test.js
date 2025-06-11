const request = require('supertest');
const app = require('../app');

describe('Rate Limit on /login', () => {
    it('should block requests after 5 failed attempts', async () => {
        for (let i = 0; i < 5; i++) {
            const res = await request(app).post('/login')
                .set('Accept', 'application/json')
                .send({ identifier: 'admin', password: 'wrong' });
            expect(res.statusCode).toBe(401);
        }

        const res = await request(app).post('/login')
            .set('Accept', 'application/json')
            .send({ identifier: 'admin', password: 'wrong' });
        expect(res.statusCode).toBe(429);
    });
});
