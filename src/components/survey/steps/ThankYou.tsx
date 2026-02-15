"use client";

import { motion } from "framer-motion";
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
            className="flex flex-col gap-5"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.h2 variants={item} className="text-[24px] font-semibold font-inter text-black">
                You&apos;re on the list!
            </motion.h2>

            <motion.p variants={item} className="text-[16px] text-[#494949] font-inter leading-[24px]">
                Thanks for joining the waitlist. We&apos;ll email you when StackMark launches (targeting late March 2026).
            </motion.p>

            <motion.div variants={item} className="text-[16px] text-[#494949] font-inter leading-[24px]">
                <p>In the meantime, follow the build-in-public journey:</p>
                <p className="mt-1">
                    Instagram: <a href="https://instagram.com/stackmark.io" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">@stackmark.io</a>
                </p>
                <p>
                    Twitter: <a href="https://twitter.com/stackmarkio" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">@stackmarkio</a>
                </p>
            </motion.div>

            <motion.p variants={item} className="text-[16px] text-[#494949] font-inter leading-[24px]">
                Built by a designer, for designers who are tired of tutorial hoarding.
            </motion.p>

            <motion.div variants={item} className="text-[16px] text-[#494949] font-inter leading-[24px]">
                <p>Love,</p>
                <p>— Mert and the StackMark Team.</p>
            </motion.div>

            <motion.div variants={item}>
                <button
                    onClick={closeSurvey}
                    className="bg-brand-red text-white rounded-[30px] h-[45px] px-6 text-[14px] font-semibold font-inter hover:opacity-90 transition-opacity mt-2"
                >
                    Done
                </button>
            </motion.div>
        </motion.div>
    );
}
