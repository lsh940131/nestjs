import { Inject } from "@nestjs/common";
import { MYSQL_OPTIONS } from "./mysql.constants";

export const InjectMysql = (token: string = MYSQL_OPTIONS) => Inject(token);
