import React, { useEffect, useState } from 'react';
import { HistoryItem } from '../types/prediction';
import { getHistory } from '../services/api';
import { Search, Filter, Calendar, ShieldCheck, Leaf, Eye, X, RefreshCw } from 'lucide-react';
import { LoadingState } from '../components/LoadingState';

export const History: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const res = await getHistory({
        search: searchTerm || undefined,
        plant: selectedPlant || undefined,
      });
      setItems(res.items || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [selectedPlant]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistoryData();
  };

  // Get unique plant names for dropdown filter
  const uniquePlants = Array.from(new Set(items.map((i) => i.plant))).filter(Boolean);

  return (
    <div className="py-10 bg-[#F8FAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Persistent Records
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
              Analysis History
            </h1>
            <p className="text-slate-600 text-sm">
              Review past plant leaf analyses, confidence metrics, and timestamp records.
            </p>
          </div>

          <button
            onClick={fetchHistoryData}
            className="inline-flex items-center space-x-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh History</span>
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white border border-emerald-900/10 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by plant or disease (e.g. Tomato, Late Blight)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </form>

          {/* Plant Filter Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Plants</option>
              {uniquePlants.map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List Content */}
        {loading ? (
          <LoadingState message="Fetching analysis history..." />
        ) : items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest">No History Records Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Perform your first plant disease detection on the "Disease Detection" page to save analyses here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const isHealthy = item.disease.toLowerCase() === 'healthy';
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-emerald-500/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                        {item.plant}
                      </span>
                      <h3 className="text-lg font-bold text-forest">
                        {item.disease}
                      </h3>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isHealthy
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {item.confidence.toFixed(1)}%
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center space-x-1 text-emerald-600 font-semibold hover:text-emerald-700"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Report</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">Analysis Record #{selectedItem.id}</span>
                <h3 className="text-xl font-bold text-forest">{selectedItem.plant} — {selectedItem.disease}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Plant Species:</span>
                <span className="font-semibold">{selectedItem.plant}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Predicted Condition:</span>
                <span className="font-semibold">{selectedItem.disease}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Model Confidence:</span>
                <span className="font-bold text-emerald-700 font-mono">{selectedItem.confidence.toFixed(1)}% ({selectedItem.confidence_level})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Model Identifier:</span>
                <span className="font-mono text-xs text-slate-600 truncate max-w-[200px]">{selectedItem.model_id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Analysis Timestamp:</span>
                <span>{selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'N/A'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
