import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Blocked() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1>You are blocked by the admin. You cannot access the dashboard</h1>
      <p>Contact admin for additional query</p>

      <Button>
        <Link to={"/contact"}>Contact</Link>
      </Button>

      <Button>
        <Link to={"/"}>Go Back Home</Link>
      </Button>
    </div>
  );
}
