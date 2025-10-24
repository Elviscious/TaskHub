import { Suspense } from "react";
import WalletClient from "./components/walletclient";

export default function WalletPage() {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <WalletClient />
    </Suspense>
  );
}
