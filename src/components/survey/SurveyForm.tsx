"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { ThankYou } from "./steps/ThankYou";

interface FormData {
    email: string;
    savedTutorials: string;
    barriers: string;
    wouldPay: string;
    primaryTools: string[];
    primaryToolOther: string;
}

const initialData: FormData = {
    email: "",
    savedTutorials: "",
    barriers: "",
    wouldPay: "",
    primaryTools: [],
    primaryToolOther: "",
};

export function SurveyForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = useCallback((field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const toggleTool = useCallback((tool: string) => {
        setFormData((prev) => {
            const current = prev.primaryTools;
            const updated = current.includes(tool)
                ? current.filter((t) => t !== tool)
                : [...current, tool];
            return { ...prev, primaryTools: updated };
        });
    }, []);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    const canContinue = (() => {
        if (step === 0) return emailValid && formData.savedTutorials !== "";
        if (step === 1) return formData.wouldPay !== "";
        if (step === 2) {
            if (formData.primaryTools.length === 0) return false;
            if (formData.primaryTools.includes("Other (please specify)") && formData.primaryToolOther.trim() === "") return false;
            return true;
        }
        return false;
    })();

    const goNext = () => {
        if (!canContinue) return;
        setDirection(1);
        setStep((s) => s + 1);
    };

    const goBack = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    const handleSubmit = async () => {
        if (!canContinue || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Submission error:", err);
            }
        } catch (err) {
            console.error("Network error:", err);
        }

        setDirection(1);
        setStep(3);
        setIsSubmitting(false);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <div className="min-h-[300px] flex flex-col">
            {/* Progress dots */}
            {step < 3 && (
                <div className="flex items-center gap-2 mb-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`h-[6px] rounded-full transition-all duration-300 ${
                                i === step
                                    ? "w-6 bg-brand-red"
                                    : i < step
                                      ? "w-[6px] bg-brand-red"
                                      : "w-[6px] bg-[#DDDDDD]"
                            }`}
                        />
                    ))}
                </div>
            )}

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
                                email={formData.email}
                                savedTutorials={formData.savedTutorials}
                                onUpdate={updateField}
                            />
                        )}
                        {step === 1 && (
                            <StepTwo
                                barriers={formData.barriers}
                                wouldPay={formData.wouldPay}
                                onUpdate={updateField}
                            />
                        )}
                        {step === 2 && (
                            <StepThree
                                primaryTools={formData.primaryTools}
                                primaryToolOther={formData.primaryToolOther}
                                onToggleTool={toggleTool}
                                onUpdate={updateField}
                            />
                        )}
                        {step === 3 && <ThankYou />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Trust badge on submit step */}
            {step === 2 && (
                <div className="flex items-center gap-1.5 mt-6 text-[12px] text-[#494949] font-inter">
                    <ShieldCheck size={14} className="text-green-600 shrink-0" />
                    <span>Your data is secure and will never be shared with third parties.</span>
                </div>
            )}

            {/* Navigation */}
            {step < 3 && (
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#DDDDDD]">
                    {step > 0 ? (
                        <button
                            onClick={goBack}
                            className="flex items-center gap-1.5 text-[14px] text-[#494949] font-inter hover:text-black transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    <button
                        onClick={step === 2 ? handleSubmit : goNext}
                        disabled={!canContinue || isSubmitting}
                        className={`flex items-center gap-2 bg-brand-red text-white rounded-[30px] h-[45px] px-6 text-[14px] font-semibold font-inter transition-opacity ${
                            canContinue && !isSubmitting
                                ? "hover:opacity-90"
                                : "opacity-40 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : step === 2 ? "Submit" : "Continue"}
                        {!isSubmitting && <ArrowRight size={14} />}
                    </button>
                </div>
            )}
        </div>
    );
}
