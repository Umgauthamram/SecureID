import React from "react";
import { useNavigate } from "react-router-dom";
// import { Fingerprint } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const plans = [
    { name: "Free", price: 0, duration: "Forever", features: ["Basic Support", "Limited Access"] },
    { name: "Monthly", price: 299, duration: "1 Month", features: ["15 Users", "Feature 1", "Feature 2", "Feature 3"] },
    { name: "Quarterly", price: 799, duration: "3 Months", features: ["15 Users", "Feature 1", "Feature 2", "Feature 3"] },
    { name: "Yearly", price: 2999, duration: "12 Months", features: ["Unlimited Users", "All Features", "Priority Support"] },
  ];

  const handlePayment = async (plan) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check your internet connection.");
      return;
    }

    const options = {
      key:"rzp_test_c1xUzH6hDTZ7dP",
      amount: plan.price * 100,
      currency: "INR",
      name: "SecureID",
      description: plan.name,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#4F46E5" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-10 relative">
      {/* Logo (Clickable, Redirects to Home Page) */}
      <div
        className="absolute top-5 left-5 flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        
        <span className="text-xl font-bold">SecureID</span>
      </div>

      <h1 className="text-4xl font-extrabold mt-16">Premium Plans</h1>
      <p className="text-gray-600 mt-2 text-center max-w-lg">
        Choose the plan that best fits your needs and start your journey today.
      </p>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 mt-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-64 p-6 rounded-xl shadow-lg bg-white text-center transition-all duration-300 
                      hover:bg-gradient-to-br hover:from-white hover:to-orange-200"
          >
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-4xl font-extrabold mt-2">
              ₹{plan.price} <span className="text-lg font-medium">/ {plan.duration}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700 text-sm">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 bg-white text-gray-900 px-5 py-3 rounded-lg text-lg font-semibold border border-gray-300 
                         hover:bg-orange-500 hover:text-white transition"
              onClick={() => handlePayment(plan)}
              disabled={plan.price === 0}
            >
              {plan.price === 0 ? "Get Free Plan" : "Pay Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
