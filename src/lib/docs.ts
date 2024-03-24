// lib/docs.ts
import fs from 'fs';
import path from 'path';
let readFile = require('fs').promises.readFile;

// Assuming your docs folder is at the root of your project
const docsDirectory = path.join(process.cwd(), 'docs');

export const getDocPaths = (): { params: { slug: string } }[] => {
    const fileNames = fs.readdirSync(docsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                // Remove the file extension to get the slug
                slug: fileName.replace(/\.mdx?$/, ''),
            },
        };
    });
};

export const getDocBySlug = async (slug: string): Promise<string> => {
    const fullPath = path.join(docsDirectory, `${slug}.mdx`);
    const fileContents = await readFile(fullPath, 'utf8');
    return fileContents;
};

/**
 * Recursively gets the slugs of all documents within the docs directory, including nested directories.
 * 
 * @param {string} dir The current directory to search for mdx files.
 * @param {string} prefix The prefix to add to the slugs, used for nested directories.
 * @return {string[]} An array of slugs for all mdx documents found.
 */
export function getDocsSlugs(dir = docsDirectory, prefix = '') {
    let slugs: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            // If it's a directory, recurse into it and add its slug to the prefix
            const nestedSlugs = getDocsSlugs(path.join(dir, item.name), `${prefix}${item.name}/`);
            slugs = slugs.concat(nestedSlugs);
        } else if (item.isFile() && path.extname(item.name) === '.mdx') {
            // If it's an MDX file, add its slug, minus the extension, to the slugs array
            slugs.push(`${prefix}${item.name.replace(/\.mdx$/, '')}`);
        }
    });

    return slugs;
}