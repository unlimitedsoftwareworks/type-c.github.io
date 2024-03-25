// src/pages/CodeOfConduct.tsx
import Link from 'next/link';
import React from 'react';
import { FaApple, FaBalanceScale, FaDownload, FaHeart, FaLinux, FaWindows } from 'react-icons/fa';
import { GiHypersonicBolt, GiProcessor } from 'react-icons/gi';
import { LiaHeart, LiaPrayingHandsSolid } from 'react-icons/lia';
import { LuHeartHandshake } from 'react-icons/lu';
import { TbLetterV } from 'react-icons/tb';

const Download: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <FaDownload className="self-center p-5" size={120} />
                            <p>
                                Requires npx to install the compiler
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-300 py-20 flex flex-wrap justify-around items-center">
                <div className='py-10 px-5'>
                    <h1 className='text-center text-2xl mb-4'>1. Install Compiler</h1>
                    <div className="mockup-code">
                        <pre data-prefix="$"><code>npx i typecc</code></pre>
                        <pre data-prefix=">" className="text-warning"><code>installing...</code></pre>
                        <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                    </div>
                </div>
                <div className='py-10 px-5'>
                    <h1 className='text-center text-2xl mb-4'>2. Install VM</h1>
                    <div className="mockup-code">
                        <pre data-prefix="$"><code>npx i typev</code></pre>
                        <pre data-prefix=">" className="text-warning"><code>installing...</code></pre>
                        <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Download;
