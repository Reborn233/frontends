/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import renderForm from './blue-form/render';

const app = express();
app.use(morgan('dev'));
app.use('/blue', express.static('./build'));

app.use('/blue-form', (req, res) => {
  res.send(renderForm(req.query.len));
});

app.listen(3001);
console.log(`🔵  team blue running. fragments are available here:
>> http://127.0.0.1:3001/blue-form`);
