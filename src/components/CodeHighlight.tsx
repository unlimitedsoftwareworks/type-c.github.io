import React, { useEffect, useState } from 'react';
import { getSingletonHighlighter } from 'shiki';
import typeCLang from './type-c.tmLanguage.json';
import typeCDark from './codethemes/TypeC Dark.json';
import typeCLight from './codethemes/TypeC Light.json';
import { useHookstate } from '@hookstate/core';
import { theme } from '@/states/theme';

interface CodeHighlightProps {
    code: string;
    language: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, language }) => {
    const [highlightedCode, setHighlightedCode] = useState('<span className="loading loading-infinity loading-lg"></span>');
    const themeState = useHookstate(theme);

    useEffect(() => {
        // Process activeCode inside useEffect to avoid hooks rule violation
        let activeCode = code;
        while (activeCode[activeCode.length - 1] === '\n') {
            activeCode = activeCode.slice(0, -1);
        }

        const highlightCode = async () => {
            try {
                const highlighter = await getSingletonHighlighter({
                    langs: [typeCLang as any, "typescript", "javascript", "java", "asm", "lua", "c", "cpp", "json", "bash"],
                    themes: [typeCDark, typeCLight],
                    langAlias: {
                        "tc": "type-c"
                    }
                });
                highlighter.getLoadedLanguages();
                const html = highlighter.codeToHtml(activeCode, {
                    lang: language,
                    theme: themeState.get()
                });
                setHighlightedCode(html);
            } catch (error) {
                console.error("Error highlighting code with Shiki:", error);
            }
        };

        highlightCode();
    }, [code, language, themeState]);

    return <div className='w-full' dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
};

export default CodeHighlight;
