import NewLoan from "@/components/start/NewLoan";
import React from "react";

const Home = () => {
  return (
    <div>
      <NewLoan detailsVisbile={true} link="/start/new-construction/property" />
    </div>
  );
};

export default Home;
