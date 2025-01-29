import { VscRunAll } from "react-icons/vsc";
import { VscDebugStop } from "react-icons/vsc";
import { FaCode } from "react-icons/fa";
import { codeTemplates, loadCodeSample } from "@/lib/code-templates";
import { useHookstate } from "@hookstate/core";
import { editorContent } from "@/states/editorContent";
import axios from "axios";
import { awaitingResponse, compilerLogs, stderrLogs, stdoutLogs } from "@/states/playground";

export const EditorToolbar = () => {
    const editorState = useHookstate(editorContent);

    const compiler = useHookstate(compilerLogs);
    const stdout = useHookstate(stdoutLogs);
    const stderr = useHookstate(stderrLogs);
    const awaitResponse = useHookstate(awaitingResponse);

    const loadTemplate = async (templateId: string) => {
        const template = codeTemplates[templateId];
        if (template) {
            const code = await loadCodeSample(template.filesource);
            editorState.set(code);
        }
    };

    const runCode = () => {
        awaitResponse.set(true);
        // send request to server to run code
        axios.post("https://tc-playground.praisethemoon.org/api/execute", {
            code: editorState.get()
        }).then((res) => {
            if(res.data.success === true) {
                compiler.set(res.data.result.compilerError ?? "")
                stdout.set(res.data.result.stdOut ?? "")
                stderr.set(res.data.result.stdErr ?? "")
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            awaitResponse.set(false);
        })
    };

    return (
        <div className="w-full bg-base-200 p-2">
            <ul className="menu menu-horizontal bg-base-200 rounded-box gap-2">
                <li className="dropdown dropdown-hover mr-2 border-r border-base-300">
                    <button tabIndex={0} className="btn btn-sm">
                        <FaCode /> Load Code Samples
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-auto">
                        {Object.entries(codeTemplates).map(([id, template]) => (
                            <li key={id}>
                                <div
                                    className="flex flex-col items-start cursor-pointer"
                                    onClick={() => loadTemplate(id)}
                                >
                                    <span>{template.name}</span>
                                    <small className="text-xs text-gray-500">
                                        {template.description}
                                    </small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <button className="btn btn-sm" onClick={runCode} >
                        <VscRunAll /> Run
                    </button>
                </li>
                <li>
                    <button className="btn btn-sm">
                        <VscDebugStop /> Stop
                    </button>
                </li>
                {awaitResponse.get() && (
                    <li>
                        <div className="spinner spinner-primary"></div>
                    </li>
                )}
            </ul>
        </div>
    );
};
