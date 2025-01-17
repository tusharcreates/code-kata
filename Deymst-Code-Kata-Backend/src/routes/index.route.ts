import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}spreadsheet`, this.indexController.getSpreadsheetData);
    this.router.post(`${this.path}loanoutcome`, this.indexController.getLoanOutcome);
  }
}

export default IndexRoute;
