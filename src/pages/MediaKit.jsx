import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MediaKit = () => {
  const { toast } = useToast();

  const handleDownload = (itemName) => {
    toast({
      title: "Download initiated",
      description: `${itemName} will be available shortly.`,
    });
  };

  const mediaAssets = [
    {
      icon: FileText,
      title: 'Professional Profile (PDF)',
      description: 'Comprehensive executive profile including credentials, experience, and portfolio overview',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      icon: ImageIcon,
      title: 'Professional Headshots',
      description: 'High-resolution professional photographs for media and publication use',
      size: '8.5 MB',
      format: 'ZIP (JPG)'
    },
    {
      icon: Award,
      title: 'Credentials & Certifications',
      description: 'Documentation of professional qualifications and certifications',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      icon: Briefcase,
      title: 'Portfolio & Case Studies',
      description: 'Selected project highlights and venture profiles',
      size: '5.8 MB',
      format: 'PDF'
    }
  ];

  const biography = {
    short: "Mr. Prabhakar Dwivedi is a CEO and business leader with 20–25 years of experience across infrastructure, engineering, real estate, and technology ventures. With credentials including B.Tech Civil, M.Tech Structural, Chartered Structural Engineer, Chartered Engineer, Chartered Valuer, and MBA, he leads a diversified portfolio spanning core infrastructure (PDCE Group, BSH Infra, BSH Realty), technology solutions (Ultimate iTech, Eimager, IndianTradeMart), and strategic creative enterprises (Sristech Designers, Sristech Movies, PDSS Lab).",
    
    medium: "Mr. Prabhakar Dwivedi is a distinguished CEO and business leader with 20–25 years of comprehensive experience across infrastructure development, engineering consultancy, real estate, and technology ventures. His academic credentials include B.Tech in Civil Engineering, M.Tech in Structural Engineering, and an MBA, complemented by professional certifications as a Chartered Structural Engineer, Chartered Engineer, and Chartered Valuer.\n\nHis career has been defined by execution excellence and the successful delivery of landmark projects including World Trade Centre developments in Noida and Mumbai, IREO premium residential projects in Gurgaon, PVR multiplex installations, and numerous government and private sector collaborations.\n\nMr. Dwivedi leads a diversified portfolio of ventures spanning core infrastructure (PDCE Group, BSH Infra, BSH Realty), technology solutions (Ultimate iTech, Eimager, IndianTradeMart), and strategic creative enterprises (Sristech Designers, Sristech Movies, PDSS Lab). Each venture operates with independent execution teams under strong governance frameworks, ensuring accountability and excellence across all operations.\n\nWith a pan-India presence and teams exceeding 500 professionals, Mr. Dwivedi continues to drive innovation and growth across diverse sectors, maintaining a leadership philosophy centered on execution discipline, leveraging technology for scale and efficiency, and creating long-term sustainable value for all stakeholders.",
    
    long: "Mr. Prabhakar Dwivedi is a seasoned CEO and business leader with 20–25 years of comprehensive experience across infrastructure development, engineering consultancy, real estate, and technology ventures. His career trajectory demonstrates consistent excellence in execution, strategic vision, and the ability to build and scale organizations that deliver lasting value.\n\nAcademic & Professional Credentials:\n- B.Tech in Civil Engineering\n- M.Tech in Structural Engineering\n- Master of Business Administration (MBA)\n- Chartered Structural Engineer\n- Chartered Engineer\n- Chartered Valuer\n\nThis unique combination of technical depth and business acumen positions Mr. Dwivedi as a leader capable of bridging engineering excellence with commercial success.\n\nCareer Highlights:\nThroughout his distinguished career, Mr. Dwivedi has led the successful delivery of numerous landmark projects, including:\n- World Trade Centre developments in Noida and Mumbai\n- IREO premium residential projects in Gurgaon\n- PVR multiplex installations across multiple locations\n- DLF Express Green development\n- Sir Chotu Ram College of Engineering\n- Multiple government and private sector infrastructure collaborations\n\nPortfolio Leadership:\nMr. Dwivedi currently leads a diversified portfolio of ventures organized across three strategic verticals:\n\nCore Infrastructure & Real Estate:\n- PDCE Group: Comprehensive engineering and infrastructure solutions\n- BSH Infra: Infrastructure development and execution\n- BSH Realty: Real estate development and asset management\n\nTechnology Solutions:\n- Ultimate iTech: Enterprise technology solutions and digital transformation\n- Eimager: Advanced imaging and visualization technologies\n- IndianTradeMart: Digital commerce and B2B platform\n\nStrategic & Creative Ventures:\n- Sristech Designers: Architectural and design consultancy\n- Sristech Movies: Creative production capabilities\n- PDSS Lab: Materials testing and quality assurance\n\nLeadership Philosophy:\nMr. Dwivedi's leadership approach centers on several core principles:\n- Execution Discipline: Structured processes and rigorous project management\n- Independent Teams: Each venture operates with dedicated execution teams ensuring specialized focus and accountability\n- Governance & Trust: Transparent operations, compliance standards, and ethical business practices\n- Technology Integration: Leveraging digital tools and platforms for scale, efficiency, and governance\n- Long-Term Value: Strategic focus on sustainable growth and stakeholder value creation\n\nOrganizational Scale:\nWith a pan-India presence and teams exceeding 500 professionals, Mr. Dwivedi has built an organizational infrastructure capable of executing complex, large-scale projects while maintaining consistency in quality and governance.\n\nVision:\nTo continue building and leading organizations that combine deep domain expertise with technological innovation, delivering excellence in execution while maintaining the highest standards of governance and creating sustainable value for all stakeholders. The vision extends beyond business success to include responsible growth, ethical practices, professional development of teams, and positive contributions to the communities and industries served."
  };

  return (
    <>
      <Helmet>
        <title>Er. Prabhakar Dwivedi, Prabhakar Dwivedi Founder & CEO and leading Seven multi-disciplinary Civil Engineering, Architectural, Construction, IT & Technology Companies, tycoon, Business Leader, businessman tycoon, investor, angel investors</title>
        <meta name="description" content="Founder & CEO and leading Seven multi-disciplinary Civil Engineering, Architectural, Construction, IT & Technology Companies like 1. PD Consulting Engineers Pvt. Ltd.- Project Management Consultancy & Design Consultant, 2. BSH Infra Pvt. Ltd.- Civil, structure, finishing and interiors, MEP Work, 3. Sristech Designers and Consultants Pvt. Ltd.- Architectural Design & Environmental Study, Audit Consultant, 
4. Sristech Movies Pvt Ltd- Elevating Cinematic Excellence Album Song, Movies, 5. PDCE Sristech Testing & Research Laboratory Pvt. Ltd. - Specializes in various Testing & Research Laboratory for Construction materials and surveys services, 6. Ultimate iTech Pvt. Ltd.- Our IT & technology arm, comprising three subsidiaries:  6.a- Eimager- Employee & Employer verification platform.
 6.b- ITM Indian Trade Mart- leading online B2B marketplace and platform, serving as the pivotal link between buyers and suppliers,  6.c- Startup and Business India- Startup Mentorship, Project Management, investment & Funding, 7. BSH Reality Pvt. Ltd. - Real estate development, Builders, Property Dealer, Property Management, tycoon, Business Leader, businessman tycoon, investor, angel investors." />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Media Kit</h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Professional resources, downloadable assets, and press materials for media, partners, and collaborators
              </p>
            </motion.div>
          </div>
        </section>

        {/* Download Assets */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Downloadable Assets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional materials available for download and use
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {mediaAssets.map((asset, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#1e3a8a] rounded-xl flex items-center justify-center shrink-0">
                      <asset.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-gray-500">{asset.format}</div>
                      <div className="text-xs text-gray-400">{asset.size}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{asset.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{asset.description}</p>
                  
                  <Button
                    onClick={() => handleDownload(asset.title)}
                    className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Biography Versions */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Biography Versions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional biography in multiple lengths for different use cases
              </p>
            </motion.div>

            <div className="space-y-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Short Biography (100 words)</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(biography.short);
                      toast({ title: "Copied to clipboard" });
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed">{biography.short}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Medium Biography (250 words)</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(biography.medium);
                      toast({ title: "Copied to clipboard" });
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{biography.medium}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Long Biography (Full)</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(biography.long);
                      toast({ title: "Copied to clipboard" });
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{biography.long}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Usage Guidelines</h2>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold text-gray-900">These media resources are provided for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Press and media publications</li>
                    <li>Event and conference materials</li>
                    <li>Business partnership documentation</li>
                    <li>Professional networking platforms</li>
                    <li>Educational and industry publications</li>
                  </ul>
                  <p className="mt-6 text-sm text-gray-600">
                    For questions regarding media asset usage, commercial licensing, or custom requirements, please contact us via the contact form.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MediaKit;