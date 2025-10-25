import Image from "next/image";

export default function Home() {
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
        <div className="mt-2 py-5 px-5 rounded-3xl w-full sm:w-1/2 lg:w-1/3 h-[50vh] bg-white border border-[#E4E7EC]">
          <input className="px-2 py-1 text-md rounded-lg bg-background border border-[#E4E7EC]">

          </input>
        </div>
      </div>

    </div>
  );
}
