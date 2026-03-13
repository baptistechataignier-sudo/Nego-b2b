export const LEVEL3 = {
  id: 3,
  title: 'Key Account Manager',
  subtitle: 'Stratégie de compte, négociation à enjeux élevés & fidélité',
  color: 'purple',
  icon: '🏆',
  xpReward: 300,
  unlockCondition: 'Terminez le Niveau 2 — Commercial Confirmé',
  modules: [
    // ── MODULE 1 — PLAN DE COMPTE STRATÉGIQUE ────────────────────────────────
    {
      id: 'l3-m1',
      title: 'Plan de Compte Stratégique',
      icon: '🗂️',
      xpReward: 250,
      lessons: [
        {
          id: 'l3-m1-l1',
          title: 'Mapping Décisionnel & Enjeux Business',
          icon: '🔭',
          xpReward: 40,
          theory: {
            title: 'Comprendre le client mieux qu\'il ne se comprend lui-même',
            content: [
              {
                heading: 'L\'Account Plan — votre document vivant',
                body: "Le plan de compte stratégique n'est pas un PowerPoint qu'on met à jour une fois par an. C'est un document vivant qui synthétise :\n\n• L'organisation décisionnelle du client (organigramme, pouvoir réel vs formel)\n• Les enjeux business du client (croissance, transformation, contraintes)\n• La position actuelle de votre offre dans ce compte\n• Votre stratégie de développement sur 12-24 mois\n• Les opportunités identifiées et les risques à surveiller\n\nSa valeur : il vous permet d'anticiper, pas de réagir.",
                example: "Un bon Account Plan répond à ces 5 questions :\n1. Qui décide vraiment dans ce compte ?\n2. Quels sont les 3 enjeux stratégiques du client pour l'année ?\n3. Quelle est notre part de portefeuille dans ce compte (share of wallet) ?\n4. Quelles sont les opportunités d'upsell et de cross-sell ?\n5. Quels sont nos risques (concurrents actifs, insatisfactions, départs internes) ?",
              },
              {
                heading: 'Le mapping décisionnel avancé',
                body: "Au-delà des 4 rôles classiques (Décideur, Acheteur, Utilisateur, Prescripteur), le KAM cartographie :\n\n• Les alliés vs. les opposants : qui vous soutient, qui préférerait un concurrent\n• Le « coach » : votre contact le plus informé sur les dynamiques internes\n• Les influenceurs informels : ceux qui n'ont pas de titre mais ont de l'influence\n• Les décideurs cachés : ceux dont le nom n'apparaît jamais dans les réunions mais qui comptent\n\nOutil : la matrice Pouvoir/Faveur (axe X : pouvoir décisionnel, axe Y : favorable à votre solution).",
                example: "Matrice Pouvoir/Faveur :\n• Fort pouvoir + Très favorable → Votre champion, investissez dans la relation\n• Fort pouvoir + Neutre → À convaincre en priorité, adaptez votre message à ses enjeux\n• Fort pouvoir + Défavorable → Risque critique, neutralisez ou contournez\n• Faible pouvoir + Très favorable → Utilisez-les pour accéder aux personnes à fort pouvoir\n• Faible pouvoir + Défavorable → Ignorez (ne perdez pas d'énergie)",
              },
              {
                heading: 'Comprendre les enjeux business — penser client avant penser produit',
                body: "Un KAM expert connaît les enjeux business de son client mieux que certains de ses interlocuteurs internes. Pour chaque compte stratégique, vous devez savoir :\n\n• Quelle est la stratégie du client pour les 2-3 prochaines années ?\n• Quels sont ses 3 défis opérationnels principaux ?\n• Comment mesure-t-il son succès (KPIs, objectifs) ?\n• Où souffre-t-il le plus ?\n• Où votre solution crée-t-elle le plus de valeur dans ce contexte ?",
                example: "Sources pour comprendre les enjeux business :\n• Rapport annuel / lettre aux actionnaires (sociétés cotées)\n• Communiqués de presse et actualité du secteur\n• Conversations directes avec vos contacts (« Quels sont vos grands chantiers cette année ? »)\n• LinkedIn : suivre les posts du DG et des dirigeants\n• Analyse des appels d'offres récents (révèlent les priorités)",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-1',
              type: 'qcm',
              question: "Dans la matrice Pouvoir/Faveur, un interlocuteur à fort pouvoir décisionnel mais défavorable à votre solution est :",
              options: [
                "À ignorer — il n'est pas votre client",
                "Votre priorité absolue — vous devez le convaincre ou neutraliser son influence",
                "Un allié potentiel si vous changez votre offre",
                "À adresser via l'acheteur qui a plus de pouvoir sur lui",
              ],
              correct: 1,
              explanation: "Un décideur fort et défavorable est le risque le plus élevé dans votre compte. Il peut bloquer une signature, recommander un concurrent ou influencer négativement d'autres décideurs. Vous devez comprendre la source de sa réticence et soit la traiter (bonne raison), soit trouver un chemin qui contourne son veto (avec d'autres alliés forts).",
              xp: 10,
            },
            {
              id: 'ex-l3-2',
              type: 'qcm',
              question: "Votre client annonce une fusion-acquisition. Quelle est votre première action en tant que KAM ?",
              options: [
                "Attendre que la poussière retombe et reprendre contact dans 6 mois",
                "Contacter immédiatement votre sponsor pour comprendre l'impact sur votre contrat et les nouvelles personnes décisionnelles",
                "Envoyer un email de félicitations et proposer une réunion",
                "Mettre à jour votre CRM avec la nouvelle raison sociale",
              ],
              correct: 1,
              explanation: "Une fusion-acquisition est un événement critique pour un compte KAM. Vos contacts peuvent changer de rôle ou partir, les contrats peuvent être renégociés, et la nouvelle entité peut avoir d'autres fournisseurs privilégiés. Contacter immédiatement votre sponsor pour comprendre les dynamiques est vital pour sécuriser votre position.",
              xp: 10,
            },
            {
              id: 'ex-l3-3',
              type: 'reorder',
              question: "Remettez dans l'ordre les étapes de construction d'un Account Plan :",
              items: [
                "Définir les actions prioritaires et le plan d'attaque sur 12 mois",
                "Analyser les enjeux business et stratégiques du client",
                "Cartographier l'organisation décisionnelle et les dynamiques internes",
                "Identifier les opportunités de développement (upsell, cross-sell, nouveaux périmètres)",
                "Évaluer les risques (concurrents actifs, insatisfactions, personnes clés qui pourraient partir)",
              ],
              correct: [2, 1, 3, 4, 0],
              explanation: "Ordre : Organisation (C) → Enjeux business (B) → Opportunités (D) → Risques (E) → Plan d'actions (A). Vous ne pouvez pas définir votre plan d'attaque sans d'abord comprendre qui décide, ce qui compte pour eux, et ce qui pourrait mal tourner.",
              xp: 20,
            },
            {
              id: 'ex-l3-4',
              type: 'vrai_faux',
              question: "Le plan de compte stratégique est un document confidentiel interne — il ne faut jamais en partager des éléments avec le client.",
              options: ['Vrai', 'Faux'],
              correct: 1,
              explanation: "FAUX. Partager sélectivement des éléments de votre plan avec votre sponsor (les opportunités, votre ambition pour le compte, votre compréhension de leurs enjeux) renforce la relation et démontre votre investissement dans le partenariat. Cela positionne votre relation comme stratégique plutôt que transactionnelle. En revanche, les informations sensibles (concurrents, marges) restent confidentielles.",
              xp: 10,
            },
          ],
        },
        {
          id: 'l3-m1-l2',
          title: 'Construire son Plan d\'Actions Annuel',
          icon: '📆',
          xpReward: 40,
          theory: {
            title: 'Transformer la stratégie en actions concrètes',
            content: [
              {
                heading: 'Du plan à l\'action — la feuille de route trimestrielle',
                body: "Un plan de compte sans jalons précis reste une liste de souhaits. La clé : décomposer la stratégie annuelle en objectifs trimestriels, eux-mêmes en actions mensuelles.\n\nStructure recommandée :\n• Objectif annuel (ex : développer le compte de 40%, sécuriser le renouvellement, pénétrer la BU Marketing)\n• Jalons trimestriels (Q1 : cartographier la BU Marketing, Q2 : premier projet pilote, Q3 : proposition complète, Q4 : signature)\n• Actions mensuelles concrètes (liste de tâches assignées avec responsable et deadline)",
                example: "Objectif : Upsell de la solution cybersécurité sur le compte Meridian (actuellement uniquement en périphériques IT).\n\nQ1 : Identifier le RSSI (Responsable Sécurité) et obtenir un rendez-vous via notre contact DSI\nQ2 : Évaluation des besoins sécurité + benchmark vs solution actuelle\nQ3 : Démo + proposition\nQ4 : Signature + déploiement phase 1",
              },
              {
                heading: 'La règle du « 3 actions à fort impact »',
                body: "Dans chaque compte, à chaque trimestre, concentrez-vous sur 3 actions à fort impact plutôt que 15 actions dispersées. Critères d'une action à fort impact :\n\n• Elle avance directement vers un objectif de revenus (pas juste de la relation)\n• Elle implique un décideur ou un influenceur clé (pas seulement votre contact habituel)\n• Elle est mesurable et a une deadline précise",
                example: "Faible impact : « Inviter notre contact à notre prochain webinar. »\nFort impact : « Organiser une visite de site client référence avec le DSI de Meridian, notre contact DSI et notre équipe technique — objectif : déclencher la phase d'évaluation technique. »",
              },
              {
                heading: 'Revue du plan — ajuster en temps réel',
                body: "Un plan annuel figé est inutile dans un environnement B2B qui bouge. La discipline du KAM : revoir son plan de compte à chaque changement significatif :\n• Changement de poste d'un décideur clé\n• Nouveau projet stratégique annoncé par le client\n• Entrée d'un concurrent sur le compte\n• Insatisfaction remontée\n\nMettez à jour votre plan trimestriellement, revisitez-le après chaque interaction importante.",
                example: "Conseil pratique : après chaque réunion importante avec un compte stratégique, prenez 10 minutes pour mettre à jour votre plan : Qu'avez-vous appris de nouveau ? Qui doit être ajouté à la cartographie ? Quelle action faut-il déclencher d'urgence ?",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-5',
              type: 'qcm',
              question: "Vous êtes KAM sur 8 comptes stratégiques. Vous avez 20h/semaine de temps commercial net. Comment priorisez-vous ?",
              options: [
                "Equitablement : 2h30 par compte",
                "En fonction du potentiel de revenus et de la phase de la relation : plus de temps aux comptes à fort potentiel immédiat et aux comptes à risque",
                "En fonction de la sympathie avec vos contacts — les relations les plus fortes en priorité",
                "En fonction du chiffre d'affaires historique — les plus gros clients en priorité",
              ],
              correct: 1,
              explanation: "La répartition optimale est dynamique et stratégique. Un compte à fort potentiel immédiat (opportunité en cours) mérite plus d'attention qu'un compte stable. Un compte à risque (insatisfaction, renouvellement proche) mérite une attention urgente même si le revenu historique est modeste. La sympathie et le CA historique seuls sont de mauvais critères de priorisation.",
              xp: 10,
            },
            {
              id: 'ex-l3-6',
              type: 'vrai_faux',
              question: "Un plan de compte doit être révisé une fois par an, lors de la session de planification annuelle de l'entreprise.",
              options: ['Vrai', 'Faux'],
              correct: 1,
              explanation: "FAUX. Le plan de compte se révise en continu. Les événements qui nécessitent une mise à jour immédiate : changement de poste d'un décideur, nouveau projet client annoncé, arrivée d'un concurrent, insatisfaction détectée, changement de budget. Attendre la planification annuelle signifie réagir avec 6 à 12 mois de retard.",
              xp: 10,
            },
            {
              id: 'ex-l3-7',
              type: 'dialogue',
              situation: "Votre sponsor interne chez Meridian vous appelle : « Notre DG vient d'annoncer qu'on transforme toute notre infrastructure IT dans les 18 mois. C'est un chantier énorme. »",
              yourRole: 'KAM',
              buyerRole: 'Sponsor Interne',
              question: "Quelle est votre réaction stratégique immédiate ?",
              options: [
                "Envoyer immédiatement une proposition commerciale étendue. ✗ (trop tôt)",
                "Demander à être inclus dans le projet dès la phase de cadrage : « Est-ce que votre équipe serait ouverte à qu'on participe à la réflexion amont pour vous partager notre retour d'expérience sur des projets similaires ? » ✓",
                "Attendre que le projet soit formalisé avant d'agir pour ne pas paraître opportuniste. ✗ (trop passif)",
                "Proposer un audit gratuit de leur infrastructure. ✗ (concession non demandée)",
              ],
              correct: 1,
              explanation: "La réponse B est stratégique : vous cherchez à entrer dans la phase de cadrage, avant que le brief soit rédigé. C'est là que vous pouvez influencer le besoin exprimé, identifier les décideurs du projet, et vous positionner comme partenaire de réflexion plutôt que simple fournisseur répondant à un cahier des charges.",
              xp: 15,
            },
          ],
        },
      ],
    },

    // ── MODULE 2 — NÉGOCIATION À ENJEUX ÉLEVÉS ───────────────────────────────
    {
      id: 'l3-m2',
      title: 'Négociation à Enjeux Élevés',
      icon: '🎲',
      xpReward: 250,
      lessons: [
        {
          id: 'l3-m2-l1',
          title: 'Préparation & Scénarios',
          icon: '♟️',
          xpReward: 40,
          theory: {
            title: 'Préparer 3 fois plus que ce que vous utiliserez',
            content: [
              {
                heading: 'La préparation en négociation à enjeux élevés',
                body: "Dans une négociation standard (< 50 K€), une préparation de 30 minutes peut suffire. Dans une négociation à enjeux élevés (contrat annuel, renouvellement stratégique, accord-cadre pluriannuel), la préparation représente souvent 60-70% du travail.\n\nÉléments de préparation indispensables :\n• Votre objectif idéal (ce que vous voulez vraiment)\n• Votre point de rupture (walk-away point) — au-delà duquel vous ne signez pas\n• Votre BATNA renforcé\n• Les scénarios adverses et vos réponses\n• La liste de toutes vos contreparties disponibles\n• La liste des contreparties que vous pouvez demander",
                example: "Check-list pré-négociation stratégique :\n☐ Quel est mon objectif idéal (prix, conditions, périmètre) ?\n☐ Quel est mon walk-away point absolument non négociable ?\n☐ Quel est le BATNA de mon client ? (alternatives dont il dispose)\n☐ Quelles concessions puis-je faire ? Dans quel ordre ?\n☐ Quelles contreparties vais-je demander en échange ?\n☐ Quels arguments l'acheteur utilisera probablement ?\n☐ Quelles preuves et données vais-je apporter ?",
              },
              {
                heading: 'La préparation par scénarios',
                body: "Pour une négociation importante, préparez 3 scénarios :\n\n• Scénario optimiste : tout se passe bien, l'acheteur est coopératif → comment maximisez-vous l'accord ?\n• Scénario réaliste : négociation normale avec pression prix modérée → votre stratégie de référence\n• Scénario difficile : acheteur très agressif, concurrence forte, deadline contraignante → votre plancher de résistance\n\nPour chaque scénario, préparez vos réponses aux 5 objections les plus probables.",
                example: "Scénario difficile — Renouvellement contrat 200 K€ :\nObjection probable 1 : « -15% ou on met en concurrence »\nVotre réponse préparée : « Nous avons 3 ans de relation. Commençons par évaluer ensemble ce que ce contrat a apporté comme valeur — ensuite discutons des conditions qui nous permettent de continuer à vous apporter ce niveau de service. »\n\nObjection probable 2 : « Notre budget a été coupé de 20% »\nVotre réponse préparée : « Je comprends. Quelle est la partie de notre service qui vous apporte le plus de valeur ? Construisons ensemble une solution qui reste dans vos contraintes budgétaires sans sacrifier l'essentiel. »",
              },
              {
                heading: 'Le point de rupture — savoir quand dire non',
                body: "Le walk-away point est la ligne rouge au-delà de laquelle il vaut mieux ne pas signer. Il est défini AVANT la négociation, pas pendant (sous pression, les jugements sont biaisés).\n\nDéfinir votre walk-away point :\n• Quel prix minimum préserve votre marge et votre qualité de service ?\n• Quelles conditions contractuelles sont absolument non-négociables (SLA, pénalités, exclusivité) ?\n• À quel moment la relation client coûte-t-elle plus qu'elle ne rapporte ?\n\nCourage managérial : parfois, ne pas signer est la bonne décision business.",
                example: "Exemple de walk-away point clair :\n« Si l'acheteur exige une remise > 18% sans contrepartie (engagement long terme, volume garanti, paiement anticipé), je decline poliment et cherche un accord sur un périmètre réduit — ou je ne signe pas. »\n\nFormule pour communiquer le walk-away :\n« Je veux vraiment qu'on arrive à un accord. Mais à [condition X], je ne peux pas vous garantir le niveau de service pour lequel vous nous choisissez. Ce serait vous rendre un mauvais service. »",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-8',
              type: 'qcm',
              question: "Pendant une négociation difficile, l'acheteur fait une proposition très avantageuse pour lui mais qui frôle votre walk-away. Quelle est la bonne pratique ?",
              options: [
                "Accepter pour ne pas perdre l'affaire — on gagnera de la marge plus tard",
                "Demander une pause pour évaluer la proposition à tête reposée, loin de la pression du moment",
                "Contrer immédiatement avec votre position ferme",
                "Demander un délai de réflexion de 48h avant de répondre",
              ],
              correct: 1,
              explanation: "Demander une pause (même 10 minutes) permet de sortir de la pression émotionnelle du moment et d'évaluer la proposition par rapport à votre walk-away défini en amont. Accepter à chaud frôle souvent un accord que vous regretterez — les concessions sous pression ne sont pas les meilleures.",
              xp: 10,
            },
            {
              id: 'ex-l3-9',
              type: 'dialogue',
              situation: "Renouvellement d'un contrat stratégique à 180 000 €. L'acheteur : « Notre direction a décidé qu'on devait réduire tous les postes de dépenses de 25%. »",
              yourRole: 'KAM Senior',
              buyerRole: 'Directeur Achats',
              question: "Comment répondez-vous à cette demande de -25% ?",
              options: [
                "« 25%, c'est absolument impossible. » ✗ (bloque la conversation)",
                "« Je comprends la pression que vous avez. Avant de travailler sur les chiffres, pouvez-vous m'aider à comprendre : est-ce que l'enjeu c'est le montant total ou la valeur perçue par rapport au budget ? » ✓",
                "« Je peux aller jusqu'à -10% maximum. » ✗ (concession sans comprendre l'enjeu)",
                "« -25% n'est pas possible mais je peux proposer un paiement étalé. » ✗ (solution sans avoir compris le problème)",
              ],
              correct: 1,
              explanation: "La réponse B est stratégique : elle valide la contrainte (sans la nier), et creuse la nature exacte du problème AVANT de proposer une solution. Parfois « 25% de réduction » signifie en réalité « montrer à ma direction qu'on a fait un effort » — et une restructuration de l'offre (sans baisser le prix) peut suffire.",
              xp: 15,
            },
            {
              id: 'ex-l3-10',
              type: 'vrai_faux',
              question: "Révéler votre walk-away point à l'acheteur au cours d'une négociation peut aider à débloquer la situation en montrant votre transparence.",
              options: ['Vrai', 'Faux'],
              correct: 1,
              explanation: "FAUX. Révéler votre walk-away point donne à l'acheteur le contrôle exact de la négociation — il peut vous pousser jusqu'à votre limite en sachant exactement où elle est. La transparence totale en négociation n'est pas une vertu. En revanche, signaler que vous approchez d'une limite (sans la préciser) peut créer une pression utile : « Je ne vois pas comment nous pourrions aller plus loin sans remettre en cause la qualité de notre service. »",
              xp: 10,
            },
          ],
        },
      ],
    },

    // ── MODULE 3 — UPSELL & CROSS-SELL ──────────────────────────────────────
    {
      id: 'l3-m3',
      title: 'Upsell & Cross-sell',
      icon: '📈',
      xpReward: 250,
      lessons: [
        {
          id: 'l3-m3-l1',
          title: 'Identifier les Opportunités',
          icon: '🔎',
          xpReward: 40,
          theory: {
            title: 'Vendre plus à ceux qui vous font déjà confiance',
            content: [
              {
                heading: 'Upsell vs Cross-sell — comprendre la distinction',
                body: "• Upsell : vendre une version supérieure ou étendue de ce que le client a déjà. (Ex : passer de licences standard à licences premium, augmenter le nombre de postes)\n• Cross-sell : vendre un produit ou service complémentaire d'une autre catégorie. (Ex : client équipé en périphériques → lui vendre une solution de visioconférence ou de cybersécurité)\n\nLes deux sont beaucoup plus faciles qu'une vente à un nouveau client : la confiance est établie, le risque perçu est réduit, le cycle de vente est plus court (- 60% en moyenne).",
                example: "Exemple concret :\nUpsell : Client avec 50 licences standard → passer à 80 licences premium (ROI justifié par les nouvelles fonctionnalités)\nCross-sell : Client équipé en casques Logitech → proposer les webcams et les solutions de salle de réunion (Poly Studio) comme extension naturelle",
              },
              {
                heading: 'Les signaux d\'opportunité — savoir lire les signes',
                body: "Les opportunités d'upsell et de cross-sell se signalent si vous savez les voir :\n\n• Le client se plaint d'un problème dans un domaine où vous avez une solution\n• Le client mentionne un projet ou une initiative sur lequel votre offre peut contribuer\n• Un nouveau département ou une nouvelle BU n'utilise pas encore votre solution\n• Le client recrute dans un domaine qui annonce un besoin futur\n• Le contrat actuel arrive à renouvellement — moment idéal pour proposer une extension\n• Une insatisfaction résolue — le client est soulagé et réceptif",
                example: "Signal concret :\nLors d'une Business Review, votre contact dit : « On ouvre 3 nouveaux sites en province l'année prochaine. »\n→ Signal d'expansion = besoin d'équipement IT pour les nouveaux sites\n→ Opportunité de cross-sell : solution de visioconférence pour les nouveaux espaces de travail\n\nVotre réaction : « Intéressant. Ces nouveaux sites auront des besoins en équipement similaires à votre siège ? On pourrait anticiper ensemble et vous faire bénéficier d'un accord global. »",
              },
              {
                heading: 'Le bon timing — ne pas vendre trop tôt',
                body: "L'erreur classique du cross-sell : proposer trop tôt, avant que la valeur de la solution existante soit démontrée. Un client insatisfait de votre solution principale ne sera pas réceptif à une nouvelle proposition.\n\nMoments optimaux pour un upsell/cross-sell :\n• Après une Business Review positive (client satisfait, résultats validés)\n• Après la résolution réussie d'un problème (moment de gratitude)\n• Au moment d'un événement client (ouverture de site, croissance, projet)\n• Lors du renouvellement (moment naturel de bilan et d'ambition)\n\nMoments à éviter :\n• Pendant un incident ou une crise\n• Trop tôt dans la relation (< 3 mois de déploiement)\n• Quand le client est focalisé sur autre chose (fin de trimestre, audit)",
                example: "La règle des 3V : une opportunité d'upsell se déclenche quand :\n• Valeur prouvée : le client est satisfait de la solution existante\n• Valeur visible : vous avez identifié un besoin réel dans sa nouvelle demande\n• Valeur vécue : le timing correspond à son calendrier et ses priorités",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-11',
              type: 'qcm',
              question: "Lors d'une réunion de suivi, votre client dit : « Nos équipes marketing viennent de passer en full remote et ont du mal à collaborer à distance. » C'est :",
              options: [
                "Un problème RH qui ne vous concerne pas",
                "Un signal de cross-sell : leur besoin en outils de collaboration à distance est une opportunité pour votre offre de visioconférence",
                "Un signal d'upsell : ils ont besoin de plus de licences de votre solution existante",
                "Une information à noter dans le CRM sans action immédiate",
              ],
              correct: 1,
              explanation: "C'est un signal de cross-sell clair. La BU Marketing (non équipée par vous) a un besoin émergent en outils de collaboration qui correspond précisément à votre offre. Votre réaction : « Intéressant. Combien de personnes sont concernées dans l'équipe marketing ? On a une solution qui répond exactement à cette problématique — est-ce que votre DSI est en contact avec le responsable marketing sur ce sujet ? »",
              xp: 10,
            },
            {
              id: 'ex-l3-12',
              type: 'dialogue',
              situation: "Business Review positive. Le client est satisfait. Votre solution IT périphériques fonctionne bien. Vous avez identifié une opportunité de cross-sell sur la cybersécurité.",
              yourRole: 'KAM',
              buyerRole: 'DSI',
              question: "Comment introduisez-vous le sujet cross-sell sans paraître opportuniste ?",
              options: [
                "« Tant que je vous ai, j'ai une proposition commerciale pour votre sécurité IT. » ✗ (maladroit)",
                "« Vous m'avez mentionné en début d'année des préoccupations sur les cybermenaces. On a lancé une nouvelle offre qui répond directement à ça — ça vous intéresserait qu'on en parle lors d'un prochain échange spécifique ? » ✓",
                "« On fait aussi de la cybersécurité si ça vous intéresse. » ✗ (trop passif)",
                "Envoyer une plaquette commerciale cybersécurité par mail après la réunion. ✗ (pas de personnalisation)",
              ],
              correct: 1,
              explanation: "La réponse B est correcte : elle ancre dans un besoin exprimé par le client (pas dans votre catalogue), propose un temps dédié (pas de survente en fin de réunion), et laisse la main au client. C'est de la vente consultative, pas du push commercial.",
              xp: 15,
            },
            {
              id: 'ex-l3-13',
              type: 'vrai_faux',
              question: "Plus un client est satisfait, plus il est facile de lui vendre quelque chose de nouveau — il n'y a donc pas de mauvais moment pour faire un cross-sell sur un client content.",
              options: ['Vrai', 'Faux'],
              correct: 1,
              explanation: "FAUX. Un client satisfait est plus réceptif en général, mais le timing reste critique. Un client satisfait mais en pleine période de clôture comptable, d'audit ou de crise opérationnelle ne sera pas disponible mentalement pour une nouvelle proposition. Le timing doit tenir compte à la fois de la satisfaction ET du calendrier et du contexte du client.",
              xp: 10,
            },
          ],
        },
      ],
    },

    // ── MODULE 4 — BUSINESS REVIEW ───────────────────────────────────────────
    {
      id: 'l3-m4',
      title: 'Business Review',
      icon: '📊',
      xpReward: 250,
      lessons: [
        {
          id: 'l3-m4-l1',
          title: 'Structure, KPIs & Renouvellement',
          icon: '🖥️',
          xpReward: 40,
          theory: {
            title: 'La Business Review — votre moment de vérité',
            content: [
              {
                heading: 'Pourquoi la Business Review est stratégique',
                body: "La Business Review (BR) est la réunion périodique (trimestrielle ou annuelle) entre le KAM et son client pour faire le bilan de la relation et préparer les prochaines étapes. C'est un exercice puissant parce qu'il :\n\n• Crée un moment de dialogue stratégique (pas opérationnel)\n• Démontre votre investissement dans le succès du client\n• Permet d'identifier tôt les insatisfactions avant qu'elles deviennent des crises\n• Prépare naturellement le terrain pour le renouvellement ou l'expansion\n• Vous différencie des fournisseurs transactionnels",
                example: "Différence entre un bon et un mauvais fournisseur :\nMauvais : envoie une facture et attend le renouvellement\nMoyen : propose une BR pour « faire le bilan »\nBon : prépare une BR structurée qui montre la valeur créée en données, adresse les points de friction, et propose une vision pour les 12 prochains mois",
              },
              {
                heading: 'Structure d\'une Business Review efficace',
                body: "Une BR dure généralement 60 à 90 minutes et suit cette structure :\n\n1. Récapitulatif de la période (10%) : ce qui a été déployé/livré\n2. KPIs et valeur démontrée (30%) : métriques qui prouvent l'impact de votre solution\n3. Points de friction et plan d'amélioration (20%) : traitez les insatisfactions, ne les évitez pas\n4. Actualités et enjeux du client (20%) : écoute active, compréhension des priorités à venir\n5. Proposition pour la prochaine période (20%) : renouvellement, extension, nouvelles initiatives",
                example: "KPIs à présenter selon le contexte :\n• Taux d'adoption de la solution (% d'utilisateurs actifs)\n• Temps de résolution des incidents (vs. SLA contractuel)\n• Économies générées (productivité, coûts évités)\n• Satisfaction utilisateurs (si vous l'avez mesurée)\n• Comparaison avant/après déploiement sur les métriques clés",
              },
              {
                heading: 'Traiter les insatisfactions — ne jamais esquiver',
                body: "L'erreur la plus fréquente en BR : passer rapidement sur les points négatifs pour montrer une image positive. C'est contre-productif — le client a l'impression que vous n'êtes pas honnête.\n\nL'approche correcte :\n1. Nommez le problème avant que le client le soulève\n2. Assumez (si c'est de votre faute)\n3. Présentez le plan d'action concret avec dates\n4. Proposez une compensation si pertinent\n\nUn fournisseur qui gère les problèmes de façon proactive et honnête renforce la confiance plutôt que de la dégrader.",
                example: "Script pour une insatisfaction connue :\n« Je veux aborder directement les incidents de support que vous avez eu en septembre. Voici ce qui s'est passé, ce qu'on a fait pour corriger, et ce qu'on a mis en place pour que ça ne se reproduise pas. Est-ce que vous avez d'autres retours de vos équipes sur ce sujet ? »\n→ Vous prenez l'initiative = vous êtes en contrôle.",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-14',
              type: 'qcm',
              question: "Au cours d'une Business Review, votre client mentionne une insatisfaction sur les délais de support (SLA non respecté 3 fois ce trimestre). Quelle est la bonne réaction ?",
              options: [
                "Expliquer que c'était une période exceptionnelle et que ça ne se reproduira plus",
                "Reconnaître le problème, présenter les causes et le plan d'amélioration concret, et proposer un crédit de service en compensation",
                "Promettre que vous allez en parler à votre équipe support",
                "Relativiser : « 3 fois sur 150 tickets, c'est un taux de 2% — en dessous de la moyenne du marché »",
              ],
              correct: 1,
              explanation: "La réponse B est la bonne pratique : reconnaissance (pas d'excuse dilatoire), explication factuelle des causes, plan d'amélioration mesurable, et compensation tangible. Relativiser (D) aggrave la situation. Promettre vaguement (C) ne crée pas de confiance. Attribuer à l'exceptionnalité (A) est perçu comme une fuite.",
              xp: 10,
            },
            {
              id: 'ex-l3-15',
              type: 'reorder',
              question: "Remettez dans l'ordre la structure d'une Business Review efficace :",
              items: [
                "Proposition pour les 12 prochains mois (renouvellement, extension)",
                "Récapitulatif de la période écoulée (livraisons, déploiements)",
                "Écoute active des enjeux et priorités du client pour la prochaine période",
                "KPIs et démonstration de la valeur créée",
                "Traitement transparent des insatisfactions et plan d'amélioration",
              ],
              correct: [1, 3, 4, 2, 0],
              explanation: "Ordre optimal : Bilan (B) → Valeur prouvée (D) → Insatisfactions/amélioration (E) → Enjeux client (C) → Proposition (A). Vous créez un flux logique : ce qu'on a fait → ce que ça a apporté → ce qu'on améliore → ce dont vous avez besoin → notre proposition.",
              xp: 20,
            },
            {
              id: 'ex-l3-16',
              type: 'vrai_faux',
              question: "La Business Review est le bon moment pour présenter de nouvelles offres commerciales — le client est dans un état d'esprit d'échange et de planification.",
              options: ['Vrai', 'Faux'],
              correct: 0,
              explanation: "VRAI — sous conditions. La Business Review est effectivement un moment propice pour des propositions d'extension SI : 1) la valeur de la solution existante a été démontrée, 2) les insatisfactions ont été traitées, 3) vous avez écouté les enjeux du client avant de proposer. Une BR mal gérée où on force une proposition commerciale sans avoir d'abord écouté est contre-productive.",
              xp: 10,
            },
            {
              id: 'ex-l3-17',
              type: 'dialogue',
              situation: "Business Review. Vous avez présenté un bilan positif. Le client dit : « Globalement ça se passe bien, mais honnêtement, on regardera d'autres offres pour le renouvellement. »",
              yourRole: 'KAM',
              buyerRole: 'DSI',
              question: "Comment répondez-vous à cette annonce de mise en concurrence ?",
              options: [
                "« Je comprends. On fera une proposition compétitive. » ✗ (trop passif, vous subissez)",
                "« Vous avez tout à fait raison de comparer. Ce qui m'intéresse, c'est de comprendre ce que vous chercheriez dans un fournisseur idéal que vous ne trouvez pas encore chez nous. » ✓",
                "Proposer immédiatement une remise de fidélité pour éviter la mise en concurrence. ✗ (concession prématurée)",
                "« Je pensais que la relation se passait bien — qu'est-ce qui vous a déçu ? » ✗ (défensif, émotionnel)",
              ],
              correct: 1,
              explanation: "La réponse B est mature et stratégique. Elle valide la démarche du client (ce qui réduit son attitude défensive), puis transforme la menace en information — qu'est-ce qui lui manque ? Cette information vous permet soit d'améliorer votre offre, soit d'identifier un problème non exprimé que vous pouvez traiter avant qu'il aille ailleurs.",
              xp: 15,
            },
          ],
        },
      ],
    },

    // ── MODULE 5 — RELATION LONG TERME ───────────────────────────────────────
    {
      id: 'l3-m5',
      title: 'Relation Long Terme & Fidélité',
      icon: '🔐',
      xpReward: 250,
      lessons: [
        {
          id: 'l3-m5-l1',
          title: 'Anticiper les Insatisfactions',
          icon: '🌡️',
          xpReward: 40,
          theory: {
            title: 'Soigner la relation avant que ça brûle',
            content: [
              {
                heading: 'Les signaux faibles d\'une relation qui se dégrade',
                body: "Un client ne part jamais du jour au lendemain. Les signaux de dégradation se manifestent bien avant la perte du compte — si vous savez les lire.\n\nSignaux faibles à surveiller :\n• Réduction de la fréquence des échanges (moins de réunions, réponses plus lentes)\n• Changement de ton dans les emails (plus formel, plus froid)\n• Refus de réunions stratégiques (acceptent les opérationnels, pas les stratégiques)\n• Multiplication des demandes de reporting détaillé (ils cherchent des preuves)\n• Tickets de support plus nombreux ou plus acerbes\n• Contact inhabituel de la direction (le DG qui vous appelle sur un incident = signal fort)\n• Rumeurs d'évaluation de solutions alternatives",
                example: "Cas réel : un client qui demande soudainement un export complet de toutes ses données de votre plateforme est en train de préparer une migration. Si vous attendez qu'il vous l'annonce, vous avez déjà perdu. Si vous le détectez 3 mois avant et prenez des initiatives de réactivation, vous avez une chance.",
              },
              {
                heading: 'La check-list de santé du compte (Account Health)',
                body: "Évaluez régulièrement (trimestriellement) chaque compte sur ces dimensions :\n\n• Adoption : est-ce que la solution est vraiment utilisée ? Taux d'activation ?\n• Satisfaction : NPS ou retours qualitatifs ?\n• Engagement relationnel : fréquence et qualité des échanges avec les décideurs ?\n• Risques identifiés : changements de contact, problèmes ouverts non résolus ?\n• Part de portefeuille : notre offre représente quelle part de leurs achats dans notre catégorie ?\n• Concurrents actifs : quelqu'un d'autre parle-t-il à notre client ?",
                example: "Score d'Account Health simplifié :\n🟢 Vert (0 signaux) → relation saine, focus sur le développement\n🟡 Jaune (1-2 signaux) → attention requise, planifier une réunion de suivi dans 2 semaines\n🔴 Rouge (3+ signaux) → risque immédiat, plan d'action d'urgence avec votre management",
              },
              {
                heading: 'Réactivation d\'un compte qui se refroidit — le protocole',
                body: "Quand vous détectez des signaux de refroidissement, agissez vite et de façon structurée :\n\n1. Demander une réunion directe : « Je voudrais vous rencontrer — j'ai le sentiment qu'il y a des sujets qu'on n'a pas adressés et je veux qu'on en parle franchement. »\n2. Écouter sans défendre : laissez le client exprimer sa frustration sans l'interrompre ni vous justifier immédiatement\n3. Reconnaître et s'engager : assumez ce qui doit l'être, proposez un plan d'action concret\n4. Escalader en interne si nécessaire : parfois un appel de votre directeur général à leur DG change la dynamique\n5. Proposer un geste : non pas une remise financière, mais un service supplémentaire, une ressource dédiée, une priorité dans votre roadmap",
                example: "Erreur à éviter : ne pas réagir aux signaux faibles en espérant que « ça va se régler tout seul ». Dans 90% des cas, une relation qui se refroidit sans intervention se termine par une perte de compte.",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-18',
              type: 'qcm',
              question: "Votre contact habituel chez un client stratégique n'a pas répondu à vos 3 derniers emails en 3 semaines. C'est probablement :",
              options: [
                "Il est occupé — c'est normal en fin de trimestre",
                "Un signal faible à investiguer immédiatement via un autre canal (téléphone, contact alternatif)",
                "Un signe qu'il ne veut plus travailler avec vous",
                "Un problème IT — vos emails n'arrivent probablement pas",
              ],
              correct: 1,
              explanation: "3 semaines sans réponse d'un contact actif est inhabituel et mérite une action immédiate. Sans dramatiser, vous devez investiguer via un autre canal. Attendre espérant que « ça va passer » (A) est la pire réaction. Assumer qu'il ne veut plus travailler avec vous (C) est prématuré mais le risque existe — raison de plus pour agir.",
              xp: 10,
            },
            {
              id: 'ex-l3-19',
              type: 'reorder',
              question: "Vous venez de détecter que votre client évalue un concurrent. Remettez les actions dans le bon ordre :",
              items: [
                "Demander une réunion directe et franche avec le décideur",
                "Identifier l'origine de l'insatisfaction ou de la curiosité pour le concurrent",
                "Proposer un plan d'amélioration ou de différenciation adapté",
                "Évaluer le niveau de risque (sont-ils en phase d'évaluation formelle ou informelle ?)",
                "Si nécessaire, escalader en interne (votre direction ou le fournisseur du client)",
              ],
              correct: [3, 0, 1, 2, 4],
              explanation: "Ordre : Évaluer le risque (D) → Prendre contact direct (A) → Comprendre la source (B) → Proposer une réponse adaptée (C) → Escalader si besoin (E). Escalader immédiatement sans comprendre l'enjeu (E en premier) est contre-productif — vous avez l'air paniqué.",
              xp: 20,
            },
          ],
        },
        {
          id: 'l3-m5-l2',
          title: 'Verrouiller la Fidélité',
          icon: '🔑',
          xpReward: 40,
          theory: {
            title: 'Rendre le départ plus coûteux que le renouvellement',
            content: [
              {
                heading: 'Les 4 niveaux de fidélité client',
                body: "• Niveau 1 — Fidélité contractuelle : le client reste parce qu'il est engagé (contrat, pénalités de résiliation). Fragile — il cherchera à partir à l'échéance.\n• Niveau 2 — Fidélité transactionnelle : le client reste parce que vous êtes compétitif et sans problème. Vulnérable — une offre concurrente agressive peut le faire partir.\n• Niveau 3 — Fidélité fonctionnelle : le client reste parce que votre solution est profondément intégrée dans ses processus. Robuste — migrer est difficile et coûteux.\n• Niveau 4 — Fidélité relationnelle : le client reste parce qu'il a confiance en vous personnellement et dans votre équipe. La plus forte — difficile à éroder même avec un concurrent moins cher.",
                example: "Objectif KAM : faire passer vos comptes des niveaux 1-2 aux niveaux 3-4.\n\nComment créer de la fidélité fonctionnelle :\n• Intégrer votre solution dans leurs processus métier critiques\n• Former leurs équipes à votre outil (investissement en compétences)\n• Devenir leur référentiel de données dans votre domaine\n\nComment créer de la fidélité relationnelle :\n• Construire des relations avec plusieurs niveaux hiérarchiques\n• Être le conseiller de confiance, pas seulement le vendeur\n• Apporter de la valeur même hors du périmètre contractuel",
              },
              {
                heading: 'Augmenter les coûts de changement — éthiquement',
                body: "Rendre le départ plus coûteux (en temps, en risque, en argent) est une stratégie légitime si elle s'appuie sur de la valeur réelle :\n\n• Formation approfondie des équipes sur votre solution (investissement en compétences)\n• Personnalisation et paramétrage spécifique à leurs processus\n• Intégrations techniques avec leurs autres systèmes\n• Co-construction de fonctionnalités spécifiques (roadmap partagée)\n• Mémoire institutionnelle : vous êtes le seul à connaître toute l'histoire et les subtilités de leur compte\n\nAttention : les coûts de changement artificiels (pénalités abusives, blocage des données) sont des pratiques non éthiques qui détruisent la relation.",
                example: "Exemple de coût de changement créé par la valeur :\n« Sur les 3 dernières années, on a configuré votre instance avec 47 règles personnalisées, 12 intégrations SI, et formé 240 utilisateurs. Migrer vers un concurrent signifie reprendre tout ça à zéro — coût estimé à 6-9 mois de travail et 80 000 € d'intégration. »\n→ Ce n'est pas du chantage — c'est la valeur réelle que vous avez créée.",
              },
              {
                heading: 'Le programme de fidélité relationnelle',
                body: "Les actions qui construisent une fidélité relationnelle durable :\n\n• Accès privilégié : invitations à des événements exclusifs, accès bêta à de nouvelles fonctionnalités\n• Visibilité : mettre en avant le client en référence (case study, prise de parole en conférence)\n• Réseau : mettre le client en relation avec d'autres clients pertinents ou des experts de son secteur\n• Investissement personnel : vous connaissez leurs priorités, leur agenda, les événements importants de leur vie professionnelle\n• Consistance : être là aussi quand ça ne rapporte pas immédiatement",
                example: "Geste relationnel à fort impact, faible coût :\nVous lisez un article pertinent pour le DG de votre client → vous le lui transmettez avec 3 lignes personnalisées sur le lien avec ses enjeux.\n→ Coût : 5 minutes. Impact : vous montrez que vous pensez à lui hors des moments commerciaux. C'est de la fidélité relationnelle.",
              },
            ],
          },
          exercises: [
            {
              id: 'ex-l3-20',
              type: 'qcm',
              question: "Parmi ces situations, laquelle représente le plus haut niveau de fidélité client ?",
              options: [
                "Le client a un contrat 3 ans avec pénalités de résiliation",
                "Le client n'a jamais eu de problème avec votre solution — il renouvelle par défaut",
                "Le client appelle votre KAM pour avoir son avis avant de prendre une décision stratégique qui n'est pas directement liée à votre produit",
                "Le client vous achète le produit le moins cher de votre catalogue chaque année",
              ],
              correct: 2,
              explanation: "La réponse C représente la fidélité de niveau 4 — relationnelle. Quand un client vous consulte comme un conseiller de confiance au-delà de votre périmètre produit, vous avez atteint le niveau de partenariat qui résiste aux attaques concurrentielles. Les autres options sont des fidélités de niveau 1 (contrat) ou 2 (transaction).",
              xp: 10,
            },
            {
              id: 'ex-l3-21',
              type: 'vrai_faux',
              question: "Imposer des pénalités de résiliation élevées et complexifier la récupération des données client sont des stratégies légitimes pour verrouiller la fidélité.",
              options: ['Vrai', 'Faux'],
              correct: 1,
              explanation: "FAUX. Ces pratiques (dark patterns contractuels, rétention abusive de données) sont non éthiques, parfois illégales (RGPD, droit de la concurrence), et surtout contre-productives : elles génèrent une fidélité contrainte qui se transforme en hostilité et en réputation négative. Quand le client peut partir, il part ET il vous détruit sur le marché. La vraie fidélité se construit sur la valeur.",
              xp: 10,
            },
            {
              id: 'ex-l3-22',
              type: 'qcm',
              question: "Un concurrent vient de proposer à votre client stratégique une offre -25% et un pilote gratuit de 3 mois. Quelle est votre meilleure réponse ?",
              options: [
                "Matcher l'offre : -25% et 3 mois gratuits",
                "Rappeler la valeur créée sur la durée et les coûts de changement réels (formation, intégrations, historique), proposer un geste fidélité non-financier",
                "Ignorer — votre relation est assez forte pour résister",
                "Proposer de renégocier le contrat pour améliorer les conditions sur les 12 prochains mois",
              ],
              correct: 1,
              explanation: "La réponse B est la stratégie KAM. Vous ne pouvez pas toujours gagner sur le prix — mais vous pouvez faire peser le coût de changement réel (ce que le client perdrait en migrant) et proposer un geste de fidélité non financier (accès prioritaire, ressource dédiée, co-développement). Matcher aveuglément (A) est coûteux et signale que vous surpayiez avant.",
              xp: 15,
            },
          ],
        },
      ],
    },
  ],
}
