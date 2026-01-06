import { motion } from 'framer-motion';

interface StatsProps {
  currentAmount: number;
}

export const Stats = ({ currentAmount }: StatsProps) => {
  const GOAL = 12000000; // Caryer: 5M + Carney: 7M
  const percentage = Math.min((currentAmount / GOAL) * 100, 100);

  return (
    <section className="bg-coco-green/10 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl border-b-8 border-coco-green">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Raised So Far</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              KES {currentAmount.toLocaleString()}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Target</p>
            <p className="text-2xl font-bold text-gray-400">KES 12.0M</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden p-1.5 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-coco-green to-medical-purple rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="text-center p-4 rounded-2xl bg-coco-blue/10">
            <p className="text-coco-blue font-black text-2xl">{percentage.toFixed(1)}%</p>
            <p className="text-gray-600 text-sm font-medium">Goal Reached</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-coco-melon/10">
            <p className="text-coco-melon font-black text-2xl">March 2026</p>
            <p className="text-gray-600 text-sm font-medium">Both BMTs Deadline</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-medical-purple/10">
            <p className="text-medical-purple font-black text-2xl">India</p>
            <p className="text-gray-600 text-sm font-medium">Treatment Location</p>
          </div>
        </div>
      </div>
    </section>
  );
};