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
                        <h2>Decency </h2>
                        <p>The Cambridge dictionary defines decency as a behavior that is good, moral and acceptable in society. We expect every member to be a decent human being.</p>

                        <h2>Be Inclusive</h2>
                        <p>In Type-C community welcomes everyone {"("}and their cats too!{")"}. We are human being and passionate about programming and building cool projects </p>

                        <h2>Collaborate Openly</h2>
                        <p>Working together can lead to great things. Share knowledge freely, accept contributions with open arms, and remember that collaboration is the heart of innovation.</p>

                        <h2>Stay Positive and Constructive</h2>
                        <p>Feedback is a gift. Offer and accept it graciously. Keep criticism constructive and focus on solutions rather than problems.</p>

                        <h2>Act with Integrity</h2>
                        <p>Be honest and ethical in all your interactions. Our actions reflect on our community, so let’s make sure we’re proud of them.</p>

                        <h2>Resolve Peacefully</h2>
                        <p>Disagreements and conflicts are part of life, but how we handle them matters. Approach disagreements with empathy, seeking common ground and mutual understanding.</p>

                        <h2>Respect of Intellectual Property</h2>
                        <p>Any code, software or other intenty that is protected under Intellectual property must be respected. Meaning no sharing of software or code that is not supposed to be shared and credit should be given when its due.</p>


                        <p>We’re committed to creating a community where everyone feels they belong and can do their best work. By adhering to these principles, we can all contribute to a positive and productive environment. Thank you for being a part of our community!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOfConduct;
