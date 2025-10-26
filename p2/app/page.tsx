"use client";

import { useState, useEffect } from "react";

interface CommissionBand {
  start: number;
  end: number | null;
  rate: number;
}

interface CommissionBreakdown {
  band: string;
  amount: number;
}

const COMMISSION_BANDS: CommissionBand[] = [
  { start: 0, end: 5000, rate: 0 },
  { start: 5000, end: 10000, rate: 0.10 },
  { start: 10000, end: 15000, rate: 0.15 },
  { start: 15000, end: 20000, rate: 0.20 },
  { start: 20000, end: null, rate: 0.25 }
];

function calculateCommission(input: number) {
  let totalCommission = 0;
  const details: CommissionBreakdown[] = [];

  /**
   * Loop through bands
   */
  for (const band of COMMISSION_BANDS) {
    
    const bandStart = band.start;
    const bandEnd = band.end ?? Infinity;

    /**
     * If input isn't in band, break
     */
    if (input <= bandStart) {
      break;
    }

    /**
     * Calculate commission for this band.
     * 
     * Get the band sum by:
     * - The lesser of the total input or the band's upper limit
     * - Minus the band start
     * 
     * Get the band commission by:
     * - Multiplying the sum within the band by the band rate.
     * 
     * Then add the band commission to the total commission
     */
    const bandSum = Math.min(input, bandEnd) - bandStart;
    const bandCommission = bandSum * band.rate;
    totalCommission += bandCommission;

    /**
     * If the band has an upper limit defined, make the label "lower -> upper"
     * If not, make the label "lower+"
     */
    let bandLabel = "";
    if ( band.end ) {
      bandLabel = `£${band.start / 1000}k -> ${(band.end / 1000)}k`;
    } else {
      bandLabel = `£${band.start / 1000}k+`
    }

    /**
     * Push the label and the individual band commission to the details
     */
    details.push({
      band: `${bandLabel}, ${(band.rate * 100).toFixed(0)}%`,
      amount: bandCommission
    });
  }

  /**
   * Return commission total (rounded) and details
   */
  return { "commission": String(totalCommission.toFixed(2)), "details": details };
}

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const [comVal, setComVal] = useState("");
  const [details, setDetails] = useState<CommissionBreakdown[]>([]);

  /**
   * On input change, calculate commission.
   */
  useEffect(() => {
    const inputInt = parseInt(inputVal, 10)
    if ( inputVal === "" || isNaN(inputInt) ) {
      setComVal("");
      setDetails([]);
      return;
    }

    /**
     * Calculate commission and update state
     */
    const results = calculateCommission(inputInt);
    setComVal(results['commission']);
    setDetails(results['details']);
  }, [inputVal]);

  return (
    <div className="px-5">

      {/** commission Calculator Component **/}
      <div className="pt-6">

        {/** Top-Row **/}
        <div className="flex flex-row w-full">
          <h2 className="font-bold text-xl">
            commission Calculator
          </h2>
        </div>

        {/** Content **/}
        <div className="flex flex-col md:flex-row h-full md:max-h-[20vh]">
          {/** Input Widget **/}
          <div className="mt-2 py-5 px-5 rounded-3xl w-full h-full bg-white border border-[#E4E7EC]">
            <div className="w-full">
              <div className="flex flex-col justify-center w-full mb-4 rounded-lg">
                <div className={ `mx-auto text-4xl font-bold ${(comVal) ? 'text-green-600' : 'text-gray-300'}` }>
                  {comVal ? `£${comVal}` : "Enter Value"}
                </div>
                <div className="mx-auto italic text-md text-gray-500 mt-2">Total Commission</div>
              </div>

              <div className="flex mb-4">
                <input
                  type="number"
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter revenue"
                  className="w-2/3 mx-auto px-2 py-1 text-md rounded-lg bg-background border border-[#E4E7EC]"
                ></input>
              </div>
            </div>
          </div>

          {/** Details Widget **/}
          <div className="w-full h-full p-2 overflow-auto">
            { details && details.length > 0 && (
              <div className="flex flex-row flex-wrap gap-2 h-full content-start">
                {details.map((item, index) => (
                  <div key={index} className="flex justify-between items-center h-1/2 w-1/3 py-2 px-3 bg-white rounded-lg border border-[#E4E7EC]">
                    <span className="text-sm text-gray-600">{item.band}</span>
                    <span className="font-semibold text-green-600">£{item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
