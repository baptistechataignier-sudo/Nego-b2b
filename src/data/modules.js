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

  // ─── MODULE 2 — Techniques Avancées ────────────────────────────────────────
  {
    id: 'avance',
    title: 'Techniques Avancées',
    subtitle: 'Intérêts, écoute & MESOs',
    icon: '🚀',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    locked: false,
    lessons: [
      {
        id: 'interets',
        title: 'La Négociation par les Intérêts',
        subtitle: 'Positions vs intérêts',
        icon: '💡',
        xpReward: 60,
        duration: '6 min',
        exercises: [
          {
            type: 'lesson',
            id: 'interets-intro',
            title: 'Positions vs Intérêts',
            content: [
              {
                heading: 'La distinction fondamentale selon Harvard',
                text: 'Fisher & Ury (*Getting to Yes*) distinguent deux niveaux : la **position** (ce que vous demandez) et l\'**intérêt** (pourquoi vous le demandez). La position bloque, l\'intérêt ouvre.',
              },
              {
                heading: 'Le modèle iceberg',
                text: 'La position est la partie visible : *"Je veux -15 %."* L\'intérêt est sous la surface : *"Mon budget a été coupé, je dois justifier chaque euro devant mon DAF."* Comprendre l\'intérêt permet de trouver des solutions invisibles depuis la position.',
              },
              {
                heading: 'Exemples IT B2B',
                bullets: [
                  '**Position** : "Délai max 3 semaines" → **Intérêt** : mise en production avant le bilan Q3',
                  '**Position** : "Prix ferme 80 000 €" → **Intérêt** : enveloppe budgétaire figée pour l\'année',
                  '**Position** : "On veut un prestataire local" → **Intérêt** : réactivité en cas d\'incident',
                ],
              },
              {
                heading: 'Comment révéler les intérêts ?',
                bullets: [
                  '❓ **Question ouverte** : "Qu\'est-ce qui est important pour vous dans ce contrat ?"',
                  '🔄 **Reformulation** : "Si je comprends bien, ce qui compte c\'est..."',
                  '🤔 **Le "Pourquoi ?" stratégique** : demander 2-3 fois pour atteindre l\'intérêt profond',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'interets-q1',
            xp: 10,
            question: 'Un acheteur dit : "Je refuse tout délai de paiement supérieur à 30 jours." C\'est :',
            options: [
              'Un intérêt sous-jacent',
              'Une position — elle cache un intérêt à découvrir',
              'Une contrainte légale non négociable',
              'Une tactique de négociation agressive',
            ],
            correct: 1,
            explanation: '✅ Exact ! "Délai max 30 jours" est une position. L\'intérêt caché pourrait être : besoin de trésorerie, politique DSO imposée par la direction, ou expérience négative passée. En révélant l\'intérêt, vous pouvez proposer une solution créative (acompte, paiement en 2 fois).',
          },
          {
            type: 'qcm',
            id: 'interets-q2',
            xp: 10,
            question: 'L\'acheteur exige : "Je veux 10 % de remise, c\'est non négociable." Quelle question révèle son intérêt réel ?',
            options: [
              '"Vous êtes sûr que 10 % est votre dernière demande ?"',
              '"Qu\'est-ce qui vous a amené à 10 % spécifiquement — y a-t-il un objectif budget particulier cette année ?"',
              '"Si je fais 10 %, vous signez aujourd\'hui ?"',
              '"Notre prix est justifié, voici pourquoi..."',
            ],
            correct: 1,
            explanation: '✅ Parfait ! Cette question ouverte invite l\'acheteur à révéler l\'intérêt derrière sa position. Peut-être que son budget a été coupé, ou qu\'il doit montrer une économie à son DAF. Avec cette info, vous pouvez offrir une alternative : étalement sur 2 ans, service supplémentaire inclus, garantie étendue.',
          },
          {
            type: 'scenario',
            id: 'interets-scenario',
            xp: 15,
            context: 'Appel entrant. Votre interlocuteur, responsable achats d\'un groupe industriel, bloque depuis 3 semaines :',
            dialogue: [
              { speaker: 'acheteur', text: '"On est à 80 000 €, c\'est notre plafond. Vous êtes à 95 000 €. Si vous ne descendez pas à 80 000 €, on va chez votre concurrent."' },
            ],
            question: 'Comment répondez-vous pour découvrir l\'intérêt réel ?',
            options: [
              '"D\'accord, faisons 80 000 €, on signe maintenant."',
              '"80 000 € est impossible, notre prix est justifié par nos SLAs."',
              '"Je comprends votre contrainte. Ce plafond de 80 000 € — est-ce une enveloppe budgétaire annuelle, ou est-il lié à un autre critère ? Je voudrais comprendre ce qui compte vraiment pour vous."',
              '"Votre concurrent ne peut pas vous offrir ce que nous offrons."',
            ],
            correct: 2,
            explanation: '✅ Excellent ! Vous ne cédez pas sur le prix ET vous ne rejetez pas la demande. Vous cherchez à comprendre si le "plafond" est une contrainte réelle ou une position tactique. Si c\'est un budget annuel, facturer 40 000 € cette année + 55 000 € en janvier peut résoudre le problème sans remise.',
          },
          {
            type: 'matching',
            id: 'interets-matching',
            xp: 15,
            instruction: 'Associez chaque position à l\'intérêt sous-jacent le plus probable',
            pairs: [
              { left: '"Délai de livraison maximum 2 semaines"', right: 'Mise en production avant fin de trimestre' },
              { left: '"Contrat d\'1 an maximum, pas pluriannuel"', right: 'Incertitude sur le budget N+1' },
              { left: '"Je veux un référent dédié joignable 24/7"', right: 'Crainte des incidents hors heures ouvrées' },
              { left: '"Remise de 15 % sinon on repart en appel d\'offres"', right: 'Pression de la direction pour afficher une économie' },
            ],
          },
        ],
      },
      {
        id: 'ecoute',
        title: 'L\'Écoute Active et le Questionnement',
        subtitle: 'Écouter pour mieux négocier',
        icon: '👂',
        xpReward: 60,
        duration: '6 min',
        exercises: [
          {
            type: 'lesson',
            id: 'ecoute-intro',
            title: 'Écouter pour mieux négocier',
            content: [
              {
                heading: 'L\'écoute active : bien plus que le silence',
                text: 'L\'écoute active n\'est pas juste "ne pas parler". C\'est une posture complète : contact visuel, reformulation, questions de rebond. L\'acheteur qui se sent vraiment entendu livre plus d\'informations — et fait plus confiance.',
              },
              {
                heading: 'Le pouvoir du silence',
                text: 'En négociation B2B, **7 secondes de silence** après une annonce de prix génèrent souvent une concession spontanée de l\'autre partie. Apprenez à vous taire après avoir posé une question ou formulé une offre.',
              },
              {
                heading: 'Les 4 types de questions',
                bullets: [
                  '🔓 **Ouverte** : "Qu\'est-ce qui est essentiel pour vous ?" → exploration',
                  '🎯 **Fermée** : "Avez-vous un budget défini ?" → confirmation',
                  '🔄 **Rebond** : "Vous dites \'urgent\' — qu\'entendez-vous exactement ?" → approfondissement',
                  '🪞 **Miroir** : répéter les 2-3 derniers mots → invite à développer',
                ],
              },
              {
                heading: 'La reformulation stratégique',
                text: 'Reformuler montre que vous avez entendu ET vous permet de vérifier votre compréhension. Format : **"Si je comprends bien, vous me dites que [X] est important parce que [Y] — c\'est bien ça ?"**',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'ecoute-q1',
            xp: 10,
            question: 'L\'acheteur vient de donner une longue explication de ses contraintes. Quelle est la meilleure réaction ?',
            options: [
              'Enchaîner immédiatement avec votre argumentation prix',
              'Reformuler les points clés puis poser une question de rebond',
              'Demander s\'il peut répéter pour être sûr d\'avoir bien compris',
              'Prendre des notes sans rien dire',
            ],
            correct: 1,
            explanation: '✅ Parfait ! La reformulation valide votre compréhension, montre que vous avez écouté, et une question de rebond vous donne plus d\'informations. C\'est le combo "écoute active + questionnement" qui crée la confiance et révèle les intérêts cachés.',
          },
          {
            type: 'qcm',
            id: 'ecoute-q2',
            xp: 10,
            question: 'L\'acheteur dit : "On est satisfaits de votre travail, mais le prix reste un souci." Quelle reformulation est la plus stratégique ?',
            options: [
              '"Vous êtes donc d\'accord pour continuer avec nous, juste le prix à revoir ?"',
              '"Donc la qualité est reconnue — qu\'est-ce qui vous semble trop élevé dans notre offre, spécifiquement ?"',
              '"Je comprends, on va trouver un arrangement."',
              '"Si le prix est le seul problème, voici ce qu\'on peut faire..."',
            ],
            correct: 1,
            explanation: '✅ Excellent ! Vous ancrez d\'abord la satisfaction qualité, puis vous questionnez sur le "spécifiquement". Peut-être que ce n\'est pas le prix total mais une ligne de votre devis qui coince. Cette précision vous évite de céder sur l\'ensemble quand seul un poste pose problème.',
          },
          {
            type: 'scenario',
            id: 'ecoute-scenario',
            xp: 15,
            context: 'Rendez-vous de découverte. L\'acheteur informatique d\'une PME industrielle est vague sur ses besoins :',
            dialogue: [
              { speaker: 'acheteur', text: '"On a des problèmes avec notre système actuel. On cherche quelque chose de mieux, plus moderne. On a un budget mais pas encore finalisé."' },
            ],
            question: 'Quelle séquence de questions maximise la découverte ?',
            options: [
              '"Quel est votre budget approximatif ?"',
              '"Quand vous dites \'problèmes\', de quels types ? Et ces problèmes vous coûtent combien en temps ou en incidents par mois ?"',
              '"Je vais vous présenter notre solution, elle répond à tous les cas de figure."',
              '"On peut s\'adapter à votre budget — donnez-moi une fourchette."',
            ],
            correct: 1,
            explanation: '✅ Stratégique ! "Quels problèmes ?" révèle les intérêts réels. "Combien ça coûte ?" transforme le problème en valeur quantifiée. Ces deux informations vous permettront de construire un ROI précis et de justifier votre prix. Ne parlez jamais de solution avant d\'avoir diagnostiqué le problème.',
          },
          {
            type: 'ordering',
            id: 'ecoute-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les étapes d\'un entretien de découverte efficace :',
            items: [
              { id: 'a', text: 'Reformuler et valider la compréhension des enjeux' },
              { id: 'b', text: 'Poser des questions ouvertes sur le contexte et les objectifs' },
              { id: 'c', text: 'Préparer vos questions clés avant le rendez-vous' },
              { id: 'd', text: 'Présenter votre solution alignée sur les enjeux identifiés' },
            ],
            correct: ['c', 'b', 'a', 'd'],
          },
        ],
      },
      {
        id: 'temps',
        title: 'La Gestion du Temps et de la Pression',
        subtitle: 'La deadline comme levier',
        icon: '⏱️',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'temps-intro',
            title: 'Le temps comme levier de négociation',
            content: [
              {
                heading: 'La deadline : arme à double tranchant',
                text: 'Dans toute négociation, **celui qui a le moins de pression temporelle a l\'avantage**. Une deadline imposée ("réponse ce soir sinon je pars chez votre concurrent") est soit réelle, soit tactique. Votre premier travail : distinguer les deux.',
              },
              {
                heading: 'Urgence réelle vs fausse urgence',
                bullets: [
                  '🔍 **Testez la deadline** : "Si je vous réponds demain matin plutôt que ce soir, qu\'est-ce qui se passe exactement ?"',
                  '📋 **Cherchez la preuve** : un comité planifié, un appel d\'offres officiel — une vraie deadline se documente',
                  '🃏 **La fausse urgence** s\'effondre quand vous la questionnez calmement',
                ],
              },
              {
                heading: 'La patience stratégique',
                text: 'Ne jamais décider sous pression immédiate. Formule utile : **"Je comprends votre contrainte. Pour vous donner ma meilleure réponse, j\'ai besoin de [X heures/jours]. Cela dit, je veux qu\'on aboutisse."**',
              },
              {
                heading: 'Le coût de l\'impasse',
                text: 'Rappeler calmement le coût de l\'impasse pour les deux parties repositionne la pression. "Si on ne finalise pas ce projet, votre migration Q4 est repoussée au Q1 — ce qui retarde votre objectif de réduction de coûts de 6 mois."',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'temps-q1',
            xp: 10,
            question: 'Un acheteur dit : "Mon DG part en vacances lundi, si vous n\'avez pas signé ce soir c\'est mort." C\'est probablement :',
            options: [
              'Une vraie contrainte — signez tout de suite',
              'Une fausse urgence — questionnez-la calmement avant de réagir',
              'Une tactique agressive à refuser fermement',
              'Une information à ignorer complètement',
            ],
            correct: 1,
            explanation: '✅ Juste ! Avant de paniquer, posez la question : "Si je vous envoie une confirmation écrite ce soir et qu\'on finalise les détails mardi, c\'est gérable ?" Dans 80 % des cas, la "vraie" urgence a une solution. Si la réponse est non, demandez la preuve. Une urgence réelle se documente.',
          },
          {
            type: 'qcm',
            id: 'temps-q2',
            xp: 10,
            question: 'Vous avez une proposition à remettre avant fin de mois (nous sommes le 20). Comment transformez-vous cette date en levier ?',
            options: [
              'Ne pas mentionner la date — ça montre votre propre urgence',
              '"Notre offre actuelle inclut [bonus]. Elle est valable jusqu\'au 30. Après cette date, les conditions tarifaires pour Q1 seront différentes."',
              '"Dépêchez-vous, mon offre expire bientôt."',
              'Attendre que le client pose la question sur la validité',
            ],
            correct: 1,
            explanation: '✅ Excellent ! Vous transformez votre propre deadline en levier pour l\'acheteur. Le message implicite : "Agir maintenant = avantage pour vous." Vous créez une urgence réelle habillée en valeur, pas en pression.',
          },
          {
            type: 'scenario',
            id: 'temps-scenario',
            xp: 20,
            context: '17h30, vendredi. Vous êtes en négociation finale pour un contrat de 120 000 €. L\'acheteur dit :',
            dialogue: [
              { speaker: 'acheteur', text: '"J\'ai besoin d\'une réponse ce soir. Mon DAF a un autre projet à valider lundi et votre dossier passe en premier — mais si vous n\'avez pas bougé d\'ici 19h, je signe avec DataSys."' },
            ],
            question: 'Quelle est votre meilleure réponse ?',
            options: [
              '"D\'accord, je vais revoir notre prix, donnez-moi 30 minutes."',
              '"Je comprends. Avant de vous donner une réponse définitive : si votre DAF valide lundi, est-ce qu\'un accord de principe écrit ce soir + contrat final lundi matin serait acceptable ? Je veux vous donner une proposition solide, pas une réponse précipitée."',
              '"19h c\'est trop juste, je ne peux pas décider comme ça."',
              '"DataSys ne peut pas vous offrir les mêmes garanties, ne prenez pas cette décision vite."',
            ],
            correct: 1,
            explanation: '✅ Maîtrisé ! Vous proposez une alternative structurée (accord de principe + contrat lundi) qui répond à la contrainte réelle (validation DAF lundi) sans subir la pression des 19h. Vous montrez de la bonne volonté sans céder de valeur.',
          },
          {
            type: 'matching',
            id: 'temps-matching',
            xp: 15,
            instruction: 'Associez chaque tactique temporelle à la contre-mesure adaptée',
            pairs: [
              { left: '"Réponse ce soir sinon je vais chez votre concurrent"', right: 'Tester : "Si je confirme demain matin, c\'est gérable ?"' },
              { left: '"Notre comité se réunit une fois par mois"', right: 'Proposer une validation intermédiaire ou un accord conditionnel' },
              { left: '"On doit clôturer nos achats avant le 31 décembre"', right: 'Transformer en levier : offre valable jusqu\'au 31 avec bonus inclus' },
              { left: '"Je vais prendre le temps qu\'il faut, je ne suis pas pressé"', right: 'Rappeler le coût de l\'impasse pour l\'acheteur' },
            ],
          },
        ],
      },
      {
        id: 'meso',
        title: 'La Multi-Offre Simultanée (MESOs)',
        subtitle: 'Négocier avec plusieurs offres',
        icon: '🔀',
        xpReward: 80,
        duration: '8 min',
        exercises: [
          {
            type: 'lesson',
            id: 'meso-intro',
            title: 'Les MESOs : négocier avec plusieurs offres',
            content: [
              {
                heading: 'Qu\'est-ce qu\'un MESO ?',
                text: 'Un **MESO (Multiple Equivalent Simultaneous Offer)** consiste à présenter simultanément plusieurs offres de valeur identique pour vous, mais différentes dans leur composition. Conçu à Harvard par Kathleen McGinn, c\'est l\'une des techniques les plus puissantes de la négociation intégrative.',
              },
              {
                heading: 'La valeur d\'apprentissage',
                text: 'Quand vous présentez 3 offres et que l\'acheteur en rejette 2, sa préférence vous révèle ses intérêts réels. Vous savez maintenant ce qui compte vraiment — information impossible à obtenir autrement.',
              },
              {
                heading: 'Comment construire un MESO ?',
                bullets: [
                  '1️⃣ **Identifiez 3-4 variables** : prix, délai, périmètre, durée, garantie, formation...',
                  '2️⃣ **Créez 3 combinaisons** de valeur équivalente pour vous (même marge)',
                  '3️⃣ **Présentez-les simultanément** : "Voici 3 options, toutes acceptables pour moi"',
                  '4️⃣ **Analysez la réaction** : laquelle préfère-t-il ? Pourquoi ?',
                ],
              },
              {
                heading: 'Exemple IT B2B',
                text: 'Option A : 95 000 €, 3 ans, SLA 4h. Option B : 82 000 €, 1 an, SLA 8h. Option C : 105 000 €, 5 ans, SLA 2h + formation. Toutes vous donnent la même marge. La préférence de l\'acheteur révèle s\'il optimise sur le prix, l\'engagement ou la réactivité.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'meso-q1',
            xp: 10,
            question: 'Quel est l\'avantage principal de présenter 3 MESOs plutôt qu\'une offre unique ?',
            options: [
              'Montrer que vous avez beaucoup de flexibilité commerciale',
              'Révéler les préférences réelles de l\'acheteur et trouver plus facilement un accord',
              'Permettre à l\'acheteur de choisir le prix le moins élevé',
              'Éviter d\'avoir à justifier votre prix de départ',
            ],
            correct: 1,
            explanation: '✅ Exact ! L\'avantage clé des MESOs n\'est pas la flexibilité apparente — c\'est l\'information révélée. Quand l\'acheteur préfère l\'Option C (SLA 2h) à l\'Option A (prix bas), vous savez que la réactivité compte plus que le coût.',
          },
          {
            type: 'qcm',
            id: 'meso-q2',
            xp: 10,
            question: 'Vous proposez 3 options à valeur équivalente. L\'acheteur dit : "Aucune ne me convient, elles sont toutes trop chères." Quelle est la bonne réaction ?',
            options: [
              'Baisser le prix des 3 options immédiatement',
              '"Je comprends. Quelle option vous a semblé la plus proche de ce que vous cherchez, et qu\'est-ce qui vous a bloqué sur celle-là ?"',
              'Retirer les MESOs et revenir à une offre unique',
              'Proposer une 4ème option encore moins chère',
            ],
            correct: 1,
            explanation: '✅ Parfait ! Même un rejet global révèle des préférences. "La plus proche" identifie l\'intérêt dominant. "Ce qui a bloqué" identifie l\'obstacle à résoudre. Vous ne cédez pas de valeur — vous obtenez de l\'information pour construire une offre sur-mesure.',
          },
          {
            type: 'scenario',
            id: 'meso-scenario',
            xp: 20,
            context: 'Vous négociez un contrat de cybersécurité managée. L\'acheteur hésite depuis 4 semaines entre vos 3 options :',
            dialogue: [
              { speaker: 'acheteur', text: '"Vos options sont intéressantes mais je n\'arrive pas à choisir. J\'ai besoin de quelque chose de plus personnalisé."' },
            ],
            question: 'Comment utilisez-vous cette hésitation pour avancer ?',
            options: [
              '"D\'accord, créons une 4ème option sur mesure avec un prix spécial."',
              '"Je comprends. Dites-moi : dans les 3 options, laquelle vous a semblé la plus alignée ? Et qu\'est-ce qui vous a retenu — le prix, le périmètre, ou autre chose ?"',
              '"Vous avez besoin de plus de temps — revenons dans 2 semaines."',
              '"Si aucune option ne vous convient, nous ne sommes peut-être pas le bon partenaire."',
            ],
            correct: 1,
            explanation: '✅ Stratégique ! L\'hésitation est une mine d\'or. "La plus alignée" révèle la préférence dominante. "Ce qui a retenu" identifie l\'obstacle précis. Avec ces 2 informations, vous ajustez une option existante sans créer une 4ème — et sans toucher à votre marge.',
          },
          {
            type: 'ordering',
            id: 'meso-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les étapes de construction et présentation d\'un MESO efficace :',
            items: [
              { id: 'a', text: 'Présenter les 3 offres simultanément en précisant qu\'elles vous conviennent toutes' },
              { id: 'b', text: 'Identifier 3-4 variables de valeur différentes pour l\'acheteur' },
              { id: 'c', text: 'Analyser la réaction et utiliser la préférence comme information' },
              { id: 'd', text: 'Construire 3 combinaisons à marge équivalente pour vous' },
            ],
            correct: ['b', 'd', 'a', 'c'],
          },
        ],
      },
    ],
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
    locked: false,
    lessons: [
      {
        id: 'types-objections',
        title: 'Comprendre les Types d\'Objections',
        subtitle: 'Réelles vs tactiques',
        icon: '🔍',
        xpReward: 60,
        duration: '6 min',
        exercises: [
          {
            type: 'lesson',
            id: 'types-objections-intro',
            title: 'Décoder les objections',
            content: [
              {
                heading: 'Objection réelle vs objection tactique',
                text: 'Toute objection n\'est pas un vrai problème. Une **objection réelle** est un obstacle authentique que vous devez résoudre. Une **objection tactique** est un levier de pression pour obtenir une concession. Confondre les deux est l\'erreur la plus coûteuse en négociation B2B.',
              },
              {
                heading: 'Les 4 grandes catégories',
                bullets: [
                  '💰 **Prix** : "C\'est trop cher", "concurrent moins cher" — souvent tactique',
                  '⏰ **Délai** : "Vos délais sont trop longs" — peut être réelle ou tactique',
                  '👤 **Décideur absent** : "Je dois en parler à mon directeur" — souvent un paravent',
                  '🏁 **Concurrence** : "J\'ai une meilleure offre ailleurs" — vérifier la comparabilité',
                ],
              },
              {
                heading: 'Comment tester : réelle ou tactique ?',
                text: 'La question magique : **"Si on résolvait ce point, est-ce qu\'il y a d\'autres freins à aller de l\'avant ?"** Si la réponse est "non", c\'est la vraie objection. Si la réponse est "eh bien... oui, il y a aussi...", il y avait d\'autres blocages.',
              },
              {
                heading: 'Règle pratique',
                text: 'Ne traitez jamais une objection sans l\'avoir qualifiée. Une concession sur une objection tactique n\'apporte rien — l\'acheteur trouvera une autre objection.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'types-objections-q1',
            xp: 10,
            question: 'L\'acheteur dit : "Votre produit est trop cher, ça ne passera jamais en comité." Cette objection est probablement :',
            options: [
              'Réelle — il faut baisser le prix immédiatement',
              'Tactique ou non qualifiée — demandez "si le prix était OK, y aurait-il d\'autres freins ?"',
              'Définitive — la négociation est terminée',
              'Un signal d\'achat déguisé',
            ],
            correct: 1,
            explanation: '✅ Juste ! "Ça ne passera pas en comité" peut signifier : (a) budget vraiment insuffisant, (b) tactique pour obtenir une remise, (c) ROI pas clair pour le comité. Avant de baisser le prix, qualifiez : "Qu\'est-ce que le comité évalue exactement ?" et "Si on résout le prix, c\'est bon pour vous ?"',
          },
          {
            type: 'qcm',
            id: 'types-objections-q2',
            xp: 10,
            question: 'Face à l\'objection "délais trop longs", quelle est la réponse adaptée ?',
            options: [
              'Promettre des délais impossibles à tenir pour signer',
              'D\'abord qualifier si le délai est une contrainte réelle ou un levier, puis répondre en conséquence',
              'Expliquer que vos délais sont incompressibles',
              'Proposer immédiatement une remise en échange d\'un délai allongé',
            ],
            correct: 1,
            explanation: '✅ Exact ! Si le délai est réel (mise en production avant fin de trimestre), vous devez trouver une solution concrète. Si c\'est tactique ("les autres font plus vite"), vous montrez la différence qualitative. La qualification avant la réponse est systématique.',
          },
          {
            type: 'scenario',
            id: 'types-objections-scenario',
            xp: 15,
            context: 'Vous avez présenté votre offre. L\'entretien s\'est bien passé. L\'acheteur conclut :',
            dialogue: [
              { speaker: 'acheteur', text: '"Votre offre est intéressante, mais je dois en parler à mon directeur avant de prendre une décision. Je vous reviens."' },
            ],
            question: 'Comment traitez-vous cette objection sans être agressif ?',
            options: [
              '"Votre directeur sera disponible quand ? Je peux venir vous présenter ensemble."',
              '"Je comprends. Votre directeur aura besoin de quelles informations pour valider ? Et vous, personnellement, est-ce que cette solution répond à vos enjeux ?"',
              '"D\'accord, revenez vers moi quand vous êtes prêt."',
              '"Votre directeur peut-il nous appeler maintenant ?"',
            ],
            correct: 1,
            explanation: '✅ Double mouvement ! Vous préparez la présentation au directeur (quelles infos ?) ET vous testez si votre interlocuteur est lui-même convaincu. Si sa réponse à "vous personnellement" est hésitante, le vrai problème n\'est pas le directeur — traitez d\'abord son objection réelle.',
          },
          {
            type: 'matching',
            id: 'types-objections-matching',
            xp: 15,
            instruction: 'Classez chaque objection dans la bonne catégorie',
            pairs: [
              { left: '"C\'est 30 % plus cher que votre concurrent"', right: 'Objection prix' },
              { left: '"Je dois valider avec le département juridique"', right: 'Objection décideur / processus' },
              { left: '"Vos délais de 6 semaines, c\'est trop long"', right: 'Objection délai' },
              { left: '"On a déjà un prestataire qui fait ça très bien"', right: 'Objection concurrence' },
            ],
          },
        ],
      },
      {
        id: 'crac',
        title: 'La Méthode CRAC',
        subtitle: 'Comprendre → Reformuler → Argumenter → Contrôler',
        icon: '🧩',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'crac-intro',
            title: 'CRAC : la méthode en 4 étapes',
            content: [
              {
                heading: 'CRAC — 4 étapes pour traiter toute objection',
                bullets: [
                  '**C**omprendre : laisser l\'acheteur finir, écouter sans interrompre',
                  '**R**eformuler : vérifier et valider la compréhension de l\'objection',
                  '**A**rgumenter : apporter une réponse précise, factuelle et valorisante',
                  '**C**ontrôler : vérifier que l\'objection est levée avant d\'avancer',
                ],
              },
              {
                heading: 'Pourquoi l\'ordre compte ?',
                text: 'La plupart des commerciaux sautent à l\'**A** (Argumenter) sans avoir fait le **R** (Reformuler). Résultat : ils répondent à la mauvaise objection. L\'acheteur se sent incompris et la résistance augmente.',
              },
              {
                heading: 'Exemples de reformulations (étape R)',
                bullets: [
                  '"Si je comprends bien, votre préoccupation principale c\'est [X], c\'est bien ça ?"',
                  '"Vous me dites que [Y] pose problème — est-ce le seul frein ou y en a-t-il d\'autres ?"',
                  '"Donc ce qui est important pour vous, c\'est [Z]. Je veux répondre au bon sujet."',
                ],
              },
              {
                heading: 'L\'étape C finale : indispensable',
                text: 'Ne jamais passer à la suite sans confirmer : **"Est-ce que ça répond à votre question ?"** Une objection non confirmée comme levée reviendra plus tard.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'crac-q1',
            xp: 10,
            question: 'Vous dites : "Donc si je comprends bien, le délai de 8 semaines vous pose problème parce que votre migration est planifiée pour septembre — c\'est bien ça ?" C\'est l\'étape :',
            options: [
              'Comprendre',
              'Reformuler',
              'Argumenter',
              'Contrôler',
            ],
            correct: 1,
            explanation: '✅ Exact ! Vous reformulez l\'objection avec précision (délai + raison + contexte) pour confirmer votre compréhension avant d\'argumenter. Si l\'acheteur répond "pas tout à fait", vous évitez de répondre à côté.',
          },
          {
            type: 'qcm',
            id: 'crac-q2',
            xp: 10,
            question: 'Parmi ces reformulations, laquelle est la plus efficace pour l\'étape R du CRAC ?',
            options: [
              '"Vous trouvez ça trop cher, c\'est normal."',
              '"Donc vous avez un problème avec notre prix ?"',
              '"Si je comprends bien, votre contrainte est que le budget alloué pour Q4 est de 70 000 €, et notre offre à 85 000 € dépasse cette enveloppe — c\'est bien le blocage ?"',
              '"Je vais vous expliquer pourquoi notre prix est justifié."',
            ],
            correct: 2,
            explanation: '✅ Parfait ! Cette reformulation est précise (70 000 € vs 85 000 €), factualisée (budget Q4) et fermée sur une confirmation. Elle montre que vous avez compris la contrainte réelle. Avec cette précision, votre argument peut être chirurgical : proposer un paiement étalé Q4/Q1 par exemple.',
          },
          {
            type: 'scenario',
            id: 'crac-scenario',
            xp: 20,
            context: 'Appel de suivi. Vous avez remis votre offre la semaine dernière pour un projet de digitalisation (95 000 €). L\'acheteur revient :',
            dialogue: [
              { speaker: 'acheteur', text: '"On a étudié votre offre. Honnêtement, vos délais sont trop longs. 14 semaines, c\'est ingérable pour nous. On attendait 8 semaines maximum."' },
            ],
            question: 'Laquelle de ces réponses applique correctement la méthode CRAC ?',
            options: [
              '"14 semaines c\'est notre standard, on ne peut pas faire moins."',
              '"[Comprendre] Je vous entends — 14 semaines vous pose problème. [Reformuler] Si je résume : votre impératif est une mise en production avant fin septembre, et 14 semaines vous emmène en novembre — c\'est bien ça ? [Argumenter] Voici comment on peut structurer le projet pour tenir 10 semaines... [Contrôler] Est-ce que cette approche répond à votre contrainte calendrier ?"',
              '"Pourquoi 8 semaines ? C\'est très ambitieux pour un projet de cette taille."',
              '"Je vais voir avec mon équipe technique ce qu\'on peut faire."',
            ],
            correct: 1,
            explanation: '✅ CRAC appliqué ! Chaque étape est visible : Comprendre, Reformuler (contrainte précise), Argumenter (10 semaines), Contrôler (confirmer que l\'objection est levée). C\'est la seule option qui suit le processus complet.',
          },
          {
            type: 'ordering',
            id: 'crac-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les 4 étapes de la méthode CRAC :',
            items: [
              { id: 'a', text: 'Contrôler : vérifier que l\'objection est levée' },
              { id: 'b', text: 'Reformuler : valider votre compréhension de l\'objection' },
              { id: 'c', text: 'Comprendre : écouter l\'objection sans interrompre' },
              { id: 'd', text: 'Argumenter : apporter une réponse précise et valorisante' },
            ],
            correct: ['c', 'b', 'd', 'a'],
          },
        ],
      },
      {
        id: 'objection-prix',
        title: 'L\'Objection Prix',
        subtitle: 'Défendre la valeur sans baisser',
        icon: '💰',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'objection-prix-intro',
            title: 'Traiter l\'objection prix sans baisser',
            content: [
              {
                heading: '"C\'est trop cher" = manque de valeur perçue',
                text: 'L\'objection prix n\'est presque jamais un problème de budget — c\'est un problème de **valeur perçue**. Si l\'acheteur voyait clairement ce que votre solution lui rapporte, le prix deviendrait secondaire. Votre travail : rendre la valeur visible.',
              },
              {
                heading: 'Le ROI comme bouclier prix',
                text: 'Formule de base : **Valeur créée ÷ Investissement = ROI**. Si votre solution économise 40 000 €/an et coûte 80 000 €, le ROI est 2x en 2 ans. Présentez toujours votre prix face au coût de l\'inaction.',
              },
              {
                heading: 'Le TCO (Total Cost of Ownership)',
                text: 'L\'acheteur compare votre prix à celui du concurrent ? Élargissez la comparaison au **coût total** : prix d\'achat + installation + formation + maintenance + risque de migration. Votre solution à 95 000 € peut avoir un TCO inférieur à celle du concurrent à 70 000 €.',
              },
              {
                heading: 'Les 4 armes contre l\'objection prix',
                bullets: [
                  '💰 **ROI** : "Cet investissement vous rapporte [X€] par an"',
                  '📊 **TCO** : "Sur 3 ans, notre solution coûte en réalité moins cher"',
                  '⚠️ **Coût de l\'inaction** : "Sans cette solution, vous perdez [X€/mois]"',
                  '🎯 **Décomposition** : "85 000 €, c\'est 7 000 €/mois — soit le coût d\'un demi-poste"',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'objection-prix-q1',
            xp: 10,
            question: 'L\'acheteur dit "c\'est trop cher". Quelle est la PREMIÈRE chose à faire ?',
            options: [
              'Proposer une remise immédiate pour maintenir l\'intérêt',
              'Qualifier l\'objection : "Trop cher par rapport à quoi ?"',
              'Défendre votre prix avec une liste d\'arguments',
              'Demander quel est son budget maximum',
            ],
            correct: 1,
            explanation: '✅ Fondamental ! "Trop cher par rapport à quoi ?" vous donne une information cruciale : est-ce par rapport au budget disponible, à un concurrent, à la valeur perçue, ou à une expérience passée ? Chaque cas appelle une réponse différente. Qualifier avant d\'argumenter évite de perdre de la valeur inutilement.',
          },
          {
            type: 'qcm',
            id: 'objection-prix-q2',
            xp: 10,
            question: 'Votre solution coûte 60 000 €/an. Elle automatise une tâche qui mobilise 2 personnes à 35 000 €/an chacune. Quel est votre argument ROI ?',
            options: [
              '"Notre solution est moins chère sur le long terme."',
              '"C\'est 60 000 € par an, soit moins de 5 000 € par mois."',
              '"Votre investissement de 60 000 € remplace 70 000 € de masse salariale dédiée — soit 10 000 € économisés dès la première année, plus de la capacité humaine redéployée sur des tâches à plus forte valeur."',
              '"Notre solution a le meilleur rapport qualité-prix du marché."',
            ],
            correct: 2,
            explanation: '✅ Excellent ROI ! Vous quantifiez précisément : 70 000 € économisés - 60 000 € investissement = 10 000 € net + gain humain. Vous ne dites pas juste "c\'est rentable" — vous montrez le calcul. Un acheteur qui peut défendre ce calcul en comité n\'a plus d\'objection prix.',
          },
          {
            type: 'scenario',
            id: 'objection-prix-scenario',
            xp: 20,
            context: 'Appel de suivi. Votre offre de cybersécurité managée est à 90 000 €/an. L\'acheteur revient :',
            dialogue: [
              { speaker: 'acheteur', text: '"On a comparé avec DataPro. Ils sont à 68 000 € pour un périmètre qu\'ils disent équivalent. Vous êtes 32 % plus cher. Il faut m\'expliquer pourquoi."' },
            ],
            question: 'Comment défendez-vous votre prix ?',
            options: [
              '"Notre réputation sur le marché justifie ce prix."',
              '"68 000 € c\'est impossible pour ce périmètre — DataPro ne peut pas tenir ces prix."',
              '"Bonne question. Avant de comparer les prix, vérifions le périmètre réel : leur offre inclut-elle la détection 24/7, le SOC externalisé et la réponse en 4h garantie ? Ces 3 éléments représentent 22 000 € de notre offre. Sur un périmètre identique, l\'écart réel est bien plus faible — et votre risque résiduel aussi."',
              '"Je peux vous faire une remise de 10 % si vous signez ce mois-ci."',
            ],
            correct: 2,
            explanation: '✅ Stratégie TCO ! Vous ne défendez pas votre prix — vous déconstruisez la comparaison. En identifiant 22 000 € d\'éléments différenciants, vous forcez une comparaison à périmètre réel, pas apparent.',
          },
          {
            type: 'matching',
            id: 'objection-prix-matching',
            xp: 15,
            instruction: 'Associez chaque argument valeur à la situation où il est le plus pertinent',
            pairs: [
              { left: 'ROI (retour sur investissement)', right: 'L\'acheteur peut quantifier ses gains ou économies' },
              { left: 'TCO (coût total de possession)', right: 'Le concurrent semble moins cher à l\'achat' },
              { left: 'Coût de l\'inaction', right: 'L\'acheteur reporte la décision sans raison claire' },
              { left: 'Décomposition mensuelle', right: 'Le prix global paraît psychologiquement élevé' },
            ],
          },
        ],
      },
      {
        id: 'tactiques',
        title: 'Les Tactiques de Déstabilisation',
        subtitle: 'Reconnaître et neutraliser',
        icon: '♟️',
        xpReward: 80,
        duration: '8 min',
        exercises: [
          {
            type: 'lesson',
            id: 'tactiques-intro',
            title: 'Reconnaître et neutraliser les tactiques',
            content: [
              {
                heading: 'Pourquoi les acheteurs utilisent des tactiques ?',
                text: 'Les directions achats forment leurs équipes à des techniques de pression. L\'objectif : vous déstabiliser pour obtenir des concessions non justifiées. La **reconnaissance** est votre première ligne de défense.',
              },
              {
                heading: 'Les 5 tactiques classiques',
                bullets: [
                  '🎭 **Good cop / Bad cop** : un acheteur sympa, un autre agressif — même équipe, même objectif',
                  '💸 **Faux budget serré** : "On a seulement 60 000 €" (alors que le budget est de 90 000 €)',
                  '⚡ **Ultimatum** : "C\'est à prendre ou à laisser, décidez maintenant"',
                  '🔇 **Silence pesant** : silence prolongé après votre prix pour vous pousser à vous justifier',
                  '🍕 **Salami** : demander des concessions une par une, jamais toutes à la fois',
                ],
              },
              {
                heading: 'La règle de la nomination',
                text: '**Nommer la tactique calmement neutralise 80 % de son effet.** "Je vois que vous utilisez une contrainte de temps pour accélérer ma décision — c\'est normal en négociation. Permettez-moi de prendre le temps d\'une bonne réponse." Pas d\'accusation, juste une observation neutre.',
              },
              {
                heading: 'Le protocole de résistance',
                bullets: [
                  '1️⃣ **Reconnaître** la tactique (intérieurement d\'abord)',
                  '2️⃣ **Ralentir** : ne jamais répondre immédiatement sous pression',
                  '3️⃣ **Nommer si nécessaire** : observation neutre, pas d\'accusation',
                  '4️⃣ **Repositionner** sur les intérêts mutuels : "On veut tous les deux un accord solide"',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'tactiques-q1',
            xp: 10,
            question: 'L\'acheteur principal quitte la pièce. Son collègue prend le relais et est beaucoup plus exigeant. Au retour du premier, l\'atmosphère redevient cordiale. C\'est :',
            options: [
              'Un hasard — les deux acheteurs ont des styles naturellement différents',
              'La tactique Good cop / Bad cop',
              'Un signe que votre offre ne convient pas',
              'Une opportunité de négocier avec le collègue agressif',
            ],
            correct: 1,
            explanation: '✅ Classique ! Good cop / Bad cop est l\'une des tactiques achat les plus utilisées en B2B. La réponse adaptée : ne pas céder plus au "bad cop", et ne pas vous relâcher avec le "good cop". Traitez-les comme une entité unique avec un intérêt commun.',
          },
          {
            type: 'qcm',
            id: 'tactiques-q2',
            xp: 10,
            question: 'L\'acheteur dit : "C\'est ma dernière offre : 75 000 € ou on arrête les discussions." Vous êtes à 90 000 €. Quelle est la meilleure réponse ?',
            options: [
              'Accepter 75 000 € pour ne pas perdre le deal',
              'Répondre fermement "non" et partir',
              '"Je comprends votre position. Un ultimatum mérite une réponse ferme : à 75 000 € le périmètre complet n\'est pas tenable. Mais je ne veux pas qu\'on s\'arrête là — dites-moi ce qui est vraiment essentiel pour vous, et construisons quelque chose à 75 000 € qui tient la route."',
              '"Je dois vérifier avec ma direction si 75 000 € est possible."',
            ],
            correct: 2,
            explanation: '✅ Excellent ! Vous ne cédez pas à l\'ultimatum et vous ne partez pas non plus. Vous nommez la situation, maintenez votre position sur le périmètre, et rouvrez la conversation sur les intérêts. Ne jamais réagir à la pression — répondre aux intérêts.',
          },
          {
            type: 'scenario',
            id: 'tactiques-scenario',
            xp: 20,
            context: 'Vous annoncez votre prix (87 000 €) pour un projet de transformation digitale. Après votre annonce, l\'acheteur ne dit rien. 10 secondes. 20 secondes. 30 secondes. Il vous regarde en silence.',
            dialogue: [
              { speaker: 'acheteur', text: '...' },
            ],
            question: 'Que faites-vous ?',
            options: [
              'Baisser votre prix spontanément pour briser le malaise',
              'Ajouter des éléments de valeur pour justifier le prix',
              'Soutenir le silence. S\'il dure, dire calmement : "Je vous laisse le temps d\'y réfléchir. Est-ce que 87 000 € appelle une question de votre part ?"',
              'S\'excuser et demander si le prix pose problème',
            ],
            correct: 2,
            explanation: '✅ Maîtrise du silence ! Le silence post-annonce pousse les commerciaux inexpérimentés à se justifier ou baisser leur prix spontanément. La résistance au silence = ne rien dire. Si vous devez parler après 30 secondes, une question neutre qui renvoie la pression est parfaite.',
          },
          {
            type: 'ordering',
            id: 'tactiques-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre le protocole face à une tactique de déstabilisation :',
            items: [
              { id: 'a', text: 'Nommer la tactique calmement si nécessaire' },
              { id: 'b', text: 'Repositionner sur les intérêts mutuels et l\'accord à construire' },
              { id: 'c', text: 'Reconnaître intérieurement la tactique utilisée' },
              { id: 'd', text: 'Ralentir et ne pas répondre sous pression immédiate' },
            ],
            correct: ['c', 'd', 'a', 'b'],
          },
        ],
      },
    ],
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
    locked: false,
    lessons: [
      {
        id: 'signaux',
        title: 'Les Signaux d\'Achat',
        subtitle: 'Lire les signaux pour conclure',
        icon: '📡',
        xpReward: 60,
        duration: '6 min',
        exercises: [
          {
            type: 'lesson',
            id: 'signaux-intro',
            title: 'Lire les signaux d\'achat',
            content: [
              {
                heading: 'Qu\'est-ce qu\'un signal d\'achat ?',
                text: 'Un signal d\'achat est un signe, verbal ou comportemental, que l\'acheteur a mentalement franchi le pas vers la décision. Ne pas les reconnaître = passer à côté du bon moment pour conclure.',
              },
              {
                heading: 'Signaux verbaux',
                bullets: [
                  '❓ **Questions logistiques** : "Quels sont vos délais ?", "Comment se passe l\'installation ?" → il se projette',
                  '🔮 **Conditionnels positifs** : "Si on travaillait ensemble...", "Une fois le contrat signé..." → il s\'imagine client',
                  '📋 **Questions de détail** : "Qui serait notre interlocuteur au quotidien ?" → il planifie la relation',
                ],
              },
              {
                heading: 'Signaux comportementaux',
                bullets: [
                  '📐 Relecture du devis attentive devant vous',
                  '📞 Appel d\'un collègue pour valider un point technique',
                  '✍️ Prise de notes sur les modalités pratiques',
                  '😌 Détente visible : ton moins formel, humour',
                ],
              },
              {
                heading: 'La règle d\'or',
                text: 'Quand vous détectez un signal d\'achat, **arrêtez de vendre et commencez à conclure**. Continuer à argumenter après un signal d\'achat crée du doute là où il n\'y en avait plus.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'signaux-q1',
            xp: 10,
            question: 'En plein débat sur le prix, l\'acheteur demande : "Au fait, combien de personnes de votre équipe seraient mobilisées sur notre projet ?" C\'est :',
            options: [
              'Une tentative de négocier en réclamant moins de ressources',
              'Un signal d\'achat — il se projette dans la collaboration',
              'Une question technique à répondre précisément avant de continuer la négociation',
              'Une distraction à ignorer',
            ],
            correct: 1,
            explanation: '✅ Signal d\'achat détecté ! Une question sur les ressources projet = il se projette en client. La bonne réaction : répondre brièvement, puis initier le closing. "On mobiliserait 3 personnes dédiées. D\'ailleurs, est-ce qu\'il reste des points qui vous empêchent d\'avancer ?"',
          },
          {
            type: 'qcm',
            id: 'signaux-q2',
            xp: 10,
            question: 'L\'acheteur dit : "Si on s\'engageait avec vous, comment fonctionnerait le suivi mensuel ?" Quelle est la réaction idéale ?',
            options: [
              'Expliquer longuement votre processus de suivi pour montrer votre organisation',
              'Répondre à la question puis tester le closing : "Voilà comment on fonctionne. Est-ce que ce fonctionnement vous convient — si oui, on peut parler des prochaines étapes ?"',
              'Profiter pour présenter d\'autres avantages de votre offre',
              'Demander si c\'est le dernier point avant décision',
            ],
            correct: 1,
            explanation: '✅ Parfait ! Vous répondez à la question ET vous transformez le signal en closing avec "parler des prochaines étapes". Vous ne sur-vendez pas — vous utilisez la question comme tremplin vers la conclusion.',
          },
          {
            type: 'scenario',
            id: 'signaux-scenario',
            xp: 15,
            context: 'Négociation d\'un logiciel de gestion. Le débat prix dure depuis 20 minutes. Puis l\'acheteur dit :',
            dialogue: [
              { speaker: 'acheteur', text: '"Vos délais de livraison, c\'est combien de semaines exactement ?"' },
            ],
            question: 'Comment interprétez-vous ce changement de sujet et que faites-vous ?',
            options: [
              'C\'est une distraction — on revient au débat prix',
              'Signal d\'achat fort. Répondez sur les délais, puis initiez le closing : "On peut livrer en 6 semaines après signature. Si ce délai vous convient, quelles sont les prochaines étapes de votre côté pour aller de l\'avant ?"',
              'Profitez-en pour présenter votre planning projet complet',
              'Demandez si le prix est enfin accepté avant de répondre sur les délais',
            ],
            correct: 1,
            explanation: '✅ Lecture parfaite ! Une question logistique en plein débat prix = il a mentalement accepté le prix et se projette dans le projet. Ne revenez pas sur le prix — vous réouvririez un débat clos. Répondez sur les délais et enchaînez sur les prochaines étapes.',
          },
          {
            type: 'matching',
            id: 'signaux-matching',
            xp: 15,
            instruction: 'Classez chaque phrase dans la bonne catégorie',
            pairs: [
              { left: '"Si on travaillait ensemble, quand pourriez-vous démarrer ?"', right: 'Signal d\'achat fort' },
              { left: '"C\'est intéressant, on verra..."', right: 'Signal d\'achat faible' },
              { left: '"Votre concurrent propose exactement la même chose moins cher"', right: 'Objection (pas un signal)' },
              { left: '"Qui contacter chez vous après la signature ?"', right: 'Signal d\'achat fort' },
            ],
          },
        ],
      },
      {
        id: 'closing-techniques',
        title: 'Les Techniques de Closing',
        subtitle: 'Conclure au bon moment',
        icon: '✅',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'closing-techniques-intro',
            title: 'Conclure au bon moment, de la bonne façon',
            content: [
              {
                heading: 'Pourquoi le closing échoue ?',
                text: 'Les raisons les plus fréquentes : trop tôt (acheteur pas prêt), trop tard (acheteur perdu en route), mauvaise technique (trop agressive ou trop passive). Un bon closing est **invisible** — c\'est simplement la suite logique d\'une négociation bien conduite.',
              },
              {
                heading: '4 techniques de closing B2B',
                bullets: [
                  '📋 **Résumé-bilan** : "Récapitulons : vous avez validé [A], [B], [C] — il reste à confirmer [D]." → Crée l\'élan',
                  '🔀 **Alternative fermée** : "On démarre le 15 ou le 1er du mois prochain ?" → Pas de oui/non',
                  '⏰ **Urgence réelle** : utiliser une vraie contrainte (fin d\'offre, slot de démarrage)',
                  '🧪 **Trial close** : "Si on s\'accordait sur [X], est-ce que vous seriez prêt à avancer ?" → Teste sans forcer',
                ],
              },
              {
                heading: 'Le trial close : votre meilleur outil',
                text: 'Le trial close n\'est pas un vrai closing — c\'est une **sonde**. Il révèle s\'il reste des obstacles sans mettre la pression. Si la réponse est "oui, mais...", vous découvrez le dernier frein. Si c\'est "oui", vous pouvez conclure immédiatement.',
              },
              {
                heading: 'À ne jamais faire',
                bullets: [
                  '❌ "Alors, on fait affaire ?" — trop direct, met sur la défensive',
                  '❌ Closing répété après un refus — harcèlement perçu',
                  '❌ Closing avant d\'avoir levé toutes les objections',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'closing-techniques-q1',
            xp: 10,
            question: 'L\'acheteur est analytique, prudent, et prend toujours le temps de valider. Quelle technique de closing est la plus adaptée ?',
            options: [
              'Alternative fermée : "On démarre le 15 ou le 1er ?"',
              'Résumé-bilan : "Récapitulons vos besoins validés, les solutions proposées et les termes convenus — est-ce un résumé fidèle ?"',
              'Urgence réelle : "Notre tarif change en fin de mois"',
              'Trial close immédiat : "On est prêts à signer ?"',
            ],
            correct: 1,
            explanation: '✅ Juste ! Un acheteur analytique a besoin de voir la cohérence et la logique de la décision. Le résumé-bilan lui montre que tous les points ont été couverts. L\'alternative fermée ou l\'urgence peuvent le brusquer et relancer ses doutes.',
          },
          {
            type: 'qcm',
            id: 'closing-techniques-q2',
            xp: 10,
            question: 'Parmi ces formulations, laquelle est un trial close efficace ?',
            options: [
              '"Vous êtes prêt à signer aujourd\'hui ?"',
              '"Si on s\'accordait sur une date de démarrage au 15 mars, est-ce que le reste de l\'offre vous convient ?"',
              '"Notre offre est valable jusqu\'à vendredi."',
              '"Je vais préparer le contrat, vous n\'avez plus qu\'à signer."',
            ],
            correct: 1,
            explanation: '✅ Excellent trial close ! Il pose une condition hypothétique ("si") sur un point précis (date), teste la validation de l\'ensemble de l\'offre, et n\'exerce aucune pression. Si l\'acheteur répond "oui mais il y a encore [X]", vous avez votre dernier frein.',
          },
          {
            type: 'scenario',
            id: 'closing-techniques-scenario',
            xp: 20,
            context: 'Vous suivez ce prospect depuis 3 semaines. Il a validé le périmètre, le prix et les délais. Mais à chaque appel :',
            dialogue: [
              { speaker: 'acheteur', text: '"Je dois encore réfléchir, c\'est une décision importante. On se rappelle la semaine prochaine ?"' },
            ],
            question: 'Comment sortez-vous de ce cycle ?',
            options: [
              '"Pas de problème, on se rappelle la semaine prochaine."',
              '"Je comprends que c\'est une décision importante. Permettez-moi une question directe : y a-t-il un point spécifique qui vous retient, ou est-ce plutôt une question de timing ? Je veux vous aider à avancer, pas vous mettre la pression."',
              '"Si vous ne décidez pas cette semaine, je ne peux plus garantir notre disponibilité."',
              '"Vous avez validé prix, périmètre et délais — qu\'est-ce qu\'il reste à réfléchir ?"',
            ],
            correct: 1,
            explanation: '✅ La question directe et bienveillante ! "Point spécifique ou timing ?" force une réponse concrète. Soit il révèle un frein réel à traiter, soit il avoue que c\'est de la procrastination — auquel cas vous proposez un accord de principe ou une date ferme de décision.',
          },
          {
            type: 'ordering',
            id: 'closing-techniques-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les étapes d\'un closing en 4 temps :',
            items: [
              { id: 'a', text: 'Tester avec un trial close pour détecter les derniers freins' },
              { id: 'b', text: 'Détecter un signal d\'achat ou confirmer que toutes les objections sont levées' },
              { id: 'c', text: 'Conclure avec la technique adaptée au profil acheteur' },
              { id: 'd', text: 'Formaliser immédiatement : email de confirmation, prochaines étapes, date de signature' },
            ],
            correct: ['b', 'a', 'c', 'd'],
          },
        ],
      },
      {
        id: 'post-accord',
        title: 'La Gestion du Post-Accord',
        subtitle: 'Sécuriser après la signature',
        icon: '🔒',
        xpReward: 70,
        duration: '7 min',
        exercises: [
          {
            type: 'lesson',
            id: 'post-accord-intro',
            title: 'Sécuriser l\'accord après la signature',
            content: [
              {
                heading: 'Le commitment gap',
                text: 'Dans 30 à 40 % des cas, un accord verbal ne devient pas un contrat signé. Les raisons : validation interne qui échoue, renégociation post-accord, buyer\'s remorse, changement de décideur. Votre travail commence à l\'accord verbal.',
              },
              {
                heading: 'Les 24h critiques',
                text: 'Dans les 24h qui suivent un accord verbal : **email de confirmation immédiat** récapitulant les termes convenus, les prochaines étapes et les dates clés. Ce document "fige" l\'accord et réduit le risque de renégociation.',
              },
              {
                heading: 'Le buyer\'s remorse',
                text: 'Le "remords de l\'acheteur" survient souvent 24-48h après l\'accord quand il présente le deal en interne. Anticipez : aidez votre interlocuteur à "vendre" la décision en interne. Fournissez-lui les arguments, le business case, la présentation DAF.',
              },
              {
                heading: 'Escalade et renégociation post-accord',
                bullets: [
                  '🔒 **Principe** : un accord signé n\'est pas renégociable unilatéralement',
                  '📋 **Si modification** : toute modification doit être échangée (tu cèdes X → ils cèdent Y)',
                  '⚠️ **Red flag** : un acheteur qui renégocie après signature testera vos limites à chaque renouvellement',
                ],
              },
            ],
          },
          {
            type: 'qcm',
            id: 'post-accord-q1',
            xp: 10,
            question: 'Vous venez d\'obtenir un accord verbal sur un contrat de 85 000 €. Quelle est votre PREMIÈRE action ?',
            options: [
              'Célébrer avec votre équipe et informer votre manager',
              'Attendre la validation formelle avant de faire quoi que ce soit',
              'Envoyer un email de confirmation dans les 2h avec le récapitulatif des termes, les prochaines étapes et les dates clés',
              'Demander la date de signature du contrat',
            ],
            correct: 2,
            explanation: '✅ Les 24h critiques ! L\'email de confirmation est votre bouclier contre la renégociation post-accord. Il documente l\'accord, donne des prochaines étapes concrètes et engage les deux parties. Ne laissez jamais un accord verbal "flotter" sans trace écrite.',
          },
          {
            type: 'qcm',
            id: 'post-accord-q2',
            xp: 10,
            question: 'Le lendemain de la signature, l\'acheteur vous appelle : "Mon DAF dit qu\'on a déjà un prestataire pour la formation — vous pouvez retirer ce poste et baisser de 8 000 € ?" Que faites-vous ?',
            options: [
              'Accepter : perdre 8 000 € vaut mieux que perdre le contrat',
              '"Je comprends la situation. Le contrat que nous avons signé inclut ce poste. Si vous souhaitez le retirer, je suis ouvert à une modification — mais elle doit aller dans les deux sens : vous retirez la formation, je retire la garantie étendue incluse dans ce poste."',
              'Refuser catégoriquement toute modification',
              'Contacter votre directeur avant de répondre',
            ],
            correct: 1,
            explanation: '✅ Fermeté et réciprocité ! Vous reconnaissez la situation, maintenez le principe qu\'un accord signé est un accord, et proposez une modification équilibrée. Accepter sans contrepartie enverrait le signal que le contrat est renégociable — ce même acheteur reviendrait au renouvellement.',
          },
          {
            type: 'scenario',
            id: 'post-accord-scenario',
            xp: 20,
            context: 'Vous avez signé un contrat de maintenance hier. Ce matin :',
            dialogue: [
              { speaker: 'acheteur', text: '"Bonne nouvelle, mon directeur a validé ! Par contre, en relisant le contrat, il voudrait qu\'on revoit le SLA — il pensait que c\'était 2h, pas 4h. Si on pouvait aller à 2h sans changer le prix, ça nous arrangerait vraiment."' },
            ],
            question: 'Comment gérez-vous cette renégociation post-signature ?',
            options: [
              'Accepter le SLA 2h pour maintenir la bonne relation',
              'Refuser catégoriquement en citant le contrat signé',
              '"Félicitations pour la validation ! Sur le SLA 2h : je comprends l\'attente. Un SLA 2h implique une astreinte supplémentaire — la différence est de 6 000 €/an. Alternativement, on peut créer un SLA 2h pour les incidents P1 seulement à 3 000 € de plus. Qu\'est-ce qui correspond le mieux à votre usage réel ?"',
              'Demander si le directeur peut confirmer par email avant de répondre',
            ],
            correct: 2,
            explanation: '✅ Parfait ! Vous ne dites pas "non" et vous ne cédez pas gratuitement. Vous proposez deux options qui monétisent le changement demandé. L\'acheteur comprend que toute modification a un coût — et il peut choisir une solution adaptée à son usage réel.',
          },
          {
            type: 'matching',
            id: 'post-accord-matching',
            xp: 15,
            instruction: 'Associez chaque risque post-accord à l\'action préventive correspondante',
            pairs: [
              { left: 'Buyer\'s remorse — acheteur hésitant après signature', right: 'Fournir le business case pour défendre la décision en interne' },
              { left: 'Renégociation d\'un poste après signature', right: 'Toute modification est échangée : tu enlèves X → je retire Y' },
              { left: 'Accord verbal qui ne se concrétise pas', right: 'Email de confirmation dans les 2h avec termes et prochaines étapes' },
              { left: 'Changement de décideur post-accord', right: 'Documenter l\'accord et briefer rapidement le nouveau décideur' },
            ],
          },
        ],
      },
      {
        id: 'fidelisation',
        title: 'Fidélisation et Développement de Compte',
        subtitle: 'Transformer un client en partenaire',
        icon: '💎',
        xpReward: 80,
        duration: '8 min',
        exercises: [
          {
            type: 'lesson',
            id: 'fidelisation-intro',
            title: 'Transformer un client en partenaire stratégique',
            content: [
              {
                heading: 'La règle 80/20 en gestion de compte',
                text: '80 % de votre croissance viendra de 20 % de vos clients. Identifier ces clients stratégiques et investir dans la relation est la stratégie la plus rentable en B2B. Acquérir un nouveau client coûte 5 à 7x plus cher que développer un client existant.',
              },
              {
                heading: 'Upsell vs Cross-sell',
                bullets: [
                  '⬆️ **Upsell** : vendre une version supérieure ou un volume plus élevé de ce que le client a déjà',
                  '➡️ **Cross-sell** : vendre un produit/service complémentaire',
                  '🎯 **Moment idéal** : après une livraison réussie, ou lors d\'une business review positive',
                ],
              },
              {
                heading: 'Les signaux de risque (churn)',
                bullets: [
                  '📉 **Usage en baisse** : moins d\'utilisateurs actifs, moins de tickets support',
                  '👤 **Turnover du sponsor** : votre champion interne quitte l\'entreprise',
                  '🔇 **Silence inhabituel** : plus de réponse aux emails, RDV annulés',
                  '🏁 **Mise en concurrence** : appel d\'offres non annoncé détecté',
                ],
              },
              {
                heading: 'La business review annuelle',
                text: 'La business review est le rendez-vous stratégique annuel. Ce n\'est pas un rendez-vous de vente — c\'est un moment de co-construction. Format : bilan de l\'année (résultats, ROI), analyse des enjeux N+1, co-construction du plan de compte.',
              },
            ],
          },
          {
            type: 'qcm',
            id: 'fidelisation-q1',
            xp: 10,
            question: 'Vous venez de livrer avec succès la phase 1 d\'un projet. Le client est très satisfait. C\'est le bon moment pour :',
            options: [
              'Attendre le renouvellement annuel pour parler d\'un nouveau projet',
              'Proposer un upsell ou cross-sell en liant votre succès au nouveau projet potentiel',
              'Envoyer une enquête de satisfaction et attendre les résultats',
              'Demander une référence client avant tout',
            ],
            correct: 1,
            explanation: '✅ Le moment idéal ! La satisfaction post-livraison est le pic de confiance et de valeur perçue. Formuler : "On a bien réussi la phase 1. En regardant vos enjeux pour l\'an prochain, on a identifié quelque chose qui pourrait avoir le même impact — vous avez 20 minutes ?"',
          },
          {
            type: 'qcm',
            id: 'fidelisation-q2',
            xp: 10,
            question: 'Votre contact chez un client clé part à la retraite dans 3 mois. C\'est :',
            options: [
              'Un risque mineur — le contrat est signé jusqu\'en décembre',
              'Un signal de risque churn majeur — agissez immédiatement',
              'Une opportunité de repositionner votre offre avec le successeur uniquement',
              'Une situation normale à gérer lors du prochain renouvellement',
            ],
            correct: 1,
            explanation: '✅ Signal critique ! Votre champion interne défend votre valeur en interne, connaît votre historique et vous recommande. Son départ = risque de remise en question du contrat par le successeur. Action immédiate : demander une introduction officielle et documenter la valeur créée.',
          },
          {
            type: 'scenario',
            id: 'fidelisation-scenario',
            xp: 20,
            context: 'Business review annuelle avec un client stratégique (contrat 150 000 €/an, 3 ans de relation). Le bilan est excellent : KPIs dépassés, satisfaction haute, zéro incident majeur. Vers la fin du RDV :',
            dialogue: [
              { speaker: 'acheteur', text: '"C\'est vraiment une bonne année. On est contents de travailler avec vous."' },
            ],
            question: 'Comment ouvrez-vous naturellement sur un développement de compte ?',
            options: [
              '"Super ! On espère renouveler dans les mêmes conditions l\'an prochain."',
              '"Merci, ça nous tient à cœur. En préparant cette revue, on a regardé vos enjeux pour l\'an prochain. Je vois deux domaines où on pourrait avoir un impact similaire — vous voulez qu\'on en parle 10 minutes maintenant ou qu\'on planifie un RDV dédié ?"',
              '"Puisqu\'on a bien travaillé ensemble, on a une offre spéciale renouvellement + extension."',
              'Conclure le RDV positivement et envoyer une proposition non sollicitée la semaine suivante',
            ],
            correct: 1,
            explanation: '✅ Développement naturel ! Vous partez du contexte positif, vous montrez que vous connaissez leurs enjeux N+1, et vous proposez une conversation sans pression. Ce n\'est pas de la vente — c\'est de la co-construction. L\'acheteur ne se sent pas "vendu" mais conseillé par un partenaire.',
          },
          {
            type: 'ordering',
            id: 'fidelisation-ordering',
            xp: 15,
            instruction: 'Remettez dans l\'ordre les étapes d\'une business review de compte stratégique :',
            items: [
              { id: 'a', text: 'Analyser les enjeux et priorités N+1 du client' },
              { id: 'b', text: 'Présenter le bilan de l\'année : KPIs, livrables, ROI réalisé' },
              { id: 'c', text: 'Co-construire le plan de compte pour l\'année suivante' },
              { id: 'd', text: 'Préparer le RDV : données clients, enjeux business, opportunités identifiées' },
            ],
            correct: ['d', 'b', 'a', 'c'],
          },
        ],
      },
    ],
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
