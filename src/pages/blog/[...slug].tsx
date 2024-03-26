import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '../posts';
import MDXComponents from '@/components/MDXComponents';
import Link from 'next/link';
import { FaDochub, FaGithub, FaGlobeAfrica, FaNewspaper, FaRegNewspaper } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the path to your posts directory
const postsDirectory = path.join(process.cwd(), 'posts');

const UtterancesComments = () => {
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const script = document.createElement('script');
  
      const config = {
        src: 'https://utteranc.es/client.js',
        repo: 'unlimitedsoftwareworks/type-c.io-conversation',
        'issue-term': 'pathname',
        theme: 'github-light',
        crossOrigin: 'anonymous',
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
    const metaFilePath = path.join(postsDirectory, '_meta.json');
    const jsonData = fs.readFileSync(metaFilePath, 'utf8');
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
    const source = fs.readFileSync(mdxPath, 'utf8');

    // Load the meta file
    const metaFilePath = path.join(postsDirectory, '_meta.json');
    const jsonData = fs.readFileSync(metaFilePath, 'utf8');
    const content = JSON.parse(jsonData);
    const posts = content.posts;
    const authors = content.authors;

    // Find the metadata for the current post
    const postMeta = posts.find((post: BlogPost) => post.name === slug);
    const authorMeta = authors.find((author: any) => author.id === postMeta.author);

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

// Your component to render the MDX content
const PostPage = ({ source, meta }: any) => {
    return (
        <div>
            <div className="striped1 hero bg-base-100 py-20">
                <div>
                    <div className="hero-content text-center">
                        <div className="gap-x-40 text-center flex flex-col text-center  items-center">
                            <p className="text-5xl">{meta.title}</p>
                            <p className='m-1'>{meta.date}</p>
                            <div className="flex flex-row gap-x-2">
                                {meta.tags.map((tag: string) => (
                                    <div key={tag} className="badge badge-neutral">{tag}</div>
                                ))}
                            </div>
                            <div className="text-sm breadcrumbs">
                                <ul>
                                    <li>
                                        <Link href="/posts">
                                            <FaRegNewspaper className='mx-2' /> Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <a>
                                            <HiOutlineDocumentText className='mx-2' />{meta.title}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero bg-base-200">
                <div className="py-40 w-700">
                    <div className="prose lg:prose-md m-auto">
                        <MDXRemote {...source} components={MDXComponents} />
                    </div>
                </div>
            </div>

            <div className="striped1 hero bg-base-100 py-20">
                <div className="py-1 w-700">
                    <div className='prose lg:prose-md m-auto b-1'>
                        <h2>Written By</h2>
                    </div>
                    <div className="stat bg-base-100 hover:bg-primary hover:text-blue-500">
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <Image alt="" src={meta.author.avatar} />
                                </div>
                            </div>
                        </div>
                        <div className='prose'>
                            <div className="stat-value ">{meta.author.id}</div>
                            <div className="stat-title">{meta.author.name}</div>
                            <div className="stat-desc text-secondary">{meta.author.bio}</div>
                            <div className='flex flex-1 flex-row'>
                                <Link href={meta.author.website} className='btn btn-ghost px-5 btn-xs'><FaGlobeAfrica /></Link> <Link className='btn btn-ghost px-5 btn-xs' href={meta.author.gh}><FaGithub /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-base-200 min-h-[400px]'>
                <UtterancesComments/>
            </div>
        </div>
    )
};

export default PostPage;
