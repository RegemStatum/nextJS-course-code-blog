import Head from "next/head";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import Hero from "../components/home-page/Hero";
import { getFeaturedPosts } from "../helpers/posts-util";

const HomePage = (props) => {
  const { featuredPosts } = props;

  return (
    <>
      <Head>
        <title>AlKon Blog</title>
        <meta name="description" content="I post about NextJS and React" />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  return {
    props: {
      featuredPosts: getFeaturedPosts(),
    },
  };
}
