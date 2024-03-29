import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import employeeRouter from './src/routers/employeeRouter.js';
import requestRouter from './src/routers/requestRouter.js';
import authRouter from './src/routers/authRouter.js';
import publicHolidayRouter from './src/routers/publicHolidayRouter.js';
import { connectToDatabase } from './src/utils/database.js';
import dotenv from 'dotenv';
import { ConfiguratePassport } from './src/utils/passport.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import EmployeeService from './src/services/employeeService.js';

dotenv.config();
const PORT: number = parseInt(process.env.PORT!);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const employeeService = new EmployeeService;

const app = express();
ConfiguratePassport(passport);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', employeeRouter);
app.use('/', requestRouter);
app.use('/', authRouter);
app.use('/public-holidays', publicHolidayRouter);

app.get('/', async (req, res) => {
  if(req.cookies.access_token){
  const employee =  await employeeService.getEmployeebyJwt(req.cookies.access_token.token);
  res.status(200).render('index', {employee, access_token: req.cookies.access_token});
  } else {
  res.status(200).render('index', {access_token: req.cookies.access_token});
  }
});

app.get('*', (req, res)  => {
  res.status(404).render('error');
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started: http://localhost:${PORT}`);
});
