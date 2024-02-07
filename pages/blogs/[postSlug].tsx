import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  const { title, content } = post;
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-gray-900 text-2xl py-5 font-semibold">{title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  //reading path
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: { content: MDXRemoteSerializeResult; title: string };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as IStaticProps;

    const filePathToRead = path.join(process.cwd(), `posts/${postSlug}.md`);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });

    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });
    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
