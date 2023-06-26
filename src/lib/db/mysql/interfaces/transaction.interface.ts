export interface TransactionInterface {
	beginTransaction: () => Promise<void>;
	query: (sql: string, value?: any) => Promise<any>;
	commit: () => Promise<void>;
	rollback: () => Promise<void>;
	release: () => void;
}
