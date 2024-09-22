import React, { useState, useEffect } from "react";
import "./AlertModal.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";

export const AlertModal = ({ isOpen, onClose, onConfirm, defaultAmount , usercountry}) => {
  const [paymentUpdateNote, setPaymentUpdateNote] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [amount, setAmount] = useState(defaultAmount);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSource(file);
    }
  };

  const handleConfirm = () => {
    // Call the onConfirm callback with the paymentUpdateNote, imageSource, and amount
    onConfirm({ paymentUpdateNote, imageSource, amount });
  };

  const handleReject = () => {
    onClose();
  };

  // Set default amount whenever the modal opens or defaultAmount changes
  useEffect(() => {
    setAmount(defaultAmount);
  }, [defaultAmount]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
       

      
        <p className="textp">Country : {usercountry.countryname}</p>
        <p className="textp">Currency name : {usercountry.countrycurrencysymbol}</p>
        <p className="textp">Currency value : {usercountry.countrycurrencyvaluecomparedtoinr}</p>

        <div className="imgconM">
          <div className="catimagecontainer">
            <img src={images.cat} alt="cat" className="catandtrophyimg" />
          </div>
        </div>
        <p className="textp">Are you sure?</p>

        {/* New Text Input for Amount */}
        <label className="alCLLabel">Amount</label>
        <div className="alSearchContainer">
          <input
            className="al-search-input"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Text Input for Payment Update Note */}
        <label className="alCLLabel">Note</label>
        <div className="alSearchContainer">
          <input
            className="al-search-input"
            placeholder="Enter Note"
            value={paymentUpdateNote}
            onChange={(e) => setPaymentUpdateNote(e.target.value)}
          />
        </div>

        {/* File Input for Image Source */}
        <label className="alCLLabel">QR code</label>
        <div className="alSearchContainer">
          <div className="imageContainerAC">
            <input
              className="al-search-input"
              placeholder="Receipt"
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="button-container">
          <button className="ios-button" onClick={handleConfirm}>
            Yes
          </button>
          <button className="ios-button" onClick={handleReject}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import "./AlertModal.css";
// import images from "../../assets/constants/images";
// import { PiSubtitles } from "react-icons/pi";
// import COLORS from "../../assets/constants/colors";

// export const AlertModal = ({ isOpen, onClose, onConfirm }) => {
//   const [paymentUpdateNote, setPaymentUpdateNote] = useState("");
//   const [imageSource, setImageSource] = useState(null);

//   // Function to handle file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageSource(file);
//     }
//   };

//   const handleConfirm = () => {
//     // Call the onConfirm callback with the paymentUpdateNote and imageSource
//     onConfirm({ paymentUpdateNote, imageSource });
//   };

//   const handleReject = () => {
//     // Call the onConfirm callback with the paymentUpdateNote and imageSource
//     onClose({ paymentUpdateNote, imageSource });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="imgconM">
//           <div className="catimagecontainer">
//             <img src={images.cat} alt="cat" className="catandtrophyimg" />
//           </div>
//         </div>

//         <p className="textp">Are you sure?</p>

//         {/* Text Input for Payment Update Note */}

//          <label className="alCLLabel">Note</label>
//             <div className="alSearchContainer">

//               <input
//                 className="al-search-input"
//                 placeholder="Enter Note"
//                 value={paymentUpdateNote}
//                 onChange={(e) => setPaymentUpdateNote(e.target.value)}
//               />
//             </div>

//         {/* File Input for Image Source */}
//         <label className="alCLLabel">QR code</label>
//             <div className="alSearchContainer">

//               <div className="imageContainerAC">
//                 <input
//                   className="al-search-input"
//                   placeholder="Receipt"
//                   type="file"
//                   name="file"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                 />
//               </div>
//             </div>

//         <div className="button-container">
//           <button className="ios-button" onClick={handleConfirm}>
//             Yes
//           </button>
//           <button className="ios-button" onClick={handleReject}>
//             No
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
