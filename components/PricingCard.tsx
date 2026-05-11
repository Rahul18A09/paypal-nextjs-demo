"use client";
import { useState } from "react";

import SubscriptionButton from "./SubscriptionButton";

import visa from "../public/images/visa-Photoroom.png";
import mastercard from "../public/images/mastercard-Photoroom.png";
import paypal from "../public/images/PayPal-Photoroom.png";

// ✅ CLEAN & FIXED TERMS CONTENT
const premiumFeatures = [
  "Acceptance of Terms & Age Restriction: By using ProCVCreator, you agree to these terms.",
  "We provide a platform for creating, editing, and downloading professional career documents. You must be at least 16 years old to use this service and create an account.",
  "Subscription, Cancellation & Refunds (Crucial)",
  "7-Day Money-Back Guarantee: We offer a no-questions-asked 7-day refund policy. If you are not satisfied with the platform, simply email us at support@procvcreator.com within 7 days of your first payment, and we will refund you in full.",
  "After 7 Days: Once the 7-day window has passed, we do not offer refunds. However, you may cancel your subscription at any time to prevent future charges.",
  "Governing Law: These terms and your use of ProCVCreator are governed by the laws of England and Wales.",
];

export default function PricingCard() {


  const [selectedPlan, setSelectedPlan] = useState("express");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const planIds = {
  monthly: "YOUR_MONTHLY_PLAN_ID",
  express: "YOUR_EXPRESS_PLAN_ID",
};


const selectedPlanId =
  selectedPlan === "monthly"
    ? planIds.monthly
    : planIds.express;


  const buttonPrice =
  selectedPlan === "monthly"
    ? "$11.99"
    : "$7.99";


  return (

    <section className="py-16 px-4">
      <div className="mx-auto max-w-[760px] rounded-[16px] border border-[#f1cfd5] overflow-hidden bg-white">
        {/* HEADER */}
        <div className="px-8 py-8">
          <h2 className="text-[54px] font-bold text-[#071b4b]">Premium</h2>
        </div>

        {/* PLAN OPTIONS */}
        <div className="border-t border-[#f1cfd5] border-b border-[#f1cfd5] grid grid-cols-2">
          {/* MONTHLY */}
          {/* <div className="flex items-center gap-3 px-8 py-6">
                <div className="w-5 h-5 rounded-full border border-gray-400"></div>

                <div>
                    <div className="text-[48px] font-bold text-[#1600b5] leading-none">
                        $14.99
                    </div>

                    <p className="text-[18px]">
                        /Month
                    </p>
                </div>
            </div> */}
    


{/* MONTHLY */}
<div
    onClick={() => setSelectedPlan("monthly")}
    className={`
        flex items-center gap-3 px-8 py-6 cursor-pointer transition
        ${selectedPlan === "monthly"
            ? "bg-[#fffafb]"
            : "bg-white"}
    `}
>
    {/* RADIO */}
    <div className="
        w-5 h-5 rounded-full border-2
        border-[#d94d68]
        flex items-center justify-center
    ">
        {selectedPlan === "monthly" && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]"></div>
        )}
    </div>

    <div>
        <div className="text-[48px] font-bold text-[#1600b5] leading-none">
            $11.99
        </div>

        <p className="text-[18px] text-gray-500">
            /Month
        </p>
    </div>
</div>



{/* EXPRESS */}
<div
    onClick={() => setSelectedPlan("express")}
    className={`
        flex items-center gap-3 px-8 py-6 cursor-pointer transition
        ${selectedPlan === "express"
            ? "bg-[#fffafb]"
            : "bg-white"}
    `}
>
    {/* RADIO */}
    <div className="
        w-5 h-5 rounded-full border-2
        border-[#d94d68]
        flex items-center justify-center
    ">
        {selectedPlan === "express" && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#d94d68]"></div>
        )}
    </div>

    <div>
        <div className="text-[48px] font-bold text-[#1600b5] leading-none">
            $7.99
        </div>

        <p className="text-[18px] text-gray-500">
            3-Day Express
        </p>
    </div>
</div>

</div>

        {/* FEATURES */}
        <div className="px-8 py-8">
          <ul className="space-y-8 pb-8">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-5">
                {/* CHECK ICON */}
                <div className="mt-1 min-w-[24px]">
                  <div className="w-6 h-6 rounded-full border border-[#d94d68] flex items-center justify-center">
                    <span className="text-[#d94d68] text-[14px]">✓</span>
                  </div>
                </div>

                {/* TEXT */}
                <p className="text-[20px] leading-[1.8] text-black">
                  {feature}
                </p>
              </li>
            ))}
          </ul>



<button
  onClick={() => setShowCheckoutModal(true)}
  className="
    w-full
    bg-[#BE4763]
    hover:bg-[#a53d56]
    transition
    text-white
    py-5
    rounded-full
    text-[22px]
    font-semibold
  "
>
  Start for {selectedPlan === "monthly" ? "$11.99" : "$7.99"}
</button>



          {/* <SubscriptionButton /> */}

          {/* PAYMENT ICONS */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <img src={visa.src} className="h-8" alt="visa" />
            <img src={mastercard.src} className="h-10" alt="mastercard" />
            <img src={paypal.src} className="h-10" alt="paypal" />
          </div>
        </div>
      </div>
    </section>
  );
}   

