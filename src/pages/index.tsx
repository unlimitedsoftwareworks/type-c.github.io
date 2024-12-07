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
            <div className="striped1 hero bg-base-200 py-20">
                <div className="hero-content text-center flex flex-col items-center lg:flex-row lg:gap-20">
                    <div
                        className="cybr-btn text-center logo-main min-h-[180px] mb-6 lg:mb-0"
                        style={{ minWidth: 300 }}
                    >
                        <h1 className="logoFont text-4xl md:text-5xl lg:text-6xl">
                            Type-C
                        </h1>
                        <span aria-hidden className="cybr-btn__glitch">
                            Type-C
                        </span>
                        <span aria-hidden className="cybr-btn__tag">
                            R25
                        </span>
                    </div>
                    <div className="text-center max-w-lg">
                        <p className="py-6 text-lg">
                            An expressive type-safe programming language,
                            tailored for efficiency and speed
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                className="btn btn-primary w-40"
                                onClick={gotoShowcase}
                            >
                                Showcase
                            </button>
                            <button
                                className="btn btn-secondary w-40"
                                onClick={gotoDocs}
                            >
                                Documentation
                            </button>
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

            {/* Stats Section */}
            <div className="hero bg-base-300 py-20">
                <div className="stats shadow flex flex-wrap gap-4 justify-center">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <TiStarFullOutline size={80} />
                        </div>
                        <div className="stat-title">Github Stars</div>
                        <div className="stat-value text-primary">0</div>
                        <div className="stat-desc">{"We can do better!"}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-neutral">
                            <FaDiscord size={80} />
                        </div>
                        <div className="stat-title">Discord Users</div>
                        <div className="stat-value text-neutral">1</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">60%</div>
                        <div className="stat-title">Percentage Completion</div>
                        <div className="stat-desc text-secondary">
                            toward stable v0 release
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="striped1 hero bg-base-100 py-20">
                <div className="flex flex-col lg:flex-row justify-around items-stretch gap-6">
                    <div className="card w-full lg:w-96 bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">
                                Type-C is Speed! <GiHypersonicBolt size={35} />
                            </h2>
                            <p>
                                Type-C&apos;s runtime system is designed for
                                efficiency and maximizing runtime performance,
                                with low overhead
                            </p>
                        </div>
                    </div>
                    <div className="card w-full lg:w-96 bg-secondary text-secondary-content">
                        <div className="card-body">
                            <h2 className="card-title">
                                Smooth! <GiWaveSurfer size={35} />
                            </h2>
                            <p>
                                Type-C syntax is designed to be smooth and
                                natural, with a focus on readability and
                                simplicity
                            </p>
                        </div>
                    </div>
                    <div className="card w-full lg:w-96 bg-neutral text-neutral-content">
                        <div className="card-body">
                            <h2 className="card-title">
                                Type-V Powered <TbLetterV size={35} />
                            </h2>
                            <p>
                                Type-C programs run on top of the Type-V virtual
                                machine, which is designed to be efficient and
                                robust
                            </p>
                        </div>
                    </div>
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
