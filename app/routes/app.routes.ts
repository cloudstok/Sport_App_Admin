 import { register } from "../core/validation/schema";
import { RoutingComponents } from "./routing-components";
import { apiValidation } from "../core/validation/apiValidation";
import { tokenController } from "../core/jwt/jsonwebtoken";
import { upload } from "../core/uploadDocs/DocsController";
export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  apiValidation :any = apiValidation
  tokenController : tokenController
  upload = upload
  register = register
    constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
     this.apiValidation = new apiValidation()
     this.register = register
     this.tokenController = new tokenController()
      this .upload = upload
    /* Post calls */
    this.AppPostRoutes = [
      //DEPOSIT
      {
        path: "/test",
        component: [
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/admin/register",
        component: [
          // this.apiValidation.validate(register),
          routingComponents.register.bind(routingComponents)
        ]
      },
      {
        path: "/admin/login",
        component: [
          routingComponents.login.bind(routingComponents)
        ]
      },
      {
        path: "/addReel",
        component: [
          routingComponents.addReel.bind(routingComponents)
        ]
      },

      // 404
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }


    ];

    /* Get call */
    this.AppGetRoutes = [
      // 404
      {
        path: "/admin/alluser",
        component: [
          routingComponents.findAllAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/findbyid/:a_id",
        component: [
          routingComponents.userFindById.bind(routingComponents)
        ]
      },
      {
        path: "/showReel",
        component : [
          routingComponents.showReel.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      },
    ];
    // update  request
    this.AppUpdateRoutes = [
      // 404
      {
        path: "/admin/updateuser/:a_id",
        component: [
          routingComponents.updateAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/deleteuser/:a_id",
        component: [
          routingComponents.deleteAdmin.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      },
    ];

    // delete requests
    this.AppDeleteRoutes = [
      // 404
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }
}
