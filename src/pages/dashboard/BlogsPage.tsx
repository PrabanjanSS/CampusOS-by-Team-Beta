import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, PenLine, ArrowLeft, Image as ImageIcon, Check, Upload } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { mockBlogPosts } from '../../utils/mockData';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';

const presetCovers = [
  'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800'
];

export default function BlogsPage() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('campusos_blogs');
    return saved ? JSON.parse(saved) : mockBlogPosts;
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState(presetCovers[0]);
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [deviceCoverUrl, setDeviceCoverUrl] = useState('');
  const [coverType, setCoverType] = useState<'presets' | 'custom' | 'device'>('presets');

  const handleWritePost = () => {
    setIsCreateOpen(true);
  };

  const handleSubmitBlog = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields.',
        variant: 'warning',
      });
      return;
    }

    const finalCover =
      coverType === 'presets'
        ? coverUrl
        : coverType === 'custom'
        ? customCoverUrl
        : deviceCoverUrl;

    if (!finalCover.trim()) {
      toast({
        title: 'Cover Image Required',
        description: 'Please pick a cover image preset, upload one, or enter a URL.',
        variant: 'warning',
      });
      return;
    }

    // Pro-dev feature: auto-calculate read time
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 200));
    const readTime = `${minutes} min`;

    const newPost = {
      id: 'bl_' + Date.now(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover: finalCover.trim(),
      author: user?.name || 'Guest Contributor',
      date: 'Just now',
      readTime,
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('campusos_blogs', JSON.stringify(updated));

    // Reset Form
    setTitle('');
    setExcerpt('');
    setContent('');
    setCoverUrl(presetCovers[0]);
    setCustomCoverUrl('');
    setDeviceCoverUrl('');
    setCoverType('presets');
    setIsCreateOpen(false);

    toast({
      title: 'Article Published!',
      description: 'Your blog post has been shared successfully.',
      variant: 'success',
    });
  };

  if (selectedPost) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <FadeIn>
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-navy transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </button>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="card-surface overflow-hidden">
            <img src={selectedPost.cover} alt="" className="h-64 sm:h-96 w-full object-cover" />
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-2">
                <Badge tone="navy">{selectedPost.readTime}</Badge>
                <span className="text-xs text-ink-soft">{selectedPost.date}</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {selectedPost.title}
              </h1>
              <div className="mt-4 flex items-center gap-2.5 border-b border-border-soft pb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy font-bold text-sm">
                  {selectedPost.author[0]}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{selectedPost.author}</p>
                  <p className="text-xs text-ink-soft">Contributor</p>
                </div>
              </div>

              <div className="mt-6 space-y-6 text-base text-ink-soft/90 leading-relaxed text-left">
                <p className="text-lg font-medium text-ink leading-relaxed">
                  {selectedPost.excerpt}
                </p>
                {selectedPost.content ? (
                  <p className="whitespace-pre-line leading-relaxed">{selectedPost.content}</p>
                ) : (
                  <>
                    <p>
                      First and foremost, community-driven platforms succeed when they prioritize user experience above all else. In student organisations, the challenges are twofold: high turnover rates as senior students graduate, and varying technical expertise among new recruits. Having a solid design system and documentation in place mitigates these risks, making onboarding seamless.
                    </p>
                    <p>
                      Furthermore, treating our operations like product cycles helps structure the workflows. Instead of ad-hoc events, staging milestones with clear deliverables guarantees consistency. When team members have clear ownership, motivation naturally increases, leading to a much higher retention and contribution rate.
                    </p>
                    <p>
                      Lastly, we encourage cross-departmental collaboration. Designers, developers, and writers should not operate in silos. Regular syncs, open-source designs, and collaborative workshops foster a culture of shared learning and innovation. By building this foundation, we ensure the club thrives for years to come.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Blogs</h1>
            <p className="mt-1 text-sm text-ink-soft">Stories, guides, and insights from the community.</p>
          </div>
          <Button leftIcon="Plus" onClick={handleWritePost} magnetic>Write Post</Button>
        </div>
      </FadeIn>

      {/* Featured */}
      {posts.length > 0 && (
        <FadeIn delay={0.08}>
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setSelectedPost(posts[0])}
            className="card-surface overflow-hidden transition-shadow hover:shadow-lift cursor-pointer bg-white/70"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 overflow-hidden bg-navy md:h-auto">
                <img src={posts[0].cover} alt="" className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4">
                  <Badge tone="navy" dot>Featured</Badge>
                </div>
              </div>
              <div className="p-6 sm:p-8 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6d3b]">Editor's pick</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">{posts[0].title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{posts[0].excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">{posts[0].author}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {posts[0].readTime}</span>
                  <span>·</span>
                  <span>{posts[0].date}</span>
                </div>
                <Button
                  variant="secondary"
                  className="mt-5"
                  rightIcon="ArrowRight"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(posts[0]);
                  }}
                >
                  Read article
                </Button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      )}

      {/* Grid */}
      <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(1).map((post: any) => (
          <StaggerItem key={post.id}>
            <motion.article
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPost(post)}
              className="card-surface overflow-hidden transition-shadow hover:shadow-lift cursor-pointer flex flex-col h-full bg-white/70"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={post.cover} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute left-3 top-3">
                  <Badge tone="sand">{post.readTime}</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-base font-semibold leading-snug text-ink">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.excerpt}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink">
                    <PenLine className="h-3.5 w-3.5 text-navy" /> {post.author}
                  </span>
                  <span className="text-xs text-ink-soft">{post.date}</span>
                </div>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Write Post Modal */}
      {isCreateOpen && (
        <Modal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Compose New Article"
          description="Publish a guide or insight to the campus community"
          size="lg"
        >
          <form onSubmit={handleSubmitBlog} className="space-y-4 text-left">
            <div>
              <label className="label-base">Article Title *</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Navigating design sprints"
                className="input-base w-full mt-1.5"
              />
            </div>

            <div>
              <label className="label-base">Excerpt Summary *</label>
              <textarea
                required
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="e.g. A quick guide on aligning design expectations across developers..."
                className="input-base w-full mt-1.5 resize-none"
              />
            </div>

            {/* Cover photo selectors */}
            <div className="border-t border-border-soft/60 pt-3">
              <label className="label-base block mb-2">Cover Image Source</label>
              <div className="flex gap-1.5 rounded-xl bg-cream-100/60 p-1 mb-3">
                <button
                  type="button"
                  onClick={() => setCoverType('presets')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition ${
                    coverType === 'presets' ? 'bg-white text-navy shadow-sm' : 'text-ink-soft hover:text-navy'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" /> Presets
                </button>
                <button
                  type="button"
                  onClick={() => setCoverType('custom')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition ${
                    coverType === 'custom' ? 'bg-white text-navy shadow-sm' : 'text-ink-soft hover:text-navy'
                  }`}
                >
                  <PenLine className="h-3.5 w-3.5" /> Custom URL
                </button>
                <button
                  type="button"
                  onClick={() => setCoverType('device')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition ${
                    coverType === 'device' ? 'bg-white text-navy shadow-sm' : 'text-ink-soft hover:text-navy'
                  }`}
                >
                  <Upload className="h-3.5 w-3.5" /> Device
                </button>
              </div>

              {coverType === 'presets' ? (
                <div className="grid grid-cols-5 gap-2">
                  {presetCovers.map((url) => {
                    const isSelected = coverUrl === url;
                    return (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setCoverUrl(url)}
                        className={`group relative overflow-hidden rounded-xl border-2 transition ${
                          isSelected ? 'border-navy shadow-md ring-2 ring-navy/20' : 'border-border-soft hover:border-navy/40'
                        }`}
                      >
                        <img src={url} className="h-10 w-full object-cover" alt="Preset" />
                        {isSelected && (
                          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy shadow">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : coverType === 'custom' ? (
                <input
                  type="text"
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  placeholder="https://images.pexels.com/..."
                  className="input-base w-full"
                />
              ) : (
                <div className="space-y-3">
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-soft bg-cream-100/20 px-4 py-5 text-center transition hover:bg-cream-100/40 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDeviceCoverUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <Upload className="mx-auto h-7 w-7 text-navy/40 mb-1" />
                    <p className="text-xs font-bold text-ink">Click or drag image to upload</p>
                    <p className="text-[9px] text-ink-soft/70">PNG, JPG, or WEBP up to 5MB</p>
                  </div>
                  {deviceCoverUrl && (
                    <div className="relative h-20 w-full overflow-hidden rounded-xl border border-border-soft">
                      <img src={deviceCoverUrl} className="h-full w-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="label-base">Article Content *</label>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article paragraphs here..."
                className="input-base w-full mt-1.5 resize-none leading-relaxed"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" leftIcon="Check">Publish Article</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
