import { MYSQL_DEFAULT_TOKEN_NAME } from "./mysql.constants";

export const getToken = (name: string = MYSQL_DEFAULT_TOKEN_NAME) => name;
