import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  amount: number;
  mpesa_code: string;
  is_verified: boolean;
  created_at?: string;
}

export const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'mchanga' | 'verify'>('verify');
  const [mchangaAmount, setMchangaAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [unverifiedDonors, setUnverifiedDonors] = useState<Donor[]>([]);
  const [verifiedDonors, setVerifiedDonors] = useState<Donor[]>([]);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    if (isAuthenticated) {
      fetchMchangaAmount();
      fetchDonors();
    }
  }, [isAuthenticated]);

  const fetchDonors = async () => {
    console.log('Fetching donors...');
    
    // Fetch unverified donations
    const { data: unverified, error: unverifiedError } = await supabase
      .from('donors')
      .select('*')
      .eq('is_verified', false);

    // Fetch recent verified donations
    const { data: verified, error: verifiedError } = await supabase
      .from('donors')
      .select('*')
      .eq('is_verified', true)
      .limit(10);

    console.log('Unverified donors:', unverified);
    console.log('Verified donors:', verified);
    
    if (unverifiedError) console.error('Error fetching unverified:', unverifiedError);
    if (verifiedError) console.error('Error fetching verified:', verifiedError);

    if (unverified) setUnverifiedDonors(unverified);
    if (verified) setVerifiedDonors(verified);
  };

  const fetchMchangaAmount = async () => {
    const { data } = await supabase
      .from('campaign_settings')
      .select('value')
      .eq('key', 'mchanga_amount')
      .single();

    if (data) {
      setMchangaAmount(data.value);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Invalid password');
    }
  };

  const handleUpdateMchanga = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('campaign_settings')
      .upsert({ key: 'mchanga_amount', value: mchangaAmount });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('M-Changa amount updated successfully!');
    }
    setLoading(false);
  };

  const handleVerifyDonor = async (donorId: string) => {
    const { error } = await supabase
      .from('donors')
      .update({ is_verified: true })
      .eq('id', donorId);

    if (!error) {
      setMessage('Donor verified successfully!');
      fetchDonors(); // Refresh the list
    } else {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleRejectDonor = async (donorId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this donation entry?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', donorId);

    if (!error) {
      setMessage('Donation entry deleted.');
      fetchDonors();
    } else {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowLoginForm(!showLoginForm)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        >
          <Lock size={20} />
        </button>
        
        {showLoginForm && (
          <div className="absolute bottom-16 right-0 bg-white p-4 rounded-2xl shadow-2xl border-2 border-gray-200 w-64">
            <form onSubmit={handleLogin} className="space-y-3">
              <h3 className="font-bold text-sm">Admin Access</h3>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-medical-purple text-white py-2 rounded-lg text-sm font-bold"
              >
                Login
              </button>
              {message && <p className="text-red-500 text-xs">{message}</p>}
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl border-2 border-medical-purple max-w-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-6 border-b-2 border-gray-100">
        <h3 className="font-black text-lg">Admin Panel</h3>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-gray-100">
        <button
          onClick={() => setActiveTab('verify')}
          className={`flex-1 py-3 px-4 font-bold text-sm transition ${
            activeTab === 'verify'
              ? 'bg-medical-purple text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="inline mr-2" size={16} />
          Verify Donations ({unverifiedDonors.length})
        </button>
        <button
          onClick={() => setActiveTab('mchanga')}
          className={`flex-1 py-3 px-4 font-bold text-sm transition ${
            activeTab === 'mchanga'
              ? 'bg-medical-purple text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <RefreshCw className="inline mr-2" size={16} />
          M-Changa
        </button>
      </div>

      <div className="overflow-y-auto p-6 flex-1">
        {/* Verification Tab */}
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-700 text-sm uppercase">Pending Verification</h4>
              <button
                onClick={fetchDonors}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
            {unverifiedDonors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-2">No pending donations</p>
                <p className="text-xs text-gray-400">Check browser console (F12) for any errors</p>
              </div>
            ) : (
              <div className="space-y-3">
                {unverifiedDonors.map((donor) => (
                  <div key={donor.id} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-black text-gray-900">{donor.name}</p>
                        <p className="text-sm text-gray-600">
                          Amount: <span className="font-bold text-gray-900">KES {donor.amount.toLocaleString()}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          M-Pesa Code: <span className="font-bold text-gray-900">{donor.mpesa_code}</span>
                        </p>
                        {donor.created_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(donor.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyDonor(donor.id)}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg font-bold text-sm hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Verify
                      </button>
                      <button
                        onClick={() => handleRejectDonor(donor.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg font-bold text-sm hover:bg-red-600 flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h4 className="font-bold text-gray-700 text-sm uppercase mt-6">Recent Verified</h4>
            {verifiedDonors.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No verified donations yet</p>
            ) : (
              <div className="space-y-2">
                {verifiedDonors.map((donor) => (
                  <div key={donor.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{donor.name}</p>
                        <p className="text-xs text-gray-600">KES {donor.amount.toLocaleString()} • {donor.mpesa_code}</p>
                      </div>
                      <CheckCircle className="text-green-500" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* M-Changa Tab */}
        {activeTab === 'mchanga' && (
          <form onSubmit={handleUpdateMchanga} className="space-y-3">
            <div>
              <label className="text-sm font-bold text-gray-700">M-Changa Amount (KES)</label>
              <input
                type="number"
                placeholder="Enter M-Changa total"
                value={mchangaAmount}
                onChange={(e) => setMchangaAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-medical-purple text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Updating...' : 'Update Amount'}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Update this with the current M-Changa total to keep the site in sync.
            </p>
          </form>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center font-bold ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
