import { MAX_HEARTS } from '../../store/gameReducer'

export default function HeartBar({ hearts }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <span
          key={i}
          className={`text-lg transition-all duration-300 ${i < hearts ? 'opacity-100' : 'opacity-20 grayscale'}`}
        >
          ❤️
        </span>
      ))}
    </div>
  )
}
