import { motion } from 'framer-motion';

const StatCard = ({ label, value }) => (
  <motion.div whileHover={{ y: -4, scale: 1.01 }} className="card">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </motion.div>
);

export default StatCard;
