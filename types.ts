export enum Sender {
  USER = 'USER',
  AGENT = 'AGENT',
  SYSTEM = 'SYSTEM'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isThinking?: boolean;
  relatedTopic?: string;
  feedback?: 'positive' | 'negative';
}

export interface ResumeSection {
  title: string;
  content: string | string[];
  icon: string;
  query: string; // The question to ask when clicked
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
}

export interface SidebarProps {
  onQuery: (query: string) => void;
  onReset: () => void;
}

export interface ChatInterfaceProps {
  pendingQuery: string | null;
  onClearPendingQuery: () => void;
  onReset?: () => void;
}

export interface FeedbackLog {
  id?: string;
  timestamp: Date;
  userQuery: string;
  agentResponse: string;
  feedbackType: 'positive' | 'negative';
  appVersion?: string;
}