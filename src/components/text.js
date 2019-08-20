import React from 'react';
import './text.css';

const Text = (props) => {

  const style = (props.count >= 5) ? 'Long' : 'Short';

  return (
    <div>
      <div className={style} onClick={props.click}>
        {props.id}. {props.value} ({props.count})
      </div>
    </div>
  )
}

export default Text;