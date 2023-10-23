import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar' })
  email: string | undefined;

  @Column({ type: 'varchar', default: 'User', nullable: false })
  role: string | undefined;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPremium: boolean | undefined;

  @Column({ type: 'boolean', default: true })
  active: boolean | undefined;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE'})
  dateSignedUp: Date | undefined;
}
 