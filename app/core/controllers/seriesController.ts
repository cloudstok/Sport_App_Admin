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
    async addSeries(req: any, res: any) {
        try {
            let seriesList = await this.thirdPartyApi.series_list()
               
            for (let x of seriesList.data) {
            let data = x.time.split('-')
                   let a =   [x.seriesId , 4, x.name , new Date( x.year[x.year.length -1] + data[1]) , new Date( x.year[x.year.length -1] + data[1]) ]
               await this.connection.write.query(`insert  ignore into series(series_id, sport_id, series_name, start_dt, end_dt) values (?,?,?,?,?)`, a)
             
            }
            return res.send("inserted successfully ")
        }
        catch (err) {
            console.log(err)

        }
    }



}
