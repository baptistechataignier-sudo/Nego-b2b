// Helper: check all lessons of a given level are done
function levelComplete(levelModuleIds, completedLessons, allLessonsForLevel) {
  return allLessonsForLevel.every(id => completedLessons.includes(id))
}

// Level 1 lesson IDs (static, used by badge conditions)
const L1_LESSON_IDS = [
  'l1-m1-l1','l1-m1-l2',
  'l1-m2-l1','l1-m2-l2',
  'l1-m3-l1',
  'l1-m4-l1',
  'l1-m5-l1',
]
const L2_LESSON_IDS = [
  'l2-m1-l1','l2-m1-l2',
  'l2-m2-l1','l2-m2-l2',
  'l2-m3-l1',
  'l2-m4-l1',
  'l2-m5-l1',
]
const L3_LESSON_IDS = [
  'l3-m1-l1','l3-m1-l2',
  'l3-m2-l1',
  'l3-m3-l1',
  'l3-m4-l1',
  'l3-m5-l1','l3-m5-l2',
]

export const BADGES = [
  // ── Niveau 1 ──
  { id: 'first-lesson',      icon: '🎓', label: 'Première Leçon',    description: 'Terminez votre première leçon',            condition: (p) => p.completedLessons.length >= 1 },
  { id: 'batna-master',      icon: '⚖️', label: 'Maître du BATNA',   description: 'Terminez le module Fondamentaux',           condition: (p) => p.completedModules.includes('l1-m1') },
  { id: 'spin-doctor',       icon: '🎯', label: 'SPIN Doctor',        description: 'Terminez le module Découverte',             condition: (p) => p.completedModules.includes('l1-m2') },
  { id: 'value-pitcher',     icon: '💎', label: 'Value Pitcher',      description: 'Terminez le module Proposition de Valeur',  condition: (p) => p.completedModules.includes('l1-m3') },
  { id: 'objection-handler', icon: '🛡️', label: 'Objecteur Parfait', description: 'Terminez le module Objections',             condition: (p) => p.completedModules.includes('l1-m4') },
  { id: 'closer',            icon: '🏁', label: 'The Closer',         description: 'Terminez le module Closing',                condition: (p) => p.completedModules.includes('l1-m5') },
  { id: 'level1-complete',   icon: '🌱', label: 'Junior Certifié',   description: 'Terminez le Niveau 1 complet',              condition: (p) => L1_LESSON_IDS.every(id => p.completedLessons.includes(id)) },

  // ── Niveau 2 ──
  { id: 'margin-defender',   icon: '💰', label: 'Défenseur de Marges', description: 'Terminez le module Défense des Marges',       condition: (p) => p.completedModules.includes('l2-m1') },
  { id: 'multi-player',      icon: '👥', label: 'Multi-Player',        description: 'Terminez le module Multi-Interlocuteurs',     condition: (p) => p.completedModules.includes('l2-m2') },
  { id: 'marathon-seller',   icon: '📅', label: 'Marathon Seller',     description: 'Terminez le module Cycles Longs',             condition: (p) => p.completedModules.includes('l2-m3') },
  { id: 'bid-winner',        icon: '📑', label: 'Bid Winner',          description: 'Terminez le module Appels d\'Offres',          condition: (p) => p.completedModules.includes('l2-m4') },
  { id: 'competitor-slayer', icon: '⚔️', label: 'Competitor Slayer',   description: 'Terminez le module Concurrence',              condition: (p) => p.completedModules.includes('l2-m5') },
  { id: 'level2-complete',   icon: '⭐', label: 'Confirmé Certifié',   description: 'Terminez le Niveau 2 complet',                condition: (p) => L2_LESSON_IDS.every(id => p.completedLessons.includes(id)) },

  // ── Niveau 3 ──
  { id: 'account-planner',   icon: '🗂️', label: 'Account Planner',    description: 'Terminez le module Plan de Compte',           condition: (p) => p.completedModules.includes('l3-m1') },
  { id: 'high-stakes',       icon: '🎲', label: 'High Stakes',         description: 'Terminez le module Négociation à Enjeux',     condition: (p) => p.completedModules.includes('l3-m2') },
  { id: 'upsell-king',       icon: '📈', label: 'Upsell King',         description: 'Terminez le module Upsell & Cross-sell',      condition: (p) => p.completedModules.includes('l3-m3') },
  { id: 'br-master',         icon: '📊', label: 'BR Master',           description: 'Terminez le module Business Review',          condition: (p) => p.completedModules.includes('l3-m4') },
  { id: 'loyalty-builder',   icon: '🔐', label: 'Loyalty Builder',     description: 'Terminez le module Relation Long Terme',      condition: (p) => p.completedModules.includes('l3-m5') },
  { id: 'level3-complete',   icon: '🏆', label: 'KAM Certifié',        description: 'Terminez le Niveau 3 complet',                condition: (p) => L3_LESSON_IDS.every(id => p.completedLessons.includes(id)) },

  // ── Simulations ──
  { id: 'first-sim',         icon: '🤝', label: 'Négociateur Terrain', description: 'Terminez votre première simulation',          condition: (p) => p.completedSimulations.length >= 1 },
  { id: 'sim-expert',        icon: '🥇', label: 'Expert Simulation',   description: 'Obtenez le score maximum dans une simulation', condition: (p) => p.bestSimScore >= 170 },

  // ── Streak & XP ──
  { id: 'streak-3',          icon: '🔥', label: 'En Feu !',            description: '3 jours de streak consécutifs',               condition: (p) => p.streak >= 3 },
  { id: 'streak-7',          icon: '⚡', label: 'Semaine Parfaite',    description: '7 jours de streak consécutifs',               condition: (p) => p.streak >= 7 },
  { id: 'xp-500',            icon: '💫', label: '500 XP',              description: 'Atteignez 500 XP',                            condition: (p) => p.totalXP >= 500 },
  { id: 'xp-1000',           icon: '🚀', label: '1 000 XP',            description: 'Atteignez 1 000 XP',                          condition: (p) => p.totalXP >= 1000 },
  { id: 'xp-2500',           icon: '🌠', label: '2 500 XP',            description: 'Atteignez 2 500 XP',                          condition: (p) => p.totalXP >= 2500 },
]
