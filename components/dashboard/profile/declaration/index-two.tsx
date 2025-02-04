import React, { useState } from "react";

const IndexTwo = () => {
  const [text, setText] = useState("");
  return (
    <div className="p-6 mx-auto bg-white rounded-lg">
      <h1 className=" mb-4 text-gray-700">
        why are you purchasing an investment property prior to purchasing a
        primary residence?
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter details here..."
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default IndexTwo;
