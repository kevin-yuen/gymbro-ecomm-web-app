// components
import PromotionComponent from "../components/landing/PromotionComponent";
import ErrorComponent from "../components/common/ErrorComponent";

// config
import Messages from "../config/messages.json";

const serverErr = Messages.server.generic;

export const apiResultLoader = (isFetchSuccess, eligibleItems, noEligibleErr) => {
    if (isFetchSuccess === true) {
        if (eligibleItems.length > 0) {
          return <PromotionComponent discountItems={eligibleItems} />;
        } else {
          return <ErrorComponent error={noEligibleErr} />;
        }
      } else if (isFetchSuccess === false) {
        return <ErrorComponent error={serverErr} />;
      }
}