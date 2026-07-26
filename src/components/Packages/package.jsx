'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    FaPhoneAlt,
    FaInfoCircle,
    FaWhatsapp,
    FaTimes,
    FaExclamationTriangle
} from 'react-icons/fa';
import { Roboto } from 'next/font/google';
import PrimaryButton from '../ui/Button';
import Link from 'next/link';
import Modal from '../ui/Modal';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export default function Packages({ packages, foodAndDescription }) {
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (isModalOpen) {
            // Fix background scroll and prevent "jump"
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, [isModalOpen]);
    const openModal = (description) => {
        setSelectedDescription(description);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDescription(null);
        document.body.style.overflow = 'unset';
    };

    const handleCall = () => {
        window.location.href = 'tel:+8801841999922';
    };

    const handleBook = () => {
        alert('Redirecting to booking form...');
    };

    const handleWhatsApp = () => {
        const message = "Hello, I'm interested in booking a package on MV Teknaf.";
        const url = `https://wa.me/8801841999922?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const truncateText = (text, wordLimit = 30, charLimit = 200) => {
        if (!text) return "";

        const words = text.trim().split(/\s+/);
        let truncated = words.slice(0, wordLimit).join(" ");

        if (truncated.length > charLimit) {
            truncated = truncated.substring(0, charLimit);
        }

        return truncated + (words.length > wordLimit || text.length > charLimit ? "..." : "");
    };

    const calculateDiscountPrice = (pkg, isRoundTrip = false) => {
        const basePrice = isRoundTrip ? pkg.round_trip_price : pkg.price;

        if (!basePrice) return null;

        if (pkg.discount_percent && pkg.discount_percent > 0) {
            return Math.round(basePrice * (1 - pkg.discount_percent / 100));
        } else if (pkg.discount_amount && pkg.discount_amount > 0) {
            return Math.round(basePrice - pkg.discount_amount);
        }

        return basePrice;
    };

    const imageBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <FaExclamationTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Packages</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-[#FFFFFF] '>
            <div className="max-w-5xl mx-auto px-4 ">
                <div className={`  text-center mb-12`}>
                    <h1 className="text-2xl  text-center text-blue-950  pt-8 lg:text-3xl font-bold mb-1">
                        MV Teknaf <span className="text-red-700">Packages</span>
                    </h1>
                    <p className="text-gray-900 max-w-3xl mx-auto">
                        Explore our premium cruise packages with exceptional amenities and competitive pricing
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-[#313881] to-[#0678B4] text-white px-6 py-3 mt-3 rounded-lg"
                    >
                        Food & Travel Description
                    </button>
                    <div className='max-h-[80vh]'>
                        <Modal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            title="MV Teknaf Food & Travel Description"
                            foodAndDescription={foodAndDescription}
                        />
                    </div>

                </div>
                <div className={`${roboto.className}`}>
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-8">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-2/5 h-64 md:h-auto bg-gray-300"></div>
                                        <div className="md:w-3/5 p-6">
                                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-4/5 mb-6"></div>
                                            <div className="flex justify-between">
                                                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                                                <div className="flex gap-3">
                                                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                                                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                                                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : packages && packages.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8">
                            {packages.map((pkg) => {
                                const hasDiscount =
                                    (pkg.discount_amount && pkg.discount_amount > 0) ||
                                    (pkg.discount_percent && pkg.discount_percent > 0);

                                const discountText =
                                    pkg.discount_percent && pkg.discount_percent > 0
                                        ? `${Math.round(pkg.discount_percent)}% OFF`
                                        : pkg.discount_amount && pkg.discount_amount > 0
                                            ? `Save ৳${Math.round(pkg.discount_amount)}`
                                            : null;

                                const singleTripPrice = calculateDiscountPrice(pkg, false);
                                const roundTripPrice = calculateDiscountPrice(pkg, true);

                                return (
                                    <div style={{
                                        boxShadow: `
    inset 0 4px 8px rgba(67, 56, 202, 0.1),   /* top */
    inset 0 -4px 8px rgba(67, 56, 202, 0.1),  /* bottom */
    inset 4px 0 8px rgba(67, 56, 202, 0.1),   /* left */
    inset -4px 0 8px rgba(67, 56, 202, 0.1)   /* right */
  `
                                    }}
                                        key={pkg.unit_id}
                                        className="bg-white  rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
                                    >


                                        <div className="flex flex-col md:flex-row">
                                            {/* Image Section */}
                                            <div className="md:w-2/5 relative h-64 md:h-auto">
                                                {hasDiscount && (
                                                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-md">
                                                        {discountText}
                                                    </div>
                                                )}
                                                <Image
                                                    src={`${imageBaseUrl}/storage/${pkg.mainimg}`}
                                                    alt={pkg.unit_name || "Package Image"}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>

                                            {/* Details Section */}
                                            <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h5 className="text-2xl font-bold text-blue-950">{pkg.unit_name}</h5>
                                                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                            {pkg.unit_category}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-900">
                                                        <span><strong className="mr-1">Capacity:</strong> {pkg.person_allowed} persons</span>
                                                        <span className="text-blue-950">•</span>
                                                        <span><strong className="mr-1">Extra Bed:</strong> {pkg.additionalbed}</span>
                                                        <span className="text-blue-950">•</span>
                                                        <span><strong className="mr-1">Type:</strong> {pkg.unit_type}</span>
                                                    </div>

                                                    {pkg.description && (
                                                        <div className="mb-2">
                                                            <p className="text-gray-900">
                                                                <strong className="mr-1"> Details:</strong>  {truncateText(pkg.description)}
                                                                <button
                                                                    onClick={() => openModal(pkg.description)}
                                                                    className="text-blue-800 hover:text-blue-600 font-bold ml-2 text-base"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <hr className="my-4" />

                                                {/* Pricing & Actions */}
                                                <div className="flex flex-col sm:flex-row items-center justify-between">
                                                    <div className="mb-4 sm:mb-0 flex gap-4 ">
                                                        {/* Single Trip */}
                                                        {singleTripPrice !== null && (
                                                            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                                                                {/* Duration Label */}


                                                                {/* Price Label */}
                                                                <p className="text-sm text-red-600 font-medium">Price</p>

                                                                {/* Price Section */}
                                                                <div className="flex items-center">
                                                                    {hasDiscount && (
                                                                        <p className="text-sm text-gray-500 line-through mr-2">
                                                                            {Math.round(pkg.price)} TK
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xl font-bold text-blue-950">
                                                                        {Math.round(singleTripPrice)} TK
                                                                    </p>
                                                                </div>
                                                                <div className='flex items-center justify-center'>
                                                                    <p className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 inline-block rounded">
                                                                        {pkg.Validity}
                                                                    </p>
                                                                    {/* Price Note */}
                                                                    <p className="text-xs text-gray-500">/ Per person</p>
                                                                </div>

                                                            </div>

                                                        )}

                                                        {/* Round Trip */}
                                                        {roundTripPrice > 0 && (
                                                            <div className="bg-green-50 p-3 rounded-lg">
                                                                <p className="text-sm text-gray-600 font-medium">Round Trip</p>
                                                                <div className="flex items-center">
                                                                    {hasDiscount && (
                                                                        <p className="text-sm text-gray-500 line-through mr-2">
                                                                            {Math.round(pkg.round_trip_price)} TK
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xl font-bold text-blue-950">
                                                                        {Math.round(roundTripPrice)} TK
                                                                    </p>
                                                                </div>
                                                                <p className="text-xs text-gray-500">Per person</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button
                                                            style={{
                                                                background: 'linear-gradient(90deg, #313881, #0678B4)',
                                                            }}
                                                            onClick={handleCall}
                                                            className="flex items-center text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                                        >
                                                            <FaPhoneAlt className="mr-2" />
                                                            Call Now
                                                        </button>

                                                        <PrimaryButton
                                                            style={{
                                                                background: 'linear-gradient(90deg, #313881, #0678B4)',
                                                            }}
                                                            onClick={handleWhatsApp}
                                                            bgColor="bg-green-800"
                                                            hoverColor="hover:bg-green-600"
                                                            icon={FaWhatsapp}
                                                        >
                                                            Book Now
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-lg text-red-600 font-semibold text-center">
                                    To Buy Ticket Sign Up & Get A Call
                                </p>
                                <Link href="/get-a-call">
                                    <button className="bg-gradient-to-r from-[#313881] to-[#0678B4] text-white px-4 py-2 rounded">
                                        Sign Up Now
                                    </button>
                                </Link>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Packages Available</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We are currently updating our packages. Please check back later or contact us for more information.
                            </p>
                        </div>
                    )}

                    {/* Modal */}
                    {isModalOpen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center p-6 border-b">
                                    <h3 className="text-xl font-bold text-gray-800">Package Details</h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto">
                                    <p className="text-gray-700 whitespace-pre-line">{selectedDescription}</p>
                                </div>
                                <div className="p-6 border-t bg-gray-50 flex justify-end">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gradient-to-r from-[#313881] to-[#0678B4] hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div></div>
    );
}
