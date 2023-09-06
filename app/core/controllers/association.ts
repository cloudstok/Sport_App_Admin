import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";
import { tournament } from "../thirdPartyApi/tournament";
import { json } from "express";
export class association extends ResponseInterceptor {
connection : connection
tournament : tournament
  constructor() {
    super();
    this.connection = new connection()
    this.tournament = new tournament()
  }

async add_association(req :any , res : any){
    try{
      let result :any = await this.tournament.get_associations();
      let finalData = []
for(let x of result?.data?.associations){
   finalData.push([
    x.key ,x.code ,x.name ,JSON.stringify(x.country) , x.parent
   ])
}   
const sql = 'insert into associations(ass_key ,code , name , country , parent) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'association inserted successfully'})

    }catch(err){
      console.log(err)

    }
}
async add_venues(req :any , res : any){
    try{
      let result :any = await this.tournament.venues(1);
      let finalData = []
for(let x of result?.data?.venues){
   finalData.push([
    x.key ,x.city ,x.name ,JSON.stringify(x.country) , x.geolocation
   ])
}   
const sql = 'insert into venues(ven_key ,city , name , country , geolocation) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'venues inserted successfully'})
    }catch(err){
      console.log(err)

    }
}

async add_countries(req :any , res : any){
    try{
      let result :any = await this.tournament.countries();
      let finalData = []
for(let x of result?.data?.countries){
   finalData.push([
    x.short_code ,x.code ,x.name ,x.official_name , x.is_region
   ])
}   
const sql = 'insert into countries(short_code ,code , name , official_name , is_region) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'countries inserted successfully'})
    }catch(err){
      console.log(err)

    }
}
async add_tournaments(req :any , res : any){
    try{
        const association_key = 'c__board__icc__c2ab7ee61'
      let result :any = await this.tournament.Featured_Tournaments(association_key);
      let finalData = []
for(let x of result?.data?.tournaments){
   finalData.push([
    x.key ,x.name ,x.short_name ,JSON.stringify(x.countries), new Date(x.start_date) , x.gender,x.point_system,JSON.stringify(x.competition), x.association_key , x.metric_group, x.sport ,x.is_date_confirmed ,x.is_venue_confirmed , new Date(x.last_scheduled_match_date) , JSON.stringify(x.formats)
   ])
}   
const sql = 'insert into tournament(tou_key ,name , short_name , countries , start_date , gender , point_system ,competition , association_key , metric_group , sport , is_date_confirmed , is_venue_confirmed , last_scheduled_match_date ,formats ) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'tournaments inserted successfully'})
    }catch(err){
     console.error(err)

    }
}

async add_matches (req:any ,res:any){
  try{
  let tournament_key = 'c__season__iimt20s__639db'
 let match_data : any = await this.tournament.featured_matches(tournament_key);
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

}
