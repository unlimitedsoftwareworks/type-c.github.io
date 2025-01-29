import { compilerLogs, stderrLogs, stdoutLogs } from "@/states/playground"
import { useHookstate } from "@hookstate/core"
import { Allotment } from "allotment"
import "allotment/dist/style.css"
import React from "react"
import Anser from "anser"

export const OutputPanel = () => {
    const compiler = useHookstate(compilerLogs);
    const stdout = useHookstate(stdoutLogs);
    const stderr = useHookstate(stderrLogs);

    const renderAnsi = (text: string) => {
        if (!text || (typeof(text) != "string")) {
            return <></>
        }

        return Anser.ansiToJson(text).map((part, idx) => (
            <span
                key={idx}
                style={{
                    color: part.fg ? `rgb(${part.fg})` : undefined,
                    backgroundColor: part.bg ? `rgb(${part.bg})` : undefined,
                    fontWeight: part.decoration === "bold" ? "bold" : undefined,
                    fontStyle: part.decoration === "italic" ? "italic" : undefined,
                    textDecoration: part.decoration === "underline" ? "underline" : undefined,
                }}
            >
                {part.content}
            </span>
        ));
    };

    return (
        <Allotment vertical className="h-full w-full">
            <Allotment.Pane>
                <div className="h-full w-full bg-base-100 p-1">
                    <div className="h-full">
                        <div className="bg-base-100 px-3 py-1 border-b border-base-300">
                            <span className="text-sm">Compiler Output</span>
                        </div>
                        <pre className="p-2 font-mono text-sm overflow-y-auto overflow-x-hidden whitespace-pre-wrap h-[calc(100%-2rem)]">
                            {compiler.get()}
                        </pre>
                    </div>
                </div>
            </Allotment.Pane>
            <Allotment.Pane>
                <div className="h-full w-full bg-base-100 p-1">
                    <div className="h-full">
                        <div className="bg-base-100 px-3 py-1 border-b border-base-300">
                            <span className="text-sm">Standard Output</span>
                        </div>
                        <pre className="p-2 font-mono text-sm overflow-y-auto overflow-x-hidden whitespace-pre-wrap h-[calc(100%-2rem)]">
                            {renderAnsi(stdout.get())}
                        </pre>
                    </div>
                </div>
            </Allotment.Pane>
            <Allotment.Pane>
                <div className="h-full w-full bg-base-100 p-1">
                    <div className="h-full">
                        <div className="bg-base-100 px-3 py-1 border-b border-base-300">
                            <span className="text-sm">Standard Error</span>
                        </div>
                        <pre className="p-2 font-mono text-sm overflow-y-auto overflow-x-hidden whitespace-pre-wrap h-[calc(100%-2rem)]">
                            {renderAnsi(stderr.get())}
                        </pre>
                    </div>
                </div>
            </Allotment.Pane>
        </Allotment>
    )
}
