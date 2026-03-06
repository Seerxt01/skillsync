import { motion } from 'framer-motion';

const PageContainer = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="space-y-6"
  >
    {children}
  </motion.div>
);

export default PageContainer;
