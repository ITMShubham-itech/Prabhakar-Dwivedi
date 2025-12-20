import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const SEO = () => {
  const [seo, setSeo] = useState({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const data = await db.getSEO();
        setSeo(data);
      } catch (error) {
        toast({ title: 'Error loading SEO settings', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchSeo();
  }, [toast]);

  const handleChange = (path, field, value) => {
    setSeo(prev => ({
      ...prev,
      [path]: {
        ...(prev[path] || {}),
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      const promises = Object.entries(seo).map(([path, settings]) => 
        db.updateSEO(path, settings)
      );
      await Promise.all(promises);
      toast({ title: 'SEO Settings saved' });
    } catch (error) {
      toast({ title: 'Error saving settings', variant: 'destructive' });
    }
  };

  const pages = [
    { path: '/', name: 'Home Page' },
    { path: '/about', name: 'About Page' },
    { path: '/group-companies', name: 'Group Companies' },
    { path: '/contact', name: 'Contact Page' },
  ];

  if (loading) return (
    <AdminLayout>
      <div className="p-8 text-center">Loading SEO settings...</div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Manager</h1>
          <p className="text-gray-500">Edit meta titles and descriptions</p>
        </div>
        <Button onClick={handleSave} className="bg-[#1e3a8a]">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {pages.map(page => (
          <div key={page.path} className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              {page.name} <span className="text-gray-400 font-normal text-sm ml-2">({page.path})</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input 
                  value={seo[page.path]?.title || ''}
                  onChange={e => handleChange(page.path, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Page Title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea 
                  value={seo[page.path]?.description || ''}
                  onChange={e => handleChange(page.path, 'description', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Brief description for search engines"
                />
              </div>

              {/* Preview Snippet */}
              <div className="bg-gray-50 p-4 rounded mt-2">
                <div className="text-xs text-gray-500 mb-1">Google Search Preview</div>
                <div className="text-[#1a0dab] text-lg hover:underline cursor-pointer truncate">
                  {seo[page.path]?.title || 'Page Title'}
                </div>
                <div className="text-[#006621] text-sm">www.prabhakardwivedi.com{page.path}</div>
                <div className="text-gray-600 text-sm line-clamp-2">
                  {seo[page.path]?.description || 'No description set.'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default SEO;