import React from 'react'

const popup = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4">
    <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-sm">
      <button
        type="button"
        className="absolute -end-1 -top-1 rounded-full border border-gray-200 bg-white p-1 text-gray-400"
      >
        <span className="sr-only">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
  
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <img
          alt=""
          src=""
          className="h-full w-full rounded-xl object-cover"
        />
  
        <div>
          <h2 className="text-lg font-medium">
            Your Laptop is not working? Project deadline already? 
          </h2>
  
          <p className="mt-4 text-sm text-gray-500">
            We,UCARB provides new projects at low cost at great functionalities for use. Your stress will drop like Blood pressure as you chill and drink a cup of tea while we labour on 
          </p>
  
          <div className="mt-6 sm:text-right">
            <a
              href="https://www.bracu.ac.bd/S"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Find out more at
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default popup