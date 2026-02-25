"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSurvey } from "./SurveyContext";
import { SurveyForm } from "./SurveyForm";

export function SurveyModal() {
    const { isOpen, closeSurvey } = useSurvey();

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSurvey();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKey);
            return () => window.removeEventListener("keydown", handleKey);
        }
    }, [isOpen, closeSurvey]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSurvey}
                    />

                    {/* Panel */}
                    <motion.div
                        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white rounded-[30px] p-6 md:p-10"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeSurvey}
                            className="absolute top-5 right-5 text-[#494949] hover:text-black transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <SurveyForm />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
