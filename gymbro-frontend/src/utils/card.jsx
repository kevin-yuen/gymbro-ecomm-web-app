// config
import brandsConfig from "../config/brands.json";

const brandNameUA = brandsConfig.underarmour;

// make product name camelcase
export const handleConvertCamelCase = (productName) => {
  let camelProductName = "";

  productName.split(" ").forEach((name) => {
    switch (name) {
      case brandNameUA:
        camelProductName += name + " ";
        break;
      default:
        camelProductName +=
          name.substring(0, 1).toUpperCase() +
          name.substring(1).toLowerCase() +
          " ";

        break;
    }
  });

  return camelProductName;
};

// make gender uppercase
export const handleConvertUpperCase = (gender) =>
  gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();
