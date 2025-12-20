import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const ContentSection = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
    <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const Content = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await db.getContent();
        setContent(data);
      } catch (error) {
        toast({ title: 'Error loading content', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [toast]);

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      // Save each section's fields
      const promises = [];
      
      // Hero
      Object.entries(content.hero || {}).forEach(([field, value]) => {
        promises.push(db.updateContent('hero', field, value));
      });
      // About
      Object.entries(content.about || {}).forEach(([field, value]) => {
        promises.push(db.updateContent('about', field, value));
      });
      // Footer
      Object.entries(content.footer || {}).forEach(([field, value]) => {
        promises.push(db.updateContent('footer', field, value));
      });

      await Promise.all(promises);
      toast({ title: 'Content updated successfully', description: 'Changes are live on the website.' });
    } catch (error) {
      toast({ title: 'Error saving content', variant: 'destructive' });
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="p-8 text-center">Loading content editor...</div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-100 pt-4 pb-4 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
          <p className="text-gray-500">Edit text and information across the website</p>
        </div>
        <Button onClick={handleSave} className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="max-w-3xl">
        <ContentSection title="Hero Section">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              value={content?.hero?.headline || ''}
              onChange={(e) => handleChange('hero', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              value={content?.hero?.subheadline || ''}
              onChange={(e) => handleChange('hero', 'subheadline', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                value={content?.hero?.ctaText || ''}
                onChange={(e) => handleChange('hero', 'ctaText', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                value={content?.hero?.ctaLink || ''}
                onChange={(e) => handleChange('hero', 'ctaLink', e.target.value)}
              />
            </div>
          </div>
        </ContentSection>

        <ContentSection title="About Section">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
            <textarea 
              rows={6}
              className="w-full p-2 border rounded-md"
              value={content?.about?.bio || ''}
              onChange={(e) => handleChange('about', 'bio', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leadership Thesis</label>
            <textarea 
              rows={4}
              className="w-full p-2 border rounded-md"
              value={content?.about?.leadershipThesis || ''}
              onChange={(e) => handleChange('about', 'leadershipThesis', e.target.value)}
            />
          </div>
        </ContentSection>

        <ContentSection title="Footer">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              value={content?.footer?.email || ''}
              onChange={(e) => handleChange('footer', 'email', e.target.value)}
            />
          </div>
        </ContentSection>
      </div>
    </AdminLayout>
  );
};

export default Content;