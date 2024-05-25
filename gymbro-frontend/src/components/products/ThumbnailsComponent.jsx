import React, {useEffect, useState} from "react";

const ThumbnailsComponent = ({ selectedOption, setImg }) => {
    console.log("Thumbnails Component re-renders");

  return (
<>
          {selectedOption.imgSrc.map((img) => {
            return (
              <div className="d-flex justify-content-center justify-content-around shadow rounded">
                <img src={img} height={85} onClick={() => setImg(img)}/>
              </div>
            );
          })}
</>
  );
};

export default React.memo(ThumbnailsComponent);
