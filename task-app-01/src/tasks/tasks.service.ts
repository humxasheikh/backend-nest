import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks, TasksDocument } from './entities/task.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}
  create(userId: string, createTaskDto: CreateTaskDto) {
    return this.tasksModel.create({ userId, ...createTaskDto }).then((task) => {
      const { _id, ...rest } = task.toObject({ versionKey: false });
      return { id: _id, ...rest };
    });
  }

  async findAll(userId: string) {
    const tasks = this.tasksModel
      .find({ userId })
      .lean()
      .then((tasks) =>
        tasks.map(({ _id, __v, ...rest }) => ({
          id: _id,
          ...rest,
        })),
      );
    return tasks;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksModel.findByIdAndUpdate(id, { ...updateTaskDto });
  }

  remove(id: string) {
    return this.tasksModel.findByIdAndDelete(id).exec();
  }
}
