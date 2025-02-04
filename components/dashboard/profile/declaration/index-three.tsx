import React, { useState } from "react";

const IndexThree = () => {
  const [text, setText] = useState("");
  return (
    <div className="p-6 mx-auto bg-white rounded-lg">
      <div className="mb-4 text-gray-700">
        <h1 className="font-normal">
          {" "}
          Answer the following question in the field provided
        </h1>
        <ol className=" ml-2 list-decimal mt-2">
          <li>What are the judgements?</li>
          <li>Are the judgements on a payment plan?</li>
          <li>
            Are the judgements current and paid according to the payment plan?
          </li>
        </ol>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter details here..."
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default IndexThree;
