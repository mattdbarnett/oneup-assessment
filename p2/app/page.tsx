"use client";

import { useState, useEffect } from "react";

function calculateComission(input: number) {
  return String(input + 5);
}

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const [comVal, setComVal] = useState("");
  
  /**
   * On input change, calculate comission.
   */
  useEffect(() => {
    const inputInt = parseInt(inputVal, 10)
    if ( inputVal === "" || isNaN(inputInt) ) {
      setComVal("");
      return;
    }

    setComVal(calculateComission(inputInt));
  }, [inputVal]);

  return (
    <div className="px-5">

      {/** Comission Calculator Component **/}
      <div className="pt-6">

        {/** Top-Row **/}
        <div className="flex flex-row w-full">
          <h2 className="font-bold text-xl">
            Comission Calculator
          </h2>
          <div className="flex items-center px-5">
            <button>
              Test
            </button>
          </div>
        </div>

        {/** Content **/}
        <div className="mt-2 py-5 px-5 rounded-3xl w-full sm:w-1/2 lg:w-1/3 h-full bg-white border border-[#E4E7EC]">
          <div className="flex flex-col justify-center w-full mb-4 rounded-lg">
            <div className={ `mx-auto text-4xl font-bold ${(comVal) ? 'text-green-600' : 'text-gray-300'}` }>
              {comVal || "Enter Value"}
            </div>
            <div className="mx-auto italic text-md text-gray-500 mt-2">Total Commission</div>
          </div>

          <div className="flex">
            <input
              type="number"
              onChange={(e) => setInputVal(e.target.value)}
              className="w-2/3 mx-auto px-2 py-1 text-md rounded-lg bg-background border border-[#E4E7EC]"
            ></input>
          </div>
        </div>
      </div>

    </div>
  );
}
