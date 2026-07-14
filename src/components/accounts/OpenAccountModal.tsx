import {
  useEffect,
  useState,
} from "react";

import type {
  Currency,
} from "../../types/account";

import {
  fetchAvailableCurrencies,
} from "../../services/api";


interface OpenAccountModalProps {

  isOpen: boolean;

  onClose(): void;

  onOpenAccount(
    currency: Currency
  ): void;

}



export default function OpenAccountModal({
  isOpen,
  onClose,
  onOpenAccount,
}: OpenAccountModalProps) {


  const [
    currencies,
    setCurrencies,
  ] = useState<Currency[]>([]);



  useEffect(() => {

    if (!isOpen) {
      return;
    }


    async function loadCurrencies() {

      const availableCurrencies =
        await fetchAvailableCurrencies();


      setCurrencies(
        availableCurrencies
      );

    }


    loadCurrencies();


  }, [isOpen]);




  if (!isOpen) {

    return null;

  }




  return (

    <div
      className="
        fixed
        inset-0
        bg-black/30
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-surface
          rounded-2xl
          shadow-xl
          p-8
          w-full
          max-w-sm
        "
      >


        <h2
          className="
            text-2xl
            font-semibold
            text-text
            mb-6
          "
        >
          Open multi-currency account
        </h2>




        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {
            currencies.map(
              (currency) => (

                <button

                  key={currency}

                  type="button"

                  onClick={() => {

                    onOpenAccount(
                      currency
                    );

                    onClose();

                  }}

                  className="
                    bg-primary
                    hover:bg-primary-dark
                    text-white
                    rounded-lg
                    px-4
                    py-3
                    transition
                  "

                >

                  Open {currency}

                </button>

              )
            )
          }


        </div>





        <button

          type="button"

          onClick={onClose}

          className="
            mt-6
            w-full
            border
            rounded-lg
            px-4
            py-2
            text-text
          "

        >

          Cancel

        </button>



      </div>


    </div>

  );

}
