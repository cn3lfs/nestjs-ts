import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { getResponse } from '../../utils/index';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/getTask')
  async getTask(id: number) {
    const result = await this.taskService.findOne(id);
    return getResponse(result);
  }

  @Post('/getTaskList')
  async getTasks() {
    const tasks = await this.taskService.findAll();
    const result = {
      list: tasks,
      pageNo: 1,
      pageSize: 10,
      totalNum: tasks.length,
    };
    return getResponse(result);
  }

  @Post('/addTask')
  async addTask(@Body() task: Task) {
    const result = await this.taskService.addTask(task);
    return getResponse(result);
  }

  @Post('/updateTask')
  async updateTask(@Body() task: Task) {
    const result = await this.taskService.updateTask(task);
    return getResponse(result);
  }

  @Get('/deleteTask')
  async deleteTask(@Query('id') id: number) {
    const result = await this.taskService.remove(id);

    return getResponse(result);
  }

  @Get('/getCountList')
  getCounts() {
    const result = this.taskService.getCounts();
    return getResponse(result);
  }
}
