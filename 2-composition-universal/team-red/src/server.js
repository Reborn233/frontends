/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import renderPage from './page/render';
import {
  ALL
} from './constant'

const app = express();
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/red', express.static('./build'));

app.get('/:status?', (req, res) => {
  const status = req.params.status || ALL;
  const html = renderPage(status);
  res.render('layout', {
    html
  });
});

app.listen(3003);
console.log(`🔴  team red running. product page is available here:
>> http://127.0.0.1:3003/`);
