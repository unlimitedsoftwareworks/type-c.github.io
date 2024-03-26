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
    return "404"
}

export interface DocItem {
    name: string;
    title: string;
    items?: DocItem[];
}

type DocPageProps = {
    docsStructure: DocItem[]; // Use the structured documentation data
    prevDoc: DocItem | null;
    nextDoc: DocItem | null;
    activeDoc: DocItem;
    source: any; // Type for serialized MDX content. Consider using MDXRemoteSerializeResult from 'next-mdx-remote' if you're using it
    frontMatter: { [key: string]: any }; // Adjust based on your frontmatter structure
};

// In your Next.js page or component file

// Assuming `source` is your serialized MDX content

const DocPage: React.FC<DocPageProps> = ({ source, frontMatter, docsStructure, prevDoc, nextDoc, activeDoc }) => {
    return (
        <DocsLayout docsStructure={docsStructure} nextDoc={nextDoc} prevDoc={prevDoc} activeDoc={activeDoc}>
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

    return {
        paths,
        fallback: false,
    };
}

// Helper function to load the initial _meta.json and structure the documentation
function loadAndStructureDocs(baseDir = 'docs') {
    const metaPath = path.join(baseDir, '_meta.json');
    if (!fs.existsSync(metaPath)) {
        console.error('Base _meta.json does not exist at the specified location:', metaPath);
        return [];
    }

    const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    return getDocsStructure(metaData, baseDir);
}

function getDocsStructure(metaData: any, dirPath = 'docs', basePath = '') {
    let structure: DocItem[] = [];

    for(let i = 0; i < metaData.length; i++) {
        let entry = metaData[i];

        if (entry._meta) {
            // Entry represents a directory with subdocuments
            const subDirPath = path.join(dirPath, entry.name);
            const subBasePath = `${basePath}${entry.name}/`;
            const subStructure = getDocsStructure(entry._meta, subDirPath, subBasePath);


            // Group this directory's documents under a single entry
            structure.push({ name: `${basePath}${entry.name}`, title: entry.title, items: subStructure});
        } else {
            // Entry represents an individual document
            const filePath = path.join(dirPath, `${entry.name}.mdx`);
            if (fs.existsSync(filePath)) {
                // File exists, add to structure
                structure.push({ name: `${basePath}${entry.name}`, title: entry.title});
            }
        }
    }

    return structure;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string[];
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

    const docsStructure = loadAndStructureDocs();
    
    // flatten the structure to find the previous and next documents
    let flatDocs: DocItem[] = [];
    
    const flattenDocs = (docs: DocItem[]) => {
        for(let i = 0; i < docs.length; i++) {
            if(docs[i].items) {
                flattenDocs(docs[i].items!);
            } else {
                flatDocs.push({
                    name: docs[i].name,
                    title: docs[i].title,
                });
            }
        }
    }

    flattenDocs(docsStructure);
    const currentDocIndex = flatDocs.findIndex(doc => doc.name === slug.join('/'));
    let prevDoc = currentDocIndex > 0 ? flatDocs[currentDocIndex - 1] : null;
    let nextDoc = currentDocIndex < flatDocs.length - 1 ? flatDocs[currentDocIndex + 1] : null;
    let activeDoc = flatDocs[currentDocIndex];

    return {
        props: {
            slugs,
            source: mdxSource,
            frontMatter: data,
            docsStructure,
            prevDoc, // new
            nextDoc, // new
            activeDoc,
        },
    };
};

export default DocPage;
