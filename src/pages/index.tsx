import CodeHighlight from '@/components/CodeHighlight';
import React from 'react';
import { GiHypersonicBolt, GiProcessor, GiWaveSurfer } from 'react-icons/gi';
import { TbLetterV } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { useRouter } from 'next/router';
import { FaDiscord } from 'react-icons/fa';

const Index: React.FC = () => {
    const router = useRouter();
    const gotoShowcase = () => {
        router.push('/tour');
    }
    return (
        <div>
            <div className="striped1 hero bg-base-200 py-40">
                <div className="hero-content text-center">
                    <div className="flex gap-x-40">
                        <div className="cybr-btn text-center logo-main min-h-[180px]" style={{ minWidth: 650 }}>
                            <h1 className="logoFont">Type-C</h1>
                            <span aria-hidden className="cybr-btn__glitch">Type-C</span>
                            <span aria-hidden className="cybr-btn__tag">R25</span>
                        </div>
                        <div>
                            <p className="py-6">An expressive type-safe programming language, tailored for efficiency and speed</p>
                            <button className="btn btn-primary" onClick={gotoShowcase}>Showcase</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='py-50 bg-base-200 text-center'>
                <div role="alert" className="alert alert-error flex flex-1 flex-col">
                    <span>Notice: Type-C is still in early development stages and not production ready!</span>
                </div>
            </div>
            <div className="hero bg-base-300 py-40 ">
                <div className="stats shadow">
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
                        <div className="stat-desc text-secondary">toward stable v0 release</div>
                    </div>
                </div>
            </div>
            <div className="striped1 hero bg-base-100 py-40 ">
                <div className="flex justify-around items-stretch gap-4">
                    <div className="card w-96 bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">Type-C is Speed! <GiHypersonicBolt size={35} /></h2>
                            <p>Type-C&apos;s runtime system is designed for efficiency and maximizing runtime performance, with low overhead</p>
                        </div>
                    </div>
                    <div className="card w-96 bg-secondary text-secondary-content">
                        <div className="card-body">
                            <h2 className="card-title">Smooth! <GiWaveSurfer size={35} /></h2>
                            <p>Type-C syntax is designed to be smooth and natural, with a focus on readability and simplicity</p>
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
                <div className='py-50 prose min-w-[90vw]'>
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
        fn(i: u32) = 
            spawn println("hello from a thread")
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
