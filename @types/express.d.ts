import { User as InternalUser } from "../src/api/user/model";

declare global {
    namespace Express {
      interface Request {
        user?: InternalUser;
      }
    }
  }