import React from 'react';
import './SortingOptions.css'; // Import the CSS file for styling

const SortingOptions = ({ sortByAmount, sortByWinningAmount, onClose }) => {
  return (
    <div className="container">
      <h3 className="title">Sort Data</h3>
      <button
        className="btn"
        onClick={() => {
          sortByAmount('asc');
          onClose();
        }}
      >
        Asc by Amount
      </button>
      <button
        className="btn"
        onClick={() => {
          sortByAmount('desc');
          onClose();
        }}
      >
        Desc by Amount
      </button>
      <button
        className="btn"
        onClick={() => {
          sortByWinningAmount('asc');
          onClose();
        }}
      >
        Asc by Winning
      </button>
      <button
        className="btn"
        onClick={() => {
          sortByWinningAmount('desc');
          onClose();
        }}
      >
        Desc by Winning
      </button>
    </div>
  );
};

export default SortingOptions;
