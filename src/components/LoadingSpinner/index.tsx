import React from "react";

import loading from "../../assets/loading.png";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <img
        className="loading-spinner-image"
        src={loading}
        alt="loading-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
