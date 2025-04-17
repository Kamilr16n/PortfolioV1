export default function MyStoryPopup({ onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 sm:p-8 rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">My Story</h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
          Technology has always been my way of expressing myself. While some create with paint or words, I build with code.

My journey started with pure curiosity—taking things apart, experimenting with web design, and learning how digital experiences come to life. That passion led me to study Web Development and Multimedia, where I mastered front-end technologies, UI/UX, and even 3D design.

Today, I create modern, user-friendly, and visually engaging digital experiences. Always learning, always building—I'm excited for what's next. Let's create something great together. 🚀
          </p>
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 bg-white bg-opacity-30 rounded text-white text-sm sm:text-base hover:bg-opacity-40 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
  
  