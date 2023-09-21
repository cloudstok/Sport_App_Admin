 import { findbyid, register } from "../core/validation/schema";
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
        path: "/register",
        component: [
          this.apiValidation.validate(register),
          routingComponents.register.bind(routingComponents)
        ]
      },
      {
        path: "/add_association",
        component: [
          routingComponents.add_association.bind(routingComponents)
        ]
      },
      {
        path: "/add_venues",
        component: [
          routingComponents.add_venues.bind(routingComponents)
        ]
      },
      {
        path: "/add_countries",
        component: [
          routingComponents.add_countries.bind(routingComponents)
        ]
      },
      {
        path: "/add_tournaments",
        component: [
          routingComponents.add_tournaments.bind(routingComponents)
        ]
      },
      {
        path: "/update_tournament",
        component: [
          routingComponents.update_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/add_matches",
        component: [
          routingComponents.add_matches.bind(routingComponents)
        ]
      },
      {
        path: "/table",
        component: [
          routingComponents.table.bind(routingComponents)
        ]
      },
      {
        path: "/add_teams",
        component: [
          routingComponents.add_teams.bind(routingComponents)
        ]
      },
      {
        path: "/login",
        component: [
          this.apiValidation.validate(register),
          routingComponents.login.bind(routingComponents)
        ]
      },
      {
        path: "/addReel",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.addReel.bind(routingComponents)
        ]
      },
      {
        path: "/insertNews",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.insertNews.bind(routingComponents)
        ]

      },
      {
        path: "/countriesImage",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.countriesImage.bind(routingComponents)
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
        path: "/alladmin",
        component: [
          routingComponents.findAllAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/findbyid/:a_id",
        component: [
          this.apiValidation.validateParams(findbyid),
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
          path: "/getNews",
          component: [
            routingComponents.getNews.bind(routingComponents)
          ]
      },
      {
        path: "/getNewsById",
        component: [
          routingComponents.getNewsById.bind(routingComponents)
        ]
    },
    {
      path: "/addTeam",
      component: [
        routingComponents.addTeam.bind(routingComponents)
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
        path: "/updateuser/:a_id",
        component: [
          routingComponents.updateAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/deleteuser/:a_id",
        component: [
          routingComponents.deleteAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/updateNews",
        component: [
          routingComponents.updateNews.bind(routingComponents)
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
        path: "/deleteNews",
        component: [
          routingComponents.deleteNews.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }
}
