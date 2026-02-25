"use client";

interface StepOneProps {
    email: string;
    onUpdate: (field: string, value: string) => void;
}

export function StepOne({ email, onUpdate }: StepOneProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <div className="bg-black px-3 py-1.5 rounded-[30px] inline-flex items-center mb-4">
                    <span className="text-white font-bold text-[16px] tracking-[-0.8px] font-inter">StackMark</span>
                </div>
                <p className="text-[16px] text-[#494949] font-inter leading-[24px]">
                    <span className="text-brand-red font-semibold">StackMark</span> helps designers finish what they save — not just bookmark it.
                </p>
                <p className="text-[16px] text-black font-semibold font-inter leading-[24px] mt-3">
                    Join the waitlist for early access. Launching March 2026.
                </p>
            </div>

            {/* Email */}
            <div>
                <label className="text-[16px] font-semibold font-inter text-black block mb-2">
                    What&apos;s your e-mail address? <span className="text-brand-red">*</span>
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => onUpdate("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-[45px] rounded-[30px] border border-[#DDDDDD] px-5 text-[14px] font-inter text-black placeholder:text-[#BBBBBB] focus:border-brand-red focus:outline-none transition-colors"
                />
            </div>
        </div>
    );
}
