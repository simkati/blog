import type { NextPage } from "next";
import { Inter } from "next/font/google";
import exp from "constants";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  return <h1 className="text-3xl font-bold underline">Helló world!</h1>;
};

export default Home;
