import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  fetchAccounts,
  createAccount,
  deposit as depositRequest,
} from "../services/api";

import type {
  Account,
  Currency,
} from "../types/account";


interface AccountContextValue {

  accounts: Account[];

  isLoading: boolean;

  openAccount(
    currency: Currency
  ): Promise<void>;

  deposit(
    accountId: number
  ): Promise<void>;

}


const AccountContext =
  createContext<AccountContextValue | undefined>(
    undefined
  );


interface AccountProviderProps {

  children: ReactNode;

}


export function AccountProvider({
  children,
}: AccountProviderProps) {

  const [
    accounts,
    setAccounts,
  ] = useState<Account[]>([]);


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  useEffect(() => {

    async function loadAccounts() {

      const data =
        await fetchAccounts();

      setAccounts(data);

      setIsLoading(false);

    }

    loadAccounts();

  }, []);


async function openAccount(
  currency: Currency
) {

  const accountExists =
    accounts.some(
      (account) =>
        account.currency === currency
    );


  if (accountExists) {

    throw new Error(
      `Account ${currency} already exists.`
    );

  }



  const account =
    await createAccount(currency);



  setAccounts(
    (previous) => [

      ...previous,

      account,

    ]
  );

}


  async function deposit(
    accountId: number
  ) {

    const updated =
      await depositRequest(accountId);

    setAccounts(
      (previous) =>

        previous.map(
          (account) =>

            account.id === updated.id
              ? updated
              : account

        )

    );

  }


  const value =
    useMemo(
      () => ({

        accounts,

        isLoading,

        openAccount,

        deposit,

      }),

      [
        accounts,
        isLoading,
      ]
    );


  return (

    <AccountContext.Provider
      value={value}
    >

      {children}

    </AccountContext.Provider>

  );

}


export function useAccounts() {

  const context =
    useContext(AccountContext);

  if (!context) {

    throw new Error(
      "useAccounts must be used inside AccountProvider"
    );

  }

  return context;

}
