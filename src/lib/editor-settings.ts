import { editor } from 'monaco-editor';

export function applyEditorSettings(editor: editor.IStandaloneCodeEditor) {
    editor.updateOptions({
        // UI settings
        fontSize: 14,
        fontFamily: "Fira Code",
        lineHeight: 1.5,
        fontLigatures: true,
        minimap: {
            enabled: true,
            maxColumn: 80
        },
        wordWrap: "on",
        wordWrapColumn: 80,

        // Editor settings
        tabSize: 4,
        insertSpaces: true,
        autoIndent: "advanced",
        formatOnPaste: true,
        formatOnType: true,
        detectIndentation: true,
        rulers: [80],
        bracketPairColorization: {
            enabled: true
        },

        // Additional useful settings
        renderWhitespace: "selection",
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        renderControlCharacters: true,
        renderLineHighlight: "all",
        scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
        }
    });
}
