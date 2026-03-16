// Lesson reading card — no interaction needed, just "Continuer"
export default function LessonCard({ exercise, onNext }) {
  return (
    <div className="animate-slide-up space-y-6">
      <h2 className="font-display font-black text-2xl text-gray-900">{exercise.title}</h2>

      <div className="space-y-5">
        {exercise.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-4 rounded-2xl transition-all text-lg"
      >
        J'ai compris ! Continuer →
      </button>
    </div>
  )
}

function ContentBlock({ block }) {
  if (block.visual === 'zopa') {
    return <ZOPAVisual />
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2">
      {block.heading && (
        <h3 className="font-bold text-gray-900">{block.heading}</h3>
      )}
      {block.text && (
        <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(block.text) }} />
      )}
      {block.bullets && (
        <ul className="space-y-2 mt-2">
          {block.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600">
              <span dangerouslySetInnerHTML={{ __html: formatText(b) }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ZOPAVisual() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 overflow-x-auto">
      <h3 className="font-bold text-gray-900 mb-3">Schéma de la ZOPA</h3>
      <div className="min-w-[320px]">
        {/* Acheteur */}
        <div className="flex items-center gap-2 mb-2 text-sm">
          <span className="w-20 text-right text-gray-500">Acheteur</span>
          <div className="flex-1 flex">
            <div className="flex-1 bg-blue-100 rounded-l-full h-8 flex items-center pl-3">
              <span className="text-xs text-blue-700 font-medium">Budget max : 95 000 €</span>
            </div>
            <div className="w-4 bg-blue-300 h-8" />
          </div>
        </div>
        {/* ZOPA */}
        <div className="flex items-center gap-2 mb-2 text-sm">
          <span className="w-20 text-right font-bold text-emerald-700">ZOPA</span>
          <div className="flex-1">
            <div className="bg-emerald-100 border-2 border-emerald-400 border-dashed rounded-full h-8 flex items-center justify-center">
              <span className="text-xs text-emerald-700 font-bold">80 000 € — 95 000 €</span>
            </div>
          </div>
        </div>
        {/* Vendeur */}
        <div className="flex items-center gap-2 text-sm">
          <span className="w-20 text-right text-gray-500">Vendeur</span>
          <div className="flex-1 flex">
            <div className="w-4 bg-orange-300 h-8" />
            <div className="flex-1 bg-orange-100 rounded-r-full h-8 flex items-center pr-3 justify-end">
              <span className="text-xs text-orange-700 font-medium">Prix plancher : 80 000 €</span>
            </div>
          </div>
        </div>
        {/* No ZOPA example */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-red-600 mb-2">❌ Sans ZOPA (pas d'accord possible) :</p>
          <div className="flex gap-1 text-xs">
            <div className="flex-1 bg-red-100 rounded-full h-6 flex items-center justify-center text-red-600 font-medium">
              Acheteur max : 70 000 €
            </div>
            <div className="w-4 bg-red-200 h-6" />
            <div className="flex-1 bg-red-100 rounded-full h-6 flex items-center justify-center text-red-600 font-medium">
              Vendeur min : 80 000 €
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Convert **text** to <strong> and keep the rest
function formatText(str) {
  return str.replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-800">$1</strong>')
}
