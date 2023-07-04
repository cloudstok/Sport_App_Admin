import { ResponseInterceptor } from '../utilities/response-interceptor';
import {connection} from '../../config/dbConf';

export class reelController extends ResponseInterceptor{
    public connection : connection
    SQL_ADD_REELS : string = 'insert into reels(url) values (?)';
    SQL_SHOW_REELS : string = 'select * from reels';


    constructor(){
        super()
        this.connection = new connection();
    }

    async addReel (req: any, res: any){
        try{
            const {url} = req.body
            const [addingReel]:any = await this.connection.write.query(this.SQL_ADD_REELS, [url])
            return this.sendSuccess(res, {msg: "Reels added Successfully", data: addingReel})

        }
        catch(err){
           this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }

    async showReel (req : any , res : any) {
        try{
            const [showsReel] = await this.connection.read.query(this.SQL_SHOW_REELS);
            return this.sendSuccess(res, showsReel)
        }
        catch(err){
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }

}