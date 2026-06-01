"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com/codemodeai" },
  { letter: "O", icon: <FaLinkedin />,  label: "LinkedIn",  href: "https://linkedin.com/company/codemodeai" },
  { letter: "N", icon: <FaEnvelope />,  label: "Email",     href: "mailto:support@codemodeai.com" },
  { letter: "T", icon: <FaTwitter />,   label: "Twitter",   href: "https://x.com/codemodeai" },
  { letter: "A", icon: <FaInstagram />, label: "DM Us",     href: "https://instagram.com/codemodeai" },
  { letter: "C", icon: <FaEnvelope />,  label: "Support",   href: "mailto:support@codemodeai.com" },
  { letter: "T", icon: <FaLinkedin />,  label: "Connect",   href: "https://linkedin.com/company/codemodeai" },
];

function FlipCard({
  item,
  index,
  isHovered,
  tooltipIndex,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  tooltipIndex: number | null;
  frontClassName?: string;
  backClassName?: string;
}) {
  return (
    <>
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-xl pointer-events-none"
          >
            {item.label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.08,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front — Letter */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-lg text-sm md:text-lg font-black text-white",
            frontClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {item.letter}
        </div>

        {/* Back — Icon */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-lg text-sm md:text-lg text-white",
            backClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
          }}
        >
          {item.icon}
        </div>
      </motion.div>
    </>
  );
}

function SocialFlipNode({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) {
  const sharedProps = {
    className: cn("relative h-8 w-8 md:h-10 md:w-10 cursor-pointer block", itemClassName),
    style: { perspective: "1000px" } as React.CSSProperties,
    onMouseEnter: () => setTooltipIndex(index),
    onMouseLeave: () => setTooltipIndex(null),
  };

  const inner = (
    <FlipCard
      item={item}
      index={index}
      isHovered={isHovered}
      tooltipIndex={tooltipIndex}
      frontClassName={frontClassName}
      backClassName={backClassName}
    />
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={sharedProps.className}
        style={sharedProps.style}
        onMouseEnter={sharedProps.onMouseEnter}
        onMouseLeave={sharedProps.onMouseLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div onClick={item.onClick} {...sharedProps}>
      {inner}
    </div>
  );
}

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div
        className="group relative flex items-center justify-center gap-1.5 md:gap-2 rounded-2xl p-2 md:p-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {/* Animated border sweep lines */}
        <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 h-[1px] w-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.7), transparent)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.7), transparent)" }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>
    </div>
  );
}
