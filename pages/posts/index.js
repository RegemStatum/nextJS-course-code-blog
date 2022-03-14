import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../helpers/posts-util";

const AllPostsPage = (props) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="All posts of AlKon' blog" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export default AllPostsPage;

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
