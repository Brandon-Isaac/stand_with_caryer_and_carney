import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface StatusUpdate {
  id: string;
  message: string;
  child: 'caryer' | 'carney' | 'both';
  created_at: string;
}

interface StatusWallProps {
  statusUpdates: StatusUpdate[];
}

export const StatusWall = ({ statusUpdates }: StatusWallProps) => {
  const displayUpdates = statusUpdates;

  const getChildName = (child: string) => {
    switch (child) {
      case 'caryer': return 'Caryer';
      case 'carney': return 'Carney';
      default: return 'Both';
    }
  };

  return (
    <div className="bg-medical-purple py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <h3 className="text-white font-black text-xl flex items-center gap-2 italic uppercase">
          <Activity size={24} />
          Health Updates:
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ 
            ease: "linear", 
            duration: 40, 
            repeat: Infinity 
          }}
          className="flex whitespace-nowrap gap-8 items-center"
        >
          {displayUpdates.length === 0 ? (
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-coco-green rounded-full animate-pulse" />
              <span className="text-white font-black tracking-tighter text-xl uppercase italic">
                Updates coming soon...
              </span>
            </div>
          ) : (
            displayUpdates.map((update, idx) => (
              <div 
                key={`${update.id}-${idx}`}
                className={`flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/20 shadow-lg`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-white/70 font-bold text-xs uppercase">
                    {getChildName(update.child)}
                  </span>
                  <span className="text-white font-black tracking-tight text-lg">
                    {update.message}
                  </span>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};