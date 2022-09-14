import cors from 'cors';
import express, { Express, json } from 'express';
import router from './router';

class App {
  server: Express;
  constructor() {
    this.server = express();
    this.controllers();
    this.routers();
  }

  controllers() {
    this.server.use(json());
    this.server.use(cors());
  }

  routers() {
    this.server.use(router);
  }
}
export default new App().server;
