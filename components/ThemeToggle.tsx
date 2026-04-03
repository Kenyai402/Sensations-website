"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before mount: render a visible placeholder assuming light mode (your default).
  // This means the button is always in the DOM — no invisible gap in the navbar.
  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-soft-lavender rounded-full"
    >
      {/* Track */}
      <div
        className="w-14 h-7 rounded-full border-2 relative transition-all duration-300"
        style={{
          background: isDark
            ? "linear-gradient(135deg, oklch(0.19 0.06 285), oklch(0.18 0.04 285))"
            : "linear-gradient(135deg, oklch(0.93 0.04 285), oklch(0.88 0.06 285))",
          borderColor: isDark
            ? "oklch(0.55 0.18 281)"
            : "oklch(0.53 0.24 281)",
          boxShadow: isDark
            ? "inset 0 1px 4px rgba(0,0,0,0.4)"
            : "inset 0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {/* Thumb */}
        <div
          className="absolute top-0.5 flex items-center justify-center w-5 h-5 rounded-full"
          style={{
            left: isDark ? "calc(100% - 22px)" : "2px",
            transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease",
            background: isDark
              ? "linear-gradient(135deg, oklch(0.72 0.18 281), oklch(0.60 0.22 281))"
              : "linear-gradient(135deg, oklch(0.62 0.14 290), oklch(0.52 0.20 281))",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            color: "white",
          }}
        >
          {isDark ? (
            <Moon size={11} strokeWidth={2.5} />
          ) : (
            <Sun size={11} strokeWidth={2.5} />
          )}
        </div>
      </div>
    </button>
  );
}
