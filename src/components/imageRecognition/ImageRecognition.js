import React from "react";
import "./ImageRecognition.css";

const ImageRecognition = ({ imgUrl, box, status }) => {
  let display = "display-none";
  if (Object.entries(box).length !== 0) {
    display = "";
  }
  return (
    <>
      <div className={imgUrl ? "center ma" : "display-none"}>
        <div className="absolute mt2 shadow-2">
          {status === "" ? null : <p>{status}</p>}
          <img id="inputImage" alt="" src={imgUrl} width="500px" heigh="auto" />
          <div
            className={`${display}bounding-box`}
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ImageRecognition;
