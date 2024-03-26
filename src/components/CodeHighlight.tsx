
// components/CodeHighlight.tsx
import React, { useEffect, useState } from 'react';
import { codeToHtml, getHighlighter } from 'shiki';
import typeCLang from './type-c.tmLanguage.json';


interface CodeHighlightProps {
    code: string;
    language: string;
}


const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, language }) => {
    const [highlightedCode, setHighlightedCode] = useState('<span className="loading loading-infinity loading-lg"></span>');
    let activeCode = code;
    // remove last line if it is empty
    while (activeCode[activeCode.length - 1] === '\n') {
        activeCode = activeCode.slice(0, -1);
    }


    useEffect(() => {
        const highlightCode = async () => {
            try {
                const highlighter = await getHighlighter({
                    langs: [typeCLang as any, "typescript", "javascript", "c", "cpp", "json", "bash"],
                    themes: ['vitesse-dark'], // Specify your theme or themes,
                    langAlias: {
                        "tc": "type-c"
                    }
                });
                highlighter.getLoadedLanguages()
                const html = await highlighter.codeToHtml(activeCode, { lang: language, theme: 'vitesse-dark' });
                setHighlightedCode(html);
            } catch (error) {
                console.error("Error highlighting code with Shiki:", error);
            }
        };

        highlightCode();
    }, [code, language]);

    // Render the highlighted code as HTML
    return <div className='w-full' dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
};

export default CodeHighlight;
