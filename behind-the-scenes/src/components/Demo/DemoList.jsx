import React from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {props.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);