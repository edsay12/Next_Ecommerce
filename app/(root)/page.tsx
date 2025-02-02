import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Button variant={"default"} size={"lg"}>Click me</Button>
    </div>
  );
};

export default Home;
