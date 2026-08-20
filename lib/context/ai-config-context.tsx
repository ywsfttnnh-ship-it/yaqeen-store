"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { AIConfig } from "@/types";
import { config } from "@/lib/config";

interface AIConfigContextType {
  config: AIConfig;
  updateConfig: (cfg: AIConfig) => void;
  isEnabled: () => boolean;
}

const defaultConfig: AIConfig = {
  ...config.ai,
  enabled: true,
};

const AIConfigContext = createContext<AIConfigContextType | undefined>(undefined);

const STORAGE_KEY = "yaqeen-ai-config";

export const AIConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configState, setConfigState] = useState<AIConfig>(defaultConfig);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setConfigState({ ...defaultConfig, ...JSON.parse(stored) });
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const updateConfig = (cfg: AIConfig) => {
    setConfigState(cfg);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch {
      // storage may be unavailable
    }
  };

  const isEnabled = () => configState.enabled && configState.provider !== "none";

  return (
    <AIConfigContext.Provider value={{ config: configState, updateConfig, isEnabled }}>
      {children}
    </AIConfigContext.Provider>
  );
};

export const useAIConfig = (): AIConfigContextType => {
  const context = useContext(AIConfigContext);
  if (!context) {
    throw new Error("useAIConfig must be used within an AIConfigProvider");
  }
  return context;
};