export interface Task {
  id: string;
  user_id: string;
  task: string;
  completed: boolean;
  created_at: Date;
}
