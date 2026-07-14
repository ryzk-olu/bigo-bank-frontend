import type { Account } from "../../types/account";


interface AccountCardProps {

  account: Account;

  onDeposit(
    accountId: number
  ): void;

}



export default function AccountCard({
  account,
  onDeposit,
}: AccountCardProps) {


  return (

    <article
      className="
        bg-surface
        rounded-2xl
        shadow-lg
        p-6
        flex
        flex-col
        gap-4
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
        "
      >

        <h3
          className="
            text-xl
            font-semibold
            text-text
          "
        >
          {account.currency}
        </h3>


        <span
          className="
            text-text-muted
            text-sm
          "
        >
          Account #{account.id}
        </span>

      </div>



      <p
        className="
          text-3xl
          font-bold
          text-primary
        "
      >
        {account.balance.toFixed(2)}
        {" "}
        {account.currency}
      </p>



      <button
        type="button"
        onClick={() => onDeposit(account.id)}
        className="
          bg-primary
          hover:bg-primary-dark
          text-white
          rounded-lg
          px-4
          py-2
          transition
        "
      >
        Deposit +1000
      </button>


    </article>

  );

}
