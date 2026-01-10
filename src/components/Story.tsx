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
            Their <span className="text-medical-purple">Story</span>
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
                At just 10 months old, Caryer's life took an unexpected turn when he was diagnosed with sickle cell disease. 
                Despite the pain and countless hospital visits, this brave 5-year-old has never lost his infectious smile. 
                Caryer loves playing with his toy cars, watching Cars movies, and spending time with his baby brother Carney.
              </p>
              <p className="text-gray-700 leading-relaxed">
                His condition requires frequent blood transfusions and pain management, but Caryer faces each day with 
                remarkable courage. Now, he needs a Bone Marrow Transplant in India—a life-saving procedure that costs 
                <strong className="text-medical-purple"> KES 5,000,000</strong>.
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
          <CaryerDonationForm />
        </div>

        {/* Carney's Story */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border-t-8 border-coco-blue">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="text-coco-blue" size={32} fill="currentColor" />
              <div>
                <h3 className="text-3xl font-black text-gray-900">Carney Kian Teko Okwanyo</h3>
                <p className="text-lg text-gray-600 font-bold">18 Months Old • Diagnosed at 4 Months</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Little Carney's journey with sickle cell disease began even earlier—at just 4 months old. As the baby 
                brother, he looks up to Caryer with admiration and follows him everywhere. Despite his young age, Carney 
                has already endured more pain than most people face in a lifetime.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Carney's condition is more severe, requiring even more intensive care and treatment. His bright eyes 
                and precious giggles light up the room, reminding everyone why this fight is so important. His 
                life-saving Bone Marrow Transplant will cost <strong className="text-coco-blue">KES 7,000,000</strong>.
              </p>
            </div>

            {/* Carney's Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-blue/20" />
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-coco-green/20" />
              <img src="/CarneyA.png" alt="Carney" className="rounded-2xl shadow-lg w-full h-48 object-cover border-4 border-medical-purple/20" />
            </div>
          </div>
          
          {/* Carney's Donation Form */}
          <CarneyDonationForm />
        </div>

        {/* Combined Mission */}
        <div className="bg-gradient-to-r from-medical-purple to-coco-blue rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-black mb-4">Together, We Can Save Two Lives</h3>
          <p className="text-xl mb-6 leading-relaxed opacity-90">
            Both brothers are scheduled for their life-saving Bone Marrow Transplants in India in March 2026. 
            The total cost is <span className="font-black text-2xl">KES 12,000,000</span>—but with your help, 
            we can give Caryer and Carney the future they deserve.
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
