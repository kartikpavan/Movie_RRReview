import React from "react";

const TagField = () => {
  return (
    <div className=" border rounded-lg w-full max-w-md px-2 py-1 flex items-center space-x-1">
      {/* tag 1 */}
      <Tag>Action</Tag>
      <Tag>Holywood</Tag>
      <input type="text" className="flex flex-grow bg-transparent outline-none" />
    </div>
  );
};

const Tag = ({ children, onClick }) => {
  return (
    <div className="badge badge-info gap-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current cursor-pointer"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      {children}
    </div>
  );
};

export default TagField;
