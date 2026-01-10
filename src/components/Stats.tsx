import { motion } from 'framer-motion';

interface StatsProps {
  caryerAmount: number;
  carneyAmount: number;
}

export const Stats = ({ caryerAmount, carneyAmount }: StatsProps) => {
  const CARYER_GOAL = 5000000; // 5M
  const CARNEY_GOAL = 7000000; // 7M
  const TOTAL_GOAL = CARYER_GOAL + CARNEY_GOAL;
  
  const currentAmount = caryerAmount + carneyAmount;
  
  const caryerPercentage = Math.min((caryerAmount / CARYER_GOAL) * 100, 100);
  const carneyPercentage = Math.min((carneyAmount / CARNEY_GOAL) * 100, 100);
  const totalPercentage = Math.min((currentAmount / TOTAL_GOAL) * 100, 100);

  return (
    <section className="bg-coco-green/10 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl border-b-8 border-coco-green">
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

        {/* Two Progress Bars Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Caryer Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-lg text-medical-purple">CARYER</h3>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-600">
                  KES {caryerAmount.toLocaleString()} / 5.0M
                </p>
              </div>
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden p-1.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${caryerPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-medical-purple to-coco-melon rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-medical-purple font-black text-xl text-center mt-2">{caryerPercentage.toFixed(1)}%</p>
          </div>

          {/* Carney Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-lg text-coco-blue">CARNEY</h3>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-600">
                  KES {carneyAmount.toLocaleString()} / 7.0M
                </p>
              </div>
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden p-1.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${carneyPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-coco-green to-coco-blue rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-coco-blue font-black text-xl text-center mt-2">{carneyPercentage.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center p-4 rounded-2xl bg-coco-blue/10">
            <p className="text-coco-blue font-black text-2xl">{totalPercentage.toFixed(1)}%</p>
            <p className="text-gray-600 text-sm font-medium">Total Goal Reached</p>
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