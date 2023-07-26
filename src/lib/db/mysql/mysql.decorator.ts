import { Inject } from "@nestjs/common";
import { getToken } from "./mysql.util";

export const InjectMysql = (token?: string) => Inject(getToken(token));
