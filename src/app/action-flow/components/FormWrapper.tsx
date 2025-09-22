import React from 'react';

interface FormWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const FormWrapper = ({ children, className = '' }: FormWrapperProps) => {
  return (
    <div
      className={`absolute top-3 left-3 w-80 h-[34rem] rounded-xl bg-[#FFFFFF] px-3 py-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
