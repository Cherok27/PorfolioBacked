import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  username: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false, select: false })
  pasword: string;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamptz', { nullable: true })
  lastLogin: Date;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('bool', { default: true }) // postgres reconce bool y no boolean
  isActive: boolean;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
