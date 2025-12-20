import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Trash2, Download, Search, Mail, Phone, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      const data = await db.getLeads();
      setLeads(data);
    } catch (error) {
      toast({ title: 'Error fetching leads', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await db.deleteLead(id);
        setLeads(leads.filter(l => l.id !== id));
        toast({ title: 'Lead deleted successfully' });
      } catch (error) {
        toast({ title: 'Failed to delete lead', variant: 'destructive' });
      }
    }
  };

  const handleStatusChange = async (lead, newStatus) => {
    try {
      const [updated] = await db.updateLead(lead.id, { status: newStatus });
      setLeads(leads.map(l => l.id === lead.id ? updated : l));
      toast({ title: 'Status updated' });
    } catch (error) {
      toast({ title: 'Failed to update status', variant: 'destructive' });
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Category', 'Message', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        `"${l.name}"`, `"${l.email}"`, `"${l.phone}"`, `"${l.category}"`, 
        `"${l.message?.replace(/"/g, '""') || ''}"`, `"${l.status}"`, `"${l.created_at}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-500">View and manage contact form submissions</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading leads...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-500">Contact Details</th>
                  <th className="px-6 py-4 font-medium text-gray-500">Message Info</th>
                  <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-500 w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="flex items-center text-gray-500 mt-1 gap-2 text-xs">
                        <Mail size={12} /> {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center text-gray-500 mt-1 gap-2 text-xs">
                          <Phone size={12} /> {lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mb-2">
                        {lead.category || 'General'}
                      </div>
                      <p className="text-gray-600 truncate">{lead.message}</p>
                      <div className="flex items-center text-gray-400 mt-1 gap-2 text-xs">
                        <Calendar size={12} /> {new Date(lead.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead, e.target.value)}
                        className="px-2 py-1 rounded border border-gray-200 text-xs focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No leads found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Leads;