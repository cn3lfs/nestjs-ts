export interface ITask {
  // 任务名称
  taskName: string;
  // 任务类型
  taskType: string;
  // 任务编号
  taskNo: string;
  // 任务状态
  taskFlag: number;
  // 审核状态
  auditFlag: number;
  // 审核类型
  auditType: number;
  // 是否需要审核 0：不需要；1：需要；
  needAuditFlag: number;
  // 业务单号
  businessNo: string;
}

export const TASK_FLAGS = {
  // 已删除
  TASK_DELETED: -1,
  // 待提交
  TASK_UNSUBMITTED: 0,
  // 被退回
  TASK_RETURNED: 1,

  // 我审核
  TASK_AUDIT_ME: 9,
  // 审核中
  TASK_AUDITING: 10,
  // 未通过
  TASK_AUDIT_FAILED: 11,
  // 已通过
  TASK_AUDIT_PASSED: 12,

  // 已完成
  TASK_FINISHED: 20,
};

export const formatTaskFlag = (taskFlag: number) => {
  if (taskFlag === TASK_FLAGS.TASK_DELETED) {
    return '已删除';
  }
  if (taskFlag === TASK_FLAGS.TASK_UNSUBMITTED) {
    return '待提交';
  }
  if (taskFlag === TASK_FLAGS.TASK_RETURNED) {
    return '被退回';
  }
  if (taskFlag === TASK_FLAGS.TASK_AUDIT_ME) {
    return '我审核';
  }
  if (taskFlag === TASK_FLAGS.TASK_AUDITING) {
    return '审核中';
  }
  if (taskFlag === TASK_FLAGS.TASK_AUDIT_FAILED) {
    return '未通过';
  }
  if (taskFlag === TASK_FLAGS.TASK_AUDIT_PASSED) {
    return '已通过';
  }
  if (taskFlag === TASK_FLAGS.TASK_FINISHED) {
    return '已完成';
  }
  return '';
};

export const AUDIT_FLAGS = {
  // 待审核
  AUDIT_UNAUDITED: 0,
  // 未通过
  AUDIT_FAILED: 1,
  // 已通过
  AUDIT_PASSED: 2,
};

export const formatAuditFlag = (auditFlag: number) => {
  if (auditFlag === AUDIT_FLAGS.AUDIT_UNAUDITED) {
    return '待审核';
  }
  if (auditFlag === AUDIT_FLAGS.AUDIT_FAILED) {
    return '未通过';
  }
  if (auditFlag === AUDIT_FLAGS.AUDIT_PASSED) {
    return '已通过';
  }
  return '';
};

export const AUDIT_TYPES = {
  // 新建审核
  AUDIT_CREATE: 0,
  // 编辑审核
  AUDIT_UPDATE: 1,
  // 删除审核
  AUDIT_DELETE: 2,
};

export const formatAuditType = (auditType: number) => {
  if (auditType === AUDIT_TYPES.AUDIT_CREATE) {
    return '新建审核';
  }
  if (auditType === AUDIT_TYPES.AUDIT_UPDATE) {
    return '编辑审核';
  }
  if (auditType === AUDIT_TYPES.AUDIT_DELETE) {
    return '删除审核';
  }
  return '';
};

export const Actions = {
  /**
   * 待提交
   *
   * 新建/编辑/删除
   * */

  // 新建
  CREATE_TASK(task: ITask) {
    // 设置任务状态为 待提交
    task.taskFlag = TASK_FLAGS.TASK_UNSUBMITTED;
    // 设置审核状态为 待审核
    task.auditFlag = AUDIT_FLAGS.AUDIT_UNAUDITED;
    // 设置审核类型为 新建审核
    task.auditType = AUDIT_TYPES.AUDIT_CREATE;

    return task;
  },
  // 编辑
  UPDATE_TASK(task: ITask) {
    // 任务状态不变
    // task.taskFlag = TASK_FLAGS.TASK_UNSUBMITTED;
    // 设置审核状态为 待审核
    task.auditFlag = AUDIT_FLAGS.AUDIT_UNAUDITED;
    // 设置审核类型为 编辑审核
    task.auditType = AUDIT_TYPES.AUDIT_UPDATE;

    return task;
  },
  // 删除
  DELETE_TASK(task: ITask) {
    // 任务状态不变
    // task.taskFlag = TASK_FLAGS.TASK_UNSUBMITTED;
    // 设置审核状态为 待审核
    task.auditFlag = AUDIT_FLAGS.AUDIT_UNAUDITED;
    // 设置审核类型为 删除审核
    task.auditType = AUDIT_TYPES.AUDIT_DELETE;

    return task;
  },
  // 提交
  SUBMIT_TASK(task: ITask) {
    // 设置任务状态为 审核中
    task.taskFlag = TASK_FLAGS.TASK_AUDITING;
    // 设置审核状态为 待审核
    task.auditFlag = AUDIT_FLAGS.AUDIT_UNAUDITED;
    // 审核类型不变
    // task.auditType = AUDIT_TYPES.AUDIT_CREATE;

    return task;
  },
  // 审核任务
  AUDIT_TASK(task: ITask, success: boolean) {
    // 审核通过
    if (success) {
      // 设置任务状态为 已完成
      task.taskFlag = TASK_FLAGS.TASK_FINISHED;
      // 设置审核状态为 已通过
      task.auditFlag = AUDIT_FLAGS.AUDIT_PASSED;
      // 审核类型不变
      // task.auditType = AUDIT_TYPES.AUDIT_CREATE;

      return task;
    }
    // 审核不通过
    else {
      // 设置任务状态为 被退回
      task.taskFlag = TASK_FLAGS.TASK_FINISHED;
      // 设置审核状态为 未通过
      task.auditFlag = AUDIT_FLAGS.AUDIT_FAILED;
      // 审核类型不变
      // task.auditType = AUDIT_TYPES.AUDIT_CREATE;

      return task;
    }
  },
};

const NEED_AUDIT_FLAG = 1;

export function LogTask(task: ITask) {
  console.log(`
  任务名称: ${task.taskName},
  任务类型: ${task.taskType},
  任务编号: ${task.taskNo},
  任务状态: ${formatTaskFlag(task.taskFlag)},
  审核状态: ${formatAuditFlag(task.auditFlag)},
  审核类型: ${formatAuditType(task.auditType)},
  业务单号: ${task.businessNo},
  `);
}

export const getResponse = (result) => {
  return {
    data: result,
    meta: {},
  };
};

export const getTaskFactory = (n: number): ITask[] => {
  return new Array(n).fill(null).map((val, i) => {
    const task: ITask = {
      // 任务名称
      taskName: '任务' + (i + 1),
      // 任务类型
      taskType: '普通任务',
      // 任务编号
      taskNo: 'TA' + String.prototype.padStart.call(i + 1, 6, '0'),
      // 任务状态
      taskFlag: TASK_FLAGS.TASK_AUDITING,
      // 审核状态
      auditFlag: AUDIT_FLAGS.AUDIT_UNAUDITED,
      // 审核类型
      auditType: AUDIT_TYPES.AUDIT_CREATE,
      // 是否需要审核 0：不需要；1：需要；
      needAuditFlag: NEED_AUDIT_FLAG,
      // 业务单号
      businessNo: 'BIZ' + String.prototype.padStart.call(i + 1, 6, '0'),
    };

    return task;
  });
};

export interface ITaskCount {
  name: string;
  code: string;
  value: number;
  qty: number;
}

export const getCountFactory = (): ITaskCount[] => {
  const result = Object.keys(TASK_FLAGS).map((key) => {
    return {
      name: formatTaskFlag(TASK_FLAGS[key]),
      code: key,
      value: TASK_FLAGS[key],
      qty: 1,
    };
  });

  return result;
};
