import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// context
import AuthContextProvider from "./context/AuthContextProvider";
import LogoContextProvider from "./context/LogoContextProvider";
import CheckoutContextProvider from "./context/CheckoutContextProvider";

// layouts
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import ShoppingBagLayout from "./layouts/ShoppingBagLayout";

// config
import NotificationConfig from "./config/messages.json";

// components
import AuthFormButtonComponent from "./components/auth/AuthFormButtonComponent";

// pages
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import CreateAccount from "./pages/auth/CreateAccount";
import EmailNotification from "./pages/auth/EmailNotification";
import ExpiredVerificationLink from "./pages/auth/error/ExpiredVerificationLink";
import InvalidVerificationLink from "./pages/auth/error/InvalidVerificationLink";
import ForgotPassword from "./pages/auth/ForgotPassword";
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

// email content
const verifyEmailNotification = NotificationConfig["notification"].verification;
const passwordResetEmailNotification =
  NotificationConfig["notification"]["password-reset"];
const emailVerifiedNotification =
  NotificationConfig["notification"]["email-verified"];
const emailVerifiedPriorNoti =
  NotificationConfig["notification"]["email-verified-prior"];
const passwordResetSuccessNoti =
  NotificationConfig["notification"]["password-reset-success"];

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/womenActivewear" element={<WomenActivewear />} />
        <Route path="/menActivewear" element={<MenActivewear />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/aboutProduct" element={<AboutProduct />} />

        <Route path="bag" element={<ShoppingBagLayout />}>
          <Route index element={<BagDetails />} />
          <Route path="information" element={<BuyerInformation />} />
          <Route path="shipping" element={<ShippingInformation />} />
          <Route path="payment" element={<PaymentInformation />} />
          <Route path="checkoutComplete" element={<CheckoutCompletion />} />
        </Route>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="signin"
          element={<SignIn formButton={<AuthFormButtonComponent />} />}
        />
        <Route
          path="register"
          element={<CreateAccount formButton={<AuthFormButtonComponent />} />}
        />
        <Route
          path="forgotPassword"
          element={<ForgotPassword formButton={<AuthFormButtonComponent />} />}
        />
        <Route
          path="resetPassword/:id"
          element={<ResetPassword formButton={<AuthFormButtonComponent />} />}
        />

        <Route
          path="verification_email_sent_success"
          element={
            <EmailNotification
              autoRedirect={verifyEmailNotification["auto-redirect"]}
              userSpecificRedirect={
                verifyEmailNotification["user-specific-redirect"]
              }
              header={verifyEmailNotification.header}
              text={verifyEmailNotification["text"]}
              alttext1={verifyEmailNotification["alttext1"]}
              alttext2={verifyEmailNotification["alttext2"]}
              url={verifyEmailNotification.url}
              labelurl={verifyEmailNotification["labelurl"]}
            />
          }
        />
        <Route
          path="temporary_password_sent_success/:id"
          element={
            <EmailNotification
              autoRedirect={passwordResetEmailNotification["auto-redirect"]}
              userSpecificRedirect={
                passwordResetEmailNotification["user-specific-redirect"]
              }
              header={passwordResetEmailNotification.header}
              text={passwordResetEmailNotification["text"]}
              alttext1={passwordResetEmailNotification["alttext1"]}
              alttext2={passwordResetEmailNotification["alttext2"]}
              url={passwordResetEmailNotification.url}
              labelurl={passwordResetEmailNotification["labelurl"]}
            />
          }
        />
        <Route
          path="email_verified"
          element={
            <EmailNotification
              autoRedirect={emailVerifiedNotification["auto-redirect"]}
              userSpecificRedirect={
                emailVerifiedNotification["user-specific-redirect"]
              }
              header={emailVerifiedNotification.header}
              text={emailVerifiedNotification["text"]}
              alttext1={emailVerifiedNotification["alttext1"]}
              alttext2={emailVerifiedNotification["alttext2"]}
              url={emailVerifiedNotification.url}
              labelurl={emailVerifiedNotification["labelurl"]}
            />
          }
        />
        <Route
          path="email_verified_prior"
          element={
            <EmailNotification
              autoRedirect={emailVerifiedPriorNoti["auto-redirect"]}
              userSpecificRedirect={
                emailVerifiedPriorNoti["user-specific-redirect"]
              }
              header={emailVerifiedPriorNoti.header}
              text={emailVerifiedPriorNoti["text"]}
              alttext1={emailVerifiedPriorNoti["alttext1"]}
              alttext2={emailVerifiedPriorNoti["alttext2"]}
              url={emailVerifiedPriorNoti.url}
              labelurl={emailVerifiedPriorNoti["labelurl"]}
            />
          }
        />
        <Route
          path="password_reset_success"
          element={
            <EmailNotification
              autoRedirect={passwordResetSuccessNoti["auto-redirect"]}
              userSpecificRedirect={
                passwordResetSuccessNoti["user-specific-redirect"]
              }
              header={passwordResetSuccessNoti.header}
              text={passwordResetSuccessNoti["text"]}
              alttext1={passwordResetSuccessNoti["alttext1"]}
              alttext2={passwordResetSuccessNoti["alttext2"]}
              url={passwordResetSuccessNoti.url}
              labelurl={passwordResetSuccessNoti["labelurl"]}
            />
          }
        />
        <Route
          path="expired_verification_link/:id"
          element={<ExpiredVerificationLink />}
        />
        <Route
          path="invalid_verification_link/:id"
          element={<InvalidVerificationLink />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  return (
    <AuthContextProvider>
      <LogoContextProvider>
        <CheckoutContextProvider>
          <RouterProvider router={router} />;
        </CheckoutContextProvider>
      </LogoContextProvider>
    </AuthContextProvider>
  );
}
