export const SIMULATION_IT_RENOUVELLEMENT = {
  id: 'sim-it-renouvellement',
  title: 'Renouvellement Parc IT — 300 Postes',
  subtitle: 'Défendez votre offre face à un acheteur agressif sur les prix',
  sector: 'IT & Périphériques',
  difficulty: 1,
  duration: '10-15 min',
  icon: '💻',
  xpReward: 200,
  context: `
Vous êtes commercial chez **TechPerif Solutions**, revendeur IT spécialisé.

**Votre client :** Groupe Meridian, ETI de 850 salariés dans la logistique.
**Votre interlocuteur :** Marc Leblanc, Responsable Achats, 45 ans — acheteur pur prix.

**La situation :** Meridian renouvelle son parc de 300 postes de travail tous les 4 ans. Le contrat actuel se termine dans 3 mois. Marc vous a demandé une réunion.

**Votre offre :** Package Logitech Zone Wireless 2 + dock USB-C + tapis de souris ergonomique
— **Prix catalogue total : 108 000 € HT** (360 €/poste)
— **Votre plancher : 96 000 €** (320 €/poste, marge minimum)
— **Votre objectif cible : 103 000 €** (343 €/poste)

**Votre BATNA :** Un autre prospect (Société Beaumont, 150 postes) est en attente de votre offre. Vous n'êtes pas en urgence absolue.

**Profil acheteur :** Marc est formé à la négociation, utilise des tactiques classiques (menace concurrence, deadline artificielle, demande de remise d'emblée). Il est satisfait de votre service mais ne le montrera pas facilement.
  `,
  buyerProfile: {
    name: 'Marc Leblanc',
    role: 'Responsable Achats',
    avatar: '👔',
    style: 'Acheteur pur prix',
    traits: ['Agressif sur les remises', 'Utilise la concurrence comme levier', 'Cache sa satisfaction', 'Crée des deadlines artificielles'],
  },
  steps: [
    // ── ÉTAPE 1 ──
    {
      id: 'step-1',
      buyerSays: "Bonjour. Merci de vous déplacer. Bon, soyons directs — on renouvelle 300 postes et j'ai déjà des offres concurrentes. J'ai besoin de savoir ce que vous proposez, et surtout à quel prix.",
      situation: "Marc entre directement dans le vif du sujet. Il teste votre réaction à la pression d'emblée.",
      question: "Comment répondez-vous à cette ouverture ?",
      options: [
        {
          text: "« Très bien ! Notre prix pour 300 postes est de 108 000 € HT. Mais on peut discuter selon votre budget. »",
          quality: 'bad',
          score: 0,
          feedback: "❌ Mauvais départ. Vous annoncez votre prix ET signalez immédiatement une flexibilité. Marc va s'accrocher aux 108 000 € comme ancre haute ET sait qu'il peut négocier. Double erreur.",
          consequence: "Marc : « 108 000 € ? C'est beaucoup trop. Mes concurrents sont à 85 000 €. »",
        },
        {
          text: "« Je comprends. Avant de vous parler prix, j'aimerais comprendre ce que vous attendez de ce renouvellement. Votre parc actuel vous donne satisfaction ? »",
          quality: 'good',
          score: 30,
          feedback: "✅ Excellent ! Vous ne répondez pas à la pression sur le prix immédiatement. Vous cherchez à comprendre les enjeux pour positionner votre valeur avant d'annoncer un chiffre. C'est la posture SPIN.",
          consequence: "Marc : « [légèrement surpris] Notre parc actuel… il fait le job. Mais on a des remontées sur la qualité audio des casques sur les open spaces. »",
        },
        {
          text: "« Nos prix sont les plus compétitifs du marché sur cette gamme. Qu'ont proposé vos autres fournisseurs ? »",
          quality: 'average',
          score: 10,
          feedback: "⚠️ Pas idéal. Vous restez sur le terrain du prix dès le départ, et demander ce que propose la concurrence vous met en position de réagir plutôt que de mener. Mieux vaut comprendre les besoins fonctionnels d'abord.",
          consequence: "Marc : « Mes autres fournisseurs ? À vous de me convaincre d'abord. »",
        },
        {
          text: "« On peut faire du 85 000 € si c'est vraiment votre budget. »",
          quality: 'terrible',
          score: -20,
          feedback: "❌ Catastrophique. Vous venez de capituler avant même que Marc ait sorti un chiffre. Vous avez sacrifié 23 000 € de marge en 30 secondes. Marc va maintenant penser que vous avez encore de la marge et redoubler de pression.",
          consequence: "Marc : « Intéressant… mais même à 85 000 €, je pense qu'on peut faire mieux. »",
        },
      ],
      bestOption: 1,
    },

    // ── ÉTAPE 2 ──
    {
      id: 'step-2',
      buyerSays: "Oui, les casques sont moyens en open space. On a aussi des problèmes avec les webcams — qualité médiocre en visio, les clients nous le font remarquer. Et les délais de remplacement quand il y a une panne, ça prend parfois 3 semaines.",
      situation: "Marc vient de vous livrer 3 problèmes concrets. C'est une mine d'information pour qualifier votre offre et justifier votre valeur.",
      question: "Quelle est votre meilleure réaction ?",
      options: [
        {
          text: "« Parfait, notre offre Logitech Zone Wireless 2 règle exactement ces 3 problèmes. Je vous explique les caractéristiques techniques. »",
          quality: 'average',
          score: 10,
          feedback: "⚠️ Trop rapide. Vous passez en mode pitch sans avoir approfondi les implications de ces problèmes. Creusez davantage avant de présenter votre solution.",
          consequence: "Marc : « Oui mais tous les fournisseurs disent ça. Parlons prix. »",
        },
        {
          text: "« Ces 3 points sont importants. Sur la qualité audio — quel est l'impact concret sur votre activité ? Combien de réunions clients sont affectées chaque semaine ? »",
          quality: 'good',
          score: 30,
          feedback: "✅ Excellent. Vous creusez les implications (méthode SPIN — question I). Chaque problème amplifié devient un argument de valeur pour justifier votre prix.",
          consequence: "Marc : « [réfléchit] Honnêtement ? Au moins 20-30 réunions par semaine. Et on a eu 2 plaintes clients récemment à cause de la qualité audio. »",
        },
        {
          text: "« Pour les délais de remplacement, on est à 5 jours ouvrés — deux fois plus rapide que la moyenne. »",
          quality: 'average',
          score: 15,
          feedback: "⚠️ Vous répondez trop vite sur un seul point. C'est un bon avantage mais vous manquez l'occasion de creuser tous les problèmes pour construire un ROI global.",
          consequence: "Marc : « 5 jours, c'est mieux. Mais ça ne résout pas le problème du prix. »",
        },
        {
          text: "« Est-ce que ces problèmes ont eu un impact financier mesurable pour vous ? »",
          quality: 'good',
          score: 25,
          feedback: "✅ Bonne question d'implication financière. Vous essayez de chiffrer la douleur pour justifier votre valeur.",
          consequence: "Marc : « Financier direct, difficile à dire. Mais niveau image client, oui. Et productivité, probablement. »",
        },
      ],
      bestOption: 1,
    },

    // ── ÉTAPE 3 ──
    {
      id: 'step-3',
      buyerSays: "Bon, maintenant parlons sérieusement. J'ai une offre d'un concurrent pour 300 postes équivalents à 91 000 €. J'attends de vous une offre comparable. Et j'ai besoin de la réponse avant vendredi — on a un comité d'investissement lundi.",
      situation: "Marc sort la carte classique : concurrent moins cher + deadline artificielle. Double pression.",
      question: "Comment gérez-vous cette double pression ?",
      options: [
        {
          text: "« D'accord, je vais voir ce que je peux faire. Je vous rappelle jeudi avec une contre-proposition. »",
          quality: 'bad',
          score: 0,
          feedback: "❌ Vous acceptez la deadline et vous engagez implicitement à vous rapprocher de 91 000 €. Marc a gagné les deux leviers de pression. Vous rentrez au bureau en panique.",
          consequence: "Marc : « Parfait. J'attends votre appel jeudi avant midi. »",
        },
        {
          text: "« 91 000 € pour 300 postes équivalents — c'est intéressant. Puis-je voir l'offre pour qu'on compare les périmètres ligne à ligne ? »",
          quality: 'good',
          score: 30,
          feedback: "✅ Excellent réflexe. Vous ne validez pas le chiffre concurrent sans vérifier si c'est vraiment comparable. 80% du temps, les offres « équivalentes » ne le sont pas (garantie, service, marque réelle).",
          consequence: "Marc : « [légèrement sur la défensive] Je n'ai pas le document ici. »",
        },
        {
          text: "« Pour la deadline vendredi, pas de problème. Sur le prix — notre offre à 108 000 € intègre des éléments que votre concurrent ne propose probablement pas. »",
          quality: 'average',
          score: 15,
          feedback: "⚠️ Vous gérez la deadline mais restez sur votre ancre haute sans tactique. Mieux vaut d'abord questionner la comparabilité de l'offre concurrente.",
          consequence: "Marc : « Comme quoi ? Tout le monde dit ça. »",
        },
        {
          text: "« Je comprends l'urgence. Sur la deadline — quel est précisément l'impact si vous n'avez pas de décision lundi ? »",
          quality: 'good',
          score: 25,
          feedback: "✅ Bien joué. Vous testez la deadline en questionnant sa réalité. Si Marc ne peut pas expliquer la conséquence concrète de rater le comité lundi, c'est probablement une tactique de pression.",
          consequence: "Marc : « Le comité d'investissement valide les dépenses. Si on rate ce comité, le prochain est dans 6 semaines. »",
        },
      ],
      bestOption: 1,
    },

    // ── ÉTAPE 4 ──
    {
      id: 'step-4',
      buyerSays: "Je n'ai pas l'offre concurrente ici, mais c'est bien 300 postes casques + webcams. Sur la deadline, le comité a lieu lundi effectivement. Alors votre offre, elle est à combien ? Et quel effort vous pouvez faire ?",
      situation: "Marc ne peut pas produire l'offre concurrente. La deadline semble réelle. Il demande votre prix et votre concession d'emblée.",
      question: "C'est le moment d'annoncer votre offre. Comment structurez-vous votre réponse ?",
      options: [
        {
          text: "« Notre offre est à 103 500 € HT pour le périmètre complet — casques Logitech Zone Wireless 2, webcams Logitech Rally Bar Huddle intégrées, et notre SLA de remplacement à 5 jours. »",
          quality: 'good',
          score: 30,
          feedback: "✅ Bien structuré. Vous annoncez votre objectif cible (103 500 €) en présentant la valeur incluse (SLA, marques qualité). Vous n'êtes pas à votre plancher, il reste de la marge pour concéder une contrepartie.",
          consequence: "Marc : « 103 500 €… C'est encore loin de 91 000 €. Quel effort vous faites ? »",
        },
        {
          text: "« Si vous m'indiquez votre budget, je peux travailler dessus. »",
          quality: 'bad',
          score: -10,
          feedback: "❌ Vous renversez la négociation — c'est à vous d'ancrer, pas à lui. En demandant son budget, vous donnez à Marc le contrôle de l'ancrage.",
          consequence: "Marc : « Mon budget, c'est 85 000 €. »",
        },
        {
          text: "« Compte tenu des problèmes que vous avez mentionnés — qualité audio, webcams, délais SAV — notre offre à 103 500 € règle les 3 sujets avec un ROI estimé en moins de 18 mois. La qualité audio seule peut vous éviter des pertes clients que vous avez déjà expérimentées. »",
          quality: 'good',
          score: 35,
          feedback: "✅ Excellent ! Vous ancrez votre prix dans les problèmes identifiés plus tôt et construisez un ROI. Marc ne peut pas simplement comparer à 91 000 € sans tenir compte du contexte valeur.",
          consequence: "Marc : « Le ROI en 18 mois, c'est théorique. Je veux du concret sur le prix. »",
        },
        {
          text: "« 96 000 €, c'est notre meilleur prix. »",
          quality: 'terrible',
          score: -20,
          feedback: "❌ Vous venez d'annoncer votre plancher comme prix de départ. Marc va désormais négocier EN DESSOUS de votre minimum. Catastrophique.",
          consequence: "Marc : « 96 000 €… On peut faire 88 000 € ? »",
        },
      ],
      bestOption: 2,
    },

    // ── ÉTAPE 5 ──
    {
      id: 'step-5',
      buyerSays: "Votre offre à 103 500 €… si vous descendez à 95 000 €, on signe cette semaine. C'est une bonne affaire pour vous, non ? Vous gardez un client fidèle et vous montrez que vous faites des efforts.",
      situation: "Marc fait une demande de remise directe (-8 500 €) en échange d'une signature rapide. C'est la technique de l'engagement immédiat contre concession.",
      question: "Comment répondez-vous à cette demande de remise ?",
      options: [
        {
          text: "« 95 000 € c'est possible si vous pouvez me confirmer la commande aujourd'hui par écrit. »",
          quality: 'bad',
          score: 5,
          feedback: "⚠️ Vous concédez 8 500 € trop facilement et trop rapidement. Même si la signature est intéressante, une telle concession sans contrepartie structurée signale que vous avez de la marge — Marc en redemandera.",
          consequence: "Marc : « Parfait. Envoyez-moi le bon de commande. Ah, et pour la formation, c'est inclus ? »",
        },
        {
          text: "« 95 000 €, c'est en dessous de ce qu'on peut faire. Par contre, si on parle d'un engagement 2 ans sur l'ensemble de vos périphériques IT, alors je peux revoir les conditions. »",
          quality: 'good',
          score: 35,
          feedback: "✅ Excellent ! Technique du « si… alors » appliquée parfaitement. Vous refusez la concession sèche et liez toute réduction de prix à une contrepartie de valeur (engagement pluriannuel). C'est de la négociation professionnelle.",
          consequence: "Marc : « Un engagement 2 ans… c'est possible. Qu'est-ce que ça représenterait comme remise ? »",
        },
        {
          text: "« Je comprends votre demande. À 95 000 €, je ne peux pas aller, mais je peux faire 99 500 € avec la formation offerte. »",
          quality: 'average',
          score: 20,
          feedback: "⚠️ Vous proposez un compromis mais vous concédez quand même 4 000 € sans vrai contrepartie. La formation « offerte » est une contrepartie floue (quel coût réel ?). Mieux vaut lier à une contrepartie structurante.",
          consequence: "Marc : « La formation offerte, ça m'intéresse. Mais 99 500 € c'est encore trop élevé. »",
        },
        {
          text: "« Je vais en parler à mon responsable et vous rappelle demain. »",
          quality: 'bad',
          score: 0,
          feedback: "❌ Vous renvoyez la décision et perdez le momentum. Marc interprète ça comme : vous avez de la marge mais avez besoin d'autorisation. Il va attendre et recommencer la pression demain.",
          consequence: "Marc : « D'accord. J'ai aussi une autre réunion fournisseur demain. »",
        },
      ],
      bestOption: 1,
    },

    // ── ÉTAPE 6 ──
    {
      id: 'step-6',
      buyerSays: "Un engagement 2 ans… ça pourrait se faire si vous me faites -10% sur le tarif annuel. Soit environ 93 000 € pour cette première commande. Et vous me bloquez le prix pour l'année 2.",
      situation: "Marc a accepté le principe de l'engagement 2 ans mais demande une remise de 10% en échange. Vous approchez de votre plancher (96 000 €).",
      question: "Vous êtes à 103 500 €. Marc demande 93 000 €. Comment concluez-vous ?",
      options: [
        {
          text: "« 93 000 € c'est en dessous de ce qu'on peut faire. Sur un engagement ferme 2 ans avec les 300 postes + accessoires, je peux aller à 98 500 € avec le prix bloqué en année 2. C'est ma meilleure offre. »",
          quality: 'good',
          score: 35,
          feedback: "✅ Excellent closing. Vous refusez le chiffre de 93 000 € (sous votre plancher), proposez 98 500 € (au-dessus de votre plancher), avec une contrepartie claire (blocage prix an 2) et une formulation ferme (« meilleure offre »). Professionnel.",
          consequence: "Marc : « [pause] … 98 500 €. Et le blocage prix en année 2, c'est sur quelle base ? »",
        },
        {
          text: "« 96 000 € pour les 300 postes, engagement 2 ans, prix bloqué an 2. C'est mon prix plancher. »",
          quality: 'average',
          score: 15,
          feedback: "⚠️ Vous révélez votre plancher (96 000 €), ce qui est une erreur tactique. Marc sait maintenant exactement où vous êtes et pourrait tenter de descendre encore. Ne révélez jamais votre plancher.",
          consequence: "Marc : « Votre prix plancher… so you have room? 94 000 € and we close. »",
        },
        {
          text: "« D'accord pour 95 000 € si on signe aujourd'hui. »",
          quality: 'average',
          score: 10,
          feedback: "⚠️ Vous concédez à 95 000 € (-8 500 €) sans obtenir l'engagement 2 ans formellement. Vous perdez de la marge sans sécuriser la valeur long terme.",
          consequence: "Marc : « 95 000 € pour cette commande, c'est noté. »",
        },
        {
          text: "« Si vous signez cette semaine les 300 postes, je peux aller à 101 000 € avec la garantie étendue 3 ans incluse. »",
          quality: 'good',
          score: 25,
          feedback: "✅ Bonne technique : vous accrochez une concession limitée (-2 500 €) à une urgence temporelle ET ajoutez de la valeur (garantie 3 ans) plutôt que de baisser le prix sec. Créatif.",
          consequence: "Marc : « La garantie 3 ans a de la valeur pour nous. Mais je veux quand même descendre le prix. »",
        },
      ],
      bestOption: 0,
    },

    // ── ÉTAPE 7 — CLOSING ──
    {
      id: 'step-7',
      buyerSays: "98 500 €, prix bloqué en année 2 sur base de l'indice INSEE des prix à la consommation… C'est acceptable. Si vous m'ajoutez la formation initiale de vos équipes (2 jours) offerte, on a un deal.",
      situation: "Marc est prêt à conclure. Il demande une dernière concession (formation 2 jours offerte) pour finaliser. C'est la technique du « dernier point ».",
      question: "Vous y êtes presque. Comment gérez-vous cette dernière demande ?",
      options: [
        {
          text: "« La formation 2 jours est incluse. Marché conclu ! »",
          quality: 'average',
          score: 15,
          feedback: "⚠️ Vous obtenez le deal mais cédez sur le dernier point sans résistance. Marc pense qu'il a bien négocié — ce qui est vrai. Vous n'avez pas capitalisé sur cette opportunité pour obtenir quelque chose en échange.",
          consequence: "Marc : « Parfait. Envoyez le bon de commande. »",
        },
        {
          text: "« La formation est à 2 400 € dans notre catalogue. Je peux l'inclure si vous me confirmez la commande par bon de commande avant vendredi 17h. »",
          quality: 'good',
          score: 30,
          feedback: "✅ Vous acceptez la concession mais l'ancrez dans une valeur monétaire réelle (2 400 €, pas « offerte » vaguement) ET vous obtenez la signature dans votre deadline. C'est un closing propre.",
          consequence: "Marc : « Accord. Je vous fais envoyer le bon de commande jeudi. »",
        },
        {
          text: "« La formation ne peut pas être offerte, mais je peux vous faire 50% de réduction dessus. »",
          quality: 'average',
          score: 20,
          feedback: "⚠️ Une concession à moitié est quand même une concession. Si Marc est prêt à signer, donnez-lui la formation complète avec une contrepartie temporelle plutôt que de tergiverser sur 1 200 €.",
          consequence: "Marc : « 50%... je préférerais qu'elle soit offerte. »",
        },
        {
          text: "« Vous avez déjà la formation incluse dans notre tarif. »",
          quality: 'bad',
          score: -10,
          feedback: "❌ Si la formation n'est pas incluse dans votre offre et que vous dites qu'elle l'est, vous mentez. C'est une erreur éthique et contractuelle. Ne jamais mentir sur ce qui est inclus.",
          consequence: "Marc : « Je vais vérifier ça avec votre support commercial. »",
        },
      ],
      bestOption: 1,
    },
  ],

  scoreBreakdown: {
    excellent: { min: 170, label: 'Négociateur Expert', description: 'Vous maîtrisez toutes les techniques fondamentales. Vous défendez votre valeur sans concession gratuite et closez avec assurance.', badge: '🏆' },
    good: { min: 120, label: 'Commercial Confirmé', description: 'Bonne maîtrise des fondamentaux avec quelques points à affiner sur la gestion des leviers de pression.', badge: '⭐' },
    average: { min: 70, label: 'Commercial Junior', description: 'Les bases sont là mais des réflexes à améliorer sur la gestion de la pression prix et la technique du « si… alors ».', badge: '📈' },
    beginner: { min: 0, label: 'En Progression', description: 'Plusieurs réflexes classiques à développer. Recommencez après avoir revu les modules fondamentaux.', badge: '🌱' },
  },
}
