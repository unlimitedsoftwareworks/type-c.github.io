import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import { BlogPost } from "../posts";
import MDXComponents from "@/components/MDXComponents";
import Link from "next/link";
import {
    FaDochub,
    FaGithub,
    FaGlobeAfrica,
    FaNewspaper,
    FaRegNewspaper,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useEffect, useRef } from "react";
import Image from "next/image";

// Define the path to your posts directory
const postsDirectory = path.join(process.cwd(), "posts");

const UtterancesComments = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");

        const config = {
            src: "https://utteranc.es/client.js",
            repo: "unlimitedsoftwareworks/type-c.io-conversation",
            "issue-term": "pathname",
            theme: "github-light",
            crossOrigin: "anonymous",
            defer: true,
        };

        Object.entries(config).forEach(([key, value]) => {
            script.setAttribute(key, value as string);
        });

        setTimeout(() => {
            ref.current?.append(script);
        }, 300);
    }, []);

    return <div ref={ref} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Read the _meta.json file to get the slugs
    const metaFilePath = path.join(postsDirectory, "_meta.json");
    const jsonData = fs.readFileSync(metaFilePath, "utf8");
    const posts = JSON.parse(jsonData).posts;

    // Generate the paths for getStaticPaths
    const paths = posts.map((post: BlogPost) => ({
        params: { slug: [post.name] },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    // @ts-ignore
    const slug = context.params.slug[0];
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const source = fs.readFileSync(mdxPath, "utf8");

    // Load the meta file
    const metaFilePath = path.join(postsDirectory, "_meta.json");
    const jsonData = fs.readFileSync(metaFilePath, "utf8");
    const content = JSON.parse(jsonData);
    const posts = content.posts;
    const authors = content.authors;

    // Find the metadata for the current post
    const postMeta = posts.find((post: BlogPost) => post.name === slug);
    const authorMeta = authors.find(
        (author: any) => author.id === postMeta.author,
    );

    postMeta.author = authorMeta;

    // Use MDXRemote to serialize the MDX content
    const mdxSource = await serialize(source);

    return {
        props: {
            source: mdxSource,
            meta: postMeta,
        },
    };
};
const PostPage = ({ source, meta }: any) => {
    return (
        <div>
            {/* Hero Section */}
            <div className="striped1 hero bg-base-100 py-10 sm:py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="flex flex-col items-center text-center gap-4">
                            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                                {meta.title}
                            </p>
                            <p className="text-sm sm:text-base text-gray-500">
                                {meta.date}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {meta.tags.map((tag: string) => (
                                    <div
                                        key={tag}
                                        className="badge badge-neutral text-sm"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm breadcrumbs">
                                <ul>
                                    <li>
                                        <Link href="/posts">
                                            <FaRegNewspaper className="mr-2" />
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <a>
                                            <HiOutlineDocumentText className="mr-2" />
                                            {meta.title}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-base-200 py-10 sm:py-20">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                    <div className="prose lg:prose-md mx-auto">
                        <MDXRemote {...source} components={MDXComponents} />
                    </div>
                </div>
            </div>

            {/* Author Section */}
            <div className="striped1 hero bg-base-100 py-10 sm:py-20">
                <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                    <h2 className="text-xl font-bold mb-4">Written By</h2>
                    <div className="stat bg-base-100 hover:bg-primary hover:text-blue-500 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center">
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <Image
                                        alt="Author Avatar"
                                        src={meta.author.avatar}
                                        width={64}
                                        height={64}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center sm:text-left mt-4 sm:mt-0 sm:ml-6">
                            <p className="text-lg font-bold">
                                {meta.author.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {meta.author.bio}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-4">
                                <Link
                                    href={meta.author.website}
                                    className="btn btn-ghost btn-xs"
                                >
                                    <FaGlobeAfrica className="mr-2" />
                                    Website
                                </Link>
                                <Link
                                    href={meta.author.gh}
                                    className="btn btn-ghost btn-xs"
                                >
                                    <FaGithub className="mr-2" />
                                    GitHub
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-base-200 py-10 sm:py-20">
                <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                    <UtterancesComments />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
