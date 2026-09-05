import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Compass,
  FileText,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from 'lucide-react';
import {
  updateGalleryPhoto,
  GalleryCategory,
  GalleryPhotoRecord,
} from '../../lib/supabase';

export interface PhotoEditModalProps {
  photo: GalleryPhotoRecord | null;
  onClose: () => void;
  onPhotoUpdated: (photo: GalleryPhotoRecord) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'Client Experiences',
  'Temple Tours',
  'South India',
  'Kerala',
  'Rajasthan',
  'Golden Triangle',
  'Cab & Travel',
  'Nature & Scenic',
  'Other',
];

export const PhotoEditModal: React.FC<PhotoEditModalProps> = ({
  photo,
  onClose,
  onPhotoUpdated,
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tourName, setTourName] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Client Experiences');
  const [status, setStatus] = useState<'Published' | 'Hidden'>('Published');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (photo) {
      setTitle(photo.title || '');
      setCaption(photo.caption || '');
      setLocation(photo.location || '');
      setTourName(photo.tour_name || '');
      setCategory(photo.category || 'Client Experiences');
      setStatus(photo.status || 'Published');
    }
  }, [photo]);

  if (!photo) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updated = await updateGalleryPhoto(photo.id, {
        title,
        caption,
        location,
        tour_name: tourName,
        category,
        status,
      });

      if (updated) {
        onPhotoUpdated(updated);
      }
      onClose();
    } catch (err) {
      console.error('[PhotoEditModal] Failed to update:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => !isSaving && onClose()}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-950 tracking-tight">
              Edit Gallery Photo
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update details or toggle public visibility.
            </p>
          </div>

          <button
            onClick={() => !isSaving && onClose()}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail preview */}
        <div className="px-6 pt-4">
          <div className="relative rounded-2xl overflow-hidden aspect-video max-h-44 bg-slate-100 border border-slate-200">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs ${
                status === 'Published'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              ● {status}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Photo Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700">Tour / Circuit Name</label>
            <input
              type="text"
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              placeholder="e.g. South India Explorer"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700">Caption / Description</label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all"
            />
          </div>

          {/* Visibility toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-brand-navy-950 block">
                Public Website Visibility
              </span>
              <span className="text-[10px] text-slate-400">
                {status === 'Published' ? 'Visible to all visitors' : 'Hidden from gallery'}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setStatus(status === 'Published' ? 'Hidden' : 'Published')
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                status === 'Published'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {status === 'Published' ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Published</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-sky-600 hover:bg-brand-sky-700 text-white text-xs font-bold shadow-2xs transition-all"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoEditModal;
