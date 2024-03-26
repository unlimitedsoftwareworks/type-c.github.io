// src/pages/CodeOfConduct.tsx
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { LiaHeart, LiaPrayingHandsSolid } from 'react-icons/lia';
import { LuHeartHandshake } from 'react-icons/lu';

const CodeOfConduct: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40">
                            <p className="text-5xl">Research & Papers</p>

                            <p>
                                List of research and papers related to Type-C programming language and Type-V Virtual Machine
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-40 w-700">
                    <div className="prose lg:prose-md m-auto">
                        <h2>Type-C: A Type-Safe Programming Language</h2>
                        <p>Soulaymen Chouri</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOfConduct;
