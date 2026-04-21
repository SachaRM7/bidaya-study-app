"use client";

import { useState, useCallback } from "react";

// ─── BOOK DATA — Exact structure from Bidāyat al-Mutafaqqih ─────────────────

const CHAPTERS = [
  {
    id: "tahara",
    title: "كتاب الطهارة",
    subtitle: "Kitāb al-Ṭahāra — La purification",
    icon: "💧",
    color: "#1A6B8A",
    sections: [
      {
        bab: "باب المياه",
        title: "Bāb al-Miyāh — Les eaux",
        dapibt: "ضابط واحد",
        content:
          "Les eaux se divisent en trois catégories :\n1. Ṭahūr (purificatrice) : eau pure qui n'a pas été altérée — elle purifie.\n2. Ṭāhira (pure non purificatrice) : eau mélangée à un élément pur qui l'a fait sortir de son état naturel.\n3. Najisa (impure) : eau dont une impureté a modifié l'une de ses qualités (couleur, odeur ou goût).",
      },
      {
        bab: "باب الآنية",
        title: "Bāb al-Āniya — Les récipients",
        dapibt: "4 ضوابط",
        content:
          "Ḍābiṭ 1 : Il est permis d'utiliser tous les récipients sauf ceux en or et en argent.\nḌābiṭ 2 : Les récipients des mécréants sont purs tant qu'on ne sait pas qu'ils les ont utilisés pour une impureté.\nḌābiṭ 3 : L'os de la bête morte, sa corne, son sabot, ses poisons, sa laine et ses plumes sont purs.\nḌābiṭ 4 : Les peaux des bêtes mortes sont pures après tannage.",
      },
      {
        bab: "باب قضاء الحاجة",
        title: "Bāb Qaḍā' al-Ḥāja — Faire ses besoins",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Ce qui est interdit (6 choses) :\n1. S'orienter vers la qibla ou lui tourner le dos sans écran.\n2. Faire ses besoins sur la voie publique, dans l'ombre ou les points d'eau des gens.\n3. Uriner dans l'eau stagnante.\n4. Dans les trous.\n5. Emporter ce qui contient le dhikr d'Allah.\n6. Se nettoyer avec la main droite.\n\nḌābiṭ 2 — Ce qui est interdit lors de l'istinjā' : se nettoyer avec moins de 3 pierres, ou avec un os ou une bouse.\n\nḌābiṭ 3 — Ce qui est recommandé (3 choses) :\n1. La basmala et l'isti'ādha avant d'entrer.\n2. Entrer du pied gauche et sortir du pied droit.\n3. Dire « ghufranaka » après être sorti.",
      },
      {
        bab: "باب السواك وخصال الفطرة",
        title: "Bāb al-Siwāk wa Khiṣāl al-Fiṭra",
        dapibt: "2 ضوابط",
        content:
          "Ḍābiṭ 1 — Moments où le siwāk est fortement recommandé (6) :\n1. Lors du wuḍū'.\n2. Avant la prière.\n3. Au réveil.\n4. Avant la lecture du Coran.\n5. En entrant à la maison.\n6. Quand l'haleine change.\n\nḌābiṭ 2 — Les 5 actes de la fiṭra :\n1. L'istiḥdād (se raser le pubis).\n2. Le khitān (circoncision).\n3. Le qass al-shārib (tailler la moustache).\n4. Le taqlīm al-aẓfār (couper les ongles).\n5. Le natf al-ibṭ (épiler les aisselles).",
      },
      {
        bab: "باب الوضوء",
        title: "Bāb al-Wuḍū' — Les ablutions",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Les obligations du wuḍū' (6) :\n1. Laver le visage (de la basmala de la bouche au nez inclus).\n2. Laver les mains et avant-bras jusqu'aux coudes.\n3. Essuyer la tête et les oreilles.\n4. Laver les pieds jusqu'aux chevilles.\n5. Le tartīb (ordre).\n6. La muwālāt (enchaînement sans interruption).\n\nḌābiṭ 2 — Les conditions de validité du wuḍū' (7) :\n1. Cessation de ce qui l'oblige (ex: l'urine doit s'arrêter).\n2. L'islam.\n3. La niyya (intention).\n4. La raison.\n5. Le tamyīz (discernement).\n6. L'eau ṭahūr.\n7. L'absence de ce qui empêche l'eau d'atteindre la peau.\n\nḌābiṭ 3 — Les sunan du wuḍū' (8) :\n1. La tasmiya (basmala).\n2. Le siwāk.\n3. Commencer par le rinçage de la bouche et du nez avant le visage.\n4. Commencer par la droite avant la gauche.\n5. Laver 3 fois (la 2e et 3e fois).\n6. Le dalk (frotter les membres).\n7. Le du'ā' après le wuḍū'.",
      },
      {
        bab: "باب المسح على الخفين",
        title: "Bāb al-Masḥ 'alā al-Khuffayn",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions du masḥ sur les khuff :\n- Les avoir enfilés en état de pureté.\n- Qu'ils couvrent les pieds jusqu'aux chevilles.\n- Qu'ils soient purs.\n\nḌābiṭ 2 — Annulatifs du masḥ (3) :\n1. Le ḥadath al-akbar (grande impureté).\n2. L'expiration du délai.\n3. Le retrait du khuff.\n\nḌābiṭ 3 — Durée : le résident essuie un jour et une nuit, le voyageur trois jours et trois nuits.",
      },
      {
        bab: "باب نواقض الوضوء",
        title: "Bāb Nawāqiḍ al-Wuḍū'",
        dapibt: "2 ضوابط",
        content:
          "Ḍābiṭ 1 — Les annulatifs du wuḍū' (6) :\n1. Ce qui sort des deux voies naturelles.\n2. La perte de raison ou sa mise en veille (évanouissement, sommeil profond).\n3. Toucher le sexe avec l'intérieur de la paume.\n4. Manger de la viande de chameau.\n5. La ridda (apostasie).\n6. Laver un mort (selon un avis).\n\nḌābiṭ 2 — Ce qui est interdit sans wuḍū' (5) :\n1. La prière.\n2. Le ṭawāf.\n3. Toucher le muṣḥaf.\n4. La ridda.\n5. (variable selon les savants).",
      },
      {
        bab: "باب الغسل",
        title: "Bāb al-Ghusl — Les grandes ablutions",
        dapibt: "4 ضوابط",
        content:
          "Ḍābiṭ 1 — Ce qui rend le ghusl obligatoire (5) :\n1. La sortie du manī (sperme).\n2. La pénétration (rencontre des deux circoncisions).\n3. Les menstrues (ḥayḍ).\n4. Les lochies (nifās).\n5. L'entrée en islam du mécréant.\n\nḌābiṭ 2 — Conditions de validité du ghusl (7) :\n1. La niyya.\n2. L'islam.\n3. Cessation de ce qui l'oblige.\n4. La raison.\n5. L'eau ṭahūr.\n6. Le tamyīz.\n7. L'absence de ce qui empêche l'eau d'atteindre la peau.\n\nḌābiṭ 3 — L'obligation du ghusl (1) :\nFaire parvenir l'eau à tout le corps (ta'mīm al-badan bi-l-mā').\n\nḌābiṭ 4 — Les sunan du ghusl (7) :\n1. Enlever les impuretés d'abord.\n2. Faire le wuḍū' avant (en laissant les pieds).\n3. Laver les membres 3 fois.\n4. Commencer par la droite (tayāmun).\n5. La muwālāt.\n6. Le dalk (frotter).\n7. Laver les pieds à la fin.",
      },
      {
        bab: "باب التيمم",
        title: "Bāb al-Tayammum",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions de validité du tayammum (6) :\n1. La niyya.\n2. L'islam.\n3. La raison.\n4. Le tamyīz.\n5. L'absence d'eau ou l'impossibilité de l'utiliser.\n6. Utiliser un sol pur ayant de la poussière (ṣa'īd ṭāhir).\n\nḌābiṭ 2 — Les obligations du tayammum (3) :\n1. Essuyer le visage.\n2. Essuyer les mains jusqu'aux coudes (selon un avis : jusqu'aux poignets).\n3. La muwālāt.\n\nḌābiṭ 3 — Ce qui annule le tayammum :\n1. Tout ce qui annule le wuḍū'.\n2. La présence d'eau (disparition de l'excuse).",
      },
      {
        bab: "باب إزالة النجاسة",
        title: "Bāb Izālat al-Najāsa",
        dapibt: "4 ضوابط",
        content:
          "Ḍābiṭ 1 : La najāsa est une substance jugée impure par la sharī'a. Son impureté disparaît avec la disparition de ses traces, même si l'odeur ou la couleur persiste.\nḌābiṭ 2 : Il n'est pas exigé de nombre précis ni d'ordre dans le lavage, sauf pour la salive du chien dans un récipient : on lave 7 fois dont une avec de la terre.\nḌābiṭ 3 : L'urine du garçon qui ne mange pas encore : on l'asperge (naḍḥ). L'urine de la fille : on lave.\nḌābiṭ 4 : La transformation (istiḥāla) purifie.",
      },
      {
        bab: "باب الحيض",
        title: "Bāb al-Ḥayḍ — Les menstrues",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Les sangs qui sortent de la femme sont de 3 types :\n1. Ḥayḍ (menstrues).\n2. Nifās (lochies).\n3. Istiḥāḍa (saignement irrégulier).\n\nḌābiṭ 2 — Ce qui est interdit pendant le ḥayḍ (6) :\n1. Le rapport intime.\n2. Le divorce.\n3. La prière.\n4. Le jeûne.\n5. Le ṭawāf.\n6. Rester dans la mosquée.\n\nḌābiṭ 3 — Après l'arrêt du sang et avant le ghusl, 3 choses deviennent permises :\n1. Le jeûne.\n2. Le divorce.\n3. (Le 3e point varie selon les savants).",
      },
    ],
    flashcards: [
      {
        q: "Quelles sont les 3 catégories d'eau ?",
        a: "Ṭahūr (purificatrice), Ṭāhira (pure non purificatrice — mélangée à un élément pur), Najisa (impure — une impureté a changé sa couleur, odeur ou goût).",
      },
      {
        q: "Quels récipients sont interdits ?",
        a: "Les récipients en or et en argent.",
      },
      {
        q: "Combien de choses sont interdites lors des besoins naturels ?",
        a: "6 : s'orienter vers la qibla sans écran, voie publique/ombre/points d'eau, eau stagnante, trous, emporter le dhikr, se nettoyer de la main droite.",
      },
      {
        q: "Quelles sont les 6 obligations du wuḍū' ?",
        a: "Laver le visage, laver les mains/avant-bras aux coudes, essuyer la tête et oreilles, laver les pieds aux chevilles, le tartīb (ordre), la muwālāt (enchaînement).",
      },
      {
        q: "Combien de conditions de validité pour le wuḍū' ?",
        a: "7 : cessation de ce qui l'oblige, islam, niyya, raison, tamyīz, eau ṭahūr, absence d'obstacle sur la peau.",
      },
      {
        q: "Quels sont les annulatifs du wuḍū' ?",
        a: "6 : sortie des deux voies, perte de raison/sommeil profond, toucher le sexe (intérieur paume), viande de chameau, ridda, laver un mort.",
      },
      {
        q: "Qu'est-ce qui rend le ghusl obligatoire ?",
        a: "5 choses : sortie du manī, pénétration, ḥayḍ, nifās, entrée en islam du mécréant.",
      },
      {
        q: "Quelle est l'unique obligation du ghusl ?",
        a: "Ta'mīm al-badan bi-l-mā' : faire parvenir l'eau à tout le corps.",
      },
      {
        q: "Quelles sont les 6 conditions du tayammum ?",
        a: "Niyya, islam, raison, tamyīz, absence d'eau/impossibilité, sol pur avec poussière.",
      },
      {
        q: "Quelles sont les 5 khiṣāl al-fiṭra ?",
        a: "Istiḥdād (raser le pubis), khitān (circoncision), qass al-shārib (moustache), taqlīm al-aẓfār (ongles), natf al-ibṭ (aisselles).",
      },
      {
        q: "Combien de temps dure le masḥ sur les khuff ?",
        a: "Résident : 1 jour et 1 nuit. Voyageur : 3 jours et 3 nuits.",
      },
      {
        q: "Qu'est-ce qui est interdit pendant le ḥayḍ ?",
        a: "6 choses : rapport intime, divorce, prière, jeûne, ṭawāf, rester dans la mosquée.",
      },
    ],
    quiz: [
      {
        question: "Combien de catégories d'eau y a-t-il ?",
        options: ["2", "3", "4", "5"],
        correct: 1,
      },
      {
        question: "Combien d'obligations (furūḍ) comporte le wuḍū' ?",
        options: ["4", "5", "6", "7"],
        correct: 2,
      },
      {
        question: "Le tartīb et la muwālāt dans le wuḍū' sont…",
        options: ["Des sunan", "Des obligations (furūḍ)", "Des mustahabb", "Des conditions"],
        correct: 1,
      },
      {
        question: "Combien de choses rendent le ghusl obligatoire ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
      },
      {
        question: "Quelle est l'unique obligation (farḍ) du ghusl ?",
        options: ["La niyya", "Le wuḍū' avant", "Faire parvenir l'eau à tout le corps", "Le dalk"],
        correct: 2,
      },
      {
        question: "Durée du masḥ pour le voyageur ?",
        options: ["1 jour et 1 nuit", "2 jours et 2 nuits", "3 jours et 3 nuits", "Illimité"],
        correct: 2,
      },
      {
        question: "Combien d'annulatifs du wuḍū' ?",
        options: ["4", "5", "6", "8"],
        correct: 2,
      },
      {
        question: "L'urine du garçon qui ne mange pas encore, on…",
        options: ["La lave obligatoirement", "L'asperge (naḍḥ)", "On ne fait rien", "On frotte avec de la terre"],
        correct: 1,
      },
      {
        question: "Combien de conditions de validité pour le tayammum ?",
        options: ["4", "5", "6", "7"],
        correct: 2,
      },
      {
        question: "Le siwāk est recommandé dans combien de situations ?",
        options: ["4", "5", "6", "8"],
        correct: 2,
      },
    ],
  },
  {
    id: "salat",
    title: "كتاب الصلاة",
    subtitle: "Kitāb al-Ṣalāt — La prière",
    icon: "🕌",
    color: "#2D6B46",
    sections: [
      {
        bab: "باب الأذان والإقامة",
        title: "Bāb al-Adhān wa al-Iqāma",
        dapibt: "2 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions de validité de l'adhān (10) :\n1. La niyya.\n2. Être musulman.\n3. Être de sexe masculin.\n4. Après l'entrée du temps (sauf pour le fajr).\n5. Le tartīb (ordre).\n6. La muwālāt.\n7. Connaître les horaires.\n8. Être sur un lieu élevé.\n9. Être debout.\n10. En élevant la voix, les doigts dans les oreilles.\n\nḌābiṭ 2 — Sunan de l'adhān : se tourner à droite et à gauche pour « ḥayya 'alā al-ṣalāt / ḥayya 'alā al-falāḥ ».",
      },
      {
        bab: "باب شروط الصلاة",
        title: "Bāb Shurūṭ al-Ṣalāt — Conditions de validité",
        dapibt: "ضابط واحد",
        content:
          "Les conditions de validité de la prière sont 9 :\n1. L'islam.\n2. La raison.\n3. Le tamyīz.\n4. L'entrée du temps.\n5. La ṭahāra (pureté rituelle) si on en est capable.\n6. Couvrir la 'awra si on en est capable.\n7. Éviter la najāsa sur le corps, le vêtement et le lieu, si on en est capable.\n8. S'orienter vers la qibla.\n9. La niyya.",
      },
      {
        bab: "باب أحكام الصلاة",
        title: "Bāb Aḥkām al-Ṣalāt — Règles de la prière",
        dapibt: "7 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions d'obligation de la prière (5) :\n1. L'islam.\n2. La raison.\n3. La puberté (bulūgh).\n4. L'absence de menstrues/lochies.\n5. Parvenance de l'appel.\n\nḌābiṭ 2 — Les piliers (arkān) de la prière (14) :\n1. Le qiyām (station debout).\n2. Takbīrat al-iḥrām.\n3. Récitation de la Fātiḥa.\n4. Le rukū' (inclinaison).\n5. Le relèvement du rukū'.\n6. L'i'tidāl (se tenir droit debout).\n7. Le sujūd (prosternation).\n8. Le relèvement du sujūd.\n9. La position assise entre les 2 prosternations.\n10. La ṭuma'nīna (sérénité) dans tous.\n11. Le tashahhud final.\n12. La position assise pour le taslīm.\n13. Le premier taslīm.\n14. Le tartīb (ordre).\n\nḌābiṭ 3 — Les actes obligatoires (wājibāt) de la prière (8) :\n1. Les takbīrāt de transition.\n2. Le tasbīḥ du rukū' (subḥāna rabbiya al-'aẓīm) 1 fois.\n3. Sami'a Allāhu li-man ḥamidah.\n4. Rabbanā wa laka al-ḥamd.\n5. Le tasbīḥ du sujūd (subḥāna rabbiya al-a'lā) 1 fois.\n6. Rabbi ighfir lī entre les 2 sujūd.\n7. Le tashahhud al-awwal.\n8. La position assise pour le tashahhud al-awwal.\n\nḌābiṭ 4 — Sunan des paroles (13) :\n1. Du'ā' al-istiftāḥ.\n2. L'isti'ādha.\n3. La basmala.\n4. Le ta'mīn (āmīn).\n5. La récitation d'une sourate après la Fātiḥa.\n6. Le takbīr de la récitation (pour l'imam).\n7. Ce qui dépasse 1 fois dans le tasbīḥ du rukū'.\n8. Ce qui dépasse « rabbanā wa laka al-ḥamd ».\n9. Ce qui dépasse 1 fois dans le tasbīḥ du sujūd.\n10. Ce qui dépasse « rabbi ighfir lī » entre les sujūd.\n11. L'isti'ādha des 4 choses après le tashahhud final.\n12. Le second taslīm.\n13. Prier sur le Prophète ﷺ dans le tashahhud.\n\nḌābiṭ 5 — Sunan des actes (18) :\n1. Lever les mains dans 4 positions.\n2. Poser la droite sur la gauche sur la poitrine.\n3. Regarder vers le lieu de prosternation.\n4. Saisir les genoux dans le rukū'.\n5. Étendre le dos et aligner la tête dans le rukū'.\n6. Poser les 7 membres de prosternation au sol.\n7. Écarter les bras du corps dans le sujūd.\n8. Écarter les cuisses du ventre.\n9. Écarter les cuisses des jambes.\n10. Orienter les orteils vers la qibla.\n11. Poser les mains à hauteur des épaules, doigts joints.\n12. L'iftirāsh entre les 2 sujūd et dans le 1er tashahhud.\n13. Le tawarruk dans le tashahhud final.\n14. Poser les mains sur les cuisses, doigts joints.\n15. Faire un anneau avec le pouce et le majeur dans les 2 tashahhud.\n16. Pointer l'index droit dans les 2 tashahhud.\n17. L'iltifāt à droite et à gauche pour les 2 taslīm.\n18. Être bref dans la position assise entre les 2 sujūd.",
      },
      {
        bab: "مكروهات الصلاة ومبطلاتها",
        title: "Makrūhāt et Mubṭilāt",
        dapibt: "2 parties",
        content:
          "Ḍābiṭ 6 — Choses détestables dans la prière (19 makrūhāt) :\n1. Délaisser une sunna volontairement.\n2. Se retourner sans besoin.\n3. Faire craquer les doigts.\n4. Retrousser le vêtement ou les cheveux.\n5. Prier quand le repas est servi.\n6. Prier en retenant les 2 akhbathayn (urine/selles).\n7. Sans sutra pour l'imam et celui qui prie seul.\n8. Le sadl (laisser pendre le vêtement).\n9. Cracher vers la qibla ou à sa droite.\n10. Lever le regard au ciel.\n… et d'autres.\n\nḌābiṭ 7 — Ce qui annule la prière (mubṭilāt) :\n1. Délaisser volontairement un rukn ou une condition sans excuse.\n2. Manger ou boire volontairement.\n3. Parler volontairement.\n4. Beaucoup de mouvements étrangers à la prière.\n5. Ajouter volontairement un rukn (acte physique).\n6. Passage d'une femme pubère, d'un âne ou d'un chien noir devant le lieu de prosternation.\n7. Prier derrière un imam dont l'imāma n'est pas valable.",
      },
      {
        bab: "باب سجود السهو",
        title: "Bāb Sujūd al-Sahw — Prosternation de l'oubli",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Les causes du sujūd al-sahw sont 3 :\n1. Un manque (naqṣ).\n2. Un ajout (ziyāda).\n3. Un doute (shakk).\n\nḌābiṭ 2 — Quand faire le sujūd :\n1. Si c'est un manque → avant le salām.\n2. Si c'est un ajout → après le salām.\n3. Si c'est un doute → 2 cas :\n   a. Doute avec construction sur le certain (yaqīn) → avant le salām.\n   b. Doute avec prédominance (ghalaba al-ẓann) → après le salām.\n\nḌābiṭ 3 : Le sujūd al-sahw concerne le wājib et la sunna, pas le rukn (le rukn doit être refait).",
      },
      {
        bab: "باب صلاة الجماعة",
        title: "Bāb Ṣalāt al-Jamā'a — La prière en groupe",
        dapibt: "3 ضوابط",
        content:
          "Ḍābiṭ 1 — Ce que l'imam prend en charge pour le ma'mūm (6) :\n1. La récitation de la Fātiḥa (dans les prières à voix haute — divergence).\n2. Le sujūd al-sahw.\n3. Le sujūd al-tilāwa.\n4. La sutra.\n5. Le du'ā' du qunūt.\n6. Le tashahhud al-awwal pour le masbūq.\n\nḌābiṭ 2 — Les 4 positions du ma'mūm par rapport à l'imam :\n1. Musāwāt (prier en même temps) → makrūh.\n2. Takhalluf (retard) → makrūh.\n3. Musābaqa (devancer) → ḥarām.\n4. Mutāba'a (suivre) → c'est la sunna.\n\nḌābiṭ 3 — Excuses pour manquer la jumu'a et la jamā'a (7) :\n1. La maladie.\n2. La peur.\n3. S'occuper d'un malade.\n4. Craindre pour ses biens.\n5. La pluie forte ou le vent violent.\n6. L'imam prolonge trop la prière.\n7. L'imam raccourcit trop la prière.",
      },
      {
        bab: "باب صلاة الجمعة",
        title: "Bāb Ṣalāt al-Jumu'a — La prière du vendredi",
        dapibt: "2 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions d'obligation de la jumu'a (6) :\n1. L'islam.\n2. La puberté.\n3. Être de sexe masculin.\n4. La liberté.\n5. La résidence.\n6. L'absence d'excuse valable.\n\nḌābiṭ 2 — Conditions de validité de la jumu'a :\n1. Les conditions de validité de la prière.\n2. L'entrée du temps.\n3. Le nombre requis.\n4. Les deux khuṭba.",
      },
    ],
    flashcards: [
      {
        q: "Combien de conditions de validité pour la prière ?",
        a: "9 : islam, raison, tamyīz, entrée du temps, ṭahāra, couvrir la 'awra, éviter la najāsa, qibla, niyya.",
      },
      {
        q: "Combien de piliers (arkān) comporte la prière ?",
        a: "14 : qiyām, takbīrat al-iḥrām, Fātiḥa, rukū', relèvement, i'tidāl, sujūd, relèvement, assise entre sujūd, ṭuma'nīna, tashahhud final, assise pour taslīm, 1er taslīm, tartīb.",
      },
      {
        q: "Combien de wājibāt dans la prière ?",
        a: "8 : takbīrāt de transition, tasbīḥ du rukū', sami'a Allāhu li-man ḥamidah, rabbanā wa laka al-ḥamd, tasbīḥ du sujūd, rabbi ighfir lī, tashahhud al-awwal, assise pour celui-ci.",
      },
      {
        q: "Conditions d'obligation de la prière ?",
        a: "5 : islam, raison, puberté, absence de menstrues/lochies, parvenance de l'appel.",
      },
      {
        q: "Quand fait-on le sujūd al-sahw AVANT le salām ?",
        a: "En cas de manque (naqṣ) ou de doute avec construction sur le certain (yaqīn).",
      },
      {
        q: "Quand fait-on le sujūd al-sahw APRÈS le salām ?",
        a: "En cas d'ajout (ziyāda) ou de doute avec prédominance (ghalaba al-ẓann).",
      },
      {
        q: "Quelle est la sunna pour le ma'mūm avec l'imam ?",
        a: "La mutāba'a (suivre l'imam). La musābaqa (devancer) est ḥarām.",
      },
      {
        q: "Combien de conditions pour l'adhān ?",
        a: "10 : niyya, musulman, homme, après l'heure (sauf fajr), tartīb, muwālāt, connaître les horaires, lieu élevé, debout, voix forte.",
      },
      {
        q: "Conditions d'obligation de la jumu'a ?",
        a: "6 : islam, puberté, sexe masculin, liberté, résidence, absence d'excuse.",
      },
      {
        q: "Combien de sunan des actes dans la prière ?",
        a: "18 sunan af'āl.",
      },
    ],
    quiz: [
      {
        question: "Combien de conditions de validité pour la prière ?",
        options: ["7", "8", "9", "10"],
        correct: 2,
      },
      {
        question: "Combien de piliers (arkān) dans la prière ?",
        options: ["10", "12", "14", "16"],
        correct: 2,
      },
      {
        question: "Les takbīrāt de transition sont…",
        options: ["Un rukn", "Un wājib", "Une sunna", "Un mustaḥabb"],
        correct: 1,
      },
      {
        question: "Devancer l'imam (musābaqa) est…",
        options: ["Makrūh", "Ḥarām", "Mubāḥ", "Une sunna"],
        correct: 1,
      },
      {
        question: "Sujūd al-sahw pour un ajout (ziyāda) se fait…",
        options: ["Avant le salām", "Après le salām", "Au choix", "On refait la prière"],
        correct: 1,
      },
      {
        question: "Combien de wājibāt dans la prière ?",
        options: ["5", "6", "8", "10"],
        correct: 2,
      },
      {
        question: "L'adhān a combien de conditions ?",
        options: ["6", "8", "10", "12"],
        correct: 2,
      },
      {
        question: "Parler volontairement dans la prière…",
        options: ["Est makrūh", "Annule la prière", "Oblige un sujūd al-sahw", "N'affecte rien"],
        correct: 1,
      },
    ],
  },
  {
    id: "zakat",
    title: "كتاب الزكاة",
    subtitle: "Kitāb al-Zakāt — L'aumône obligatoire",
    icon: "🌾",
    color: "#8B6914",
    sections: [
      {
        bab: "كتاب الزكاة",
        title: "Les 6 ḍawābiṭ de la Zakāt",
        dapibt: "6 ضوابط",
        content:
          "Ḍābiṭ 1 — Biens soumis à la zakāt (5) :\n1. Les athman (or, argent, monnaie).\n2. Les bêtes de troupeau (chameaux, bovins, ovins/caprins).\n3. Les produits de la terre.\n4. Les marchandises de commerce ('urūḍ al-tijāra).\n5. Le rikāz (trésor enfoui).\n\nḌābiṭ 2 — Conditions d'obligation de la zakāt (5) :\n1. L'islam.\n2. La liberté.\n3. Posséder le niṣāb.\n4. La pleine propriété (tamām al-milk).\n5. L'écoulement du ḥawl (année lunaire) — sauf pour 4 catégories.\n\nḌābiṭ 3 — Biens qui ne nécessitent pas le ḥawl (4) :\n1. Les produits de la terre.\n2. Le rikāz.\n3. Le miel (divergence).\n4. Les minéraux.\n\nḌābiṭ 4 — Taux de la zakāt (6) :\n1. Le cinquième (1/5) : pour le rikāz.\n2. Le dixième (1/10 = 10%) : produits de la terre sans irrigation coûteuse.\n3. Le demi-dixième (1/20 = 5%) : produits irrigués avec coût.\n4. Le quart du dixième (1/40 = 2,5%) : or, argent, commerce.\n5. Un ṣā' de nourriture : pour ṣadaqat al-fiṭr.\n6. Bétail : barèmes spécifiques selon le nombre.\n\nḌābiṭ 5 — Les bénéficiaires de la zakāt (8) :\n1. Les pauvres (fuqarā').\n2. Les nécessiteux (masākīn).\n3. Ceux qui la collectent.\n4. Ceux dont les cœurs sont à rallier.\n5. L'affranchissement des esclaves (al-riqāb).\n6. Les endettés (al-ghārimūn).\n7. Dans le sentier d'Allah.\n8. Le voyageur en difficulté (ibn al-sabīl).\n\nḌābiṭ 6 — Ceux à qui on ne donne pas la zakāt (5) :\n1. Le mécréant.\n2. L'esclave.\n3. Les Banū Hāshim.\n4. Celui dont on a la charge (que l'on nourrit déjà).\n5. Le riche.",
      },
    ],
    flashcards: [
      {
        q: "Quels sont les 5 types de biens soumis à la zakāt ?",
        a: "Athman (or/argent/monnaie), bétail, produits de la terre, marchandises de commerce, rikāz (trésor enfoui).",
      },
      {
        q: "Quelles sont les 5 conditions d'obligation de la zakāt ?",
        a: "Islam, liberté, posséder le niṣāb, pleine propriété (tamām al-milk), écoulement du ḥawl (sauf 4 exceptions).",
      },
      {
        q: "Quels biens n'exigent pas le ḥawl ?",
        a: "Les produits de la terre, le rikāz, le miel (divergence), les minéraux.",
      },
      {
        q: "Quel est le taux de zakāt sur l'or et l'argent ?",
        a: "Le quart du dixième (1/40) = 2,5%.",
      },
      {
        q: "Quel taux pour les récoltes irriguées naturellement ?",
        a: "Le dixième (1/10) = 10%.",
      },
      {
        q: "Quel taux pour les récoltes irriguées avec coût ?",
        a: "Le demi-dixième (1/20) = 5%.",
      },
      {
        q: "Quel taux pour le rikāz ?",
        a: "Le cinquième (1/5) = 20%.",
      },
      {
        q: "Quelles sont les 8 catégories de bénéficiaires ?",
        a: "Fuqarā', masākīn, collecteurs, cœurs à rallier, affranchissement, endettés, fī sabīl Allāh, ibn al-sabīl.",
      },
      {
        q: "À qui ne donne-t-on PAS la zakāt ?",
        a: "5 : le mécréant, l'esclave, les Banū Hāshim, celui dont on a la charge, le riche.",
      },
      {
        q: "Quelle est la zakāt al-fiṭr ?",
        a: "Un ṣā' de nourriture par personne du foyer, avant la prière de l'Aïd.",
      },
    ],
    quiz: [
      {
        question: "Combien de types de biens sont soumis à la zakāt ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
      },
      {
        question: "Le ḥawl est-il requis pour le rikāz ?",
        options: ["Oui", "Non", "Divergence", "Seulement si grande quantité"],
        correct: 1,
      },
      {
        question: "Taux de zakāt sur les marchandises de commerce ?",
        options: ["5%", "10%", "2,5%", "20%"],
        correct: 2,
      },
      {
        question: "Taux de zakāt pour le rikāz ?",
        options: ["2,5%", "5%", "10%", "20%"],
        correct: 3,
      },
      {
        question: "Combien de bénéficiaires de la zakāt ?",
        options: ["5", "6", "7", "8"],
        correct: 3,
      },
      {
        question: "Combien de conditions d'obligation ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
      },
    ],
  },
  {
    id: "siyam",
    title: "كتاب الصيام",
    subtitle: "Kitāb al-Ṣiyām — Le jeûne",
    icon: "🌙",
    color: "#6B46A0",
    sections: [
      {
        bab: "كتاب الصيام",
        title: "Les 6 ḍawābiṭ du Jeûne",
        dapibt: "6 ضوابط",
        content:
          "Ḍābiṭ 1 — Conditions d'obligation du jeûne (6) :\n1. L'entrée du mois (de Ramadan).\n2. L'islam.\n3. La puberté (bulūgh).\n4. La raison.\n5. La capacité de jeûner.\n6. La résidence (iqāma).\n\nḌābiṭ 2 — Conditions de validité du jeûne (6) :\n1. L'islam.\n2. La raison.\n3. Le tamyīz.\n4. La niyya.\n5. L'arrêt du sang des menstrues (ḥayḍ).\n6. L'arrêt du sang des lochies (nifās).\n\nḌābiṭ 3 — Sunan du jeûne (6) :\n1. La rupture sur des dattes fraîches, sinon sèches, sinon de l'eau.\n2. Retarder le suḥūr.\n3. Augmenter les bonnes œuvres.\n4. Dire quand on est insulté : « innī ṣā'im » (je suis en jeûne).\n5. L'invocation au moment de la rupture.\n6. Hâter la rupture dès le coucher du soleil.\n\nḌābiṭ 4 — Ce qui rompt le jeûne (7 muftirāt) :\n1. Manger ou boire volontairement.\n2. Le rapport intime volontairement.\n3. Le vomissement provoqué.\n4. L'istimna' (provoquer l'éjaculation).\n5. La rupture délibérée (al-'amd).\n6. Les menstrues et les lochies.\n7. L'apostasie (ridda).\n\nḌābiṭ 5 — Jours où il est recommandé de jeûner (9) :\n1. Un jour sur deux (jeûne de Dāwūd).\n2. Le jour de 'Arafa (pour le non-pèlerin).\n3. Tāsū'ā' et 'Āshūrā'.\n4. Le lundi et le jeudi.\n5. 3 jours de chaque mois (13, 14, 15 — ayyām al-bīḍ).\n6. Les 6 jours de Shawwāl.\n7. La majorité de Sha'bān.\n8. Le mois de Muḥarram.\n9. Les 10 premiers jours de Dhū al-Ḥijja.\n\nḌābiṭ 6 — Jours où il est interdit de jeûner (8) :\n1. Les deux 'Īd.\n2. Les jours de tashrīq (sauf pour qui n'a pas de hadī).\n3. Jeûner le vendredi seul.\n4. Jeûner le samedi seul.\n5. Le doute (yawm al-shakk — 30 Sha'bān si non confirmé).\n6. La femme qui jeûne alors que son mari est présent, sans sa permission (hors Ramadan).\n7. Le jour de 'Arafa pour le pèlerin.\n8. Le jeûne continu sans rupture (wiṣāl).",
      },
    ],
    flashcards: [
      {
        q: "Combien de conditions d'obligation du jeûne ?",
        a: "6 : entrée du mois, islam, puberté, raison, capacité, résidence.",
      },
      {
        q: "Combien de conditions de validité du jeûne ?",
        a: "6 : islam, raison, tamyīz, niyya, arrêt du ḥayḍ, arrêt du nifās.",
      },
      {
        q: "Quels sont les 7 muftirāt (ce qui rompt le jeûne) ?",
        a: "Manger/boire volontairement, rapport intime volontaire, vomissement provoqué, istimna', rupture délibérée, ḥayḍ/nifās, ridda.",
      },
      {
        q: "Quelles sont les 6 sunan du jeûne ?",
        a: "Rompre sur dattes/eau, retarder le suḥūr, augmenter les bonnes œuvres, dire « innī ṣā'im », du'ā' à la rupture, hâter la rupture.",
      },
      {
        q: "Sur quoi est-il sunna de rompre le jeûne ?",
        a: "Des dattes fraîches (ruṭab), sinon des dattes sèches (tamr), sinon de l'eau.",
      },
      {
        q: "Combien de jours recommandés pour le jeûne ?",
        a: "9 : un jour/deux, 'Arafa, Tāsū'ā'/Āshūrā', lundi/jeudi, ayyām al-bīḍ, 6 de Shawwāl, Sha'bān, Muḥarram, 10 de Dhū al-Ḥijja.",
      },
      {
        q: "Combien de jours interdits de jeûne ?",
        a: "8 : les 2 'Īd, jours de tashrīq, vendredi seul, samedi seul, yawm al-shakk, femme sans permission du mari, 'Arafa pour le ḥājj, wiṣāl.",
      },
      {
        q: "Le vomissement involontaire rompt-il le jeûne ?",
        a: "Non. Seul le vomissement provoqué volontairement rompt le jeûne.",
      },
      {
        q: "Peut-on jeûner le vendredi seul ?",
        a: "Non, c'est interdit (nahī). Il faut jeûner le jeudi avec ou le samedi avec.",
      },
      {
        q: "Qu'est-ce que le yawm al-shakk ?",
        a: "Le 30 Sha'bān quand on n'a pas confirmé l'entrée de Ramadan. Il est interdit de le jeûner par précaution.",
      },
    ],
    quiz: [
      {
        question: "Combien de conditions d'obligation du jeûne ?",
        options: ["4", "5", "6", "7"],
        correct: 2,
      },
      {
        question: "Combien de muftirāt (ce qui rompt le jeûne) ?",
        options: ["5", "6", "7", "8"],
        correct: 2,
      },
      {
        question: "L'istimna' (provoquer l'éjaculation) pendant le jeûne…",
        options: [
          "Ne rompt pas le jeûne",
          "Rompt le jeûne",
          "Est seulement makrūh",
          "Dépend de l'intention",
        ],
        correct: 1,
      },
      {
        question: "Combien de jours est-il interdit de jeûner ?",
        options: ["5", "6", "7", "8"],
        correct: 3,
      },
      {
        question: "Sur quoi rompt-on le jeûne en priorité ?",
        options: ["De l'eau", "Des dattes fraîches (ruṭab)", "Du lait", "N'importe quel aliment"],
        correct: 1,
      },
      {
        question: "La ridda (apostasie) pendant le jeûne…",
        options: [
          "N'a pas d'effet",
          "Rompt le jeûne",
          "Oblige la kaffāra seulement",
          "Annule seulement la récompense",
        ],
        correct: 1,
      },
      {
        question: "Combien de sunan du jeûne ?",
        options: ["4", "5", "6", "8"],
        correct: 2,
      },
    ],
  },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color }) {
  return (
    <div
      style={{
        background: "#E8E0D4",
        borderRadius: 100,
        height: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: color,
          height: "100%",
          width: `${Math.min(100, Math.round((value / max) * 100))}%`,
          borderRadius: 100,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}

function ChapterCard({ chapter, stats, onSelect }) {
  const total = chapter.flashcards.length + chapter.quiz.length;
  const done =
    (stats?.flashcardsSeen > 0 ? 1 : 0) +
    (stats?.quizCorrect > 0 ? 1 : 0);
  return (
    <button
      onClick={() => onSelect(chapter.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        padding: "16px 14px",
        background: "white",
        border: "1px solid #E2DAD0",
        borderRadius: 14,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: chapter.color + "12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        {chapter.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-amiri), 'Amiri', serif",
            fontSize: 18,
            fontWeight: 700,
            color: chapter.color,
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {chapter.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#8C8478",
            marginTop: 2,
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}
        >
          {chapter.subtitle}
        </div>
        <div style={{ marginTop: 8 }}>
          <ProgressBar value={done} max={total} color={chapter.color} />
        </div>
      </div>
      <div style={{ color: "#C4B9A8", fontSize: 18, flexShrink: 0 }}>›</div>
    </button>
  );
}

function TabBar({ tabs, active, onChange, color }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#EEEAE3",
        borderRadius: 11,
        padding: 3,
        gap: 2,
        marginBottom: 18,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            padding: "9px 4px",
            border: "none",
            borderRadius: 9,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: active === t.id ? 600 : 400,
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
            background: active === t.id ? "white" : "transparent",
            color: active === t.id ? color : "#8C8478",
            boxShadow:
              active === t.id ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
            transition: "all 0.2s",
          }}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}

function SummaryView({ chapter }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {chapter.sections.map((s, i) => (
        <div
          key={i}
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2DAD0",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            style={{
              width: "100%",
              padding: "14px 14px",
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: chapter.color + "14",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: chapter.color,
                flexShrink: 0,
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: chapter.color,
                  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#B0A898",
                  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                }}
              >
                {s.dapibt}
              </div>
            </div>
            <span
              style={{
                color: "#C4B9A8",
                fontSize: 14,
                transform: openIdx === i ? "rotate(90deg)" : "none",
                transition: "transform 0.2s",
              }}
            >
              ›
            </span>
          </button>
          {openIdx === i && (
            <div
              style={{
                padding: "0 14px 14px",
                fontSize: 13,
                lineHeight: 1.7,
                color: "#4A4540",
                whiteSpace: "pre-line",
                fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
                borderTop: "1px solid #F0ECE6",
              }}
            >
              <div style={{ paddingTop: 12 }}>{s.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlashcardView({ chapter, onUpdateStats }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = chapter.flashcards[index];
  const total = chapter.flashcards.length;

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % total);
      onUpdateStats((prev) => ({
        ...prev,
        [chapter.id]: {
          ...prev[chapter.id],
          flashcardsSeen: Math.min(
            total,
            (prev[chapter.id]?.flashcardsSeen || 0) + 1
          ),
        },
      }));
    }, 150);
  }, [total, chapter.id, onUpdateStats]);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#8C8478",
          marginBottom: 10,
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          fontWeight: 500,
        }}
      >
        Carte {index + 1} / {total}
      </div>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          background: flipped ? chapter.color + "08" : "white",
          border: `1.5px solid ${flipped ? chapter.color + "30" : "#E2DAD0"}`,
          borderRadius: 14,
          padding: "28px 18px",
          minHeight: 180,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all 0.3s",
        }}
      >
        {!flipped ? (
          <>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: "#B0A898",
                marginBottom: 14,
                fontWeight: 600,
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
              }}
            >
              Question
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#2D2A24",
                fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
              }}
            >
              {card.q}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#C4B9A8",
                marginTop: 18,
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
              }}
            >
              Touche pour voir la réponse
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: chapter.color,
                marginBottom: 14,
                fontWeight: 600,
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
              }}
            >
              Réponse
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: "#4A4540",
                fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
              }}
            >
              {card.a}
            </div>
          </>
        )}
      </div>
      <div
        style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}
      >
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((p) => (p - 1 + total) % total);
          }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            border: "1px solid #E2DAD0",
            background: "white",
            cursor: "pointer",
            fontSize: 16,
            color: "#8C8478",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <button
          onClick={next}
          style={{
            flex: 1,
            maxWidth: 180,
            height: 44,
            borderRadius: 11,
            border: "none",
            background: chapter.color,
            color: "white",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}

function QuizView({ chapter, onUpdateStats }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = chapter.quiz[qIdx];
  const total = chapter.quiz.length;

  const handleSelect = (i) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (qIdx + 1 >= total) {
      setFinished(true);
      onUpdateStats((prev) => ({
        ...prev,
        [chapter.id]: {
          ...prev[chapter.id],
          quizCorrect: score + (selected === q.correct ? 1 : 0),
          quizTotal: total,
        },
      }));
    } else {
      setSelected(null);
      setShowResult(false);
      setQIdx((i) => i + 1);
    }
  };
  const restart = () => {
    setQIdx(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ textAlign: "center", padding: "36px 16px" }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>
          {pct >= 80 ? "🌟" : pct >= 50 ? "👍" : "💪"}
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: chapter.color,
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}
        >
          {score} / {total}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#8C8478",
            marginTop: 6,
            marginBottom: 24,
            fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
          }}
        >
          {pct >= 80
            ? "Excellent ! Tu maîtrises ce chapitre."
            : pct >= 50
            ? "Pas mal ! Révise les fiches et retente."
            : "Continue de réviser, tu vas y arriver in shā' Allāh."}
        </div>
        <button
          onClick={restart}
          style={{
            padding: "12px 28px",
            borderRadius: 11,
            border: "none",
            background: chapter.color,
            color: "white",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#8C8478",
          marginBottom: 6,
          fontWeight: 500,
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
        }}
      >
        Question {qIdx + 1} / {total}
      </div>
      <ProgressBar value={qIdx + 1} max={total} color={chapter.color} />
      <div
        style={{
          background: "white",
          borderRadius: 14,
          padding: "20px 16px",
          border: "1px solid #E2DAD0",
          marginTop: 14,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: 16,
            color: "#2D2A24",
            fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
          }}
        >
          {q.question}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {q.options.map((opt, i) => {
            let bg = "white",
              border = "1px solid #E2DAD0",
              tc = "#2D2A24";
            if (showResult) {
              if (i === q.correct) {
                bg = "#E8F5E9";
                border = "1.5px solid #4CAF50";
                tc = "#2E7D32";
              } else if (i === selected && i !== q.correct) {
                bg = "#FFEBEE";
                border = "1.5px solid #E57373";
                tc = "#C62828";
              }
            } else if (i === selected) {
              border = `1.5px solid ${chapter.color}`;
              bg = chapter.color + "08";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  border,
                  background: bg,
                  cursor: showResult ? "default" : "pointer",
                  textAlign: "left",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: tc,
                  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontWeight: 600, marginRight: 8, opacity: 0.35 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
      {showResult && (
        <button
          onClick={next}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "12px",
            borderRadius: 11,
            border: "none",
            background: chapter.color,
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}
        >
          {qIdx + 1 >= total ? "Voir le résultat" : "Suivante →"}
        </button>
      )}
    </div>
  );
}

function ChapterView({ chapter, onBack, stats, onUpdateStats }) {
  const [tab, setTab] = useState("summary");
  const tabs = [
    { id: "summary", label: "Fiches", icon: "📖" },
    { id: "flashcards", label: "Cartes", icon: "🔄" },
    { id: "quiz", label: "Quiz", icon: "✅" },
  ];
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          color: "#8C8478",
          marginBottom: 14,
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          padding: 0,
        }}
      >
        ← Chapitres
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: chapter.color + "12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {chapter.icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-amiri), 'Amiri', serif",
              fontSize: 20,
              fontWeight: 700,
              color: chapter.color,
              direction: "rtl",
            }}
          >
            {chapter.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8C8478",
              fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
            }}
          >
            {chapter.subtitle}
          </div>
        </div>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab} color={chapter.color} />
      {tab === "summary" && <SummaryView chapter={chapter} />}
      {tab === "flashcards" && (
        <FlashcardView chapter={chapter} onUpdateStats={onUpdateStats} />
      )}
      {tab === "quiz" && (
        <QuizView chapter={chapter} onUpdateStats={onUpdateStats} />
      )}
    </div>
  );
}

// ─── MAIN ───────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState(null);
  const [stats, setStats] = useState({});
  const chapter = CHAPTERS.find((c) => c.id === active);

  return (
    <div
      style={{
        fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
        background: "#FAF8F4",
        minHeight: "100vh",
        color: "#2D2A24",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 80px" }}>
        <div style={{ textAlign: "center", paddingTop: 28, paddingBottom: 6 }}>
          <div
            style={{
              fontFamily: "var(--font-amiri), 'Amiri', serif",
              fontSize: 30,
              fontWeight: 700,
              color: "#2D2A24",
              lineHeight: 1.2,
            }}
          >
            بِدَايَةُ المُتَفَقِّه
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#6B6358",
              marginTop: 5,
              fontFamily: "var(--font-source-serif), 'Source Serif 4', serif",
            }}
          >
            Bidāyat al-Mutafaqqih
          </div>
          <div style={{ fontSize: 11, color: "#B0A898", marginTop: 3 }}>
            Wahīd b. ʿAbd al-Salām Bālī — Révision avec Ibrahim
          </div>
        </div>
        <div
          style={{
            width: 36,
            height: 1,
            background: "#DDD5C8",
            margin: "16px auto 20px",
          }}
        />

        {!active ? (
          <>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#8C8478",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 10,
              }}
            >
              Chapitres étudiés
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CHAPTERS.map((ch) => (
                <ChapterCard
                  key={ch.id}
                  chapter={ch}
                  stats={stats[ch.id]}
                  onSelect={setActive}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                padding: "14px 16px",
                background: "#F0ECE6",
                borderRadius: 11,
                border: "1px dashed #D4CBBC",
              }}
            >
              <div style={{ fontSize: 12, color: "#8C8478", lineHeight: 1.6 }}>
                <strong style={{ color: "#6B6358" }}>💡 Méthode — 10-15 min/jour</strong>
                <br />
                ① Ouvre la fiche du chapitre (les ḍawābiṭ en accordéon)
                <br />
                ② Passe les flashcards — retourne chaque carte
                <br />
                ③ Fais le quiz quand tu te sens prêt
              </div>
            </div>
          </>
        ) : (
          <ChapterView
            chapter={chapter}
            onBack={() => setActive(null)}
            stats={stats}
            onUpdateStats={setStats}
          />
        )}
      </div>
    </div>
  );
}
