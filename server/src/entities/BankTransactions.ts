import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

enum Status {
    PAID = "Paid", 
    PENDING = 'Pending', 
    FAILED = 'Failed'
}

enum Method {
    CREDIT_CARD = 'Credit Card',
    PAY_PAL = 'PayPal',
    BANK_TRANSFER = 'Bank Transfer'
}

@Entity()
export class BankTransactions extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'enum', enum: Status, default: Status.PENDING })
    status!: Status

    @Column({ type: 'enum', enum: Method, default: Method.BANK_TRANSFER})
    method!: Method

    @Column({ type: 'bigint' })
    amount!: number

    @Column({ type: 'boolean' })
    premium!: boolean 

    @Column({ type: 'text', nullable: true })
    description!: string;
}
