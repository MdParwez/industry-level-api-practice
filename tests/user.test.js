process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Ensure this points to your server file

beforeAll(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/my-api-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Test MongoDB connected');
  } catch (err) {
    console.error('Test MongoDB connection error:', err.message);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log('Test MongoDB disconnected');
  } catch (err) {
    console.error('Test MongoDB disconnection error:', err.message);
  }
});

describe('User Registration', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
