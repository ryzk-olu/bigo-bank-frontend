import type { ExchangeRate } from "../../types/exchangeRate";


interface ExchangeRatesWidgetProps {

  rates: ExchangeRate[];

}



export default function ExchangeRatesWidget({
  rates,
}: ExchangeRatesWidgetProps) {


  return (

  <aside
    className="
      bg-surface
      rounded-2xl
      shadow-lg
      p-6
      w-80
      shrink-0
    "
  >

      <h2
        className="
          text-xl
          font-semibold
          text-text
          mb-4
        "
      >
        Exchange rates
      </h2>


      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {rates.map(
          (rate) => (

            <div
              key={rate.currency}
              className="
                flex
                justify-between
                text-text
              "
            >

              <span className="font-medium">
                1 {rate.currency}
              </span>

              <span className="text-text-muted">
                {rate.rate.toFixed(2)} RSD
              </span>

            </div>

          )
        )}

      </div>

    </aside>

  );

}
