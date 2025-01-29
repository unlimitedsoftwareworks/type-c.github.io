import { Monaco } from '@monaco-editor/react';

export function registerTypeC(monaco: Monaco): void {
    monaco.languages.register({ id: "type-c" });
    monaco.languages.setMonarchTokensProvider("type-c", {
        tokenizer: {
            root: [
                // Line comments
                [/(\/\/.*$)/, "comment.line.double-slash"],

                // Block comments start
                [/\/\*/, "comment.block", "@comment"],

                // Keywords and Identifiers
                [/[a-zA-Z_][\w$]*/, {
                    cases: {
                        "as|break|cfn|override|class|const|continue|coroutine|namespace|local|do|else|enum|extern|false|fn|for|foreach|from|if|impl|import|in|interface|is|let|match|mut|mutate|new|null|return|static|strict|struct|this|true|type|unreachable|variant|while|yield":
                            "keyword.control",
                        "i8|u8|i16|u16|i32|u32|u64|i64|f32|f64|bool|coroutine|void":
                            "storage.type",
                        "@default": "identifier",
                    },
                }],

                // Strings
                [/\"(\\.|[^\"])*\"/, "string.quoted.double"],

                // Numbers
                [/\b(0b[01]+|0o[0-7]+|0x[0-9A-Fa-f]+|[0-9]+\.[0-9]+f?|[0-9]+)\b/, "constant.numeric"],

                // Operators and Punctuation
                [/[+\-*/%&|^!~<>?:=]+/, "keyword.operator"],
                [/[{}[\]().,:;]/, "delimiter"],
            ],

            // Comment mode
            comment: [
                [/[^\/*@]+/, "comment.block"], // Regular comment content
                [/(@\w+)/, "comment.annotation"], // Javadoc-style tags like @param, @brief
                [/\*\//, "comment.block", "@pop"], // Match closing block comment and return to root
                [/[\/*]/, "comment.block"], // Preserve block comment
            ],
        },
    });

    monaco.languages.setLanguageConfiguration("type-c", {
        comments: {
            lineComment: "//",
            blockComment: ["/*", "*/"],
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"],
        ],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "\"", close: "\"" },
            { open: "'", close: "'" },
            { open: "`", close: "`" },
            { open: '/*', close: '*/' }, // Standard block comments
            { open: '/**', close: ' */' } // Special handling for Javadoc-style comments
        ],
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "\"", close: "\"" },
            { open: "'", close: "'" },
            { open: "`", close: "`" },
            { open: '/*', close: '*/' },
            { open: '/**', close: '*/' }
        ],
        folding: {
            markers: {
                start: /^\s*\/\/\s*#region\b/,
                end: /^\s*\/\/\s*#endregion\b/,
            },
        },
        onEnterRules: [
            {
                // Rule to handle comments starting with /**
                beforeText: /^\s*\/\*\*(?!\/).*$/,
                afterText: /^\s*\*\/\s*$/,
                action: { indentAction: monaco.languages.IndentAction.IndentOutdent, appendText: " * " }
            },
            {
                // Rule for lines inside the comment block
                beforeText: /^\s*\*(?!\/)(?!\s*\/).*$/,
                action: { indentAction: monaco.languages.IndentAction.None, appendText: "* " }
            }
        ]
    });
}
