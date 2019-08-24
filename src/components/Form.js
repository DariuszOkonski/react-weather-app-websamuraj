import React from 'react';

const Form = (props) => {
  return (
    <form onSubmit={props.submit}>
      <input
        type="text"
        value={props.value}
        placeholder="Type city..."
        onChange={props.change}
      />

      <button>Find city</button>
    </form>
  );
}

export default Form;