import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VentureCard from '@/components/VentureCard';
import { db } from '@/lib/store';

// Skeleton Component
const VentureSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 h-[420px] animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
      <div className="w-16 h-6 bg-gray-200 rounded-full" />
    </div>
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-full bg-gray-200 rounded mb-6" />
    <div className="space-y-2 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-3 w-5/6 bg-gray-200 rounded" />
      ))}
    </div>
    <div className="h-16 bg-gray-100 rounded-lg mb-6" />
    <div className="grid grid-cols-2 gap-3 mt-auto">
      <div className="h-9 bg-gray-200 rounded" />
      <div className="h-9 bg-gray-200 rounded" />
    </div>
  </div>
);

/**
 * Normalize DB vertical values (CORE/TECH/STRATEGIC) -> UI tab values (CORE/TECH/STRATEGIC)
 * Also supports "ALL"
 */
const normalizeVertical = (val) => {
  const v = String(val || '').trim().toUpperCase();

  if (v === 'ALL' || v === 'EVERYTHING') return 'ALL';
  if (v === 'CORE' || v === 'CORE INFRASTRUCTURE' || v === 'INFRASTRUCTURE') return 'CORE';
  if (v === 'TECH' || v === 'TECHNOLOGY' || v === 'IT') return 'TECH';
  if (v === 'STRATEGIC' || v === 'CREATIVE') return 'STRATEGIC';

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

const GroupCompanies = () => {
  // ✅ Default to ALL
  const [activeVertical, setActiveVertical] = useState('ALL');
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const data = await db.getVentures();
        // ✅ Always store ventures as array + normalize vertical
        const venturesArray = coerceArray(data).map((v) => ({
          ...v,
          vertical: normalizeVertical(v?.vertical),
        }));
        setVentures(venturesArray);
      } catch (error) {
        console.error('Error fetching ventures:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVentures();
  }, []);

  // ✅ Group once + include ALL
  const venturesByVertical = useMemo(() => {
    const grouped = { ALL: [], CORE: [], TECH: [], STRATEGIC: [] };
    if (!Array.isArray(ventures)) return grouped;

    grouped.ALL = ventures;

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

  const verticalInfo = {
    ALL: {
      title: 'All Ventures',
      description:
        'Explore the full portfolio across Core Infrastructure, Technology, and Strategic initiatives.',
      icon: CheckCircle2,
    },
    CORE: {
      title: 'Core Infrastructure & Real Estate',
      description:
        "Engineering excellence and large-scale execution across India's critical infrastructure and real estate sectors.",
      icon: Building2,
    },
    TECH: {
      title: 'Technology & Digital Solutions',
      description:
        'Cutting-edge digital transformation, enterprise security, and platforms that drive business efficiency.',
      icon: Code2,
    },
    STRATEGIC: {
      title: 'Strategic & Creative Initiatives',
      description:
        'Specialized ventures in design, media, and validation services that complement our core ecosystem.',
      icon: Sparkles,
    },
  };

  const tabOrder = ['ALL', 'CORE', 'TECH', 'STRATEGIC'];

  return (
    <>
      <Helmet>
        <title>Portfolio Ventures | Mr. Prabhakar Dwivedi</title>
        <meta
          name="description"
          content="Explore the diverse portfolio of ventures across Core Infrastructure, Technology, and Strategic sectors led by Mr. Prabhakar Dwivedi."
        />
      </Helmet>

      <div className="pt-20 bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6">
                Our Ventures
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                A diversified ecosystem of companies built on the pillars of execution discipline,
                innovation, and long-term value creation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Tabs */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            defaultValue="ALL"
            className="w-full"
            onValueChange={(val) => setActiveVertical(normalizeVertical(val))}
          >
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white border border-gray-200 p-1 rounded-full shadow-sm">
                {tabOrder.map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="rounded-full px-8 py-2.5 text-sm font-medium transition-all
                      data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white data-[state=active]:shadow-md
                      text-gray-600 hover:text-[#1e3a8a]"
                  >
                    {key === 'ALL' ? 'All' : key.charAt(0) + key.slice(1).toLowerCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-4">
                    {React.createElement(verticalInfo[activeVertical].icon, {
                      className: 'w-6 h-6 text-[#1e3a8a]',
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {verticalInfo[activeVertical].title}
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    {verticalInfo[activeVertical].description}
                  </p>
                </div>

                {/* ✅ Render content for ALL + others */}
                {tabOrder.map((key) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {loading ? (
                        [1, 2, 3].map((i) => <VentureSkeleton key={i} />)
                      ) : getVenturesByVertical(key).length > 0 ? (
                        getVenturesByVertical(key).map((venture, idx) => (
                          <VentureCard key={venture?.id || idx} venture={venture} index={idx} />
                        ))
                      ) : (
                        <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
                          <p className="text-gray-500">No ventures currently listed in this category.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </section>
      </div>
    </>
  );
};

export default GroupCompanies;
