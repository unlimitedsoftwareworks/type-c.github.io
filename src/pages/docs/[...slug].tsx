// src/pages/docs/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import DocsLayout from '../../components/DocsLayout';
import { getDocsSlugs } from '@/lib/docs';
import MDXComponents from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

const docsBasePath = path.join(process.cwd(), 'docs');


/**
 * Converts an array of path segments (slugs) into a file path to the Markdown or MDX file.
 * Assumes files are named after the last segment of the path with a .mdx or .md extension.
 *
 * @param {string[]} slugArray - An array of path segments representing the slug.
 * @return {string} The file path to the corresponding Markdown or MDX file.
 */
function getFilePathForSlug(slugArray: string[]) {
    console.log('slugArray:');
    console.log(slugArray);
    // Join the slug array into a path, append it to the base path
    let filePath = path.join(docsBasePath, ...slugArray);

    // Check if the path directly corresponds to a file (with .mdx or .md extension)
    if (fs.existsSync(`${filePath}.mdx`)) {
        return `${filePath}.mdx`;
    } else if (fs.existsSync(`${filePath}.md`)) {
        return `${filePath}.md`;
    }

    // If not a direct file, it might be an index file inside a directory named after the last slug part
    if (fs.existsSync(path.join(filePath, 'index.mdx'))) {
        return path.join(filePath, 'index.mdx');
    } else if (fs.existsSync(path.join(filePath, 'index.md'))) {
        return path.join(filePath, 'index.md');
    }

    // Handle other cases as needed, possibly throw an error if the file cannot be found
}

interface DocItem {
    name: string;
    title: string;
    items?: DocItem[];
}

type DocPageProps = {
    docsStructure: DocItem[]; // Use the structured documentation data
    source: any; // Type for serialized MDX content. Consider using MDXRemoteSerializeResult from 'next-mdx-remote' if you're using it
    frontMatter: { [key: string]: any }; // Adjust based on your frontmatter structure
};

// In your Next.js page or component file

// Assuming `source` is your serialized MDX content

const DocPage: React.FC<DocPageProps> = ({ source, frontMatter, docsStructure }) => {
    return (
        <DocsLayout docsStructure={docsStructure}>
            <article>
                <MDXRemote {...source} components={MDXComponents} />
            </article>
        </DocsLayout>
    );
};


export async function getStaticPaths() {
    const slugs = getDocsSlugs();
    const paths = slugs.map(slug => ({
      params: { slug: slug.split('/') },
    }));
  
    console.log(paths); // Make sure this is outputting the expected array structure
  
    return {
      paths,
      fallback: false,
    };
  }
  
  


interface DocItem {
    name: string;
    title: string;
    items?: DocItem[];
}
// Helper function to recursively get documentation structure
function getDocsStructure(dirPath = 'docs', basePath = ''): DocItem[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const structure: DocItem[] = [];

    entries.forEach(entry => {
        const entryPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            const metaPath = path.join(entryPath, '_meta.json');
            if (fs.existsSync(metaPath)) {
                const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                const items = getDocsStructure(entryPath, `${basePath}${entry.name}/`);
                structure.push({ name: basePath + entry.name, title: metaData.title || entry.name, items });
            }
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            // Assuming file names map directly to slug names
            const slug = entry.name.replace(/\.mdx$/, '');
            structure.push({ name: `${basePath}${slug}`, title: slug }); // Placeholder title
        }
    });

    return structure;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const filePath = getFilePathForSlug(slug); // Get the file path for the slug (helper function not shown here
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents); // Parses frontmatter from the MDX
    const mdxSource = await serialize(content, {
        // Pass options to MDX serialization
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            // Optionally, add rehypePlugins here if you have any
        }
    });

    const slugs = getDocsSlugs(); // Get the list for the sidebar

    const docsStructure = getDocsStructure();


    return {
        props: {
            slugs,
            source: mdxSource,
            frontMatter: data,
            docsStructure
        },
    };
};

export default DocPage;
