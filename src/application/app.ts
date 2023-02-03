import express from 'express';
import { ErrorHandler } from '../infrastructure/middlewares/Error';
import userRoutes from '../infrastructure/routes/user.routes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/users', userRoutes);
app.use(ErrorHandler.execute)

export default app;