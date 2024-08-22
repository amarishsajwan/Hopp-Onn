import { Secret } from "jsonwebtoken";

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: Secret;
    // add more environment variables and their types here
  }
}
