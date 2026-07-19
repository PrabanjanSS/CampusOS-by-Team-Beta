import { useState, useRef } from 'react';

import { User, Bell, Shield, Check, Upload, Link2, Image } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Avatar } from '../../components/ui/Avatar';

import { FadeIn } from '../../components/ui/motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/ui/Modal';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const presetAvatars = [
  { name: 'Alex', url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Priya', url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Rohan', url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Sara', url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Arjun', url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Nisha', url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
];

type AvatarTab = 'preset' | 'upload' | 'url';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [active, setActive] = useState('profile');
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false, mentions: true });
  

  // Avatar state
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatarTab, setAvatarTab] = useState<AvatarTab>('preset');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarUrl ?? '');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveProfile = () => {
    updateUser({ name, email });
    toast({ title: 'Settings saved', variant: 'success' });
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', variant: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Image must be under 5MB', variant: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedPreview(result);
      setSelectedAvatar(result);
      setCustomAvatarUrl('');
    };
    reader.readAsDataURL(file);
  };

  const saveAvatar = () => {
    const url = avatarTab === 'url' ? customAvatarUrl : avatarTab === 'upload' ? uploadedPreview : selectedAvatar;
    if (url) {
      updateUser({ avatarUrl: url });
      toast({ title: 'Profile picture updated', variant: 'success' });
    }
    setAvatarOpen(false);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: 'Please fill in all password fields', variant: 'error' });
      return;
    }
    const savedPassword = localStorage.getItem('campusos_password_' + user?.email) || 'password';
    if (currentPassword !== savedPassword) {
      toast({ title: 'Current password is incorrect', variant: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'New password must be at least 6 characters', variant: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'error' });
      return;
    }
    localStorage.setItem('campusos_password_' + user?.email, newPassword);
    toast({ title: 'Password updated successfully', variant: 'success' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Compute the active preview for the avatar modal
  const activePreview = avatarTab === 'url' ? (customAvatarUrl || user?.avatarUrl || '') : avatarTab === 'upload' ? (uploadedPreview || user?.avatarUrl || '') : (selectedAvatar || user?.avatarUrl || '');

  const avatarTabs: { id: AvatarTab; label: string; icon: typeof Upload }[] = [
    { id: 'preset', label: 'Presets', icon: Image },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'url', label: 'URL', icon: Link2 },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-ink-soft">Manage your account and preferences.</p>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tabs */}
        <FadeIn delay={0.06}>
          <nav className="flex gap-1.5 overflow-x-auto lg:flex-col">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active === s.id ? 'bg-navy text-white shadow-soft' : 'text-ink-soft hover:bg-cream-200 hover:text-navy'
                }`}
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </button>
            ))}
          </nav>
        </FadeIn>

        {/* Content */}
        <div className="space-y-6">
          {active === 'profile' && (
            <FadeIn delay={0.08}>
              <Card>
                <CardHeader title="Profile Information" subtitle="Update your personal details" />
                <div className="flex items-center gap-4">
                  <Avatar name={user?.name ?? 'User'} src={user?.avatarUrl} size="lg" />
                  <div>
                    <Button variant="secondary" size="sm" leftIcon="Upload" onClick={() => { setSelectedAvatar(user?.avatarUrl ?? ''); setCustomAvatarUrl(''); setUploadedPreview(''); setAvatarTab('preset'); setAvatarOpen(true); }}>Change photo</Button>
                    <p className="mt-1.5 text-xs text-ink-soft">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input label="Department" defaultValue={user?.department} disabled />
                  {user?.role === 'faculty' ? (
                    <Input label="Designation" defaultValue={user?.designation ?? 'Faculty Coordinator'} disabled />
                  ) : (
                    <Input label="Year" defaultValue={user?.year} disabled />
                  )}
                </div>
                <div className="mt-5 flex justify-end">
                  <Button onClick={saveProfile} leftIcon="Check">Save changes</Button>
                </div>
              </Card>
            </FadeIn>
          )}

          {active === 'notifications' && (
            <FadeIn delay={0.08}>
              <Card>
                <CardHeader title="Notification Preferences" subtitle="Choose what you want to hear about" />
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
                    { key: 'push', label: 'Push notifications', desc: 'Get alerts in real time' },
                    { key: 'weekly', label: 'Weekly digest', desc: 'A summary of activity every Monday' },
                    { key: 'mentions', label: 'Mentions', desc: 'When someone mentions you' },
                  ].map((n) => (
                    <div key={n.key} className="flex items-center justify-between border-b border-border-soft pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-semibold text-ink">{n.label}</p>
                        <p className="text-xs text-ink-soft">{n.desc}</p>
                      </div>
                      <Checkbox
                        checked={notif[n.key as keyof typeof notif]}
                        onChange={(v) => setNotif((prev) => ({ ...prev, [n.key]: v }))}
                      />
                      
                      

                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          )}
          {active === 'security' && (
  <FadeIn delay={0.08}>
    <Card className="w-full">
      <CardHeader
        title="Security"
        subtitle="Keep your account safe"
      />

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div className="md:col-span-2">
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 border-t border-border pt-6">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card-surface p-4">
            <div>
              <h4 className="font-semibold text-ink">
                Two-Factor Authentication
              </h4>
              <p className="mt-1 text-sm text-ink-soft">
                Add an extra layer of security to your account.
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            leftIcon="Check"
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </div>

      </div>
    </Card>
  </FadeIn>
)}
          

          
          
        </div>
        
      </div>

      {/* ── Avatar Modal ── */}
      <Modal
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        title="Update profile picture"
        description="Choose from presets, upload from device, or paste a URL"
        size="md"
      >
        {/* Live preview */}
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-border-soft/60 bg-cream-100/40 p-4">
          <div className="relative">
            <Avatar name={user?.name ?? 'User'} src={activePreview || undefined} size="xl" ring />
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white shadow">
              <Check className="h-3 w-3" />
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{user?.name}</p>
            <p className="text-xs text-ink-soft">{activePreview ? 'New photo selected' : 'No photo selected yet'}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mb-4 flex gap-1.5 rounded-xl bg-cream-100/60 p-1">
          {avatarTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAvatarTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all duration-200 ${
                avatarTab === tab.id
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-ink-soft hover:text-navy'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {avatarTab === 'preset' && (
          <div className="grid grid-cols-3 gap-3">
            {presetAvatars.map((av) => (
              <button
                key={av.name}
                type="button"
                onClick={() => { setSelectedAvatar(av.url); setUploadedPreview(''); setCustomAvatarUrl(''); }}
                className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 p-3 transition-all duration-200 ${
                  selectedAvatar === av.url && avatarTab === 'preset'
                    ? 'border-navy bg-navy/5 shadow-md'
                    : 'border-border-soft hover:border-navy/30 hover:bg-cream-100/60'
                }`}
              >
                {selectedAvatar === av.url && avatarTab === 'preset' && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
                <Avatar name={av.name} src={av.url} size="md" />
                <span className="text-[0.7rem] font-semibold text-ink-soft">{av.name}</span>
              </button>
            ))}
          </div>
        )}

        {avatarTab === 'upload' && (
          <div className="space-y-3">
            {/* Drag-drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-navy bg-navy/5 scale-[1.01]'
                  : 'border-border-soft bg-cream-100/30 hover:border-navy/40 hover:bg-cream-100/60'
              }`}
            >
              {uploadedPreview ? (
                <>
                  <img src={uploadedPreview} alt="Preview" className="h-20 w-20 rounded-full object-cover shadow-md ring-2 ring-navy/20" />
                  <p className="text-xs font-semibold text-success">Image uploaded!</p>
                  <p className="text-xs text-ink-soft">Click to change</p>
                </>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/8 text-navy">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">Drop your photo here</p>
                    <p className="mt-0.5 text-xs text-ink-soft">or click to browse from device</p>
                  </div>
                  <p className="text-[0.7rem] text-ink-soft/60">JPG, PNG, GIF up to 5 MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            />
            {uploadedPreview && (
              <Button variant="secondary" size="sm" onClick={() => { setUploadedPreview(''); setSelectedAvatar(''); }} className="w-full">
                Remove photo
              </Button>
            )}
          </div>
        )}

        {avatarTab === 'url' && (
          <div className="space-y-3">
            <div>
              <label className="label-base">Paste image URL</label>
              <input
                type="text"
                className="input-base w-full"
                placeholder="https://example.com/my-photo.jpg"
                value={customAvatarUrl}
                onChange={(e) => { setCustomAvatarUrl(e.target.value); setUploadedPreview(''); }}
              />
            </div>
            {customAvatarUrl && (
              <div className="overflow-hidden rounded-2xl border border-border-soft/60">
                <img
                  src={customAvatarUrl}
                  alt="URL preview"
                  className="h-36 w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = ''; }}
                />
              </div>
            )}
            <p className="text-xs text-ink-soft">Enter a direct link to any publicly accessible image.</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setAvatarOpen(false)}>Cancel</Button>
          <Button className="flex-1" leftIcon="Check" onClick={saveAvatar}>Save picture</Button>
        </div>
      </Modal>
    </div>
  );
}
