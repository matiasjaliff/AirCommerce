import { useState } from 'react';

const useInput = (name) => {
  const [value, setValue] = useState('');
  const onChange = (event) => setValue(event.target.value);
  return { value, onChange, name };
};

export default useInput;
