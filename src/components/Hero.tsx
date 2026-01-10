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
    <section className="relative bg-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left Side: Story & Urgency */}
        <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-50 text-red-600 font-bold text-base sm:text-xl lg:text-2xl mb-4 sm:mb-6">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-600"></span>
            </span>
            URGENT MEDICAL APPEAL!
            </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-4 sm:mb-6">
            Support <span className="text-medical-purple">Caryer Geno</span> and <span className="text-coco-blue">Carney Teko</span> for Sickle Cell disease Bone Marrow Transplants in India.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Our two brave little heroes are battling sickle cell disease. <strong>Caryer Kendric Geno Okwanyo</strong>, 
            5 years old, was diagnosed at 10 months. His baby brother <strong>Carney Kian Teko Okwanyo</strong>, 
            18 months old, was diagnosed at just 4 months. Both boys need life-saving Bone 
            Marrow Transplants (BMT) in India, scheduled for March 2026. Caryer, a fan of toys
            and Cars, and little Carney are ready for their biggest match yet.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={scrollToCaryerDonate}
              className="bg-medical-purple text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Donate for Caryer Geno <Heart fill="white" size={20} />
            </button>
            <button 
              onClick={scrollToCarneyDonate}
              className="bg-coco-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Donate for Carney Teko <Heart fill="white" size={20} />
            </button>
            <button 
              onClick={scrollToStory}
              className="bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
            >
              Read Their Stories
            </button>
          </div>
        </div>

        {/* Right Side: Football Photos Grid */}
        <div className="relative mt-8 lg:mt-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <img 
                src="/CarneyA.png" 
                alt="Carney" 
                className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-48 sm:h-56 lg:h-64 object-cover border-2 sm:border-4 border-coco-green"
              />
              <img 
                src="/CaryerD.png" 
                alt="Caryer" 
                className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-32 sm:h-36 lg:h-40 object-cover"
              />
            </div>
            <div className="pt-6 sm:pt-8">
              <img 
                src="/CaryerA.png" 
                alt="Caryer" 
                className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-64 sm:h-72 lg:h-80 object-cover border-2 sm:border-4 border-coco-blue"
              />
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-coco-melon/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};