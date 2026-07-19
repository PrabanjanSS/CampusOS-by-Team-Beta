import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, UserX, UserCheck, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { Avatar } from '../../components/ui/Avatar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useToast } from '../../context/ToastContext';
import { mockClubMembers } from '../../utils/mockData';
import { MemberProfileModal } from '../../components/ui/MemberProfileModal';
import { Modal } from '../../components/ui/Modal';
import { DEPARTMENTS, YEARS } from '../../utils/constants';
import { Dropdown } from '../../components/ui/Dropdown';

export default function MembersPage() {
  const { toast } = useToast();

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('campusos_club_members');
    return saved ? JSON.parse(saved) : mockClubMembers;
  });

  const [query, setQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [year, setYear] = useState(YEARS[1]); // e.g. 2nd Year
  const [club, setClub] = useState('Developers Club');
  const [points, setPoints] = useState('0');

  const handleStatusToggle = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const updated = members.map((m: any) => (m.id === id ? { ...m, status: nextStatus } : m));
    setMembers(updated);
    localStorage.setItem('campusos_club_members', JSON.stringify(updated));

    toast({
      title: 'Status Updated',
      description: `${name} has been ${nextStatus === 'active' ? 'activated' : 'deactivated'}.`,
      variant: nextStatus === 'active' ? 'success' : 'warning',
    });
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields.',
        variant: 'warning',
      });
      return;
    }

    const newMember = {
      id: 'm_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      joinedDate: 'Jul 2026',
      department,
      year,
      club: club.trim(),
      points: Number(points) || 0,
      status: 'active',
      avatarUrl: undefined
    };

    const updated = [newMember, ...members];
    setMembers(updated);
    localStorage.setItem('campusos_club_members', JSON.stringify(updated));

    // Pro-dev integration: Sync new member default profile into local registry
    const savedProfiles = localStorage.getItem('campusos_member_profiles');
    const profilesMap = savedProfiles ? JSON.parse(savedProfiles) : {};
    profilesMap[newMember.name] = {
      id: newMember.id,
      name: newMember.name,
      email: newMember.email,
      role: 'member',
      department: newMember.department,
      year: newMember.year,
      club: newMember.club,
      bio: `Active member of the ${newMember.club} contributing to campus activities and projects.`,
      avatarUrl: undefined,
      skills: ['React', 'UI/UX', 'Git'],
      achievements: [],
      badges: [{ id: 'b1', label: 'Active Member', color: '#19376D' }],
      certificates: []
    };
    localStorage.setItem('campusos_member_profiles', JSON.stringify(profilesMap));

    // Reset Form
    setName('');
    setEmail('');
    setRole('Developer');
    setDepartment(DEPARTMENTS[0]);
    setYear(YEARS[1]);
    setClub('Developers Club');
    setPoints('0');
    setIsAddMemberOpen(false);

    toast({
      title: 'Member Added!',
      description: `${newMember.name} has been enrolled successfully.`,
      variant: 'success',
    });
  };

  const filtered = members.filter((m: any) => {
    const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.role.toLowerCase().includes(query.toLowerCase());
    const matchesDept = filterDept === 'All' || m.department === filterDept;
    return matchesQuery && matchesDept;
  });

  const depts = ['All', ...Array.from(new Set(members.map((m: any) => m.department)))];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Club Members</h1>
            <p className="mt-1.5 text-sm text-ink-soft">Review and coordinate student membership details, roles, and status.</p>
          </div>
          <Button leftIcon="Plus" onClick={() => setIsAddMemberOpen(true)} magnetic>Add Member</Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2">
          <SearchBar value={query} onChange={setQuery} placeholder="Search members by name or role…" className="w-full md:max-w-sm" />
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {depts.map((dept: any) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 ${
                  filterDept === dept
                    ? 'bg-navy text-white shadow-lift'
                    : 'bg-white text-ink-soft border border-border-soft hover:bg-cream-100/50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((m: any) => (
            <StaggerItem key={m.id}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => setSelectedMemberName(m.name)}
                className="card-surface p-6 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lift cursor-pointer hover:border-navy/20 bg-white/70"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Avatar name={m.name} src={m.avatarUrl} size="lg" ring />
                    <Badge tone={m.status === 'active' ? 'success' : 'neutral'}>
                      {m.status}
                    </Badge>
                  </div>
                  <div className="mt-4 text-left">
                    <h3 className="text-base font-bold text-ink leading-snug">{m.name}</h3>
                    <p className="text-sm font-medium text-navy/80 mt-0.5">{m.role}</p>
                    <div className="mt-3 space-y-1 text-xs text-ink-soft/80">
                      <p>Joined · <span className="font-semibold text-ink-soft">{m.joinedDate}</span></p>
                      <p>Department · <span className="font-semibold text-ink-soft">{m.department}</span></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border-soft/60 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4.5 w-4.5 text-navy" />
                    <span className="text-sm font-bold text-navy">{m.points} points</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(m.id, m.name, m.status);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl border border-border-soft transition-all duration-200 hover:bg-cream-100 ${
                      m.status === 'active' ? 'text-danger hover:border-danger/40 hover:bg-danger/5' : 'text-success hover:border-success/40 hover:bg-success/5'
                    }`}
                  >
                    {m.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft p-12 text-center bg-white/50 col-span-3">
            <AlertCircle className="h-8 w-8 text-ink-soft/40" />
            <p className="mt-2 text-sm font-semibold text-ink">No members found</p>
            <p className="text-xs text-ink-soft">Adjust filters or search parameters.</p>
          </div>
        )}
      </StaggerGroup>

      <MemberProfileModal
        memberName={selectedMemberName}
        onClose={() => setSelectedMemberName(null)}
      />

      {/* Add Member Modal */}
      {isAddMemberOpen && (
        <Modal
          open={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          title="Enroll New Member"
          description="Create a membership record and directory card"
          size="lg"
        >
          <form onSubmit={handleAddMemberSubmit} className="space-y-4 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base">Student Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="input-base w-full mt-1.5"
                />
              </div>

              <div>
                <label className="label-base">Campus Email Address *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john.doe@university.edu"
                  className="input-base w-full mt-1.5"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base">Role / Title *</label>
                <input
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Backend Developer"
                  className="input-base w-full mt-1.5"
                />
              </div>

              <div>
                <label className="label-base font-semibold block mb-1.5">Department *</label>
                <Dropdown
                  value={department}
                  options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                  onChange={setDepartment}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label-base font-semibold block mb-1.5">Year *</label>
                <Dropdown
                  value={year}
                  options={YEARS.map((y) => ({ value: y, label: y }))}
                  onChange={setYear}
                />
              </div>

              <div>
                <label className="label-base">Club Name *</label>
                <input
                  required
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="input-base w-full mt-1.5"
                />
              </div>

              <div>
                <label className="label-base">Initial Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="input-base w-full mt-1.5"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
              <Button type="submit" leftIcon="Check">Add Member</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
