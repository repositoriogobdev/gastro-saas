import { GoogleGenAI } from "@google/genai";
import type { MenuItem } from '../types';

// IMPORTANT: This key is managed externally and is a hard requirement.
// Do not modify, and assume `process.env.API_KEY` is pre-configured.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a safeguard for development, but in the target environment, the key is expected to be present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getGeminiSuggestion(query: string, menu: MenuItem[]): Promise<string> {
  if (!API_KEY) {
    return "O assistente de IA está indisponível no momento porque a chave da API não está configurada.";
  }
  
  try {
    const menuString = JSON.stringify(menu.map(item => ({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price
    })), null, 2);

    const prompt = `
Você é um assistente de cardápio de restaurante amigável e prestativo chamado gastrô..
Seu objetivo é ajudar os clientes a escolherem algo para comer com base em suas preferências.
Você deve ser entusiasmado e fazer a comida parecer deliciosa.
Mantenha suas respostas concisas, amigáveis e diretas (2-4 frases).
Recomende um ou dois itens específicos pelo nome do cardápio.
Não liste ingredientes a menos que seja solicitado. Não mencione preços a menos que seja solicitado.
Responda sempre em Português do Brasil.

Aqui está o cardápio completo em formato JSON:
${menuString}

---

Aqui está a pergunta do cliente: "${query}"

Com base no cardápio e na pergunta do cliente, o que você recomendaria?`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Falha ao obter uma sugestão do assistente de IA.");
  }
}