const request = require('supertest');
const app = require('../app');

describe('Rate Limit on /login', () => {
    it('should start slowing down after 3 failed attempts', async () => {
        const start = Date.now();
    
        for (let i = 0; i < 4; i++) {
            await request(app).post('/login')
                .set('Accept', 'application/json')
                .send({ identifier: 'admin', password: 'wrong' });
        }
    
        const end = Date.now();
        const duration = end - start;
        
        // Delay minimal 1 detik, maksimal 5 detik
        expect(duration).toBeGreaterThanOrEqual(1000);
        expect(duration).toBeLessThan(5000)
    });
    
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
