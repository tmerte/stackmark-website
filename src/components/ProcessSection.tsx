"use client";

import { useState } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSurvey } from "./survey/SurveyContext";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AccordionItemProps {
    number: string;
    title: string;
    content?: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem = ({ number, title, content, isOpen, onClick }: AccordionItemProps) => {
    return (
        <div className="border-t border-[#DDDDDD] w-full lg:w-[630px]">
            <button
                onClick={onClick}
                className="w-full pt-[20px] pb-[16px] flex items-start justify-between text-left group transition-colors"
            >
                <div className="flex items-start">
                    <span className={cn(
                        "text-[14px] font-semibold font-inter leading-[20px] transition-colors w-[50px] md:w-[86px] shrink-0",
                        isOpen ? "text-brand-red" : "text-gray-400"
                    )}>
                        {number}.
                    </span>
                    <span className={cn(
                        "text-[18px] md:text-[20px] font-semibold font-inter leading-[28px] tracking-[-0.4px] transition-colors",
                        isOpen ? "text-brand-red" : "text-black"
                    )}>
                        {title}
                    </span>
                </div>
                <div className={cn(
                    "transition-colors mt-1.5",
                    isOpen ? "text-brand-red" : "text-black"
                )}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-[27px] pl-[50px] md:pl-[86px] pr-4 md:pr-12 text-[#494949] text-[14px] font-normal font-inter leading-[20px]">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ProcessSection = () => {
    const { openSurvey } = useSurvey();
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    const items = [
        {
            number: "1",
            title: "The Tutorial Graveyard",
            content: "You save everything but watch nothing. Your bookmarks are where productivity goes to die. AI will help you recover them.",
        },
        {
            number: "2",
            title: "Guilt & Overwhelm",
            content: "200+ saved tutorials. Zero progress. You feel guilty every time you see them. The cycle continues unless you break it.",
        },
        {
            number: "3",
            title: "Same Problem, Different Day",
            content: "You find a new tutorial, save it, and promise to watch it 'later'. Later never comes because your system is broken.",
        },
        {
            number: "4",
            title: "The Solution",
            content: "StackMark helps you actually finish what you start with AI organization and daily nudges that keep you moving.",
        },
    ];

    return (
        <section className="bg-white rounded-[30px] overflow-hidden w-full max-w-[1440px] pb-10 lg:pb-[62px] mx-auto relative pt-10 lg:pt-[64px] flex flex-col lg:flex-row mt-3 z-10">
            {/* Heading Axis (Node 1:150) x=74.36 */}
            <div className="px-6 md:px-10 lg:pl-[74px] lg:pr-0 lg:w-[236px] shrink-0 mb-8 lg:mb-0">
                <h2 className="text-[32px] lg:text-[42px] font-semibold tracking-[-1.26px] font-inter leading-[40px] lg:leading-[60px] text-black">
                    Process
                </h2>
            </div>

            {/* Content Column */}
            <div className="px-6 md:px-10 lg:px-0 lg:ml-[446px] flex flex-col w-full lg:w-[630px] lg:shrink-0">
                <div className="text-[#494949] text-[15px] lg:text-[16px] font-normal font-inter leading-[22px] lg:leading-[24px] tracking-[-0.32px] mb-12 lg:mb-[104px] w-full lg:w-[630px] pl-[50px] md:pl-[86px]">
                    <p>StackMark helps designers complete the tutorials they save.</p>
                    <p>AI categorization. Daily reminders. Progress tracking. </p>
                    <p className="mt-6">Built by a designer who had this exact problem.</p>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col w-full lg:w-[630px]">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            number={item.number}
                            title={item.title}
                            content={item.content}
                            isOpen={openIndex === index}
                            onClick={() => {
                                if (openIndex === index) {
                                    setOpenIndex(null);
                                } else {
                                    setOpenIndex(index);
                                }
                            }}
                        />
                    ))}
                    <div className="border-t border-[#DDDDDD] w-full lg:w-[630px]" />
                </div>

                {/* Visible Button */}
                <div className="mt-10 lg:mt-[63px]">
                    <button onClick={openSurvey} className="border border-brand-red text-brand-red font-semibold py-0 px-[24px] rounded-[30px] inline-flex items-center gap-[10px] hover:bg-brand-red hover:text-white transition-all group h-[45px] text-[14px]">
                        Join the Waitlist now
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};
