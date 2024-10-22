// src/app/buttons/page.js
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Example from '../../components/Example';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';
import Head from 'next/head';

const Page = async () => {
  // Load the Markdown file
  const filePath = path.join(process.cwd(), 'src/app/markdown/markdown.md'); // Update with your file path
  const content = fs.readFileSync(filePath, 'utf8');

  // Parse the Markdown content
  const { data: meta } = matter(content);
    console.log(meta);

  return (
      <>
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords?.join(', ')} />
      </head>
    <body>
        
      <div>
      <h1 className='bg-yellow-400'>{meta.title}</h1>
      <ReactMarkdown
        children={content}
        components={{
          example: ({ children }) => <Example>{children}</Example>, // Render children inside Example
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // Allow raw HTML rendering
      />
    </div>
    </body>
    </>
  );
};

export default Page;
