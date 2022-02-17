import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  // 任务名称
  @Column()
  taskName: string;

  // 任务类型
  @Column()
  taskType: string;

  // 任务编号
  @Column()
  taskNo: string;

  // 任务状态
  @Column()
  taskFlag: number;

  // 审核状态
  @Column()
  auditFlag: number;

  // 审核类型
  @Column()
  auditType: number;

  // 是否需要审核 0：不需要；1：需要；
  @Column()
  needAuditFlag: number;

  // 业务单号
  @Column()
  businessNo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
