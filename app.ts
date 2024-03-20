import express from 'express';
import path from 'path';
import employeeRouter from './src/routers/employeeRouter';
import requestRouter from './src/routers/requestRouter';
import publicHolidayRouter from './src/routers/publicHolidayRouter';

const PORT = 3033;
const HOST = 'localhost';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/', employeeRouter);
app.use('/', requestRouter);
app.use('/public-holidays', publicHolidayRouter);

app.get('/', (req, res) => res.status(200).render('index'));

app.get('*', (req, res)  => {
  res.status(404).render('error');
});

app.listen(PORT, HOST, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});
