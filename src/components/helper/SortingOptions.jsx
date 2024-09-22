import React from 'react';
import './SortingOptions.css'; // Import the CSS file for styling

const SortingOptions = ({ sortByAmount, sortByWinningAmount, onClose }) => {
  return (
    <div className="sortcontainer">
      <h3 className="sorttitle">Sort Data</h3>
      <button
        className="sortbtn"
        onClick={() => {
          sortByAmount('asc');
          onClose();
        }}
      >
        Asc by Amount
      </button>
      <button
        className="sortbtn"
        onClick={() => {
          sortByAmount('desc');
          onClose();
        }}
      >
        Desc by Amount
      </button>
      <button
        className="sortbtn"
        onClick={() => {
          sortByWinningAmount('asc');
          onClose();
        }}
      >
        Asc by Winning
      </button>
      <button
        className="sortbtn"
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
