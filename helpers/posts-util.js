import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join("posts");

function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    date: "",
    isFeatured: false,
    ...data,
    content,
  };
  return postData;
}

function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((file) => {
    return getPostData(file);
  });

  const sortedPosts = allPosts.sort((postA, postB) => {
    return postA.date > postB.date ? -1 : 1;
  });

  return sortedPosts;
}

function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export { getAllPosts, getFeaturedPosts, getPostData, getPostsFiles };
