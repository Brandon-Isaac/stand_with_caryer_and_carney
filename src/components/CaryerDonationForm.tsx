import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Send, Smartphone, Building2, Link2} from 'lucide-react';
import { checkRateLimit, recordAttempt } from '../lib/rateLimiter';

export const CaryerDonationForm = () => {
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Check rate limit
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setError(`Too many donation submissions. Please wait ${rateLimitCheck.timeRemaining} minutes before trying again.`);
      return;
    }
    
    setLoading(true);
    
    try {
      // Submit donation amount for admin verification
      const { error: supabaseError } = await supabase
        .from('donations')
        .insert([{ 
          amount: parseFloat(amount),
          child: 'caryer',
          is_verified: false
        }]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(supabaseError.message);
      } else {
        recordAttempt();
        setSubmitted(true);
        setAmount('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-coco-green/20 p-8 rounded-3xl text-center border-2 border-coco-green animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="mx-auto text-coco-green mb-4" size={48} />
        <h3 className="text-2xl font-black text-gray-900">ASANTE SANA!</h3>
        <p className="text-gray-600 font-medium">Your donation has been recorded. Thank you for your generosity!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-medical-purple">Donate for Caryer</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-[#475b06]/10 to-[#475b06]/5 p-6 rounded-2xl border-2 border-[#475b06]/20 hover:border-[#475b06] transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-[#475b06]" size={28} />
              <h4 className="font-black text-lg text-gray-900">M-Changa</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <a href="https://www.mchanga.africa/fundraiser/129674" target="_blank" rel="noopener noreferrer" className="text-[#475b06] hover:text-[#364408] hover:underline font-bold break-all transition-colors">
                  mchanga.africa/fundraiser/129674
                </a>
              </p>
              <p className="text-gray-600 font-bold">Paybill: <span className="text-gray-900">891300</span></p>
              <p className="text-gray-600 font-bold">Account: <span className="text-gray-900">129674</span></p>
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
              <p className="text-gray-600 font-bold">Paybill: <span className="text-gray-900">4813619</span></p>
              <p className="text-gray-600 font-bold">Account: <span className="text-gray-900">Your Name</span></p>
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
              <p className="text-gray-600 font-bold">Paybill: <span className="text-gray-900">880100</span></p>
              <p className="text-gray-600 font-bold">Account: <span className="text-gray-900">885533</span></p>
              <p className="text-gray-500 text-xs mt-2">Account Name: Caryer Kendric Geno Medical Fund</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Logging Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-medical-purple">
        <h4 className="text-2xl font-black text-center mb-2 uppercase italic text-gray-800">Record Your Contribution</h4>
        <p className="text-center text-gray-500 text-sm mb-6 font-bold">Help us track our progress by entering your donation amount</p>
        
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-4 text-center">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="number" 
            placeholder="AMOUNT (KES)"
            required
            min="1"
            disabled={loading}
            value={amount}
            className="w-full p-5 rounded-xl bg-gray-50 border-2 border-transparent focus:border-medical-purple focus:bg-white outline-none transition font-bold text-lg disabled:opacity-50"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-medical-purple text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-lg active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT AMOUNT'} <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
