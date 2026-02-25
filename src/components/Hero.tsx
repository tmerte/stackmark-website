"use client";

import Image from "next/image";
import { ArrowUpRight, Spline, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useSurvey } from "./survey/SurveyContext";

export const Hero = () => {
    const { openSurvey } = useSurvey();
    return (
        <section className="flex flex-col lg:grid lg:grid-cols-[1fr_318px] gap-3 w-full max-w-[1440px]">
            {/* Left Banner Section (Node 1:170) */}
            <div className="relative rounded-[30px] overflow-hidden h-[500px] md:h-[700px] lg:h-[876px] flex flex-col p-0">
                <Image
                    src="/Banner.png"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-75 rounded-[30px]"
                    priority
                />
                {/* Overlay Gradients (Node 1:174) */}
                <div
                    className="absolute inset-0 rounded-[30px] pointer-events-none z-0"
                    style={{
                        backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(rgba(98, 92, 92, 0.15) 0%, rgba(198, 198, 198, 0.15) 100%)"
                    }}
                />

                {/* Navigate/Logo (Node 1:178, 1:179) - Normalized alignment 74px */}
                <div className="relative z-10 pl-6 md:pl-10 lg:pl-[74px] pt-6 lg:pt-[36px]">
                    <div className="bg-white px-[14px] py-[10px] rounded-[30px] inline-flex items-center h-[36px]">
                        <span className="text-black font-bold text-[20px] lg:text-[24px] tracking-[-1.2px] font-inter leading-[36px]">StackMark</span>
                    </div>
                </div>

                {/* Headline (Node 1:177) - Axis 74px */}
                <div className="relative z-10 pl-6 md:pl-10 lg:pl-[74px] pt-12 md:pt-16 lg:pt-[111px]">
                    <h1 className="text-white text-[40px] md:text-[60px] lg:text-[86px] font-semibold leading-[44px] md:leading-[64px] lg:leading-[88px] tracking-[-1.6px] md:tracking-[-2.4px] lg:tracking-[-3.44px] font-inter">
                        Stop stacking.<br />
                        <span className="text-brand-red">+</span><br />
                        Start finishing.
                    </h1>
                </div>

                {/* Bottom Caption (Node 1:176) - Optical 74px */}
                <div className="relative z-10 mt-auto pl-6 md:pl-10 lg:pl-[74px] pb-8 lg:pb-[56px]">
                    <p className="text-white text-[16px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[28px] font-inter tracking-[0px]">
                        Built by <span className="text-brand-red">a designer</span> who had this exact problem.
                    </p>
                </div>
            </div>

            {/* Right Column (Node 1:153 + 1:151) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                {/* About Card (Node 1:153) */}
                <div className="relative w-full lg:w-[318px] h-[400px] sm:h-[350px] lg:h-[512px] bg-white rounded-[30px] overflow-hidden shadow-[0_4px_60px_rgba(0,0,0,0.05)] border border-black/5 sm:flex-1 lg:flex-none">
                    {/* H6 Title (Node 1:155) */}
                    <div className="absolute left-6 lg:left-[32px] top-6 lg:top-[36px] w-[241px]">
                        <h6 className="text-[20px] lg:text-[24px] font-semibold font-inter text-black leading-[28px] lg:leading-[32px] tracking-[-0.24px] m-0">
                            You have <span className="text-brand-red">247 saved</span><br />
                            design tutorials. You<br />
                            have watched <span className="text-brand-red">only 8.</span>
                        </h6>
                    </div>

                    {/* Labels & Icons Layer (Node 1:157) */}
                    <div className="absolute inset-0 pointer-events-none">

                        {/* 3: Blender Tag (Node 1:162) */}
                        <div className="absolute left-[9px] top-[63%] lg:top-[330px] z-20 pointer-events-auto" style={{ transform: 'rotate(-5deg)', transformOrigin: 'center' }}>
                            <div className="bg-[#eff0fa] px-[24px] h-[46px] rounded-[36px] flex items-center justify-center">
                                <span className="text-[16px] lg:text-[18px] font-normal font-inter text-black leading-[28px] whitespace-nowrap">Blender tutorial</span>
                            </div>
                        </div>

                        {/* 4: Motion Tag (Node 1:164) */}
                        <div className="absolute left-[55%] lg:left-[178px] top-[60%] lg:top-[322px] z-10 pointer-events-auto" style={{ transform: 'rotate(-30deg)', transformOrigin: 'center' }}>
                            <div className="bg-[#151515] px-[24px] h-[46px] rounded-[36px] flex items-center justify-center">
                                <span className="text-[16px] lg:text-[18px] font-normal font-inter text-white leading-[28px] whitespace-nowrap">Motion</span>
                            </div>
                        </div>

                        {/* 2: UI/UX Tag (Node 1:160) */}
                        <div className="absolute left-[35%] lg:left-[118px] top-[75%] lg:top-[398px] z-20 pointer-events-auto" style={{ transform: 'rotate(10deg)', transformOrigin: 'center' }}>
                            <div className="bg-brand-red px-[24px] h-[46px] rounded-[36px] flex items-center justify-center">
                                <span className="text-[16px] lg:text-[18px] font-normal font-inter text-white leading-[28px] whitespace-nowrap">UI/UX Design</span>
                            </div>
                        </div>

                        {/* 1: Branding Tag (Node 1:158) */}
                        <div className="absolute left-[24%] lg:left-[77px] top-[86%] lg:top-[455px] z-10 pointer-events-auto">
                            <div className="bg-[#eff0fa] px-[24px] h-[46px] rounded-[36px] flex items-center justify-center">
                                <span className="text-[16px] lg:text-[18px] font-normal font-inter text-black leading-[28px] whitespace-nowrap">Branding</span>
                            </div>
                        </div>

                        {/* Icon Bezier (Node 1:166) */}
                        <div className="absolute left-[8%] lg:left-[26px] top-[71%] lg:top-[378px] z-30 pointer-events-auto" style={{ transform: 'rotate(-30deg)', transformOrigin: 'center' }}>
                            <div className="backdrop-blur-[37.5px] bg-[#151515] border border-[#BBBBBB] size-[70px] lg:size-[95.6px] rounded-full flex items-center justify-center">
                                <Spline className="text-white" size={30} strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Icon Code (Node 1:168) */}
                        <div className="absolute right-[8%] lg:left-[258px] top-[70%] lg:top-[373px] z-30 pointer-events-auto" style={{ transform: 'rotate(5deg)', transformOrigin: 'center' }}>
                            <div className="backdrop-blur-[37.5px] bg-white border border-[#BBBBBB] size-[46px] lg:size-[56.3px] rounded-full flex items-center justify-center">
                                <Code className="text-black" size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Awards/CTA Card (Node 1:151) */}
                <motion.div
                    onClick={openSurvey}
                    whileHover={{ scale: 0.98 }}
                    className="bg-brand-red rounded-[30px] p-6 lg:p-[32px] h-[250px] sm:h-[350px] lg:h-[352px] flex flex-col relative overflow-hidden cursor-pointer sm:flex-1 lg:flex-none"
                >
                    {/* H6 Title (Node 1:182) */}
                    <div className="text-[20px] lg:text-[24px] font-semibold font-inter leading-[28px] lg:leading-[32px] text-white tracking-[-0.24px] pr-8">
                        Ready to finish what<br />
                        you started? Join<br />
                        the waitlist now!
                    </div>

                    <div className="absolute -bottom-1 -right-1 lg:-bottom-[2px] lg:-right-[2px] text-white">
                        <ArrowUpRight size={100} className="lg:hidden" strokeWidth={1.5} />
                        <ArrowUpRight size={140} className="hidden lg:block" strokeWidth={1.5} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
