import { CalendarEvent } from '../types/calendar';

// Helper to generate dynamic dates for testing
const getDynamicDate = (dayOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().split('T')[0];
};

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'c1',
    title: 'Product Launch Announcement',
    date: getDynamicDate(0), // Today
    time: '10:00 AM',
    platformId: 'instagram',
    status: 'published',
    contentType: 'post'
  },
  {
    id: 'c2',
    title: 'Company Update',
    date: getDynamicDate(0), // Today
    time: '02:30 PM',
    platformId: 'linkedin',
    status: 'scheduled',
    contentType: 'post'
  },
  {
    id: 'c3',
    title: 'Weekly Tips Reel',
    date: getDynamicDate(2), // +2 days
    time: '04:00 PM',
    platformId: 'instagram',
    status: 'scheduled',
    contentType: 'reel'
  },
  {
    id: 'c4',
    title: 'Behind the Scenes',
    date: getDynamicDate(2), // +2 days
    time: '06:00 PM',
    platformId: 'tiktok',
    status: 'draft',
    contentType: 'video'
  },
  {
    id: 'c5',
    title: 'Throwback Thursday',
    date: getDynamicDate(-3), // -3 days
    time: '09:00 AM',
    platformId: 'facebook',
    status: 'published',
    contentType: 'post'
  },
  {
    id: 'c6',
    title: 'New Feature Teaser',
    date: getDynamicDate(5), // +5 days
    time: '11:15 AM',
    platformId: 'twitter',
    status: 'draft',
    contentType: 'post'
  }
];
