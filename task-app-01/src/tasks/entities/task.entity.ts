import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongodb';
import { Types } from 'mongoose';

export type TasksDocument = Tasks & Document;

@Schema()
export class Tasks {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const taskSchema = SchemaFactory.createForClass(Tasks);
