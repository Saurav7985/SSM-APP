export type ContentPost = {
  id: string;
  title?: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'reel';
  platforms: string[];
  status: 'published' | 'scheduled' | 'draft';
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
};
