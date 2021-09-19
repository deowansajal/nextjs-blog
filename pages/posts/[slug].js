import Head from 'next/head'

import PostContent from '../../components/posts/post-detail/post-content'
import { getPostsFiles, getPostData } from '../../lib/posts-util'

function PostDetailPage(props) {
    return (
        <>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </>
    )
}

export default PostDetailPage

export const getStaticProps = async context => {
    const { params } = context
    const { slug } = params

    const postData = getPostData(slug)

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    }
}

export const getStaticPaths = async context => {
    const postFilenames = getPostsFiles()

    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''))

    return {
        paths: slugs.map(slug => ({ params: { slug } })),
        fallback: false,
    }
}
