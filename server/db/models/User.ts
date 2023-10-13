import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type:'varchar'})
  email: string

  @Column({type:'varchar'})
  name: string

  @Column({type:'int', nullable: true})
  age: number

  @Column({type:'varchar'})
  role: string
}
