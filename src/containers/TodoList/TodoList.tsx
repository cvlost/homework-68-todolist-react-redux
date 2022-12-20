import React, {useEffect} from 'react';
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskView from "../../components/TaskView/TaskView";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../App/Store";
import {fetchTasks} from "./todoListSlice";
import Spinner from "../../components/Spinner/Spinner";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const tasksLoading = useSelector((state: RootState) => state.todoList.loading);
  const updateLoading = useSelector((state: RootState) => state.todoList.updateLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  let output: React.ReactNode;

  if (tasksLoading)
    output = <h2> <Spinner/> Loading</h2>;
  else
    output = <>{tasks.map((task) => <TaskView key={task.id} {...task}/>)}</>

  return (
    <div className="custom-container">
      <h3 className="text-info text-center py-3">Todo List</h3>
      <div>
        <AddTaskForm/>
        <div>
          {output}
        </div>
      </div>
    </div>
  );
};

export default TodoList;