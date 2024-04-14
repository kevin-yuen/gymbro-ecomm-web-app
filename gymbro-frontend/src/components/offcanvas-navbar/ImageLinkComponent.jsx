import React from 'react'

export default function ImageLinkComponent({imageSource, imageLabel, imageLinkName}) {
  return (
    <div className="image-link-group custom-background-color-antiquewhite">
        <img src={imageSource} alt={imageLabel} className="image" width={336} height={150} />
        <h3 className="text-center text-uppercase fw-bolder custom-color-darkpurple custom-font-family-teko">{imageLinkName}</h3>
    </div>
  )
}
