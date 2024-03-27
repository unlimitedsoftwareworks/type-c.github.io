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

const generatePaths = (metaData, basePath = '') => {
  let paths = [];

  metaData.forEach(entry => {
    const filePath = path.join(basePath, entry.name + '.mdx');

    if (entry._meta) {
      paths = paths.concat(generatePaths(entry._meta, path.join(basePath, entry.name)));
    }
    else 
    {

    paths.push(filePath);
    }
  });

  return paths;
};

const generateSearchIndex = () => {
  const metaData = readMetaData();
  const mdxPaths = generatePaths(metaData);

  const searchIndex = mdxPaths.map(filePath => {
    const fullPath = path.join(docsDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      slug: filePath.replace(/^docs\/|\.mdx$/g, ''),
      excerpt: content.slice(0, 200),
    };
  });

  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2), 'utf8');
};

generateSearchIndex();
