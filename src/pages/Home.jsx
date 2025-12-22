import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Mail, Building2, Code2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VentureCard from '@/components/VentureCard';
import { db } from '@/lib/store';

/**
 * Normalize DB vertical values (CORE/TECH/STRATEGIC) -> UI tab values (core/technology/strategic)
 * Also handles weird variants safely.
 */
const normalizeVertical = (val) => {
  const v = String(val || '').trim().toLowerCase();

  // ✅ Add "all" support
  if (v === 'all' || v === 'everything') return 'all';

  if (v === 'core' || v === 'core infrastructure' || v === 'infrastructure') return 'core';
  if (v === 'tech' || v === 'technology' || v === 'it') return 'technology';
  if (v === 'strategic' || v === 'creative') return 'strategic';

  // DB screenshot values are CORE/TECH/STRATEGIC -> after toLowerCase becomes core/tech/strategic
  if (v === 'core') return 'core';
  if (v === 'tech') return 'technology';
  if (v === 'strategic') return 'strategic';

  return v;
};

/**
 * Coerce ventures data into an array no matter what db.getVentures() returns
 */
const coerceArray = (maybe) => {
  if (Array.isArray(maybe)) return maybe;
  if (Array.isArray(maybe?.data)) return maybe.data;
  if (Array.isArray(maybe?.ventures)) return maybe.ventures;
  if (Array.isArray(maybe?.rows)) return maybe.rows;
  return [];
};

const Home = () => {
  // ✅ Default to "all"
  const [activeVertical, setActiveVertical] = useState('all');

  // Safe defaults
  const [content, setContent] = useState({ hero: {}, about: {}, principles: [] });
  const [ventures, setVentures] = useState([]);
  const [seo, setSeo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, venturesData, seoData] = await Promise.all([
          db.getContent(),
          db.getVentures(),
          db.getSEO()
        ]);

        if (contentData) setContent(contentData);

        // ✅ Always set ventures as array + normalize vertical field
        const venturesArray = coerceArray(venturesData).map((v) => ({
          ...v,
          vertical: normalizeVertical(v?.vertical),
        }));
        setVentures(venturesArray);

        if (seoData && seoData['/']) setSeo(seoData['/']);
      } catch (error) {
        console.error("Failed to load home page data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    { label: 'Years Experience', value: '20+' },
    { label: 'Team Members', value: '500+' },
    { label: 'Pan-India', value: 'Presence' },
    { label: 'Govt + Private Projects', value: '2000+' }
  ];

  const principles = (content?.principles || []).map((p, i) => ({
    ...p,
    icon: [CheckCircle2, Building2, Sparkles][i] || CheckCircle2
  }));

  const selectedProjects = [
    'World Trade Centre, Noida',
    'World Trade Centre, Mumbai',
    'IREO Projects (Gurgaon)',
    'PVR Multiplex Projects',
    'DLF Express Green, Gurgaon',
    'Sir Chotu Ram College of Engineering',
    'Major Infrastructure Development Projects',
    'Government & Private Sector Collaborations'
  ];

  // ✅ Group ventures once (faster + safer) + include "all"
  const venturesByVertical = useMemo(() => {
    const grouped = { all: [], core: [], technology: [], strategic: [] };
    if (!Array.isArray(ventures)) return grouped;

    grouped.all = ventures;

    ventures.forEach((v) => {
      const key = normalizeVertical(v?.vertical);
      if (grouped[key]) grouped[key].push(v);
    });

    return grouped;
  }, [ventures]);

  const getVenturesByVertical = (vertical) => {
    const key = normalizeVertical(vertical);
    return venturesByVertical?.[key] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seo?.title || 'Mr. Prabhakar Dwivedi - CEO Portfolio'}</title>
        <meta name="description" content={seo?.description || ''} />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:pt-14 lg:pb-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center space-x-2 bg-[#1e3a8a]/5 rounded-full px-4 py-2 mb-6">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#1e3a8a]">Founder & CEO</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  {content?.hero?.headline || 'Mr. Prabhakar Dwivedi'}
                </h1>

                <p className="text-xl lg:text-2xl text-gray-700 font-medium mb-6">
                  {content?.hero?.subheadline || 'Execution-led leadership across Infrastructure & Technology'}
                </p>

                <div className="space-y-2 mb-8">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-900">Credentials:</span> B.Tech Civil, M.Tech Structural,
                    Chartered Structural Engineer, Chartered Engineer, Chartered Valuer, MBA
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-900">Experience:</span> 20 years of leadership across
                    multiple sectors
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to={content?.hero?.ctaLink || '/contact'}>
                    <Button size="lg" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white">
                      <Mail className="mr-2 h-4 w-4" />
                      {content?.hero?.ctaText || 'Connect for Business'}
                    </Button>
                  </Link>
                  <Link to="/media-kit">
                    {/* <Button
                      size="lg"
                      variant="outline"
                      className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Profile (PDF)
                    </Button> */}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#d4af37] rounded-2xl transform rotate-3"></div>
                  <img
                    className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                    alt="Mr. Prabhakar Dwivedi - CEO professional portrait"
                    src="/CEO.png"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Credibility Strip */}
        <section className="bg-white border-y border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-sm mt-8 max-w-3xl mx-auto">
              Independent execution teams with strong governance frameworks ensure accountability and excellence across all ventures
            </p>
          </div>
        </section>

        {/* Leadership Thesis */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Leadership Philosophy</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content?.about?.leadershipThesis || 'Driving growth through strategic vision and operational excellence.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vertical Portfolio Preview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Portfolio Overview</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Diversified ventures across three strategic verticals, each with independent execution teams
              </p>
            </motion.div>

            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={(val) => setActiveVertical(normalizeVertical(val))}
            >
              {/* ✅ Now 4 buttons: All + 3 verticals */}
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto p-1 bg-gray-100">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white py-3 px-4 text-sm font-medium"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  All
                </TabsTrigger>

                <TabsTrigger
                  value="core"
                  className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white py-3 px-4 text-sm font-medium"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Core Infrastructure
                </TabsTrigger>

                <TabsTrigger
                  value="technology"
                  className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white py-3 px-4 text-sm font-medium"
                >
                  <Code2 className="mr-2 h-4 w-4" />
                  Technology
                </TabsTrigger>

                <TabsTrigger
                  value="strategic"
                  className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white py-3 px-4 text-sm font-medium"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Strategic
                </TabsTrigger>
              </TabsList>

              {/* ✅ Now render All + the 3 verticals */}
              {['all', 'core', 'technology', 'strategic'].map((v) => (
                <TabsContent key={v} value={v}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={v}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {getVenturesByVertical(v).length > 0 ? (
                        getVenturesByVertical(v).map((venture, idx) => (
                          <motion.div
                            key={venture?.id || venture?.uuid || venture?.slug || idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06, duration: 0.35 }}
                          >
                            <VentureCard venture={venture} />
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No ventures found in this category.
                          <div className="text-xs text-gray-400 mt-2">
                            Tip: If Supabase RLS is ON, ensure anon/public SELECT policy exists for ventures.
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>

            <div className="text-center mt-12">
              <Link to="/group-companies">
                <Button size="lg" variant="outline" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5">
                  View All Companies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Selected Experience */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selected Experience</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notable projects and collaborations demonstrating execution excellence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#d4af37] hover:shadow-lg transition-all duration-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#d4af37] mb-3" />
                  <p className="text-sm font-medium text-gray-900">{project}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Principles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Foundational values that guide decision-making and operations across all ventures
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {principles.length > 0 ? (
                principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 hover:border-[#1e3a8a] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center mb-6">
                      <principle.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500">Loading principles...</div>
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-xl text-white/80 mb-8">
                Interested in business collaboration or investment opportunities? Get in touch.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-gray-100">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Business Enquiry
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
