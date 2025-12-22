import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VentureCard = ({ venture, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2 } 
      }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100"> */}
            {venture.logo_url ? (
              <img src={venture.logo_url} alt={venture.name} className="w-14 h-14 object-contain" />
            ) : (
              <Building2 className="w-6 h-6 text-[#1e3a8a]/40" />
            )}
          {/* </div> */}
          <span className="text-[10px] font-bold tracking-wider text-[#1e3a8a] bg-[#1e3a8a]/5 px-2 py-1 rounded-full uppercase">
            {venture.vertical}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-[#0f172a] mb-2 group-hover:text-[#1e3a8a] transition-colors">
          {venture.name}
        </h3>
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">
          {venture.summary}
        </p>

        {/* Features List */}
        <div className="mb-6 flex-1">
          <div className="space-y-2">
            {venture.features && venture.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Points */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 mb-6 border border-gray-100/50">
          <div className="space-y-1.5">
            {venture.trust_points && venture.trust_points.slice(0, 2).map((point, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle2 className="h-3 w-3 text-[#d4af37]" />
                <span className="text-xs font-medium text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link to={`/ventures/${venture.slug}`} className="w-full">
            <Button className="w-full text-xs bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white h-9">
              View Details
            </Button>
          </Link>
          
          {venture.website_url ? (
            <a href={venture.website_url} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full text-xs border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/5 hover:text-[#b49020] h-9">
                Visit Website
                <ExternalLink className="ml-1.5 h-3 w-3" />
              </Button>
            </a>
          ) : (
             <Button variant="outline" disabled className="w-full text-xs border-gray-200 text-gray-400 h-9 bg-gray-50/50">
               Coming Soon
             </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VentureCard;