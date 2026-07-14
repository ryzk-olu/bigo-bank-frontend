import AccountCard from "./AccountCard";

import type { Account } from "../../types/account";


interface AccountsListProps {

  accounts: Account[];

  onDeposit(
    accountId: number
  ): void;

}



export default function AccountsList({
  accounts,
  onDeposit,
}: AccountsListProps) {


  return (

    <div
      className="
        flex
        flex-col
        gap-4  
        w-1/2
      "
    >

      {accounts.map(
        (account) => (

          <AccountCard

            key={account.id}

            account={account}

            onDeposit={onDeposit}

          />

        )
      )}

    </div>

  );

}
