import React from 'react';
import { Link2 } from 'lucide-react';

export const CarneyDonationForm = () => {
  return (
    <div className="mt-8">
      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-coco-blue">Donate for Carney</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-coco-green/10 to-coco-green/5 p-6 rounded-2xl border-2 border-coco-green/20 hover:border-coco-green transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-coco-green" size={28} />
              <h4 className="font-black text-lg text-gray-900">M-Changa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <a href="#" className="text-gray-400 font-bold break-all cursor-not-allowed">
                  Link will be added soon
                </a>
              </p>
              <p className="text-gray-600 font-bold">Paybill: <span className="text-gray-900">Coming Soon</span></p>
              <p className="text-gray-600 font-bold">Account: <span className="text-gray-900">Coming Soon</span></p>
            </div>
          </div>
          </div>
      </div>

      {/* Info Box */}
      <div className="bg-coco-blue/10 border-2 border-coco-blue/30 rounded-xl p-6 text-center">
        <p className="text-gray-700 font-bold">
          M-Changa link for Carney will be available soon. 
          <br />
          <span className="text-coco-blue">Check back shortly!</span>
        </p>
      </div>
    </div>
  );
};
