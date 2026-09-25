"use client";

import { useState } from "react";
import { Copy, Check, Smartphone } from "lucide-react";

// Set these in .env.local (and in Vercel's Project Settings → Environment
// Variables for production):
// NEXT_PUBLIC_MPESA_TILL_NUMBER=123456
// NEXT_PUBLIC_MPESA_TILL_NAME=The Sensations
const TILL_NUMBER = process.env.NEXT_PUBLIC_MPESA_TILL_NUMBER ?? "";
const TILL_NAME = process.env.NEXT_PUBLIC_MPESA_TILL_NAME ?? "The Sensations";

const STEPS = [
  { label: "Go to M-PESA on your phone" },
  { label: "Select Lipa na M-Pesa → Buy Goods and Services" },
  { label: `Enter till number ${TILL_NUMBER || "—"}` },
  { label: "Enter the amount you'd like to give and confirm with your PIN" },
];

export default function PayManually() {
  const [copied, setCopied] = useState(false);

  async function copyTillNumber() {
    if (!TILL_NUMBER) return;
    try {
      await navigator.clipboard.writeText(TILL_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in some browsers/contexts; the number
      // is already visible on the page either way.
    }
  }

  return (
    <section
      id="donate"
      className="py-32 px-6 lg:px-8 bg-gradient-to-br from-violet-50/30 via-white to-teal-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-teal-950/20"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
          Support The Work
        </p>
        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
          Fuel a Session, Fund a Story
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Every donation goes directly toward instruments, materials and free
          sessions for young people across Kariobangi. Give in seconds with
          Lipa na M-Pesa.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700 shadow-xl">
        {!TILL_NUMBER ? (
          <p className="text-sm text-center text-fuchsia-600 dark:text-fuchsia-400">
            Till number not configured yet — set NEXT_PUBLIC_MPESA_TILL_NUMBER
            in your environment.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 bg-gradient-to-br from-violet-50 to-teal-50 dark:from-violet-950/40 dark:to-teal-950/40 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shrink-0">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Till Number
                  </p>
                  <p className="text-2xl font-heading font-bold tracking-wide text-gray-900 dark:text-white">
                    {TILL_NUMBER}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {TILL_NAME}
                  </p>
                </div>
              </div>
              <button
                onClick={copyTillNumber}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-300 dark:border-violet-700 rounded-full px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>
            </div>

            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 pt-0.5">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-8 text-center">
              You'll receive an M-Pesa confirmation SMS immediately after
              paying.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
