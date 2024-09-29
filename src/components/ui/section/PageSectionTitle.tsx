"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const PageSectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative h-[300px] md:h-[280px] mb-16 mt-5"
    >
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="bg-img" // Replace with a descriptive alt text
        className="absolute inset-0 object-cover object-center w-full h-full rounded-md"
        layout="fill" // Adjust layout as needed (e.g., 'fill', 'responsive', 'intrinsic')
      />
      <div className="relative bg-gray-900 bg-opacity-60 h-full rounded-md">
        <div className="flex items-center justify-center h-full">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
              className="text-white text-5xl md:text-6xl font-bold text-center"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              className="text-white font-medium mt-2 text-lg lg:text-2xl text-center"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageSectionTitle;
