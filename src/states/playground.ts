import { hookstate } from "@hookstate/core";

export const compilerLogs = hookstate('This playground is an experimental feature and may not work as expected.');
export const stdoutLogs = hookstate('');
export const stderrLogs = hookstate('');
export const awaitingResponse = hookstate(false);
