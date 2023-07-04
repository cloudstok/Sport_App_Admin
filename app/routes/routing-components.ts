import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { admin } from "../core/controllers/adminController";
import { ThemeController } from "../core/controllers/themes.controller"

export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  admin: admin
  theme: ThemeController
  

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.admin = new admin();
    this.theme = new ThemeController();
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

  // <-----------------for themes------------------->
addThemes(req:any, res: any){
  this.theme.addThemes(req,res)
}

getAllThemes(req: any, res: any){
  this.theme.showThemes(req, res)
}
updateTheme(req: any, res: any){
  this.theme.updateThemes(req ,res)
}  
deleteThemes(req:any, res: any){
  this.theme.deleteThemes(req,res)
}
}