import { Suspense } from "react";
import WalletClient from "./WalletClient";

export default function WalletPage() {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <WalletClient />
    </Suspense>
  );
}
