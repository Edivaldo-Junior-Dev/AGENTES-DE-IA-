
import { GoogleGenAI } from "@google/genai";
import { PUBLIC_SYSTEM_PROMPT, CONSULTANT_SYSTEM_PROMPT } from '../constants';
import { Attachment } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");
  return new GoogleGenAI({ apiKey });
};

// Helper para converter Blob/File para Base64 limpo (sem header data:image/...)
const fileToGenerativePart = async (url: string, mimeType: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64data,
          mimeType
        }
      });
    };
    reader.readAsDataURL(blob);
  });
};

export const sendMessageToAgent = async (
  message: string, 
  isConsultant: boolean = false,
  attachments: Attachment[] = []
): Promise<string> => {
  const ai = getClient();
  const prompt = isConsultant ? CONSULTANT_SYSTEM_PROMPT : PUBLIC_SYSTEM_PROMPT;
  // Gemini 1.5 Pro/Flash ou Gemini 2.5 são melhores para multimodalidade complexa
  // Mantendo o modelo definido no prompt anterior, mas garantindo suporte a imagem
  const model = isConsultant ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  try {
    let contents: any = [];

    // Se houver anexos, converte para o formato do Gemini
    if (attachments.length > 0) {
      const attachmentParts = await Promise.all(
        attachments.map(att => fileToGenerativePart(att.url, att.mimeType))
      );
      
      // Adiciona partes de arquivo e o texto
      contents = [
        ...attachmentParts,
        { text: message || "Analise este arquivo/imagem." }
      ];
    } else {
      // Apenas texto
      contents = message;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: contents.length ? { parts: contents } : contents, // Formato correto para multipart
      config: {
        systemInstruction: prompt,
        temperature: isConsultant ? 0.8 : 0.6,
      }
    });
    
    return response.text || "Erro ao processar resposta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro de conexão ou formato de arquivo não suportado pela IA.";
  }
};
