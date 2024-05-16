import { error } from 'console';
import { configDotenv } from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js'
import authRoutes from './routes/auth.routes.js'

configDotenv();

mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log('MondoDb conectado');
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use(express.json());

app.listen(3000, () =>{
    console.log('server is  running en 3000');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});