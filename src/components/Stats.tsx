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
    <section className="bg-coco-green/10 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-[2rem] shadow-xl border-b-4 sm:border-b-8 border-coco-green">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 sm:gap-0 mb-6 sm:mb-4">
          <div>
            <p className="text-gray-900 font-bold uppercase tracking-wider text-sm sm:text-base lg:text-xl">Raised So Far</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-gray-900">
              KES {currentAmount.toLocaleString()}
            </h2>
          </div>
          <div className="sm:text-right">
            <p className="text-gray-900 font-bold uppercase tracking-wider text-sm sm:text-base lg:text-xl">Target</p>
            <p className="text-2xl sm:text-3xl lg:text-[35px] font-black text-black">KES 12,000,000</p>
          </div>
        </div>

        {/* Two Progress Bars Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Caryer Progress Bar */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 mb-2">
              <h3 className="font-black text-base sm:text-lg text-medical-purple">CARYER GENO</h3>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  RAISED: KES {caryerAmount.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">TARGET: 5,000,000</p>
              </div>
            </div>
            <div className="w-full h-6 sm:h-8 bg-gray-100 rounded-full overflow-hidden p-1 sm:p-1.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${caryerPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-medical-purple to-coco-melon rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-medical-purple font-black text-lg sm:text-xl text-center mt-2">{caryerPercentage.toFixed(1)}%</p>
          </div>

          {/* Carney Progress Bar */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 mb-2">
              <h3 className="font-black text-base sm:text-lg text-coco-blue">CARNEY TEKO</h3>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  RAISED: KES {carneyAmount.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">TARGET: 7,000,000</p>
              </div>
            </div>
            <div className="w-full h-6 sm:h-8 bg-gray-100 rounded-full overflow-hidden p-1 sm:p-1.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${carneyPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-coco-green to-coco-blue rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-coco-blue font-black text-lg sm:text-xl text-center mt-2">{carneyPercentage.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-coco-blue/10">
            <p className="text-coco-blue font-black text-xl sm:text-2xl">{totalPercentage.toFixed(1)}%</p>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Goal Reached</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-coco-melon/10">
            <p className="text-coco-melon font-black text-xl sm:text-2xl">March 2026</p>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Both BMTs Deadline</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-medical-purple/10">
            <p className="text-medical-purple font-black text-xl sm:text-2xl">India</p>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Treatment Location</p>
          </div>
        </div>
      </div>
    </section>
  );
};