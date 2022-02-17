import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ITaskCount, getCountFactory } from '../../model/ITask';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  getCounts(): ITaskCount[] {
    return getCountFactory();
  }

  addTask(task: Task) {
    return this.tasksRepository.save(task);
  }

  updateTask(task: Task) {
    return this.tasksRepository.save(task);
  }
}
