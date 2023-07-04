import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../../core/jwt/jsonwebtoken";
export class admin extends ResponseInterceptor {
    public connection: connection
    SQL_CHECK_ADMIN: string = "select * from admin_profile where admin_id = ? limit 1";
    SQL_INSERT_ADMIN: string = "insert into admin_profile(admin_id, password) values (?,?)";
    SQL_ALL_ADMIN: string = "select * from admin_profile";
    SQL_UPDATE_ADMIN: string = "update admin_profile set admin_id = ?, password= ? where a_id = ? limit 1 ";
    SQL_DELETE_ADMIN: string = "update admin_profile set is_deleted = 1 where a_id = ? limit 1 ";
    encryptionDecryption : EncryptionDecryption;
    tokenController : tokenController;
    constructor() {
        super()
        this.connection = new connection()
        this.encryptionDecryption = new EncryptionDecryption()
        this.tokenController = new tokenController()
    }
    async register(req: any, res: any) {
        try {
            const { admin_id, password } = req.body
            const [user]: any = await this.connection.write.query(this.SQL_CHECK_ADMIN, [admin_id]);
            if (user.length > 0) {
                return this.sendBadRequest(res,  "User Already Exist" , this.BAD_REQUEST)
            }
            const hash = await this.encryptionDecryption.Encryption(password)
            await this.connection.write.query(this.SQL_INSERT_ADMIN, [admin_id, hash]);
            return this.sendSuccess(res, { message: "admin Insert Successfully" })
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }

    }

    async login(req: any, res: any) {
        try {
            const { admin_id, password } = req.body
            const [user]: any = await this.connection.write.query(this.SQL_CHECK_ADMIN, [admin_id]);
            if (user.length === 0) {
                return this.sendBadRequest(res, "You are not register" , this.BAD_REQUEST)
            }
            const comparePassword = await this.encryptionDecryption.Decryption(password , user[0].password)
            if (!comparePassword) {
                return this.sendBadRequest(res,  "Wrong Password", this.BAD_REQUEST,)
            }
            const token = await this.tokenController.generateToken(user[0] , res )
            return this.sendSuccess(res, { message: "Login Successfully", token: token })
        }
        catch (err) {
            console.log(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
   async findAllAdmin(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_ALL_ADMIN);
        return this.sendSuccess(res, { data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async updateAllAdmin(req : any, res : any){
    try{
        const { admin_id, password } = req.body
        let a_Id = req.params.a_id
        const [user]: any = await this.connection.write.query(this.SQL_UPDATE_ADMIN, [admin_id, password, a_Id]);
        return this.sendSuccess(res, { message: "User updated Successfully", data : user })

    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async DeleteAdmin(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_DELETE_ADMIN, [req.params.a_id]);
        return this.sendSuccess(res, { message: "User delete Successfully", data : user })
    }
    catch(err){
        console.log(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
   async findById(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_CHECK_ADMIN, [req.params.a_id]);
        return this.sendSuccess(res, {  data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

}