import { ResponseInterceptor } from "../../utilities/response-interceptor";
import { connection} from "../../../config/dbConf";
import { cricketApi } from "../../thirdPartyApi/thirdPartyApi";
import { any } from "joi";

export class API_TO_INTEGRATE extends ResponseInterceptor {
    connection : connection;
    cricketapi : cricketApi
constructor(){
    super();
    this.connection = new connection();
    this.cricketapi = new cricketApi()


}
async add_tournaments(req :any , res : any){
    try{
      let result :any = await this.cricketapi.Featured_Tournaments();
      let finalData = []
for(let x of result?.data?.tournaments){
   finalData.push([
    x.key ,x.name ,x?.short_name?? "" , x?.countries[0]?.code , new Date(x.start_date) , x.gender,x.point_system,JSON.stringify(x?.competition ?? {}), x.association_key , x.metric_group, x.sport ,x.is_date_confirmed ,x.is_venue_confirmed , new Date(x.last_scheduled_match_date) , JSON.stringify(x.formats)
   ])
}   
const sql = 'insert IGNORE into tournament(tou_key ,name , short_name , countries , start_date , gender , point_system ,competition , association_key , metric_group , sport , is_date_confirmed , is_venue_confirmed , last_scheduled_match_date ,formats ) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'tournaments inserted successfully'})
    }catch(err){
     console.error(err)

    }
}

async update_tournaments(req :any , res :any){
  try{
    let detail_tournament  : any= await this.cricketapi.get_tournament(req.query.tou_key)
    let sql = "update tournament set teams = ? , rounds = ? where tou_key = ? "
    await this.connection.write.query(sql , [JSON.stringify(detail_tournament.data.teams) , JSON.stringify(detail_tournament.data.rounds)  , req.query.tou_key])
    this.sendSuccess(res, {status: true, msg: 'tournaments detail inserted successfully'})
  }catch(err){
    console.error(err)
  }
}





async add_matches (req:any ,res:any){
    try{
    // let tournament_key = 'c__season__iimt20s__639db'
   let match_data : any = await this.cricketapi.featured_matches(req.query.tou_key);
   let finalData = []
   for(let x of match_data.data.matches){
    finalData.push([
      x.key,x.name,x.short_name,x.sub_title,x.status,new Date(x.start_at),JSON.stringify(x.tournament),x.metric_group,x.sport,x.winner,JSON.stringify(x.teams),JSON.stringify(x.venue),JSON.stringify(x.association),JSON.stringify(x.messages),x.gender,x.format
    ])
   }
   const sql = "insert into cricket_match(matche_key,name,short_name,sub_title,status,start_at,tournament,metric_group,sport,winner,team,venue,association,messages,gender,format) values ?"
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'matches inserted successfully'})
      
    }catch(err){
      console.error(err)
    }
  }


async add_teams(req:any ,res :any){
    try{
      // const tournament_key = 'c__season__iimt20s__639db' 
      // const team_key = 'c__team__jer__2ab00'
          let team_data : any= await this.cricketapi.get_tournament_team(req.query.tou_key , req.query.team_key)
          let sql = "insert into teams(team , tournament , tournament_team) value(?,?,?)"
          await this.connection.write.query(sql , [JSON.stringify(team_data.data.team) , JSON.stringify(team_data.data.tournament) , JSON.stringify(team_data.data.tournament_team)])
          this.sendSuccess(res, {status: true, msg: 'matches inserted successfully'})
    }catch(err){
      console.error(err)
    }
  }

async table(req:any , res :any){
  try{
     let tableData : any = await this.cricketapi.get_tournament_tables(req.query.tou_key)
     let data = [tableData.data.tournament.key  , tableData.data.tournament.name , JSON.stringify(tableData.data.rounds)]
     let sql = "INSERT INTO result_table (tou_key, tou_name, rounds) VALUES (?, ?, ?)"
     await this.connection.write.query(sql , data)
     this.sendSuccess(res, {status: true, msg: 'table inserted successfully'})

  }catch(err){
    console.error(err)
  }
}   

async fantasy_matchPoints (req :any , res : any){
  try{
       let fantasy = await this.cricketapi.get_fantasy_matchPoints(req.query.match)
  }catch(err){
    console.error(err)
  }
}

}

