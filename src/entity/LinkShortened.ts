import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class LinkShortened {
  @PrimaryGeneratedColumn()
  id: number
  @Column('text',{nullable:false})
  link: string
  @Column('text',{nullable:false})
  token: string
  @Column('date',{nullable:false})
  expireAt: Date
  @Column('date',{nullable:false})
  createAt: Date
}

