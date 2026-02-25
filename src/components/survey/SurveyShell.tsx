"use client";

import type { ReactNode } from "react";
import { SurveyProvider } from "./SurveyContext";
import { SurveyModal } from "./SurveyModal";

export function SurveyShell({ children }: { children: ReactNode }) {
    return (
        <SurveyProvider>
            {children}
            <SurveyModal />
        </SurveyProvider>
    );
}
