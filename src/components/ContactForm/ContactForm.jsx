"use client";

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postPackageInfo from "@/lib/postPacageInfo";

const ContactForm = ({ title }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const emailData = {
            name: `${data.firstName}`,
            email: data.email,
            phoneNumber: data.phoneNumber,
            message: data.additionalInfo,
        };

        const apiData = {
            name: `${data.firstName}`,
            number: data.phoneNumber,
            additional_info: data.additionalInfo,
            property_name: "MV Teknaf",
            category: "819",
        };

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAIL_JS_SERVICEID,
                process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATEID,
                emailData,
                process.env.NEXT_PUBLIC_EMAIL_JS_USERID
            );

            const apiResponse = await postPackageInfo(apiData);
            if (apiResponse.error) {
                toast.error("Failed to submit package info.");
            } else {
                toast.success("Submitted Successfully");
                reset(); // Clear form after successful submission
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while processing your request.");
        }
    };

    return (
        <div style={{
            boxShadow: 'inset 0 4px 8px rgba(67, 56, 202, 0.4)' // Tailwind's indigo-700 as rgba
        }} className="md:max-w-lg w-full mx-auto  p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {title === "show" &&
                <div className="text-center mb-8">
                    <h1 className="text-xl text-blue-800 font-bold text-blur-950 mb-2">
                        Send Us a Message
                    </h1>
                    <p className="text-gray-600">We will get back to you as soon as possible</p>
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">Name is required</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="01xxxxxxxxx"
                        {...register("phoneNumber", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{11,}$/,
                                message: "Phone number must be at least 11 digits and contain only numbers",
                            },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                    )}
                </div>

                {/* Email Address */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Additional Info */}
                <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Info
                    </label>
                    <textarea
                        id="additionalInfo"
                        {...register("additionalInfo")}
                        rows={4}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{
                        background: "linear-gradient(90deg, #313881, #0678B4)",
                        opacity: isSubmitting ? 0.7 : 1,
                    }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;