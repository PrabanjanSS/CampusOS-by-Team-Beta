import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images, Calendar, Upload, Link2, Palette, Eye, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  event: string;
  category: 'Hackathon' | 'Workshop' | 'Seminar' | 'Social';
  date: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    src: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'VEILED MOTION',
    description: 'A study in ethereal movement — where form meets emotion in soft, dreamlike light.',
    event: 'Inter-Club Hackathon',
    category: 'Hackathon',
    date: 'Jul 25, 2026'
  },
  {
    id: 'g2',
    src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'ENDLESS PATH',
    description: 'An exploration of solitude and journey, winding through the stillness of nature.',
    event: 'Design Systems Workshop',
    category: 'Workshop',
    date: 'Jul 28, 2026'
  },
  {
    id: 'g3',
    src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'CELESTIAL DRIFT',
    description: 'A vision of the unknown — light, gravity, and silence colliding beyond the stars.',
    event: 'Robotics Open Lab',
    category: 'Workshop',
    date: 'Jul 18, 2026'
  },
  {
    id: 'g4',
    src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'SHADOW GAZE',
    description: 'An intimate portrait that blurs the line between mystery and clarity.',
    event: 'Cultural Night',
    category: 'Social',
    date: 'Jul 12, 2026'
  },
  {
    id: 'g5',
    src: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'SILENT ECHOES',
    description: 'Capturing the subtle resonances of light reflecting off industrial geometry.',
    event: 'AI/ML Guest Lecture',
    category: 'Seminar',
    date: 'Aug 02, 2026'
  },
  {
    id: 'g6',
    src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'VIVID NIGHTS',
    description: 'A celebration of vibrant tones, music, and shared campus community.',
    event: 'Robotics Open Lab',
    category: 'Workshop',
    date: 'Jul 18, 2026'
  },
  {
    id: 'g7',
    src: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'CREATIVE PROCESS',
    description: 'Collaborative development sprints where students share design perspectives.',
    event: 'Visual Arts Lab',
    category: 'Workshop',
    date: 'Jul 28, 2026'
  },
  {
    id: 'g8',
    src: 'https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'DEV ALIGNMENT',
    description: 'Code-review roundtables and mentorship checks during hackathon midterms.',
    event: 'Inter-Club Hackathon',
    category: 'Hackathon',
    date: 'Jul 25, 2026'
  }
];

const categories = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Social'] as const;
type UploadTab = 'presets' | 'device' | 'url';

const presetPhotos = [
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=600'
];

const heroImages = [
  'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

// Helper to assign abstract bento sizing classes dynamically based on list index
const getBentoClasses = (index: number) => {
  const patterns = [
    'sm:col-span-2 sm:row-span-2', // Large focus card
    'sm:col-span-1 sm:row-span-1', // Small card
    'sm:col-span-1 sm:row-span-2', // Tall vertical card
    'sm:col-span-1 sm:row-span-1', // Small card
    'sm:col-span-2 sm:row-span-1', // Wide horizontal card
    'sm:col-span-1 sm:row-span-1', // Small card
    'sm:col-span-1 sm:row-span-2', // Tall vertical card
    'sm:col-span-2 sm:row-span-1'  // Wide horizontal card
  ];
  return patterns[index % patterns.length];
};

export default function GalleryPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<typeof categories[number]>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Upload modal states
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postEvent, setPostEvent] = useState('');
  const [postCategory, setPostCategory] = useState<Exclude<typeof categories[number], 'All'>>('Hackathon');
  const [postDate, setPostDate] = useState('');
  const [uploadTab, setUploadTab] = useState<UploadTab>('presets');
  const [selectedPreset, setSelectedPreset] = useState(presetPhotos[0]);
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('campusos_gallery_bento');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(defaultGalleryItems);
      localStorage.setItem('campusos_gallery_bento', JSON.stringify(defaultGalleryItems));
    }
  }, []);

  const saveItems = (updated: GalleryItem[]) => {
    setItems(updated);
    localStorage.setItem('campusos_gallery_bento', JSON.stringify(updated));
  };

  const handlePostPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postEvent || !postDate || !postDescription) {
      toast({ title: 'Missing Information', description: 'Please complete all required fields.', variant: 'warning' });
      return;
    }

    const finalSrc =
      uploadTab === 'presets' ? selectedPreset :
      uploadTab === 'device' ? uploadedPhoto :
      customPhotoUrl;

    if (!finalSrc) {
      toast({ title: 'Image Required', description: 'Please select or upload an image first.', variant: 'warning' });
      return;
    }

    const newItem: GalleryItem = {
      id: 'g_' + Date.now(),
      src: finalSrc,
      title: postTitle.toUpperCase(),
      description: postDescription,
      event: postEvent,
      category: postCategory,
      date: postDate
    };

    saveItems([newItem, ...items]);
    setIsPostOpen(false);
    toast({ title: 'Photo Posted!', description: 'Your new moment has been shared with the community.', variant: 'success' });

    // Reset Form
    setPostTitle('');
    setPostDescription('');
    setPostEvent('');
    setPostDate('');
    setUploadedPhoto('');
    setCustomPhotoUrl('');
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid File', description: 'Please choose an image file.', variant: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const filteredItems = items.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  const currentItem = activeIndex !== null ? filteredItems[activeIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  const canPost = user?.role === 'lead' || user?.role === 'faculty';

  return (
    <div className="space-y-12 pb-16">
      {/* SECTION 1: Visit Tokyo Inspired Hero Banner */}
      <FadeIn>
        <div className="relative h-[480px] w-full overflow-hidden rounded-[24px] border border-border-soft bg-black shadow-2xl flex flex-col justify-between p-6 sm:p-10">
          {/* Background image Torii gate */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-lighten pointer-events-none transition-all duration-1000" style={{ backgroundImage: `url('${heroImages[heroIndex]}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent pointer-events-none" />

          {/* Top Info Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-white/80 uppercase">CAMPUSOS GALLERY</span>
            {canPost && (
              <Button leftIcon="Plus" onClick={() => setIsPostOpen(true)} variant="secondary" className="bg-white hover:bg-white/90 font-bold border-0 shadow-lift" size="sm" magnetic>
                Post Moment
              </Button>
            )}
          </div>

          {/* Center Title block and slide index */}
          <div className="relative z-10 grid grid-cols-12 gap-4 items-center">
            {/* Title */}
            <div className="col-span-8 space-y-1">
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-white uppercase">
                EXPLORE<br />CAMPUS
              </h1>
            </div>
            {/* Slide Index indicator */}
            <div className="col-span-4 flex flex-col items-end text-white/50 text-[10px] tracking-widest font-bold select-none">
              {heroImages.map((_, i) => {
                const isActive = heroIndex === i;
                return (
                  <span
                    key={i}
                    className={`transition-all duration-500 flex items-center gap-2 ${
                      isActive ? 'text-white text-base font-extrabold' : 'text-white/40'
                    }`}
                  >
                    {isActive && <span className="h-0.5 w-6 bg-white inline-block" />}
                    0{i + 1}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Bottom 3-Column Narrative Footer */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {[
              { id: 'f1', title: 'IDEATE CODE SPRINT', text: 'Active project planning meetings, brainstorming sprints, and architecture feedback sessions.' },
              { id: 'f2', title: 'DESIGN LAB SESSIONS', text: 'UI/UX visual alignment bootcamps, typography research, and dynamic styling guidelines.' },
              { id: 'f3', title: 'LAUNCH CELEBRATIONS', text: 'Social networking dinners, budget filings, and cultural show milestones.' }
            ].map((col) => (
              <div key={col.id} className="space-y-2">
                <p className="text-[10px] text-white/60 leading-relaxed line-clamp-2">{col.text}</p>
                <button
                  type="button"
                  onClick={() => toast({ title: col.title, description: 'Explore more highlights under the gallery grid.', variant: 'info' })}
                  className="text-[10px] font-extrabold tracking-widest text-white hover:text-ochre transition-colors uppercase flex items-center gap-1.5"
                >
                  LEARN MORE <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* SECTION 2: Category Filter Tabs */}
      <FadeIn delay={0.05}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-soft pb-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-bold text-ink-soft uppercase">Explore Bento</span>
            <h2 className="text-xl font-bold text-ink uppercase tracking-wider">POPULAR ALBUMS</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-1 w-fit border border-border-soft shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveIndex(null);
                }}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-navy text-white shadow-soft'
                    : 'text-ink-soft hover:text-navy hover:bg-cream-100'
                }`}
              >
                {cat === 'All' ? 'All Albums' : cat + 's'}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* SECTION 3: Dynamic Bento Grid of Gallery Images */}
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
        {filteredItems.map((item, idx) => (
          <StaggerItem key={item.id} className={getBentoClasses(idx)}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => setActiveIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border-soft bg-white shadow-soft transition-all duration-300 hover:shadow-card hover:border-navy/20 h-full w-full flex flex-col justify-end"
            >
              {/* Image filling full grid block */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-end text-center z-10">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-ochre transition-colors">
                  MOMENT №{idx + 1}
                </h3>
                <p className="mt-1 text-[9px] text-white/70 tracking-wider font-semibold uppercase">
                  {item.title}
                </p>
              </div>

              {/* Hover overlay preview button */}
              <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Eye className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setActiveIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-[210]">
              <div className="flex items-center gap-2 text-white">
                <Images className="h-5 w-5 text-ochre-400" />
                <span className="text-sm font-bold">{activeIndex! + 1} / {filteredItems.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentItem.src}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="secondary" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/25" leftIcon="Download">
                    Download
                  </Button>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:scale-105 hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Slider Content */}
            <div className="relative flex w-full max-w-5xl items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-0 sm:left-4 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.img
                key={currentItem.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                src={currentItem.src}
                alt={currentItem.title}
                className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-0 sm:right-4 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 w-full max-w-xl rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-5 text-white text-center sm:text-left space-y-2 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className="rounded bg-ochre/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-ochre-300">
                  {currentItem.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  {currentItem.date}
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight">{currentItem.title}</h2>
              <p className="text-xs text-white/70">Captured for: <span className="font-semibold text-white">{currentItem.event}</span></p>
              <p className="text-sm text-white/80 leading-relaxed pt-1">{currentItem.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Photo Modal */}
      {isPostOpen && (
        <Modal
          open={isPostOpen}
          onClose={() => setIsPostOpen(false)}
          title="Post to Gallery"
          description="Upload a photo and details to share a campus moment"
          size="md"
        >
          <form onSubmit={handlePostPhoto} className="space-y-4">
            <div>
              <label className="label-base">Moment Title *</label>
              <input
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="e.g. Veiled Motion"
                className="input-base w-full mt-1.5"
              />
            </div>

            <div>
              <label className="label-base">Description Narrative *</label>
              <textarea
                required
                rows={2}
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder="e.g. A study in ethereal movement — where form meets emotion..."
                className="input-base w-full mt-1.5 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-base">Event Group *</label>
                <input
                  required
                  value={postEvent}
                  onChange={(e) => setPostEvent(e.target.value)}
                  placeholder="e.g. Inter-Club Hackathon"
                  className="input-base w-full mt-1.5"
                />
              </div>
              <div>
                <label className="label-base">Date *</label>
                <input
                  required
                  type="date"
                  value={postDate}
                  onChange={(e) => setPostDate(e.target.value)}
                  className="input-base w-full mt-1.5"
                />
              </div>
            </div>

            <div>
              <label className="label-base">Category</label>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value as any)}
                className="input-base w-full mt-1.5"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Social">Social</option>
              </select>
            </div>

            {/* Photo Selection Tabs */}
            <div className="border-t border-border-soft/60 pt-3">
              <label className="label-base block mb-2">Photo Source</label>
              <div className="flex gap-1.5 rounded-xl bg-cream-100/60 p-1 mb-3">
                {([
                  { id: 'presets', label: 'Presets', icon: Palette },
                  { id: 'device', label: 'Device', icon: Upload },
                  { id: 'url', label: 'URL', icon: Link2 }
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setUploadTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all duration-200 ${
                      uploadTab === tab.id ? 'bg-white text-navy shadow-sm' : 'text-ink-soft hover:text-navy'
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Presets */}
              {uploadTab === 'presets' && (
                <div className="grid grid-cols-3 gap-2">
                  {presetPhotos.map((url) => {
                    const isSelected = selectedPreset === url;
                    return (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setSelectedPreset(url)}
                        className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                          isSelected ? 'border-navy shadow-md ring-2 ring-navy/20' : 'border-border-soft hover:border-navy/40'
                        }`}
                      >
                        <img src={url} className="h-14 w-full object-cover" alt="Preset" />
                        {isSelected && (
                          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy shadow">
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab: Device Upload */}
              {uploadTab === 'device' && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                    isDragging
                      ? 'border-navy bg-navy/5 scale-[1.01]'
                      : 'border-border-soft bg-cream-100/30 hover:border-navy/45 hover:bg-cream-100/60'
                  }`}
                >
                  {uploadedPhoto ? (
                    <>
                      <img src={uploadedPhoto} alt="Uploaded" className="h-16 rounded-xl object-cover shadow-sm" />
                      <p className="text-xs font-semibold text-success">Image loaded!</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-navy" />
                      <div>
                        <p className="text-xs font-bold text-ink">Drag and drop file here</p>
                        <p className="text-[0.65rem] text-ink-soft">or click to browse device</p>
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                </div>
              )}

              {/* Tab: URL */}
              {uploadTab === 'url' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={customPhotoUrl}
                    onChange={(e) => setCustomPhotoUrl(e.target.value)}
                    placeholder="https://images.pexels.com/..."
                    className="input-base w-full"
                  />
                  {customPhotoUrl && (
                    <div className="overflow-hidden rounded-xl border border-border-soft/60">
                      <img src={customPhotoUrl} alt="URL preview" className="h-16 w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setIsPostOpen(false)}>Cancel</Button>
              <Button type="submit" leftIcon="Check">Post Photo</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
