import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

let chatSession: Chat | null = null;

// Initialize the Gemini Client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in process.env.API_KEY");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  try {
    const ai = getClient();
    
    // Using gemini-2.5-flash for fast, efficient conversational responses
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    
    return true;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return false;
  }
};

export const sendMessageToAgent = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new Error("Chat session could not be initialized.");
  }

  try {
    const result = await chatSession.sendMessage({
      message: message
    });
    
    return result.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Ocorreu um erro de comunicação com o Agente. Por favor, verifique sua chave de API ou tente novamente.";
  }
};