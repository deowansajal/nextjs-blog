import Image from 'next/image'

import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

import classes from './post-content.module.css'

import PostHeader from './post-header'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

function PostContent(props) {
    const { post } = props
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const customRenderer = {
        paragraph(paragraph) {
            const { node } = paragraph

            if (node.children[0].type === 'image') {
                const image = node.children[0]
                return (
                    <div>
                        <Image
                            src={`/images/posts/${post.slug}/${image.url}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                )
            }

            return <p>{paragraph.children}</p>
        },

        code(code) {
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={code.language}
                    children={code.value}
                />
            )
        },
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown renderers={customRenderer}>
                {post.content}
            </ReactMarkdown>
        </article>
    )
}

export default PostContent
