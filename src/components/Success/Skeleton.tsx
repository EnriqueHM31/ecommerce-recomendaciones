import { motion } from "framer-motion";

export default function FacturaSkeleton() {
    return (
        <motion.div
            className="animate-pulse flex flex-col gap-4 text-left h-[100dvh] w-full md:w-1/2 border border-theme-secondary p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <div className="h-30 bg-gray-200 rounded w-full "></div>

            <div className="h-7 bg-gray-200 rounded w-3/5"></div>

            <div className="h-7 bg-gray-200 rounded w-2/5 mt-3"></div>
            <div className="flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="h-7 bg-gray-200 rounded w-2/5 mt-3"></div>
            <div className="h-30 bg-gray-200 rounded w-full "></div>

            <div className="h-7 bg-gray-200 rounded w-2/5 mt-3"></div>
            <div className="h-35 bg-gray-200 rounded w-full "></div>

            <div className="h-7 bg-gray-200 rounded w-2/5 mt-3"></div>

            {/* Totales */}
            <div className="mt-6 flex flex-col gap-2 justify-center items-center">
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
        </motion.div>
    );
}
