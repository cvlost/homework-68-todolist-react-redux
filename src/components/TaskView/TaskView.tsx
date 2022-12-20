import React from 'react';
import {Button, Form, ListGroupItem} from 'react-bootstrap';
import {XLg} from "react-bootstrap-icons";
import {TaskViewData} from "../../types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../App/Store";
import {changeTaskState, deleteTask, fetchTasks} from "../../containers/TodoList/todoListSlice";
import Spinner from "../Spinner/Spinner";

const TaskView: React.FC<TaskViewData> = ({
  id,
  isDone,
  text,
  deleting,
  updating
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(changeTaskState({id, isDone: e.target.checked}));
    await dispatch(fetchTasks());
  };

  const onDelete = async () => {
    await dispatch(deleteTask({id}));
    await dispatch(fetchTasks());
  };

  const size = '2.3em';
  const sizes: React.CSSProperties = {width: size, height: size};

  return (
    <ListGroupItem className="d-flex align-items-center task-height flex-shrink-0">
      <div className="d-flex justify-content-center align-items-center" style={sizes}>
        {updating ? <Spinner inline/> : (
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              checked={isDone}
              onChange={handleChange}
              disabled={deleting}
              className="m-0 task-check"
              style={sizes}
              role="button"
            />
          </Form.Check>
        )}
      </div>
      <div className={`px-3 flex-grow-1 ${isDone ? 'text-secondary' : ''}`}>
        {text}
      </div>
      <div className="d-flex justify-content-center align-items-center" style={sizes}>
        {deleting ? <Spinner inline/> : (
          <Button
            style={sizes}
            variant="outline-info"
            className="m-0 p-0 btn-del"
            disabled={updating}
            onClick={onDelete}
          >
            <XLg color="rgb(13,202,240)"/>
          </Button>
        )}
      </div>
    </ListGroupItem>
  );
};

export default TaskView;