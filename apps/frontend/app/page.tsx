import { redirect } from "next/navigation";

const Home = () => {
  redirect("/recipes");
};

export default Home;
