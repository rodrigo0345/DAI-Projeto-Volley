import { motion } from 'framer-motion';
import React from 'react';

export default function AnimatePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
