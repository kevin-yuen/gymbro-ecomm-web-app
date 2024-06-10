// components
import PromotionComponent from "../components/landing/PromotionComponent";
import ErrorComponent from "../components/common/ErrorComponent";

// config
import Messages from "../config/messages.json";

const serverErr = Messages.server.generic;

export const apiResultLoader = (
  isFetchSuccess,
  eligibleItems,
  noEligibleErr
) => {
  if (isFetchSuccess === true) {
    if (eligibleItems.length > 0) {
      return <PromotionComponent eligibleItems={eligibleItems} />;
    } else {
      return (
        <div className="text-danger fs-7">
          <div className="position-absolute start-50 mt-n1">
            <ErrorComponent error={noEligibleErr} />
          </div>
        </div>
      );
    }
  } else if (isFetchSuccess === false) {
    return (
      <div className="text-danger fs-7">
        <div className="position-absolute start-50 mt-n1">
          <ErrorComponent error={serverErr} />
        </div>
      </div>
    );
  }
};
