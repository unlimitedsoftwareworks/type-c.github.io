/**
 * Generates a single JSON file containing all the metadata for the documentation.
 * Used for the search feature in the documentation
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDirectory = path.join(process.cwd(), 'docs');
const metaFilePath = path.join(docsDirectory, '_meta.json');

const readMetaData = () => {
    const rawMeta = fs.readFileSync(metaFilePath, 'utf8');
    return JSON.parse(rawMeta);
};

// Flatten meta data into a map of slug -> title
const flattenMeta = (meta, basePath = '') => {
    let titleMap = new Map();

    meta.forEach(entry => {
        const currentPath = basePath ? `${basePath}/${entry.name}` : entry.name;
        titleMap.set(currentPath, entry.title);

        if (entry._meta) {
            const subMap = flattenMeta(entry._meta, currentPath);
            titleMap = new Map([...titleMap, ...subMap]);
        }
    });

    return titleMap;
};

const generatePaths = (metaData, basePath = '') => {
    let paths = [];

    metaData.forEach(entry => {
        const filePath = path.join(basePath, entry.name + '.mdx');

        if (entry._meta) {
            paths = paths.concat(generatePaths(entry._meta, path.join(basePath, entry.name)));
        }
        else {
            paths.push(filePath);
        }
    });

    return paths;
};

async function generateSearchIndex() {
    const searchIndex = [];
    const docsDir = path.join(process.cwd(), 'docs');
    const meta = readMetaData();
    const titleMap = flattenMeta(meta);

    // Recursively get all MDX files
    const getMDXFiles = (dir) => {
        const files = fs.readdirSync(dir);
        const mdxFiles = [];

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                mdxFiles.push(...getMDXFiles(filePath));
            } else if (file.endsWith('.mdx')) {
                mdxFiles.push(filePath);
            }
        }

        return mdxFiles;
    };

    const mdxFiles = getMDXFiles(docsDir);

    for (const filePath of mdxFiles) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const relativePath = path.relative(docsDir, filePath);
        const slug = relativePath.replace(/\.mdx$/, '');

        // Extract content while removing headers and markdown formatting
        const cleanContent = content
            .replace(/^#.*$/gm, '') // Remove headers
            .replace(/^[=\-]{3,}$/gm, '') // Remove header underlines
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
            .replace(/`[^`]+`/g, '') // Remove code blocks
            .replace(/\n+/g, ' ') // Replace newlines with spaces
            .trim();

        // Get a reasonable excerpt length (first 200 characters)
        const excerpt = cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : '');

        // Use title from meta, fallback to frontmatter title
        const title = titleMap.get(slug) || data.title || '';

        searchIndex.push({
            title,
            slug,
            excerpt: excerpt.trim(),
        });
    }

    // Write the search index to a JSON file
    fs.writeFileSync(
        path.join(process.cwd(), 'public', 'search-index.json'),
        JSON.stringify(searchIndex, null, 2)
    );
}

generateSearchIndex();
