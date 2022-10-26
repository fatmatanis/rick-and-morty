import React, { useRef } from "react";

import useComponentOpen from "../../hooks/useComponentOpen";
import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
import { ISelectprops } from "../../types/types";

const Select = ({ options, filtered }: ISelectprops) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useComponentOpen(false, ref);

  const handleOpen = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    handleSelect(e);
    setIsOpen(false);
  };

  return (
    <div className="select-wrapper" ref={ref}>
      <button className="select-button" onClick={handleOpen}>
        {filtered}
        <ArrowDown className={`select-arrow ${isOpen && "arrow-up"}`} />
      </button>
      <div className={`select-items-container ${isOpen && "select-show"}`}>
        {options.map(({ label, value, handleSelect }) => (
          <button
            className="select-item "
            key={value}
            value={value}
            onClick={e => {
              handleClick(e, handleSelect);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
