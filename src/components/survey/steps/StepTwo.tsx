"use client";

import { motion } from "framer-motion";

const pricingOptions = [
    "Yes, definitely.",
    "Maybe, depends on the features.",
    "Probably not.",
    "No",
];

interface StepTwoProps {
    barriers: string;
    wouldPay: string;
    onUpdate: (field: string, value: string) => void;
}

export function StepTwo({ barriers, wouldPay, onUpdate }: StepTwoProps) {
    return (
        <div className="flex flex-col gap-8">
            {/* Barriers (optional) */}
            <div>
                <label className="text-[16px] font-semibold font-inter text-black block mb-1">
                    What stops you from finishing them?
                </label>
                <p className="text-[13px] text-[#494949] font-inter mb-2">(optional — but we&apos;d love to know)</p>
                <input
                    type="text"
                    value={barriers}
                    onChange={(e) => onUpdate("barriers", e.target.value)}
                    placeholder="Not enough time, forget about them, t..."
                    className="w-full h-[45px] rounded-[30px] border border-[#DDDDDD] px-5 text-[14px] font-inter text-black placeholder:text-[#BBBBBB] focus:border-brand-red focus:outline-none transition-colors"
                />
            </div>

            {/* Would pay */}
            <div>
                <label className="text-[16px] font-semibold font-inter text-black block mb-3">
                    Would you pay $7/month for a tool that helps you finish what you save? <span className="text-brand-red">*</span>
                </label>
                <div className="flex flex-col gap-2">
                    {pricingOptions.map((option) => (
                        <motion.button
                            key={option}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onUpdate("wouldPay", option)}
                            className={`w-full h-[40px] rounded-[30px] border px-4 text-[14px] font-inter text-left transition-colors ${
                                wouldPay === option
                                    ? "bg-brand-red text-white border-brand-red"
                                    : "border-[#DDDDDD] text-black hover:border-[#BBBBBB]"
                            }`}
                        >
                            {option}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
