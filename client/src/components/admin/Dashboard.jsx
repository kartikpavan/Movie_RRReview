import React, { useState } from "react";
import { debounce } from "lodash";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debounceSearch = debounce((value) => {
    setSearchTerm(value);
  }, 800);

  function handleChange(e) {
    debounceSearch(e.target?.value);
  }
  console.log(searchTerm);
  return <main className="w-full"></main>;
};

export default Dashboard;
