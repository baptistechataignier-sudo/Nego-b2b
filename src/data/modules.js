// ─── NégoMaster — Contenu pédagogique complet ────────────────────────────────
// Module 1: Fondamentaux (jouable)
// Modules 2-4: à venir (locked)

export const MODULES = [
  {
    id: 'fondamentaux',
    title: 'Fondamentaux',
    subtitle: 'Les bases incontournables',
    icon: '🎯',
    color: 'from-brand-500 to-brand-700',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
    iconBg: 'bg-brand-100',
    locked: false,
    lessons: [
      // ──────────────────────────────────────────────────────────────────────
      // LEÇON 1 — LE BATNA
      // ──────────────────────────────────────────────────────────────────────
      {
        id: 'batna',
        title: 'Le BATNA',
        subtitle: 'Votre meilleure alternative',
        icon: '🛡️',
        xpReward: 50,
        duration: '5 min',
        exercises: [
          {
            type: 'lesson',
            id: 'batna-intro',
            title: 'Qu\'est-ce que le BATNA ?',
            content: [
              {
                heading: 'BATNA = Best Alternative To a Negotiated Agreement',
                text: 'En français : **Meilleure Alternative à un Accord Négocié**. C\'est votre plan B — ce que vous ferez si la négociation échoue.',
              },
              {
                heading: 'Pourquoi c\'est crucial ?',
                text: 'Votre BATNA définit votre **pouvoir de négociation**. Plus votre alternative est forte, plus vous pouvez vous permettre de refuser un mauvais accord.',
              },
              {
                heading: 'Exemple concret',
                text: 'Vous négociez un contrat IT à 80 000 €. Vous avez un autre fournisseur prêt à 75 000 €. Ce fournisseur = votre BATNA. Vous ne devez jamais accepter moins que 75 000 € du premier.',
              },
              {
                heading: 'Les 3 règles du BATNA',
                bullets: [
                  '🔍 **Identifiez** votre BATNA avant chaque négociation',
                  '🔒 **Ne le révélez jamais** si il est faible',
                  '💪 **Améliorez-le** avant de négocier si possible',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'batna-q1',
            xp: 10,
            question: 'Un commercial négocie un contrat de maintenance à 50 000 €/an. Il sait que son entreprise peut perdre ce client sans impact majeur. Que révèle cette situation sur sa position ?',
            options: [
              'Son BATNA est fort, il peut négocier avec confiance',
              'Son BATNA est faible, il doit accepter n\'importe quelle offre',
              'Le BATNA ne s\'applique pas ici',
              'Il devrait cacher cette information à son manager',
            ],
            correct: 0,
            explanation: '✅ Exact ! Si perdre ce client n\'a pas d\'impact majeur, l\'entreprise a une bonne alternative (BATNA fort). Cela donne au commercial la liberté de refuser un accord défavorable sans pression excessive.',
          },
          {
            type: 'qcm',
            id: 'batna-q2',
            xp: 10,
            question: 'Vous êtes acheteur IT. Vous avez UNIQUEMENT un seul fournisseur capable de livrer en 2 semaines. Quelle est la meilleure stratégie ?',
            options: [
              'Révéler immédiatement que vous avez besoin du produit sous 2 semaines',
              'Trouver d\'autres fournisseurs pour renforcer votre BATNA avant de négocier',
              'Accepter le prix demandé sans discuter',
              'Mentir sur vos délais pour avoir plus de levier',
            ],
            correct: 1,
            explanation: '✅ Parfait ! Avec un seul fournisseur, votre BATNA est quasi nul. La priorité est d\'améliorer votre BATNA en identifiant d\'autres options AVANT de négocier, même si cela prend un peu de temps.',
          },
          {
            type: 'scenario',
            id: 'batna-scenario',
            xp: 15,
            context: 'Contexte : Vous êtes commercial chez une ESN. Votre client, DirTech SA, renégocie son contrat de TMA (Tierce Maintenance Applicative) actuellement à 120 000 €/an. L\'acheteur dit :',
            dialogue: [
              { speaker: 'acheteur', text: '"On a reçu une offre d\'un concurrent à 95 000 €. Si vous ne vous alignez pas, on part. On a besoin d\'une réponse d\'ici vendredi."' },
            ],
            question: 'Quelle est la meilleure réponse pour protéger votre position ?',
            options: [
              '"D\'accord, je peux descendre à 95 000 €, pas de problème."',
              '"Cette offre à 95 000 € inclut-elle les mêmes SLAs et le même niveau de service ? Montrez-moi les détails pour que l\'on compare à périmètre égal."',
              '"95 000 € est impossible, notre prix est notre prix."',
              '"Je dois demander à ma direction, je vous rappelle la semaine prochaine."',
            ],
            correct: 1,
            explanation: '✅ Excellente réponse ! Avant de céder sur le prix, vous questionnez la comparabilité des offres. Le concurrent à 95 000 € inclut peut-être moins de services. Cette question neutralise l\'ancrage concurrent ET vous donne du temps pour évaluer leur BATNA réel.',
          },
          {
            type: 'matching',
            id: 'batna-matching',
            xp: 15,
            instruction: 'Associez chaque situation à l\'évaluation correcte du BATNA',
            pairs: [
              { left: 'Seul fournisseur disponible sur le marché', right: 'BATNA très faible' },
              { left: '3 offres concurrentes en attente', right: 'BATNA fort' },
              { left: 'Contrat renouvelable mais remplaçable facilement', right: 'BATNA modéré' },
              { left: 'Rupture de stock imminente chez l\'acheteur', right: 'BATNA vendeur fort' },
            ],
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────────────
      // LEÇON 2 — LA ZOPA
      // ──────────────────────────────────────────────────────────────────────
      {
        id: 'zopa',
        title: 'La ZOPA',
        subtitle: 'Zone d\'accord possible',
        icon: '🎯',
        xpReward: 50,
        duration: '5 min',
        exercises: [
          {
            type: 'lesson',
            id: 'zopa-intro',
            title: 'Identifier la Zone d\'Accord',
            content: [
              {
                heading: 'ZOPA = Zone Of Possible Agreement',
                text: 'C\'est l\'espace de chevauchement entre le **prix maximum** que l\'acheteur est prêt à payer et le **prix minimum** que le vendeur est prêt à accepter.',
              },
              {
                heading: 'Schéma visuel',
                visual: 'zopa',
              },
              {
                heading: 'Quand il n\'y a pas de ZOPA',
                text: 'Si le prix plancher du vendeur est supérieur au prix plafond de l\'acheteur, **aucun accord n\'est possible**. Inutile de continuer — mieux vaut le reconnaître tôt et explorer de nouvelles valeurs à créer.',
              },
              {
                heading: 'Élargir la ZOPA',
                bullets: [
                  '📦 Ajouter des services à valeur perçue élevée (formation, support)',
                  '⏱️ Jouer sur les délais de paiement',
                  '🔄 Modifier le périmètre ou le volume',
                  '🏆 Créer un accord-cadre pluriannuel',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'zopa-q1',
            xp: 10,
            question: 'Vendeur : prix minimum acceptable = 80 000 €. Acheteur : budget maximum = 95 000 €. Quelle est la ZOPA ?',
            options: [
              'Il n\'y a pas de ZOPA',
              'Entre 80 000 € et 95 000 €',
              'Exactement 87 500 € (milieu)',
              '95 000 € uniquement',
            ],
            correct: 1,
            explanation: '✅ Correct ! La ZOPA est l\'espace entre le plancher vendeur (80 K€) et le plafond acheteur (95 K€). N\'importe quel montant dans cet intervalle constitue un accord possible pour les deux parties.',
          },
          {
            type: 'qcm',
            id: 'zopa-q2',
            xp: 10,
            question: 'L\'acheteur insiste pour ne pas dépasser 70 000 €, mais votre coût de revient est à 75 000 €. Quelle action crée le plus de valeur ?',
            options: [
              'Accepter 70 000 € pour ne pas perdre le client',
              'Rompre immédiatement la négociation',
              'Proposer d\'étaler les paiements sur 18 mois ou de réduire le périmètre livrable',
              'Revoir votre comptabilité pour trouver 5 000 € d\'économies',
            ],
            correct: 2,
            explanation: '✅ Excellent ! Quand la ZOPA est inexistante sur le prix pur, on cherche à l\'élargir via d\'autres variables : étalement, périmètre réduit, options supplémentaires. Cela peut remettre les parties dans un espace d\'accord.',
          },
          {
            type: 'scenario',
            id: 'zopa-scenario',
            xp: 15,
            context: 'Vous vendez une solution de cybersécurité. Votre prix catalogue est 60 000 €, votre plancher à 45 000 €. L\'acheteur dit :',
            dialogue: [
              { speaker: 'acheteur', text: '"Notre budget cybersécurité est de 40 000 €, c\'est ferme et définitif. Je ne peux pas aller au-delà."' },
            ],
            question: 'La ZOPA semble inexistante. Quelle est la meilleure approche ?',
            options: [
              'Accepter 40 000 € pour ne pas perdre la vente',
              'Dire "Ce n\'est pas possible" et raccrocher',
              '"Je comprends votre contrainte budget. Et si on commençait par un périmètre Phase 1 à 40 000 € couvrant vos risques prioritaires, avec une Phase 2 l\'an prochain ?"',
              '"40 000 € c\'est vraiment trop bas, pouvez-vous demander un budget exceptionnel ?"',
            ],
            correct: 2,
            explanation: '✅ Parfait ! Vous proposez de créer une ZOPA en **phasant le projet**. L\'acheteur obtient ce qu\'il peut payer maintenant, vous restez au-dessus de votre plancher. Cette technique de découpage est l\'une des plus puissantes pour réconcilier les positions.',
          },
          {
            type: 'qcm',
            id: 'zopa-q3',
            xp: 10,
            question: 'Pourquoi ne faut-il JAMAIS révéler votre prix plancher à l\'acheteur ?',
            options: [
              'C\'est illégal en B2B',
              'L\'acheteur s\'alignera exactement dessus, éliminant tout surplus pour vous',
              'Cela fragilise la relation commerciale',
              'Les deux premières réponses sont correctes',
            ],
            correct: 1,
            explanation: '✅ Exact ! Si l\'acheteur sait que votre plancher est à 45 000 €, il offrira 45 001 €. Votre information privée est votre atout stratégique. Préservez-la.',
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────────────
      // LEÇON 3 — L'ANCRAGE DE PRIX
      // ──────────────────────────────────────────────────────────────────────
      {
        id: 'ancrage',
        title: 'L\'ancrage de prix',
        subtitle: 'Prendre l\'initiative du cadre',
        icon: '⚓',
        xpReward: 60,
        duration: '6 min',
        exercises: [
          {
            type: 'lesson',
            id: 'ancrage-intro',
            title: 'La psychologie de l\'ancrage',
            content: [
              {
                heading: 'Le principe de l\'ancrage cognitif',
                text: 'Le **premier chiffre mentionné** dans une négociation crée un point de référence psychologique puissant. Toutes les discussions suivantes gravitent autour de cet ancre.',
              },
              {
                heading: 'Étude de cas : l\'ancrage haut',
                text: 'Vous proposez 120 000 € pour un projet. L\'acheteur contre-propose 90 000 €. La négociation se joue maintenant entre 90 et 120 K€. Si vous aviez démarré à 100 000 €, il aurait contré à 75 000 €...',
              },
              {
                heading: 'Techniques d\'ancrage offensif',
                bullets: [
                  '🎯 **Ancrage précis** : 97 400 € plutôt que 100 000 € (paraît calculé, pas arbitraire)',
                  '📊 **Ancrage justifié** : lier le prix à des données (coût marché, ROI client)',
                  '🏷️ **Prix barré** : 120 000 € → 98 000 € pour votre profil',
                  '🔝 **Offre premium** : proposer une option haute pour valoriser l\'offre cible',
                ],
              },
              {
                heading: 'Se défendre face à un ancrage adverse',
                bullets: [
                  '❌ Ne jamais commenter le premier prix de l\'acheteur (ça le légitime)',
                  '🔄 Recadrer immédiatement avec votre propre ancre',
                  '❓ Demander la justification : "Sur quelle base arrivez-vous à ce chiffre ?"',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'ancrage-q1',
            xp: 10,
            question: 'L\'acheteur ouvre avec : "On a budgété 30 000 € pour ce projet." Quelle est la réaction qui protège le mieux votre position ?',
            options: [
              '"30 000 €, c\'est un bon budget, voyons ce qu\'on peut faire."',
              '"30 000 € ? C\'est beaucoup trop bas, notre prix minimum est 80 000 €."',
              '"Intéressant. Permettez-moi de vous présenter notre approche — elle génère typiquement un ROI de 3x en 18 mois pour des projets de ce type, à 75 000 €."',
              '"Quel est votre budget maximum ?"',
            ],
            correct: 2,
            explanation: '✅ Excellent ! Vous ignorez l\'ancre de 30 K€, ne vous défendez pas contre elle, et posez immédiatement votre propre ancre (75 K€) justifiée par le ROI. Le contraste ROI/investissement détourne l\'attention du coût pur.',
          },
          {
            type: 'qcm',
            id: 'ancrage-q2',
            xp: 10,
            question: 'Vous souhaitez proposer un projet à environ 50 000 €. Parmi ces formulations, laquelle ancre le mieux ?',
            options: [
              '"Notre projet coûte environ 50 000 €."',
              '"On peut faire ça pour 50 000 €, voire moins si vous réduisez le périmètre."',
              '"Notre offre complète est à 72 000 €, mais pour votre profil et notre relation, on peut aller à 51 500 €."',
              '"Quel est votre budget ? On s\'adaptera."',
            ],
            correct: 2,
            explanation: '✅ Parfait ! Cette formulation utilise trois techniques : (1) ancrage haut à 72 000 €, (2) concession visible qui valorise la relation, (3) prix précis (51 500 €) qui semble calculé. Le prix final semble une bonne affaire comparé à l\'ancre initiale.',
          },
          {
            type: 'scenario',
            id: 'ancrage-scenario',
            xp: 20,
            context: 'Appel d\'offres audiovisuel. Vous soumettez une offre pour équiper 3 salles de conférence. Avant même que vous parliez, l\'acheteur attaque :',
            dialogue: [
              { speaker: 'acheteur', text: '"On a déjà un devis à 45 000 € d\'un concurrent. Je veux voir si vous pouvez vous battre là-dessus."' },
            ],
            question: 'Comment répondez-vous pour neutraliser cet ancrage ?',
            options: [
              '"45 000 € ? On peut faire mieux, donnez-nous votre cible."',
              '"Notre devis est à 78 000 €. Mais avant de comparer les prix, j\'aimerais qu\'on regarde ensemble ce que chaque devis inclut réellement — la qualité d\'image, les garanties, l\'installation et la formation."',
              '"45 000 €, c\'est impossible pour 3 salles de qualité professionnelle."',
              '"Je dois recalculer, je reviens vers vous."',
            ],
            correct: 1,
            explanation: '✅ Stratégie maîtrisée ! Vous posez votre ancre (78 000 €), puis déplacez le terrain de la comparaison du PRIX vers la VALEUR totale. Vous forcez l\'acheteur à évaluer tous les critères, pas seulement le montant. C\'est le contre-ancrage par la valeur.',
          },
          {
            type: 'ordering',
            id: 'ancrage-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les étapes d\'une stratégie d\'ancrage optimal :',
            items: [
              { id: 'a', text: 'Justifier le prix par la valeur (ROI, différenciation)' },
              { id: 'b', text: 'Poser une première offre haute et précise' },
              { id: 'c', text: 'Préparer votre BATNA et connaître votre plancher' },
              { id: 'd', text: 'Proposer une concession visible vers votre prix cible' },
            ],
            correct: ['c', 'b', 'a', 'd'],
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────────────
      // LEÇON 4 — LES CONCESSIONS
      // ──────────────────────────────────────────────────────────────────────
      {
        id: 'concessions',
        title: 'Stratégie des concessions',
        subtitle: 'Céder intelligent',
        icon: '🤝',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'concessions-intro',
            title: 'L\'art des concessions',
            content: [
              {
                heading: 'La règle d\'or des concessions',
                text: 'Chaque concession accordée doit être **échangée contre quelque chose** (réciprocité) et **décroissante en valeur** (signale que vous approchez de votre limite).',
              },
              {
                heading: 'Le pattern des concessions',
                text: 'Si vous concédez 10 000 €, puis 5 000 €, puis 2 000 €, vous envoyez un signal clair : vous approchez de votre limite. Si vous concédez 10 000 €, puis 10 000 €, puis 10 000 €, l\'acheteur pensera qu\'il peut en obtenir encore.',
              },
              {
                heading: 'Les erreurs fatales',
                bullets: [
                  '❌ **Concession unilatérale** : baisser sans demander quelque chose en retour',
                  '❌ **Concession trop rapide** : signale que votre prix initial était excessif',
                  '❌ **Concession trop large** : encourage à continuer à pousser',
                  '❌ **Split the difference** : partager la différence vous positionne toujours en perdant',
                ],
              },
              {
                heading: 'Le principe de réciprocité conditionnelle',
                text: 'Toujours formuler : **"Si vous [faites X], alors je peux [concéder Y]."** Le "si...alors" conditionne la concession et lui donne une valeur perçue.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'concessions-q1',
            xp: 10,
            question: 'L\'acheteur demande une remise supplémentaire de 8 000 €. Votre réponse idéale est :',
            options: [
              '"D\'accord, je peux faire 8 000 € de remise."',
              '"Non, notre prix est notre prix."',
              '"Si vous pouvez confirmer la commande d\'ici vendredi ET inclure le lot de formation, je peux aller jusqu\'à 6 000 € de remise."',
              '"Je peux faire 4 000 €, on se retrouve au milieu ?"',
            ],
            correct: 2,
            explanation: '✅ Excellent ! Vous utilisez la concession conditionnelle ("si...alors"), vous demandez deux contreparties (délai + formation), et vous ne cédez pas la totalité demandée. La contrepartie "délai" est très précieuse pour votre trésorerie.',
          },
          {
            type: 'qcm',
            id: 'concessions-q2',
            xp: 10,
            question: 'Vous avez déjà concédé 5 000 €, puis 3 000 €. L\'acheteur redemande encore une remise. Quel signal devez-vous envoyer ?',
            options: [
              'Concéder encore 3 000 € pour montrer votre bonne volonté',
              'Proposer 1 000 € maximum avec une contrepartie, en signalant que c\'est votre dernière concession possible',
              'Dire "C\'est mon dernier prix" sans concéder',
              'Recalculer depuis le début pour voir si une remise est possible',
            ],
            correct: 1,
            explanation: '✅ Parfait ! 5 000 € → 3 000 € → 1 000 € : le pattern décroissant est correct. En plus, vous signalez que c\'est votre limite finale — cette crédibilité est essentielle. Une concession minimale avec contrepartie vaut mieux que pas de mouvement ou une grande concession.',
          },
          {
            type: 'scenario',
            id: 'concessions-scenario',
            xp: 20,
            context: 'Négociation d\'un contrat de logiciels SaaS à 48 000 €/an. L\'acheteur a obtenu de vous une première remise de 4 000 €. Il revient :',
            dialogue: [
              { speaker: 'acheteur', text: '"Vous avez fait un effort, mais mon DSI me demande d\'être à 40 000 €. Il faut qu\'on aille chercher encore 4 000 €. Faites un effort et on signe aujourd\'hui."' },
            ],
            question: 'Comment répondez-vous ?',
            options: [
              '"D\'accord, 40 000 €, on signe."',
              '"4 000 € de plus ? Impossible, on a déjà fait un effort."',
              '"Je comprends la contrainte de votre DSI. Si vous acceptez un engagement sur 3 ans au lieu de 1 an, je peux aller à 41 500 €. C\'est ma marge de manœuvre finale sur ce dossier."',
              '"Partageons la différence : 42 000 € ?"',
            ],
            correct: 2,
            explanation: '✅ Maîtrisé ! Vous concédez 2 500 € (moins que demandé), vous conditionnez à un engagement 3 ans (très précieux), et vous signalez que c\'est votre dernière marge. Le "split the difference" est une technique à éviter — elle vous coûte toujours plus que la concession conditionnelle.',
          },
          {
            type: 'matching',
            id: 'concessions-matching',
            xp: 15,
            instruction: 'Associez chaque formulation à la technique de concession correspondante',
            pairs: [
              { left: '"Si vous signez avant le 30, je fais -3 000 €"', right: 'Concession conditionnelle' },
              { left: '5 000 € → 3 000 € → 1 000 €', right: 'Concessions décroissantes' },
              { left: '"Je cède sur le prix, vous cédez sur les délais"', right: 'Échange de concessions' },
              { left: '"C\'est ma dernière offre, je ne peux pas aller plus bas"', right: 'Signal de limite finale' },
            ],
          },
        ],
      },
    ],
  },

  // ─── MODULE 2 — Techniques Avancées (à venir) ───────────────────────────────
  {
    id: 'avance',
    title: 'Techniques Avancées',
    subtitle: 'Multi-parties & appels d\'offres',
    icon: '🚀',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    locked: true,
    comingSoon: true,
    lessons: [],
  },

  // ─── MODULE 3 — Gestion des Objections ──────────────────────────────────────
  {
    id: 'objections',
    title: 'Gestion des Objections',
    subtitle: 'Prix, délais, décideurs absents',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    locked: true,
    comingSoon: true,
    lessons: [],
  },

  // ─── MODULE 4 — Closing & Suivi ──────────────────────────────────────────────
  {
    id: 'closing',
    title: 'Closing & Suivi',
    subtitle: 'Conclure et fidéliser',
    icon: '🏆',
    color: 'from-emerald-500 to-green-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    locked: true,
    comingSoon: true,
    lessons: [],
  },
]

// ─── Simulations de négociation ───────────────────────────────────────────────
export const SIMULATIONS = [
  {
    id: 'renouvellement-it',
    title: 'Renouvellement contrat IT',
    subtitle: 'TMA & maintenance applicative',
    icon: '💻',
    difficulty: 'Débutant',
    duration: '10 min',
    xpReward: 80,
    color: 'from-brand-500 to-brand-700',
    locked: false,
    context: 'Vous êtes responsable commercial chez une ESN (Entreprise de Services Numériques). Votre client historique, la DSI de RetailGroup (450 magasins), renégocie son contrat de TMA (Tierce Maintenance Applicative) annuel. Contrat actuel : 130 000 €/an. Votre objectif : maintenir au minimum 115 000 €.',
    buyerProfile: {
      name: 'Marc Lefebvre',
      title: 'Directeur des Achats IT',
      avatar: '👔',
      style: 'Acheteur agressif, très focalisé sur les coûts. A reçu des offres concurrentes.',
      batna: 'Offre concurrent à 105 000 € (périmètre légèrement réduit)',
    },
    steps: [
      {
        id: 0,
        buyerMessage: '"Bonjour. Je vais être direct : on est client chez vous depuis 4 ans, mais on a reçu une offre de CodexPro à 105 000 € pour un périmètre similaire. J\'ai besoin que vous vous aligniez. Qu\'est-ce que vous pouvez faire ?"',
        options: [
          {
            text: '"105 000 €, je peux m\'aligner, pas de problème."',
            quality: 'bad',
            feedback: '❌ Concession immédiate sans contrepartie. Vous venez de perdre 25 000 € en une phrase et signalez que votre prix de départ était gonflé.',
            score: 0,
            nextBuyerMessage: '"Parfait. Dans ce cas, on va dire 100 000 €, vu qu\'on est client fidèle depuis 4 ans ?"',
          },
          {
            text: '"Je comprends. Avant de parler prix, j\'aimerais qu\'on regarde ce que les 4 ans de relation nous ont permis d\'accomplir ensemble — les incidents évités, les évolutions livrées. Puis on comparera à périmètre égal avec CodexPro."',
            quality: 'good',
            feedback: '✅ Excellent ! Vous recentrez sur la valeur et la relation avant d\'aborder le prix. Vous neutralisez l\'ancrage concurrent et préparez une comparaison favorable.',
            score: 20,
            nextBuyerMessage: '"Je vous accorde ça. Mais concrètement, notre budget IT est en baisse de 15%. Je dois trouver des économies."',
          },
          {
            text: '"CodexPro à 105 000 € ? Ils ne peuvent pas tenir ce périmètre à ce prix. C\'est impossible."',
            quality: 'ok',
            feedback: '⚠️ Vous questionnez la crédibilité de l\'offre, ce qui est utile, mais l\'attaque directe d\'un concurrent peut sembler défensive. Mieux vaut prouver votre valeur plutôt que dénigrer.',
            score: 10,
            nextBuyerMessage: '"Peut-être, mais ça m\'intéresse d\'essayer. Qu\'est-ce que vous proposez ?"',
          },
        ],
      },
      {
        id: 1,
        buyerMessage: null, // Uses nextBuyerMessage from step 0
        options: [
          {
            text: '"Je comprends la pression budgétaire. Si vous vous engagez sur 2 ans et acceptez de passer à un support 9h-18h au lieu de 24/7, je peux aller à 118 000 €/an."',
            quality: 'good',
            feedback: '✅ Concession conditionnelle bien construite. Vous protégez la marge avec un engagement pluriannuel ET une réduction de périmètre qui justifie la baisse.',
            score: 25,
            nextBuyerMessage: '"2 ans, ça peut se discuter. Mais 118 000 €, c\'est encore loin de 105 000 €."',
          },
          {
            text: '"Quelle est votre enveloppe disponible pour ce contrat ?"',
            quality: 'ok',
            feedback: '⚠️ Question utile pour qualifier le budget, mais trop directe. L\'acheteur ne révélera pas son plafond réel. Mieux : proposer d\'abord puis questionner.',
            score: 10,
            nextBuyerMessage: '"Mon budget max c\'est 110 000 €. Vous pouvez vous battre ?"',
          },
          {
            text: '"Notre prix est 130 000 €, c\'est le reflet de la qualité de service."',
            quality: 'bad',
            feedback: '❌ Position rigide sans création de valeur. Vous risquez de perdre le client sans même avoir exploré les options.',
            score: 0,
            nextBuyerMessage: '"Dans ce cas, je ne vois pas comment on avance. Je passe à CodexPro."',
          },
        ],
      },
      {
        id: 2,
        buyerMessage: null,
        options: [
          {
            text: '"110 000 € représente une baisse de 20 000 € sur notre prestation actuelle. Je ne peux pas aller là-bas sans contreparties significatives. En revanche, si vous intégrez le lot de formation de vos équipes (valeur 8 000 €) dans le contrat, je peux aller à 114 000 €."',
            quality: 'good',
            feedback: '✅ Parfait ! Vous justifiez pourquoi vous ne pouvez pas descendre (pédagogie sur la valeur), vous demandez une contrepartie qui augmente la valeur globale, et vous proposez un compromis proche de votre objectif.',
            score: 30,
            nextBuyerMessage: '"La formation, c\'est une bonne idée. 114 000 € avec la formation incluse... je vais voir avec mon DSI."',
          },
          {
            text: '"D\'accord pour 112 000 €, mais c\'est mon dernier prix."',
            quality: 'ok',
            feedback: '⚠️ Concession sans contrepartie, mais le positionnement "dernier prix" est utile. Vous êtes au-dessus de votre plancher de 115 000 € — attention.',
            score: 15,
            nextBuyerMessage: '"112 000 €... faites 110 000 € et on signe maintenant."',
          },
          {
            text: '"110 000 €, c\'est ma limite absolue. Je ne peux pas aller en dessous."',
            quality: 'bad',
            feedback: '❌ Vous êtes descendu 5 000 € sous votre plancher sans contrepartie. Ce sera difficile de remonter.',
            score: 5,
            nextBuyerMessage: '"Parfait, 110 000 €, j\'envoie le bon de commande."',
          },
        ],
      },
    ],
  },
  {
    id: 'equipement-av',
    title: 'Équipements Audiovisuels',
    subtitle: 'Vente d\'équipements pour salles de conférence',
    icon: '📽️',
    difficulty: 'Intermédiaire',
    duration: '12 min',
    xpReward: 100,
    color: 'from-purple-500 to-purple-700',
    locked: true,
    comingSoon: false,
    lessons: [],
  },
  {
    id: 'appel-offres',
    title: 'Appel d\'offres Public',
    subtitle: 'Répondre et négocier un AO collectivité',
    icon: '🏛️',
    difficulty: 'Expert',
    duration: '15 min',
    xpReward: 150,
    color: 'from-emerald-500 to-green-700',
    locked: true,
    comingSoon: false,
    lessons: [],
  },
]

// ─── Daily challenges ─────────────────────────────────────────────────────────
export const DAILY_CHALLENGES = [
  {
    id: 'dc1',
    title: 'Flash Quiz BATNA',
    description: '3 questions en 60 secondes',
    icon: '⚡',
    xpReward: 30,
    type: 'quiz',
  },
  {
    id: 'dc2',
    title: 'Objection du jour',
    description: '"Votre prix est trop élevé."',
    icon: '🎯',
    xpReward: 25,
    type: 'scenario',
  },
]
