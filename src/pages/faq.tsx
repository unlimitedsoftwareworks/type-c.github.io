// src/pages/CodeOfConduct.tsx
import Link from 'next/link';
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const CodeOfConduct: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <FaQuestionCircle className="self-center p-5" size={120} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-40 w-700">
                    <div className='prose'>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                What is the motivation behind Type-C?
                            </div>
                            <div className="collapse-content">
                                <p>Type-C came into existance from the need of a language that is flexible as Typescript,
                                    but not tightly coupled with the javascript language. Since TypeScript&apos;s main goal is JS compatibility,
                                    it sets some side effects such as the confusion between <span className='badge badge-neutral'>null</span> and 
                                    <span className='badge badge-neutral'>undefined</span>, and <span className='badge badge-neutral'>==</span> and 
                                    <span className='badge badge-neutral'>===</span> just to name a few. Hence, a new language had to be made.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                What is Type-V?
                            </div>
                            <div className="collapse-content">
                                <p>Type-V is the virtual machine that runs Type-C programs. Think of Type-C as the Java compiler and Type-V as the JVM. The reason for creating a virtual machine  
                                    instead of targetting existing VMs such as GraalVM or MoarVM, is to have full control over the language and the runtime. Designing a VM specifically for Type-C allows us to
                                    optimize the language and the runtime for the best performance and the best developer experience.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Why Type-C and Type-V are two seprate projects?
                            </div>
                            <div className="collapse-content">
                                <p>The Type-C compier is written in Typescript, for ease of implementation and proof of concept. A future compiler will most likely be written in C, 
                                    but compilation is just the tip of the iceberg. The VM had to be written in C, hence the two projects needed to be separated.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOfConduct;
