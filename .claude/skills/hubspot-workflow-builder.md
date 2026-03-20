--- name: hubspot-workflow-builder description: Générateur de workflows, séquences et automatisations HubSpot pour un commercial B2B solo (Sales Hub Pro) dans le secteur des accessoires IT. Utiliser ce skill dès que l'utilisateur mentionne HubSpot, un workflow, une séquence email, une automatisation de relance, un scoring lead, un pipeline, un deal stage, un dashboard commercial, ou toute question liée à la configuration de son CRM. Aussi déclencher quand l'utilisateur dit "automatiser", "relance automatique", "suivi devis", "pipeline", "propriété HubSpot", "tâche automatique", ou demande comment organiser son CRM. Même une demande vague comme "comment je gère mes relances" doit activer ce skill si le contexte commercial est présent. ---
# HUBSPOT WORKFLOW BUILDER — Automatisation CRM pour Commercial IT Solo

## CONTEXTE UTILISATEUR

**Profil :** Responsable commercial B2B solo
**Plan :** HubSpot Sales Hub Pro
**Niveau :** Intermédiaire (deals, tâches, quelques workflows existants)
**Secteur :** Accessoires IT — périphériques bureautiques + audio-vidéo conférence
**Clients :** Mix PME/TPE, ETI/Grands comptes, Collectivités

**Fonctionnalités disponibles avec Sales Hub Pro :**
- Séquences email (automatisées avec personnalisation)
- Workflows (basés sur contacts, entreprises, deals)
- Lead scoring personnalisé
- Pipeline deals personnalisable
- Propriétés personnalisées
- Tâches automatiques
- Templates d'emails
- Reporting / dashboards personnalisés
- Intégration email (suivi ouvertures et clics)

---

## LES 3 MODES DU SKILL

---

### MODE 1 — SÉQUENCES DE RELANCE

**Quand :** L'utilisateur veut automatiser ses relances devis, ses suivis post-RDV, ou ses séquences de prospection.

**Principe :** Chaque séquence est livrée étape par étape, prête à être créée dans HubSpot > Automatisation > Séquences.

**Séquences types disponibles :**

#### SÉQUENCE A — Relance devis envoyé

```
📧 SÉQUENCE : Relance Devis IT/AV
Déclencheur : Deal passé au stade "Devis envoyé"
Durée totale : 15 jours
Nombre d'étapes : 5

━━━ ÉTAPE 1 — J+2 (Email automatique) ━━━
Objet : [Personnalisé — pas "Relance devis"]
Contenu : Apport de valeur lié au besoin identifié.
Pas de demande directe de réponse.
Token à utiliser : {{contact.firstname}}, {{deal.dealname}}

OBJET : {{contact.firstname}}, un point sur votre projet {{deal.dealname}}
CORPS :
Bonjour {{contact.firstname}},

En préparant votre dossier, j'ai pensé à un point qui méritait d'être
mentionné : [insérer ici un élément technique concret — ex. compatibilité
avec votre système d'exploitation actuel, garantie constructeur incluse,
délai de livraison standard].

Ce type de détail est souvent décisif dans le choix final, et je préfère
vous en informer maintenant plutôt qu'après signature.

Si vous avez des questions sur ce point ou sur d'autres aspects du devis,
je suis disponible pour en discuter.

Bien cordialement,
[Signature]

━━━ ÉTAPE 2 — J+5 (Tâche manuelle : appel) ━━━
Type : Tâche appel
Note : "Appeler {{contact.firstname}} — devis {{deal.dealname}} envoyé il y a 5 jours.
Objectif : valider la réception et identifier les freins."
Priorité : Haute

━━━ ÉTAPE 3 — J+7 (Email automatique) ━━━
Objet : [Angle urgence douce — stock, tarif, deadline projet]
Contenu : Élément de rareté ou temporalité.
Inclure un CTA clair (lien vers le devis ou prise de RDV).

OBJET : {{deal.dealname}} — disponibilité & tarifs : point de situation
CORPS :
Bonjour {{contact.firstname}},

Je me permets de faire le point sur votre dossier {{deal.dealname}}.

[Insérer ici un élément factuel adapté — ex. : "Le modèle principal de
votre devis est en stock limité chez le distributeur" / "Le tarif
constructeur sur cette gamme est susceptible d'évoluer en fin de mois" /
"Pour une livraison avant [date projet], la commande devrait être confirmée
avant le [date limite]."]

Ce contexte peut avoir un impact sur votre planning — voici le devis
pour référence : [lien devis] ou vous pouvez réserver un créneau directement :
[lien agenda].

Je reste disponible pour toute question.

Bien cordialement,
[Signature]

━━━ ÉTAPE 4 — J+10 (Tâche manuelle : LinkedIn) ━━━
Type : Tâche personnalisée
Note : "Envoyer un message LinkedIn à {{contact.firstname}}.
Ton conversationnel, pas copié-collé de l'email.
Angle : retour d'expérience ou actualité sectorielle."
Priorité : Moyenne

━━━ ÉTAPE 5 — J+15 (Email automatique — fermeture) ━━━
Objet : [Clôture propre]
Contenu : Fermer la boucle avec élégance.
Laisser la porte ouverte. Proposer de recontacter dans 3 mois.

OBJET : {{contact.firstname}}, je ferme le dossier de mon côté
CORPS :
Bonjour {{contact.firstname}},

Je ne souhaite pas encombrer davantage votre boîte de réception — c'est
donc mon dernier message concernant {{deal.dealname}}.

Ce devis proposait [résumer en une phrase l'essentiel : ex. "un équipement
complet de vos salles de réunion en solution audio-vidéo conférence"].

Si votre calendrier évolue dans les prochains mois, n'hésitez pas à me
recontacter directement : le dossier reste dans mes fichiers et je peux
le réactiver rapidement.

Je vous souhaite une excellente continuation.

Bien cordialement,
[Signature]

━━━ ACTION POST-SÉQUENCE ━━━
Si aucune réponse après étape 5 :
→ Workflow : passer le deal au stade "En veille"
→ Créer tâche de relance à J+90
→ Ajouter le contact à la liste "À réactiver Q+1"
```

#### SÉQUENCE B — Suivi post-RDV

```
📧 SÉQUENCE : Suivi Post-RDV
Déclencheur : Manuel (inscrire le contact après le RDV)
Durée totale : 10 jours
Nombre d'étapes : 4

━━━ ÉTAPE 1 — J+0 (Email automatique — même jour) ━━━
Contenu : Récap des points discutés + prochaines étapes convenues.
Joindre le document promis si applicable.

OBJET : Suite à notre échange du [date] — récapitulatif et prochaines étapes
CORPS :
Bonjour {{contact.firstname}},

Merci pour le temps que vous m'avez accordé ce [matin/après-midi]. Voici
un récapitulatif de notre échange :

1. Besoins identifiés : [insérer les besoins exprimés — ex. équipement de
   3 salles de réunion, remplacement du parc périphériques]
2. Solution discutée : [insérer la solution évoquée — produits, gammes,
   configuration envisagée]
3. Prochaines étapes : [insérer ce qui a été convenu — ex. envoi d'un devis
   sous 48h, planification d'une démo, envoi d'une fiche technique]

[Si document promis : "Vous trouverez ci-joint / en lien le document
mentionné lors de notre échange : [lien ou mention PJ]."]

N'hésitez pas à me revenir si des éléments sont à corriger ou compléter.

Bien cordialement,
[Signature]

━━━ ÉTAPE 2 — J+3 (Tâche manuelle : appel) ━━━
Note : "Appeler pour valider que les infos envoyées sont suffisantes
et proposer la prochaine étape."

━━━ ÉTAPE 3 — J+5 (Email automatique) ━━━
Contenu : Apport de valeur complémentaire (fiche produit, cas client similaire, étude de ROI).

OBJET : {{company.name}} — [ressource complémentaire à notre échange]
CORPS :
Bonjour {{contact.firstname}},

Vous mentionniez lors de notre échange [référencer un point spécifique
évoqué — ex. "la difficulté de gérer des solutions hétérogènes en
visioconférence" / "la contrainte de compatibilité avec votre parc actuel"].

[Insérer la ressource pertinente — ex. :
"J'ai pensé à ce retour d'expérience d'un client dans le secteur [X],
confronté à la même problématique : [brève description du cas — 2 lignes].
Résultat : [bénéfice concret chiffré si possible]."
OU
"Voici une fiche comparative entre les deux options que nous avons évoquées,
qui devrait faciliter votre arbitrage : [lien ou PJ]."]

Si ce point vous semble pertinent, je peux approfondir lors d'un prochain
échange.

Bien cordialement,
[Signature]

━━━ ÉTAPE 4 — J+10 (Email automatique) ━━━
Contenu : Proposition directe de prochaine étape (démo, devis, essai)
avec lien de prise de RDV.

OBJET : {{contact.firstname}}, quelle est la prochaine étape pour {{company.name}} ?
CORPS :
Bonjour {{contact.firstname}},

Pour faire le point : nous avons identifié ensemble [besoin X] et je vous
ai transmis [document Y / la ressource sur [sujet]].

Pour avancer, deux options s'offrent à vous :

- Option A : je planifie une démo avec votre équipe pour valider la
  solution en conditions réelles → [lien agenda]
- Option B : je prépare un devis définitif sur la base de notre échange
  → répondez simplement à cet email avec vos préférences de configuration

Quelle option correspond le mieux à votre calendrier ?

Bien cordialement,
[Signature]
```

#### SÉQUENCE C — Prospection à froid

```
📧 SÉQUENCE : Prospection Outbound IT/AV
Déclencheur : Manuel (contacts identifiés via veille)
Durée totale : 21 jours
Nombre d'étapes : 5

━━━ ÉTAPE 1 — J+0 (Email automatique) ━━━
Objet : [Personnalisé selon le secteur du prospect]
Contenu : Accroche liée à un enjeu sectoriel concret.
Pas de présentation catalogue. Une question ouverte.

━━━ ÉTAPE 2 — J+3 (Tâche : connexion LinkedIn) ━━━
Note : "Ajouter {{contact.firstname}} sur LinkedIn avec message personnalisé."

━━━ ÉTAPE 3 — J+7 (Email automatique) ━━━
Contenu : Angle différent — cas client, chiffre clé, tendance sectorielle.

━━━ ÉTAPE 4 — J+14 (Tâche : appel) ━━━
Note : "Appeler le standard ou le mobile.
Référencer l'email envoyé. Objectif : décrocher un RDV."

━━━ ÉTAPE 5 — J+21 (Email automatique — dernier) ━━━
Contenu : Email de rupture élégant.
"Je ne veux pas encombrer votre boîte. Si le timing n'est pas bon, je comprends."
Laisser une porte ouverte.
```

**Format de livraison pour chaque séquence :**
- Chaque étape avec type (email auto / tâche manuelle), délai, contenu suggéré
- Tokens HubSpot à utiliser ({{contact.firstname}}, {{deal.dealname}}, etc.)
- Actions post-séquence (mise à jour deal stage, tâche follow-up)
- Instructions de création pas à pas si l'utilisateur le demande

---

### MODE 2 — SCORING & QUALIFICATION DE LEADS

**Quand :** L'utilisateur veut prioriser ses prospects, configurer un lead scoring, ou savoir qui contacter en premier.

**Modèle de scoring adapté au secteur IT/AV :**

```
📊 LEAD SCORING — Configuration HubSpot

━━━ CRITÈRES POSITIFS (ajoutent des points) ━━━

Données démographiques :
+15  Fonction = Acheteur / Responsable achats / DSI / DG
+10  Fonction = Responsable IT / Chef de projet SI
+5   Fonction = Assistant(e) / Prescripteur
+10  Taille entreprise > 100 salariés
+5   Taille entreprise 20-100 salariés
+10  Secteur = cible prioritaire (à définir par l'utilisateur)

Engagement email :
+5   A ouvert un email (par occurrence, max 3x)
+10  A cliqué un lien dans un email
+15  A répondu à un email

Engagement web :
+10  A visité la page produits/solutions
+15  A consulté une page tarifs ou demandé un devis
+5   A visité le site (par visite, max 3x)

Engagement commercial :
+20  RDV réalisé
+15  Devis envoyé
+25  Devis signé (conversion)

━━━ CRITÈRES NÉGATIFS (retirent des points) ━━━
-5   Aucune ouverture email depuis 30 jours
-10  Aucune activité depuis 60 jours
-15  Email bounced / invalide
-20  A répondu "pas intéressé"
-10  Secteur hors cible

━━━ SEUILS DE QUALIFICATION ━━━
0-25   : Lead froid → Liste "Nurturing long terme"
26-50  : Lead tiède → Séquence de prospection active
51-75  : Lead chaud → Contacter sous 48h
76+    : Lead très chaud → Contacter immédiatement
```

**Propriétés HubSpot personnalisées recommandées :**

```
📋 PROPRIÉTÉS CUSTOM À CRÉER

Contact :
• "Type de client" (dropdown) : PME / ETI / Grand compte / Collectivité
• "Besoin principal" (dropdown) : Périphériques / AV Conférence / Mixte
• "Parc actuel" (texte) : Description du matériel en place
• "Source du lead" (dropdown) : Site web / LinkedIn / Salon /
  Recommandation / Appel d'offres / Prospection directe

Deal :
• "Type de vente" (dropdown) : Vente directe / Appel d'offres /
  Renouvellement / Upsell
• "Concurrent identifié" (texte) : Nom du concurrent en lice
• "Probabilité de gain" (nombre) : Estimation en %
• "Date relance prévue" (date) : Prochaine action planifiée
```

---

### MODE 3 — PIPELINE & SUIVI DE DEALS

**Quand :** L'utilisateur veut structurer son pipeline, créer des deal stages, ou organiser son suivi commercial.

**Pipeline recommandé pour la vente IT/AV :**

```
🔄 PIPELINE — Vente IT/AV Conférence

Stade 1 : PROSPECT IDENTIFIÉ (0%)
→ Trigger d'entrée : nouveau contact qualifié ou AO détecté
→ Action auto : créer tâche "Premier contact sous 48h"
→ Durée max recommandée : 7 jours

Stade 2 : CONTACT ÉTABLI (10%)
→ Critère : premier échange réalisé (email, appel, LinkedIn)
→ Action auto : inscrire en séquence post-contact
→ Durée max : 14 jours

Stade 3 : BESOIN QUALIFIÉ (25%)
→ Critère : besoin identifié + budget confirmé + décideur identifié
→ Action auto : créer tâche "Préparer proposition"
→ Propriétés à remplir : besoin principal, parc actuel, concurrent

Stade 4 : PROPOSITION ENVOYÉE (50%)
→ Critère : devis ou proposition commerciale envoyé(e)
→ Action auto : inscrire en séquence "Relance devis"
→ Durée max : 21 jours

Stade 5 : NÉGOCIATION (75%)
→ Critère : retour du client, discussion prix/conditions en cours
→ Action auto : créer tâche "Suivi négo hebdo"
→ Alerte si > 14 jours sans activité

Stade 6 : GAGNÉ ✅ (100%)
→ Action auto : notification + tâche "Suivi livraison"
→ Créer tâche "Upsell/cross-sell à J+90"

Stade 7 : PERDU ❌ (0%)
→ Action auto : tâche "Analyser les causes de perte"
→ Propriété à remplir : "Raison de perte" (prix / concurrent /
  timing / pas de budget / autre)
→ Créer tâche "Réactiver à J+180"

Stade 8 : EN VEILLE ⏸️ (0%)
→ Pour les deals qui ne sont ni gagnés ni perdus
→ Action auto : tâche de relance à J+90
→ Inscrire en liste "À réactiver"
```

**Workflows d'automatisation associés :**

```
⚙️ WORKFLOWS RECOMMANDÉS

WORKFLOW 1 — Alerte deal dormant
Déclencheur : Deal sans activité depuis 14 jours
  ET stade ≠ Gagné/Perdu/En veille
Action : Email interne + tâche priorité haute
  "⚠️ Deal {{deal.dealname}} sans activité depuis 14 jours"

WORKFLOW 2 — Rotation de stade automatique
Déclencheur : Devis envoyé (email avec pièce jointe
  ou lien devis cliqué)
Action : Passer le deal au stade "Proposition envoyée"
  + inscrire contact en séquence relance

WORKFLOW 3 — Réactivation automatique
Déclencheur : Date de la propriété "Date relance prévue" = aujourd'hui
Action : Créer tâche "Relancer {{contact.firstname}} —
  Deal {{deal.dealname}}"

WORKFLOW 4 — Suivi post-gain
Déclencheur : Deal passé au stade "Gagné"
Action :
  → J+30 : tâche "Appel satisfaction"
  → J+90 : tâche "Identifier opportunité upsell/cross-sell"
  → J+330 : tâche "Préparer renouvellement"
```

---

## GUIDE PAS À PAS

Quand l'utilisateur demande "comment je fais ça dans HubSpot", fournir les instructions de navigation :

**Format instructions :**

```
📍 CHEMIN HUBSPOT :
1. Aller dans [Menu principal] > [Sous-menu]
2. Cliquer sur [Bouton]
3. Configurer [Paramètre] avec [Valeur]
4. Sauvegarder
```

Toujours utiliser les noms de menus en français (interface HubSpot FR).
Si un terme peut prêter à confusion, ajouter le terme anglais entre parenthèses
pour que l'utilisateur puisse retrouver le menu quelle que soit sa langue d'interface.

---

## RÈGLES TRANSVERSALES

### Calibrage Solo
- Toutes les automatisations sont pensées pour UN utilisateur, pas une équipe
- Pas d'usine à gaz : privilégier 3 workflows qui tournent bien plutôt que 15 qui se chevauchent
- Chaque automatisation doit faire gagner du temps, pas en ajouter
- Si un workflow nécessite une maintenance régulière, le signaler

### Contenu des emails
- Vouvoiement systématique
- Français professionnel, pas de franglais
- Jamais d'ouverture par "J'espère que vous allez bien" ou "Suite à mon précédent email"
- Chaque email apporte de la valeur (info, cas client, actualité) — pas juste "alors, vous avez décidé ?"

### Limites du skill
- Ne pas configurer HubSpot à distance — donner les instructions pour que l'utilisateur le fasse
- Ne pas inventer de fonctionnalités qui n'existent pas en Sales Hub Pro
- Si une fonctionnalité demandée nécessite Sales Hub Enterprise, le signaler clairement
- Les tokens HubSpot ({{...}}) doivent correspondre à des propriétés réelles ou custom créées

### Complémentarité avec les autres skills
- Les contenus d'emails générés ici doivent respecter les mêmes règles que le skill `b2b-sales-copilot`
- Les séquences liées aux appels d'offres peuvent être complétées par le skill `appels-offres-analyzer`

---

## FORMAT DE RÉPONSE

1. **Identifier le mode** automatiquement (Séquences / Scoring / Pipeline)
2. **Livrer l'output structuré** prêt à implémenter
3. **Si l'utilisateur demande "comment faire"** → ajouter le guide pas à pas HubSpot
4. **Si plusieurs modes sont pertinents** → les traiter séquentiellement

Pas de préambule. Aller directement à l'output actionnable.
