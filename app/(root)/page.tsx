import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Button variant={"default"} size={"lg"}>Click me</Button>
      <Loading/>
    </div>
  );
};

export default Home;
