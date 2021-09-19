import Head from 'next/head'

import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'

function HomePage(props) {
    return (
        <>
            <Head>
                <title>Deowan' Blog</title>
                <meta
                    name="description"
                    content="I post about programming and development"
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </>
    )
}

export default HomePage

export const getStaticProps = async props => {
    const featuredPosts = getFeaturedPosts()

    return {
        props: {
            posts: featuredPosts,
        },
    }
}
