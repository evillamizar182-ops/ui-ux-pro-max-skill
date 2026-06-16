"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  magnetic = false,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseClasses =
    "relative inline-flex items-center justify-center min-h-[44px] px-8 py-3 text-btn overflow-hidden transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2";

  const variants = {
    primary:
      "border border-esmeralda text-esmeralda hover:text-blanco group",
    ghost:
      "border border-gris-piedra text-negro-tinta hover:border-esmeralda hover:text-esmeralda",
  };

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
  };

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-esmeralda origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </button>
  );
}
