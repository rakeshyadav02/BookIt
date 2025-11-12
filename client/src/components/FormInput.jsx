import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;



