"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
  type PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

export default function App() {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");

  const router = useRouter();

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Enter amount to donate (in USD)"
        value={donationAmount}
        onChange={handleInputChange}
      />
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 40,
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "1",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            if (!actions.order)
              return Promise.reject("Order actions not available");
            return actions.order
              .capture()
              .then((details) => {
                const payerName =
                  details?.payer?.name?.given_name || "Customer";
                setPaymentStatus(
                  `Thank you, ${payerName}! Your payment was successful.`
                );
                router.push(
                  `/donate/thank-you?payment=success&client=${payerName}&amount=${details?.purchase_units?.[0]?.amount?.value}`
                );
              })
              .catch((error) => {
                console.error("Payment capture error:", error);
                setPaymentStatus(
                  "An error occurred while processing your payment. Please try again."
                );
              });
          }}
          onError={(error) => {
            console.error("PayPal Button Error:", error);
            setPaymentStatus(
              "An error occurred with the PayPal transaction. Please try again."
            );
          }}
        />
      </PayPalScriptProvider>
      {paymentStatus && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid",
            borderColor: paymentStatus.includes("successful") ? "green" : "red",
            color: paymentStatus.includes("successful") ? "green" : "red",
          }}
        >
          {paymentStatus}
        </div>
      )}
    </div>
  );
}
