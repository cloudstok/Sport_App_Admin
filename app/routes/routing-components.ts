import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { admin } from "../core/controllers/adminController";
import { reelController } from "../core/controllers/reelController";
import {News} from "../core/controllers/newsController";
import {static_data} from '../core/controllers/Static_Data/static_data'
import { teamController } from "../core/controllers/teamController";
import { API_TO_INTEGRATE} from '../core/controllers/API_TO_INTEGRATE/api_to_integrate'
import { countries } from "../core/controllers/countries/countries";

export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  admin: admin
  reels: reelController
  news : News
  static_data :static_data
  teamController : teamController
  API_TO_INTEGRATE :API_TO_INTEGRATE
  countries : countries
  

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.admin = new admin();
    this.reels = new reelController();
    this.news = new News();
    this.static_data = new static_data()
    this.teamController = new teamController();
    this.API_TO_INTEGRATE = new API_TO_INTEGRATE();
    this.countries = new countries()
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

  //------------------association -----------------------------------
  add_association(req :any , res:any){
    this.static_data.add_association(req ,res)
  }
  add_venues(req :any , res:any){
    this.static_data.add_venues(req ,res)
  }
  add_countries(req :any , res:any){
    this.static_data.add_countries(req ,res)
  }
  countriesImage(req :any , res:any){
    this.countries.uploadImage(req ,res)
  }
  add_tournaments(req :any , res:any){
    this.API_TO_INTEGRATE.add_tournaments(req ,res)
  }
  update_tournament(req :any , res:any){
    this.API_TO_INTEGRATE.update_tournaments(req ,res)
  }
  add_matches(req :any , res:any){
    this.API_TO_INTEGRATE.add_matches(req ,res)
  }
  add_teams(req :any , res:any){
    this.API_TO_INTEGRATE.add_teams(req ,res)
  }
  table(req :any , res:any){
    this.API_TO_INTEGRATE.table(req ,res)
  }
  //<---------------reels---------------->

  addReel(req : any, res: any){
    this.reels.addReel(req, res)
  }
  showReel(req : any , res : any){
    this.reels.showReel(req,res)
  }

  //<--------------News-------------->
  getNews(req : any, res: any){
    this.news.getNews(req,res)
  }

  getNewsById(req:any, res:any){
    this.news.getNewsById(req,res)
  }

  insertNews(req:any, res:any){
    this.news.insertNews(req,res)
  }

  updateNews(req:any, res: any){
    this.news,this.updateNews(req,res)
  }

  deleteNews(req:any, res:any){
    this.news.deleteNews(req, res)
  }

// <------------------Series------------------->





//<-----------------Teams------------------------>

addTeam(req:any, res: any){
  this.teamController.get_team(req,res)
}

//<-----------------Player------------------->


  // <----------------Teams-------------------->


  // <----------------Players-------------------->


  }