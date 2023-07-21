import { useEffect, useState } from "react";
import web3 from "web3";

import { getDataset } from "../api/dataset";

function DropdownMenu({ selected, setSelected }) {
  const [dropDownOptions, setDropDownOptions] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  useEffect(() => {
    const load = async () => {
      let datasets = await getDataset("all");
      if (datasets === null) {
        alert("Error loading datasets.");
        return;
      }
      console.log(datasets);
      setDropDownOptions(datasets);
    };
    load();
  }, []);

  return (
    <select onChange={handleChange}>
      <option value="">Select a dataset</option>
      {dropDownOptions.map((option) => (
        <option key={option.name} value={option.address}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default DropdownMenu;
