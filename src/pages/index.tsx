import CodeHighlight from "@/components/CodeHighlight";
import React from "react";
import { GiHypersonicBolt, GiProcessor, GiWaveSurfer } from "react-icons/gi";
import { TbLetterV } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { useRouter } from "next/router";
import { FaDiscord } from "react-icons/fa";

const Index: React.FC = () => {
    const router = useRouter();
    const gotoShowcase = () => {
        router.push("/tour");
    };
    const gotoDocs = () => {
        router.push("/docs/introduction");
    };
    return (
        <div>
            {/* Hero Section */}
            <div className="striped1 hero bg-base-200 py-40 overflow-x-hidden">
                <div className="hero-content text-center">
                    <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-40 items-center">
                        {/* Logo Section */}
                        <div
                            className="cybr-btn text-center logo-main min-h-[180px]"
                            style={{ minWidth: 650 }}
                        >
                            <h1 className="logoFont">Type-C</h1>
                            <span aria-hidden className="cybr-btn__glitch">
                                Type-C
                            </span>
                            <span aria-hidden className="cybr-btn__tag">
                                R25
                            </span>
                        </div>

                        {/* Buttons Section */}
                        <div className="text-center">
                            <p className="py-6 text-lg">
                                An expressive type-safe programming language,
                                tailored for efficiency and speed
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={gotoShowcase}
                                >
                                    Showcase
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={gotoDocs}
                                >
                                    Documentation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Section */}
            <div className="py-10 bg-base-200 text-center">
                <div
                    role="alert"
                    className="alert alert-error flex flex-col items-center"
                >
                    <span>
                        Notice: Type-C is still in early development stages and
                        not stable yet.
                    </span>
                </div>
            </div>

            {/* Code Highlight Section */}
            <div className="hero bg-base-300 py-20">
                <div className="py-10 prose w-full max-w-6xl mx-auto">
                    <h1 className="text-center">Expressive and Elegant</h1>
                    <div className="flex flex-col lg:flex-row justify-around items-stretch gap-6">
                        <div className="w-full lg:w-1/3 px-2">
                            <CodeHighlight
                                language="tc"
                                code={`from std.io import println
fn main() -> i32 {
    println("Hello, World!")
    return 0
}`}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2">
                            <CodeHighlight
                                language="tc"
                                code={`from std.io import println

type Duck = class {
    fn quack() {
        println("quack")
    }

    fn fly() {
        println("flying")
    }
}

fn main() -> i32 {
    let duck: interface { fn quack() } = new Duck();
    duck.quack()
    return 0
}`}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2">
                            <CodeHighlight
                                language="tc"
                                code={`from std.io import println
cfn loop(x: u32[]) -> (u32, bool) {
    let i: u64 = 0

    while i < x.length {
        let j = i+1

        if j == x.length {
            yield! (x[i], true)
        } else {
            yield (x[i], false)
        }

        i = j
    }
}

fn main(){
    let z: u32[] = [5, 3, 1, 100, 10]

    let co_iter = coroutine loop
    let done = false
    let item = 0 as u32

    while !done {
        (item, done) = co_iter(z)
        println("Item: "+ item)
    }
}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
