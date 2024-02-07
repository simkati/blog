import BlogCard from "@/components/BlogCard";
import { InferGetStaticPropsType, NextPage } from "next";
import { readPostsInfo } from "@/lib/helper";
import { PostApiResponse } from "@/utils/types";

export const getStaticProps = async () => {
  //   const { readPostsInfo }: postApiResponse = await fetch(
  //     "http://localhost:3000/api/posts"
  //   ).then((data) => data.json());
  const postInfo: PostApiResponse = readPostsInfo();
  return {
    props: { posts: postInfo },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mxw-3-3x1 mx-auto p-5 space-y-5">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Blogs;
