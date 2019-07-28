import 'reflect-metadata';

import { json, urlencoded } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import normalizePort from './helpers/normalize-port';
import { getContainer } from './configuration';
import { HttpException } from './exceptions/http.exception';
import { globalErrorHandler } from './middleware/global-error-handler.middleware';

import './features';

const port = normalizePort(process.env.PORT || 3000);
const host = process.env.HOST || 'localhost';

getContainer().then(container => {
  const server = new InversifyExpressServer(container)
    .setConfig(svr => {
      svr.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');

        next();
      });

      svr.use(json()).use(urlencoded({ extended: true }));
    })
    .setErrorConfig(svr => {
      svr
        .use((req, res, next) =>
          next(new HttpException(404, '404 - Not Found'))
        )
        .use(globalErrorHandler);
    })
    .build();

  server.listen(port, host, () =>
    console.log(`Server listening on ${host}:${port}.`)
  );
});
