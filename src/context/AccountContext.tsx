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
  fetchExchangeRates,
  createAccount,
  deposit as depositRequest,
} from "../services/api";

import type {
  Account,
  Currency,
} from "../types/account";

import type {
  ExchangeRate,
} from "../types/exchangeRate";


interface AccountContextValue {

  accounts: Account[];

  exchangeRates: ExchangeRate[];

  isLoading: boolean;

  openAccount(currency: Currency): Promise<void>;

  deposit(accountId: number): Promise<void>;

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

  const [
    exchangeRates,
    setExchangeRates,
  ] = useState<ExchangeRate[]>([]);


  useEffect(() => {

    async function loadData() {

      const [
        accountsData,
        ratesData,
      ] = await Promise.all([
        fetchAccounts(),
        fetchExchangeRates(),
      ]);

      setAccounts(accountsData);

      setExchangeRates(ratesData);

      setIsLoading(false);

    }

    loadData();

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

        exchangeRates,

        isLoading,

        openAccount,

        deposit,

      }),

      [
        accounts,
        exchangeRates,
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
