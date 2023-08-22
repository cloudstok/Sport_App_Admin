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

