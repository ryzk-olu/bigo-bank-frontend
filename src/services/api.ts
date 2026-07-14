import {
  MOCK_ACCESS_TOKEN,
  MOCK_PASSWORD,
  MOCK_USER,
} from "../mocks/auth";


import {
  MOCK_ACCOUNTS,
} from "../mocks/accounts";


import {
  MOCK_AVAILABLE_CURRENCIES,
} from "../mocks/currencies";


import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth";


import type {
  Account,
  Currency,
} from "../types/account";



const NETWORK_DELAY_MS = 1000;



const simulateNetwork = <T>(
  data: T
): Promise<T> =>
  new Promise((resolve) => {

    setTimeout(
      () => resolve(data),
      NETWORK_DELAY_MS
    );

  });




export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {


  await simulateNetwork(null);



  const isValidCredentials =
    username === MOCK_USER.username &&
    password === MOCK_PASSWORD;



  if (!isValidCredentials) {

    throw new Error(
      "Invalid username or password."
    );

  }



  return {

    accessToken: MOCK_ACCESS_TOKEN,

    tokenType: "Bearer",

    expiresIn: 3600,

  };

}






export async function fetchAccounts()
: Promise<Account[]> {


  return simulateNetwork(
    structuredClone(MOCK_ACCOUNTS)
  );

}






export async function fetchAvailableCurrencies()
: Promise<Currency[]> {


  return simulateNetwork(
    MOCK_AVAILABLE_CURRENCIES
  );

}






export async function createAccount(
  currency: Currency
): Promise<Account> {


  const account: Account = {

    id: Date.now(),

    currency,

    balance: 0,
  };



  MOCK_ACCOUNTS.push(account);



  return simulateNetwork(
    account
  );

}






export async function deposit(
  accountId: number
): Promise<Account> {


  const account =
    MOCK_ACCOUNTS.find(
      (item) =>
        item.id === accountId
    );



  if (!account) {

    throw new Error(
      "Account not found."
    );

  }




  if (account.balance >= 100000) {

    throw new Error(
      "Maximum balance limit reached."
    );

  }





  account.balance = Math.min(
    account.balance + 1000,
    100000
  );



  return simulateNetwork(
    account
  );

}
