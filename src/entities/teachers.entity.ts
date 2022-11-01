import { Exclude } from "class-transformer";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,OneToOne,JoinColumn
  } from "typeorm";
  import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Professionals } from "./professionals.entity";
import { TeachersRoom } from "./teachersRoom.entity";

  @Entity("teachers")
export class Teachers {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 80})
  name: string;

  @Column({ length: 100})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isPermission: boolean;

  @Column()
  isActive: boolean = true;
  
  @CreateDateColumn({type: "date"})
  createdAt: string;

  @UpdateDateColumn({type: "date"})
  updatedAt: string;

  @OneToMany(() => TeachersRoom, (room) => room.teacher)
  teacher: TeachersRoom[];

  @OneToOne(() => Professionals, {eager: true})
  @JoinColumn()
  registration: Professionals[]
 
  @OneToOne(() => Address, {eager: true})
  @JoinColumn()
  address: Address

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}