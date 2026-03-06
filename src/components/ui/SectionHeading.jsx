import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ 
  eyebrow, 
  title, 
  description, 
  align = 'left',
  light = false 
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  }[align];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${alignClass}`}
    >
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${
          light ? 'text-[#F3F2ED]/60' : 'text-brand'
        }`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl lg:text-4xl font-medium tracking-tight leading-tight ${
        light ? 'text-white' : 'text-[#0a0a0a]'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${
          light ? 'text-[#F3F2ED]/80' : 'text-[#3d4646]'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}