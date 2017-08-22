import React from 'react';
import { Button } from 'react-bootstrap';

const DetailTag = (props) =>
 (
    <Button
    className="mb1"
    bsStyle="primary"
    bsSize="xsmall"
    onClick={props.onClick}
    href={`#${props.tag}`}
    >
      {props.tag}
    </Button>
  );


export default DetailTag;
