import React from "react";

const DropDown = () => {
  return (
    <select
      className="w-[450px] h-12 p-3 bg-gray-200 outline-none"
      defaultValue=""
    >
      <option value="" disabled>
        Select an address
      </option>
      <option value="123-main-st">123 Main St</option>
      <option value="456-elm-st">456 Elm St</option>
      <option value="789-oak-ave">789 Oak Ave</option>
    </select>
  );
};

export default DropDown;
