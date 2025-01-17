import Link from 'next/link';
import React from 'react';
import CodeHighlight from './CodeHighlight';
import { language } from 'gray-matter';
// Optionally import a style for the syntax highlighter
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Use appropriate HTML props for each element type
const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h1 {...props} />;
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h2 {...props} />;
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h3  {...props} />;
const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h4  {...props} />;
const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h5 {...props} />;
const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => <h6 {...props} />;

const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => <p className="mb-2" {...props} />;
const UL: React.FC<React.HTMLAttributes<HTMLUListElement>> = (props) => <ul className="list-disc pl-5 mb-2" {...props} />;
const LI: React.FC<React.HTMLAttributes<HTMLLIElement>> = (props) => <li {...props} />;
const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...props }) => (
    <Link href={href || ''} className="text-blue-600 hover:text-blue-800 visited:text-purple-600" {...props}>{children}</Link>
);
const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = (props) => (
  <div className='overflow-x-auto'><table  className="table table-xs" {...props} /></div>
);

const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead  {...props} />
);

const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <tbody {...props} />
);

const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (props) => (
  <tr {...props} />
);

const Th: React.FC<React.HTMLAttributes<HTMLTableHeaderCellElement>> = (props) => (
  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider" {...props} />
);

const Td: React.FC<React.HTMLAttributes<HTMLTableDataCellElement>> = (props) => (
  <td className="px-6 py-4 whitespace-nowrap" {...props} />
);
const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => <span className="badge badge-primary" {...props} />;
const blockAsCode = (props: React.HTMLAttributes<HTMLPreElement>) => <CodeHighlight code={props.children as any} language='typescript' />;
  

const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: UL,
  li: LI,
  a: A,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,

  // Inline code: directly use InlineCode for `code` elements not inside `pre`
  code: InlineCode, 
  
  // Block code: use a wrapper around CodeHighlight for `pre` elements.
  // This assumes all `pre` elements contain code blocks.
  pre: (props: React.HTMLAttributes<HTMLPreElement> & { children: React.ReactElement }) => {
    // Extract className to find language class (e.g., "language-js")
    const languageClass = (props.children.props as {className: string}).className || "";
    // Regex to extract the language from className
    const languageMatch = languageClass.match(/language-(\w+)/);
    // Default to "plaintext" if no language class is found
    const language = languageMatch ? languageMatch[1] : "plaintext";
    // The code is the inner text of the `code` element
    const code = (props.children.props as {children: string}).children;

    return <CodeHighlight code={code} language={language} />;
  }
};

export default MDXComponents;
