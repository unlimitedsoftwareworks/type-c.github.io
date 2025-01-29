import { Monaco } from "@monaco-editor/react";
import TypeCDark from "./themes/TypeC Dark.json"
import TypeCLight from "./themes/TypeC Light.json"
import { editor } from "monaco-editor";

// Import all theme files dynamically using Vite's glob import



// Convert the modules into a record of theme objects
const themes: Record<string, unknown> = Object.fromEntries(
  [
    ["typec-dark", TypeCDark],
    ["typec-light", TypeCLight]
  ]
);

export function registerThemes(monaco: Monaco): void {
    Object.entries(themes).forEach(([themeName, theme]) => {
        try{
            monaco.editor.defineTheme(themeName, theme as editor.IStandaloneThemeData);
        } catch (error) {
            console.error(`Failed to register theme ${themeName}:`, error);
        }
    });
}
