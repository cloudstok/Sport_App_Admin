import { all } from "axios";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { thirdPartyApi } from "./thirdPartyApi";

export class teamController extends ResponseInterceptor{
    connection : connection
    thirdPartyApi : thirdPartyApi

    constructor(){
        super()
        this.connection = new connection()
        this.thirdPartyApi = new thirdPartyApi()
    }

    async addTeam(req:any, res: any){
        try{
            let a  =[];
            let allTeam = await this.thirdPartyApi.team();
            // for(let x of allTeam.data){
            //   a.push([x.teamId , 4 , x.teamName , x.img])
            // }
            
            return res.send(allTeam)
        }
        catch(err){
              console.log(err)
        }
    }

}

