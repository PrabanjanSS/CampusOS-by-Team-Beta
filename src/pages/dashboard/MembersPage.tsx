import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, UserX, UserCheck, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { Avatar } from '../../components/ui/Avatar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { mockClubMembers } from '../../utils/mockData';
import { MemberProfileModal } from '../../components/ui/MemberProfileModal';
import { Modal } from '../../components/ui/Modal';
import { CLUBS, YEARS } from '../../utils/constants';
import { Dropdown } from '../../components/ui/Dropdown';
import api from '../../services/api';

export default function MembersPage() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      // Check if user is in demo mode
      const isDemoMode = user?.id === 'demo';
      console.log('Members fetch - User ID:', user?.id, 'Is Demo Mode:', isDemoMode);

      if (isDemoMode) {
        // Use mock data for demo mode
        console.log('Using mock data for demo mode');
        const saved = localStorage.getItem('campusos_club_members');
        setMembers(saved ? JSON.parse(saved) : mockClubMembers);
        setLoading(false);
        return;
      }

      // For logged-in users, fetch from backend
      console.log('Fetching from backend for real user');
      try {
        const response = await api.get('/members');
        console.log('Backend members response:', response.data);
        if (response.data.success && response.data.members.length > 0) {
          // Transform backend data to match expected format
          const transformedData = response.data.members.map((item: any) => ({
            id: item._id || item.id,
            name: item.fullName || item.name || 'Unknown',
            email: item.email || '',
            role: item.role || 'Member',
            joinedDate: item.joinedDate || 'Jul 2026',
            club: item.club || 'General',
            year: item.year || '1st Year',
            points: item.points || 0,
            status: item.status || 'active',
            avatarUrl: item.profilePicture || '',
          }));
          console.log('Transformed members data:', transformedData);
          setMembers(transformedData);
        } else {
          // Backend returned empty
          console.log('Backend returned empty members data');
          setMembers([]);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
        // For real users, show empty state on error
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [user]);

  const [query, setQuery] = useState('');
  const [filterClub, setFilterClub] = useState('All');
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [club, setClub] = useState(CLUBS[0]);
  const [year, setYear] = useState(YEARS[1]);
  const [points, setPoints] = useState('0');

  const handleStatusToggle = async (id: string, name: string, currentStatus: string) => {
    const isDemoMode = user?.id === 'demo';
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';

    if (isDemoMode) {
      // Demo mode: update localStorage
      const updated = members.map((m: any) => (m.id === id ? { ...m, status: nextStatus } : m));
      setMembers(updated);
      localStorage.setItem('campusos_club_members', JSON.stringify(updated));
    } else {
      // Real user: update backend
      try {
        await api.put(`/members/${id}`, { status: nextStatus });
        const updated = members.map((m: any) => (m.id === id ? { ...m, status: nextStatus } : m));
        setMembers(updated);
      } catch (error) {
        console.error('Failed to update member status:', error);
        toast({
          title: 'Update Failed',
          description: 'Could not update member status. Please try again.',
          variant: 'error',
        });
        return;
      }
    }

    toast({
      title: 'Status Updated',
      description: `${name} has been ${nextStatus === 'active' ? 'activated' : 'deactivated'}.`,
      variant: nextStatus === 'active' ? 'success' : 'warning',
    });
  };

  const handleAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields.',
        variant: 'warning',
      });
      return;
    }

    const isDemoMode = user?.id === 'demo';
    const newMember = {
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      club: club.trim(),
      year,
      points: Number(points) || 0,
      status: 'active',
    };

    if (isDemoMode) {
      // Demo mode: add to localStorage
      const memberWithId = {
        ...newMember,
        id: 'm_' + Date.now(),
        joinedDate: 'Jul 2026',
        avatarUrl: undefined,
      };
      const updated = [memberWithId, ...members];
      setMembers(updated);
      localStorage.setItem('campusos_club_members', JSON.stringify(updated));

      // Pro-dev integration: Sync new member default profile into local registry
      const savedProfiles = localStorage.getItem('campusos_member_profiles');
      const profilesMap = savedProfiles ? JSON.parse(savedProfiles) : {};
      profilesMap[memberWithId.name] = {
        id: memberWithId.id,
        name: memberWithId.name,
        email: memberWithId.email,
        role: 'member',
        club: memberWithId.club,
        year: memberWithId.year,
        bio: `Active member of the ${memberWithId.club} contributing to campus activities and projects.`,
        avatarUrl: undefined,
        skills: ['React', 'UI/UX', 'Git'],
        achievements: [],
        badges: [{ id: 'b1', label: 'Active Member', color: '#19376D' }],
        certificates: []
      };
      localStorage.setItem('campusos_member_profiles', JSON.stringify(profilesMap));
    } else {
      // Real user: add to backend
      try {
        const response = await api.post('/members', newMember);
        const memberWithId = {
          ...newMember,
          id: response.data.member._id || response.data.member.id,
          joinedDate: response.data.member.joinedDate || 'Jul 2026',
          avatarUrl: response.data.member.profilePicture || '',
        };
        const updated = [memberWithId, ...members];
        setMembers(updated);
      } catch (error) {
        console.error('Failed to add member:', error);
        toast({
          title: 'Add Failed',
          description: 'Could not add member. Please try again.',
          variant: 'error',
        });
        return;
      }
    }

    // Reset Form
    setName('');
    setEmail('');
    setRole('Developer');
    setClub(CLUBS[0]);
    setYear(YEARS[1]);
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
    const matchesClub = filterClub === 'All' || m.club === filterClub;
    return matchesQuery && matchesClub;
  });

  const clubs = ['All', ...Array.from(new Set(members.map((m: any) => m.club)))];

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
            {clubs.map((club: any) => (
              <button
                key={club}
                onClick={() => setFilterClub(club)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 ${
                  filterClub === club
                    ? 'bg-navy text-white shadow-lift'
                    : 'bg-white text-ink-soft border border-border-soft hover:bg-cream-100/50'
                }`}
              >
                {club}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-ink-soft">Loading members...</div>
        </div>
      ) : (
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
                      <p>Club · <span className="font-semibold text-ink-soft">{m.club}</span></p>
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
      )}

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
                <label className="label-base font-semibold block mb-1.5">Club *</label>
                <Dropdown
                  value={club}
                  options={CLUBS.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                  onChange={setClub}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-base font-semibold block mb-1.5">Year *</label>
                <Dropdown
                  value={year}
                  options={YEARS.map((y) => ({ value: y, label: y }))}
                  onChange={setYear}
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
