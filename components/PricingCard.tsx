// "use client";
// import { useState } from "react";

// import SubscriptionButton from "./SubscriptionButton";

// import visa from "../public/images/visa-Photoroom.png";
// import mastercard from "../public/images/mastercard-Photoroom.png";
// import paypal from "../public/images/PayPal-Photoroom.png";

// // ✅ CLEAN & FIXED TERMS CONTENT
// const premiumFeatures = [
//   "Acceptance of Terms & Age Restriction: By using ProCVCreator, you agree to these terms.",
//   "We provide a platform for creating, editing, and downloading professional career documents. You must be at least 16 years old to use this service and create an account.",
//   "Subscription, Cancellation & Refunds (Crucial)",
//   "7-Day Money-Back Guarantee: We offer a no-questions-asked 7-day refund policy. If you are not satisfied with the platform, simply email us at support@procvcreator.com within 7 days of your first payment, and we will refund you in full.",
//   "After 7 Days: Once the 7-day window has passed, we do not offer refunds. However, you may cancel your subscription at any time to prevent future charges.",
//   "Governing Law: These terms and your use of ProCVCreator are governed by the laws of England and Wales.",
// ];

// export default function PricingCard() {
//   const [selectedPlan, setSelectedPlan] = useState("express");
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const planIds = {
//     monthly: "YOUR_MONTHLY_PLAN_ID",
//     express: "YOUR_EXPRESS_PLAN_ID",
//   };

//   const selectedPlanId =
//     selectedPlan === "monthly" ? planIds.monthly : planIds.express;

//   const buttonPrice = selectedPlan === "monthly" ? "$11.99" : "$7.99";

//   return (
//     <>
//       <section className="py-16 px-4">
//         <div className="mx-auto max-w-[760px] rounded-[16px] border border-[#f1cfd5] overflow-hidden bg-white">
//           {/* HEADER */}
//           <div className="px-8 py-8">
//             <h2 className="text-[54px] font-bold text-[#071b4b]">Premium</h2>
//           </div>

//           {/* PLAN OPTIONS */}
//           <div className="border-t border-[#f1cfd5] border-b border-[#f1cfd5] grid grid-cols-2">
//             {/* MONTHLY */}
//             <div
//               onClick={() => setSelectedPlan("monthly")}
//               className={`
//               flex items-center gap-3 px-8 py-6 cursor-pointer transition
//               ${selectedPlan === "monthly" ? "bg-[#fffafb]" : "bg-white"}
//             `}
//             >
//               <div
//                 className="
//               w-5 h-5 rounded-full border-2
//               border-[#d94d68]
//               flex items-center justify-center
//             "
//               >
//                 {selectedPlan === "monthly" && (
//                   <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]"></div>
//                 )}
//               </div>

//               <div>
//                 <div className="text-[48px] font-bold text-[#1600b5] leading-none">
//                   $11.99
//                 </div>

//                 <p className="text-[18px] text-gray-500">/Month</p>
//               </div>
//             </div>

//             {/* EXPRESS */}
//             <div
//               onClick={() => setSelectedPlan("express")}
//               className={`
//               flex items-center gap-3 px-8 py-6 cursor-pointer transition
//               ${selectedPlan === "express" ? "bg-[#fffafb]" : "bg-white"}
//             `}
//             >
//               <div
//                 className="
//               w-5 h-5 rounded-full border-2
//               border-[#d94d68]
//               flex items-center justify-center
//             "
//               >
//                 {selectedPlan === "express" && (
//                   <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]"></div>
//                 )}
//               </div>

//               <div>
//                 <div className="text-[48px] font-bold text-[#1600b5] leading-none">
//                   $7.99
//                 </div>

//                 <p className="text-[18px] text-gray-500">3-Day Express</p>
//               </div>
//             </div>
//           </div>

//           {/* FEATURES */}
//           <div className="px-8 py-8">
//             <ul className="space-y-8 pb-8">
//               {premiumFeatures.map((feature, index) => (
//                 <li key={index} className="flex items-start gap-5">
//                   <div className="mt-1 min-w-[24px]">
//                     <div className="w-6 h-6 rounded-full border border-[#d94d68] flex items-center justify-center">
//                       <span className="text-[#d94d68] text-[14px]">✓</span>
//                     </div>
//                   </div>

//                   <p className="text-[20px] leading-[1.8] text-black">
//                     {feature}
//                   </p>
//                 </li>
//               ))}
//             </ul>

//             {/* BUTTON */}
//             <button
//               onClick={() => setShowCheckoutModal(true)}
//               className="
//               w-full
//               bg-[#BE4763]
//               hover:bg-[#a53d56]
//               transition
//               text-white
//               py-5
//               rounded-full
//               text-[22px]
//               font-semibold
//             "
//             >
//               Start for {selectedPlan === "monthly" ? "$11.99" : "$7.99"}
//             </button>

//             {/* PAYMENT ICONS */}
//             <div className="flex justify-center items-center gap-6 mt-6">
//               <img src={visa.src} className="h-8" alt="visa" />
//               <img src={mastercard.src} className="h-10" alt="mastercard" />
//               <img src={paypal.src} className="h-10" alt="paypal" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CHECKOUT MODAL */}
//       {showCheckoutModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px]">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-black">Checkout</h2>

//               <button
//                 onClick={() => setShowCheckoutModal(false)}
//                 className="text-2xl font-bold text-black"
//               >
//                 ×
//               </button>
//             </div>

//             {/* <SubscriptionButton planId={selectedPlanId} /> */}
//             <SubscriptionButton
//   planId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID!}
// />

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import SubscriptionButton from "./SubscriptionButton";
import { CircleCheckBig } from "lucide-react";
import { ArrowRight } from "lucide-react";

import visa from "../public/images/visa-Photoroom.png";
import mastercard from "../public/images/mastercard-Photoroom.png";
import paypal from "../public/images/PayPal-Photoroom.png";

const premiumFeatures = [
  "ATS-Friendly PDF Download (Passes Robot Filters)",
  "Expert-Approved Resume Templates that get Interviews",
  "Unlimited Cover Letter Templates",
  "Cancel any time",
  "Secure Payment via PayPal",
  "Free resume critique from an HR expert",
  "Full access to ProCVCreator",
  "Contact Support Team CV – reach out to our team for direct help with your CV and profile.",
  "ATS-compliant formatting with high-value Business Analyst keywords so your CV passes automated filters.",
  "Optimising your LinkedIn profile so it is aligned with your new CV and captures recruiter attention.",
  "Organising and targeting your applications so you consistently apply to the right Business Analyst roles.",
];

export default function PricingCard() {
  const [selectedPlan, setSelectedPlan] = useState("express");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const monthlyPlanId = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID;
  const expressPlanId =
    process.env.NEXT_PUBLIC_PAYPAL_EXPRESS_PLAN_ID ||
    process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID;
  const selectedPlanId =
    selectedPlan === "monthly" ? monthlyPlanId : expressPlanId;

  return (
    <>
      <section className="py-10 sm:py-16 px-4">
        <div
          className="
            mx-auto
            w-full
            max-w-[760px]
            rounded-2xl
            border
            border-[#f1cfd5]
            overflow-hidden
            bg-white
          "
        >
          {/* HEADER */}
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <h2
              className="
                text-[34px]
                sm:text-[44px]
                md:text-[54px]
                font-bold
                text-[#071b4b]
              "
            >
              Premium
            </h2>
          </div>

          {/* PLAN OPTIONS */}
          <div
            className="
               border border-[#f1cfd5]
                rounded-2xl
                overflow-hidden
                grid grid-cols-1 sm:grid-cols-2
                mx-5 sm:mx-8
            "
          >
            {/* MONTHLY */}
            <div
              onClick={() => setSelectedPlan("monthly")}
              className={`
                flex items-center gap-3
                px-5 sm:px-8
                py-5 sm:py-6
                cursor-pointer
                transition
                border-b sm:border-b-0 sm:border-r border-[#f1cfd5]
                ${selectedPlan === "monthly" ? "bg-[#fffafb]" : "bg-white"}
              `}
            >
              <div
                className="
                  w-5 h-5 rounded-full border-2 border-[#d94d68]
                  flex items-center justify-center
                  min-w-[20px]
                "
              >
                {selectedPlan === "monthly" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]" />
                )}
              </div>

              <div>
                <div
                  className="
                    text-[34px]
                    sm:text-[42px]
                    md:text-[48px]
                    font-bold
                    text-[#1600b5]
                    leading-none
                  "
                >
                  $11.99
                </div>

                <p className="text-sm sm:text-[18px] text-gray-500">/Month</p>
              </div>
            </div>

            {/* EXPRESS */}
            <div
              onClick={() => setSelectedPlan("express")}
              className={`
                flex items-center gap-3
                px-5 sm:px-8
                py-5 sm:py-6
                cursor-pointer
                transition
                ${selectedPlan === "express" ? "bg-[#fffafb]" : "bg-white"}
              `}
            >
              <div
                className="
                  w-5 h-5 rounded-full border-2 border-[#d94d68]
                  flex items-center justify-center
                  min-w-[20px]
                "
              >
                {selectedPlan === "express" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]" />
                )}
              </div>

              <div>
                <div
                  className="
                    text-[34px]
                    sm:text-[42px]
                    md:text-[48px]
                    font-bold
                    text-[#1600b5]
                    leading-none
                  "
                >
                  $7.99
                </div>

                <p className="text-sm sm:text-[18px] text-gray-500">
                  3-Day Express
                </p>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <ul className="space-y-5 sm:space-y-8 pb-8">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-4 sm:gap-5">
                  <div className="mt-1 min-w-[24px]">
                    <div
                      className="
                      w-6 h-6
                      flex items-center justify-center
                      shrink-0"
                    >
                      <CircleCheckBig
                        size={22}
                        strokeWidth={2}
                        className="text-[#d94d68]"
                      />
                    </div>
                  </div>

                  <p
                    className="
                      text-[15px]
                      sm:text-[18px]
                      md:text-[20px]
                      leading-[1.8]
                      text-black
                    "
                  >
                    {feature}
                  </p>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="
              w-full
              bg-[#4b5565]
              hover:bg-[#424b59]
              transition-all
              duration-200
              text-white
              rounded-full
              px-7
              py-5
              flex
              items-center
              justify-between
              text-[20px]
              font-semibold"
            >
              <span>Current Plan - Go to Dashboard</span>

              <ArrowRight size={28} strokeWidth={2.5} />
            </button>

            {/* PAYMENT ICONS */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6">
              <Image
                src={visa}
                className="h-6 sm:h-8 object-contain"
                alt="visa"
                width={64}
                height={32}
              />

              <Image
                src={mastercard}
                className="h-8 sm:h-10 object-contain"
                alt="mastercard"
                width={80}
                height={40}
              />

              <Image
                src={paypal}
                className="h-8 sm:h-10 object-contain"
                alt="paypal"
                width={80}
                height={40}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            className="
              bg-white
              rounded-2xl
              p-4 sm:p-6
              w-full
              max-w-[500px]
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                Checkout
              </h2>

              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-2xl font-bold text-black"
              >
                ×
              </button>
            </div>

            {selectedPlanId ? (
              <SubscriptionButton planId={selectedPlanId} />
            ) : (
              <p className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-200">
                Missing plan ID. Set `NEXT_PUBLIC_PAYPAL_PLAN_ID` or dedicated
                monthly/express plan IDs in your env.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
