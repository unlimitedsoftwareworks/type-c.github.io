import CodeHighlight from '@/components/CodeHighlight';
import React from 'react';
import { GiPlasticDuck } from 'react-icons/gi';
import { LiaFileContractSolid } from 'react-icons/lia';
import { LuRegex } from 'react-icons/lu';
import { MdDataObject } from 'react-icons/md';
import { PiNumberZeroFill } from 'react-icons/pi';
import { SiAwesomelists } from 'react-icons/si';

const Tour: React.FC = () => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <SiAwesomelists className="self-center p-5" size={120} />
                            <p>
                                Type-C caught your attention? Have a look at a quick tour of what the language has to offer.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-40 w-700">
                    <div className="prose lg:prose-md m-auto">
                        <div className="flex justify-center w-full py-2 gap-2">
                            <a href="#item1" className="btn btn-xs">Rich Data Types</a>
                            <a href="#item2" className="btn btn-xs">Duck Typing</a>
                            <a href="#item3" className="btn btn-xs">Interface Oriented</a>
                            <a href="#item4" className="btn btn-xs">Pattern Matching</a>
                            <a href="#item5" className="btn btn-xs">Safety and Nullables</a>
                        </div>
                        <div className="carousel w-full">
                            <div id="item1" className="carousel-item w-full ">
                                <div className='flex flex-1 flex-col w-full'>
                                    <CodeHighlight language='tc' code={`type User = {
    name: String,
    age: u32,
    email: String
}

type ServerResponse = variant {
    Ok(data: User),
    Error(code: u32)
}

let resp1 = ServerResponse.Ok({
    name: "John Doe", 
    age: 23 as u32, 
    email: "john.doe@me.em"
})`} />
                                    <div role="alert" className="alert  not-prose">
                                        <MdDataObject size={32} />
                                        <div>
                                            <h3 className="font-bold">Type-C has rich typeset!</h3>
                                            <div className="text-xs">Type-C supports classes, interfaces, enums, structs, variants and such!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="item2" className="carousel-item w-full">

                                <div className='flex flex-1 flex-col w-full'>
                                    <CodeHighlight language='tc' code={`from std.io import println
type User = {
    name: String,
    age: u32,
    email: String
}

fn printUser(u: {name: String}) {
    println(u.name)
}

// When type is specified, we can just list the fields
let u1: User = {"John Doe", 23, "nospamplz@me.em"}
printUser(u)`} />
                                    <div role="alert" className="alert  not-prose">
                                        <GiPlasticDuck size={32} />
                                        <div>
                                            <h3 className="font-bold">If it Quacks, it Quacks, or something?</h3>
                                            <div className="text-xs">Duck typing is supported on structs and interfaces, as long the structure is compatible, Type-C will agree!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="item3" className="carousel-item w-full">

                                <div className='flex flex-1 flex-col w-full'>
                                    <CodeHighlight language='tc' code={`from std.io import println
type CustomArray<T> = class Sortable<T> & Serializable {
    let data: T[]
    fn sort() {
        // dummy
        return T
    }
    fn serialize() -> u8[] = []
}

let arr: interface { fn sort() -> T } = new CustomArray<u32>()`} />
                                    <div role="alert" className="alert  not-prose">
                                        <LiaFileContractSolid size={32} />
                                        <div>
                                            <h3 className="font-bold">Type-C has no class-inheritance (similar to Java)</h3>
                                            <div className="text-xs">Type-C abstracts behaviors through interfaces.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="item4" className="carousel-item w-full">

                                <div className='flex flex-1 flex-col w-full'>
                                    <CodeHighlight language='tc' code={`type ServerResponse = variant {
    Ok(data: User),
    Error(code: u32)
};

// Function to process the server response
fn processResponse(response: ServerResponse) {
    match response {
        ServerResponse.Ok(user) => {
            // If the response is Ok, print the user's name
            println("User name: " + user.name);
        },
        ServerResponse.Error(code) => {
            // If the response is an Error, print the error code
            println("Error code: " + code);
        }
    }
}`} />
                                    <div role="alert" className="alert  not-prose">
                                        <LuRegex size={32} />
                                        <div>
                                            <h3 className="font-bold">OCaml inspired Pattern Matching</h3>
                                            <div className="text-xs">You can use also use array pattern, struct pattern or type pattern (as in this example)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="item5" className="carousel-item w-full">

                                <div className='flex flex-1 flex-col w-full'>
                                    <CodeHighlight language='tc' code={`type ServerResponse = variant {
    Ok(data: User),
    Error(code: u32)
};

let v: ServerResponse? = null
let vOk = v as? ServerResponse.Ok
/* 
 * vOk is of type ServerResponse.Ok?
 * if casting succeeded, vOk will be ServerResponse.Ok, 
 * otherwise it will be null
 */

if vOk == null {
    // this is what's gonna happen!
}
else {
    // no way
}
`} />
                                    <div role="alert" className="alert  not-prose">
                                        <PiNumberZeroFill size={32} />
                                        <div>
                                            <h3 className="font-bold">Nullables as a seprate type</h3>
                                            <div className="text-xs">Very similar to typescript, nullables are the only types who can recieve a <span className='badge badge-ghost'>null</span> value</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tour;
