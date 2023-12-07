import { Level } from 'src/enums/Level';

export class Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  level: Level;
  created_at: Date;
}
