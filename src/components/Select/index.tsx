import React, { useState } from "react";

import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
import { ISelectprops } from "../../types/types";

const Select = ({ options, filtred }: ISelectprops) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const close = () => {
    setTimeout(() => setIsOpen(false), 250);
  };

  return (
    <div className="select-wrapper">
      <button className="select-button" onClick={handleOpen} onBlur={close}>
        {filtred}
        <ArrowDown className={`select-arrow ${isOpen && "arrow-up"}`} />
      </button>
      <div className={`select-items-container ${isOpen && "select-show"}`}>
        {options.map(({ label, value, handleSelect }) => (
          <button
            className="select-item "
            key={value}
            value={value}
            onClick={handleSelect}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
