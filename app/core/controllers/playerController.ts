import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
// import { thirdPartyApi } from "../thirdPartyApi/thirdPartyApi";

export class PlayerController extends ResponseInterceptor {
    connection: connection
    // thirdPartyApi: thirdPartyApi
    constructor() {
        super();
        // this.thirdPartyApi = new thirdPartyApi()
        this.connection = new connection()
    }
    async add_players(req: any, res: any) {
        try {
            let player = [] // await this.thirdPartyApi.players()
            let values = []
            for(let x of player){
                values.push([x.id , 4, x.name , x.teamName , x.faceImageId])
            }
           const [players] = await this.connection.write.query("insert ignore into player(player_id, sport_id, player_name, team_name  , cover_img) values ?" , [values])
            this.sendSuccess(res, {status: true, msg: 'series inserted successfully',data: players})
        }
        catch (err) {
            console.log(err)

        }
    }



}
