import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger/swagger-output.json';
import route from './routes';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api/', route);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
