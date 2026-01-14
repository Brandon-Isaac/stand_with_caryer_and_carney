import { Link2 } from 'lucide-react';

export const CarneyDonationForm = () => {
  return (
    <div className="mt-8">
      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-coco-blue">Donate for Carney Teko</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-coco-blue/10 to-coco-blue/5 p-6 rounded-2xl border-2 border-coco-blue/20 hover:border-coco-blue transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-coco-blue" size={28} />
              <h4 className="font-black text-lg text-gray-900">M-Changa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 mb-3">
                <a href="https://www.mchanga.africa/fundraiser/129754" target="_blank" rel="noopener noreferrer" className="inline-block bg-coco-blue text-white hover:bg-coco-blue/80 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                  Donate via M-Changa →
                </a>
              </p>
              <p className="text-gray-600 font-bold text-base">Paybill: <span className="text-gray-900 text-xl font-black">891300</span></p>
              <p className="text-gray-600 font-bold text-base">Account Number: <span className="text-gray-900 text-xl font-black">129754</span></p>
            </div>
          </div>
          </div>

          {/* GoFundMe and GiveSendGo */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* GoFundMe */}
            <div className="bg-gradient-to-br from-coco-blue/10 to-coco-blue/5 p-6 rounded-2xl border-2 border-coco-blue/20 hover:border-coco-blue transition">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="text-coco-blue" size={28} />
                <h4 className="font-black text-lg text-gray-900">GoFundMe</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 mb-3">
                  <a href="https://www.gofundme.com/f/support-carneys-lifesaving-treatment" target="_blank" rel="noopener noreferrer" className="inline-block bg-coco-blue text-white hover:bg-coco-blue/80 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                    Donate via GoFundMe →
                  </a>
                </p>
                <p className="text-gray-500 text-xs mt-2">International donations accepted</p>
              </div>
            </div>

            {/* GiveSendGo */}
            <div className="bg-gradient-to-br from-coco-blue/10 to-coco-blue/5 p-6 rounded-2xl border-2 border-coco-blue/20 hover:border-coco-blue transition">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="text-coco-blue" size={28} />
                <h4 className="font-black text-lg text-gray-900">GiveSendGo</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 mb-3">
                  <a href="https://www.givesendgo.com/GMW9B" target="_blank" rel="noopener noreferrer" className="inline-block bg-coco-blue text-white hover:bg-coco-blue/80 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                    Donate via GiveSendGo →
                  </a>
                </p>
                <p className="text-gray-500 text-xs mt-2">Faith-based crowdfunding platform</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
