import { ResponseInterceptor } from "../../utilities/response-interceptor";
import { connection } from "../../../config/dbConf";
import { cricketApi } from "../../thirdPartyApi/thirdPartyApi";
import { json } from "express";

const add_tournaments = "insert IGNORE into tournament(tou_key ,name , short_name , countries , start_date , gender , point_system ,competition , association_key , metric_group , sport , is_date_confirmed , is_venue_confirmed , last_scheduled_match_date ,formats ) VALUEs ?"
const update_tournaments = "update tournament set teams = ? , rounds = ? where tou_key = ? "
const add_matches = "insert ignore into cricket_match(match_key,name,short_name,sub_title,status,start_at,tou_key,tou_name,tou_short_name,metric_group,sport,winner,team,venue,association,messages,gender,format) values ?"
const detail_match = "update  cricket_match set toss = ?, play =?, players=?, notes = ?, data_review=?, squad = ?, estimated_end_date = ?, completed_date_approximate = ?, umpires=?, weather = ? where match_key = ?";
const add_teams = "insert ignore into teams(team , tournament , tournament_team) value(?,?,?)"
const table = "INSERT INTO result_table (tou_key, tou_name, rounds) VALUES (?, ?, ?)"

export class API_TO_INTEGRATE extends ResponseInterceptor {
  connection: connection;
  cricketapi: cricketApi
  constructor() {
    super();
    this.connection = new connection();
    this.cricketapi = new cricketApi()


  }
  async add_tournaments(req: any, res: any) {
    try {
      let result: any = await this.cricketapi.Featured_Tournaments();
      let finalData = []
      for (let x of result?.data?.tournaments) {
        finalData.push([
          x.key, x.name, x?.short_name ?? "", x?.countries[0]?.code, new Date(x.start_date), x.gender, x.point_system, JSON.stringify(x?.competition ?? {}), x.association_key, x.metric_group, x.sport, x.is_date_confirmed, x.is_venue_confirmed, new Date(x.last_scheduled_match_date), JSON.stringify(x.formats)
        ])
      }
      await this.connection.write.query(add_tournaments, [finalData])
      this.sendSuccess(res, { status: true, msg: 'tournaments inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)

    }
  }

  async update_tournaments(req: any, res: any) {
    try {
      let detail_tournament: any = await this.cricketapi.get_tournament(req.query.tou_key)
      await this.connection.write.query(update_tournaments, [JSON.stringify(detail_tournament.data.teams), JSON.stringify(detail_tournament.data.rounds), req.query.tou_key])
      this.sendSuccess(res, { status: true, msg: 'tournaments detail inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }





  async add_matches(req: any, res: any) {
    try {
      let match_data: any = await this.cricketapi.featured_matches(req.query.tou_key);
      let finalData = []
      for (let x of match_data.data.matches) {
        finalData.push([
          x.key, x.name, x.short_name, x.sub_title, x.status, new Date(x.start_at * 1000), x.tournament.key, x.tournament.name, x.tournament.short_name, x.metric_group, x.sport, x.winner, JSON.stringify(x.teams), JSON.stringify(x.venue), JSON.stringify(x.association), JSON.stringify(x.messages), x.gender, x.format
        ])
      }
      await this.connection.write.query(add_matches, [finalData])
      this.sendSuccess(res, { status: true, msg: 'matches inserted successfully' })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }

  async detail_match(req: any, res: any) {
    try {
      let match_detail :any = await this.cricketapi.detail_match(req.query.match_key);
      let { toss, play, players, notes, data_review, squad, estimated_end_date, completed_date_approximate, umpires, weather } = match_detail.data;
      estimated_end_date = estimated_end_date && estimated_end_date !== undefined ? estimated_end_date : 0;
      await this.connection.write.query(detail_match, [JSON.stringify(toss), JSON.stringify(play), JSON.stringify(players), JSON.stringify(notes), JSON.stringify(data_review), JSON.stringify(squad), new Date(estimated_end_date * 1000), new Date(completed_date_approximate), JSON.stringify(umpires), weather, req.query.match_key]);
      this.sendSuccess(res, { status: true, msg: "Match details updated successfully" })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }

  async add_teams(req: any, res: any) {
    try {

      let team_data: any = await this.cricketapi.get_tournament_team(req.query.tou_key, req.query.team_key)
      await this.connection.write.query(add_teams, [JSON.stringify(team_data.data.team), JSON.stringify(team_data.data.tournament), JSON.stringify(team_data.data.tournament_team)])
      this.sendSuccess(res, { status: true, msg: 'matches inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }

  async table(req: any, res: any) {
    try {
      let tableData: any = await this.cricketapi.get_tournament_tables(req.query.tou_key)
      let data = [tableData.data.tournament.key, tableData.data.tournament.name, JSON.stringify(tableData.data.rounds)]
      await this.connection.write.query(table, data)
      this.sendSuccess(res, { status: true, msg: 'table inserted successfully' })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }

  async fantasy_matchPoints(req: any, res: any) {
    try {
      let fantasy: any = await this.cricketapi.get_fantasy_matchPoints(req.query.match_key);
      let {match, overrides, metrics, players, teams, last_updated, points} = fantasy.data;
      const fantasy_sql = "INSERT IGNORE INTO fantasy( match_key , overrides, metrics, players, teams, last_updated) values( ?,?,?,?,?,?)";
      const point_sql = "INSERT IGNORE INTO fantasy_points( match_key , ranks, points, player_key, points_str, last_updated , tournament_points , points_breakup) values ?"
      let b = points.map(e=>([req.query.match_key,e.rank,e.points,e.player_key, e.points_str, new Date(e.last_updated),  e.tournament_points, JSON.stringify(e.points_breakup)]))
      overrides = overrides? overrides : {}
      await this.connection.write.query(point_sql , [b])
      await this.connection.write.query(fantasy_sql, [req.query.match_key ,JSON.stringify(overrides) ,JSON.stringify(metrics), JSON.stringify(players), JSON.stringify(teams), new Date(last_updated)]);
      this.sendSuccess(res, {status: true, msg: "Fantasy points data inserted successfully"});
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  }

}


