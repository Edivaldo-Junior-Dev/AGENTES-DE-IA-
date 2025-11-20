import { APP_VERSION, ADMIN_EMAIL } from '../constants';
import { FeedbackLog } from '../types';

class FeedbackService {
  private logs: FeedbackLog[] = [];

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  logFeedback(data: Omit<FeedbackLog, 'id' | 'appVersion'>): void {
    const logEntry: FeedbackLog = {
      ...data,
      id: this.generateId(),
      appVersion: APP_VERSION
    };

    this.logs.push(logEntry);
    this.simulateEmailSending(logEntry);
  }

  private simulateEmailSending(log: FeedbackLog) {
    const emailSubject = `[Feedback - v${log.appVersion}] ID: ${log.id}`;
    const emailBody = `
      Relatório de Feedback do Agente
      -------------------------------
      ID: ${log.id}
      Data: ${log.timestamp.toLocaleString()}
      Versão: ${log.appVersion}
      
      Feedback: ${log.feedbackType.toUpperCase()}
      
      Contexto:
      User: "${log.userQuery}"
      Agent: "${log.agentResponse}"
      
      -------------------------------
      Enviando para: ${ADMIN_EMAIL}
    `;
    
    console.group('📧 SIMULAÇÃO DE ENVIO DE EMAIL');
    console.log(`To: ${ADMIN_EMAIL}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(emailBody);
    console.groupEnd();
  }
}

export const feedbackService = new FeedbackService();