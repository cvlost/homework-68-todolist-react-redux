import React from 'react';
import {Spinner as BSpinner} from "react-bootstrap";

interface Props {
  inline?: boolean;
  variant?: string;
}

const Spinner: React.FC<Props> = ({inline = false, variant= 'info'}) => {
  if (inline)
    return (
      <BSpinner animation="border" variant={variant} size="sm"/>
    );
  else
    return (
      <BSpinner animation="border" variant={variant} className="m-auto"/>
    );
};

export default Spinner;