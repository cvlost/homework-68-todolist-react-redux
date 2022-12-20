export interface Task {
  isDone: boolean;
  text: string;
}

export interface TaskViewData extends Task {
  id: string;
  deleting: boolean;
  updating: boolean;
}

export interface TaskApi {
  [id: string]: Task;
}