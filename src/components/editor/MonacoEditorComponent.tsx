
import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import loader from '@monaco-editor/loader';
import { registerTypeC } from '@/lib/typec-monaco';
import { registerThemes } from '@/lib/monaco-themes/themes';
import { useHookstate } from '@hookstate/core';
import { theme } from '@/states/theme';
import { applyEditorSettings } from '@/lib/editor-settings';
import { editorContent } from '@/states/editorContent';



export const MonacoEditorComponent = () => {
    const handleEditorMount = (editor: any, monaco: Monaco) => {
        registerTypeC(monaco);
        applyEditorSettings(editor);
    };

    const themeState = useHookstate(theme);
    const content = useHookstate(editorContent);



    React.useEffect(() => {
        loader.init().then((monaco) => {
            registerThemes(monaco);
        });
    }, []);

    return (
        <Editor
            theme={themeState.get()}
            defaultLanguage="type-c"
            defaultValue={content.get()}
            onMount={handleEditorMount}
            onChange={(value) => content.set(value ?? "")}
            value={content.get()}
      />)
};
