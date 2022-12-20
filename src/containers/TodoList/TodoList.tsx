import React, {useEffect} from 'react';
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskView from "../../components/TaskView/TaskView";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../App/Store";
import {fetchTasks} from "./todoListSlice";
import Spinner from "../../components/Spinner/Spinner";
import {ListGroup} from "react-bootstrap";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const tasksLoading = useSelector((state: RootState) => state.todoList.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  let output: React.ReactNode;

  if (tasksLoading)
    output = <Spinner/>;
  else
    output =  <>{tasks.map((task) => <TaskView key={task.id} {...task}/>)}</>;

  return (
    <div className="vh-100">
      <div className="custom-container h-100 d-flex flex-column">
        <h3 className="text-info text-center pt-4 pb-2 m-0 fw-light">Todo List</h3>
        <div className="d-flex flex-column flex-grow-1 overflow-auto p-3">
          <AddTaskForm/>
          <ListGroup
            variant="flush"
            className="shadow rounded p-3 d-flex flex-column flex-grow-1 overflow-auto"
          >
            {output}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default TodoList;