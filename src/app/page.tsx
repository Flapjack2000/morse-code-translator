"use client"
import { ArrowBigRightDash } from "lucide-react";
import { MorseEnglishPair, MorseTree } from "./morseTree";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  // const [mode, setMode] = useState<"mte" | "etm">("mte")

  const textboxStyles = "max-w-25 ml-2 mr-2 md:max-w-auto border rounded p-1 h-20 shadow-xl resize-none"

  const tree = new MorseTree()

  const handleTranslate = () => {
    setOutputText(tree.translate(inputText));
  }

  return (
    <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
      <h1 className="text-xl md:text-3xl text-center md:mt-10">Morse Code Translator</h1>
      <h1 className="m-2 text-center text-sm md:text-xl">
        -- --- .-. ... . / -.-. --- -.. . / - .-. .- -. ... .-.. .- - --- .-. / -... -.-- / --.. .- -.-. .... / ---... -.--.-
      </h1>


      <div className="flex items-center ml-2 mr-2 ">

        <div className="flex flex-col">
          <label className="text-right italic" htmlFor="input">
            Morse Code Input
          </label>
          <textarea
            placeholder=".... . .-.. .-.. ---"
            onChange={(e) => { setInputText(e.target.value) }}
            value={inputText}
            id="input" className={textboxStyles}></textarea>
        </div>

        <button className="hover:bg-gray-50 shadow-lg italic p-1 rounded flex m-4 mt-8 items-center border h-fit cursor-pointer gap-1" type="button"
          onClick={handleTranslate}
        >
          Translate
          <ArrowBigRightDash strokeWidth={1.5} size={24} />
        </button>

        <div className="flex flex-col">
          <label className="text-left italic" htmlFor="output">
            English Output
          </label>
          <textarea
            placeholder="hello"
            disabled
            readOnly
            defaultValue={outputText}
            id="output" className={textboxStyles}></textarea>
        </div>

      </div>


      <div className="flex flex-col gap-2">
        <p className="font-bold indent-[-20]">Writing Morse Code</p>
        <ul className="list-disc">
          <li>Use &quot;.&quot; or &quot;*&quot; for dots and &quot;-&quot; or &quot;_&quot; for dashes.</li>
          <li>Use &quot;/&quot; for spaces between words.</li>
        </ul>
      </div>

      <table className="w-80 text-2xl mb-8 border-collapse">
        <tbody>
          <tr>
            <th>English</th>
            <th>Morse</th>
          </tr>
          {tree.toSortedArray().map((pair: MorseEnglishPair, index) => (
            <tr
              key={index}
              className="
              even:bg-gray-300 text-center
              *:w-max *:border"
            >
              <td>{pair[0]}</td>
              <td className="tracking-widest">{pair[1]}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}
