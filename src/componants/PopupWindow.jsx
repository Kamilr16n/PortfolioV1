"use client"

import { useState, useEffect } from "react"

export default function PopupWindow({ onClose, title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-lg max-w-2xl w-full transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-white bg-opacity-30 rounded text-white hover:bg-opacity-40 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

