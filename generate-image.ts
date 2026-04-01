import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({});

async function generate() {
  try {
    console.log('Generating image...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: 'An abstract, minimal, light-themed background image, soft geometric shapes, warm off-white and subtle orange accents, clean, modern, corporate, high quality, 16:9',
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        if (!fs.existsSync('public')) {
          fs.mkdirSync('public');
        }
        fs.writeFileSync('public/header-bg.png', buffer);
        console.log('Image saved to public/header-bg.png');
        return;
      }
    }
    console.log('No image data found in response');
  } catch (e) {
    console.error('Error:', e);
  }
}
generate();
