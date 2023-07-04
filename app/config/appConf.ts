const dotenv = require("dotenv");
dotenv.config();

let SERVER_ENV = verifyenv("SERVER_ENV") || "dev";
let SERVER_PORT = Number(verifyenv("SERVER_PORT")) || 8080;
let DB_HOST = verifyenv("DB_HOST") || "";
let DB_USER = verifyenv("DB_USER") || "";
let DB_PASSWORD = verifyenv("DB_PASSWORD") || "";
let DB_NAME = verifyenv("DB_NAME") || "";
let JWT_SECRET_KEY = verifyenv("JWT_SECRET_KEY") || "";
let JWT_EXPIRATION_TIME = verifyenv("JWT_EXPIRATION_TIME") || "";
let AWS_S3_BUCKET_NAME = verifyenv("AWS_S3_BUCKET_NAME") || "";
let AWS_ACCESS_KEY = verifyenv("AWS_ACCESS_KEY") || ""
let AWS_SECRET_KEY = verifyenv("AWS_SECRET_KEY") || ""
let AWS_REGION = verifyenv("AWS_REGION") || ""

function verifyenv(env_key) {
  if (process.env[env_key] == undefined) {
    console.log(`[ENV] DEFAULT VALUE has taken for ${env_key}`);
    return undefined;
  } else {
    return process.env[env_key];
  }
}

export const appConfig = {
  server_env: SERVER_ENV, //['dev','uat']sr
  ver: '0.0.1',
  server: {
    port: SERVER_PORT,
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
    multipleStatements:true
  },
  jwt: {
    jwtSecretKey: JWT_SECRET_KEY,
    jwtExpiry: JWT_EXPIRATION_TIME
  },
  aws :{
    AWS_S3_BUCKET_NAME : AWS_S3_BUCKET_NAME,
    AWS_ACCESS_KEY : AWS_ACCESS_KEY,
    AWS_SECRET_KEY : AWS_SECRET_KEY,
    AWS_REGION : AWS_REGION

  }

};
