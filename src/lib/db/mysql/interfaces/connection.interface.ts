export interface ConnectionInterface {
	beginTransaction: () => Promise<void>;
	query: (sql: string, value?: any) => Promise<any>;
	commit: () => Promise<void>;
	rollback: () => Promise<void>;
	release: () => Promise<void>;
};
