import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandlers();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandlers() {}

  private connectToDatabase() {
    const { MONGO_URI } = process.env;
    mongoose.connect(MONGO_URI);
  }
}

export default App;
