import { appConfig } from "./config/appConf";
import * as express from "express";
import { AppRoutes } from "./routes/app.routes";
import { ResponseInterceptor } from "./core/utilities/response-interceptor"


class App {
    public app: express.Application;
    private PORT: number = appConfig.server.port;
    responseInterceptor: ResponseInterceptor;
    constructor() {
        this.app = express();
        this.config();
        this.responseInterceptor = new ResponseInterceptor();
        this.app.listen(this.PORT, () => {
            console.log(`server listening @ port ${appConfig.server.port} `);
        });

        const appRoutes = new AppRoutes();
        let routeList = [];
        appRoutes.AppPostRoutes.forEach(element => routeList.push(element.path));
        appRoutes.AppGetRoutes.forEach(element => routeList.push(element.path));
        appRoutes.AppUpdateRoutes.forEach(element => routeList.push(element.path));
        appRoutes.AppDeleteRoutes.forEach(element => routeList.push(element.path));

        for (var getRoute = 0; getRoute < appRoutes.AppGetRoutes.length; getRoute++) {
            this.app.get(appRoutes.AppGetRoutes[getRoute].path, [appRoutes.AppGetRoutes[getRoute].component]);
        }
        for (var postRoute = 0; postRoute < appRoutes.AppPostRoutes.length; postRoute++) {
            this.app.post(appRoutes.AppPostRoutes[postRoute].path, [appRoutes.AppPostRoutes[postRoute].component]);
        }
        for (var putRoute = 0; putRoute < appRoutes.AppUpdateRoutes.length; putRoute++) {
            this.app.put(appRoutes.AppUpdateRoutes[putRoute].path, [appRoutes.AppUpdateRoutes[putRoute].component]);
        }
        for (var delRoute = 0; delRoute < appRoutes.AppDeleteRoutes.length; delRoute++) {
            this.app.delete(appRoutes.AppDeleteRoutes[delRoute].path, [appRoutes.AppDeleteRoutes[delRoute].component]);
        }
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}

export default new App().app;