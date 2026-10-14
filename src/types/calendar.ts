export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm AM/PM
  platformId?: string;
  status: 'draft' | 'scheduled' | 'published';
  contentType?: 'post' | 'reel' | 'video';
};
