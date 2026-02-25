"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { StepOne } from "./steps/StepOne";
import { ThankYou } from "./steps/ThankYou";

export function SurveyForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [domainValid, setDomainValid] = useState(false);
    const [checking, setChecking] = useState(false);
    const lastChecked = useRef("");

    const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const canSubmit = emailFormatValid && domainValid && !isSubmitting && !checking;

    const updateField = useCallback((field: string, value: string) => {
        if (field === "email") {
            setEmail(value);
            if (value !== lastChecked.current) {
                setDomainValid(false);
            }
        }
    }, []);

    const checkDomain = useCallback(async (value: string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
        if (value === lastChecked.current && domainValid) return;

        setChecking(true);
        try {
            const res = await fetch("/api/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: value }),
            });
            const data = await res.json();
            lastChecked.current = value;
            setDomainValid(data.valid);
        } catch {
            setDomainValid(false);
        }
        setChecking(false);
    }, [domainValid]);

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                setIsSubmitting(false);
                return;
            }
        } catch {
            setIsSubmitting(false);
            return;
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
                            <StepOne
                                email={email}
                                onUpdate={updateField}
                                onBlur={() => checkDomain(email)}
                            />
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
                            disabled={!canSubmit}
                            className={`flex items-center gap-2 bg-brand-red text-white rounded-[30px] h-[45px] px-6 text-[14px] font-semibold font-inter transition-opacity ${
                                canSubmit
                                    ? "hover:opacity-90"
                                    : "opacity-40 cursor-not-allowed"
                            }`}
                        >
                            {isSubmitting ? "Submitting..." : checking ? "Checking..." : "Join Waitlist"}
                            {!isSubmitting && !checking && <ArrowRight size={14} />}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
