import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, X, GripVertical } from 'lucide-react';

const Ventures = () => {
  const [ventures, setVentures] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchVentures = async () => {
    try {
      const data = await db.getVentures();
      setVentures(data);
    } catch (error) {
      toast({ title: 'Error loading ventures', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentures();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this venture? This action cannot be undone.')) {
      try {
        await db.deleteVenture(id);
        setVentures(ventures.filter(v => v.id !== id));
        toast({ title: 'Venture deleted' });
      } catch (error) {
        toast({ title: 'Error deleting venture', variant: 'destructive' });
      }
    }
  };

  const handleEdit = (venture) => {
    setEditing(venture);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditing({
      id: null,
      name: '',
      vertical: 'CORE',
      summary: '',
      website_url: '',
      features: [],
      trust_points: [],
      sort_order: ventures.length + 1
    });
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Auto-generate slug from name if not present or just ensure consistency
    const name = formData.get('name');
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newVenture = {
      name: name,
      slug: slug,
      vertical: formData.get('vertical'),
      summary: formData.get('summary'),
      website_url: formData.get('website_url') || null,
      sort_order: parseInt(formData.get('sort_order')) || 0,
      features: formData.get('features').split('\n').filter(i => i.trim()),
      trust_points: formData.get('trust_points').split('\n').filter(i => i.trim()),
    };

    try {
      if (editing.id) {
        const [updated] = await db.updateVenture(editing.id, newVenture);
        setVentures(ventures.map(v => v.id === editing.id ? updated : v));
      } else {
        const [created] = await db.createVenture(newVenture);
        setVentures([...ventures, created]);
      }
      setIsFormOpen(false);
      toast({ title: 'Venture saved successfully' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error saving venture. Slug might be duplicate.', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventures Manager</h1>
          <p className="text-gray-500">Manage portfolio companies across verticals</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          <Plus size={16} className="mr-2" />
          Add Venture
        </Button>
      </div>

      {isFormOpen && editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">
                {editing.id ? 'Edit Venture' : 'New Venture'}
              </h2>
              <button onClick={() => setIsFormOpen(false)}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input name="name" defaultValue={editing.name} required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vertical</label>
                  <select name="vertical" defaultValue={editing.vertical} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="CORE">CORE (Infrastructure)</option>
                    <option value="TECH">TECH (Technology)</option>
                    <option value="STRATEGIC">STRATEGIC (Creative/Design)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary (1-2 lines)</label>
                <textarea name="summary" defaultValue={editing.summary} rows={2} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Website URL</label>
                  <input name="website_url" defaultValue={editing.website_url || ''} placeholder="https://..." className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input type="number" name="sort_order" defaultValue={editing.sort_order} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                  <textarea 
                    name="features" 
                    defaultValue={Array.isArray(editing.features) ? editing.features.join('\n') : ''} 
                    rows={5} 
                    placeholder="Engineering Consulting&#10;PMC Services"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Trust Points (one per line)</label>
                  <textarea 
                    name="trust_points" 
                    defaultValue={Array.isArray(editing.trust_points) ? editing.trust_points.join('\n') : ''} 
                    rows={5} 
                    placeholder="ISO Certified&#10;Award Winning"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#1e3a8a]">Save Venture</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a8a]"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {ventures.length === 0 && <p className="text-center text-gray-500 py-8">No ventures found. Add one to get started.</p>}
          
          {ventures.map((venture) => (
            <div key={venture.id} className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-center hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-300">
                  <GripVertical size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{venture.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      venture.vertical === 'CORE' ? 'bg-blue-100 text-blue-800' : 
                      venture.vertical === 'TECH' ? 'bg-purple-100 text-purple-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {venture.vertical}
                    </span>
                    <span className="text-xs text-gray-400 border border-gray-200 px-2 rounded">Order: {venture.sort_order}</span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-2xl">{venture.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => handleEdit(venture)} variant="outline" size="sm">
                  <Edit size={16} className="mr-2" /> Edit
                </Button>
                <Button onClick={() => handleDelete(venture.id)} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Ventures;


