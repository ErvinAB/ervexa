"use client";

import { MouseEvent, ReactNode } from "react";

interface ButtonWithRippleProps {
    children: ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

export default function ButtonWithRipple({
    children,
    onClick,
    href,
    className = "",
    type = "button",
    variant = "primary",
    disabled = false,
}: ButtonWithRippleProps) {
    const handleRipple = (e: MouseEvent<HTMLElement>) => {
        if (disabled) return;

        const button = e.currentTarget;
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add("ripple-effect");

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        if (onClick) onClick();
    };

    const baseClasses =
        "ripple-container inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium smooth-transition";

    const variantClasses = {
        primary:
            "bg-blue-600/80 hover:bg-blue-600 text-white shadow-[0_20px_60px_-10px_rgba(0,122,255,0.6)] hover:shadow-[0_25px_70px_-10px_rgba(0,122,255,0.8)] hover:scale-105",
        secondary:
            "border border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-500 text-zinc-200 hover:scale-105",
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    if (href) {
        return (
            <a href={disabled ? undefined : href} className={combinedClasses} onClick={handleRipple}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={combinedClasses} onClick={handleRipple} disabled={disabled}>
            {children}
        </button>
    );
}
