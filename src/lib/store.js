import { supabase } from '@/lib/customSupabaseClient';

// Helper to handle Supabase responses
const handleResponse = async (promise) => {
  const { data, error } = await promise;
  if (error) {
    console.error('Supabase Error:', error);
    throw error;
  }
  return data;
};

export const db = {
  // --- Ventures ---
  getVentures: async () => {
    return handleResponse(
      supabase
        .from('ventures')
        .select('*')
        .order('sort_order', { ascending: true })
    );
  },
  
  getVentureBySlug: async (slug) => {
    return handleResponse(
      supabase.from('ventures').select('*').eq('slug', slug).single()
    );
  },

  createVenture: async (venture) => {
    return handleResponse(supabase.from('ventures').insert(venture).select());
  },

  updateVenture: async (id, updates) => {
    return handleResponse(supabase.from('ventures').update(updates).eq('id', id).select());
  },

  deleteVenture: async (id) => {
    return handleResponse(supabase.from('ventures').delete().eq('id', id));
  },

  // --- Leads ---
  getLeads: async () => {
    return handleResponse(
      supabase.from('leads').select('*').order('created_at', { ascending: false })
    );
  },

  addLead: async (lead) => {
    return handleResponse(supabase.from('leads').insert(lead).select());
  },

  updateLead: async (id, updates) => {
    return handleResponse(supabase.from('leads').update(updates).eq('id', id).select());
  },

  deleteLead: async (id) => {
    return handleResponse(supabase.from('leads').delete().eq('id', id));
  },

  // --- Content ---
  getContent: async () => {
    const { data, error } = await supabase.from('site_content').select('*');
    if (error) throw error;
    
    // Transform flat database rows back into nested object structure
    const content = {
      hero: {},
      about: {},
      principles: [],
      footer: {}
    };

    if (data) {
      data.forEach(item => {
        if (content[item.section]) {
          content[item.section][item.field] = item.value;
        }
      });
    }
    
    // Fallback defaults if DB is empty
    if (!content.hero.headline) {
      content.hero = {
        headline: 'Er. Prabhakar Dwivedi',
        subheadline: 'Execution-led leadership across Infrastructure & Technology',
        ctaText: 'Connect for Business',
        ctaLink: '/contact'
      };
    }
    
    return content;
  },

  updateContent: async (section, field, value) => {
    return handleResponse(
      supabase.from('site_content').upsert(
        { section, field, value, updated_at: new Date().toISOString() },
        { onConflict: 'section,field' }
      )
    );
  },

  // --- SEO ---
  getSEO: async () => {
    const { data } = await supabase.from('seo_settings').select('*');
    const seoMap = {};
    if (data) {
      data.forEach(item => {
        seoMap[item.page_path] = item;
      });
    }
    return seoMap;
  },

  updateSEO: async (pagePath, updates) => {
    return handleResponse(
      supabase.from('seo_settings').upsert(
        { page_path: pagePath, ...updates, updated_at: new Date().toISOString() },
        { onConflict: 'page_path' }
      )
    );
  },

  // --- Timeline ---
  getTimeline: async () => {
    return handleResponse(
      supabase.from('timeline').select('*').order('display_order', { ascending: true })
    );
  },

  updateTimeline: async (items) => {
    // Upsert all items
    const { data, error } = await supabase.from('timeline').upsert(items);
    if (error) throw error;
    return data;
  },

  deleteTimelineItem: async (id) => {
    return handleResponse(supabase.from('timeline').delete().eq('id', id));
  },
  
  // --- Dashboard Stats ---
  getStats: async () => {
    const [leads, newLeads, ventures, timeline] = await Promise.all([
      supabase.from('leads').select('id', { count: 'exact' }),
      supabase.from('leads').select('id', { count: 'exact' }).gt('created_at', new Date(Date.now() - 86400000).toISOString()),
      supabase.from('ventures').select('id', { count: 'exact' }),
      supabase.from('timeline').select('id', { count: 'exact' })
    ]);

    return {
      leads: leads.count || 0,
      newLeads: newLeads.count || 0,
      ventures: ventures.count || 0,
      timeline: timeline.count || 0
    };
  }
};