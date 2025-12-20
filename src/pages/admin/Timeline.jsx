import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTimeline = async () => {
    try {
      const data = await db.getTimeline();
      setTimeline(data);
    } catch (error) {
      toast({ title: 'Error loading timeline', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const handleAdd = async () => {
    const newItem = {
      year: new Date().getFullYear().toString(),
      title: 'New Milestone',
      description: 'Description of the milestone',
      display_order: timeline.length // simple append order
    };
    try {
      const [created] = await db.updateTimeline([newItem]); // upsert handles insert too
      setTimeline([created, ...timeline]); // Optimistic or refetch
      toast({ title: 'Milestone added' });
      fetchTimeline(); // ensure sync
    } catch (error) {
      toast({ title: 'Error adding milestone', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this milestone?')) {
      try {
        await db.deleteTimelineItem(id);
        setTimeline(timeline.filter(t => t.id !== id));
        toast({ title: 'Milestone deleted' });
      } catch (error) {
        toast({ title: 'Error deleting milestone', variant: 'destructive' });
      }
    }
  };

  const handleChange = (id, field, value) => {
    setTimeline(timeline.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = async () => {
    try {
      await db.updateTimeline(timeline);
      toast({ title: 'Timeline saved successfully' });
    } catch (error) {
      toast({ title: 'Error saving timeline', variant: 'destructive' });
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="p-8 text-center">Loading timeline...</div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timeline Manager</h1>
          <p className="text-gray-500">Manage career highlights and milestones</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdd} variant="outline">
            <Plus size={16} className="mr-2" />
            Add Milestone
          </Button>
          <Button onClick={handleSave} className="bg-[#1e3a8a]">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-4">
            <div className="mt-2 text-gray-400 cursor-move">
              <GripVertical size={20} />
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                <input 
                  value={item.year}
                  onChange={e => handleChange(item.id, 'year', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                <input 
                  value={item.title}
                  onChange={e => handleChange(item.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea 
                  value={item.description}
                  onChange={e => handleChange(item.id, 'description', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
            </div>

            <button 
              onClick={() => handleDelete(item.id)}
              className="mt-2 text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {timeline.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
            No timeline items found. Add one to get started.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Timeline;