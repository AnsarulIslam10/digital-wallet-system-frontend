import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1>You are not authorized to view this route</h1>
      <Button>
        <Link to={"/"}>Go Back Home</Link>
      </Button>
    </div>
  );
}
