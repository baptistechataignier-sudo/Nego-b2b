export const PLACEMENT_TEST = {
  id: 'placement',
  title: 'Test de Niveau Initial',
  description: 'Répondez à ces 10 questions pour que NégoMaster vous place sur le bon parcours.',
  questions: [
    {
      id: 'p1',
      type: 'qcm',
      question: "Qu'est-ce que le BATNA dans une négociation ?",
      options: [
        'Best Alternative To a Negotiated Agreement — votre plan B si la négociation échoue',
        'Une technique pour bloquer l\'acheteur sur le prix',
        'La meilleure offre que vous pouvez proposer',
        'Le budget maximum de l\'acheteur',
      ],
      correct: 0,
      explanation: 'Le BATNA (Meilleure Alternative en cas de Non-Accord) est la clé de votre pouvoir de négociation. Plus votre BATNA est fort, moins vous êtes sous pression.',
      level: 1,
    },
    {
      id: 'p2',
      type: 'qcm',
      question: "Un acheteur dit : « Votre prix est trop élevé. » Quelle est la meilleure réaction immédiate ?",
      options: [
        'Proposer immédiatement une remise de 5%',
        'Demander : « Par rapport à quoi ? » pour comprendre le référentiel',
        'Défendre votre prix avec des arguments techniques',
        'Dire que vous allez voir avec votre direction',
      ],
      correct: 1,
      explanation: "Avant de réagir, il faut comprendre. L'acheteur compare-t-il avec un concurrent ? Son budget ? Une ancre mentale ? La question « Par rapport à quoi ? » vous donne de l'information sans concession.",
      level: 1,
    },
    {
      id: 'p3',
      type: 'qcm',
      question: "Dans la méthode SPIN Selling, que signifie le « N » ?",
      options: [
        'Negative — les objections du client',
        'Need-Payoff — questions sur les bénéfices de la solution',
        'Negotiation — la phase de négociation du prix',
        'Network — le réseau décisionnel',
      ],
      correct: 1,
      explanation: 'SPIN = Situation, Problème, Implication, Need-Payoff. Les questions Need-Payoff amènent le client à exprimer lui-même les bénéfices de votre solution, ce qui est bien plus puissant qu\'une promesse commerciale.',
      level: 1,
    },
    {
      id: 'p4',
      type: 'qcm',
      question: "Vous défendez un contrat annuel à 120 000 €. L'acheteur exige -15%. Vous utilisez la technique « si… alors ». Laquelle est correcte ?",
      options: [
        '« Si je vous fais -15%, vous signez aujourd\'hui ? »',
        '« Si vous acceptez un engagement 2 ans, alors je peux revoir les conditions. »',
        '« Si vous réduisez le périmètre, alors le prix baisse. »',
        'Les deux réponses B et C sont correctes.',
      ],
      correct: 3,
      explanation: "La technique « si… alors » lie toute concession à une contrepartie. B et C sont toutes deux valides : engagement plus long ou réduction de périmètre. L'erreur serait de concéder sans rien obtenir en échange.",
      level: 2,
    },
    {
      id: 'p5',
      type: 'qcm',
      question: "Vous êtes en face d'un DG pressé et d'un acheteur pur prix lors d'une même réunion. Comment gérez-vous ?",
      options: [
        'Vous parlez uniquement au DG, décideur final',
        'Vous parlez uniquement à l\'acheteur, votre interlocuteur habituel',
        'Vous adressez le ROI au DG et répondez aux points prix à l\'acheteur séparément',
        'Vous reportez la réunion pour préparer une proposition adaptée',
      ],
      correct: 2,
      explanation: 'En multi-interlocuteurs, chaque personne a ses propres enjeux. Adresser le ROI et la vision stratégique au DG tout en gérant les aspects opérationnels avec l\'acheteur maximise votre impact.',
      level: 2,
    },
    {
      id: 'p6',
      type: 'qcm',
      question: "Un client dit : « Votre concurrent propose la même chose 20% moins cher. » Quelle est votre priorité ?",
      options: [
        'Vous alignez immédiatement votre prix pour garder le client',
        'Vous questionnez pour vérifier si l\'offre concurrente est vraiment comparable',
        'Vous expliquez que votre qualité est supérieure',
        'Vous demandez un délai pour consulter votre direction',
      ],
      correct: 1,
      explanation: "80% des offres concurrentes « moins chères » ne sont pas vraiment comparables (périmètre différent, support absent, conditions cachées). Votre première arme est le questionnement pour déconstruire la comparaison.",
      level: 2,
    },
    {
      id: 'p7',
      type: 'qcm',
      question: "Qu'est-ce qu'un plan de compte stratégique (Account Plan) ?",
      options: [
        'Un tableau de bord de vos objectifs de vente sur le compte',
        'Un document vivant synthétisant le mapping décisionnel, les enjeux business du client et votre plan d\'actions annuel',
        'Un contrat-cadre pluriannuel avec le client',
        'Une présentation de votre offre adaptée au compte',
      ],
      correct: 1,
      explanation: "L'Account Plan est la colonne vertébrale du KAM. Il dépasse les simples objectifs de vente pour inclure la connaissance profonde du client (enjeux, organisation, concurrence) et votre stratégie de développement.",
      level: 3,
    },
    {
      id: 'p8',
      type: 'vrai_faux',
      question: "Dans une Business Review, il faut éviter d'aborder les problèmes et insatisfactions pour maintenir une atmosphère positive.",
      options: ['Vrai', 'Faux'],
      correct: 1,
      explanation: "FAUX. La Business Review doit aborder de front les insatisfactions. C'est justement le moment d'en parler, de les traiter et de montrer votre plan d'action. Ignorer les problèmes mène à la perte du compte.",
      level: 3,
    },
    {
      id: 'p9',
      type: 'qcm',
      question: "L'upsell est plus facile que l'acquisition d'un nouveau client parce que :",
      options: [
        'Les prix sont moins élevés en upsell',
        'La confiance est établie, les risques perçus sont plus faibles et le cycle de vente est plus court',
        'L\'acheteur n\'a pas le droit de mettre en concurrence un fournisseur existant',
        'Les marges sont réglementées dans les contrats-cadres',
      ],
      correct: 1,
      explanation: "L'upsell capitalise sur une relation existante. La confiance réduit le risque perçu, vous connaissez les enjeux du client, et vous n'avez pas à reconstruire votre légitimité. Le coût d'acquisition est 5 à 7x plus faible qu'un nouveau client.",
      level: 3,
    },
    {
      id: 'p10',
      type: 'qcm',
      question: "Vous avez une opportunité de renouvellement de contrat dans 4 mois. Quand commencez-vous à travailler le sujet ?",
      options: [
        '1 mois avant l\'échéance — assez tôt pour être réactif',
        'Dès maintenant — 4 mois est le bon délai pour préparer et sécuriser le renouvellement',
        'À l\'échéance — le client reviendra naturellement',
        '6 semaines avant — le bon équilibre entre trop tôt et trop tard',
      ],
      correct: 1,
      explanation: "4 mois est exactement le bon moment. Il faut du temps pour réaliser une business review, traiter les insatisfactions éventuelles, construire une proposition améliorée et laisser le client décider sereinement sans pression temporelle.",
      level: 3,
    },
  ],
}

export function computePlacementLevel(answers) {
  // answers: array of {questionId, selectedIndex}
  const questions = PLACEMENT_TEST.questions
  let l1 = 0, l2 = 0, l3 = 0
  let l1Total = 0, l2Total = 0, l3Total = 0

  answers.forEach(({ questionId, selectedIndex }) => {
    const q = questions.find(q => q.id === questionId)
    if (!q) return
    const correct = selectedIndex === q.correct ? 1 : 0
    if (q.level === 1) { l1 += correct; l1Total++ }
    if (q.level === 2) { l2 += correct; l2Total++ }
    if (q.level === 3) { l3 += correct; l3Total++ }
  })

  const l1Pct = l1Total ? l1 / l1Total : 0
  const l2Pct = l2Total ? l2 / l2Total : 0
  const l3Pct = l3Total ? l3 / l3Total : 0

  if (l3Pct >= 0.75) return 3
  if (l2Pct >= 0.66 && l1Pct >= 0.66) return 2
  return 1
}
