import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Send, Link2 } from 'lucide-react';
import { checkRateLimit, recordAttempt } from '../lib/rateLimiter';

export const CarneyDonationForm = () => {
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
          child: 'carney',
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
        <h3 className="text-2xl font-black text-center mb-6 uppercase text-coco-blue">Donate for Carney</h3>
         <div className="grid md:grid-cols-1 gap-8 mb-8">
         {/* M-Changa */}
          <div className="bg-gradient-to-br from-[#475b06]/10 to-[#475b06]/5 p-6 rounded-2xl border-2 border-[#475b06]/20 hover:border-[#475b06] transition">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="text-[#475b06]" size={28} />
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

      {/* Donation Logging Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-coco-blue">
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
            className="w-full p-5 rounded-xl bg-gray-50 border-2 border-transparent focus:border-coco-blue focus:bg-white outline-none transition font-bold text-lg disabled:opacity-50"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-coco-blue text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-lg active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT AMOUNT'} <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
