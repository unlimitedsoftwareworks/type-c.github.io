export interface CodeTemplate {
    name: string;
    description: string;
    filesource: string;
}

export const codeTemplates: Record<string, CodeTemplate> = {
    "hello-world": {
        name: "Hello World",
        description: "A simple hello world example",
        filesource: "hello-world.tc"
    },
    "fibonacci": {
        name: "Fibonacci",
        description: "A fibonacci implementation",
        filesource: "fib.tc"
    },
    "structs": {
        name: "Structs",
        description: "Example showing struct usage",
        filesource: "structs.tc"
    },
    "partial-structs": {
        name: "Partial Structs",
        description: "Example showing partial struct usage",
        filesource: "partial-structs.tc"
    },
    "coroutines": {
        name: "Coroutines",
        description: "A mix of class/coroutines",
        filesource: "coroutines.tc"
    },
};

export async function loadCodeSample(filename: string): Promise<string> {
    try {
        const response = await fetch(`/code-samples/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to load code sample: ${filename}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading code sample:', error);
        return '// Failed to load code sample';
    }
}
