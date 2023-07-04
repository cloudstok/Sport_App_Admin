import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { admin } from "../core/controllers/adminController";
import { reelController } from "../core/controllers/reelController";

export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  admin: admin
  reels: reelController
  

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.admin = new admin();
    this.reels = new reelController();
  }

  /**
    *  page not found.  
   */
  pageNotFound(req : any, res :any, ) {
    this.responseInterceptor.sendError(res, 404, "InvalidURI", "Requested URL is invalid. Please try again");
  }
  testAPI(req : any, res  : any){
    this.test.test(req, res, )
  }
  register(req : any ,res : any){
    this.admin.register(req, res)
  }
  login(req : any, res : any){
    this.admin.login(req, res)
  }
  findAllAdmin(req: any, res : any){
    this.admin.findAllAdmin(req, res)
  }
  updateAdmin(req:any, res :any){
    this.admin.updateAllAdmin(req, res)
  }
  deleteAdmin(req:any, res :any){
    this.admin.DeleteAdmin(req, res)
  }
  userFindById(req:any, res :any){
    this.admin.findById(req, res)
  }
  //<---------------reels---------------->

  addReel(req : any, res: any){
    this.reels.addReel(req, res)
  }
  showReel(req : any , res : any){
    this.reels.showReel(req,res)
  }
}