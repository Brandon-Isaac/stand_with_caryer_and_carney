import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Story } from './components/Story';
import { StatusWall } from './components/DonorWall';
import { Marquee } from './components/Marquee';
import { AdminPanel } from './components/AdminPanel';
import { supabase } from './lib/supabase';

function App() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [statusUpdates, setStatusUpdates] = useState<Array<{ id: string; message: string; child: 'caryer' | 'carney' | 'both'; created_at: string }>>([]);

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    // Fetch verified donations
    const { data: donationsData, error: donationsError } = await supabase
      .from('donations')
      .select('amount')
      .eq('is_verified', true);

    if (!donationsError && donationsData) {
      const directDonations = donationsData.reduce((sum, donation) => sum + Number(donation.amount), 0);
      
      // Fetch M-Changa amount from settings table
      const { data: settingsData } = await supabase
        .from('campaign_settings')
        .select('value')
        .eq('key', 'mchanga_amount')
        .single();

      const mchangaAmount = settingsData?.value ? Number(settingsData.value) : 0;
      setTotalRaised(directDonations + mchangaAmount);
    }

    // Fetch health status updates
    const { data: statusData, error: statusError } = await supabase
      .from('status_updates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!statusError && statusData) {
      setStatusUpdates(statusData);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20"> {/* pb-20 prevents marquee overlap */}
      <Hero />
      <Stats currentAmount={totalRaised} />
      <Story />
      <StatusWall statusUpdates={statusUpdates} />
      
      {/* Rest of your sections (Blog, Transparency Docs) */}
      
      <Marquee />
      <AdminPanel />
    </div>
  );
}

export default App;