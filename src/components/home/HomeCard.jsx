export default function HomeCard({ card, onClick }) {
  const isDisabled = card.disabled || !card.path;

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      className={`
        group
        bg-white rounded-2xl p-6 sm:p-8
        shadow-lg
        flex flex-col items-center justify-center
        transition-all duration-300 ease-out
        ${
          isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:ring-2 hover:ring-[#0F75BC]/40 active:scale-95'
        }
      `}
    >
      {/* Icon */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <img
          src={card.icon}
          alt={card.title}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </div>

      {/* Title */}
      <div
        className={`
          font-bold text-lg sm:text-xl transition-colors duration-300
          ${isDisabled ? 'text-gray-400' : 'text-[#0F75BC] group-hover:text-blue-600'}
        `}
      >
        {card.title}
      </div>

      {/* Status */}
      {isDisabled && (
        <span className="mt-2 text-xs text-gray-400">
          ກຳລັງພັດທະນາ
        </span>
      )}
    </div>
  );
}
