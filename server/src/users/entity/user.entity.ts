import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  refreshToken: string;

  @AfterInsert()
  logInserts() {
    console.log('Inserted User with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id: ', this.id);
  }
}
