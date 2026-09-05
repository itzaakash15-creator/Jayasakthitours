import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Star,
  CheckCircle2,
  Clock,
  Trash2,
  Search,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Check,
  User,
} from 'lucide-react';
import {
  ReviewRecord,
  supabase,
  approveReview,
  deleteReview,
} from '../../lib/supabase';

export const ReviewModerationSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    console.log('[DEBUG REVIEW] Admin Portal: Directly executing supabase.from("reviews").select("*")...');
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[DEBUG REVIEW] Admin Portal: Error fetching reviews from Supabase:', error);
        setFeedbackMessage({
          type: 'error',
          text: `Database error (${error.code || 'UNKNOWN'}): ${error.message}`,
        });
        setReviews([]);
        return;
      }

      console.log('[DEBUG REVIEW] Admin Portal: Received reviews directly from supabase.from("reviews").select("*"):', (data || []).length, data);
      setReviews(data || []);
    } catch (err: any) {
      console.error('[DEBUG REVIEW] Admin Portal: Unexpected error loading reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();

    const handleUpdate = () => {
      loadReviews();
    };

    window.addEventListener('jst:reviews_updated', handleUpdate);
    return () => {
      window.removeEventListener('jst:reviews_updated', handleUpdate);
    };
  }, [loadReviews]);

  // Auto-dismiss feedback message after 4 seconds
  useEffect(() => {
    if (!feedbackMessage) return;
    const t = setTimeout(() => setFeedbackMessage(null), 4000);
    return () => clearTimeout(t);
  }, [feedbackMessage]);

  const handleApprove = async (id: string) => {
    setActionLoadingId(id);
    try {
      await approveReview(id);
      // Optimistic update
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
      );
      setFeedbackMessage({
        type: 'success',
        text: 'Review approved successfully! It is now live on the website.',
      });
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err?.message || 'Failed to approve review in Supabase.',
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoadingId(id);
    try {
      await deleteReview(id);
      // Optimistic update
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setDeleteConfirmId(null);
      setFeedbackMessage({
        type: 'success',
        text: 'Review permanently deleted from Supabase.',
      });
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err?.message || 'Failed to delete review from Supabase.',
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const validReviews = Array.isArray(reviews) ? reviews.filter(Boolean) : [];
    const total = validReviews.length;
    const pending = validReviews.filter((r) => r && !r.approved).length;
    const approved = validReviews.filter((r) => r && r.approved).length;
    const avg =
      total > 0
        ? (validReviews.reduce((acc, r) => acc + (Number(r?.rating) || 5), 0) / total).toFixed(1)
        : '5.0';

    return { total, pending, approved, avg };
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    const validReviews = Array.isArray(reviews) ? reviews.filter(Boolean) : [];
    return validReviews.filter((r) => {
      if (!r) return false;
      if (activeFilter === 'pending' && r.approved) return false;
      if (activeFilter === 'approved' && !r.approved) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const customerName = (r.customer_name || (r as any).name || '').toLowerCase();
      const reviewText = (r.review_text || (r as any).review || (r as any).text || '').toLowerCase();
      return customerName.includes(q) || reviewText.includes(q);
    });
  }, [reviews, activeFilter, searchQuery]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-soft animate-fadeIn ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedbackMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold ml-3"
          >
            ×
          </button>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Reviews */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Submissions</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-navy-950 mt-2">
            {stats.total}
          </p>
          <span className="text-[11px] text-slate-400">All customer feedback</span>
        </div>

        {/* Pending Approval */}
        <div
          onClick={() => setActiveFilter('pending')}
          className={`rounded-2xl p-4 sm:p-5 border shadow-soft cursor-pointer transition-all ${
            activeFilter === 'pending'
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200'
              : 'bg-white border-slate-200/80 hover:border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-900">Pending Approval</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-800 mt-2">
            {stats.pending}
          </p>
          <span className="text-[11px] text-amber-700/80">Requires moderation</span>
        </div>

        {/* Approved & Live */}
        <div
          onClick={() => setActiveFilter('approved')}
          className={`rounded-2xl p-4 sm:p-5 border shadow-soft cursor-pointer transition-all ${
            activeFilter === 'approved'
              ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-200'
              : 'bg-white border-slate-200/80 hover:border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-900">Live on Website</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-800 mt-2">
            {stats.approved}
          </p>
          <span className="text-[11px] text-emerald-700/80">Visible to visitors</span>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Average Rating</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <p className="text-2xl sm:text-3xl font-bold text-brand-navy-950">
              {stats.avg}
            </p>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-400">Customer satisfaction score</span>
        </div>
      </div>

      {/* Main Review Moderation Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Header & Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-200/70 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-brand-navy-950 tracking-tight">
                  Traveler Reviews Moderation
                </h2>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {reviews.length} total
                </span>
                {stats.pending > 0 && (
                  <span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                    {stats.pending} pending
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Approve genuine customer reviews to publish on the public website carousel and testimonials page.
              </p>
            </div>

            {/* Search & Refresh Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer or review..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all placeholder:text-slate-400"
                />
              </div>
              <button
                type="button"
                onClick={loadReviews}
                disabled={loading}
                title="Refresh reviews from Supabase"
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-sky-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-brand-navy-950 text-white shadow-2xs'
                    : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                All Reviews ({reviews.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                  activeFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 hover:bg-amber-100/80 text-amber-800 border border-amber-200/70'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pending Approval ({stats.pending})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('approved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                  activeFilter === 'approved'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/70'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approved &amp; Live ({stats.approved})</span>
              </button>
            </div>

            {activeFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="text-xs font-semibold text-brand-sky-700 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-brand-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Fetching reviews from Supabase...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-brand-navy-950">
              {activeFilter === 'pending'
                ? 'All Caught Up!'
                : activeFilter === 'approved'
                ? 'No Approved Reviews'
                : 'No Reviews Found'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {activeFilter === 'pending'
                ? 'There are currently no customer reviews waiting for moderation. New submissions will show up here.'
                : activeFilter === 'approved'
                ? 'Approve pending reviews to publish them on your public website.'
                : 'No reviews match your current filter or search query.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredReviews.map((item) => {
              if (!item) return null;
              const isActionLoading = actionLoadingId === item.id;
              const isConfirmingDelete = deleteConfirmId === item.id;
              const customerName = item.customer_name || (item as any).name || 'Guest Traveler';
              const reviewText = item.review_text || (item as any).review || (item as any).text || '';
              const rating = Number(item.rating) || 5;

              return (
                <div
                  key={item.id || Math.random()}
                  className="p-4 sm:p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  {/* Left: Customer Info, Rating & Review Text */}
                  <div className="space-y-2.5 max-w-2xl flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Avatar initial */}
                      <div className="w-8 h-8 rounded-full bg-brand-sky-100 text-brand-sky-800 font-bold text-xs flex items-center justify-center border border-brand-sky-200 flex-shrink-0">
                        {customerName.charAt(0).toUpperCase() || 'G'}
                      </div>

                      <span className="text-sm font-bold text-brand-navy-950">
                        {customerName}
                      </span>

                      {/* Date */}
                      <span className="text-[11px] text-slate-400 font-medium">
                        • {formatDate(item.created_at)}
                      </span>

                      {/* Approval Status Badge */}
                      {item.approved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Approved &amp; Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Moderation</span>
                        </span>
                      )}
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 pt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1.5">
                        {rating}.0 / 5
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      "{reviewText}"
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono">
                      Review ID: {item.id || 'N/A'}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap md:flex-col items-end gap-2 pt-2 md:pt-0 flex-shrink-0">
                    {/* Approve Button (shown if not approved) */}
                    {!item.approved && (
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        disabled={isActionLoading}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft transition-all disabled:opacity-50"
                      >
                        {isActionLoading ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Approving...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Approve &amp; Publish</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Delete Confirmation Box / Button */}
                    {isConfirmingDelete ? (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-right">
                        <p className="text-[11px] font-semibold text-rose-800">
                          Delete this review permanently?
                        </p>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            disabled={isActionLoading}
                            className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg disabled:opacity-50"
                          >
                            {isActionLoading ? 'Deleting...' : 'Yes, Delete'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        disabled={isActionLoading}
                        title="Delete review"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
