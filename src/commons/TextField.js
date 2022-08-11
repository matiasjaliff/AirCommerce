import React from 'react';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input className="" {...field} {...props} autoComplete="off" />
      <ErrorMessage name={field.name} />
    </div>
  );
};
