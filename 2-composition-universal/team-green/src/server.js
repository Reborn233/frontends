/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import renderNotes from './green-notes/render';
import {ALL} from './constant';

const app = express();
app.use(morgan('dev'));
app.use('/green', express.static('./build'));

app.use('/green-notes', (req, res) => {
  res.send(renderNotes(req.query.status));
});

app.listen(3002);
console.log(`💚  team green running. fragments are available here:
>> http://127.0.0.1:3002/green-notes`);
