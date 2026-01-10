import { Link2 } from 'lucide-react';

export const CarneyDonationForm = () => {
  return (
    <div className="mt-8">
      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-coco-blue">Donate for Teko</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-[#475b06]/10 to-[#475b06]/5 p-6 rounded-2xl border-2 border-[#475b06]/20 hover:border-[#475b06] transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-[#475b06]" size={28} />
              <h4 className="font-black text-lg text-gray-900">M-Changa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 mb-3">
                <a href="https://www.mchanga.africa/fundraiser/129754" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#475b06] text-white hover:bg-[#364408] font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                  Donate via M-Changa →
                </a>
              </p>
              <p className="text-gray-600 font-bold text-base">Paybill: <span className="text-gray-900 text-xl font-black">891300</span></p>
              <p className="text-gray-600 font-bold text-base">Account Number: <span className="text-gray-900 text-xl font-black">129754</span></p>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};
