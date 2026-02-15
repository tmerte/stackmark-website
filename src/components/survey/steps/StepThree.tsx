"use client";

import { motion, AnimatePresence } from "framer-motion";

const toolOptions = [
    "Figma",
    "After Effects",
    "Blender",
    "Sketch",
    "Adobe XD",
    "Webflow",
    "Cinema 4D",
    "Other (please specify)",
];

interface StepThreeProps {
    primaryTools: string[];
    primaryToolOther: string;
    onToggleTool: (tool: string) => void;
    onUpdate: (field: string, value: string) => void;
}

export function StepThree({ primaryTools, primaryToolOther, onToggleTool, onUpdate }: StepThreeProps) {
    const hasOther = primaryTools.includes("Other (please specify)");

    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="text-[16px] font-semibold font-inter text-black block mb-1">
                    What&apos;s your primary design tool? <span className="text-brand-red">*</span>
                </label>
                <p className="text-[13px] text-[#494949] font-inter mb-3">Select all that apply</p>
                <div className="grid grid-cols-2 gap-2">
                    {toolOptions.map((option) => {
                        const isSelected = primaryTools.includes(option);
                        return (
                            <motion.button
                                key={option}
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => onToggleTool(option)}
                                className={`h-[40px] rounded-[30px] border px-4 text-[14px] font-inter text-left transition-colors ${
                                    isSelected
                                        ? "bg-brand-red text-white border-brand-red"
                                        : "border-[#DDDDDD] text-black hover:border-[#BBBBBB]"
                                }`}
                            >
                                {option}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {hasOther && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <label className="text-[14px] font-semibold font-inter text-black block mb-2">
                            Please specify <span className="text-brand-red">*</span>
                        </label>
                        <input
                            type="text"
                            value={primaryToolOther}
                            onChange={(e) => onUpdate("primaryToolOther", e.target.value)}
                            placeholder="Your design tool..."
                            className="w-full h-[45px] rounded-[30px] border border-[#DDDDDD] px-5 text-[14px] font-inter text-black placeholder:text-[#BBBBBB] focus:border-brand-red focus:outline-none transition-colors"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
