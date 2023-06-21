const MYSQL_POOL_OPTION = {
	connectionLimit: process.env.MYSQL_CONNECTIONLIMIT,
	host: process.env.MSQYL_HOST,
	user: process.env.MSQYL_USER,
	password: process.env.MSQYL_PASSWORD,
	database: process.env.MSQYL_DATABASE,
	enableKeepAlive: process.env.MSQYL_ENABLEKEEPALIVE,
};

const SWAGGER_USERS = {
	[process.env.SWAGGER_USER1_ID]: process.env.SWAGGER_USER1_PASSWORD,
};

module.exports = {
	MYSQL_POOL_OPTION,
	SWAGGER_USERS,
};
