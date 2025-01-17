import React from "react";
import Sidebar from "./Sidebar";
import { DocItem } from "@/pages/docs/[...slug]";
import {
    MdNavigateBefore,
    MdNavigateNext,
    MdOutlineFeedback,
} from "react-icons/md";
import Link from "next/link";
import { FaEdit, FaRegNewspaper } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

interface DocsLayoutProps {
    children: React.ReactNode;
    docsStructure: DocItem[];
    activeDoc: DocItem;
    prevDoc: DocItem | null;
    nextDoc: DocItem | null;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({
    children,
    docsStructure,
    prevDoc,
    nextDoc,
    activeDoc,
}) => {
    return (
        <div className="flex flex-1 bg-base-200 striped1">
            <aside
                className="hidden lg:block sticky top-0 overflow-y-auto bg-base-200 p-4"
                style={{ height: "calc(100vh - 50px - 71px)" }}
            >
                <Sidebar docsStructure={docsStructure} />
            </aside>

            <main className="flex-1 overflow-y-auto p-4 bg-base-200 prose lg:prose-md m-auto max-w-4xl mx-auto">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <FaRegNewspaper className="mx-2" /> Documentation
                        </li>
                        <li>
                            <a>
                                <HiOutlineDocumentText className="mx-2" />
                                {activeDoc.title}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="join grid grid-cols-2 mb-5">
                    {prevDoc && (
                        <Link
                            href={`/docs/${prevDoc.name}`}
                            className={`join-item btn btn-outline btn-primary`}
                        >
                            <MdNavigateBefore />
                            {prevDoc.title}{" "}
                        </Link>
                    )}
                    {!prevDoc && (
                        <button className="join-item btn btn-outline btn-primary btn-disabled">
                            Beginning
                        </button>
                    )}
                    {nextDoc && (
                        <Link
                            href={`/docs/${nextDoc.name}`}
                            className="join-item btn btn-outline btn-primary"
                        >
                            {nextDoc.title} <MdNavigateNext />
                        </Link>
                    )}
                    {!nextDoc && (
                        <button className="join-item btn btn-outline btn-primary btn-disabled">
                            {" "}
                            Fin!
                        </button>
                    )}
                </div>
                <hr />
                {children}
                <hr />
                <small>Kudos! Keep reading!</small>
                <div className="join grid grid-cols-2">
                    {prevDoc && (
                        <Link
                            href={`/docs/${prevDoc.name}`}
                            className={`join-item btn btn-primary btn-outline`}
                        >
                            <MdNavigateBefore />
                            {prevDoc.title}{" "}
                        </Link>
                    )}
                    {!prevDoc && (
                        <button className="join-item btn btn-primary btn-outline btn-disabled">
                            Beginning
                        </button>
                    )}
                    {nextDoc && (
                        <Link
                            href={`/docs/${nextDoc.name}`}
                            className="join-item btn btn-primar btn-outline"
                        >
                            {nextDoc.title} <MdNavigateNext />
                        </Link>
                    )}
                    {!nextDoc && (
                        <button className="join-item btn btn-primary btn-outline  btn-disabled">
                            {" "}
                            Fin!
                        </button>
                    )}
                </div>
                <div className="flex flex-1 flex-col mt-4">
                    <small>
                        <Link
                            href={`https://github.com/unlimitedsoftwareworks/tc-docs/tree/master/${activeDoc.name}.mdx`}
                            target="_blank"
                            className="link link-hover flex flex-1 flex-row items-center"
                        >
                            Suggest an Edit on Github{" "}
                            <FaEdit className="mx-2" />
                        </Link>
                    </small>
                    <small>
                        <Link
                            href={`https://github.com/unlimitedsoftwareworks/tc-docs/issues/new?title=Feedback for page ${activeDoc.name}.mdx&labels=feedback`}
                            target="_blank"
                            className="link link-hover flex flex-1 flex-row items-center"
                        >
                            Submit feedback via Github{" "}
                            <MdOutlineFeedback className="mx-2" />
                        </Link>
                    </small>
                </div>
            </main>
        </div>
    );
};

export default DocsLayout;
