import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  token: string;
}

export default User;
