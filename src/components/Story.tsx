import { Heart } from 'lucide-react';
import { CaryerDonationForm } from './CaryerDonationForm';
import { CarneyDonationForm } from './CarneyDonationForm';

export const Story = () => {
  return (
    <section id="story" className="bg-gradient-to-b from-white to-coco-green/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Story Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Their <span className="text-medical-purple">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Two brothers united by love, courage, and an unbreakable bond—fighting sickle cell disease together.
          </p>
        </div>

        {/* Caryer's Story */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border-t-8 border-medical-purple">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="text-medical-purple" size={32} fill="currentColor" />
              <div>
                <h3 className="text-3xl font-black text-gray-900">Caryer Kendric Geno Okwanyo</h3>
                <p className="text-lg text-gray-600 font-bold">5 Years Old • Diagnosed at 10 Months</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Meet our brave little hero, <strong>Caryer Kendric Geno Okwanyo</strong>, son of Samwel Okwanyo and Joyce Otieno. 
                He was diagnosed with <strong>Sickle Cell Disease (SCD)</strong>, a life-threatening blood disorder at just 10 months old. 
                For the past five years, Caryer has courageously battled this condition. Despite the pain and frequent 
                hospital visits, he continues to fight with remarkable strength, faith, and hope.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Due to recurrent painful crises and frequent infections, his medical team has recommended a <strong>Bone Marrow 
                Transplant (BMT) in India</strong>, scheduled for <strong>March 2026</strong>, as a life-saving treatment. This procedure is both 
                life-saving and life-changing, offering Caryer a real chance at healing and a healthier, pain-free future.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We humbly appeal for your support to help raise <strong>KES 5 million</strong> to 
                cover medical and travel expenses. No contribution is too small, your generosity can help save a life. 
                Together, we can give Caryer the future every child deserves.
              </p>
              <p className="text-gray-700 leading-relaxed italic">
                Thank you for your continued support, kindness, love, and prayers.
              </p>
            </div>

            {/* Caryer's Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/CaryerA.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
              <img src="/CaryerB.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CaryerC.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
              <img src="/CaryerD.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
              <img src="/CaryerE.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CaryerF.png" alt="Caryer" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
            </div>
          </div>
          
          {/* Caryer's Donation Form */}
          <div id="caryer-donate">
            <CaryerDonationForm />
          </div>
        </div>

        {/* Carney's Story */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border-t-8 border-coco-blue">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="text-coco-blue" size={32} fill="currentColor" />
              <div>
                <h3 className="text-3xl font-black text-gray-900">Carney Kian Teko Okwanyo</h3>
                <p className="text-lg text-gray-600 font-bold">20 Months Old • Diagnosed at 4 Months</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Meet our brave little hero, <strong>Carney Kian Teko Okwanyo</strong>, son of Samwel Okwanyo and Joyce Otieno. 
                He was diagnosed with <strong>Sickle Cell Disease (SCD)</strong>, a life-threatening blood disorder at just 4 months old. 
                For the past 20 months, Carney has courageously battled this condition. Despite the pain and frequent 
                hospital visits, he continues to fight with remarkable strength, faith, and hope.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Due to recurrent painful crises and frequent infections, his medical team has recommended a <strong>Bone Marrow 
                Transplant (BMT) in India</strong>, scheduled for <strong>March 2026</strong>, as a life-saving treatment. This procedure is both 
                life-saving and life-changing, offering Carney a real chance at healing and a healthier, pain-free future.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We humbly appeal for your support to help raise <strong>KES 7 million</strong> to 
                cover medical and travel expenses. No contribution is too small, your generosity can help save a life. 
                Together, we can give Carney the future every child deserves.
              </p>
              <p className="text-gray-700 leading-relaxed italic">
                Thank you for your continued support, kindness, love, and prayers.
              </p>
            </div>

            {/* Carney's Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
              <img src="/CarneyB.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CarneyC.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
              <img src="/CarneyD.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
              <img src="/CarneyE.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CarneyF.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
            </div>
          </div>
          
          {/* Carney's Donation Form */}
          <div id="carney-donate">
            <CarneyDonationForm />
          </div>
        </div>

        {/* Combined Mission */}
        <div className="bg-gradient-to-r from-medical-purple to-coco-blue rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-black mb-4">Together, We Can Save Two Lives</h3>
          <p className="text-xl mb-6 leading-relaxed opacity-90">
            Both brothers are scheduled for their life-saving Bone Marrow Transplants in India. Caryer's procedure 
            is scheduled for March 2026, while Carney's will follow in March 2026. The total cost is 
            <span className="font-black text-2xl"> KES 12,000,000</span>—but with your help, we can give Caryer and 
            Carney the future they deserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold">
              Treatment in India
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold">
              March 2026
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold">
              Two Brothers, One Fight
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
