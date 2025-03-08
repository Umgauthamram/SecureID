import React from "react";

const Pricing = () => {
  const handlePayment = async (plan) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_c1xUzH6hDTZ7dP",
      amount: plan.price * 100,
      currency: "INR",
      name: "SecureID",
      description: plan.type,
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
    <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Pricing Table
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              type="Personal"
              price={5900} // Converted to INR (₹59.00)
              subscription="year"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Personal"
              onClick={() => handlePayment({ type: "Personal", price: 5900 })}
            >
              <List>1 User</List>
              <List>All UI components</List>
              <List>Lifetime access</List>
              <List>Free updates</List>
              <List>Use on 1 (one) project</List>
              <List>3 Months support</List>
            </PricingCard>
            <PricingCard
              type="Business"
              price={19900} // Converted to INR (₹199.00)
              subscription="year"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Business"
              active
              onClick={() => handlePayment({ type: "Business", price: 19900 })}
            >
              <List>5 User</List>
              <List>All UI components</List>
              <List>Lifetime access</List>
              <List>Free updates</List>
              <List>Use on 3 (Three) projects</List>
              <List>4 Months support</List>
            </PricingCard>
            <PricingCard
              type="Professional"
              price={25600} // Converted to INR (₹256.00)
              subscription="year"
              description="Perfect for using in a personal website or a client project."
              buttonText="Choose Professional"
              onClick={() => handlePayment({ type: "Professional", price: 25600 })}
            >
              <List>Unlimited User</List>
              <List>All UI components</List>
              <List>Lifetime access</List>
              <List>Free updates</List>
              <List>Unlimited projects</List>
              <List>12 Months support</List>
            </PricingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  onClick,
}) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
        <span className="mb-3 block text-lg font-semibold text-primary">
          {type}
        </span>
        <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
          ₹{price / 100}
          <span className="text-base font-medium text-body-color dark:text-dark-6">
            / {subscription}
          </span>
        </h2>
        <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
          {description}
        </p>
        <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
        <button
          onClick={onClick}
          className={` ${
            active
              ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
              : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
          } `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const List = ({ children }) => (
  <p className="text-body-color dark:text-dark-6">{children}</p>
);
