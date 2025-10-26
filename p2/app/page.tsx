"use client";

import { useState, useEffect } from "react";

/**
 * Things I would add in the future:
 * 
 * 1. A progress bar in the Commission Input widget that has dotted lines at every range boundary.
 * 
 * 2. I'm inserting the colours from the provided design using square brackets. If I were to 
 *    continue developing this project, I'd add these colours to globals.css under the @theme tag 
 *    so I could use them in standard tailwind classes.
 * 
 * 3. Add the blue circles prefacing every subheading within every widget from the design.
 * 
 * 4. Implement the font used in the original design.
 * 
 * 5. Add further front-end validation to the input (no negatives, no non-numeric characters, etc.).
 */

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
    <div className="min-h-screen px-5 py-8">

      {/** Commission Calculator Widget **/}
      <div className="max-w-7xl">

        {/** Top-Row **/}
        <div className="flex flex-row w-full mb-4">
          <h2 className="font-bold text-xl">
            Commission Calculator
          </h2>
        </div>

        {/** Content **/}
        <div className="flex flex-col lg:flex-row gap-5 h-full">
          {/** Input Widget **/}
          <div className="p-6 rounded-2xl w-full lg:w-1/2 h-full bg-white border border-[#E4E7EC]">
            <h3 className="text-md font-semibold mb-4">Commission Input</h3>

            <div className="w-full">
              <div className="flex flex-col justify-center w-full mb-6">
                <div className="mx-auto text-sm font-medium mb-3 tracking-wide">Total Commission</div>
                <div className={ `mx-auto text-5xl font-bold transition-all duration-300 ${(comVal) ? 'text-green-600' : 'text-[#E4E7EC]'}` }>
                  {comVal ? `£${comVal}` : "£0.00"}
                </div>
              </div>

              <div className="flex mb-2">
                <input
                  type="number"
                  onChange={(e) => setInputVal(e.target.value)}
                  min="0"
                  placeholder="Enter revenue"
                  className="w-full px-4 py-3 text-lg rounded-xl bg-background border border-[#E4E7EC] transition-all"
                ></input>
              </div>
            </div>
          </div>

          {/** Details Widget **/}
          <div className="w-full lg:w-1/2 h-full">
            { details && details.length > 0 ? (
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6">
                <h3 className="text-md font-semibold mb-4">Commission Breakdown</h3>
                <div className="flex flex-col gap-3">
                  {details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 px-4 bg-[#DBF3DB] rounded-xl border border-[#CDECCD]">
                      <span className="text-sm font-medium">{item.band}</span>
                      <span className="font-bold text-md text-green-600">£{item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 h-full flex items-center justify-center">
                <p className="text-gray-400 text-center">Enter revenue to see Commission Breakdown</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
