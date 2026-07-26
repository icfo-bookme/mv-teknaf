import Image from "next/image";
import termsIcon from "../../../public/icons/terms-and-conditions.png"; // Replace with your actual image path

const TermsCancellation = () => {
  return (
    <section className="py-10 px-4 bg-white text-center">
      <div className="max-w-3xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Image
            src={termsIcon}
            alt="Terms & Conditions"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl text-blue-950 md:text-4xl font-semibold">
          Terms and Condition For{" "}
          <span className="text-red-600">Ticket Cancellation</span>
        </h2>

        {/* List */}
        <div className="mt-6 text-left space-y-3 text-lg leading-relaxed text-gray-800">
          <p>
            <span className="text-red-700 font-bold">***</span> For reschedule/cancellation customer must inform us{" "}
            <span className="text-red-600 font-semibold">72</span> hours before the journey schedule and{" "}
            <span className="text-red-600 font-semibold">20%</span> of ticket price will be charged +{" "}
            <span className="text-red-600 font-semibold">5%</span> Convenience fee. (Total{" "}
            <span className="text-red-600 font-semibold">25%</span>)
          </p>
          <p>
            <span className="text-red-700 font-bold">***</span> If any trip is canceled by authority, customer will get{" "}
            <span className="text-red-600 font-semibold">100%</span> refund.
          </p>
          <p>
            <span className="text-red-700 font-bold">***</span> Refund will be made through bank only.
          </p>
          <p>
            <span className="text-red-700 font-bold">***</span> All refunds will be processed within seven (
            <span className="italic">7</span>) working days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsCancellation;
