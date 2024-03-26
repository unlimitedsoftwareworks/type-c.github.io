// src/pages/CodeOfConduct.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaBalanceScale, FaGithub, FaGlobeAfrica, FaHeart } from 'react-icons/fa';
import { LiaHeart, LiaPrayingHandsSolid } from 'react-icons/lia';
import { LuHeartHandshake } from 'react-icons/lu';
import { TbLicense } from 'react-icons/tb';

const CodeOfConduct: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <p className="text-5xl">Credits</p>
                            <TbLicense className="self-center p-5" size={120} />
                            <p>
                                This page serves as a credit page for all those who contributed to Type-C, Type-V, Type-Hub.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-40 w-700">
                    <div className="stat shadow">
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <Image alt="" src="https://avatars.githubusercontent.com/u/22145460?v=4" />
                                </div>
                            </div>
                        </div>
                        <div className='prose'>
                            <div className="stat-value ">praisethemoon</div>
                            <div className="stat-title">Soulaymen Chouri</div>
                            <div className="stat-desc text-secondary">Author and Maintainer</div>
                            <div className='flex flex-1 flex-row'>
                                <Link href="https://praisethemoon.org" className='btn btn-ghost px-5 btn-xs'><FaGlobeAfrica /></Link> <Link className='btn btn-ghost px-5 btn-xs' href="https://github.com/praisethemoon"><FaGithub /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOfConduct;
