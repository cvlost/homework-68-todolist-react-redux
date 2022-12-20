import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Task, TaskApi, TaskWithId} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../App/Store";

interface TodoListState {
  tasks: TaskWithId[];
  loading: boolean;
  error: boolean;
  updateLoading: boolean;
  newTask: Task
}

const initialState: TodoListState = {
  tasks: [],
  error: false,
  loading: false,
  updateLoading: false,
  newTask: {
    text: '',
    isDone: false
  },
};

export const fetchTasks = createAsyncThunk<TaskWithId[]>(
  'todoList/fetch',
  async () => {
    const response = await axiosApi.get<TaskApi | null>('/todo-tasks.json');
    const data = response.data;

    let newTasks: TaskWithId[] | null = null;

    if (data) newTasks = Object.keys(data).map((id) => ({
      id,
      ...data[id]
    }))

    return newTasks ?? [];
  }
);

export const addTask = createAsyncThunk<void, undefined, {state: RootState}>(
  'todoList/addTask',
  async (arg, thunkAPi) => {
    const newTask = thunkAPi.getState().todoList.newTask;
    await axiosApi.post('/todo-tasks.json', newTask);
  }
);

export interface ChangingTask {
  isDone: boolean;
  id: string;
}

export const changeTaskState = createAsyncThunk<void, ChangingTask, {state: RootState}>(
  'todoList/changeTaskState',
  async (arg, thunkAPi) => {
    const oldTask = thunkAPi.getState().todoList.tasks.find((task) => task.id === arg.id);
    if (!oldTask) return;
    console.log(oldTask);
    await axiosApi.put('/todo-tasks/' + arg.id + '.json', {
      isDone: arg.isDone,
      text: oldTask.text
    })
  }
);

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    changeNewTask: (state, action) => {
      state.newTask.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });

    builder.addCase(addTask.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.updateLoading = false;
    });
  }
});

export const todoListReducer = todoListSlice.reducer;
export const {changeNewTask} = todoListSlice.actions;