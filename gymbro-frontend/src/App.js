import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// context
import LogoContextProvider from "./context/LogoContextProvider";
import CheckoutContextProvider from "./context/CheckoutContextProvider";

// layouts
import RootLayout from "./layouts/RootLayout";
import ShoppingBagLayout from "./layouts/ShoppingBagLayout";

// pages
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import CreateAccount, {createAccountAction} from "./pages/auth/CreateAccount";
import EmailSentNotification from "./pages/auth/EmailSentNotification";
import EmailVerified from "./pages/auth/EmailVerified";
import ExpiredVerificationLink from "./pages/auth/error/ExpiredVerificationLink";
import InvalidVerificationLink, {resendVerificationLinkAction} from "./pages/auth/error/InvalidVerificationLink";
import ForgotPasword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/products/AllProducts";
import WomenActivewear from "./pages/products/WomenActivewear";
import MenActivewear from "./pages/products/MenActivewear";
import Supplements from "./pages/products/Supplements";
import AboutProduct from "./pages/products/AboutProduct";
import BagDetails from "./pages/shoppingBag/BagDetails";
import BuyerInformation from "./pages/shoppingBag/BuyerInformation";
import ShippingInformation from "./pages/shoppingBag/ShippingInformation";
import PaymentInformation from "./pages/shoppingBag/PaymentInformation";
import CheckoutCompletion from "./pages/shoppingBag/CheckoutCompletion";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/women-activewear" element={<WomenActivewear />} />
        <Route path="/men-activewear" element={<MenActivewear />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/about-product" element={<AboutProduct />} />

        <Route path="bag" element={<ShoppingBagLayout />}>
          <Route index element={<BagDetails />} />
          <Route path="information" element={<BuyerInformation />} />
          <Route path="shipping" element={<ShippingInformation />} />
          <Route path="payment" element={<PaymentInformation />} />
          <Route path="checkout-complete" element={<CheckoutCompletion />} />
        </Route>
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<CreateAccount />} action={createAccountAction} />
      <Route path="/verification-email-sent" element={<EmailSentNotification />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/expired-verification-link/:id" element={<ExpiredVerificationLink />} />
      <Route path="/invalid-verification-link/:id" element={<InvalidVerificationLink />} action={resendVerificationLinkAction} />
      <Route path="/forgotpassword" element={<ForgotPasword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  return (
    <LogoContextProvider>
      <CheckoutContextProvider>
        <RouterProvider router={router} />;
      </CheckoutContextProvider>
    </LogoContextProvider>
  );
}
