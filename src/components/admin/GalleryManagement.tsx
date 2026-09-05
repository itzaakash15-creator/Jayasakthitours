import React, { useState } from 'react';
import {
  UploadCloud,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Compass,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Plus,
  Image as ImageIcon,
} from 'lucide-react';
import {
  GalleryPhotoRecord,
  GalleryCategory,
  updateGalleryPhoto,
  deleteGalleryPhoto,
} from '../../lib/supabase';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PhotoEditModal } from './PhotoEditModal';

export interface GalleryManagementProps {
  photos: GalleryPhotoRecord[];
  onPhotosChange: (photos: GalleryPhotoRecord[]) => void;
  onActivityLog?: (action: string, description: string) => void;
}

const CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
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

export const GalleryManagement: React.FC<GalleryManagementProps> = ({
  photos,
  onPhotosChange,
  onActivityLog,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');
  const [activeStatus, setActiveStatus] = useState<'All' | 'Published' | 'Hidden'>('All');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhotoRecord | null>(null);
  const [deletingPhoto, setDeletingPhoto] = useState<GalleryPhotoRecord | null>(null);

  // Filter photos
  const filteredPhotos = photos.filter((photo) => {
    if (activeCategory !== 'All' && photo.category !== activeCategory) return false;
    if (activeStatus !== 'All' && photo.status !== activeStatus) return false;
    return true;
  });

  const publishedCount = photos.filter((p) => p.status === 'Published').length;
  const hiddenCount = photos.filter((p) => p.status === 'Hidden').length;

  const handlePhotoUploaded = (newPhoto: GalleryPhotoRecord) => {
    const updated = [newPhoto, ...photos];
    onPhotosChange(updated);
    onActivityLog?.(
      'New Client Photo Uploaded',
      `"${newPhoto.title}" was added to ${newPhoto.category}.`
    );
  };

  const handlePhotoUpdated = (updatedPhoto: GalleryPhotoRecord) => {
    const updated = photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    onPhotosChange(updated);
    onActivityLog?.(
      'Photo Details Updated',
      `Updated metadata for "${updatedPhoto.title}".`
    );
  };

  const handleTogglePublish = async (photo: GalleryPhotoRecord) => {
    const nextStatus = photo.status === 'Published' ? 'Hidden' : 'Published';
    const updated = await updateGalleryPhoto(photo.id, { status: nextStatus });
    if (updated) {
      handlePhotoUpdated(updated);
      onActivityLog?.(
        nextStatus === 'Published' ? 'Photo Published to Gallery' : 'Photo Hidden from Gallery',
        `"${photo.title}" is now ${nextStatus.toLowerCase()} on the public website.`
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingPhoto) return;
    const photoId = deletingPhoto.id;
    const photoTitle = deletingPhoto.title;

    await deleteGalleryPhoto(photoId);
    const updated = photos.filter((p) => p.id !== photoId);
    onPhotosChange(updated);
    onActivityLog?.(
      'Gallery Image Removed',
      `"${photoTitle}" was permanently deleted from the gallery.`
    );
    setDeletingPhoto(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
              Gallery Management
            </h2>
            <span className="text-xs font-mono font-bold bg-brand-sky-50 text-brand-sky-800 border border-brand-sky-200/70 px-2.5 py-0.5 rounded-full">
              {publishedCount} Published • {hiddenCount} Drafts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage travel memories and showcase client experiences on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 hover:from-brand-sky-500 hover:to-brand-teal-500 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-soft-lg active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Photos</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft space-y-3">
        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Status:
            </span>
            {(['All', 'Published', 'Hidden'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeStatus === st
                    ? 'bg-brand-navy-950 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'Hidden' ? 'Hidden / Draft' : st}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong>{filteredPhotos.length}</strong> of {photos.length} photos
          </span>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-sky-50 text-brand-sky-800 font-bold border border-brand-sky-200'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-brand-navy-950">
            No photos found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No client travel memories match the selected filters. Upload new photos or adjust filter options above.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveStatus('All');
            }}
            className="text-xs font-bold text-brand-sky-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-soft hover:border-brand-sky-300 transition-all duration-300 flex flex-col"
            >
              {/* Photo Image with Aspect Ratio */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Published / Hidden Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs backdrop-blur-xs ${
                      photo.status === 'Published'
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-slate-800/85 text-slate-200'
                    }`}
                  >
                    {photo.status === 'Published' ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Hover Action Bar */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => setEditingPhoto(photo)}
                    className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-brand-sky-50 hover:text-brand-sky-700 shadow-soft transition-transform hover:scale-110"
                    title="Edit photo details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTogglePublish(photo)}
                    className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-100 shadow-soft transition-transform hover:scale-110"
                    title={photo.status === 'Published' ? 'Hide from public site' : 'Publish to site'}
                  >
                    {photo.status === 'Published' ? (
                      <EyeOff className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingPhoto(photo)}
                    className="p-2.5 rounded-xl bg-white text-rose-600 hover:bg-rose-50 shadow-soft transition-transform hover:scale-110"
                    title="Delete photo permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Photo Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-sky-700 bg-brand-sky-50 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                      {photo.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {photo.aspect}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-brand-navy-950 mt-1.5 line-clamp-1">
                    {photo.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{photo.location}</span>
                  </p>
                </div>

                {photo.tour_name && (
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1 truncate">
                    <Compass className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{photo.tour_name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onPhotoUploaded={handlePhotoUploaded}
      />

      {/* Edit Modal */}
      <PhotoEditModal
        photo={editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onPhotoUpdated={handlePhotoUpdated}
      />

      {/* Delete Confirmation Dialog */}
      {deletingPhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDeletingPhoto(null)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/90 z-10 space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-brand-navy-950">
                Delete this photo?
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                This image <strong>"{deletingPhoto.title}"</strong> will be permanently removed from the website gallery and database.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingPhoto(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-2xs transition-colors"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
