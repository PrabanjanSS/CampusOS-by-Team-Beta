import { useState, useEffect, useMemo } from 'react';
import { Trophy, Award, Briefcase, CalendarDays, MapPin, Zap } from 'lucide-react';
import { Modal } from './Modal';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  year: string;
  club: string;
  bio: string;
  avatarUrl?: string;
  skills: string[];
  achievements: { id: string; title: string; description: string; date: string }[];
  badges: { id: string; label: string; color: string }[];
  certificates: { id: string; title: string; issuer: string; date: string; fileUrl?: string }[];
}

export const mockProfiles: Record<string, MemberProfile> = {
  'Aarav Mehta': {
    id: 'u_aarav',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@campusos.app',
    role: 'lead',
    department: 'Computer Science',
    year: '3rd Year',
    club: 'Developers Club',
    bio: 'Full-stack tinkerer and design enthusiast. Leading the Developers Club to ship student-built products that outlast a semester.',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    skills: ['React', 'TypeScript', 'UI/UX', 'Node.js', 'Figma', 'Public Speaking'],
    achievements: [
      { id: 'ac1', title: 'Won Inter-University Hackathon', description: '1st place out of 64 teams.', date: '2025-03-14' },
      { id: 'ac2', title: 'Organized 500+ attendee tech fest', description: 'Led logistics for InnovateFest.', date: '2025-04-22' },
    ],
    badges: [
      { id: 'b1', label: 'Top Contributor', color: '#19376D' },
      { id: 'b2', label: 'Event Organizer', color: '#DCC5A5' },
      { id: 'b3', label: 'Mentor', color: '#22C55E' },
      { id: 'b4', label: 'Hackathon Winner', color: '#F59E0B' },
    ],
    certificates: [
      { id: 'c1', title: 'Advanced React Patterns', issuer: 'Frontend Masters', date: '2025-02-01' },
      { id: 'c2', title: 'UX Research Foundations', issuer: 'NN/g', date: '2025-04-15' },
    ],
  },
  'Priya Sharma': {
    id: 'u_priya',
    name: 'Priya Sharma',
    email: 'priya.sharma@campusos.app',
    role: 'member',
    department: 'Computer Science',
    year: '2nd Year',
    club: 'Developers Club',
    bio: 'Frontend developer and open-source contributor. Passionate about building tools that make learning accessible for everyone.',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
    skills: ['React', 'TypeScript', 'Figma', 'Python', 'Git'],
    achievements: [
      { id: 'ac1', title: 'Best Project Award', description: 'Won best project at InnovateFest.', date: '2025-04-22' },
      { id: 'ac2', title: 'Active Contributor', description: 'Contributed to 5+ open-source club projects.', date: '2025-03-10' },
    ],
    badges: [
      { id: 'b1', label: 'Active Member', color: '#19376D' },
      { id: 'b2', label: 'Event Enthusiast', color: '#DCC5A5' },
      { id: 'b3', label: 'Code Contributor', color: '#22C55E' },
    ],
    certificates: [
      { id: 'c1', title: 'React Fundamentals', issuer: 'CampusOS Academy', date: '2025-01-15' },
    ],
  },
  'Diya Sharma': {
    id: 'u_diya_s',
    name: 'Diya Sharma',
    email: 'diya.sharma@campusos.app',
    role: 'member',
    department: 'Design & Architecture',
    year: '3rd Year',
    club: 'Design Club',
    bio: 'Visual designer focusing on design systems, human-computer interaction, and digital illustrations.',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Figma', 'Adobe XD', 'Illustrator', 'CSS', 'Typography'],
    achievements: [
      { id: 'ac1', title: 'UI Redesign Competition Winner', description: 'Placed 1st in the national website redesign challenge.', date: '2025-02-18' },
    ],
    badges: [
      { id: 'b1', label: 'Design Pioneer', color: '#8B5CF6' },
      { id: 'b2', label: 'Top Contributor', color: '#19376D' },
    ],
    certificates: [
      { id: 'c1', title: 'Google UX Design Professional', issuer: 'Coursera / Google', date: '2024-11-20' },
    ],
  },
  'Sara Khan': {
    id: 'u_sara',
    name: 'Sara Khan',
    email: 'sara.khan@campusos.app',
    role: 'member',
    department: 'Humanities',
    year: '2nd Year',
    club: 'Design Club',
    bio: 'Content strategist, creative writer and documentation lead. I bridge the gap between complex engineering and clear wording.',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Technical Writing', 'SEO', 'Creative Direction', 'Copywriting'],
    achievements: [
      { id: 'ac1', title: 'Top Author Badge', description: 'Published 10+ popular blogs and project logs.', date: '2025-05-02' },
    ],
    badges: [
      { id: 'b1', label: 'Active Member', color: '#19376D' },
      { id: 'b2', label: 'Wordsmith', color: '#EF4444' },
    ],
    certificates: [
      { id: 'c1', title: 'Inbound Marketing', issuer: 'HubSpot Academy', date: '2024-12-15' },
    ],
  },
  'Rohan Gupta': {
    id: 'u_rohan',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@campusos.app',
    role: 'member',
    department: 'Computer Science',
    year: '3rd Year',
    club: 'Robotics Club',
    bio: 'Embedded systems tinkerer, C++ fanatic, and hardware architect. Currently building the software backbone for autonomous micro-rovers.',
    avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['C++', 'Arduino', 'ROS', 'Python', 'PCB Design'],
    achievements: [
      { id: 'ac1', title: 'RoboQuest Runner Up', description: 'Placed 2nd in the regional autonomous rover race.', date: '2025-03-29' },
    ],
    badges: [
      { id: 'b1', label: 'Hardware Guru', color: '#F59E0B' },
      { id: 'b2', label: 'Code Contributor', color: '#22C55E' },
    ],
    certificates: [
      { id: 'c1', title: 'Introduction to Robotics', issuer: 'Coursera / Penn', date: '2025-01-20' },
    ],
  },
  'Kabir Nair': {
    id: 'u_kabir',
    name: 'Kabir Nair',
    email: 'kabir.nair@campusos.app',
    role: 'member',
    department: 'Computer Science',
    year: '3rd Year',
    club: 'Robotics Club',
    bio: 'Linux enthusiast, server administrator, and automation geek. Keeping the campus club build servers running with 99.9% uptime.',
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Docker', 'Linux', 'GitHub Actions', 'AWS', 'Python'],
    achievements: [
      { id: 'ac1', title: 'Uptime Champion', description: 'Maintained and migrated club infrastructure to Docker clusters.', date: '2025-04-12' },
    ],
    badges: [
      { id: 'b1', label: 'Cloud Contributor', color: '#1E3A8A' },
      { id: 'b2', label: 'Active Member', color: '#19376D' },
    ],
    certificates: [
      { id: 'c1', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024-10-15' },
    ],
  },
  'Diya Patel': {
    id: 'u_diya_p',
    name: 'Diya Patel',
    email: 'diya.patel@campusos.app',
    role: 'member',
    department: 'Design & Architecture',
    year: '2nd Year',
    club: 'Design Club',
    bio: 'Aspiring product designer. Focuse on visual assets, color theory, and prototyping micro-animations in Figma.',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Figma', 'Prototyping', 'User Research', 'Sketch'],
    achievements: [
      { id: 'ac1', title: 'Dribbble Feature', description: 'Featured design layout on Dribbble community page.', date: '2025-01-30' },
    ],
    badges: [
      { id: 'b1', label: 'Design Maverick', color: '#EC4899' },
      { id: 'b2', label: 'Active Member', color: '#19376D' },
    ],
    certificates: [
      { id: 'c1', title: 'Figma Advanced Prototyping', issuer: 'DesignLab', date: '2024-09-12' },
    ],
  },
  'Ananya Reddy': {
    id: 'u_ananya',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@campusos.app',
    role: 'member',
    department: 'Computer Science',
    year: '3rd Year',
    club: 'Developers Club',
    bio: 'Product manager and event enthusiast. Love organizing hackathons, panel discussions, and aligning developers to goals.',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Product Management', 'Agile', 'Jira', 'Public Relations'],
    achievements: [
      { id: 'ac1', title: 'InnovateFest Lead Planner', description: 'Managed coordination and speaker lineup for 500+ attendees.', date: '2025-04-22' },
    ],
    badges: [
      { id: 'b1', label: 'Super Organizer', color: '#10B981' },
      { id: 'b2', label: 'Event Enthusiast', color: '#DCC5A5' },
    ],
    certificates: [
      { id: 'c1', title: 'Certified Scrum Master', issuer: 'Scrum Alliance', date: '2024-11-05' },
    ],
  },
  'Vikram Pai': {
    id: 'u_vikram',
    name: 'Vikram Pai',
    email: 'vikram.pai@campusos.app',
    role: 'member',
    department: 'Humanities',
    year: '4th Year',
    club: 'Debate Society',
    bio: 'President of the Debate Society. Fostering structured public speaking, logic validation, and rhetorical debate.',
    avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Public Speaking', 'Critical Thinking', 'Leadership', 'Political Science'],
    achievements: [
      { id: 'ac1', title: 'National Debating Championship Winner', description: 'Placed 1st overall in varsity team debates.', date: '2025-02-10' },
    ],
    badges: [
      { id: 'b1', label: 'Golden Tongue', color: '#F59E0B' },
      { id: 'b2', label: 'Top Leader', color: '#1E3A8A' },
    ],
    certificates: [
      { id: 'c1', title: 'Rhetoric & Logic Foundations', issuer: 'HarvardX', date: '2024-07-28' },
    ],
  },
  'Meera Joshi': {
    id: 'u_meera_j',
    name: 'Meera Joshi',
    email: 'meera.joshi@campusos.app',
    role: 'member',
    department: 'Computer Science',
    year: '2nd Year',
    club: 'Developers Club',
    bio: 'Software engineer focusing on Python scripting, web automation, and competitive programming.',
    avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    skills: ['Python', 'Django', 'SQL', 'Algorithms'],
    achievements: [
      { id: 'ac1', title: 'Leetcode 500 club', description: 'Solved 500+ data structures and algorithm questions.', date: '2025-03-12' },
    ],
    badges: [
      { id: 'b1', label: 'Algorithm Master', color: '#10B981' },
      { id: 'b2', label: 'Code Contributor', color: '#22C55E' },
    ],
    certificates: [
      { id: 'c1', title: 'Data Structures and Algorithms', issuer: 'Coursera / Stanford', date: '2024-09-02' },
    ],
  },
};

const defaultProfile = (name: string): MemberProfile => ({
  id: 'u_def_' + Date.now(),
  name,
  email: name.toLowerCase().replace(' ', '.') + '@campusos.app',
  role: 'member',
  department: 'Computer Science',
  year: '2nd Year',
  club: 'Developers Club',
  bio: 'Active member contributing to campus club projects and volunteering for events.',
  skills: ['React', 'UI/UX', 'Git'],
  achievements: [],
  badges: [{ id: 'b1', label: 'Active Member', color: '#19376D' }],
  certificates: [],
});

interface Props {
  memberName: string | null;
  onClose: () => void;
}

export function MemberProfileModal({ memberName, onClose }: Props) {
  useEffect(() => {
    // Sync/initialize profiles map in local storage
    const saved = localStorage.getItem('campusos_member_profiles');
    if (!saved) {
      localStorage.setItem('campusos_member_profiles', JSON.stringify(mockProfiles));
    }
  }, []);

  const profile = useMemo(() => {
    if (!memberName) return null;
    const saved = localStorage.getItem('campusos_member_profiles');
    const currentProfiles = saved ? JSON.parse(saved) : mockProfiles;
    return (currentProfiles[memberName] || defaultProfile(memberName)) as MemberProfile;
  }, [memberName]);

  const [activeAchievement, setActiveAchievement] = useState<any>(null);
  const [activeCertificate, setActiveCertificate] = useState<any>(null);

  if (!profile) return null;

  return (
    <Modal
      open={!!memberName}
      onClose={onClose}
      title=""
      description=""
      size="lg"
    >
      <div className="-m-6 overflow-hidden bg-cream/35">
        {/* Cover image area */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-r from-navy via-navy-600 to-navy-400">
          <div className="absolute inset-0 bg-navy-radial opacity-60" />
        </div>

        {/* Profile Info Card Area */}
        <div className="relative px-6 pb-6 pt-4 bg-white border-t border-border-soft">
          {/* Avatar floating exactly above the divider line */}
          <div className="-mt-16 relative z-10 flex justify-center sm:justify-start">
            <Avatar name={profile.name} src={profile.avatarUrl} size="xl" ring className="shadow-lift ring-4 ring-white" />
          </div>

          {/* Text fully inside the white section (100% readable) */}
          <div className="mt-3 text-center sm:text-left space-y-1">
            <h1 className="text-xl font-bold text-ink sm:text-2xl">{profile.name}</h1>
            <p className="text-sm text-ink-soft">{profile.email}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge tone="navy" dot>{profile.role}</Badge>
              <Badge tone="sand">{profile.club}</Badge>
              <Badge tone="neutral">{profile.department}</Badge>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm leading-relaxed text-ink-soft text-center sm:text-left">
            {profile.bio}
          </p>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-ink-soft border-t border-border-soft/60 pt-4">
            <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {profile.department}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {profile.year}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {profile.club}</span>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto">
          {/* Badges strips */}
          {profile.badges.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-ink-soft uppercase tracking-wider">Badges Collection</h3>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-soft"
                    style={{ backgroundColor: b.color }}
                  >
                    <Award className="h-3.5 w-3.5" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-ink-soft uppercase tracking-wider">Skills Portfolio</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-lg border border-border-soft bg-cream-100/50 px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    <Zap className="h-3 w-3 text-navy" /> {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {profile.achievements.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-ink-soft uppercase tracking-wider">Milestones & Achievements</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {profile.achievements.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setActiveAchievement(a)}
                    className="rounded-xl border border-border-soft bg-white p-3 cursor-pointer transition hover:bg-cream-100/40 hover:border-navy/20 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-navy shrink-0" />
                      <span className="text-[10px] text-ink-soft">{a.date}</span>
                    </div>
                    <p className="mt-2 text-xs font-bold text-ink line-clamp-1">{a.title}</p>
                    <p className="text-[11px] text-ink-soft line-clamp-2 mt-0.5">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {profile.certificates.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-ink-soft uppercase tracking-wider">Verified Certificates</h3>
              <div className="space-y-2">
                {profile.certificates.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setActiveCertificate(c)}
                    className="flex items-center gap-2.5 rounded-xl border border-border-soft bg-white p-2.5 cursor-pointer transition hover:bg-cream-100/40 hover:border-navy/20 text-left"
                  >
                    <Award className="h-4 w-4 text-success shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-ink line-clamp-1">{c.title}</p>
                      <p className="text-[10px] text-ink-soft">{c.issuer} · {c.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border-soft bg-white px-6 py-4 flex justify-end">
          <Button variant="secondary" className="w-full sm:w-auto" onClick={onClose}>
            Close Profile
          </Button>
        </div>
      </div>

      {/* Sub-modals for details */}
      {activeAchievement && (
        <Modal
          open={!!activeAchievement}
          onClose={() => setActiveAchievement(null)}
          title="Achievement Details"
          description="Milestone earned through platform contributions"
          size="md"
        >
          <div className="text-center space-y-4 py-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/10 text-navy">
              <Trophy className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">{activeAchievement.title}</h3>
              <p className="text-xs text-ink-soft mt-1">Earned on {activeAchievement.date}</p>
            </div>
            <p className="text-sm text-ink-soft/90 leading-relaxed bg-cream-100/55 p-4 rounded-xl border border-border-soft">
              {activeAchievement.description}
            </p>
            <div className="flex justify-end pt-2">
              <Button variant="secondary" className="w-full" onClick={() => setActiveAchievement(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {activeCertificate && (
        <Modal
          open={!!activeCertificate}
          onClose={() => setActiveCertificate(null)}
          title="Certificate Details"
          description="Verified certificate details"
          size="md"
        >
          <div className="text-center space-y-4 py-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">{activeCertificate.title}</h3>
              <p className="text-xs text-ink-soft mt-1">Issued by {activeCertificate.issuer}</p>
              <p className="text-xs text-ink-soft/70 mt-0.5">Date: {activeCertificate.date}</p>
            </div>
            {activeCertificate.fileUrl && (
              <div className="mt-2 overflow-hidden rounded-xl border border-border-soft/70 bg-cream-100/30 p-1">
                <img src={activeCertificate.fileUrl} alt="Certificate Document" className="w-full h-auto max-h-72 object-contain rounded-lg" />
              </div>
            )}
            <div className="text-xs text-left text-ink-soft/80 bg-cream-100/55 p-4 rounded-xl border border-border-soft space-y-2">
              <p><span className="font-semibold text-ink">Credential ID:</span> UC-{activeCertificate.id.toUpperCase()}-{Math.floor(Math.random() * 800000 + 100000)}</p>
              <p><span className="font-semibold text-ink">Status:</span> <span className="text-success font-bold">✓ Verified Active</span></p>
              <p className="pt-1 text-[11px] leading-relaxed">This certificate verifies successful completion of the requirements and peer-review checks within the CampusOS ecosystem.</p>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="secondary" className="w-full" onClick={() => setActiveCertificate(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
