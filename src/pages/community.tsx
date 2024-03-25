// src/pages/CodeOfConduct.tsx
import Link from 'next/link';
import React from 'react';
import { FaBalanceScale, FaDiscord, FaHeart } from 'react-icons/fa';
import { LiaHeart, LiaPrayingHandsSolid } from 'react-icons/lia';
import { LuHeartHandshake } from 'react-icons/lu';

const Community: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <p className="text-5xl">Community</p>
                            <FaBalanceScale className="self-center p-5" size={120} />
                            <p>
                                Please make sure that you have read and agreed <Link href="/code-of-conduct"><span className='badge badge-neutral'>Code of Conduct</span></Link> before joining our community. We want everyone to feel welcome and safe in our community.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-40 w-700">
                    <div className="m-auto">
                        <div className='prose p-5'>
                            <h2>Community Portals</h2>
                        </div>
                        <div role="alert" className="alert shadow-lg">
                        <span className='badge badge-outline'>Official</span>
                            <div>
                                <h3 className="font-bold flex flex-1 flex-row">Discord <FaDiscord size={26} className='mx-3' /></h3>
                            </div>
                            <button className="btn btn-sm">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
