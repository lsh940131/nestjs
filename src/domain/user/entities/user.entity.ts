import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("user", { schema: "nest" })
export class UserEntity {
	@PrimaryGeneratedColumn({
		type: "int",
		name: "id",
	})
	id: number;

	@Column({ type: "varchar", name: "email", length: 200, nullable: false })
	email: string;

	@Column({ type: "varchar", name: "name", length: 100, nullable: false })
	name: string;

	@Column({ type: "char", name: "sex", length: 1, nullable: false, comment: "M | W" })
	sex: string;

	@CreateDateColumn({
		type: "datetime",
		name: "created_at",
		comment: "생성일",
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: "datetime",
		name: "updated_at",
		comment: "수정일",
	})
	updatedAt: Date;
}
