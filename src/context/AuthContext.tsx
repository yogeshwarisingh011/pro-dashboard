"use client";
import React, { createContext, useState } from "react";

// 1. Interface mein dono jagah "| null" hona chahiye
interface AuthContextType {
  user: { name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 2. State mein bhi "<{ name: string } | null>" likhna zaroori hai
  const [user, setUser] = useState<{ name: string } | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
