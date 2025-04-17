export default function HireMePopup({ onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 sm:p-8 rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Hire Me</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                Name
              </label>
              <input type="text" id="name" className="w-full px-3 py-2 bg-white bg-opacity-10 rounded text-sm sm:text-base" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm sm:text-base">
                Email
              </label>
              <input type="email" id="email" className="w-full px-3 py-2 bg-white bg-opacity-10 rounded text-sm sm:text-base" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 text-sm sm:text-base">
                Message
              </label>
              <textarea id="message" rows="4" className="w-full px-3 py-2 bg-white bg-opacity-10 rounded text-sm sm:text-base"></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-white bg-opacity-30 rounded text-white text-sm sm:text-base hover:bg-opacity-40 transition-all duration-300"
              >
                Send
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white bg-opacity-30 rounded text-white text-sm sm:text-base hover:bg-opacity-40 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  