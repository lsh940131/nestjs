import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user", { schema: "nest" })
export class UserEntity {
	@PrimaryGeneratedColumn({
		type: "int",
		name: "id",
	})
	id: number;

	@Column({ type: "varchar", name: "email", length: 200 })
	email: string;

	@Column({ type: "varchar", name: "name", length: 100 })
	name: string;
}
