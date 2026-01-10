import { Heart } from 'lucide-react';

export const Hero = () => {
  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCaryerDonate = () => {
    document.getElementById('caryer-donate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCarneyDonate = () => {
    document.getElementById('carney-donate')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white pt-16 pb-8 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Story & Urgency */}
        <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-2xl mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            URGENT MEDICAL APPEAL!
            </div>
          <h1 className="text-5xl lg:text-4xl font-black text-gray-900 leading-tight mb-6">
            Support <span className="text-medical-purple">Caryer Geno</span> and <span className="text-coco-blue">Carney Teko</span> for Sickle Cell disease Bone Marrow Transplants in India.
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our two brave little heroes are battling sickle cell disease. <strong>Caryer Kendric Geno Okwanyo</strong>, 
            5 years old, was diagnosed at 10 months. His baby brother <strong>Carney Kian Teko Okwanyo</strong>, 
            18 months old, was diagnosed at just 4 months. Both boys need life-saving Bone 
            Marrow Transplants (BMT) in India, scheduled for March 2026. Caryer, a fan of toys
            and Cars, and little Carney are ready for their biggest match yet.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToCaryerDonate}
              className="bg-medical-purple text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Donate for Caryer Geno <Heart fill="white" size={20} />
            </button>
            <button 
              onClick={scrollToCarneyDonate}
              className="bg-coco-blue text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Donate for Carney Teko <Heart fill="white" size={20} />
            </button>
            <button 
              onClick={scrollToStory}
              className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-700 transition-colors"
            >
              Read Their Stories
            </button>
          </div>
        </div>

        {/* Right Side: Football Photos Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/CarneyA.png" 
                alt="Carney" 
                className="rounded-3xl shadow-xl w-full h-64 object-cover border-4 border-coco-green"
              />
              <img 
                src="/CaryerD.png" 
                alt="Caryer" 
                className="rounded-3xl shadow-xl w-full h-40 object-cover"
              />
            </div>
            <div className="pt-8">
              <img 
                src="/CaryerA.png" 
                alt="Caryer" 
                className="rounded-3xl shadow-xl w-full h-80 object-cover border-4 border-coco-blue"
              />
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coco-melon/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};