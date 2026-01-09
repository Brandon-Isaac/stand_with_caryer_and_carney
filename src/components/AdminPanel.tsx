import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, RefreshCw, CheckCircle, XCircle, Clock, Plus, FileText } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  child: 'caryer' | 'carney';
  is_verified: boolean;
  created_at?: string;
  notes?: string;
}

interface HealthUpdate {
  id: string;
  child: 'caryer' | 'carney';
  title: string;
  description: string;
  date: string;
  created_at?: string;
}

export const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'accounts' | 'verify' | 'manual' | 'health'>('verify');
  const [mchangaCaryerAmount, setMchangaCaryerAmount] = useState('');
  const [mchangaCarneyAmount, setMchangaCarneyAmount] = useState('');
  const [ncbaAmount, setNcbaAmount] = useState('');
  const [mpesaAmount, setMpesaAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [unverifiedDonations, setUnverifiedDonations] = useState<Donation[]>([]);
  const [verifiedDonations, setVerifiedDonations] = useState<Donation[]>([]);
  const [manualAmount, setManualAmount] = useState('');
  const [manualChild, setManualChild] = useState<'caryer' | 'carney'>('caryer');
  const [healthUpdates, setHealthUpdates] = useState<HealthUpdate[]>([]);
  const [healthChild, setHealthChild] = useState<'caryer' | 'carney'>('caryer');
  const [healthTitle, setHealthTitle] = useState('');
  const [healthDescription, setHealthDescription] = useState('');
  const [healthDate, setHealthDate] = useState(new Date().toISOString().split('T')[0]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccountAmounts();
      fetchDonations();
      fetchHealthUpdates();
    }
  }, [isAuthenticated]);

  const fetchDonations = async () => {    
    // Fetch unverified donations
    const { data: unverified, error: unverifiedError } = await supabase
      .from('donations')
      .select('*')
      .eq('is_verified', false)
      .order('created_at', { ascending: false });

    // Fetch recent verified donations
    const { data: verified, error: verifiedError } = await supabase
      .from('donations')
      .select('*')
      .eq('is_verified', true)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (unverifiedError) console.error('Error fetching unverified:', unverifiedError);
    if (verifiedError) console.error('Error fetching verified:', verifiedError);

    if (unverified) setUnverifiedDonations(unverified);
    if (verified) setVerifiedDonations(verified);
  };

  const fetchHealthUpdates = async () => {
    const { data, error } = await supabase
      .from('health_updates')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching health updates:', error);
    } else if (data) {
      setHealthUpdates(data);
    }
  };

  const fetchAccountAmounts = async () => {
    // Fetch all account amounts
    const { data } = await supabase
      .from('campaign_settings')
      .select('key, value')
      .in('key', ['mchanga_caryer', 'mchanga_carney', 'ncba_total', 'mpesa_total']);

    if (data) {
      data.forEach((item) => {
        if (item.key === 'mchanga_caryer') setMchangaCaryerAmount(item.value || '0');
        if (item.key === 'mchanga_carney') setMchangaCarneyAmount(item.value || '0');
        if (item.key === 'ncba_total') setNcbaAmount(item.value || '0');
        if (item.key === 'mpesa_total') setMpesaAmount(item.value || '0');
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage('Invalid email or password');
      } else if (data.session) {
        setIsAuthenticated(true);
        setShowLoginForm(false);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setMessage('');
  };

  const handleUpdateAccounts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const updates = [
      { key: 'mchanga_caryer', value: mchangaCaryerAmount || '0' },
      { key: 'mchanga_carney', value: mchangaCarneyAmount || '0' },
      { key: 'ncba_total', value: ncbaAmount || '0' },
      { key: 'mpesa_total', value: mpesaAmount || '0' }
    ];

    const { error } = await supabase
      .from('campaign_settings')
      .upsert(updates);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Account balances updated successfully!');
    }
    setLoading(false);
  };

  const handleVerifyDonation = async (donationId: string) => {
    const { error } = await supabase
      .from('donations')
      .update({ is_verified: true })
      .eq('id', donationId);

    if (!error) {
      setMessage('Donation verified successfully!');
      fetchDonations(); // Refresh the list
    } else {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleRejectDonation = async (donationId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this donation entry?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('donations')
      .delete()
      .eq('id', donationId);

    if (!error) {
      setMessage('Donation entry deleted.');
      fetchDonations();
    } else {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleAddManualDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('donations')
      .insert([{ 
        amount: parseFloat(manualAmount),
        child: manualChild,
        is_verified: false
      }]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Manual donation added successfully!');
      setManualAmount('');
      fetchDonations();
    }
    setLoading(false);
  };

  const handleAddHealthUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('health_updates')
      .insert([{ 
        child: healthChild,
        title: healthTitle,
        description: healthDescription,
        date: healthDate
      }]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Health update added successfully!');
      setHealthTitle('');
      setHealthDescription('');
      setHealthDate(new Date().toISOString().split('T')[0]);
      fetchHealthUpdates();
    }
    setLoading(false);
  };

  const handleDeleteHealthUpdate = async (updateId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this health update?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('health_updates')
      .delete()
      .eq('id', updateId);

    if (!error) {
      setMessage('Health update deleted.');
      fetchHealthUpdates();
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
          <div className="absolute bottom-16 right-0 bg-white p-4 rounded-2xl shadow-2xl border-2 border-gray-200 w-80">
            <form onSubmit={handleLogin} className="space-y-3">
              <h3 className="font-bold text-sm">Admin Access</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-medical-purple text-white py-2 rounded-lg text-sm font-bold disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
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
          onClick={handleLogout}
          className="text-gray-400 hover:text-gray-600 font-bold text-sm"
        >
          Logout
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
          Verify ({unverifiedDonations.length})
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`flex-1 py-3 px-4 font-bold text-sm transition ${
            activeTab === 'health'
              ? 'bg-medical-purple text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText className="inline mr-2" size={16} />
          Health Updates
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-3 px-4 font-bold text-sm transition ${
            activeTab === 'manual'
              ? 'bg-medical-purple text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Plus className="inline mr-2" size={16} />
          Add Entry
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`flex-1 py-3 px-4 font-bold text-sm transition ${
            activeTab === 'accounts'
              ? 'bg-medical-purple text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <RefreshCw className="inline mr-2" size={16} />
          Accounts
        </button>
      </div>

      <div className="overflow-y-auto p-6 flex-1">
        {/* Verification Tab */}
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-700 text-sm uppercase">Pending Verification</h4>
              <button
                onClick={fetchDonations}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
            {unverifiedDonations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-2">No pending donations</p>
                <p className="text-xs text-gray-400">Check browser console (F12) for any errors</p>
              </div>
            ) : (
              <div className="space-y-3">
                {unverifiedDonations.map((donation) => (
                  <div key={donation.id} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-black text-gray-900 text-lg">KES {donation.amount.toLocaleString()}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          For: <span className="font-bold text-gray-900 uppercase">{donation.child}</span>
                        </p>
                        {donation.created_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(donation.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyDonation(donation.id)}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg font-bold text-sm hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Verify
                      </button>
                      <button
                        onClick={() => handleRejectDonation(donation.id)}
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
            {verifiedDonations.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No verified donations yet</p>
            ) : (
              <div className="space-y-2">
                {verifiedDonations.map((donation) => (
                  <div key={donation.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">KES {donation.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">For: {donation.child.toUpperCase()}</p>
                      </div>
                      <CheckCircle className="text-green-500" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Manual Entry Tab */}
        {activeTab === 'manual' && (
          <form onSubmit={handleAddManualDonation} className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800 font-bold">
                Use this when someone donated but forgot to record it in the app.
              </p>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700">Amount (KES)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                required
                min="1"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">For Child</label>
              <select
                value={manualChild}
                onChange={(e) => setManualChild(e.target.value as 'caryer' | 'carney')}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
              >
                <option value="caryer">CARYER</option>
                <option value="carney">CARNEY</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-medical-purple text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
            >
              <Plus size={16} />
              {loading ? 'Adding...' : 'Add Donation Entry'}
            </button>

            <p className="text-xs text-gray-500">
              This will create an unverified donation entry that you can then verify in the Verify tab.
            </p>
          </form>
        )}

        {/* Health Updates Tab */}
        {activeTab === 'health' && (
          <div className="space-y-4">
            <form onSubmit={handleAddHealthUpdate} className="space-y-4 mb-6 pb-6 border-b-2 border-gray-200">
              <h4 className="font-bold text-gray-700 text-sm uppercase">Add Health Update</h4>
              
              <div>
                <label className="text-sm font-bold text-gray-700">For Child</label>
                <select
                  value={healthChild}
                  onChange={(e) => setHealthChild(e.target.value as 'caryer' | 'carney')}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                >
                  <option value="caryer">CARYER</option>
                  <option value="carney">CARNEY</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Update Date</label>
                <input
                  type="date"
                  value={healthDate}
                  onChange={(e) => setHealthDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Surgery completed successfully"
                  value={healthTitle}
                  onChange={(e) => setHealthTitle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea
                  placeholder="Provide details about the health update..."
                  value={healthDescription}
                  onChange={(e) => setHealthDescription(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold min-h-[100px]"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-medical-purple text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
              >
                <Plus size={16} />
                {loading ? 'Adding...' : 'Add Health Update'}
              </button>
            </form>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-700 text-sm uppercase">All Health Updates</h4>
                <button
                  onClick={fetchHealthUpdates}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
              
              {healthUpdates.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No health updates yet</p>
              ) : (
                <div className="space-y-3">
                  {healthUpdates.map((update) => (
                    <div key={update.id} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-xs text-blue-600 font-bold uppercase mb-1">{update.child}</p>
                          <p className="font-bold text-gray-900 text-base mb-1">{update.title}</p>
                          <p className="text-sm text-gray-600">{update.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs text-gray-500">
                          {new Date(update.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <button
                          onClick={() => handleDeleteHealthUpdate(update.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-lg font-bold text-xs hover:bg-red-600 flex items-center gap-1"
                        >
                          <XCircle size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accounts Tab */}
        {activeTab === 'accounts' && (
          <form onSubmit={handleUpdateAccounts} className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-blue-800 font-bold">
                Enter the current balance in each account. The total will be automatically calculated and displayed.
              </p>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">M-Changa - Caryer (KES)</label>
              <input
                type="number"
                placeholder="0"
                value={mchangaCaryerAmount}
                onChange={(e) => setMchangaCaryerAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">M-Changa - Carney (KES)</label>
              <input
                type="number"
                placeholder="0"
                value={mchangaCarneyAmount}
                onChange={(e) => setMchangaCarneyAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">NCBA Bank Total (KES)</label>
              <input
                type="number"
                placeholder="0"
                value={ncbaAmount}
                onChange={(e) => setNcbaAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">M-Pesa Paybill Total (KES)</label>
              <input
                type="number"
                placeholder="0"
                value={mpesaAmount}
                onChange={(e) => setMpesaAmount(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg mt-1 font-bold"
                min="0"
              />
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-600">Total (All Accounts)</p>
              <p className="text-2xl font-black text-gray-900">
                KES {(
                  (parseFloat(mchangaCaryerAmount) || 0) +
                  (parseFloat(mchangaCarneyAmount) || 0) +
                  (parseFloat(ncbaAmount) || 0) +
                  (parseFloat(mpesaAmount) || 0)
                ).toLocaleString()}
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-medical-purple text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Updating...' : 'Update Account Balances'}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Update these amounts with the current balance in each account. Check your bank/M-Pesa statements regularly.
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
