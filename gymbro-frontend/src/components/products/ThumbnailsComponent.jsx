import React from "react";

const ThumbnailsComponent = ({ selectedOption, setImg }) => {
  return (
<>
          {selectedOption.imgSrc.map((img, i) => {
            return (
              <div className="d-flex justify-content-center justify-content-around shadow rounded" key={i}>
                <img src={img} alt="" height={85} onClick={() => setImg(img)}/>
              </div>
            );
          })}
</>
  );
};

export default React.memo(ThumbnailsComponent);
