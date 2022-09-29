import React from "react";

import loading from "../../assets/loading.png";
import { ILoadingSpinnerProps } from "../../types/types";

const LoadingSpinner = ({ loadingStyle }: ILoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner-container ${loadingStyle}`}>
      <img
        className="loading-spinner-image"
        src={loading}
        alt="loading-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
