"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import { useSurvey } from "../SurveyContext";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

export function ThankYou() {
    const { closeSurvey } = useSurvey();

    return (
        <motion.div
            className="flex flex-col gap-4"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.h2 variants={item} className="text-[24px] font-semibold font-inter text-black">
                You&apos;re on the list!
            </motion.h2>

            <motion.div variants={item} className="text-[14px] text-[#494949] font-inter leading-[22px]">
                <p>Thanks for joining. We&apos;ll email you when StackMark launches (targeting late March 2026).</p>
                <p className="mt-3">As a thank you, here&apos;s something useful right now:</p>
            </motion.div>

            <motion.div variants={item}>
                <a
                    href="/The-Tutorial-Triage-System.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-brand-red text-white rounded-[30px] h-[40px] px-5 text-[13px] font-semibold font-inter hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                    <ArrowDownToLine size={14} className="shrink-0" />
                    Download Tutorial Triage System (free)
                </a>
                <p className="text-[12px] text-[#999999] font-inter mt-1.5">
                    Clear your bookmark guilt in 20 minutes.
                </p>
            </motion.div>

            <motion.div variants={item} className="text-[14px] text-[#494949] font-inter leading-[22px]">
                <p>In the meantime, follow the build-in-public journey:</p>
                <p className="mt-1">
                    Instagram: <a href="https://instagram.com/stackmark.io" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">@stackmark.io</a>
                </p>
                <p>
                    Twitter: <a href="https://twitter.com/stackmarkio" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">@stackmarkio</a>
                </p>
            </motion.div>

            <motion.p variants={item} className="text-[14px] text-[#494949] font-inter leading-[22px]">
                Built by a designer, for designers who are tired of tutorial hoarding.
            </motion.p>

            <motion.div variants={item} className="text-[14px] text-[#494949] font-inter leading-[22px]">
                <p>Love,</p>
                <p>— Mert, founder of StackMark</p>
            </motion.div>

            <motion.div variants={item}>
                <button
                    onClick={closeSurvey}
                    className="bg-black text-white rounded-[30px] h-[40px] px-6 text-[13px] font-semibold font-inter hover:opacity-90 transition-opacity mt-1"
                >
                    Done
                </button>
            </motion.div>
        </motion.div>
    );
}
