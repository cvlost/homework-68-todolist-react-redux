import React from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../App/Store";
import {addTask, changeNewTask, fetchTasks} from "../../containers/TodoList/todoListSlice";

const AddTaskForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updateLoading = useSelector((state: RootState) => state.todoList.updateLoading);
  const newTask = useSelector((state: RootState) => state.todoList.newTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeNewTask(e.target.value));
  }

  const onAdd = async () => {
    await dispatch(addTask());
    await dispatch(fetchTasks());
  };

  return (
    <Form>
      <Form.Group>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Task..."
            onChange={handleChange}
            value={newTask.text}
          />
          <Button
            variant="outline-secondary"
            onClick={onAdd}
          >
            {updateLoading ? <Spinner inline/> : null}
            Add
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default AddTaskForm;