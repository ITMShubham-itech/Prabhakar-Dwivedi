import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, ArrowLeft, CheckCircle2, Building2, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/store';

const VentureProfile = () => {
  const { ventureId } = useParams(); // This is the slug from the router
  const [venture, setVenture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenture = async () => {
      try {
        const data = await db.getVentureBySlug(ventureId);
        setVenture(data);
      } catch (error) {
        console.error("Error fetching venture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenture();
  }, [ventureId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-[#1e3a8a] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Venture Profile...</p>
      </div>
    );
  }

  if (!venture) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Venture Not Found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          The venture you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/group-companies">
          <Button className="bg-[#1e3a8a]">Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{venture.name} | Portfolio Ventures</title>
        <meta name="description" content={venture.summary} />
      </Helmet>

      <div className="pt-20 bg-white">
        {/* Header */}
        <div className="bg-[#0f172a] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/group-companies" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10"> */}
                  {venture.logo_url ? (
                    <img src={venture.logo_url} alt="Logo" className="w-16 h-16 object-contain" />
                  ) : (
                    <Building2 className="w-8 h-8 text-white" />
                  )}
                {/* </div> */}
                <span className="bg-[#d4af37] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full">
                  {venture.vertical}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {venture.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                {venture.summary}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.section 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-6 h-6 text-[#1e3a8a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Key Capabilities</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {venture.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 mr-3 shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              <div className="border-t border-gray-100 my-8"></div>

              <motion.section 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why We Excel</h2>
                <div className="bg-[#1e3a8a]/5 rounded-2xl p-8 border border-[#1e3a8a]/10">
                   <div className="space-y-4">
                      {venture.trust_points?.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                          <span className="text-lg text-[#1e3a8a] font-medium">{point}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                    Connect & Explore
                  </h3>
                  
                  <div className="space-y-4">
                    {venture.website_url ? (
                      <a 
                        href={venture.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white h-12 text-base justify-between group-hover:shadow-lg transition-all">
                          Visit Official Website
                          <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        </Button>
                      </a>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center border border-gray-100">
                        <Globe className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500 block">Website Coming Soon</span>
                      </div>
                    )}

                    <Link to="/contact" className="block">
                      <Button variant="outline" className="w-full border-gray-200 hover:border-[#d4af37] text-gray-700 hover:text-[#d4af37] h-12 text-base justify-between">
                        Contact for Enquiries
                        <Mail className="w-4 h-4 opacity-70" />
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                      This venture operates under the strategic governance of the Group, adhering to our core principles of integrity and execution excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentureProfile;