import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../../core/jwt/jsonwebtoken";
import { SQL_ALL_ADMIN, SQL_CHECK_ADMIN, SQL_DELETE_ADMIN, SQL_INSERT_ADMIN, SQL_UPDATE_ADMIN } from "../query/query";
export class admin extends ResponseInterceptor {
    public connection: connection
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
            const [user]: any = await this.connection.write.query(SQL_CHECK_ADMIN, [admin_id]);
            if (user.length > 0) {
                return this.sendBadRequest(res,  "User Already Exist" , this.BAD_REQUEST)
            }
            const hash = await this.encryptionDecryption.Encryption(password)
            await this.connection.write.query(SQL_INSERT_ADMIN, [admin_id, hash]);
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
            const [user]: any = await this.connection.write.query(SQL_CHECK_ADMIN, [admin_id]);
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
        const [user]: any = await this.connection.write.query(SQL_ALL_ADMIN);
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
        const [user]: any = await this.connection.write.query(SQL_UPDATE_ADMIN, [admin_id, password, a_Id]);
        return this.sendSuccess(res, { message: "User updated Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async DeleteAdmin(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(SQL_DELETE_ADMIN, [req.params.a_id]);
        return this.sendSuccess(res, { message: "User delete Successfully", data : user })
    }
    catch(err){
        console.log(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
   async findById(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(SQL_CHECK_ADMIN, [req.params.a_id]);
        return this.sendSuccess(res, {  data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

}