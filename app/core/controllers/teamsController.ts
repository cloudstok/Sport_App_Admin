import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
// import { thirdPartyApi } from "../thirdPartyApi/thirdPartyApi";

export class TeamsController extends ResponseInterceptor {
    connection: connection
    // thirdPartyApi: thirdPartyApi
    constructor() {
        super();
        // this.thirdPartyApi = new thirdPartyApi()
        this.connection = new connection()
    }
    async add_teams(req: any, res: any) {
        try { 
            let teamsList =  [] //await this.thirdPartyApi.teamsList()
            teamsList = teamsList.filter(e=> e.teamId && e.teamId !== null)
            let teamsData = []
            let playersData = []
            for(let x of teamsList){
                    let getPlayersData = [] // await this.thirdPartyApi.getPlayers(x.teamId);
                    getPlayersData = getPlayersData && getPlayersData !== null ? getPlayersData.filter(el=> el.id && el.id !== null) : []
                    for(let y of getPlayersData){
                        playersData.push([y.id, 4, y.name, y.battingStyle, y.bowlingStyle , x.teamName])
                    }
                teamsData.push([x.teamId , 4 , x.teamName ,  x.teamSName ,x.imageId , x.countryName])
            }
            await this.connection.write.query("insert ignore into player(player_id, sport_id, player_name, batting_style, bowling_style,team_name) values ?" , [playersData])
           const [teams] = await this.connection.write.query("insert ignore into team(team_id, sport_id, team_name, team_name_short, cover_img ,countryName ) values ?" , [teamsData])
           
            this.sendSuccess(res, {status: true, msg: 'series inserted successfully',data: teams})
        }
        catch (err) {
            console.log(err)

        }
    }



}
