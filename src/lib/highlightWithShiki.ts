import { codeToHtml } from 'shiki';

export const highlightCode = async (code: string, language: string): Promise<string> => {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'nord', // You can change this to your preferred theme
    });
    return html;
  } catch (error) {
    console.error("Error highlighting code with Shiki:", error);
    return code; // Fallback to plain code if highlighting fails
  }
};
