import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../../core/jwt/jsonwebtoken";
export class user extends ResponseInterceptor {
    public connection: connection
    SQL_CHECK_USER: string = "select * from signup where user_id = ? limit 1";
    SQL_INSERT_USER: string = "insert into signup(user_id, user_password) values (?,?)";
    SQL_ALL_USER: string = "select * from signup";
    SQL_UPDATE_USER: string = "update signup set user_id = ?, user_password= ? where sign_up_id = ? limit 1 ";
    SQL_DELETE_USER: string = "update signup set is_deleted = 1 where sign_up_id = ? limit 1 ";
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
            const { user_id, user_password } = req.body
            const [user]: any = await this.connection.write.query(this.SQL_CHECK_USER, [user_id]);
            if (user.length > 0) {
                return this.sendBadRequest(res,  "User Already Exist" , this.BAD_REQUEST)
            }
            const hash = await this.encryptionDecryption.Encryption(user_password)
            await this.connection.write.query(this.SQL_INSERT_USER, [user_id, hash]);
            return this.sendSuccess(res, { message: "User Insert Successfully" })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }

    }

    async login(req: any, res: any) {
        try {
            const { user_id, user_password } = req.body
            const [user]: any = await this.connection.write.query(this.SQL_CHECK_USER, [user_id]);
            if (user.length === 0) {
                return this.sendBadRequest(res, "You are not register" , this.BAD_REQUEST)
            }
            const comparePassword = await this.encryptionDecryption.Decryption(user_password , user[0].user_password)
            if (!comparePassword) {
                return this.sendBadRequest(res,  "Wrong Password", this.BAD_REQUEST,)
            }
            const token = await this.tokenController.generateToken(user[0] , res )
            return this.sendSuccess(res, { message: "Login Successfully", token: token })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
   async findAllUsers(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_ALL_USER);
        return this.sendSuccess(res, { message: "User Insert Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async updateAllUser(req : any, res : any){
    try{
        const { user_id, user_password } = req.body
        let userId = req.params.sign_up_id
        const [user]: any = await this.connection.write.query(this.SQL_UPDATE_USER, [user_id, user_password, userId]);
        return this.sendSuccess(res, { message: "User updated Successfully", data : user })

    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async DeleteUser(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_DELETE_USER, [req.params.sign_up_id]);
        return this.sendSuccess(res, { message: "User delete Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
   async findById(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(this.SQL_CHECK_USER, [req.params.sign_up_id]);
        return this.sendSuccess(res, {  data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

}