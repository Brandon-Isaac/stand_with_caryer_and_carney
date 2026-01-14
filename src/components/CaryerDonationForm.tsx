import { Smartphone, Building2, Link2} from 'lucide-react';

export const CaryerDonationForm = () => {
  return (
    <div className="mt-8">
      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-medical-purple">Donate for Caryer Geno</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-[#475b06]/10 to-[#475b06]/5 p-6 rounded-2xl border-2 border-[#475b06]/20 hover:border-[#475b06] transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-[#475b06]" size={28} />
              <h4 className="font-black text-lg text-gray-900">M-Changa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 mb-3">
                <a href="https://www.mchanga.africa/fundraiser/129674" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#475b06] text-white hover:bg-[#364408] font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                  Donate via M-Changa →
                </a>
              </p>
              <p className="text-gray-600 font-bold text-base">Paybill: <span className="text-gray-900 text-xl font-black">891300</span></p>
              <p className="text-gray-600 font-bold text-base">Account Number: <span className="text-gray-900 text-xl font-black">129674</span></p>
            </div>
          </div>
          </div>

           {/* GoFundMe and GiveSendGo */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* GoFundMe */}
            <div className="bg-gradient-to-br from-medical-purple/10 to-medical-purple/5 p-6 rounded-2xl border-2 border-medical-purple/20 hover:border-medical-purple transition">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="text-medical-purple" size={28} />
                <h4 className="font-black text-lg text-gray-900">GoFundMe</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 mb-3">
                  <a href="https://www.gofundme.com/f/help-caryer-get-lifesaving-treatment" target="_blank" rel="noopener noreferrer" className="inline-block bg-medical-purple text-white hover:bg-medical-purple/80 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                    Donate via GoFundMe →
                  </a>
                </p>
                <p className="text-gray-500 text-xs mt-2">International donations accepted</p>
              </div>
            </div>

            {/* GiveSendGo */}
            <div className="bg-gradient-to-br from-medical-purple/10 to-medical-purple/5 p-6 rounded-2xl border-2 border-medical-purple/20 hover:border-medical-purple transition">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="text-medical-purple" size={28} />
                <h4 className="font-black text-lg text-gray-900">GiveSendGo</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 mb-3">
                  <a href="https://www.givesendgo.com/GMW98" target="_blank" rel="noopener noreferrer" className="inline-block bg-medical-purple text-white hover:bg-medical-purple/80 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg">
                    Donate via GiveSendGo →
                  </a>
                </p>
                <p className="text-gray-500 text-xs mt-2">Faith-based crowdfunding platform</p>
              </div>
            </div>
          </div>

           <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Safaricom Paybill */}
          <div className="bg-gradient-to-br from-medical-purple/10 to-medical-purple/5 p-6 rounded-2xl border-2 border-medical-purple/20 hover:border-medical-purple transition">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="text-medical-purple" size={28} />
              <h4 className="font-black text-lg text-gray-900">Safaricom M-Pesa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 font-bold text-base">Paybill: <span className="text-gray-900 text-xl font-black">4813619</span></p>
              <p className="text-gray-600 font-bold text-base">Account Number: <span className="text-gray-900 text-xl font-black">Your Name</span></p>
              <p className="text-gray-500 text-xs mt-2">Account Name: Caryer Kendric Geno Medical Fund</p>
            </div>
          </div>

          {/* NCBA Paybill */}
          <div className="bg-gradient-to-br from-medical-purple/10 to-medical-purple/5 p-6 rounded-2xl border-2 border-medical-purple/20 hover:border-medical-purple transition">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-medical-purple" size={28} />
              <h4 className="font-black text-lg text-gray-900">NCBA Bank</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 font-bold text-base">Paybill: <span className="text-gray-900 text-xl font-black">880100</span></p>
              <p className="text-gray-600 font-bold text-base">Account Number: <span className="text-gray-900 text-xl font-black">885533</span></p>
              <p className="text-gray-500 text-xs mt-2">Account Name: Caryer Kendric Geno Medical Fund</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
