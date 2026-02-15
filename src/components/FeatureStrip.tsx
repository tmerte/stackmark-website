import React from 'react';

const features = [
    {
        title: 'Save.',
        text: 'One-click bookmark\nfrom any webpage.\nChrome extension makes it instant.',
    },
    {
        title: 'AI Process.',
        text: 'StackMark automatically tags\nby design tool and topic.\nYou do nothing.',
    },
    {
        title: 'Get reminded.',
        text: 'Daily email: "3 tutorials\nto finish today." Picked for you\nbased on what you saved.',
    },
    {
        title: 'Complete.',
        text: 'Mark as done.\nSee your progress.\nBuild momentum. Actually learn.',
    },
];

export const FeatureStrip = () => {
    return (
        <section className="w-full max-w-[1440px] bg-brand-red rounded-[30px] mx-auto -mt-[40px] lg:-mt-[70px] pt-[80px] lg:pt-[143px] pb-8 lg:pb-[44px] px-6 md:px-10 lg:px-[74px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[25px]">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col text-white">
                        {/* Heading (Node 1:108) */}
                        <h3 className="text-[28px] lg:text-[36px] font-semibold font-inter leading-[32px] lg:leading-[40px] tracking-[-1.08px] m-0">
                            {feature.title}
                        </h3>
                        {/* Description (Node 1:109) */}
                        <div className="text-[14px] font-normal font-inter leading-[20px] mt-[14px] max-w-[213px] opacity-100">
                            {feature.text.split('\n').map((line, i) => (
                                <p key={i} className="mb-0 whitespace-nowrap">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
