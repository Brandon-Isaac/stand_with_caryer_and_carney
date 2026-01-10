import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Story } from './components/Story';
import { ContactDetails } from './components/DonorWall';
import { Marquee } from './components/Marquee';
import { AdminPanel } from './components/AdminPanel';
import { supabase } from './lib/supabase';

function App() {
  const [caryerAmount, setCaryerAmount] = useState(0);
  const [carneyAmount, setCarneyAmount] = useState(0);

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    // Fetch all account amounts from settings
    const { data: accountsData } = await supabase
      .from('campaign_settings')
      .select('key, value')
      .in('key', ['mchanga_caryer', 'mchanga_carney', 'ncba_total', 'mpesa_total']);

    let caryer = 0;
    let carney = 0;
    
    if (accountsData) {
      accountsData.forEach((item) => {
        const amount = Number(item.value) || 0;
        
        if (item.key === 'mchanga_carney') {
          // Carney's amount comes only from his M-Changa
          carney += amount;
        } else if (['mchanga_caryer', 'ncba_total', 'mpesa_total'].includes(item.key)) {
          // Caryer's amount comes from his M-Changa, NCBA, and M-Pesa
          caryer += amount;
        }
      });
    }

    setCaryerAmount(caryer);
    setCarneyAmount(carney);
  };

  return (
    <div className="min-h-screen bg-white pb-20"> {/* pb-20 prevents marquee overlap */}
      <Hero />
      <Stats caryerAmount={caryerAmount} carneyAmount={carneyAmount} />
      <Story />
      <ContactDetails />
      
      {/* Rest of your sections (Blog, Transparency Docs) */}
      
      <Marquee />
      <AdminPanel />
    </div>
  );
}

export default App;