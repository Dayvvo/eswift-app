import next from 'next';

import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compress from 'compression';
import session from 'express-session';
import { appConfig } from './utils/config';
import passport from 'passport';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';


import indexRoutes from './routes/indexRoutes';


const app = express();
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTName || 'localhost';
const port = (process.env.PORT || 3000) as number;

console.log('dev mode',process.env['NODE_ENV'])

const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler();
dotenv.config()

nextApp.prepare().then(() => {
  
  let config = new appConfig()

  app.use(compress());

  app.use(passport.initialize());

  config.initializePassportStrategy();

  config.connectDB();

  // Initialize passport

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: true, // don't create session until something stored
    })
  );

  // Init Middlewarezx
  app.use(logger('dev'));

  app.use(express.json());

  app.use(cors());

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use('/api', indexRoutes);

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log('it starts with')
      return next()
    }
    console.log('it dont starts with')
    return handle(req, res)
  });

  app.get('/', async (req, res) => {
    await nextApp.render(req, res, '/', req.query as NextParsedUrlQuery)
  });

  app.get('/blog', async (req, res) => {
    await nextApp.render(req, res, '/blog', req.query as NextParsedUrlQuery);
  });

  app.get('/login', async (req, res) => {
    await nextApp.render(req, res, '/login', req.query as NextParsedUrlQuery);
  });

  app.get('/reset-password', async (req, res) => {
    await nextApp.render(req, res, '/reset', req.query as NextParsedUrlQuery);
  });

  app.get('/verify-password', async (req, res) => {
    await nextApp.render(req, res, '/verify-password', req.query as NextParsedUrlQuery);
  });

  app.get('/property/', async (req, res) => {
    await nextApp.render(req, res, '/property', req.query as NextParsedUrlQuery)
  });

  app.get('/property/:id', async (req, res) => {
    await nextApp.render(req, res, '/property/[id]', { id: req.params.id, ...req.query } as NextParsedUrlQuery);
  });

  app.get('admin/property/:id', async (req, res) => {
    await nextApp.render(req, res, 'admin/property/[id]', { id: req.params.id, ...req.query } as NextParsedUrlQuery);
  });


  app.get('/settings', async (req, res) => {
    await nextApp.render(req, res, '/settings', req.query as NextParsedUrlQuery);
  });

  
  app.use(
    express.json({
      limit: '5mb',
    })
  );

  const PORT = process.env.PORT || 5500;

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
