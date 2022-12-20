export interface Task {
  isDone: boolean;
  text: string;
}

export interface TaskWithId extends Task {
  id: string;
}

export interface TaskApi {
  [id: string]: Task;
}