import { hookstate } from "@hookstate/core";

export const editorContent = hookstate(`
// hello, world example
from std.io import println

fn main(args: String[]) -> u32 {
    println("hello, world!")
    return 0
}
`);