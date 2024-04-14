import React from "react";

const ProductDetailsComponent = ({
  sectionName,
  ...product_information_data
}) => {
  return (
    <>
      <h5 className="fs-7 fw-semibold">{sectionName}</h5>
      <div>
        <table className="table">
          <tbody className="fs-8">
            {Object.keys(product_information_data).map((element) => (
              <tr>
                <th scope="row">{element}</th>
                <td>{product_information_data[element]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
