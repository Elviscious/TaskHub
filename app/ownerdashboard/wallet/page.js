import { Suspense } from "react";
import WalletClient from "./walletclient";

export default function WalletPage() {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <WalletClient />
    </Suspense>
  );
}
