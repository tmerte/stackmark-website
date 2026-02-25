"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { StepOne } from "./steps/StepOne";
import { ThankYou } from "./steps/ThankYou";

export function SurveyForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = useCallback((field: string, value: string) => {
        if (field === "email") setEmail(value);
    }, []);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async () => {
        if (!emailValid || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Submission error:", err);
            }
        } catch (err) {
            console.error("Network error:", err);
        }

        setDirection(1);
        setStep(1);
        setIsSubmitting(false);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <div className="min-h-[300px] flex flex-col">
            {/* Step content */}
            <div className="flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {step === 0 && (
                            <StepOne email={email} onUpdate={updateField} />
                        )}
                        {step === 1 && <ThankYou />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Trust badge + Submit */}
            {step === 0 && (
                <>
                    <div className="flex items-center gap-1.5 mt-6 text-[12px] text-[#494949] font-inter">
                        <ShieldCheck size={14} className="text-green-600 shrink-0" />
                        <span>Your data is secure and will never be shared with third parties.</span>
                    </div>

                    <div className="flex items-center justify-end mt-8 pt-4 border-t border-[#DDDDDD]">
                        <button
                            onClick={handleSubmit}
                            disabled={!emailValid || isSubmitting}
                            className={`flex items-center gap-2 bg-brand-red text-white rounded-[30px] h-[45px] px-6 text-[14px] font-semibold font-inter transition-opacity ${
                                emailValid && !isSubmitting
                                    ? "hover:opacity-90"
                                    : "opacity-40 cursor-not-allowed"
                            }`}
                        >
                            {isSubmitting ? "Submitting..." : "Join Waitlist"}
                            {!isSubmitting && <ArrowRight size={14} />}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
