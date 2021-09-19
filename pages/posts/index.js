import Head from 'next/head'

import AllPosts from '../../components/posts/all-posts'

import { getAllPosts } from '../../lib/posts-util'

function AllPostsPage(props) {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta name="description" content="All the blog posts" />
            </Head>
            <AllPosts posts={props.posts} />
        </>
    )
}

export default AllPostsPage

export const getStaticProps = async () => {
    const allPosts = getAllPosts()

    return {
        props: {
            posts: allPosts,
        },
    }
}
