import {
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useAccounts,
} from "../context/AccountContext";

import AccountsList from "../components/accounts/AccountsList";
import OpenAccountModal from "../components/accounts/OpenAccountModal";
import ExchangeRatesWidget from "../components/accounts/ExchangeRatesWidget";

import type {
  Currency,
} from "../types/account";


export default function Dashboard() {

  const {
    user,
    logout,
  } = useAuth();


  const {
    accounts,
    exchangeRates,
    isLoading,
    deposit,
    openAccount,
  } = useAccounts();


  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);



  async function handleOpenAccount(
    currency: Currency
  ) {

    try {

      await openAccount(currency);

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Unable to open account"
      );

    }

  }
  
  async function handleDeposit(
  accountId: number
) {

  try {

    await deposit(accountId);

  } catch (error) {

    alert(
      error instanceof Error
        ? error.message
        : "Unable to deposit"
    );

  }

}


  if (isLoading) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-background
          text-text
        "
      >
        Loading...
      </div>
    );

  }



  return (

    <main
      className="
        min-h-screen
        bg-background
        p-8
      "
    >

      <header
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-primary
            "
          >
            BigO-Bank
          </h1>


          <p
            className="
              text-text-muted
              mt-1
            "
          >
            Welcome {user?.firstName}
          </p>

        </div>


        <button
          type="button"
          onClick={logout}
          className="
            bg-primary
            hover:bg-primary-dark
            text-white
            rounded-lg
            px-5
            py-2
          "
        >
          Logout
        </button>

      </header>



  <section>

    <h2 className="text-2xl font-semibold text-text mb-4">
      My Accounts
    </h2>


    <div className="flex gap-6 items-start">

      <AccountsList
        accounts={accounts}
        onDeposit={handleDeposit}
      />

      <ExchangeRatesWidget
        rates={exchangeRates}
      />

    </div>


    <button
      type="button"
      onClick={() => setIsModalOpen(true)}
      className="
        mt-4
        bg-primary
        hover:bg-primary-dark
        text-white
        rounded-lg
        px-5
        py-2
      "
    >
      + Add new
    </button>

  </section>

      <OpenAccountModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onOpenAccount={
          handleOpenAccount
        }
      />


    </main>

  );

}
