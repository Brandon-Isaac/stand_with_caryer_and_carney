import { Mail, Phone } from 'lucide-react';

export const ContactDetails = () => {
  return (
    <section className="bg-gradient-to-br from-coco-green/10 to-coco-blue/10 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl border-b-8 border-coco-green">
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-gray-900">Contact Us</h2>
        <p className="text-center text-gray-600 font-medium mb-8">
          For any questions or more information, please reach out to the family
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div className="bg-gradient-to-br from-coco-blue/10 to-coco-blue/5 p-6 rounded-2xl border-2 border-coco-blue/20 hover:border-coco-blue transition">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-coco-blue" size={28} />
              <h3 className="font-black text-lg text-gray-900">Phone</h3>
            </div>
            <a 
              href="tel:+254716228610" 
              className="text-coco-blue hover:underline font-bold text-xl"
            >
              +254 716 228 610
            </a>
          </div>

          {/* Email */}
          <div className="bg-gradient-to-br from-coco-green/10 to-coco-green/5 p-6 rounded-2xl border-2 border-coco-green/20 hover:border-coco-green transition">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-coco-green" size={28} />
              <h3 className="font-black text-lg text-gray-900">Email</h3>
            </div>
            <a 
              href="mailto:samokwanyo@gmail.com" 
              className="text-coco-green hover:underline font-bold text-xl break-all"
            >
              samokwanyo@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};