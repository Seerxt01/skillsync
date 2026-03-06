import { motion } from 'framer-motion';

export const GlobalLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <motion.div
      className="h-14 w-14 rounded-full border-4 border-muted border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
  </div>
);

export const ButtonSpinner = () => <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />;

export const SkeletonCard = () => <div className="card h-28 animate-pulse bg-slate-100" />;
