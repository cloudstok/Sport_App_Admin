<<<<<<< HEAD
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
=======
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { thirdPartyApi } from "./thirdPartyApi";

export class playerController extends ResponseInterceptor{
    connection : connection
    thirdPartyApi : thirdPartyApi

    constructor(){
        super()
        this.connection = new connection()
        this.thirdPartyApi = new thirdPartyApi()
    }

    async addPlayer(req:any, res: any){
        try{
            let a  =[];
            let allPlayer = await this.thirdPartyApi.player()
            let {playerId,name,Born, Role, img, Teams, Batting, Bowling, career, profile} = allPlayer
            let Birth_Place = allPlayer['Birth Place']
            let batting_style = allPlayer['Batting Style'] 
            let bowling_style = allPlayer['Bowling Style']
            let data = [+playerId,name,4, Born,Birth_Place, Role, img, Teams, JSON.stringify(career),bowling_style, batting_style, JSON.stringify(Batting), JSON.stringify(Bowling), profile]
            let sql = `insert into player (player_id , player_name, sport_id, born, birth_place, role, cover_img, teams, career, bowling_style, batting_style,batting ,bowling,profile) values (?)` 
            await this.connection.write.query(sql,[data])
            return res.send({msg: "insert successfully"})
        }
        catch(err){
              console.log(err)
        }
    }

}

>>>>>>> 89266b8ceb93502f02eea75932b80f42619fe867
