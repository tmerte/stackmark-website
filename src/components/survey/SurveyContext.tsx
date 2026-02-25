"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SurveyContextType {
    isOpen: boolean;
    openSurvey: () => void;
    closeSurvey: () => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SurveyContext.Provider
            value={{
                isOpen,
                openSurvey: () => setIsOpen(true),
                closeSurvey: () => setIsOpen(false),
            }}
        >
            {children}
        </SurveyContext.Provider>
    );
}

export function useSurvey() {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error("useSurvey must be used within a SurveyProvider");
    }
    return context;
}
