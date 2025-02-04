import { Button } from "@mui/material";
import React from "react";

const BlackButton = ({ text }: { text: string }) => {
  return (
    <div>
      <Button className="w-full bg-primaryColor text-white hover:bg-black/9 py-2 rounded">
        {text}
      </Button>
    </div>
  );
};

export default BlackButton;
