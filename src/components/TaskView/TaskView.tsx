import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {Trash} from "react-bootstrap-icons";
import {TaskWithId} from "../../types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../App/Store";
import {changeTaskState, fetchTasks} from "../../containers/TodoList/todoListSlice";

interface Props extends TaskWithId {

}

const TaskView: React.FC<Props> = ({id, isDone, text}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(changeTaskState({id, isDone: e.target.checked}));
    await dispatch(fetchTasks());
  };

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex align-items-center">
        <Form.Check type="checkbox" checked={isDone} onChange={handleChange}/>
        <div className="px-3 flex-grow-1">
          {text}
        </div>
        <Button variant="outline-info">
          <Trash color="gray"/>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskView;