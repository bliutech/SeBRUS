import styles from "../styles/components/DropdownMenu.module.css";

import { useEffect, useState } from "react";
function DropdownMenu() {
  const [selected, setSelected] = useState("");
  const getOptions = (event) => {
    const options = []; //creating an array to hold options in
    for (let i = 1; i <= 5; i++) {
      //i used the number 5 here but this can be made dynamic depending on chloe's code
      options.push({
        value: `Option ${i}`,
        text: `Option ${i}`,
      });
    }
    return options;
  };

  const dropDownOptions = getOptions();

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <select id="myDropdown" onChange={handleChange}>
      <option value="">Select a dataset</option>
      {dropDownOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default DropdownMenu;
