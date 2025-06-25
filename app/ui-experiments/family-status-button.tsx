"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const statuses = {
  analyzing: {
    label: "Analyzing Transaction",
    color: "bg-sky-100 text-sky-500",
  },
  success: {
    label: "Transaction Safe",
    color: "bg-green-100 text-green-500",
  },
  warning: {
    label: "Transaction Warning",
    color: "bg-red-100 text-red-500",
  },
} as const;

const FamilyStatusButton = () => {
  const [status, setStatus] = useState<keyof typeof statuses>("analyzing");

  const cycleStatus = () => {
    setTimeout(() => {
      setStatus("success");
    }, 1800);
    setTimeout(() => {
      setStatus("analyzing");
    }, 3200);
    setTimeout(() => {
      setStatus("warning");
    }, 4800);
    setTimeout(() => {
      setStatus("analyzing");
      setTimeout(cycleStatus, 0);
    }, 6400);
  };

  useEffect(() => {
    cycleStatus();
  }, []);

  return (
    <motion.div
      layout
      className={`rounded-full font-[550] text-lg flex items-center justify-center pr-6 pl-4 gap-2 py-3 overflow-hidden relative ${statuses[status].color}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <Icon status={status} />
        <motion.span
          layoutId={status}
          initial={{ opacity: 0, x: -24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { type: "spring", duration: 0.9, bounce: 0.3 },
          }}
          exit={{
            opacity: 0,
            x: 24,
            transition: { type: "spring", duration: 0.3, bounce: 0.1 },
          }}
          key={`${status}-label`}
          className="text-nowrap"
        >
          {statuses[status].label}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

const Icon = ({ status }: { status: keyof typeof statuses }) => {
  return (
    <div className="flex items-center justify-center size-6">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={status}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          {status === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {status === "analyzing" && (
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              key="analyzing-icon"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            >
              <motion.path
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                d="M10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={0.5}
                strokeDashoffset={0.5}
                strokeLinecap="round"
                pathLength={0.75}
              />
              <path
                d="M10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5Z"
                stroke="currentColor"
                opacity={0.2}
                strokeWidth="3"
              />
            </motion.svg>
          )}
          {status === "warning" && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              animate={{
                x: [0, -4, 4, -2, 2, 0],
                transition: {
                  duration: 0.25,
                  delay: 0.5,
                },
              }}
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FamilyStatusButton;
