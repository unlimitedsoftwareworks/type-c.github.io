// Adjust imports as necessary
import React from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { FaNewspaper } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type BlogPost = {
    name: string;
    title: string;
    description: string;
    tags: string[];
    date: string,
    author: string
};

interface CodeOfConductProps {
    blogPosts: BlogPost[];
}

const BlogPosts: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
    const router = useRouter()

    return (

        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col">
                            <p className="text-5xl">Blog</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-100">
                <div className="py-20 w-700">
                    <div className="prose lg:prose-md m-auto">
                        {posts.map((post) => (
                            <>
                                <div className='p-5 hover:bg-base-200 cursor-pointer' onClick={() => router.push(`/blog/${post.name}`)}>
                                    <h1 key={post.name}>{post.title}</h1>
                                    <small>{post.date}</small>
                                    <p>{post.description}</p>
                                    {post.tags.map((tag) => (
                                        <div className="badge badge-neutral mx-2">{tag}</div>
                                    ))}
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export async function getStaticProps() {
    // Path to the _meta.json file
    const metaFilePath = path.join(process.cwd(), 'posts', '_meta.json');
    // Read the file
    const jsonData = fs.readFileSync(metaFilePath, 'utf8');
    // Parse the JSON data
    const posts: { name: string, title: string, description: string, tags: string[], date: string, author: string }[] = JSON.parse(jsonData).posts;

    // Return the list of posts as props
    return {
        props: {
            posts,
        },
    };
}
export default BlogPosts;
