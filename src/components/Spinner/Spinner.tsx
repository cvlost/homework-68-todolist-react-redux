import React from 'react';
import {Spinner as BSpinner} from "react-bootstrap";

interface Props {
  inline?: boolean;
}

const Spinner: React.FC<Props> = ({inline = false}) => {
  if (inline)
    return (
      <BSpinner animation="border" variant="info" size="sm" className="me-2"/>
    );
  else
    return (
      <BSpinner animation="border" variant="info" className="me-2"/>
    );
};

export default Spinner;