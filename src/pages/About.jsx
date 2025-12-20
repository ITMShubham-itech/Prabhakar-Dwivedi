import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Target, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const credentials = [
    { icon: GraduationCap, title: 'B.Tech Civil Engineering', desc: 'Foundation in engineering principles' },
    { icon: GraduationCap, title: 'M.Tech Structural Engineering', desc: 'Advanced structural expertise' },
    { icon: Award, title: 'Chartered Structural Engineer', desc: 'Professional certification' },
    { icon: Award, title: 'Chartered Engineer', desc: 'Engineering excellence recognition' },
    { icon: Award, title: 'Chartered Valuer', desc: 'Property valuation expertise' },
    { icon: Briefcase, title: 'MBA', desc: 'Business management qualification' }
  ];

  const careerHighlights = [
    {
      title: '20–25 Years of Leadership',
      description: 'Extensive experience leading complex infrastructure, engineering, and technology ventures across India.'
    },
    {
      title: 'Multi-Sector Expertise',
      description: 'Deep domain knowledge spanning infrastructure, real estate, technology, design, and materials testing.'
    },
    {
      title: 'Large-Scale Project Delivery',
      description: 'Successfully delivered major projects including World Trade Centre developments, IREO projects, PVR multiplexes, and government collaborations.'
    },
    {
      title: 'Team Building Excellence',
      description: 'Built and led teams of 500+ professionals across independent execution units with strong governance frameworks.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Execution Focus',
      description: 'Disciplined approach to project delivery with emphasis on timelines, quality, and stakeholder satisfaction.'
    },
    {
      icon: Users,
      title: 'People Development',
      description: 'Commitment to building capable teams, fostering professional growth, and creating leadership pathways.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation & Growth',
      description: 'Continuous evolution through technology adoption, process improvement, and strategic expansion.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Mr. Prabhakar Dwivedi - CEO Biography & Credentials</title>
        <meta name="description" content="Learn about Mr. Prabhakar Dwivedi's distinguished career, credentials including B.Tech, M.Tech, Chartered Engineer status, and 20–25 years of leadership experience." />
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Mr. Prabhakar Dwivedi</h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                A distinguished career spanning infrastructure, engineering, technology, and business leadership
              </p>
            </motion.div>
          </div>
        </section>

        {/* Professional Biography */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Biography</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Mr. Prabhakar Dwivedi is a seasoned CEO and business leader with 20–25 years of comprehensive experience across infrastructure development, engineering consultancy, real estate, and technology ventures. His career has been defined by execution excellence, strategic vision, and the ability to build and scale organizations that deliver consistent value.
                </p>
                <p>
                  With advanced qualifications including B.Tech in Civil Engineering, M.Tech in Structural Engineering, and an MBA, coupled with professional certifications as a Chartered Structural Engineer, Chartered Engineer, and Chartered Valuer, Mr. Dwivedi brings a unique combination of technical depth and business acumen to his leadership roles.
                </p>
                <p>
                  Throughout his career, he has led the successful delivery of landmark projects including World Trade Centre developments in Noida and Mumbai, IREO premium residential projects in Gurgaon, PVR multiplex installations, DLF Express Green, and Sir Chotu Ram College of Engineering, among numerous other government and private sector collaborations.
                </p>
                <p>
                  Mr. Dwivedi has built and oversees a portfolio of ventures spanning core infrastructure (PDCE Group, BSH Infra, BSH Realty), technology solutions (Ultimate iTech, Eimager, IndianTradeMart), and strategic creative enterprises (Sristech Designers, Sristech Movies, PDSS Lab). Each venture operates with independent execution teams under strong governance frameworks, ensuring accountability and excellence.
                </p>
                <p>
                  His leadership philosophy centers on execution discipline, leveraging technology for scale and efficiency, maintaining transparent governance, and creating long-term sustainable value for all stakeholders. With a pan-India presence and teams exceeding 500 professionals, Mr. Dwivedi continues to drive innovation and growth across diverse sectors.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Credentials & Qualifications</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional certifications and academic achievements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1e3a8a] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center mb-4">
                    <cred.icon className="h-6 w-6 text-[#1e3a8a]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cred.title}</h3>
                  <p className="text-sm text-gray-600">{cred.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Highlights */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Career Highlights</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Key achievements and milestones throughout a distinguished career
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {careerHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Philosophy & Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Philosophy</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Core values and principles that guide leadership and decision-making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                To build and lead organizations that combine deep domain expertise with technological innovation, delivering excellence in execution while maintaining the highest standards of governance and creating sustainable value for all stakeholders. Through disciplined processes, capable teams, and strategic vision, we aim to set benchmarks in infrastructure, technology, and creative ventures across India.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our commitment extends beyond business success to include responsible growth, ethical practices, professional development of our teams, and positive contributions to the communities and industries we serve.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;