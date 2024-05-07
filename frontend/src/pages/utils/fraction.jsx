import React, {useRef, useState} from "react";
import {getGlobalMeta} from '~/queries/settings'
import {Head} from '~/components/Head'
import {Layout} from '~/components/Layout'
import {defaultFractions, generateFraction} from "~/utils/formatFraction";

const CopyIcon = () => {
  return (
    <svg
      height={20}
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 115.77 122.88"
      xmlSpace="preserve">
      <g>
        <path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" />
      </g>
    </svg>
  )
}

export default function Fraction({globalMeta}) {

  const data = useRef({
    numerator: '',
    denominator: ''
  })

  const [copyData, setCopyData] = useState({
    original: '',
    simplified: ''
  })

  const handleChange = (e) => {
    e.preventDefault()

    const {name, value} = e.target

    data.current[name] = value

    setCopyData(generateFraction(data.current.numerator, data.current.denominator))
  }

  return (
    <Layout>
      <Head global={globalMeta} pageTitle="Util | Fraction"/>
      <div className="mt-[--breadcrumb-height] w-full flex flex-row gap-30 p-20">
        <div className="w-1/2">
          <h3 className="font-bold mb-32">Generate Unicode Fraction</h3>
          <div className="flex flex-row gap-32">
            <div className="flex flex-col gap-10 w-1/2">
              <label>Numerator</label>
              <input className="border-2 py-5 px-10" name="numerator" type="number" placeholder='Numerator'
                     onChange={handleChange}/>
            </div>
            <div className="flex flex-col gap-10 w-1/2">
              <label>Denominator</label>
              <input className="border-2 py-5 px-10" name="denominator" type="number" placeholder='Denominator'
                     onChange={handleChange}/>
            </div>
          </div>
          <div className="mt-32 flex flex-row gap-32">
            <div className="flex flex-row justify-between items-center gap-10 w-1/2">
              <label>Original</label>
              <div className="border py-5 px-10 w-1/2 text-center">{copyData.original || '-'}</div>
              <button disabled={!copyData.original} onClick={() => navigator.clipboard.writeText(copyData.original)}
                      className="flex gap-10 disabled:text-gray-400 disabled:cursor-not-allowed">Copy <CopyIcon/>
              </button>
            </div>
            <div className="flex flex-row justify-between items-center gap-10 w-1/2">
              <label>Simplified</label>
              <div className="border py-5 px-10 w-1/2 text-center">{copyData.simplified || '-'}</div>
              <button disabled={!copyData.simplified} onClick={() => navigator.clipboard.writeText(copyData.simplified)}
                      className="flex gap-10 disabled:text-gray-400 disabled:cursor-not-allowed">Copy <CopyIcon/>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="font-bold mb-32">Default Fraction</h3>
          <div className="flex flex-row flex-wrap">
            {Object.values(defaultFractions).map(item => (
              <div key={item} className="flex flex-row justify-evenly my-5 border-b py-5 w-1/2">
                <div>{item}</div>
                <button onClick={() => navigator.clipboard.writeText(item)} className="flex gap-10">
                  <CopyIcon/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const [globalMeta] = await Promise.all([
    getGlobalMeta(),
  ])

  return {
    props: {
      globalMeta,
    }
  }
}
