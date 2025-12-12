export default function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-l-[#c4714d] overflow-hidden">
      {children}
    </div>
  )
}

