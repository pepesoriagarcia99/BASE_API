interface Configuration {
  env: string;
  ip: string;
  port: number;
  apiRoot: string;
  nedb: {
    path: string;
    autoload: boolean;
  },
  jwtSecret: string;
  masterKey: string;
}

export default {
  env: process.env.NODE_ENV || "development",
  ip: process.env.IP || "0.0.0.0",
  port: Number(process.env.PORT) || 9000,
  apiRoot: process.env.API_ROOT || "/",
  nedb: {
    path: process.env.NEDB_FILENAME || "E:/PROJECTS/naturaleza_artificial/data",
    autoload: true
  },
  jwtSecret: process.env.JWT_SECRET || "my_secret",
  masterKey: process.env.MASTER_KEY || "24dAPwweAPUpyOZG9UOOenW3LgVGEU8d"
} as Configuration;
