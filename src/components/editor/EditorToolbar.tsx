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
            if (err.response) {
                console.log(err.response.data)
                compiler.set(err.response.data.error)
            }
            else {
                compiler.set(err.toString())
            }
        }).finally(() => {
            awaitResponse.set(false);
        })
    };

    return (
        <div className="w-full bg-base-200 p-2">
            <ul className="menu menu-horizontal bg-base-200 rounded-box gap-2">
                <li className="mr-2 border-r border-base-300">
                    <button 
                        onClick={() => (document.getElementById('code_samples_modal') as HTMLDialogElement)?.showModal()} 
                        className="btn btn-sm"
                    >
                        <FaCode /> Load Code Samples
                    </button>
                </li>
                <li>
                    <button className="btn btn-sm" onClick={runCode} >
                        <VscRunAll /> Run
                    </button>
                </li>
                {awaitResponse.get() && (
                    <li>
                        <span className="loading loading-spinner loading-sm"></span>
                    </li>
                )}
            </ul>

            <dialog id="code_samples_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Code Samples</h3>
                    <div className="space-y-2">
                        {Object.entries(codeTemplates).map(([id, template]) => (
                            <div
                                key={id}
                                className="p-3 hover:bg-base-200 rounded-lg cursor-pointer"
                                onClick={() => {
                                    loadTemplate(id);
                                    (document.getElementById('code_samples_modal') as HTMLDialogElement)?.close();
                                }}
                            >
                                <div className="font-medium">{template.name}</div>
                                <div className="text-sm text-gray-500">
                                    {template.description}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};
