import React from 'react';

const DrawingImage = ({ imageData }) => {

    const imgStyle = {
        // color: 'red',
        // fontSize: '16px',
        // fontWeight: 'bold'
        height: '80px',
        width: '30%',
        border: '1px solid black'
    };

  return (
    <>
      {
        imageData &&
        <div style={imgStyle}>
          <img src={`${imageData}`} alt="Drawing" />
        </div>
      }
    </>
  );
};

export default DrawingImage;
