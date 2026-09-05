import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  MapPin,
  Compass,
  FileText,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  createGalleryPhoto,
  uploadGalleryImage,
  GalleryCategory,
  GalleryPhotoRecord,
} from '../../lib/supabase';

export interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded: (photo: GalleryPhotoRecord) => void;
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

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onPhotoUploaded,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Metadata fields
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tourName, setTourName] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Client Experiences');
  const [status, setStatus] = useState<'Published' | 'Hidden'>('Published');

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    });

    if (validFiles.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    setErrorMessage('');
    setSelectedFiles(validFiles);
    setPreviews(validPreviews);
    setCurrentIdx(0);

    // Auto-prefill title from filename
    if (!title && validFiles[0]) {
      const cleanName = validFiles[0].name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setErrorMessage('Please upload at least one image.');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    try {
      // Process each file
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const uploadedUrl = await uploadGalleryImage(file);

        const newPhoto = await createGalleryPhoto({
          title: title || file.name.replace(/\.[^/.]+$/, ''),
          caption: caption || 'Client journey with Jayashakthi Tours & Travels',
          location: location || 'India',
          tour_name: tourName || 'Signature Tour',
          category,
          image_url: uploadedUrl,
          aspect: 'landscape',
          status,
          uploaded_by: 'Operations Admin',
        });

        onPhotoUploaded(newPhoto);
      }

      // Reset and close
      onClose();
    } catch (err: any) {
      console.error('[UploadModal] Failed to upload photo:', err);
      setErrorMessage(err.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => !isUploading && onClose()}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-950 tracking-tight">
              Upload Client Travel Photos
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showcase authentic journey memories on your public website gallery.
            </p>
          </div>

          <button
            onClick={() => !isUploading && onClose()}
            disabled={isUploading}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Drag & Drop File Upload Area */}
          {selectedFiles.length === 0 ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-brand-sky-500 bg-brand-sky-50/60'
                  : 'border-slate-300 hover:border-brand-sky-400 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-brand-navy-950">
                Click to browse or drag &amp; drop photos here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports single or multiple JPG, PNG, WebP up to 10MB each
              </p>
            </div>
          ) : (
            /* Selected File Previews */
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video max-h-56 bg-slate-100 flex items-center justify-center">
                <img
                  src={previews[currentIdx]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles([]);
                    setPreviews([]);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-colors"
                  title="Remove selected"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {previews.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {previews.map((prev, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        currentIdx === idx
                          ? 'border-brand-sky-600 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={prev} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Photo Metadata Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Title */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Photo Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Madurai Temple Chariot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium"
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Madurai, Tamil Nadu"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* Tour / Package Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Tour / Package Name (Optional)</label>
              <div className="relative">
                <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="e.g. Tamil Nadu Temple Tour"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Caption / Description */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-slate-700">Description / Caption</label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Brief travel memory caption displayed in the website lightbox..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium"
              />
            </div>

            {/* Publish Status Toggle */}
            <div className="sm:col-span-2 pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-brand-navy-950 block">
                  Publish to Public Website
                </span>
                <p className="text-[11px] text-slate-500">
                  {status === 'Published'
                    ? 'This photo will immediately appear on the public travel gallery.'
                    : 'Saved as draft. Only administrators will see this photo.'}
                </p>
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
                    <span>Hidden / Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || selectedFiles.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal-600 hover:bg-brand-teal-700 disabled:opacity-50 text-white text-xs font-bold shadow-soft transition-all"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading {selectedFiles.length} photo(s)...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload &amp; Save Photos</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadModal;
