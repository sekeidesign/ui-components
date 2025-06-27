(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/ui-experiments/family-status-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const statuses = {
    analyzing: {
        label: "Analyzing Transaction",
        color: "bg-sky-100 text-sky-500"
    },
    success: {
        label: "Transaction Safe",
        color: "bg-green-100 text-green-500"
    },
    warning: {
        label: "Transaction Warning",
        color: "bg-red-100 text-red-500"
    }
};
const FamilyStatusButton = ()=>{
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("analyzing");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FamilyStatusButton.useEffect": ()=>{
            const cycle = {
                "FamilyStatusButton.useEffect.cycle": ()=>{
                    setTimeout({
                        "FamilyStatusButton.useEffect.cycle": ()=>{
                            setStatus("success");
                        }
                    }["FamilyStatusButton.useEffect.cycle"], 1800);
                    setTimeout({
                        "FamilyStatusButton.useEffect.cycle": ()=>{
                            setStatus("analyzing");
                        }
                    }["FamilyStatusButton.useEffect.cycle"], 3200);
                    setTimeout({
                        "FamilyStatusButton.useEffect.cycle": ()=>{
                            setStatus("warning");
                        }
                    }["FamilyStatusButton.useEffect.cycle"], 4800);
                    setTimeout({
                        "FamilyStatusButton.useEffect.cycle": ()=>{
                            setStatus("analyzing");
                            setTimeout(cycle, 0);
                        }
                    }["FamilyStatusButton.useEffect.cycle"], 6400);
                }
            }["FamilyStatusButton.useEffect.cycle"];
            cycle();
        }
    }["FamilyStatusButton.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        layout: true,
        transition: {
            duration: 0.2
        },
        className: `rounded-full font-[550] cursor-pointer text-lg flex items-center justify-center pr-6 pl-4 gap-2 py-3 overflow-hidden relative ${statuses[status].color}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "popLayout",
            initial: false,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    status: status
                }, void 0, false, {
                    fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                    lineNumber: 51,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    layoutId: status,
                    initial: {
                        opacity: 0,
                        x: -24
                    },
                    animate: {
                        opacity: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            duration: 0.9,
                            bounce: 0.3
                        }
                    },
                    exit: {
                        opacity: 0,
                        x: 24,
                        transition: {
                            type: "spring",
                            duration: 0.3,
                            bounce: 0.1
                        }
                    },
                    className: "text-nowrap",
                    children: statuses[status].label
                }, `${status}-label`, false, {
                    fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                    lineNumber: 52,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui-experiments/family-status-button.tsx",
            lineNumber: 50,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui-experiments/family-status-button.tsx",
        lineNumber: 45,
        columnNumber: 3
    }, this);
};
_s(FamilyStatusButton, "tdtvIQZVYuEBXZfCcGoZMU8yUMQ=");
_c = FamilyStatusButton;
const iconVariants = {
    initial: {
        scale: 0,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1
    },
    exit: {
        scale: 0.3,
        opacity: 0
    }
};
const Icon = ({ status })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center size-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "popLayout",
            initial: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: iconVariants,
                initial: "initial",
                animate: "animate",
                exit: "exit",
                transition: {
                    duration: 0.25
                },
                children: [
                    status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        className: "size-6",
                        role: "img",
                        "aria-label": "Success icon",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                            lineNumber: 102,
                            columnNumber: 8
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                        lineNumber: 94,
                        columnNumber: 7
                    }, this),
                    status === "analyzing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 20 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        initial: {
                            rotate: 0
                        },
                        animate: {
                            rotate: 360
                        },
                        transition: {
                            duration: 0.75,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 0.5
                        },
                        role: "img",
                        "aria-label": "Analyzing icon",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                                initial: {
                                    rotate: 0
                                },
                                animate: {
                                    rotate: 360
                                },
                                transition: {
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                d: "M10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5Z",
                                stroke: "currentColor",
                                strokeWidth: "3",
                                strokeDasharray: 0.5,
                                strokeDashoffset: 0.5,
                                strokeLinecap: "round",
                                pathLength: 0.75
                            }, void 0, false, {
                                fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                                lineNumber: 128,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5Z",
                                stroke: "currentColor",
                                opacity: 0.2,
                                strokeWidth: "3"
                            }, void 0, false, {
                                fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                                lineNumber: 140,
                                columnNumber: 8
                            }, this)
                        ]
                    }, "analyzing-icon", true, {
                        fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                        lineNumber: 110,
                        columnNumber: 7
                    }, this),
                    status === "warning" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        className: "size-6",
                        animate: {
                            x: [
                                0,
                                -4,
                                4,
                                -2,
                                2,
                                -1,
                                1,
                                0
                            ],
                            transition: {
                                duration: 0.25,
                                delay: 0.75
                            }
                        },
                        role: "img",
                        "aria-label": "Warning icon",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                            lineNumber: 164,
                            columnNumber: 8
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                        lineNumber: 149,
                        columnNumber: 7
                    }, this)
                ]
            }, status, true, {
                fileName: "[project]/app/ui-experiments/family-status-button.tsx",
                lineNumber: 85,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/ui-experiments/family-status-button.tsx",
            lineNumber: 84,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui-experiments/family-status-button.tsx",
        lineNumber: 83,
        columnNumber: 3
    }, this);
};
_c1 = Icon;
const __TURBOPACK__default__export__ = FamilyStatusButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "FamilyStatusButton");
__turbopack_context__.k.register(_c1, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/ui-kit/Experiment.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Experiment": (()=>Experiment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$tooltip$2f$tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@ark-ui/react/dist/components/tooltip/tooltip.js [app-client] (ecmascript) <export * as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$16$2f$solid$2f$esm$2f$CommandLineIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CommandLineIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/16/solid/esm/CommandLineIcon.js [app-client] (ecmascript) <export default as CommandLineIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ExperimentContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
const ExperimentRoot = ({ children, sourceUrl })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExperimentContext.Provider, {
        value: {
            sourceUrl
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 w-full",
            children: children
        }, void 0, false, {
            fileName: "[project]/app/ui-kit/Experiment.tsx",
            lineNumber: 23,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
};
_c = ExperimentRoot;
const ExperimentTitle = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: "text-xl text-gray-800 font-[500] leading-none",
        children: children
    }, void 0, false, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, this);
};
_c1 = ExperimentTitle;
const ExperimentTags = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: children
    }, void 0, false, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
};
_c2 = ExperimentTags;
const ExperimentTag = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-xs font-[450] font-mono text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg",
        children: children
    }, void 0, false, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, this);
};
_c3 = ExperimentTag;
const ExperimentExample = ({ children, scale = true })=>{
    _s();
    const { sourceUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ExperimentContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative shadow-skew size-24 flex items-center justify-center rounded-xl border border-gray-200 w-full p-10 min-h-[320px] h-fit bg-white",
        children: [
            sourceUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$tooltip$2f$tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Root, {
                positioning: {
                    placement: "top"
                },
                openDelay: 0,
                closeDelay: 0,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$tooltip$2f$tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Trigger, {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: sourceUrl,
                            target: "_blank",
                            className: "absolute top-2 right-2 bg-gray-200/60 hover:bg-gray-200 hover:text-gray-700 size-7 flex items-center justify-center rounded-md text-gray-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$16$2f$solid$2f$esm$2f$CommandLineIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CommandLineIcon$3e$__["CommandLineIcon"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/ui-kit/Experiment.tsx",
                                lineNumber: 89,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui-kit/Experiment.tsx",
                            lineNumber: 84,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ui-kit/Experiment.tsx",
                        lineNumber: 83,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$tooltip$2f$tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Positioner, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2d$ui$2f$react$2f$dist$2f$components$2f$tooltip$2f$tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Content, {
                            className: "bg-gray-900 text-gray-50 font-[450] p-2 py-1 text-xs rounded-md",
                            children: "View source code"
                        }, void 0, false, {
                            fileName: "[project]/app/ui-kit/Experiment.tsx",
                            lineNumber: 93,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ui-kit/Experiment.tsx",
                        lineNumber: 92,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ui-kit/Experiment.tsx",
                lineNumber: 78,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: scale ? "scale-90 md:scale-100" : "",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/ui-kit/Experiment.tsx",
                lineNumber: 99,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 76,
        columnNumber: 3
    }, this);
};
_s(ExperimentExample, "VHDMrd8YfVVgHC83HYeICfM+SL4=");
_c4 = ExperimentExample;
const ExperimentDescription = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm text-gray-600 font-[500] leading-none",
                children: "Learnings"
            }, void 0, false, {
                fileName: "[project]/app/ui-kit/Experiment.tsx",
                lineNumber: 112,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500 font-[420] leading-relaxed",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/ui-kit/Experiment.tsx",
                lineNumber: 115,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 111,
        columnNumber: 3
    }, this);
};
_c5 = ExperimentDescription;
const TextLink = ({ href, children, target = "_blank" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "text-blue-500 font-[500] underline hover:no-underline",
        target: target,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/ui-kit/Experiment.tsx",
        lineNumber: 131,
        columnNumber: 3
    }, this);
};
_c6 = TextLink;
const Experiment = Object.assign(ExperimentRoot, {
    Title: ExperimentTitle,
    Tags: ExperimentTags,
    Tag: ExperimentTag,
    Example: ExperimentExample,
    Description: ExperimentDescription,
    TextLink
});
_c7 = Experiment;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "ExperimentRoot");
__turbopack_context__.k.register(_c1, "ExperimentTitle");
__turbopack_context__.k.register(_c2, "ExperimentTags");
__turbopack_context__.k.register(_c3, "ExperimentTag");
__turbopack_context__.k.register(_c4, "ExperimentExample");
__turbopack_context__.k.register(_c5, "ExperimentDescription");
__turbopack_context__.k.register(_c6, "TextLink");
__turbopack_context__.k.register(_c7, "Experiment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_0c935c06._.js.map