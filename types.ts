export enum MilestoneStatus {
  Completed = 'completed',
  In_Progress = 'in_progress',
  Upcoming = 'upcoming',
  Future = 'future'
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  longDescription: string; // For TTS and Chat context
  status: MilestoneStatus;
  category: 'Foundation' | 'Expansion' | 'Product' | 'Tech';
  icon: 'rocket' | 'code' | 'zap' | 'globe' | 'users' | 'lock' | 'bitcoin' | 'star';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}
