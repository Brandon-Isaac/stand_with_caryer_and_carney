import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Story } from './components/Story';
import { DonorWall } from './components/DonorWall';
import { Marquee } from './components/Marquee';
import { DonationForm } from './components/DonationForm';
import { AdminPanel } from './components/AdminPanel';
import { supabase } from './lib/supabase';

function App() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [donors, setDonors] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    // Fetch verified donations
    const { data: donorsData, error: donorsError } = await supabase
      .from('donors')
      .select('id, name, amount')
      .eq('is_verified', true);

    if (!donorsError && donorsData) {
      setDonors(donorsData.map(d => ({ id: d.id, name: d.name })));
      const directDonations = donorsData.reduce((sum, donor) => sum + Number(donor.amount), 0);
      
      // Fetch M-Changa amount from settings table
      const { data: settingsData } = await supabase
        .from('campaign_settings')
        .select('value')
        .eq('key', 'mchanga_amount')
        .single();

      const mchangaAmount = settingsData?.value ? Number(settingsData.value) : 0;
      setTotalRaised(directDonations + mchangaAmount);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20"> {/* pb-20 prevents marquee overlap */}
      <Hero />
      <Stats currentAmount={totalRaised} />
      <Story />
      <div id="donation-form">
        <DonationForm />
      </div>
      <DonorWall donors={donors} />
      
      {/* Rest of your sections (Blog, Transparency Docs) */}
      
      <Marquee />
      <AdminPanel />
    </div>
  );
}

export default App;