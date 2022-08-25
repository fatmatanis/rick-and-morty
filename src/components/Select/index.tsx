import React, { useState } from "react";

import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
import useComponentOpen from "../../hooks/useComponentOpen";
import { ISelectprops } from "../../types/types";

const Select = ({ options, filtred }: ISelectprops) => {
  const { ref, isOpen, setIsOpen } = useComponentOpen(true);

  const handleOpen = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <div className="select-wrapper" ref={ref}>
      <button className="select-button" onClick={handleOpen}>
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
