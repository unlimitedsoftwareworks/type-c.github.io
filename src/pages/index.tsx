// src/pages/page.tsx
import CodeHighlight from '@/components/CodeHighlight';
import React from 'react';
import { GiHypersonicBolt, GiPegasus, GiProcessor } from 'react-icons/gi';
import { TbLetterV } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';

const Index: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-200 py-40">
                <div className="hero-content text-center">
                    <div className="flex gap-x-40">
                        <div className="cybr-btn text-center logo-main min-h-[180px]" style={{minWidth: 650}}>
                            <h1 className="logoFont">Type-C</h1>
                            <span aria-hidden className="cybr-btn__glitch">Type-C</span>
                            <span aria-hidden className="cybr-btn__tag">R25</span>
                        </div>
                        <div>
                            <p className="py-6">An expressive type-safe programming language, tailored for efficiency and speed</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-300 py-40 ">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <TiStarFullOutline size={64} />
                        </div>
                        <div className="stat-title">Github Stars</div>
                        <div className="stat-value text-primary">5</div>
                        <div className="stat-desc">{"We can do better!"}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">

                        </div>
                        <div className="stat-title">Packages Installed</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">86%</div>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>
                </div>
            </div>
            <div className="striped1 hero bg-base-100 py-40 ">
                <div className="flex justify-around items-stretch gap-4">
                    <div className="card w-96 bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">Type-C is Speed! <GiHypersonicBolt size={35} /></h2>
                            <p>Type-C's runtime system is designed for efficiency and maximizing runtime performance, with low overhead</p>
                        </div>
                    </div>
                    <div className="card w-96 bg-secondary text-secondary-content">
                        <div className="card-body">
                            <h2 className="card-title">Async <GiProcessor size={35} /></h2>
                            <p>Similar to modern JS, Type-C, is both concurrent and asynchrounous. Type-C leverages libuv just like nodejs, to achieve efficient async i/o performance on multiple platforms</p>
                        </div>
                    </div>
                    <div className="card w-96 bg-neutral text-neutral-content">
                        <div className="card-body">
                            <h2 className="card-title">Type-V Powered <TbLetterV size={35} /></h2>
                            <p>Type-C programs runs on top of the Type-V virtual machine, which is designed to be efficient and robust VM and runtime</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-300 py-40 ">
                <div className='py-50 prose'>
                    <h1 className='text-center'>Expressive and Elegant</h1>
                    <div className="flex justify-around items-stretch gap-4">
                        <div className='w-1/3 px-2'>
                            <CodeHighlight language='tc' code={`from std.io import println
fn main() -> i32 {
    println("Hello, World!")
    return 0
}











`} />
                        </div>
                        <div className='w-1/3 px-2'>


                            <CodeHighlight language='tc' code={`from std.io import println
from std.utils import range

fn main() -> i32 {
    let threads = range<u32>(0, 10).map(
        fn(i: u32) = spawn promise.resolve(
            println("hello from a thread")
        )
    )

    promise.awaitAll(threads)
    return 0
}



`} />
                        </div>
                        <div className='w-2/3 px-2'>

                            <CodeHighlight language='tc' code={`from std.io import println

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
}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Index;
