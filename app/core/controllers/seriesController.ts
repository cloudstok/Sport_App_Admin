import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { thirdPartyApi } from "../controllers/thirdPartyApi";

export class SeriesController extends ResponseInterceptor {
    connection: connection
    thirdPartyApi: thirdPartyApi
    constructor() {
        super();
        this.thirdPartyApi = new thirdPartyApi()
        this.connection = new connection()
    }
    async insertSeries(req: any, res: any) {
        try {
            let seriesList = await this.thirdPartyApi.series_list()
            for (let x of seriesList.seriesMapProto) {
                for (let y of x.series) {
                    y.startDt = new Date(parseInt(y.startDt));
                    y.endDt = new Date(parseInt(y.endDt));
                    await this.connection.write.query(`insert into series(sport_id, series_name, start_dt, end_dt) values (?,?,?,?)`, [y.id, y.name, y.startDt, y.endDt])
                }
            }
            return res.send("okay")
        }
        catch (err) {
            console.log(err)

        }
    }



}
