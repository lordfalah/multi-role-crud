import { Fragment } from "react";

// eslint-disable-next-line react/prop-types
const InputForm = ({ className, type, name, placeHolder, value, ...props }) => {
  const addClass = className ? className : "";
  return (
    <Fragment>
      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
        {name}
      </label>
      <input
        {...props}
        className={`w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500 ${addClass}`}
        type={type}
        placeholder={placeHolder}
        // eslint-disable-next-line react/prop-types
        name={name.toLowerCase()}
        value={value}
        required
      />
    </Fragment>
  );
};

export default InputForm;
