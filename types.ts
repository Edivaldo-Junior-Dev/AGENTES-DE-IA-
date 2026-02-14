
export enum Sender {
  USER = 'USER',
  AGENT = 'AGENT',
  SYSTEM = 'SYSTEM'
}

export interface Attachment {
  id: string;
  type: 'image' | 'audio' | 'file';
  url: string; // Base64 ou URL local para preview
  mimeType: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isThinking?: boolean;
  relatedTopic?: string;
  feedback?: 'positive' | 'negative';
  attachments?: Attachment[];
}

export interface ResumeSection {
  title: string;
  content: string | string[];
  icon: string;
  query: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    role: string;
    contact: {
      location: string;
      email: string;
      phone: string;
      linkedin: string;
      github: string;
    };
  };
  sections: ResumeSection[];
  fullSkillsList: string[];
}

export interface SidebarProps {
  onQuery: (query: string) => void;
  onReset: () => void;
  onOpenConsultant: () => void;
}

export interface ChatInterfaceProps {
  pendingQuery: string | null;
  onClearPendingQuery: () => void;
  onReset?: () => void;
  isConsultantMode?: boolean;
}

export interface FeedbackLog {
  id: string;
  appVersion: string;
  timestamp: Date;
  feedbackType: 'positive' | 'negative';
  userQuery: string;
  agentResponse: string;
}
