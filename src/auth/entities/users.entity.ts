import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: '366edd88-2509-42c5-92b1-66f6dc799d60',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Nombre del usuario',
    description: 'UserName',
    uniqueItems: true,
    nullable: false,
  })
  @Column('text', { unique: true, nullable: false })
  username: string;

  @ApiProperty({
    example: 'user@mail.es',
    description: 'Email del usuario',
    nullable: false,
    uniqueItems: true,
  })
  @Column('text', { nullable: false, unique: true })
  email: string;

  @ApiProperty({
    example: 'PassWord123',
    description: 'Password del usuario',
    nullable: false,
  })
  @Column('text', { nullable: false, select: false })
  pasword: string;

  @ApiProperty({
    description: 'Fecha de creacion',
    example: '2025-07-29T14:48:00.000Z',
    readOnly: true,
  })
  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Ultima fecha de login',
    example: '2025-07-29T14:48:00.000Z',
    readOnly: true,
  })
  @Column('timestamptz', { nullable: true })
  lastLogin: Date;

  @ApiProperty({
    description: 'Roles de los usuarios',
    examples: ['user', 'admin'],
    isArray: true,
    default: 'user',
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @ApiProperty({
    description: 'Estado del usuario',
    example: 'boolean',
    default: true,
  })
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
