export const handleSizeMapping = (sizeName) => {
  switch (sizeName) {
    case "extra small":
      return "XS";
    case "XS":
      return "extra small";
    case "small":
      return "S";
    case "S":
      return "small";
    case "medium":
      return "M";
    case "M":
      return "medium";
    case "large":
      return "L";
    case "L":
      return "large";
    case "extra large":
      return "XL";
    case "XL":
      return "extra large";
    case "double large":
      return "XXL";
    case "XXL":
      return "double large";
    default:
      return "NOT IN STOCK";
  }
};
