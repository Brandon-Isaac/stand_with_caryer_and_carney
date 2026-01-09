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

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    // Fetch all account amounts from settings
    const { data: accountsData } = await supabase
      .from('campaign_settings')
      .select('key, value')
      .in('key', ['mchanga_caryer', 'mchanga_carney', 'ncba_total', 'mpesa_total']);

    let total = 0;
    if (accountsData) {
      accountsData.forEach((item) => {
        total += Number(item.value) || 0;
      });
    }

    setTotalRaised(total);
  };

  return (
    <div className="min-h-screen bg-white pb-20"> {/* pb-20 prevents marquee overlap */}
      <Hero />
      <Stats currentAmount={totalRaised} />
      <Story />
      <StatusWall />
      
      {/* Rest of your sections (Blog, Transparency Docs) */}
      
      <Marquee />
      <AdminPanel />
    </div>
  );
}

export default App;