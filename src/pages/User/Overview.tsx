import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const { data, isLoading } = useGetMyWalletQuery(undefined);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p className="mb-4">
          Wallet Balance:{" "}
          <strong>{data?.data?.balance ?? 0}</strong> BDT
        </p>
      )}

      <div className="flex gap-3 mb-6">
        <Link to="/user/add-money"><Button>Add Money</Button></Link>
        <Link to="/user/withdraw"><Button>Withdraw</Button></Link>
        <Link to="/user/send"><Button>Send Money</Button></Link>
      </div>
    </div>
  );
}
