import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { tournament } from "../../core/thirdPartyApi/tournament";

export class SeriesController extends ResponseInterceptor {
    connection: connection
    tournament : tournament
    constructor() {
        super();
        this.tournament = new tournament()
        this.connection = new connection()
    }
    async insertSeries(req: any, res: any) {
        try { 
            let seriesList = await this.tournament.list_tournament("tournament_key")
            console.log(seriesList)
           res.send(seriesList)
        //     let value = []
        //     for (let x of seriesList.seriesMapProto) {
        //         for (let y of x.series) {
        //             y.startDt = new Date(parseInt(y.startDt));
        //             y.endDt = new Date(parseInt(y.endDt));
        //             value.push([y.id, 4 , y.name, y.startDt, y.endDt])
        //         }
        //     }
        //    const [series]  = await this.connection.write.query("insert ignore into series(series_id,sport_id, series_name, start_dt, end_dt) values ?", [value])
        //     this.sendSuccess(res, {status: true, msg: 'series inserted successfully',data: series})
         }
        catch (err) {
            console.log(err)

        }
    }



}
