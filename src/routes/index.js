import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import nightmarket from '../controller/nightmarket';

let router = express();

initializeDb(db => {
  router.use(middleware({config, db}));

  router.use('/nightmarket', nightmarket({config, db}));
});

export default router;
