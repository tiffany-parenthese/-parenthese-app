import { useState, useEffect, useRef } from "react";

const V="#6C5CE7",VL="#EDE9FF";
// Couleurs "thémables" via CSS custom properties → dark mode sans toucher les composants
const BG="var(--c-bg,#F8FAFC)";
const BG2="var(--c-bg2,#F3F4F6)";
const TX="var(--c-tx,#2C2A3E)";
const TM="var(--c-tm,#7A7690)";
const WH="var(--c-wh,#FFFFFF)";
const BD="var(--c-bd,1px solid rgba(108,92,231,0.15))";
const GR="#27AE60",OR="#E67E22",RD="#E74C3C";
const FS={padding:"12px 14px",borderRadius:12,border:BD,fontSize:14,width:"100%",background:WH,boxSizing:"border-box"};
const FST={padding:"12px 14px",borderRadius:12,border:BD,fontSize:14,width:"100%",background:WH,boxSizing:"border-box",fontFamily:"inherit",resize:"none"};

const CATEGORIES_ACT_ALL=["Creatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"];
const ACTIVITES=[
  {id:1,nom:"Peinture avec les doigts",lieu:"interieur",energie:"fatigue",categorie:"Creatif",materiel:["peinture lavable","papier epais","tablier"],age:"2-8 ans",desc:"Une activite sensorielle parfaite.",tnd:{tsa:4,tdah:3,dys:5},duree:"20-30 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:10,visuel:30,physique:10,attention:20},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Peut se faire en silence","Rythme libre","Activité individuelle","Résultat concret","Stimulation douce","Adapté aux hypersensibles"]},

  {id:2,nom:"Chasse au tresor jardin",lieu:"exterieur",energie:"motiv",categorie:"Jeu",materiel:["tresors","indices"],age:"4-10 ans",desc:"Creez un parcours avec des enigmes.",tnd:{tsa:3,tdah:5,dys:3},duree:"30-45 min",nbEnfants:"2+ enfants",
    niveauxSensoriels:{bruit:40,visuel:60,physique:70,attention:50},
    profilsTND:{tsa:false,tdah:true,dys:false,tous:false},
    adaptations:["Résultat concret","Peut être interrompue","Activité individuelle"]},

  {id:3,nom:"Lecture sous la couette",lieu:"interieur",energie:"fatigue",categorie:"Calme",materiel:["livres","coussins"],age:"0-12 ans",desc:"Plongez dans une histoire ensemble.",tnd:{tsa:5,tdah:2,dys:4},duree:"15-20 min",nbEnfants:"1-2 enfants",
    niveauxSensoriels:{bruit:0,visuel:10,physique:0,attention:30},
    profilsTND:{tsa:true,tdah:false,dys:false,tous:false},
    adaptations:["Peut se faire en silence","Rythme libre","Activité individuelle","Stimulation douce","Adapté aux hypersensibles"]},

  {id:4,nom:"Cuisine crepes",lieu:"interieur",energie:"motiv",categorie:"Cuisine",materiel:["farine","oeufs","lait","beurre"],age:"3-12 ans",desc:"Faites des crepes ensemble !",tnd:{tsa:3,tdah:4,dys:4},duree:"30-40 min",nbEnfants:"1-3 enfants",
    niveauxSensoriels:{bruit:30,visuel:40,physique:30,attention:50},
    profilsTND:{tsa:false,tdah:true,dys:true,tous:false},
    adaptations:["Résultat concret","Peu de règles","Stimulation douce"]},

  {id:5,nom:"Balade nature collecte",lieu:"exterieur",energie:"motiv",categorie:"Nature",materiel:["sacs","loupe"],age:"2-12 ans",desc:"Ramassez feuilles et cailloux.",tnd:{tsa:5,tdah:4,dys:5},duree:"45-60 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:15,visuel:50,physique:50,attention:30},
    profilsTND:{tsa:true,tdah:true,dys:true,tous:true},
    adaptations:["Rythme libre","Peut être interrompue","Stimulation douce","Adapté aux hypersensibles"]},

  {id:6,nom:"Construire des Lego",lieu:"interieur",energie:"fatigue",categorie:"Construction",materiel:["Lego"],age:"3-12 ans",desc:"Construisez librement ensemble.",tnd:{tsa:5,tdah:3,dys:4},duree:"20-40 min",nbEnfants:"1-3 enfants",
    niveauxSensoriels:{bruit:10,visuel:30,physique:10,attention:70},
    profilsTND:{tsa:true,tdah:false,dys:false,tous:false},
    adaptations:["Peut se faire en silence","Rythme libre","Activité individuelle","Résultat concret"]},

  {id:7,nom:"Danse freestyle salon",lieu:"interieur",energie:"motiv",categorie:"Sport",materiel:["enceinte"],age:"0-12 ans",desc:"Mettez la musique et dansez !",tnd:{tsa:2,tdah:5,dys:5},duree:"10-20 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:80,visuel:60,physique:80,attention:10},
    profilsTND:{tsa:false,tdah:true,dys:false,tous:false},
    adaptations:["Rythme libre","Peu de règles","Peut être interrompue"]},

  {id:8,nom:"Jardinage en pots",lieu:"exterieur",energie:"fatigue",categorie:"Nature",materiel:["terre","pots","graines"],age:"3-12 ans",desc:"Plantez des graines.",tnd:{tsa:4,tdah:3,dys:5},duree:"20-30 min",nbEnfants:"1-2 enfants",
    niveauxSensoriels:{bruit:10,visuel:20,physique:30,attention:40},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Peut se faire en silence","Rythme libre","Résultat concret","Stimulation douce","Adapté aux hypersensibles"]},

  {id:9,nom:"Origami papier",lieu:"interieur",energie:"fatigue",categorie:"Creatif",materiel:["papier couleur"],age:"5-12 ans",desc:"Pliez des formes en papier : animaux, bateaux, avions...",tnd:{tsa:5,tdah:2,dys:3},duree:"20-30 min",nbEnfants:"1-3 enfants",
    niveauxSensoriels:{bruit:0,visuel:20,physique:5,attention:60},
    profilsTND:{tsa:true,tdah:false,dys:false,tous:false},
    adaptations:["Peut se faire en silence","Activité individuelle","Résultat concret","Adapté aux hypersensibles"]},

  {id:10,nom:"Jeu de memoire maison",lieu:"interieur",energie:"fatigue",categorie:"Jeu",materiel:["cartes ou images"],age:"3-10 ans",desc:"Fabriquez votre propre jeu de paires puis jouez ensemble.",tnd:{tsa:4,tdah:2,dys:4},duree:"20-30 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:10,visuel:20,physique:5,attention:50},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Peut se faire en silence","Peu de règles","Activité individuelle"]},

  {id:11,nom:"Parcours moteur interieur",lieu:"interieur",energie:"motiv",categorie:"Sport",materiel:["coussins","cerceaux","ruban"],age:"2-8 ans",desc:"Creez un circuit avec obstacles : sauter, ramper, equilibre.",tnd:{tsa:3,tdah:5,dys:4},duree:"20-30 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:40,visuel:50,physique:80,attention:20},
    profilsTND:{tsa:false,tdah:true,dys:false,tous:false},
    adaptations:["Rythme libre","Peu de règles","Peut être interrompue"]},

  {id:12,nom:"Atelier pate a sel",lieu:"interieur",energie:"fatigue",categorie:"Creatif",materiel:["farine","sel","eau","peinture"],age:"2-10 ans",desc:"Modelez des formes qui durciront et que vous pourrez peindre.",tnd:{tsa:4,tdah:3,dys:5},duree:"30-45 min",nbEnfants:"1-3 enfants",
    niveauxSensoriels:{bruit:10,visuel:20,physique:20,attention:40},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Rythme libre","Résultat concret","Stimulation douce","Adapté aux hypersensibles"]},

  {id:13,nom:"Yoga enfants",lieu:"interieur",energie:"fatigue",categorie:"Sport",materiel:["tapis"],age:"3-12 ans",desc:"Postures simples avec histoires : l arbre, le chat, le guerrier.",tnd:{tsa:5,tdah:3,dys:5},duree:"15-25 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:5,visuel:10,physique:30,attention:30},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Peut se faire en silence","Rythme libre","Activité individuelle","Stimulation douce","Adapté aux hypersensibles"]},

  {id:14,nom:"Atelier musique percussions",lieu:"interieur",energie:"motiv",categorie:"Musique",materiel:["casseroles","cuilleres","boites"],age:"1-8 ans",desc:"Fabriquez des instruments avec ce qu on a et faites un concert !",tnd:{tsa:2,tdah:5,dys:5},duree:"15-20 min",nbEnfants:"1-4 enfants",
    niveauxSensoriels:{bruit:90,visuel:40,physique:40,attention:10},
    profilsTND:{tsa:false,tdah:true,dys:false,tous:false},
    adaptations:["Peu de règles","Rythme libre","Peut être interrompue"]},

  {id:15,nom:"Tri et classification nature",lieu:"exterieur",energie:"fatigue",categorie:"Science",materiel:["boites","loupe"],age:"3-10 ans",desc:"Collectez cailloux, feuilles et glands puis classez-les par forme, couleur, taille.",tnd:{tsa:5,tdah:3,dys:4},duree:"30-45 min",nbEnfants:"1-3 enfants",
    niveauxSensoriels:{bruit:10,visuel:40,physique:30,attention:50},
    profilsTND:{tsa:true,tdah:false,dys:true,tous:false},
    adaptations:["Rythme libre","Activité individuelle","Résultat concret","Adapté aux hypersensibles"]},
];

const SORTIES=[
  {id:1,nom:"Parc Asterix",dept:"60",type:"Parc d attraction",ville:"Plailly",prix:"45 euros/adulte",tnd:{tsa:2,tdah:5,dys:4},desc:"Le parc d attractions prefere des familles.",badge:"communaute",note:4.2},
  {id:2,nom:"Zoo de Vincennes",dept:"75",type:"Zoo",ville:"Paris",prix:"22 euros/adulte",tnd:{tsa:4,tdah:4,dys:5},desc:"Le plus grand zoo de France.",badge:null,note:4.5},
  {id:3,nom:"Musee des Arts et Metiers",dept:"75",type:"Musee",ville:"Paris",prix:"12 euros/adulte",tnd:{tsa:5,tdah:3,dys:3},desc:"Un musee fascinant sur les inventions.",badge:null,note:4.3},
  {id:4,nom:"Aqualand Cap Agde",dept:"34",type:"Piscine",ville:"Agde",prix:"35 euros/adulte",tnd:{tsa:2,tdah:5,dys:5},desc:"Parc aquatique avec toboggans.",badge:"communaute",note:4.0},
  {id:5,nom:"Ferme pedagogique La Boissiere",dept:"77",type:"Ferme pedagogique",ville:"La Boissiere",prix:"8 euros/enfant",tnd:{tsa:5,tdah:4,dys:5},desc:"Rencontrez animaux de la ferme.",badge:null,note:4.7},
  {id:6,nom:"Bowling Etoile Sport",dept:"69",type:"Bowling",ville:"Lyon",prix:"6 euros/partie",tnd:{tsa:3,tdah:5,dys:4},desc:"Pistes modernes avec rampes.",badge:null,note:4.1},
  {id:7,nom:"Plage de La Baule",dept:"44",type:"Plage",ville:"La Baule",prix:"Gratuit",tnd:{tsa:3,tdah:5,dys:5},desc:"Belle plage de la cote atlantique.",badge:null,note:4.8},
  {id:8,nom:"Escape Game Kids",dept:"75",type:"Escape game",ville:"Paris",prix:"15 euros/joueur",tnd:{tsa:4,tdah:5,dys:3},desc:"Scenarios adaptes des 6 ans.",badge:"communaute",note:4.4},
];

// ============================================================
// CONFIGURATION ADMINISTRATEUR
// Code secret administrateur — à changer avant mise en production
// Fonction de hash simple (FNV-1a 32bit) pour comparer les credentials sans les exposer en clair
const simpleHash=(s)=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*16777619)>>>0;}return h.toString(16).padStart(8,"0").repeat(8);};
const ADMIN_EMAIL = "admin@parenthese.fr"; // conservé pour l'affichage du "mot de passe oublié"
// Idees du moment — mettre à false pour masquer chaque vignette
const SHOW_IDEE_ACTIVITES_CREATIVES = true;
const SHOW_IDEE_SORTIES_NATURE      = true;
const SHOW_IDEE_EVENEMENTS          = true;
// ============================================================

// Activite mise en avant par l'administrateur
const ACTIVITE_ADMIN={
  id:99,
  nom:"Fabrication de slime maison",
  lieu:"interieur",
  energie:"motiv",
  categorie:"Creatif",
  materiel:["colle blanche","borax","colorant alimentaire","bols"],
  age:"4-12 ans",
  desc:"Fabriquez ensemble une slime coloree et sensorielle. Une activite creative et amusante que les enfants adorent !",
  tnd:{tsa:4,tdah:4,dys:5},
  adminNote:"⭐ Coup de coeur de l equipe Parent'Hèse cette semaine !"
};

const SORTIE_NATURE_ADMIN={
  id:98,
  nom:"Balade en foret de Fontainebleau",
  type:"Nature",
  dept:"77",
  ville:"Fontainebleau",
  prix:"Gratuit",
  age:"0-12 ans",
  desc:"Une magnifique balade en pleine nature dans la foret de Fontainebleau. Sentiers balisés, rochers, faune et flore a découvrir en famille. Parfait pour se ressourcer et initier les enfants à la nature.",
  materiel:["bonnes chaussures","gourdes","snacks","loupe pour les enfants"],
  tnd:{tsa:5,tdah:4,dys:5},
  badge:null,
  note:4.8,
  adminNote:"⭐ Coup de cœur nature de l equipe Parent'Hèse !"
};

const EVT_ADMIN={
  id:97,
  nom:"Kermesse de l ecole des Lilas",
  categorie:"kermesse",
  dept:"75",
  ville:"Paris",
  date:"2026-06-14",
  prix:"Gratuit",
  gratuit:true,
  age:"0-12 ans",
  desc:"Une belle kermesse de fin d annee avec jeux, tombola, stands gourmands et animations pour toute la famille. Ambiance festive garantie !",
  tnd:{son:"calme",affluence:"faible",prevision:"structuree",zonecalme:true},
  adminNote:"⭐ Evenement a ne pas manquer cette semaine !"
};

const LUTINS_ACTIVITES=[
  {jour:1, emoji:"🧦", nom:"Les chaussettes disparaissent", materiel:[], desc:"Le lutin a mis toutes les chaussettes de la famille dans le sapin ! Retrouvez-les ensemble en chantant."},
  {jour:2, emoji:"🎨", nom:"Tableau de sucre glace", materiel:["sucre glace"], desc:"Le lutin a dessine un bonhomme de neige avec du sucre glace sur la table de la cuisine."},
  {jour:3, emoji:"🧻", nom:"La maison emballee", materiel:["papier cadeau","scotch"], desc:"Le lutin a emballe la telecommande, la brosse a dents et le telephone dans du papier cadeau."},
  {jour:4, emoji:"🥛", nom:"Chocolat chaud surprise", materiel:["cacao","lait","marshmallows"], desc:"Le lutin a prepare des tasses de cacao avec des petits marshmallows pour tout le monde ce matin."},
  {jour:5, emoji:"🎭", nom:"Le lutin s est deguise", materiel:[], desc:"Le lutin a mis les habits d un enfant ! Retrouvez ses vetements disparus dans la maison."},
  {jour:6, emoji:"📚", nom:"Les livres a l envers", materiel:["livres"], desc:"Le lutin a retourne tous les livres de la bibliotheque. Remettez-les dans l ordre en les lisant."},
  {jour:7, emoji:"🍪", nom:"Atelier biscuits de Noel", materiel:["farine","oeufs","beurre","sucre"], desc:"Le lutin a laisse une recette et tous les ingredients pour faire des biscuits en etoile ensemble."},
  {jour:8, emoji:"🎵", nom:"Concert de casseroles", materiel:["casseroles","cuilleres en bois"], desc:"Le lutin a installe un kit de percussions avec casseroles et cuilleres en bois. Faites de la musique !"},
  {jour:9, emoji:"🐾", nom:"Traces de pas dans la farine", materiel:["farine"], desc:"Le lutin a laisse des traces de farine depuis la porte d entree jusqu au sapin. Qui sont-elles ?"},
  {jour:10, emoji:"✉️", nom:"Lettre du Pere Noel", materiel:["papier","stylo"], desc:"Le lutin a depose une lettre du Pere Noel sous l oreiller de chaque enfant ce matin."},
  {jour:11, emoji:"🎁", nom:"Chasse aux indices", materiel:["papier","stylo"], desc:"Le lutin a cache un petit cadeau et laisse 5 indices en rimes pour le retrouver dans la maison."},
  {jour:12, emoji:"🧊", nom:"Les jouets dans la glace", materiel:["bacs a glace","petits jouets"], desc:"Le lutin a mis des petits jouets dans des glagons ! Faites les fondre pour les liberer."},
  {jour:13, emoji:"🎄", nom:"Deco sapin en pyjama", materiel:["guirlandes","boules de Noel"], desc:"Le lutin exige que tout le monde decore le sapin en pyjama ce soir en buvant du chocolat chaud."},
  {jour:14, emoji:"🌟", nom:"Etoiles en papier", materiel:["papier","ciseaux"], desc:"Le lutin a laisse des modeles pour faire des etoiles en origami et en decorer toute la maison."},
  {jour:15, emoji:"🎠", nom:"Village de Noel en carton", materiel:["cartons","feutres","ciseaux","colle"], desc:"Le lutin a laisse des boites en carton, du papier et des feutres pour construire un village de Noel."},
  {jour:16, emoji:"🥣", nom:"Porridge de Noel", materiel:["cereales","lait"], desc:"Le lutin a prepare un grand bol de cereales en forme d etoile et y a cache un petit message."},
  {jour:17, emoji:"🎿", nom:"Lutin sportif", materiel:[], desc:"Le lutin defie la famille : qui fera le plus de sauts sur un pied en chantant un chant de Noel ?"},
  {jour:18, emoji:"🖼️", nom:"Galerie de portraits", materiel:["feutres","papier"], desc:"Le lutin a affiche des dessins de lutin partout. A vous de dessiner vos propres lutins rigolos !"},
  {jour:19, emoji:"🎶", nom:"Karaoké de Noel", materiel:["enceinte"], desc:"Le lutin a laisse une liste de chants de Noel. Organisez un karaoké familial avec costumes !"},
  {jour:20, emoji:"🧁", nom:"Cupcakes du lutin", materiel:["farine","oeufs","beurre","sucre","colorant alimentaire"], desc:"Le lutin a laisse une recette de cupcakes verts et rouges. Decorez-les ensemble avec du glacage."},
  {jour:21, emoji:"🔦", nom:"Veille aux etoiles", materiel:["lampe torche"], desc:"Le lutin suggere d eteindre toutes les lumieres et de chercher des constellations avec une lampe torche."},
  {jour:22, emoji:"🎪", nom:"Cirque du lutin", materiel:[], desc:"Le lutin a organise un mini-cirque ! Chacun invente un numero : jonglage, equilibre, magie..."},
  {jour:23, emoji:"🌙", nom:"Conte de Noel", materiel:["livres"], desc:"Le lutin a laisse un livre de contes. Lisez-le tous ensemble sous les guirlandes avant de dormir."},
  {jour:24, emoji:"🎅", nom:"La nuit magique", materiel:["carottes","verre de lait"], desc:"Le lutin pose ses valises : c est la nuit de Noel ! Laissez des carottes pour le renne et du lait pour le Pere Noel."},
];

const EVT_CATEGORIES=[
  {k:"kermesse",label:"Kermesses",emoji:"🎪"},{k:"fete_village",label:"Fetes de village",emoji:"🎉"},
  {k:"spectacle",label:"Spectacles",emoji:"🎭"},{k:"marche_noel",label:"Marches de Noel",emoji:"🎄"},
  {k:"chasse_oeufs",label:"Chasses aux oeufs",emoji:"🐣"},{k:"halloween",label:"Halloween",emoji:"🎃"},
  {k:"atelier",label:"Ateliers creatifs",emoji:"🎨"},{k:"medieval",label:"Fetes medievales",emoji:"🐴"},
  {k:"foire_agri",label:"Foires agricoles",emoji:"🚜"},{k:"fete_foraine",label:"Fetes foraines",emoji:"🎡"},
  {k:"cinema_plein_air",label:"Cinema plein air",emoji:"🎬"},{k:"salon_jeunesse",label:"Salons jeunesse",emoji:"📚"},
  {k:"cirque",label:"Cirque",emoji:"🤹"},{k:"concert",label:"Concerts",emoji:"🎵"},
  {k:"sport",label:"Evenements sportifs",emoji:"🏃"},{k:"autre",label:"Autre",emoji:"🎫"},
];

// EVT_TYPE_OPTIONS derive de EVT_CATEGORIES pour eviter toute divergence future entre les listes.
const EVT_TYPE_OPTIONS=EVT_CATEGORIES.map(c=>({k:c.k,l:c.emoji+" "+c.label}));

const EVENEMENTS_INIT=[
  {id:1,nom:"Kermesse de Saint-Martin",ville:"Paris (75)",dept:"75",date:"2026-06-01",periode:"semaine",prix:"Gratuit",gratuit:true,categorie:"kermesse",age:"0-12 ans",communaute:false,signalements:0,tnd:{son:"calme",affluence:"faible",prevision:"structuree",zonecalme:true},desc:"Grande kermesse avec jeux et tombola."},
  {id:2,nom:"Atelier peinture enfants",ville:"Paris (75)",dept:"75",date:"2026-06-01",periode:"semaine",prix:"Gratuit",gratuit:true,categorie:"atelier",age:"3-8 ans",communaute:false,signalements:0,tnd:{son:"calme",affluence:"faible",prevision:"structuree",zonecalme:true},desc:"Initiation a la peinture pour les 3-8 ans."},
  {id:3,nom:"Spectacle Petit Prince",ville:"Lyon (69)",dept:"69",date:"2026-06-03",periode:"semaine",prix:"8 euros par enfant",gratuit:false,categorie:"spectacle",age:"4-10 ans",communaute:false,signalements:0,tnd:{son:"moyenne",affluence:"moyenne",prevision:"structuree",zonecalme:false},desc:"Adaptation theatrale 45 min."},
  {id:4,nom:"Fete medievale de Provins",ville:"Provins (77)",dept:"77",date:"2026-06-07",periode:"semaine",prix:"12 euros par adulte",gratuit:false,categorie:"medieval",age:"2-12 ans",communaute:false,signalements:0,tnd:{son:"forte",affluence:"forte",prevision:"imprev",zonecalme:false},desc:"Reconstitution historique."},
  {id:5,nom:"Cinema plein air Toy Story",ville:"Bordeaux (33)",dept:"33",date:"2026-06-06",periode:"week-end",prix:"Gratuit",gratuit:true,categorie:"cinema_plein_air",age:"3-12 ans",communaute:false,signalements:0,tnd:{son:"moyenne",affluence:"moyenne",prevision:"structuree",zonecalme:true},desc:"Projection en plein air de Toy Story 4."},
  {id:6,nom:"Salon jeunesse Lire en Fete",ville:"Nantes (44)",dept:"44",date:"2026-06-05",periode:"semaine",prix:"Gratuit",gratuit:true,categorie:"salon_jeunesse",age:"0-12 ans",communaute:false,signalements:0,tnd:{son:"calme",affluence:"moyenne",prevision:"structuree",zonecalme:true},desc:"Rencontres avec auteurs jeunesse."},
  {id:7,nom:"Foire agricole de Chartres",ville:"Chartres (28)",dept:"28",date:"2026-06-08",periode:"week-end",prix:"5 euros par adulte",gratuit:false,categorie:"foire_agri",age:"0-12 ans",communaute:false,signalements:0,tnd:{son:"forte",affluence:"forte",prevision:"imprev",zonecalme:false},desc:"Animaux de la ferme."},
  {id:8,nom:"Chasse aux tresors Halloween",ville:"Toulouse (31)",dept:"31",date:"2026-10-31",periode:"semaine",prix:"Gratuit",gratuit:true,categorie:"halloween",age:"3-10 ans",communaute:false,signalements:0,tnd:{son:"moyenne",affluence:"faible",prevision:"structuree",zonecalme:true},desc:"Parcours avec costumes et friandises."},
];

const DEPTS_NAMED=[
  {k:"01",l:"Ain"},{k:"02",l:"Aisne"},{k:"03",l:"Allier"},{k:"04",l:"Alpes-de-Haute-Provence"},{k:"05",l:"Hautes-Alpes"},
  {k:"06",l:"Alpes-Maritimes"},{k:"07",l:"Ardeche"},{k:"08",l:"Ardennes"},{k:"09",l:"Ariege"},{k:"10",l:"Aube"},
  {k:"11",l:"Aude"},{k:"12",l:"Aveyron"},{k:"13",l:"Bouches-du-Rhone"},{k:"14",l:"Calvados"},{k:"15",l:"Cantal"},
  {k:"16",l:"Charente"},{k:"17",l:"Charente-Maritime"},{k:"18",l:"Cher"},{k:"19",l:"Correze"},{k:"20",l:"Corse"},
  {k:"21",l:"Cote-d-Or"},{k:"22",l:"Cotes-d-Armor"},{k:"23",l:"Creuse"},{k:"24",l:"Dordogne"},{k:"25",l:"Doubs"},
  {k:"26",l:"Drome"},{k:"27",l:"Eure"},{k:"28",l:"Eure-et-Loir"},{k:"29",l:"Finistere"},{k:"30",l:"Gard"},
  {k:"31",l:"Haute-Garonne"},{k:"32",l:"Gers"},{k:"33",l:"Gironde"},{k:"34",l:"Herault"},{k:"35",l:"Ille-et-Vilaine"},
  {k:"36",l:"Indre"},{k:"37",l:"Indre-et-Loire"},{k:"38",l:"Isere"},{k:"39",l:"Jura"},{k:"40",l:"Landes"},
  {k:"41",l:"Loir-et-Cher"},{k:"42",l:"Loire"},{k:"43",l:"Haute-Loire"},{k:"44",l:"Loire-Atlantique"},{k:"45",l:"Loiret"},
  {k:"46",l:"Lot"},{k:"47",l:"Lot-et-Garonne"},{k:"48",l:"Lozere"},{k:"49",l:"Maine-et-Loire"},{k:"50",l:"Manche"},
  {k:"51",l:"Marne"},{k:"52",l:"Haute-Marne"},{k:"53",l:"Mayenne"},{k:"54",l:"Meurthe-et-Moselle"},{k:"55",l:"Meuse"},
  {k:"56",l:"Morbihan"},{k:"57",l:"Moselle"},{k:"58",l:"Nievre"},{k:"59",l:"Nord"},{k:"60",l:"Oise"},
  {k:"61",l:"Orne"},{k:"62",l:"Pas-de-Calais"},{k:"63",l:"Puy-de-Dome"},{k:"64",l:"Pyrenees-Atlantiques"},{k:"65",l:"Hautes-Pyrenees"},
  {k:"66",l:"Pyrenees-Orientales"},{k:"67",l:"Bas-Rhin"},{k:"68",l:"Haut-Rhin"},{k:"69",l:"Rhone"},{k:"70",l:"Haute-Saone"},
  {k:"71",l:"Saone-et-Loire"},{k:"72",l:"Sarthe"},{k:"73",l:"Savoie"},{k:"74",l:"Haute-Savoie"},{k:"75",l:"Paris"},
  {k:"76",l:"Seine-Maritime"},{k:"77",l:"Seine-et-Marne"},{k:"78",l:"Yvelines"},{k:"79",l:"Deux-Sevres"},{k:"80",l:"Somme"},
  {k:"81",l:"Tarn"},{k:"82",l:"Tarn-et-Garonne"},{k:"83",l:"Var"},{k:"84",l:"Vaucluse"},{k:"85",l:"Vendee"},
  {k:"86",l:"Vienne"},{k:"87",l:"Haute-Vienne"},{k:"88",l:"Vosges"},{k:"89",l:"Yonne"},{k:"90",l:"Territoire de Belfort"},
  {k:"91",l:"Essonne"},{k:"92",l:"Hauts-de-Seine"},{k:"93",l:"Seine-Saint-Denis"},{k:"94",l:"Val-de-Marne"},{k:"95",l:"Val-d-Oise"},
  {k:"971",l:"Guadeloupe"},{k:"972",l:"Martinique"},{k:"973",l:"Guyane"},{k:"974",l:"La Reunion"},
];
const DEPTS=DEPTS_NAMED.map(d=>d.k);
const TYPES_SORTIE=["Parc","Balade","Musee","Aquarium","Zoo","Bowling","Cinema","Escape game","Piscine","Plage","Patinoire","Ferme pedagogique","Restaurant","Parc d attraction"];
const MATERIEL_MAP={"Peinture avec une eponge":["Eponge","Peinture lavable","Feuille A4"],"Faire des cupcakes":["Farine","Oeufs","Beurre","Sucre","Moules"],"Puzzle geant":["Puzzle"],"Lecture a voix haute":["Livre"],"Balade a velo":["Velo","Casque"],"Planter des graines":["Graines","Pot","Terre","Arrosoir"],"Foot dans le jardin":["Ballon"],"Jeu de role":["Deguisements"],"Soiree jeux de societe":["Jeu de societe"],"Jeu de flechettes mousse":["Flechettes mousse","Cible"]};
const ETAPES_MAP={"Peinture avec une eponge":["Trempe l eponge","Tamponne sur la feuille","Laisse secher 5 min"],"Faire des cupcakes":["Prechauffe le four","Melange les ingredients","Verse dans les moules","Enfourne 20 min","Decore"],"Puzzle geant":["Etale les pieces","Commence par les bords","Assemble par zones"],"Lecture a voix haute":["Choisis un livre","Installez-vous","Lis avec le ton","Discutez"],"Balade a velo":["Verifiez les velos","Choisissez l itineraire","Partez","Pause gouter"],"Planter des graines":["Remplis le pot","Fais un trou","Depose les graines","Arrose","Place au soleil"],"Foot dans le jardin":["Delimitez le terrain","Formez les equipes","C est parti"],"Jeu de role":["Choisissez vos personnages","Inventez une situation","Jouez"],"Soiree jeux de societe":["Choisissez un jeu","Lisez les regles","Jouez"],"Jeu de flechettes mousse":["Accrochez la cible","Definissez les regles","Lancez"]};
const AVIS_DEMO=[
  {profils:["General","TSA"],stars:5,pseudo:"Famille Dupont",temps:"il y a 2 jours",texte:"Super sortie ! Personnel accueillant."},
  {profils:["TDAH"],stars:4,pseudo:"Maman de Lucas",temps:"il y a 1 semaine",texte:"Beaucoup d espace pour courir."},
  {profils:["General"],stars:4,pseudo:"Les Martins",temps:"il y a 3 semaines",texte:"Tres belle sortie en famille."},
];
const MOIS=["","janv","fev","mars","avr","mai","juin","juil","aout","sept","oct","nov","dec"];
function formatDateFR(d){if(!d)return"";const p=d.split("-");if(p.length<3)return d;const m=parseInt(p[1]);return p[2]+" "+(MOIS[m]||"")+( " "+p[0]);}
function detectPeriode(date){if(!date)return"semaine";const diff=Math.round((new Date(date)-new Date())/86400000);if(diff<=2)return"week-end";return"semaine";}

function Stars({count,size}){const s=size||14;return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=count?"#F5A623":"#E5E7EB",fontSize:s}}>★</span>)}</span>;}
function TND({tnd}){if(!tnd)return null;return(<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>{[{k:"tsa",l:"TSA",c:"#8B5CF6"},{k:"tdah",l:"TDAH",c:"#EC4899"},{k:"dys",l:"DYS",c:"#06B6D4"}].map(({k,l,c})=>tnd[k]!=null?(<span key={k} style={{background:c+"18",color:c,fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:20,border:"1px solid "+c+"40"}}>{l} {tnd[k]}/5</span>):null)}</div>);}
function Chip({val,cur,set,label}){const on=cur===val;return(<button onClick={()=>set(on?null:val)} style={{padding:"7px 14px",borderRadius:20,border:"1.5px solid "+(on?V:"rgba(108,92,231,0.15)"),background:on?VL:WH,color:on?V:TX,fontSize:13,cursor:"pointer"}}>{label}</button>);}
function Field({label,required,children,style}){return(<div style={style}><p style={{margin:"0 0 5px",fontSize:13,fontWeight:500,color:TX}}>{label}{required&&<span style={{color:RD,marginLeft:2}}>*</span>}</p>{children}</div>);}

function TNDBadgesEvt({tnd}){
  if(!tnd)return null;
  const t=tnd||{};
  const items=[
    {l:"Son",v:t.son==="calme"?"Calme":t.son==="moyenne"?"Moyenne":"Forte",c:t.son==="calme"?"#065F46":"#92400E",bg:t.son==="calme"?"#D1FAE5":"#FEF3C7",icon:"🔈"},
    {l:"Affluence",v:t.affluence==="faible"?"Faible":t.affluence==="moyenne"?"Moyenne":"Forte",c:"#1E3A5F",bg:"#DBEAFE",icon:"👥"},
    {l:"Previsibilite",v:t.prevision==="structuree"?"Structuree":"Imprevisible",c:t.prevision==="structuree"?"#065F46":"#991B1B",bg:t.prevision==="structuree"?"#D1FAE5":"#FEE2E2",icon:"🔮"},
    {l:"Zone calme",v:t.zonecalme?"Oui":"Non",c:"#374151",bg:"#F0FDF4",icon:"🌿"},
  ];
  return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8}}>{items.map(({l,v,c,bg,icon})=>(<div key={l} style={{background:bg,borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{icon}</span><div><div style={{fontSize:10,color:TM}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:c}}>{v}</div></div></div>))}</div>);
}

function SectionAccessibilite({values={},onChange,commentaire="",onCommentaireChange}){
  const toggle=(k)=>onChange&&onChange({...values,[k]:!values[k]});
  return(
    <>
      <div style={{background:"#FFF8F0",borderRadius:14,padding:"14px 16px"}}>
      </div>
      <div style={{background:"#F0F4FF",borderRadius:14,padding:"14px 16px"}}>
        <p style={{margin:"0 0 10px",fontSize:14,fontWeight:600,color:TX}}>Mobilite reduite PMR</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>
          {[["pmr_fauteuil","Acces fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptees"],["pmr_personnel","Personnel forme"],["pmr_chemin","Chemin accessible"]].map(([k,item])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:TX,cursor:"pointer"}}><input type="checkbox" checked={!!values[k]} onChange={()=>toggle(k)} style={{accentColor:"#3B82F6",flexShrink:0}}/>{item}</label>))}
        </div>
      </div>
      <div>
        <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:TX}}>Troubles du neurodeveloppement TND</p>
        <p style={{margin:"0 0 10px",fontSize:12,color:TM}}>Ces infos aident les familles TND</p>
        <div style={{background:"#EDE9FF",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:V}}>TSA Autisme</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumiere douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,item])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" checked={!!values[k]} onChange={()=>toggle(k)} style={{accentColor:V,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <div style={{background:"#F0FFF4",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:GR}}>TDAH</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{[["tdah_espace","Grand espace"],["tdah_physique","Activite physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variee"]].map(([k,item])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" checked={!!values[k]} onChange={()=>toggle(k)} style={{accentColor:GR,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <div style={{background:"#FFF4EC",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:OR}}>DYS</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{[["dys_visuels","Supports visuels"],["dys_nonecrite","Non ecrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,item])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" checked={!!values[k]} onChange={()=>toggle(k)} style={{accentColor:OR,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <textarea value={commentaire} onChange={e=>onCommentaireChange&&onCommentaireChange(e.target.value)} placeholder="Commentaire TND" rows={3} style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:13,width:"100%",boxSizing:"border-box",background:WH,fontFamily:"inherit",resize:"none"}}/>
      </div>
    </>
  );
}

function SignalCardBtn({id,titre,type,onReport}){
  const [step,setStep]=useState("idle");
  const [raison,setRaison]=useState("");
  const [detail,setDetail]=useState("");
  const [done,setDone]=useState(false);
  const RAISONS=[{k:"manquant",l:"Informations manquantes",c:"#F59E0B"},{k:"inapproprie",l:"Contenu inapproprie",c:"#EF4444"},{k:"ferme",l:"Lieu ferme annule",c:"#6366F1"},{k:"doublon",l:"Doublon",c:"#0891B2"},{k:"autre",l:"Autre raison",c:"#6B7280"}];
  if(done)return <span style={{fontSize:11,color:"#9CA3AF",opacity:0.6}}>Signale</span>;
  return(
    <span>
      <button onClick={e=>{e.stopPropagation();setStep("choix");}} style={{background:"none",border:"none",color:"#9CA3AF",fontSize:12,cursor:"pointer",padding:"4px 0"}}>
        🚩 Signaler
      </button>
      {step==="choix"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={e=>{e.stopPropagation();setStep("idle");}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}>
            <div style={{textAlign:"center",marginBottom:16}}><p style={{margin:0,fontSize:16,fontWeight:700,color:TX}}>Pourquoi signaler ?</p></div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>{RAISONS.map(r=>(<button key={r.k} onClick={()=>{setRaison(r.k);setStep("detail");}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:12,border:"1px solid #F0EDE8",background:"#FAFAFA",cursor:"pointer",textAlign:"left"}}><span style={{fontSize:13,color:r.c,fontWeight:500}}>{r.l}</span><span style={{color:"#D1D5DB",fontSize:16}}>›</span></button>))}</div>
            <button onClick={()=>setStep("idle")} style={{width:"100%",marginTop:14,padding:"11px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:14,cursor:"pointer"}}>Annuler</button>
          </div>
        </div>
      )}
      {step==="detail"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={e=>{e.stopPropagation();setStep("idle");}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}>
            <div style={{textAlign:"center",marginBottom:14}}><p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>{RAISONS.find(r=>r.k===raison)?.l}</p></div>
            <textarea value={detail} onChange={e=>setDetail(e.target.value.slice(0,300))} placeholder="Ajoute des details" rows={3} style={{width:"100%",borderRadius:12,border:"1px solid #E5E7EB",padding:"12px 14px",fontSize:13,fontFamily:"inherit",resize:"none",boxSizing:"border-box",outline:"none",color:TX,marginBottom:4}}/>
            <div style={{textAlign:"right",fontSize:11,color:TM,marginBottom:14}}>{detail.length}/300</div>
            <button onClick={()=>{const raisonLabel=RAISONS.find(r=>r.k===raison)?.l||raison;setDone(true);setStep("idle");if(onReport)onReport({type:type||"activite",titre:titre||id,raison:raisonLabel,signalePar:"utilisateur@parentales.fr",detail,date:new Date().toLocaleDateString("fr-FR")});}} style={{width:"100%",padding:13,borderRadius:28,background:RD,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Envoyer</button>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setStep("choix")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Retour</button>
              <button onClick={()=>setStep("idle")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

function SignalementButton({type,onSignaler}){
  const [step,setStep]=useState("idle");
  const [raison,setRaison]=useState("");
  const [detail,setDetail]=useState("");
  const [toast,setToast]=useState(false);
  const RAISONS=[{k:"manquant",l:"Informations manquantes",c:"#F59E0B"},{k:"inapproprie",l:"Contenu inapproprie",c:"#EF4444"},{k:"ferme",l:"Lieu ferme annule",c:"#6366F1"},{k:"doublon",l:"Doublon",c:"#0891B2"},{k:"autre",l:"Autre raison",c:"#6B7280"}];
  const handleEnvoyer=()=>{const label=RAISONS.find(r=>r.k===raison)?.l||raison;onSignaler(label,detail);setStep("done");setToast(true);setTimeout(()=>setToast(false),3000);};
  if(step==="done")return(<div style={{textAlign:"center",marginTop:16}}><span style={{fontSize:12,color:"#9CA3AF",opacity:0.5}}>Signale</span></div>);
  return(
    <div style={{textAlign:"center",marginTop:16}}>
      <button onClick={()=>setStep("choix")} style={{background:"none",border:"none",color:"#9CA3AF",fontSize:12,cursor:"pointer",padding:8}}>Signaler cette {type}</button>
      {step==="choix"&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={()=>setStep("idle")}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}><div style={{textAlign:"center",marginBottom:16}}><p style={{margin:0,fontSize:16,fontWeight:700,color:TX}}>Pourquoi signaler ?</p></div><div style={{display:"flex",flexDirection:"column",gap:8}}>{RAISONS.map(r=>(<button key={r.k} onClick={()=>{setRaison(r.k);setStep("detail");}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:12,border:"1px solid #F0EDE8",background:"#FAFAFA",cursor:"pointer",textAlign:"left"}}><span style={{fontSize:13,color:r.c,fontWeight:500}}>{r.l}</span><span style={{color:"#D1D5DB",fontSize:16}}>›</span></button>))}</div><button onClick={()=>setStep("idle")} style={{width:"100%",marginTop:14,padding:"11px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontWeight:500,fontSize:14,cursor:"pointer"}}>Annuler</button></div></div>)}
      {step==="detail"&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={()=>setStep("idle")}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}><div style={{textAlign:"center",marginBottom:14}}><p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>{RAISONS.find(r=>r.k===raison)?.l}</p></div><textarea value={detail} onChange={e=>setDetail(e.target.value.slice(0,300))} placeholder="Ajoute des details" rows={3} style={{width:"100%",borderRadius:12,border:"1px solid #E5E7EB",padding:"12px 14px",fontSize:13,fontFamily:"inherit",resize:"none",boxSizing:"border-box",outline:"none",color:TX,marginBottom:4}}/><div style={{textAlign:"right",fontSize:11,color:TM,marginBottom:14}}>{detail.length}/300</div><button onClick={handleEnvoyer} style={{width:"100%",padding:13,borderRadius:28,background:RD,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Envoyer</button><div style={{display:"flex",gap:8}}><button onClick={()=>setStep("choix")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Retour</button><button onClick={()=>setStep("idle")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button></div></div></div>)}
      {toast&&(<div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,zIndex:999,whiteSpace:"nowrap"}}>Signalement pris en compte.</div>)}
    </div>
  );
}

function useAvis(itemType,itemId){
  const storageKey=`avis_${itemType}_${itemId}`;
  const [avisAjoutes,setAvisAjoutes]=useState([]);
  const [chargement,setChargement]=useState(true);
  useEffect(()=>{
    let actif=true;
    (async()=>{
      try{
        const res=await window.storage.get(storageKey,true);
        if(actif&&res&&res.value)setAvisAjoutes(JSON.parse(res.value));
      }catch(e){
        // Pas encore d'avis pour cet element
      }finally{
        if(actif)setChargement(false);
      }
    })();
    return()=>{actif=false;};
  },[storageKey]);
  const ajouterAvis=async(nouvelAvis)=>{
    const maj=[nouvelAvis,...avisAjoutes];
    setAvisAjoutes(maj);
    try{ await window.storage.set(storageKey,JSON.stringify(maj),true); }catch(e){ /* l'avis reste visible localement meme si la sauvegarde echoue */ }
  };
  const tousLesAvis=[...avisAjoutes,...AVIS_DEMO];
  const noteGlobale=tousLesAvis.length?tousLesAvis.reduce((s,a)=>s+(Number(a.stars)||0),0)/tousLesAvis.length:0;
  const noteParProfil=(profil)=>{
    const subset=tousLesAvis.filter(a=>(a.profils||[]).includes(profil));
    return subset.length?{moyenne:subset.reduce((s,a)=>s+(Number(a.stars)||0),0)/subset.length,nb:subset.length}:null;
  };
  return{tousLesAvis,chargement,ajouterAvis,noteGlobale,noteParProfil};
}

function AvisForm({isLoggedIn=true,onRequireAuth,tousLesAvis=[],chargement=false,onAjouterAvis}){
  const PROFILS=["General","TSA","TDAH","DYS","Bebe","PMR"];
  const [selected,setSelected]=useState(["General"]);
  const [stars,setStars]=useState(0);
  const [hover,setHover]=useState(0);
  const [text,setText]=useState("");
  const [justPublished,setJustPublished]=useState(false);
  const toggle=(p)=>setSelected(prev=>prev.includes(p)?(prev.length===1?prev:prev.filter(x=>x!==p)):[...prev,p]);
  const publier=()=>{
    if(stars===0)return;
    if(!isLoggedIn){ onRequireAuth&&onRequireAuth(); return; }
    const nouvelAvis={profils:selected,stars,pseudo:"Toi",temps:"A l'instant",texte:text.trim()};
    onAjouterAvis&&onAjouterAvis(nouvelAvis);
    setStars(0);setText("");setSelected(["General"]);
    setJustPublished(true);setTimeout(()=>setJustPublished(false),3000);
  };
  return(
    <div style={{background:WH,borderRadius:16,padding:16,marginBottom:12}}>
      <p style={{margin:"0 0 14px",fontSize:15,fontWeight:600,color:TX}}>💬 Avis ({chargement?"...":tousLesAvis.length})</p>
      {!chargement&&tousLesAvis.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
          {tousLesAvis.map((a,i)=>(
            <div key={i} style={{borderBottom:i<tousLesAvis.length-1?"0.5px solid #F3F4F6":"none",paddingBottom:i<tousLesAvis.length-1?12:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <div>
                  <span style={{fontSize:13,fontWeight:600,color:TX}}>{a.pseudo}</span>
                  <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>{(a.profils||[]).map(p=><span key={p} style={{fontSize:10,background:VL,color:V,padding:"1px 7px",borderRadius:10}}>{p}</span>)}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}><Stars count={a.stars} size={12}/><div style={{fontSize:11,color:"#9CA3AF"}}>{a.temps}</div></div>
              </div>
              {a.texte&&<p style={{fontSize:13,color:"#374151",lineHeight:1.5,margin:0}}>{a.texte}</p>}
            </div>
          ))}
        </div>
      )}
      {justPublished&&<p style={{margin:"0 0 12px",fontSize:12,color:"#065F46",background:"#D1FAE5",borderRadius:10,padding:"8px 12px",fontWeight:600,textAlign:"center"}}>✅ Ton avis a été publié !</p>}
      <p style={{margin:"0 0 14px",fontSize:14,fontWeight:600,color:TX}}>Donner mon avis</p>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>{[1,2,3,4,5].map(i=>(<span key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>setStars(i)} style={{fontSize:28,cursor:"pointer",color:(hover||stars)>=i?"#F5A623":"#E5E7EB"}}>★</span>))}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14,justifyContent:"center"}}>{PROFILS.map(p=>{const on=selected.includes(p);return(<button key={p} onClick={()=>toggle(p)} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid "+(on?V:"#E5E7EB"),background:on?VL:WH,color:on?V:"#6B7280",fontSize:13,cursor:"pointer"}}>{p}</button>);})}</div>
      <textarea value={text} onChange={e=>setText(e.target.value.slice(0,300))} placeholder="Partage ton experience" rows={4} style={{width:"100%",borderRadius:12,border:"1px solid #E5E7EB",padding:"12px 14px",fontSize:13,fontFamily:"inherit",resize:"none",boxSizing:"border-box",color:TX,outline:"none"}}/>
      <div style={{textAlign:"right",fontSize:12,color:TM,marginBottom:14}}>{text.length}/300</div>
      {!isLoggedIn&&<p style={{margin:"0 0 10px",fontSize:11,color:"#92400E",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"8px 12px"}}>🔒 Connecte-toi pour publier un avis (note + commentaire).</p>}
      <p style={{margin:"0 0 8px",fontSize:11,color:TM,textAlign:"center"}}>🌍 Votre avis sera visible par tous les parents</p>
      <button onClick={publier} style={{width:"100%",padding:"14px 0",borderRadius:28,background:stars>0?V:"#C4B8F8",border:"none",color:WH,fontWeight:600,fontSize:15,cursor:stars>0?"pointer":"default"}}>Publier mon avis</button>
    </div>
  );
}

function ListePropositions({items,type,onChoisir,onClose,isPremium=false,enfantActif=null}){
  const [excluded,setExcluded]=useState(new Set());
  const visibles=items.filter(item=>!excluded.has(item.id||item.nom));

  const emojiFor=(item)=>{
    if(type==="sortie"){
      return item.type==="Zoo"?"🦁":item.type==="Musee"?"🏛️":item.type==="Parc d attraction"?"🎢":item.type==="Plage"?"🏖️":item.type==="Bowling"?"🎳":item.type==="Escape game"?"🔐":item.type==="Ferme pedagogique"?"🐄":item.type==="Piscine"?"🏊":"🗺️";
    }
    const cat=item.categorie;
    return cat==="Creatif"?"🎨":cat==="Cuisine"?"🍳":cat==="Nature"?"🌳":cat==="Sport"?"⚽":cat==="Calme"?"📖":cat==="Construction"?"🧱":cat==="Jeu"?"🎲":cat==="Musique"?"🎵":cat==="Science"?"🔬":"🎈";
  };

  const getCompatBadge=(score)=>{
    if(score===undefined)return null;
    if(score>=80)return{label:"🟢 Très adapté",col:"#10B981",bg:"#ECFDF5"};
    if(score>=40)return{label:"🟡 Adapté",col:"#F59E0B",bg:"#FFFBEB"};
    return{label:"⚪ À tester",col:"#9CA3AF",bg:"#F9FAFB"};
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:24,padding:"22px 18px 24px",width:"100%",maxWidth:390,maxHeight:"85vh",overflowY:"auto",boxSizing:"border-box",boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}>
        <p style={{margin:"0 0 4px",fontSize:18,fontWeight:800,color:TX,textAlign:"center"}}>{type==="sortie"?"3 sorties pour toi":"3 activités pour toi"}</p>
        <p style={{margin:"0 0 18px",fontSize:12,color:TM,textAlign:"center"}}>
          {isPremium&&enfantActif
            ?`⭐ Triées par compatibilité avec le profil de ${enfantActif.prenom}`
            :"Choisis celle qui te correspond !"}
        </p>
        {isPremium&&enfantActif&&(
          <div style={{background:"#ECFDF5",borderRadius:10,padding:"8px 12px",marginBottom:14,fontSize:11,color:"#065F46",textAlign:"center"}}>
            💡 En Premium, les activités sont filtrées et scorées selon le profil sensoriel de <strong>{enfantActif.prenom}</strong>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {visibles.length===0?(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <p style={{fontSize:32,margin:"0 0 8px"}}>🔄</p>
              <p style={{fontSize:13,color:TM,margin:0}}>Toutes les propositions ont été exclues.<br/>Ferme et relance le générateur.</p>
            </div>
          ):visibles.map((item,i)=>{
            const badge=isPremium&&enfantActif?getCompatBadge(item._score):null;
            return(
              <div key={item.id||i} style={{background:BG,borderRadius:16,padding:14,border:badge?.col==="#10B981"?"2px solid #10B981":BD}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:8}}>
                  <span style={{fontSize:28,flexShrink:0}}>{emojiFor(item)}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:TX}}>{item.nom}</p>
                    <p style={{margin:0,fontSize:12,color:TM}}>{type==="sortie"?`${item.ville||""}${item.prix?" · "+item.prix:""}`:`${item.age||""}${item.lieu?" · "+(item.lieu==="interieur"?"Intérieur":"Extérieur"):""}`}</p>
                  </div>
                  {badge&&<span style={{fontSize:11,fontWeight:700,color:badge.col,background:badge.bg,padding:"3px 8px",borderRadius:10,flexShrink:0,border:`1px solid ${badge.col}33`}}>{badge.label}</span>}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onChoisir(item)} style={{flex:1,padding:"10px 0",borderRadius:20,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>{type==="sortie"?"Choisir cette sortie":"Choisir cette activité"}</button>
                  {isPremium&&visibles.length>1&&<button onClick={()=>setExcluded(prev=>new Set([...prev,item.id||item.nom]))} style={{padding:"10px 12px",borderRadius:20,background:WH,border:BD,color:TM,fontSize:12,cursor:"pointer"}} title="Pas celle-là">✕</button>}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} style={{width:"100%",marginTop:16,padding:"10px 0",borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button>
      </div>
    </div>
  );
}

function BottomSheet({item,type,onClose,onFav,isFav,onDone}){
  const [showNote,setShowNote]=useState(false);
  const [note,setNote]=useState("");
  const NOTE_PRESETS=["👍 Super !","❤️ A adoré","🔄 À retenter","😴 Trop long","😬 Trop difficile","💡 Bonne idée"];

  if(!item)return null;
  if(showNote) return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}} onClick={()=>setShowNote(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:24,padding:24,width:"100%",maxWidth:390,boxSizing:"border-box",boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <span style={{fontSize:36}}>✅</span>
          <p style={{margin:"8px 0 4px",fontSize:16,fontWeight:800,color:TX}}>{item.nom||item.titre||""}</p>
          <p style={{margin:0,fontSize:12,color:TM}}>Ajoutez une note (optionnel)</p>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
          {NOTE_PRESETS.map(p=>(
            <button key={p} onClick={()=>setNote(n=>n===p?"":p)} style={{padding:"6px 12px",borderRadius:20,border:`2px solid ${note===p?"#10B981":"rgba(0,0,0,0.1)"}`,background:note===p?"#ECFDF5":WH,color:note===p?"#065F46":TM,fontSize:12,fontWeight:600,cursor:"pointer"}}>{p}</button>
          ))}
        </div>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Ou écrivez votre propre note..." rows={2} style={{width:"100%",padding:"10px 14px",borderRadius:12,border:BD,fontSize:13,resize:"none",boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:12}}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setShowNote(false)} style={{flex:1,padding:12,borderRadius:28,background:BG,border:"none",color:TM,fontWeight:600,cursor:"pointer"}}>Annuler</button>
          <button onClick={()=>{onDone({...item,_note:note,_date:new Date().toISOString()});onClose();}} style={{flex:2,padding:12,borderRadius:28,background:"#10B981",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>✓ Enregistrer !</button>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:24,padding:24,width:"100%",maxWidth:390,boxSizing:"border-box",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}>
        <span style={{fontSize:11,background:VL,color:V,padding:"3px 10px",borderRadius:12,fontWeight:500}}>{type==="activite"?(item.categorie||""):( item.type||item.categorie||"")}</span>
        <h3 style={{margin:"8px 0 4px",fontSize:18,color:TX}}>{item.nom||item.titre||""}</h3>
        {type==="activite"&&<p style={{margin:0,fontSize:13,color:TM}}>{item.age||""}</p>}
        {type==="sortie"&&<p style={{margin:0,fontSize:13,color:TM}}>{item.ville||""}{item.prix?" - "+item.prix:""}</p>}
        <p style={{fontSize:14,color:TX,lineHeight:1.6,margin:"12px 0"}}>{item.desc||"Aucune description disponible."}</p>
        <TND tnd={item.tnd}/>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <button onClick={onClose} style={{flex:1,padding:"11px 0",borderRadius:12,background:BG,border:"none",color:TX,fontWeight:500,fontSize:14,cursor:"pointer"}}>Relancer</button>
          <button onClick={()=>onFav(item)} style={{flex:1,padding:"11px 0",borderRadius:12,background:isFav?V:VL,border:"none",color:isFav?WH:V,fontWeight:500,fontSize:14,cursor:"pointer"}}>{isFav?"Sauvegardé":"Favoris"}</button>
          {onDone&&type==="activite"&&<button onClick={()=>setShowNote(true)} style={{flex:1,padding:"11px 0",borderRadius:12,background:"#10B981",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>✓ Fait !</button>}
        </div>
      </div>
    </div>
  );
}

// Compresse une image avant stockage pour rester largement sous la limite de 5MB par cle de stockage.
const compresserImage=(file,maxDim=900,qualite=0.72)=>new Promise((resolve,reject)=>{
  const reader=new FileReader();
  reader.onerror=()=>reject(new Error("lecture impossible"));
  reader.onload=(ev)=>{
    const img=new Image();
    img.onerror=()=>reject(new Error("image invalide"));
    img.onload=()=>{
      let{width,height}=img;
      if(width>maxDim||height>maxDim){
        if(width>height){ height=Math.round(height*(maxDim/width)); width=maxDim; }
        else{ width=Math.round(width*(maxDim/height)); height=maxDim; }
      }
      const canvas=document.createElement("canvas");
      canvas.width=width; canvas.height=height;
      const ctx=canvas.getContext("2d");
      if(!ctx){resolve(reader.result);return;}
      ctx.fillStyle="#FFFFFF";
      ctx.fillRect(0,0,width,height);
      ctx.drawImage(img,0,0,width,height);
      resolve(canvas.toDataURL("image/jpeg",qualite));
    };
    img.src=ev.target.result;
  };
  reader.readAsDataURL(file);
});

function FormActivite({onClose,onSubmit,customCatActivites=[]}){
  const [titre,setTitre]=useState("");
  const [photoPreview,setPhotoPreview]=useState(null);
  const [desc,setDesc]=useState("");
  const [duree,setDuree]=useState("");
  const [difficulte,setDifficulte]=useState("");
  const [lieu,setLieu]=useState("");
  const [motivation,setMotivation]=useState("");
  const [categorie,setCategorie]=useState("");
  const [autreCategorie,setAutreCategorie]=useState("");
  const [ageMin,setAgeMin]=useState("");
  const [ageMax,setAgeMax]=useState("");
  const [materiel,setMateriel]=useState("");
  const [etapes,setEtapes]=useState("");
  const [accValues,setAccValues]=useState({});
  const [commentaireTND,setCommentaireTND]=useState("");
  const [localErrors,setLocalErrors]=useState({});
  const [profilsTND,setProfilsTND]=useState({tsa:false,tdah:false,dys:false,tous:false});
  const [niveauxSensoriels,setNiveauxSensoriels]=useState({bruit:0,visuel:0,physique:0,attention:0});
  const [adaptations,setAdaptations]=useState([]);
  const handlePhoto=async(e)=>{const file=e.target.files[0];if(!file)return;if(file.size>8*1024*1024){alert("Photo trop lourde (max 8MB)");return;}try{const compressed=await compresserImage(file);setPhotoPreview(compressed);}catch(err){alert("Impossible de lire cette image, réessaie avec une autre.");}};
  const validate=()=>{const e={};if(!titre.trim())e.titre="Champ obligatoire";if(!desc.trim())e.desc="Champ obligatoire";if(!duree)e.duree="Champ obligatoire";if(!difficulte)e.difficulte="Champ obligatoire";if(!lieu)e.lieu="Champ obligatoire";if(!motivation)e.motivation="Champ obligatoire";if(!categorie)e.categorie="Champ obligatoire";setLocalErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=()=>{
    if(!validate())return;
    const categorieFinale=categorie==="Autre"?(autreCategorie.trim()||"Autre"):categorie;
    const age=(ageMin&&ageMax)?`${ageMin.replace(" an","").replace(" ans","")} - ${ageMax}`:(ageMin||ageMax||"Tous ages");
    const tndData={tsa:profilsTND.tsa||profilsTND.tous?5:0,tdah:profilsTND.tdah||profilsTND.tous?5:0,dys:profilsTND.dys||profilsTND.tous?5:0};
    if(onSubmit)onSubmit({nom:titre.trim(),categorie:categorieFinale,lieu,energie:motivation,age,duree,difficulte,materiel:materiel?materiel.split(",").map(m=>m.trim()).filter(Boolean):[],etapes:etapes?etapes.split("\n").map(s=>s.trim()).filter(Boolean):[],desc:desc.trim(),photo:photoPreview,tnd:tndData,profilsTND,niveauxSensoriels,adaptations,commentaireTND:commentaireTND.trim(),...accValues,_type:"activite"});
  };
  const se=(err)=>({padding:"12px 14px",borderRadius:12,border:"1px solid "+(err?"#EF4444":"rgba(108,92,231,0.15)"),fontSize:14,width:"100%",boxSizing:"border-box",background:WH,fontFamily:"inherit"});
  const Err=({k})=>localErrors[k]?<p style={{margin:"3px 0 0",fontSize:11,color:"#EF4444"}}>{localErrors[k]}</p>:null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px 12px 40px"}}>
      <div style={{background:WH,borderRadius:20,width:"100%",maxWidth:420,boxSizing:"border-box"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 20px 0"}}><h2 style={{fontSize:18,fontWeight:600,color:TX,margin:0}}>Proposer une activite</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TM}}>x</button></div>
        <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
          <Field label="Titre" required><input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Ex : Peinture avec les doigts" style={se(localErrors.titre)}/><Err k="titre"/></Field>
          <Field label="Photo (optionnel)">
            <input id="act-photo-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} style={{display:"none"}}/>
            {photoPreview?(
              <div style={{position:"relative",borderRadius:12,overflow:"hidden",height:140}}>
                <img src={photoPreview} alt="Apercu" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <button onClick={()=>document.getElementById("act-photo-input").click()} style={{background:WH,border:"none",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:TX}}>Changer</button>
                  <button onClick={()=>setPhotoPreview(null)} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:WH}}>Supprimer</button>
                </div>
              </div>
            ):(
              <div onClick={()=>document.getElementById("act-photo-input").click()} style={{border:"1.5px dashed rgba(108,92,231,0.3)",borderRadius:12,padding:"20px 0",textAlign:"center",cursor:"pointer",background:BG}}>
                <div style={{fontSize:22,marginBottom:6}}>⬆️</div>
                <p style={{margin:0,fontSize:13,color:TX}}>Ajouter une photo</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:TM}}>JPG, PNG - Max 5MB</p>
              </div>
            )}
          </Field>
          <Field label="Description" required><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Decris l activite" rows={3} style={{...FST,border:"1px solid "+(localErrors.desc?"#EF4444":"rgba(108,92,231,0.15)")}}/><Err k="desc"/></Field>
          <div style={{display:"flex",gap:8}}>
            <Field label="Duree" required style={{flex:1}}><select value={duree} onChange={e=>setDuree(e.target.value)} style={se(localErrors.duree)}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select><Err k="duree"/></Field>
            <Field label="Difficulte" required style={{flex:1}}><select value={difficulte} onChange={e=>setDifficulte(e.target.value)} style={se(localErrors.difficulte)}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select><Err k="difficulte"/></Field>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Field label="Lieu" required style={{flex:1}}><select value={lieu} onChange={e=>setLieu(e.target.value)} style={se(localErrors.lieu)}><option value="">Choisir</option><option value="interieur">Interieur</option><option value="exterieur">Exterieur</option></select><Err k="lieu"/></Field>
            <Field label="Motivation" required style={{flex:1}}><select value={motivation} onChange={e=>setMotivation(e.target.value)} style={se(localErrors.motivation)}><option value="">Choisir</option><option value="fatigue">Fatigue</option><option value="motiv">Motiv</option></select><Err k="motivation"/></Field>
          </div>
          <Field label="Categorie" required>
            <select value={categorie} onChange={e=>{setCategorie(e.target.value);if(e.target.value!=="Autre")setAutreCategorie("");}} style={se(localErrors.categorie)}>
              <option value="">Choisir</option>
              {[...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)].map(v=><option key={v}>{v}</option>)}
              <option value="Autre">✏️ Autre type d'activité...</option>
            </select>
            {categorie==="Autre"&&<input value={autreCategorie} onChange={e=>setAutreCategorie(e.target.value)} placeholder="Précisez le type d'activité (ex: Théâtre, Yoga, Poterie...)" style={{...FS,marginTop:8}}/>}
            <Err k="categorie"/>
          </Field>
          <Field label="Age conseille"><div style={{display:"flex",gap:8}}><select value={ageMin} onChange={e=>setAgeMin(e.target.value)} style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select><select value={ageMax} onChange={e=>setAgeMax(e.target.value)} style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select></div></Field>
          <Field label="Materiel necessaire"><input value={materiel} onChange={e=>setMateriel(e.target.value)} placeholder="Ex : peinture, papier, tablier" style={FS}/></Field>
          <Field label="Etapes"><textarea value={etapes} onChange={e=>setEtapes(e.target.value)} placeholder="1. Preparer..." rows={4} style={FST}/></Field>
          
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les activites proposees doivent etre destinees aux enfants.</p></div>

          {/* ─── SECTION TND COMPLÈTE ─── */}
          <div style={{background:"#F5F0EB",borderRadius:16,padding:"18px 16px",display:"flex",flexDirection:"column",gap:18}}>

            {/* Partie 1 — Profils */}
            <div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:"#1a1a1a"}}>🧩 Profils TND adaptés</p>
              <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Cochez les profils pour lesquels cette activité est particulièrement adaptée</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[
                  {k:"tsa",l:"🧩 TSA",sub:"Spectre autistique",bg:"#EEEDFE",bc:"#3C3489",col:"#3C3489"},
                  {k:"tdah",l:"⚡ TDAH",sub:"Déficit attention",bg:"#E1F5EE",bc:"#085041",col:"#085041"},
                  {k:"dys",l:"📖 DYS",sub:"Troubles dys",bg:"#FAEEDA",bc:"#633806",col:"#633806"},
                  {k:"tous",l:"🌱 Tous profils",sub:"",bg:"#EAF3DE",bc:"#3B6D11",col:"#3B6D11"},
                ].map(({k,l,sub,bg,bc,col})=>{
                  const actif=profilsTND[k];
                  return(
                    <button key={k} onClick={()=>setProfilsTND(p=>({...p,[k]:!p[k]}))} style={{padding:"8px 14px",borderRadius:20,border:`2px solid ${actif?bc:"#E5E7EB"}`,background:actif?bg:WH,color:actif?col:"#9CA3AF",fontSize:12,fontWeight:actif?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                      <span>{l}</span>
                      {sub&&<span style={{fontSize:9,opacity:0.8}}>{sub}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Partie 2 — Niveaux sensoriels */}
            <div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:"#1a1a1a"}}>🎚️ Niveaux sensoriels</p>
              <p style={{margin:"0 0 14px",fontSize:12,color:TM}}>Ces infos aident les parents TND à choisir les activités adaptées à leur enfant</p>
              {[
                {label:"🔊 Niveau sonore",k:"bruit",left:"Silencieux",right:"Bruyant"},
                {label:"💡 Stimulation visuelle",k:"visuel",left:"Calme",right:"Intense"},
                {label:"🤸 Activité physique",k:"physique",left:"Aucune",right:"Intense"},
                {label:"⏱️ Durée d'attention",k:"attention",left:"Courte",right:"Longue"},
              ].map(({label,k,left,right})=>{
                const val=niveauxSensoriels[k]||0;
                const col=val<=33?"#10B981":val<=66?"#F59E0B":"#EF4444";
                const badge=val<=33?"Faible":val<=66?"Moyen":"Élevé";
                return(
                  <div key={k} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:600,color:"#1a1a1a"}}>{label}</span>
                      <span style={{fontSize:11,fontWeight:700,color:col,background:col+"18",padding:"2px 10px",borderRadius:20}}>{badge}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:10,color:TM,width:52,flexShrink:0,textAlign:"right"}}>{left}</span>
                      <div style={{flex:1,position:"relative",height:6,background:"#E5E7EB",borderRadius:6,overflow:"hidden"}}>
                        <div style={{position:"absolute",left:0,top:0,height:"100%",width:val+"%",background:col,borderRadius:6,transition:"width 0.2s"}}/>
                      </div>
                      <span style={{fontSize:10,color:TM,width:52,flexShrink:0}}>{right}</span>
                    </div>
                    <input type="range" min={0} max={100} value={val} onChange={e=>setNiveauxSensoriels(p=>({...p,[k]:Number(e.target.value)}))} style={{width:"100%",marginTop:4,accentColor:col,cursor:"pointer"}}/>
                  </div>
                );
              })}
            </div>

            {/* Partie 3 — Adaptations */}
            <div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:"#1a1a1a"}}>✅ Adaptations possibles</p>
              <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Cochez ce qui s'applique à cette activité</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  "Peut se faire en silence",
                  "Rythme libre",
                  "Activité individuelle",
                  "Peu de règles",
                  "Résultat concret",
                  "Stimulation douce",
                  "Peut être interrompue",
                  "Adapté aux hypersensibles",
                ].map(ad=>{
                  const actif=adaptations.includes(ad);
                  return(
                    <button key={ad} onClick={()=>setAdaptations(p=>p.includes(ad)?p.filter(x=>x!==ad):[...p,ad])} style={{padding:"8px 10px",borderRadius:10,border:`1.5px solid ${actif?"#6C5CE7":"#E5E7EB"}`,background:actif?"#EEEDFE":WH,color:actif?"#3C3489":"#6B7280",fontSize:11,fontWeight:actif?700:400,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:14}}>{actif?"☑":"☐"}</span>{ad}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Commentaire libre */}
            <div>
              <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Conseil TND (optionnel)</label>
              <textarea value={commentaireTND} onChange={e=>setCommentaireTND(e.target.value.slice(0,200))} placeholder="Ex : Idéal pour les enfants TSA, activité calme sans surprise..." rows={2} style={FST}/>
              <p style={{margin:"4px 0 0",fontSize:11,color:TM,textAlign:"right"}}>{commentaireTND.length}/200</p>
            </div>
          </div>

          <button onClick={handleSubmit} style={{padding:14,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",width:"100%"}}>Envoyer ma suggestion</button>
        </div>
      </div>
    </div>
  );
}

function FormSortie({onClose,onSubmit,customCatSorties=[]}){
  const [nom,setNom]=useState("");
  const [photoPreview,setPhotoPreview]=useState(null);
  const [desc,setDesc]=useState("");
  const [ville,setVille]=useState("");
  const [dept,setDept]=useState("");
  const [typeAutreSortie,setTypeAutreSortie]=useState("");
  const [showAutreSortiePopup,setShowAutreSortiePopup]=useState(false);
  const [typeAutreSortieTemp,setTypeAutreSortieTemp]=useState("");
  const [typeSortieSelected,setTypeSortieSelected]=useState("");
  const [tarif,setTarif]=useState("");
  const [horaires,setHoraires]=useState("");
  const [accValues,setAccValues]=useState({});
  const [commentaireTND,setCommentaireTND]=useState("");
  const [localErrors,setLocalErrors]=useState({});
  const handlePhoto=async(e)=>{const file=e.target.files[0];if(!file)return;if(file.size>8*1024*1024){alert("Photo trop lourde (max 8MB)");return;}try{const compressed=await compresserImage(file);setPhotoPreview(compressed);}catch(err){alert("Impossible de lire cette image, réessaie avec une autre.");}};
  const validate=()=>{const e={};if(!nom.trim())e.nom="Champ obligatoire";if(!ville.trim())e.ville="Champ obligatoire";if(!dept)e.dept="Champ obligatoire";if(!typeSortieSelected)e.type="Champ obligatoire";setLocalErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=()=>{
    if(!validate())return;
    const typeFinal=typeSortieSelected==="autre"?(typeAutreSortie.trim()||"Autre"):typeSortieSelected;
    if(onSubmit)onSubmit({nom:nom.trim(),type:typeFinal,dept,ville:ville.trim(),desc:desc.trim(),photo:photoPreview,prix:tarif.trim()||"Gratuit",horaires:horaires.trim(),tnd:{tsa:3,tdah:3,dys:3},...accValues,commentaireTND:commentaireTND.trim(),_type:"sortie"});
  };
  const se=(err)=>({padding:"12px 14px",borderRadius:12,border:"1px solid "+(err?"#EF4444":"rgba(108,92,231,0.15)"),fontSize:14,width:"100%",boxSizing:"border-box",background:WH,fontFamily:"inherit"});
  const Err=({k})=>localErrors[k]?<p style={{margin:"3px 0 0",fontSize:11,color:"#EF4444"}}>{localErrors[k]}</p>:null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px 12px 40px"}}>
      <div style={{background:WH,borderRadius:20,width:"100%",maxWidth:420,boxSizing:"border-box"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 20px 0"}}><h2 style={{fontSize:18,fontWeight:600,color:TX,margin:0}}>Proposer une sortie</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TM}}>x</button></div>
        <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
          <Field label="Nom" required><input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Nom de la sortie" style={se(localErrors.nom)}/><Err k="nom"/></Field>
          <Field label="Photo (optionnel)">
            <input id="sortie-photo-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} style={{display:"none"}}/>
            {photoPreview?(
              <div style={{position:"relative",borderRadius:12,overflow:"hidden",height:140}}>
                <img src={photoPreview} alt="Apercu" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <button onClick={()=>document.getElementById("sortie-photo-input").click()} style={{background:WH,border:"none",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:TX}}>Changer</button>
                  <button onClick={()=>setPhotoPreview(null)} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:WH}}>Supprimer</button>
                </div>
              </div>
            ):(
              <div onClick={()=>document.getElementById("sortie-photo-input").click()} style={{border:"1.5px dashed rgba(108,92,231,0.3)",borderRadius:12,padding:"20px 0",textAlign:"center",cursor:"pointer",background:BG}}>
                <div style={{fontSize:22,marginBottom:6}}>⬆️</div>
                <p style={{margin:0,fontSize:13,color:TX}}>Ajouter une photo</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:TM}}>JPG, PNG - Max 5MB</p>
              </div>
            )}
          </Field>
          <Field label="Description"><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description..." rows={3} style={FST}/></Field>
          <div style={{display:"flex",gap:8}}>
            <Field label="Ville" required style={{flex:1}}><input value={ville} onChange={e=>setVille(e.target.value)} placeholder="Ville" style={se(localErrors.ville)}/><Err k="ville"/></Field>
            <Field label="Departement" required style={{flex:1}}><select value={dept} onChange={e=>setDept(e.target.value)} style={se(localErrors.dept)}><option value="">Dept</option>{DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}</select><Err k="dept"/></Field>
          </div>
          <Field label="Type de sortie" required>
            <select value={typeSortieSelected} onChange={e=>{if(e.target.value==="autre"){setTypeAutreSortieTemp(typeAutreSortie);setShowAutreSortiePopup(true);}else{setTypeSortieSelected(e.target.value);}}} style={se(localErrors.type)}>
              <option value="">Choisir un type</option>{[...TYPES_SORTIE,...customCatSorties.map(c=>c.label)].map(t=><option key={t} value={t}>{t}</option>)}<option value="autre">{typeAutreSortie?"Autre: "+typeAutreSortie:"Autre..."}</option>
            </select>
            <Err k="type"/>
          </Field>
          <div style={{display:"flex",gap:8}}>
            <Field label="Tarif" style={{flex:1}}><input value={tarif} onChange={e=>setTarif(e.target.value)} placeholder="Tarif" style={FS}/></Field>
            <Field label="Horaires" style={{flex:1}}><input value={horaires} onChange={e=>setHoraires(e.target.value)} placeholder="Horaires" style={FS}/></Field>
          </div>
          <SectionAccessibilite values={accValues} onChange={setAccValues} commentaire={commentaireTND} onCommentaireChange={setCommentaireTND}/>
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les sorties proposees doivent etre adaptees aux enfants.</p></div>
          <button onClick={handleSubmit} style={{padding:14,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",width:"100%"}}>Envoyer ma suggestion</button>
        </div>
      </div>
      {showAutreSortiePopup&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}} onClick={()=>setShowAutreSortiePopup(false)}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}><p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX,textAlign:"center"}}>Autre type de sortie</p><input value={typeAutreSortieTemp} onChange={e=>setTypeAutreSortieTemp(e.target.value)} placeholder="Ex : Randonnee, Aquaparc..." style={{padding:"12px 14px",borderRadius:12,border:"1.5px solid "+V,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:16}}/><div style={{display:"flex",gap:10}}><button onClick={()=>setShowAutreSortiePopup(false)} style={{flex:1,padding:"11px 0",borderRadius:28,background:BG,border:"1px solid #E5E7EB",color:TX,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={()=>{if(typeAutreSortieTemp.trim()){setTypeAutreSortie(typeAutreSortieTemp.trim());setTypeSortieSelected("autre");}setShowAutreSortiePopup(false);}} style={{flex:1,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Confirmer</button></div></div></div>)}
    </div>
  );
}

function FormEvenement({onClose,onSubmit,onOpenAutrePopup,typeAutre,typeEvt,setTypeEvt,customCatEvenements=[]}){
  const [nom,setNom]=useState("");
  const [desc,setDesc]=useState("");
  const [photoPreview,setPhotoPreview]=useState(null);
  const [ville,setVille]=useState("");
  const [dept,setDept]=useState("");
  const [dateDebut,setDateDebut]=useState("");
  const [dateFin,setDateFin]=useState("");
  const [horaires,setHoraires]=useState("");
  const [tarif,setTarif]=useState("");
  const [adresse,setAdresse]=useState("");
  const [accValues,setAccValues]=useState({});
  const [commentaireTND,setCommentaireTND]=useState("");
  const [localErrors,setLocalErrors]=useState({});
  const handlePhoto=async(e)=>{const file=e.target.files[0];if(!file)return;if(file.size>8*1024*1024){alert("Photo trop lourde (max 8MB)");return;}try{const compressed=await compresserImage(file);setPhotoPreview(compressed);}catch(err){alert("Impossible de lire cette image, réessaie avec une autre.");}};
  const validate=()=>{const e={};if(!nom.trim())e.nom="Champ obligatoire";if(!desc.trim())e.desc="Champ obligatoire";if(!typeEvt)e.typeEvt="Champ obligatoire";if(!ville.trim())e.ville="Champ obligatoire";if(!dept)e.dept="Champ obligatoire";if(!dateDebut)e.dateDebut="Champ obligatoire";setLocalErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=()=>{if(!validate())return;const datesStr=dateFin?formatDateFR(dateDebut)+" - "+formatDateFR(dateFin):formatDateFR(dateDebut);const isGratuit=!tarif.trim()||tarif.toLowerCase().includes("gratuit");const categorieFinale=typeEvt==="autre"?(typeAutre||"autre"):typeEvt;onSubmit({nom:nom.trim(),desc:desc.trim(),categorie:categorieFinale,ville:ville.trim()+" ("+dept+")",dept,date:dateDebut,periode:detectPeriode(dateDebut),prix:tarif.trim()||"Non renseigne",gratuit:isGratuit,communaute:true,signalements:0,age:"Tous ages",dates:datesStr,photo:photoPreview,adresse:adresse.trim(),...accValues,commentaireTND:commentaireTND.trim(),tnd:{son:"moyenne",affluence:"moyenne",prevision:"moyenne",zonecalme:false}});};
  const se=(err)=>({padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid "+(err?"#EF4444":"rgba(108,92,231,0.15)")});
  const Err=({k})=>localErrors[k]?<p style={{margin:"3px 0 0",fontSize:11,color:"#EF4444"}}>{localErrors[k]}</p>:null;
  const lbl={fontSize:13,fontWeight:500,color:TX,display:"block",marginBottom:5};
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:60,fontFamily:"system-ui,-apple-system,sans-serif",display:"flex",flexDirection:"column"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",flexShrink:0}}>
        <button onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button>
        <span style={{fontSize:14,fontWeight:500,color:"#1a1a1a",flex:1,textAlign:"center"}}>Proposer un evenement</span>
        <div style={{width:32}}/>
      </div>
      <div style={{flex:1,overflowY:"scroll",WebkitOverflowScrolling:"touch",padding:"16px 16px 48px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={lbl}>Nom <span style={{color:RD}}>*</span></label><input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Ex : Fete foraine de Noel" style={se(localErrors.nom)}/><Err k="nom"/></div>
          <div><label style={lbl}>Photo (optionnel)</label><input id="evt-photo-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} style={{display:"none"}}/>{photoPreview?(<div style={{position:"relative",borderRadius:12,overflow:"hidden",height:160}}><img src={photoPreview} alt="Apercu" style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><button onClick={()=>document.getElementById("evt-photo-input").click()} style={{background:WH,border:"none",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:TX}}>Changer</button><button onClick={()=>setPhotoPreview(null)} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:WH}}>Supprimer</button></div></div>):(<div onClick={()=>document.getElementById("evt-photo-input").click()} style={{border:"1.5px dashed rgba(108,92,231,0.35)",borderRadius:12,padding:"24px 0",textAlign:"center",cursor:"pointer",background:"#FAFAFA"}}><div style={{fontSize:28,marginBottom:6}}>📸</div><p style={{margin:0,fontSize:13,color:TX,fontWeight:500}}>Ajouter une photo</p><p style={{margin:"4px 0 0",fontSize:11,color:TM}}>JPG, PNG, WEBP - Max 8MB</p></div>)}</div>
          <div><label style={lbl}>Description <span style={{color:RD}}>*</span></label><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Decris l evenement" rows={3} style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid "+(localErrors.desc?"#EF4444":"rgba(108,92,231,0.15)"),fontFamily:"inherit",resize:"none"}}/><Err k="desc"/></div>
          <div><label style={lbl}>Type <span style={{color:RD}}>*</span></label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{[...EVT_TYPE_OPTIONS,...customCatEvenements.map(c=>({k:c.k,l:c.emoji+" "+c.label}))].map(t=>{const on=typeEvt===t.k;const l2=t.k==="autre"&&typeAutre?"Autre: "+typeAutre:t.l;return(<button key={t.k} onClick={()=>{if(t.k==="autre"){onOpenAutrePopup();}else{setTypeEvt(t.k);setLocalErrors(p=>({...p,typeEvt:""}));}}} style={{padding:"7px 14px",borderRadius:20,border:"1.5px solid "+(on?V:"#E5E7EB"),background:on?V:WH,color:on?WH:"#374151",fontSize:13,cursor:"pointer"}}>{l2}</button>);})}</div>{localErrors.typeEvt&&<p style={{margin:"3px 0 0",fontSize:11,color:"#EF4444"}}>{localErrors.typeEvt}</p>}</div>
          <div style={{display:"flex",gap:10}}><div style={{flex:1}}><label style={lbl}>Ville <span style={{color:RD}}>*</span></label><input value={ville} onChange={e=>setVille(e.target.value)} placeholder="Ex : Lyon" style={se(localErrors.ville)}/><Err k="ville"/></div><div style={{flex:1}}><label style={lbl}>Dept <span style={{color:RD}}>*</span></label><select value={dept} onChange={e=>setDept(e.target.value)} style={se(localErrors.dept)}><option value="">Choisir</option>{DEPTS.map(d=><option key={d} value={d}>{d}</option>)}</select><Err k="dept"/></div></div>
          <div style={{display:"flex",gap:10}}><div style={{flex:1}}><label style={lbl}>Date debut <span style={{color:RD}}>*</span></label><input type="date" value={dateDebut} onChange={e=>setDateDebut(e.target.value)} style={se(localErrors.dateDebut)}/><Err k="dateDebut"/></div><div style={{flex:1}}><label style={lbl}>Date fin</label><input type="date" value={dateFin} onChange={e=>setDateFin(e.target.value)} style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div></div>
          <div><label style={lbl}>Horaires</label><input value={horaires} onChange={e=>setHoraires(e.target.value)} placeholder="Ex : 10h-20h" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <div><label style={lbl}>Tarif</label><input value={tarif} onChange={e=>setTarif(e.target.value)} placeholder="Ex : Gratuit / 5 euros" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <div><label style={lbl}>Adresse</label><input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Ex : Place du Capitole" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <SectionAccessibilite values={accValues} onChange={setAccValues} commentaire={commentaireTND} onCommentaireChange={setCommentaireTND}/>
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les evenements proposes doivent etre destines aux enfants ou aux familles.</p></div>
          <div style={{display:"flex",gap:10}}><button onClick={onClose} style={{flex:1,padding:14,borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:"#374151",fontWeight:500,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={handleSubmit} style={{flex:2,padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Envoyer</button></div>
        </div>
      </div>
    </div>
  );
}

const copierTexte=async(texte)=>{
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){ await navigator.clipboard.writeText(texte); return"copie"; }
  }catch(e){ /* presse-papiers moderne indisponible : on tente le repli */ }
  try{
    const ta=document.createElement("textarea");
    ta.value=texte;
    ta.style.position="fixed";
    ta.style.left="-9999px";
    ta.style.top="0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok=document.execCommand("copy");
    document.body.removeChild(ta);
    if(ok) return"copie";
  }catch(e){ /* aucune methode de copie disponible : on affichera le texte a copier a la main */ }
  return texte;
};

function PartageManuelModal({texte,onClose}){
  if(!texte)return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:950,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,maxWidth:340,width:"100%"}}>
        <p style={{margin:"0 0 8px",fontSize:15,fontWeight:700,color:TX,textAlign:"center"}}>Partager</p>
        <p style={{margin:"0 0 14px",fontSize:12,color:TM,textAlign:"center"}}>Copie ce texte pour le partager :</p>
        <textarea readOnly value={texte} onFocus={e=>e.target.select()} rows={3} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid rgba(108,92,231,0.2)",fontSize:13,color:TX,fontFamily:"inherit",resize:"none",boxSizing:"border-box",marginBottom:14}}/>
        <button onClick={onClose} style={{width:"100%",padding:12,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Fermer</button>
      </div>
    </div>
  );
}

function PartageMenu({show,titre,texte,onClose}){
  const [copieMsg,setCopieMsg]=useState("");
  const [manuel,setManuel]=useState("");
  if(!show)return null;
  const encoded=encodeURIComponent(texte);
  const canaux=[
    {label:"WhatsApp",emoji:"💬",bg:"#25D366",action:()=>{window.open(`https://wa.me/?text=${encoded}`,"_blank");onClose();}},
    {label:"SMS",emoji:"📱",bg:"#34C759",action:()=>{window.location.href=`sms:?body=${encoded}`;onClose();}},
    {label:"Email",emoji:"📧",bg:"#6C5CE7",action:()=>{window.location.href=`mailto:?subject=${encodeURIComponent(titre)}&body=${encoded}`;onClose();}},
    {label:"Facebook",emoji:"📘",bg:"#1877F2",action:()=>{window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encoded}`,"_blank");onClose();}},
    {label:"X",emoji:"✖️",bg:"#0F1419",action:()=>{window.open(`https://twitter.com/intent/tweet?text=${encoded}`,"_blank");onClose();}},
  ];
  const copier=async()=>{
    const r=await copierTexte(texte);
    if(r==="copie"){ setCopieMsg("Copié !"); setTimeout(()=>setCopieMsg(""),2000); }
    else setManuel(r);
  };
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:900,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"20px 20px 28px",width:"100%",maxWidth:420,boxSizing:"border-box"}}>
        <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
        <p style={{margin:"0 0 16px",fontSize:15,fontWeight:700,color:TX,textAlign:"center"}}>Partager</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:18}}>
          {canaux.map(c=>(
            <button key={c.label} onClick={c.action} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",padding:0}}>
              <span style={{width:48,height:48,borderRadius:"50%",background:c.bg,color:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{c.emoji}</span>
              <span style={{fontSize:10,color:TM,textAlign:"center"}}>{c.label}</span>
            </button>
          ))}
          {typeof navigator!=="undefined"&&navigator.share&&(
            <button onClick={async()=>{try{await navigator.share({title:titre,text:texte});}catch(e){}onClose();}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",padding:0}}>
              <span style={{width:48,height:48,borderRadius:"50%",background:"#9CA3AF",color:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⋯</span>
              <span style={{fontSize:10,color:TM,textAlign:"center"}}>Plus</span>
            </button>
          )}
        </div>
        {copieMsg&&<p style={{margin:"0 0 10px",fontSize:12,color:"#065F46",background:"#D1FAE5",borderRadius:10,padding:"8px 12px",fontWeight:600,textAlign:"center"}}>{copieMsg}</p>}
        <button onClick={copier} style={{width:"100%",padding:13,borderRadius:28,background:BG,border:"1px solid rgba(0,0,0,0.08)",color:TX,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:8}}>🔗 Copier le texte</button>
        <button onClick={onClose} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button>
      </div>
      <PartageManuelModal texte={manuel} onClose={()=>setManuel("")}/>
    </div>
  );
}

function SortieDetailPage({sortie,isFavorite,onToggleFavorite,onBack,onReport,isLoggedIn=true,onRequireAuth}){
  const card={background:WH,borderRadius:16,padding:14,marginBottom:12,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"};
  const sec=(t)=>(<div style={{fontSize:12,fontWeight:600,color:V,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{t}</div>);
  const emo=sortie.type==="Zoo"?"🦁":sortie.type==="Musee"?"🏛️":sortie.type==="Parc d attraction"?"🎢":sortie.type==="Plage"?"🏖️":sortie.type==="Bowling"?"🎳":sortie.type==="Escape game"?"🔐":sortie.type==="Ferme pedagogique"?"🐄":sortie.type==="Piscine"?"🏊":"🗺️";
  const {tousLesAvis,chargement,ajouterAvis,noteGlobale,noteParProfil}=useAvis("sortie",sortie.id);
  const [showPartageMenu,setShowPartageMenu]=useState(false);
  const partageTexte=`${sortie.nom||sortie.titre||""} - ${sortie.ville||""} | Decouvert sur Parent'Hèse`;
  const tndRows=[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"}].map(({label,bg,col})=>{
    const r=noteParProfil(label);
    return{label,bg,col,stars:r?Math.round(r.moyenne):0,moyenne:r?r.moyenne:null,avis:r?(r.nb+(r.nb>1?" avis":" avis")):null};
  });
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail de la sortie</span></div>
      <div style={{background:sortie.photo?`center/cover url(${sortie.photo})`:"linear-gradient(135deg,#E8F4FF,#D6EAFF)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:56,marginBottom:8,lineHeight:1,filter:sortie.photo?"drop-shadow(0 2px 8px rgba(0,0,0,0.4))":"none"}}>{sortie.photo?"":emo}</div><div style={{display:"inline-block",background:sortie.photo?"rgba(0,0,0,0.5)":V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{sortie.type}</div><div style={{fontSize:20,fontWeight:700,color:sortie.photo?WH:"#1a1a1a",marginBottom:6,textShadow:sortie.photo?"0 2px 6px rgba(0,0,0,0.5)":"none"}}>{sortie.nom}</div><div style={{fontSize:12,color:sortie.photo?WH:"#6B7280",textShadow:sortie.photo?"0 1px 4px rgba(0,0,0,0.5)":"none",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}><span>{sortie.ville}</span><span>{sortie.prix}</span>{!chargement&&tousLesAvis.length>0&&<span>{noteGlobale.toFixed(1)}/5</span>}</div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{label:"Adresse",val:sortie.ville+", Dept "+sortie.dept,icon:"📍"},{label:"Horaires",val:"10h00 - 18h00",icon:"🕙"},{label:"Tarifs",val:sortie.prix,icon:"🎫"},{label:"Type",val:sortie.type,icon:"🏷️"}].map(({label,val,icon},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:14,width:20,flexShrink:0,marginTop:1}}>{icon}</span><div style={{flex:1}}><div style={{fontSize:11,color:"#9CA3AF",marginBottom:2}}>{label}</div><div style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</div></div></div>))}</div>
        <div style={card}>{sec("A propos")}<p style={{fontSize:13,color:"#374151",lineHeight:1.6,margin:0}}>{sortie.desc||"Aucune description disponible."}</p></div>
        <div style={card}>{sec("Adapte TND")}<p style={{margin:"-4px 0 10px",fontSize:11,color:"#9CA3AF"}}>Moyenne calculee a partir des avis laisses par des familles concernees</p><div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>{[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"},{label:"PMR",bg:"#F0F4FF",col:"#1D4ED8"},{label:"Bebe",bg:"#FFF0F5",col:"#9D174D"}].map(({label,bg,col})=>(<span key={label} style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{label}</span>))}</div>{tndRows.map(({label,bg,col,stars,moyenne,avis},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{label}</span>{moyenne!=null?(<><Stars count={stars} size={13}/><span style={{fontSize:11,color:"#9CA3AF"}}>{moyenne.toFixed(1)} · {avis}</span></>):(<><span style={{fontSize:11,color:"#9CA3AF"}}>Pas encore</span><span/></>)}</div>))}</div>
        <div style={card}>{sec("Notes")}<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}><span style={{fontSize:36,fontWeight:700,color:"#1a1a1a"}}>{chargement?"...":noteGlobale.toFixed(1)}</span><div><Stars count={Math.round(noteGlobale)} size={18}/><div style={{fontSize:11,color:"#9CA3AF",marginTop:2}}>Sur {tousLesAvis.length} avis</div></div></div>{[5,4,3,2,1].map(n=>{const cnt=tousLesAvis.filter(a=>Number(a.stars)===n).length;const pct=tousLesAvis.length?Math.round((cnt/tousLesAvis.length)*100):0;return(<div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:11,color:"#9CA3AF",width:8}}>{n}</span><span style={{color:"#F5A623",fontSize:11}}>★</span><div style={{flex:1,height:6,background:BG2,borderRadius:10,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:"#F5A623",borderRadius:10}}/></div><span style={{fontSize:11,color:"#9CA3AF",width:16}}>{cnt}</span></div>);})}</div>
        <AvisForm isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth} tousLesAvis={tousLesAvis} chargement={chargement} onAjouterAvis={ajouterAvis}/>
        <button onClick={onToggleFavorite} style={{width:"100%",background:isFavorite?"#FCEBEB":V,color:isFavorite?"#A32D2D":WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>{isFavorite?"Retirer des favoris":"Ajouter aux favoris"}</button>
        <button onClick={()=>setShowPartageMenu(true)} style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer"}}>Partager</button>
        <SignalementButton type="sortie" onSignaler={(raison,detail)=>{if(onReport)onReport({type:"sortie",titre:sortie.nom,raison,detail:detail||"",signalePar:"utilisateur@parentales.fr",dept:sortie.dept,prix:sortie.prix,ville:sortie.ville,categorie:sortie.type});}}/>
      </div>
      <PartageMenu show={showPartageMenu} titre={sortie.nom} texte={partageTexte} onClose={()=>setShowPartageMenu(false)}/>
    </div>
  );
}

function ActivityDetailPage({activity,isFavorite,onToggleFavorite,onBack,onReport,isLoggedIn=true,onRequireAuth}){
  const titre=activity.titre||activity.title||activity.nom||"";
  const emoji=activity.emoji||"🎨";
  const categorie=activity.categorie||activity.category||"";
  const duree=activity.duree||activity.duration||"";
  const difficulte=activity.difficulte||activity.difficulty||"";
  const lieu=activity.lieu||activity.location||"";
  const motivation=activity.motivation||activity.energie||"";
  const materiel=MATERIEL_MAP[titre]||null;
  const etapes=ETAPES_MAP[titre]||null;
  const motLabel=motivation==="fatigue"?"Fatigue":motivation==="motiv"?"Motiv":motivation||"-";
  const lieuLabel=lieu==="interieur"?"Interieur":lieu==="exterieur"?"Exterieur":lieu||"-";
  const card={background:WH,borderRadius:16,padding:14,marginBottom:12,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"};
  const sec=(t)=>(<div style={{fontSize:12,fontWeight:600,color:V,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{t}</div>);
  const {tousLesAvis,chargement,ajouterAvis,noteGlobale,noteParProfil}=useAvis("activite",activity.id);
  const [showPartageMenu,setShowPartageMenu]=useState(false);
  const partageTexte=`${activity.nom||activity.titre||""} | Decouvert sur Parent'Hèse`;
  const tndRows=[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"}].map(({label,bg,col})=>{
    const r=noteParProfil(label);
    return{label,bg,col,stars:r?Math.round(r.moyenne):0,moyenne:r?r.moyenne:null,avis:r?(r.nb+" avis"):null};
  });
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail de l activite</span></div>
      <div style={{background:activity.photo?`center/cover url(${activity.photo})`:"linear-gradient(135deg,#EEEDFE,#DDD9FD)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:64,marginBottom:8,lineHeight:1}}>{activity.photo?"":emoji}</div><div style={{display:"inline-block",background:activity.photo?"rgba(0,0,0,0.5)":V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{categorie}</div><div style={{fontSize:20,fontWeight:700,color:activity.photo?WH:"#1a1a1a",marginBottom:6,textShadow:activity.photo?"0 2px 6px rgba(0,0,0,0.5)":"none"}}>{titre}</div><div style={{fontSize:12,color:activity.photo?WH:"#6B7280",textShadow:activity.photo?"0 1px 4px rgba(0,0,0,0.5)":"none",display:"flex",justifyContent:"center",gap:12}}>{duree&&<span>{duree}</span>}{difficulte&&<span>{difficulte}</span>}{lieuLabel&&<span>{lieuLabel}</span>}</div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{label:"Motivation",val:motLabel},{label:"Age conseille",val:activity.age||"Tous ages"},{label:"Difficulte",val:difficulte||"-"}].map(({label,val},i)=>(<div key={label} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<2?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:12,color:"#9CA3AF",width:80,flexShrink:0}}>{label}</span><span style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</span></div>))}</div>
        <div style={card}>{sec("Materiel")}{materiel?<div>{materiel.map((m,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,background:BG,borderRadius:20,padding:"4px 10px",fontSize:12,color:"#374151",margin:3}}>{m}</span>))}</div>:<span style={{fontSize:13,color:TM}}>Aucun materiel necessaire !</span>}</div>
        <div style={card}>{sec("Etapes")}{etapes?etapes.map((e,i)=>(<div key={i} style={{display:"flex",gap:10,padding:"6px 0"}}><div style={{width:22,height:22,borderRadius:"50%",background:V,color:WH,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div><div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{e}</div></div>)):<span style={{fontSize:13,color:TM}}>Laissez parler votre creativite !</span>}</div>

        {/* Section TND */}
        {(()=>{
          const p=activity.profilsTND||{};
          const n=activity.niveauxSensoriels||{};
          const adaps=activity.adaptations||[];
          const hasData=p.tsa||p.tdah||p.dys||p.tous||Object.values(n).some(v=>v>0)||adaps.length>0||activity.commentaireTND;
          if(!hasData) return(
            <div style={{...card,textAlign:"center",padding:"20px 14px"}}>
              {sec("🧩 Infos TND")}
              <p style={{fontSize:13,color:TM,margin:"0 0 12px"}}>Pas encore d'infos TND pour cette activité — sois le premier à contribuer !</p>
              <button onClick={()=>onReport&&onReport({...activity,_action:"tnd_request"})} style={{padding:"8px 20px",borderRadius:20,background:VL,border:"none",color:V,fontWeight:700,fontSize:12,cursor:"pointer"}}>✏️ Proposer des infos TND</button>
              <p style={{margin:"8px 0 0",fontSize:11,color:TM}}>Ta contribution sera examinée par notre équipe</p>
            </div>
          );
          return(
            <div style={card}>
              {sec("🧩 Infos TND")}
              {/* Profils */}
              {(p.tsa||p.tdah||p.dys||p.tous)&&(
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                  {p.tous&&<span style={{background:"#EAF3DE",color:"#3B6D11",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>🌱 Tous profils</span>}
                  {p.tsa&&<span style={{background:"#EEEDFE",color:"#3C3489",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>🧩 TSA</span>}
                  {p.tdah&&<span style={{background:"#E1F5EE",color:"#085041",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>⚡ TDAH</span>}
                  {p.dys&&<span style={{background:"#FAEEDA",color:"#633806",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>📖 DYS</span>}
                </div>
              )}
              {/* Niveaux sensoriels */}
              {Object.values(n).some(v=>v>0)&&(
                <div style={{marginBottom:14}}>
                  {[{k:"bruit",l:"🔊 Niveau sonore"},{k:"visuel",l:"💡 Stimulation visuelle"},{k:"physique",l:"🤸 Activité physique"},{k:"attention",l:"⏱️ Durée d'attention"}].map(({k,l})=>{
                    const val=n[k]||0;
                    const col=val<=33?"#10B981":val<=66?"#F59E0B":"#EF4444";
                    const badge=val<=33?"Faible":val<=66?"Moyen":"Élevé";
                    return(
                      <div key={k} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span style={{fontSize:12,color:"#374151"}}>{l}</span>
                          <span style={{fontSize:11,fontWeight:700,color:col}}>{badge}</span>
                        </div>
                        <div style={{height:6,background:"#E5E7EB",borderRadius:6,overflow:"hidden"}}>
                          <div style={{height:"100%",width:val+"%",background:col,borderRadius:6}}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Adaptations */}
              {adaps.length>0&&(
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                  {adaps.map(a=><span key={a} style={{background:"#ECFDF5",color:"#065F46",fontSize:11,padding:"4px 10px",borderRadius:20,border:"1px solid #A7F3D0"}}>✓ {a}</span>)}
                </div>
              )}
              {/* Commentaire */}
              {activity.commentaireTND&&<p style={{margin:0,fontSize:12,color:TM,fontStyle:"italic",lineHeight:1.6}}>💬 {activity.commentaireTND}</p>}
            </div>
          );
        })()}
        <div style={card}>{sec("Notes")}<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28,fontWeight:700,color:"#1a1a1a"}}>{chargement?"...":noteGlobale.toFixed(1)}</span><div><Stars count={Math.round(noteGlobale)} size={14}/><div style={{fontSize:11,color:"#9CA3AF"}}>{tousLesAvis.length} avis</div></div></div><p style={{margin:"0 0 8px",fontSize:11,color:"#9CA3AF"}}>Moyenne par profil, calculee a partir des avis</p>{tndRows.map(({label,bg,col,stars,moyenne,avis},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{label}</span>{moyenne!=null?(<><Stars count={stars} size={12}/><span style={{fontSize:11,color:"#9CA3AF"}}>{moyenne.toFixed(1)} · {avis}</span></>):(<><span style={{fontSize:11,color:"#9CA3AF"}}>Pas encore</span><span/></>)}</div>))}</div>
        <AvisForm isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth} tousLesAvis={tousLesAvis} chargement={chargement} onAjouterAvis={ajouterAvis}/>
        <button onClick={onToggleFavorite} style={{width:"100%",background:isFavorite?"#FCEBEB":V,color:isFavorite?"#A32D2D":WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>{isFavorite?"Retirer des favoris":"Ajouter aux favoris"}</button>
        <button onClick={()=>setShowPartageMenu(true)} style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer"}}>Partager</button>
        <SignalementButton type="activite" onSignaler={(raison,detail)=>{if(onReport)onReport({type:"activite",titre:activity.nom||activity.titre||activity.title,raison,detail:detail||"",signalePar:"utilisateur@parentales.fr",categorie:activity.categorie,lieu:activity.lieu,age:activity.age});}}/>
      </div>
      <PartageMenu show={showPartageMenu} titre={activity.nom} texte={partageTexte} onClose={()=>setShowPartageMenu(false)}/>
    </div>
  );
}

function EvenementDetail({evt,onBack,onReport,isFavorite,onToggleFavorite,isLoggedIn=true,onRequireAuth,customCatEvenements=[]}){
  const cat=EVT_CATEGORIES.find(c=>c.k===evt.categorie)||customCatEvenements.find(c=>c.k===evt.categorie)||{emoji:"🎉",label:""};
  const card={background:WH,borderRadius:16,padding:14,marginBottom:12,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"};
  const sec=(t)=>(<div style={{fontSize:12,fontWeight:600,color:V,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{t}</div>);
  const {tousLesAvis,chargement,ajouterAvis,noteGlobale,noteParProfil}=useAvis("evenement",evt.id);
  const [showPartageMenu,setShowPartageMenu]=useState(false);
  const partageTexte=`${evt.nom||evt.titre||""} - ${evt.ville||""} | Decouvert sur Parent'Hèse`;
  const tndRows=[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"}].map(({label,bg,col})=>{
    const r=noteParProfil(label);
    return{label,bg,col,stars:r?Math.round(r.moyenne):0,moyenne:r?r.moyenne:null,avis:r?(r.nb+" avis"):null};
  });
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail evenement</span></div>
      <div style={{background:evt.photo?`center/cover url(${evt.photo})`:"linear-gradient(135deg,#FFF7ED,#FEE2CE)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:56,marginBottom:8,lineHeight:1}}>{evt.photo?"":cat.emoji}</div><div style={{display:"inline-block",background:evt.photo?"rgba(0,0,0,0.5)":V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{cat.label||evt.categorie}</div><div style={{fontSize:20,fontWeight:700,color:evt.photo?WH:"#1a1a1a",marginBottom:6,textShadow:evt.photo?"0 2px 6px rgba(0,0,0,0.5)":"none"}}>{evt.nom}</div><div style={{fontSize:12,color:evt.photo?WH:"#6B7280",textShadow:evt.photo?"0 1px 4px rgba(0,0,0,0.5)":"none",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}><span>{evt.ville}</span><span>{evt.prix}</span><span>{evt.age}</span>{!chargement&&tousLesAvis.length>0&&<span>{noteGlobale.toFixed(1)}/5</span>}</div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{icon:"📍",label:"Lieu",val:evt.ville},{icon:"📅",label:"Date",val:evt.date},{icon:"🎫",label:"Tarif",val:evt.prix},{icon:"👶",label:"Age",val:evt.age}].map(({icon,label,val},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:14,width:20,flexShrink:0,marginTop:1}}>{icon}</span><div style={{flex:1}}><div style={{fontSize:11,color:"#9CA3AF",marginBottom:2}}>{label}</div><div style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</div></div></div>))}</div>
        <div style={card}>{sec("A propos")}<p style={{fontSize:13,color:"#374151",lineHeight:1.6,margin:0}}>{evt.desc||"Aucune description disponible."}</p></div>
        <div style={card}>{sec("Profil sensoriel du lieu")}<TNDBadgesEvt tnd={evt.tnd}/></div>
        <div style={card}>{sec("Adapte TND")}<p style={{margin:"-4px 0 10px",fontSize:11,color:"#9CA3AF"}}>Moyenne calculee a partir des avis laisses par des familles concernees</p><div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>{[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"},{label:"PMR",bg:"#F0F4FF",col:"#1D4ED8"},{label:"Bebe",bg:"#FFF0F5",col:"#9D174D"}].map(({label,bg,col})=>(<span key={label} style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{label}</span>))}</div>{tndRows.map(({label,bg,col,stars,moyenne,avis},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{label}</span>{moyenne!=null?(<><Stars count={stars} size={13}/><span style={{fontSize:11,color:"#9CA3AF"}}>{moyenne.toFixed(1)} · {avis}</span></>):(<><span style={{fontSize:11,color:"#9CA3AF"}}>Pas encore</span><span/></>)}</div>))}</div>
        <div style={card}>{sec("Notes")}<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}><span style={{fontSize:36,fontWeight:700,color:"#1a1a1a"}}>{chargement?"...":noteGlobale.toFixed(1)}</span><div><Stars count={Math.round(noteGlobale)} size={18}/><div style={{fontSize:11,color:"#9CA3AF",marginTop:2}}>Sur {tousLesAvis.length} avis</div></div></div>{[5,4,3,2,1].map(n=>{const cnt=tousLesAvis.filter(a=>Number(a.stars)===n).length;const pct=tousLesAvis.length?Math.round((cnt/tousLesAvis.length)*100):0;return(<div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:11,color:"#9CA3AF",width:8}}>{n}</span><span style={{color:"#F5A623",fontSize:11}}>★</span><div style={{flex:1,height:6,background:BG2,borderRadius:10,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:"#F5A623",borderRadius:10}}/></div><span style={{fontSize:11,color:"#9CA3AF",width:16}}>{cnt}</span></div>);})}</div>
        <AvisForm isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth} tousLesAvis={tousLesAvis} chargement={chargement} onAjouterAvis={ajouterAvis}/>
        <button onClick={onToggleFavorite} style={{width:"100%",background:isFavorite?"#FCEBEB":V,color:isFavorite?"#A32D2D":WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>{isFavorite?"Retirer des favoris":"Ajouter aux favoris"}</button>
        <button onClick={()=>setShowPartageMenu(true)} style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer",marginBottom:8}}>Partager</button>
        <SignalCardBtn id={"evtdetail_"+(evt.id||evt.nom)} titre={evt.titre||evt.nom} type="evenement" onReport={onReport}/>
      </div>
      <PartageMenu show={showPartageMenu} titre={evt.nom} texte={partageTexte} onClose={()=>setShowPartageMenu(false)}/>
    </div>
  );
}

function EvtCard({e,onClick,onReport,customCatEvenements=[]}){
  const cat=EVT_CATEGORIES.find(c=>c.k===e.categorie)||customCatEvenements.find(c=>c.k===e.categorie);
  const catEmoji=cat?cat.emoji:"🎉";
  const tooMany=(e.signalements||0)>=3;
  const tnd=e.tnd||{};
  const {tousLesAvis,chargement,noteGlobale}=useAvis("evenement",e.id);
  const tndItems=[
    {l:"Son",v:tnd.son==="calme"?"Calme":tnd.son==="moyenne"?"Moyenne":"Forte",c:tnd.son==="calme"?"#065F46":"#92400E",bg:tnd.son==="calme"?"#D1FAE5":"#FEF3C7",icon:"🔈"},
    {l:"Affluence",v:tnd.affluence==="faible"?"Faible":tnd.affluence==="moyenne"?"Moyenne":"Forte",c:"#1E3A5F",bg:"#DBEAFE",icon:"👥"},
    {l:"Previsibilite",v:tnd.prevision==="structuree"?"Structuree":"Imprevisible",c:tnd.prevision==="structuree"?"#065F46":"#991B1B",bg:tnd.prevision==="structuree"?"#D1FAE5":"#FEE2E2",icon:"🔮"},
    {l:"Zone calme",v:tnd.zonecalme?"Oui":"Non",c:"#374151",bg:"#F0FDF4",icon:"🌿"},
  ];
  if(tooMany)return(<div style={{background:"#FFF3E0",borderRadius:16,padding:16,border:"1px solid #FDE68A",display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{fontSize:20}}>⚠️</span><p style={{margin:0,fontSize:13,color:"#92400E"}}>Cet evenement est en cours de verification par l equipe.</p></div>);
  return(
    <div style={{background:WH,borderRadius:16,overflow:"hidden",border:BD,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
      <div style={{position:"relative",height:160,background:e.photo?"#000":"linear-gradient(135deg,#EDE9FF,#C4B5FD)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden"}} onClick={onClick}>
        {e.photo?<img src={e.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:64}}>{catEmoji}</span>}
        <div style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:WH,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}><span style={{fontSize:16}}>🤍</span></div>
        <div style={{position:"absolute",top:10,left:10,background:e.gratuit?"#D1FAE5":"#FEF3C7",borderRadius:20,padding:"3px 10px"}}><span style={{fontSize:11,fontWeight:600,color:e.gratuit?"#065F46":"#92400E"}}>{e.prix}</span></div>
      </div>
      <div style={{padding:"12px 14px"}} onClick={onClick}>
        <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 4px"}}>{e.nom}</h3>
        <div style={{display:"flex",gap:12,marginBottom:10}}><span style={{fontSize:12,color:TM}}>📅 {e.date}</span><span style={{fontSize:12,color:TM}}>📍 {e.ville}</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>{tndItems.map(({l,v,c,bg,icon})=>(<div key={l} style={{background:bg,borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{icon}</span><div><div style={{fontSize:10,color:TM}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:c}}>{v}</div></div></div>))}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:TM}}>👥 {e.age}</span><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:"#F5A623",fontSize:13}}>★</span><span style={{fontSize:12,fontWeight:600,color:TX}}>{chargement?"...":noteGlobale.toFixed(1)}</span><span style={{fontSize:11,color:TM}}>({tousLesAvis.length} avis)</span></div></div>
      </div>
      <div style={{borderTop:"1px solid #F3F4F6",padding:"8px 14px",display:"flex",justifyContent:"flex-end"}}>
        <SignalCardBtn id={"evt_"+e.id} titre={e.nom||e.titre} type="evenement" onReport={onReport}/>
      </div>
    </div>
  );
}

function TNDGrid({tnd}){
  if(!tnd)return null;
  const items=[{k:"tsa",l:"TSA",c:"#7C3AED",bg:"#EDE9FE"},{k:"tdah",l:"TDAH",c:"#DB2777",bg:"#FCE7F3"},{k:"dys",l:"DYS",c:"#0891B2",bg:"#E0F7FA"}];
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
      {items.map(({k,l,c,bg})=>tnd[k]!=null?(
        <div key={k} style={{background:bg,borderRadius:10,padding:"6px 4px",textAlign:"center"}}>
          <div style={{fontSize:10,color:TM}}>{l}</div>
          <div style={{fontSize:13,fontWeight:700,color:c}}>{tnd[k]}/5</div>
        </div>
      ):null)}
    </div>
  );
}

function ActiviteCard({a,onClick,onReport,isFav,onToggleFav,verrouille=false,customCatActivites=[]}){
  const tile=iconTileAct(a.categorie,customCatActivites);
  const isNew=a._createdAt&&(Date.now()-new Date(a._createdAt).getTime())<7*24*60*60*1000;
  const isCommunity=!!a._auteur||!!a.communaute;
  const isPending=a._statut==="pending";
  return(
    <div style={{background:WH,borderRadius:16,overflow:"hidden",border:BD,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",opacity:verrouille?0.75:1}}>
      <div style={{position:"relative",height:160,background:a.photo&&!verrouille?"#000":`linear-gradient(135deg,${tile.bg},${tile.bg})`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden"}} onClick={onClick}>
        {a.photo&&!verrouille?<img src={a.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:64,filter:verrouille?"grayscale(0.5)":"none"}}>{tile.emoji}</span>}
        {verrouille&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:32}}>🔒</span></div>}
        <button onClick={e=>{e.stopPropagation();onToggleFav&&onToggleFav();}} style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:WH,border:"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.15)",cursor:"pointer",padding:0}}><span style={{fontSize:16}}>{isFav?"❤️":"🤍"}</span></button>
        <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6,flexWrap:"wrap"}}>
          <span style={{background:WH,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,color:V}}>{verrouille?"👑 Premium":a.categorie}</span>
          {isNew&&<span style={{background:"#10B981",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:"#fff"}}>🆕 Nouveau</span>}
          {isCommunity&&<span style={{background:"#8B5CF6",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:"#fff"}}>👥 Communauté</span>}
        </div>
      </div>
      <div style={{padding:"12px 14px"}} onClick={onClick}>
        <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 4px"}}>{a.nom}</h3>
        {isCommunity&&(a._auteur||a.pseudo)&&<p style={{margin:"0 0 6px",fontSize:11,color:TM}}>✍️ Proposé par <strong style={{color:V}}>{a._auteur||a.pseudo}</strong></p>}
        <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:TM}}>👶 {a.age}</span>
          {a.duree&&<span style={{fontSize:12,color:TM}}>⏱ {a.duree}</span>}
          <span style={{fontSize:12,color:TM}}>{a.lieu==="interieur"?"🏠 Intérieur":"🌳 Extérieur"}</span>
        </div>
        <TNDGrid tnd={a.tnd}/>
        {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:10,background:e.bg||"#EDE9FF",color:e.color||V,padding:"2px 8px",borderRadius:10,fontWeight:600,border:`1px solid ${(e.color||V)+"33"}`}}>{e.label}</span>)}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:TM}}>👥 {a.nbEnfants||"1+ enfants"}</span>
          <span style={{background:verrouille?"#FEF3C7":VL,color:verrouille?"#92400E":V,fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:20}}>{verrouille?"🔒 Débloquer":"Voir l'activité →"}</span>
        </div>
      </div>
      <div style={{borderTop:"1px solid #F3F4F6",padding:"8px 14px",display:"flex",justifyContent:"flex-end"}}>
        <SignalCardBtn id={"act_"+a.id} titre={a.nom} type="activite" onReport={onReport}/>
      </div>
    </div>
  );
}

function SortieCard({s,onClick,onReport,isFav,onToggleFav,customCatSorties=[]}){
  const tile=iconTileSortie(s.type,customCatSorties);
  const {tousLesAvis,chargement,noteGlobale}=useAvis("sortie",s.id);
  const isNew=s._createdAt&&(Date.now()-new Date(s._createdAt).getTime())<7*24*60*60*1000;
  return(
    <div style={{background:WH,borderRadius:16,overflow:"hidden",border:BD,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
      <div style={{position:"relative",height:160,background:s.photo?"#000":`linear-gradient(135deg,${tile.bg},${tile.bg})`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden"}} onClick={onClick}>
        {s.photo?<img src={s.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:64}}>{tile.emoji}</span>}
        <button onClick={e=>{e.stopPropagation();onToggleFav&&onToggleFav();}} style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:WH,border:"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.15)",cursor:"pointer",padding:0}}><span style={{fontSize:16}}>{isFav?"❤️":"🤍"}</span></button>
        <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6}}>
          <span style={{background:s.prix==="Gratuit"?"#D1FAE5":"#FEF3C7",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,color:s.prix==="Gratuit"?"#065F46":"#92400E"}}>{s.prix||"—"}</span>
          {isNew&&<span style={{background:"#10B981",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:"#fff"}}>🆕 Nouveau</span>}
        </div>
      </div>
      <div style={{padding:"12px 14px"}} onClick={onClick}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:0}}>{s.nom}</h3>
          {s.badge==="communaute"&&<span style={{fontSize:10,background:"#FFF3E0",color:OR,padding:"2px 8px",borderRadius:10,fontWeight:600,flexShrink:0}}>Communaute</span>}
        </div>
        <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}><span style={{fontSize:12,color:TM}}>📍 {s.ville}</span><span style={{fontSize:12,color:TM}}>🗺️ {s.type}</span></div>
        <TNDGrid tnd={s.tnd}/>
        {s.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{s.etiquettes.map((e,i)=><span key={i} style={{fontSize:10,background:e.bg||"#EDE9FF",color:e.color||V,padding:"2px 8px",borderRadius:10,fontWeight:600,border:`1px solid ${(e.color||V)+"33"}`}}>{e.label}</span>)}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:TM}}>Dept {s.dept}</span>
          <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:"#F5A623",fontSize:13}}>★</span><span style={{fontSize:12,fontWeight:600,color:TX}}>{chargement?"...":noteGlobale.toFixed(1)}</span><span style={{fontSize:11,color:TM}}>({tousLesAvis.length})</span></div>
        </div>
      </div>
      <div style={{borderTop:"1px solid #F3F4F6",padding:"8px 14px",display:"flex",justifyContent:"flex-end"}}>
        <SignalCardBtn id={"sort_"+s.id} titre={s.nom} type="sortie" onReport={onReport}/>
      </div>
    </div>
  );
}

// ─── Bibliothèque : tuiles icônes par catégorie / type ─────────────────────
const ICON_CATEGORIE_ACT={
  Creatif:{emoji:"🎨",bg:"#FCE7F3"},Jeu:{emoji:"🧩",bg:"#FEF3C7"},Calme:{emoji:"📖",bg:"#DBEAFE"},
  Cuisine:{emoji:"🍳",bg:"#FFE4D6"},Nature:{emoji:"🌿",bg:"#DCFCE7"},Construction:{emoji:"🧱",bg:"#FFE2DC"},
  Sport:{emoji:"⚽",bg:"#E0F2FE"},Musique:{emoji:"🎵",bg:"#EDE9FE"},Science:{emoji:"🔬",bg:"#E0F2FE"},
};
const iconTileAct=(cat,customList=[])=>{
  const custom=customList.find(c=>c.label===cat);
  if(custom)return{emoji:custom.emoji,bg:"#EDE9FE"};
  return ICON_CATEGORIE_ACT[cat]||{emoji:"🎈",bg:"#EDE9FE"};
};
const ICON_TYPE_SORTIE={
  "Parc":{emoji:"🌳",bg:"#DCFCE7"},"Balade":{emoji:"🚶",bg:"#DCFCE7"},"Musee":{emoji:"🏛️",bg:"#EDE9FE"},
  "Aquarium":{emoji:"🐠",bg:"#DBEAFE"},"Zoo":{emoji:"🦁",bg:"#FEF3C7"},"Bowling":{emoji:"🎳",bg:"#FFE4D6"},
  "Cinema":{emoji:"🎬",bg:"#EDE9FE"},"Escape game":{emoji:"🔐",bg:"#FEE2E2"},"Piscine":{emoji:"🏊",bg:"#DBEAFE"},
  "Plage":{emoji:"🏖️",bg:"#FEF9C3"},"Patinoire":{emoji:"⛸️",bg:"#E0F2FE"},"Ferme pedagogique":{emoji:"🐄",bg:"#F3F0E6"},
  "Restaurant":{emoji:"🍽️",bg:"#FFE4D6"},"Parc d attraction":{emoji:"🎢",bg:"#FCE7F3"},"Evenement":{emoji:"🎉",bg:"#EDE9FE"},
};
const iconTileSortie=(type,customList=[])=>{
  const custom=customList.find(c=>c.label===type);
  if(custom)return{emoji:custom.emoji,bg:"#EDE9FE"};
  return ICON_TYPE_SORTIE[type]||{emoji:"🗺️",bg:"#EDE9FE"};
};

function FilterPill({active,onClick,icon,label}){
  return(
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,border:active?"none":"1.5px solid #E7E4F2",background:active?V:WH,color:active?WH:TX,fontWeight:600,fontSize:11.5,cursor:"pointer",whiteSpace:"nowrap"}}>
      {icon?<span style={{fontSize:12}}>{icon}</span>:<span style={{width:13,height:13,borderRadius:"50%",background:active?"rgba(255,255,255,0.28)":VL,color:active?WH:V,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,flexShrink:0}}>✓</span>}
      {label}
    </button>
  );
}
function FilterSectionTitle({icon,label}){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,margin:"0 0 10px"}}>
      <span style={{fontSize:13}}>{icon}</span>
      <p style={{fontSize:11,fontWeight:700,color:"#9B96B0",margin:0,textTransform:"uppercase",letterSpacing:"0.6px"}}>{label}</p>
    </div>
  );
}

function CalendrierMensuel({evtFiltered=[],setEvtDetail,addReport,customCatEvenements=[]}){
  const now=new Date();
  const [moisView,setMoisView]=useState(now.getMonth());
  const [anneeView,setAnneeView]=useState(now.getFullYear());
  const premier=new Date(anneeView,moisView,1);
  const dernier=new Date(anneeView,moisView+1,0);
  const jourDebut=premier.getDay()||7;
  const jours=["L","M","M","J","V","S","D"];
  const cellules=[];
  for(let i=1;i<jourDebut;i++)cellules.push(null);
  for(let d=1;d<=dernier.getDate();d++)cellules.push(d);
  const moisISO=`${anneeView}-${String(moisView+1).padStart(2,"0")}`;
  const evtsDuMois=evtFiltered.filter(e=>(e.date||"").startsWith(moisISO));
  const evtsParJour={};
  evtsDuMois.forEach(e=>{const j=parseInt((e.date||"").slice(8,10));if(!evtsParJour[j])evtsParJour[j]=[];evtsParJour[j].push(e);});
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <button onClick={()=>{if(moisView===0){setMoisView(11);setAnneeView(a=>a-1);}else setMoisView(m=>m-1);}} style={{background:WH,border:BD,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontSize:16,color:TX}}>‹</button>
        <p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>{MOIS[moisView+1]||""} {anneeView}</p>
        <button onClick={()=>{if(moisView===11){setMoisView(0);setAnneeView(a=>a+1);}else setMoisView(m=>m+1);}} style={{background:WH,border:BD,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontSize:16,color:TX}}>›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:8}}>
        {jours.map((j,i)=><div key={i} style={{textAlign:"center",fontSize:10,fontWeight:700,color:TM,padding:"4px 0"}}>{j}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:16}}>
        {cellules.map((d,i)=>{
          const today=now.getDate()===d&&now.getMonth()===moisView&&now.getFullYear()===anneeView;
          const evts=d?evtsParJour[d]||[]:[];
          return(
            <div key={i} onClick={()=>evts.length&&setEvtDetail(evts[0])} style={{minHeight:36,borderRadius:8,background:today?V:evts.length?VL:"transparent",border:evts.length&&!today?`2px solid ${V}`:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:evts.length?"pointer":"default",padding:"2px"}}>
              {d&&<span style={{fontSize:12,fontWeight:today?700:400,color:today?"#fff":evts.length?V:TX}}>{d}</span>}
              {evts.length>0&&<div style={{width:4,height:4,borderRadius:"50%",background:today?"#fff":V,marginTop:1}}/>}
            </div>
          );
        })}
      </div>
      {evtsDuMois.length===0?(
        <p style={{textAlign:"center",color:TM,fontSize:13}}>Aucun événement ce mois</p>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:TM}}>{evtsDuMois.length} événement{evtsDuMois.length>1?"s":""} ce mois</p>
          {evtsDuMois.map(e=><EvtCard key={e.id||e.nom} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport} customCatEvenements={customCatEvenements}/>)}
        </div>
      )}
    </div>
  );
}

function PageBiblio({pendingContribs=[],setPendingContribs,adminActivites=[],adminSorties=[],adminEvenements=[],addReport,adminReports=[],deletedTitles=new Set(),isLoggedIn=true,onRequireAuth,favoris=[],setFavoris,isPremium=false,onOpenPremium,customCatActivites=[],customCatSorties=[],customCatEvenements=[],currentUser=null}){
  const [tab,setTab]=useState("activites");
  const [globalSearch,setGlobalSearch]=useState("");
  const [detail,setDetail]=useState(null);
  const [evtDetail,setEvtDetail]=useState(null);
  const [filterLieu,setFilterLieu]=useState("");
  const [filterMotiv,setFilterMotiv]=useState("");
  const [filterCategorie,setFilterCategorie]=useState("");
  const [sortActiv,setSortActiv]=useState("pertinence"); // pertinence | alpha | recent | communaute
  const [filterDept,setFilterDept]=useState("");
  const [filterType,setFilterType]=useState("");
  const [sigSort,setSigSort]=useState({});
  const [evenements,setEvenements]=useState(EVENEMENTS_INIT);
  const [evtView,setEvtView]=useState("calendrier");
  const [evtCat,setEvtCat]=useState("");
  const [evtDept,setEvtDept]=useState("");
  const [evtDateDe,setEvtDateDe]=useState("");
  const [evtDateA,setEvtDateA]=useState("");
  const [evtResult,setEvtResult]=useState(null);
  const [calDept,setCalDept]=useState("");
  const [calDateDe,setCalDateDe]=useState("");
  const [calDateA,setCalDateA]=useState("");
  const [calPrix,setCalPrix]=useState("");
  const [evtGratuit,setEvtGratuit]=useState(false);
  const [showFormEvt,setShowFormEvt]=useState(false);
  const [toast,setToast]=useState("");
  const [showAutrePopup,setShowAutrePopup]=useState(false);
  const [typeEvtForm,setTypeEvtForm]=useState("");
  const [typeAutreForm,setTypeAutreForm]=useState("");
  const [typeAutreTemp,setTypeAutreTemp]=useState("");
  const FAVORIS_LIMITE_GRATUIT=10;
  const [showFavorisLimitMsg,setShowFavorisLimitMsg]=useState(false);
  const isFavBiblio=(item,type)=>favoris.some(f=>f.id===item.id&&f._type===type);
  const toggleFavBiblio=(item,type)=>{
    if(!isLoggedIn){onRequireAuth&&onRequireAuth();return;}
    setFavoris&&setFavoris(prev=>{
      const exists=prev.find(f=>f.id===item.id&&f._type===type);
      if(exists)return prev.filter(f=>!(f.id===item.id&&f._type===type));
      if(!isPremium&&prev.length>=FAVORIS_LIMITE_GRATUIT){setShowFavorisLimitMsg(true);return prev;}
      return[...prev,{...item,_type:type}];
    });
  };

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),3000);};
  const handleSubmitEvt=(data)=>{setPendingContribs(prev=>[{...data,id:Date.now(),_type:"evenement",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:"",_auteur:currentUser?.nom||"Anonyme",_auteurEmail:currentUser?.email||"non connecté"},...prev]);setShowFormEvt(false);setTypeEvtForm("");setTypeAutreForm("");showToast("Evenement soumis, en attente de validation !");};
  const CATEGORIES_ACT=[...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)];
  const approvedActs=pendingContribs.filter(c=>c._type==="activite"&&c._statut!=="rejected");
  const adminPublished=(adminActivites||[]).filter(a=>a.statut==="published"&&!ACTIVITES.find(x=>x.id===a.id)).map(a=>{
    const age=a.nom?a.age:((a.ageMin&&a.ageMax)?`${String(a.ageMin).replace(" an","").replace(" ans","")} - ${a.ageMax}`:(a.ageMin||a.ageMax||a.age||"Tous ages"));
    const scoreFor=(...flags)=>{const c=flags.filter(Boolean).length;return c?Math.max(1,Math.min(5,c+2)):3;};
    return{
      ...a,
      nom:a.nom||a.titre,
      age,
      materiel:Array.isArray(a.materiel)?a.materiel:(a.materielStr?a.materielStr.split(",").map(m=>m.trim()).filter(Boolean):(a.materiel||[])),
      tnd:a.tnd||{tsa:scoreFor(a.tsa_foule,a.tsa_calme,a.tsa_lumiere,a.tsa_retrait,a.tsa_bruit,a.tsa_personnel),tdah:scoreFor(a.tdah_espace,a.tdah_physique,a.tdah_attente,a.tdah_stimulation),dys:scoreFor(a.dys_visuels,a.dys_nonecrite,a.dys_rythme,a.dys_personnel)},
      nbEnfants:a.nbEnfants||"1+ enfants",
      etiquettes:a.etiquettes||[],
    };
  });
  // Catégories disponibles — calculées dynamiquement depuis toutes les activités réelles
  const toutesCategories=[...new Set([...ACTIVITES,...adminPublished,...approvedActs].map(a=>a.categorie).filter(Boolean))].sort();

  // Items avec signalement pending -> masqués jusqu'à résolution
  const blockedTitles=new Set([...adminReports.filter(r=>r.statut==="pending").map(r=>r.titre),...deletedTitles]);
  const searchQ=globalSearch.toLowerCase();
  const actFilteredBase=[...ACTIVITES,...adminPublished,...approvedActs].filter(a=>!blockedTitles.has(a.nom)&&!blockedTitles.has(a.titre)).filter(a=>
    (!filterLieu||a.lieu===filterLieu)&&
    (!filterMotiv||a.energie===filterMotiv)&&
    (!filterCategorie||a.categorie===filterCategorie)&&
    (!searchQ||(a.nom||a.titre||"").toLowerCase().includes(searchQ)||(a.categorie||"").toLowerCase().includes(searchQ))
  );
  const actFiltered=[...actFilteredBase].sort((a,b)=>{
    if(sortActiv==="alpha")return(a.nom||a.titre||"").localeCompare(b.nom||b.titre||"");
    if(sortActiv==="recent")return(b._createdAt||b.date||"").localeCompare(a._createdAt||a.date||"");
    if(sortActiv==="communaute")return(b.communaute?1:0)-(a.communaute?1:0);
    return 0; // pertinence = ordre par défaut
  });
  const parseDeptVille=(deptStr)=>{
    if(!deptStr)return{code:"",ville:""};
    let m=deptStr.match(/^(\d{2,3}\w?)\s*-\s*(.+)$/);
    if(m)return{code:m[1],ville:m[2]};
    m=deptStr.match(/^(.+)\s*\((\d{2,3}\w?)\)$/);
    if(m)return{code:m[2],ville:m[1]};
    return{code:"",ville:deptStr};
  };
  const adminSortiesPubliees=(adminSorties||[]).filter(o=>o.statut==="published").map(o=>{
    const {code,ville}=parseDeptVille(o.dept);
    return{id:o.id,nom:o.titre,type:o.categorie,dept:code,ville:ville||o.adresse||"",prix:o.prix||"Gratuit",note:4.5,tnd:{tsa:3,tdah:3,dys:3},etiquettes:o.etiquettes||[]};
  });
  const adminEvenementsPublies=(adminEvenements||[]).filter(e=>e.statut==="published").map(e=>{
    const prixStr=e.prix||"Gratuit";
    const isGratuit=!prixStr.trim()||prixStr.toLowerCase().includes("gratuit")||prixStr==="0"||prixStr==="0€";
    return{id:e.id,nom:e.titre,titre:e.titre,categorie:e.type,ville:e.ville,dept:e.dept,date:e.date,prix:prixStr,gratuit:isGratuit,age:"Tous ages",desc:e.desc,tnd:{tsa:3,tdah:3,dys:3},etiquettes:e.etiquettes||[]};
  });
  const approvedSorts=pendingContribs.filter(c=>c._type==="sortie"&&c._statut!=="rejected");
  const sortFiltered=[...SORTIES,...adminSortiesPubliees,...approvedSorts].filter(s=>!blockedTitles.has(s.nom)).filter(s=>(!filterDept||s.dept===filterDept)&&(!filterType||s.type===filterType)&&(!searchQ||(s.nom||"").toLowerCase().includes(searchQ)||(s.type||"").toLowerCase().includes(searchQ)||(s.ville||"").toLowerCase().includes(searchQ)));
  const signaler=(id)=>setSigSort(prev=>({...prev,[id]:(prev[id]||0)+1}));
  const cardStyle={background:WH,borderRadius:14,padding:"14px 16px",border:BD,cursor:"pointer"};
  const selStyle={flex:1,padding:"8px 10px",borderRadius:10,border:BD,background:WH,fontSize:13};

  const approvedEvts=pendingContribs.filter(c=>c._type==="evenement"&&c._statut!=="rejected");
  const allEvts=[...evenements,...adminEvenementsPublies,...approvedEvts].filter(e=>!blockedTitles.has(e.titre)&&!blockedTitles.has(e.nom));
  const evtFiltered=allEvts.filter(e=>{
    if(evtCat&&e.categorie!==evtCat&&e.type!==evtCat)return false;
    if(evtDept&&e.dept!==evtDept)return false;
    if(evtDateDe&&e.date<evtDateDe)return false;
    if(evtDateA&&e.date>evtDateA)return false;
    if(searchQ&&!(e.nom||e.titre||"").toLowerCase().includes(searchQ)&&!(e.ville||"").toLowerCase().includes(searchQ))return false;
    return true;
  });

  const byDate={};
  evtFiltered.forEach(e=>{if(!e.date)return;if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});

  const formatDate=(d)=>{if(!d)return"";const p=d.split("-");if(p.length<3)return d;const m=parseInt(p[1]);return p[2]+" "+(MOIS[m]||"");};
  const jourLabel=(d)=>{if(!d)return"";const days=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];const dt=new Date(d);return isNaN(dt.getTime())?"":days[dt.getDay()];};
  const genEvt=()=>{const free=evtFiltered.filter(e=>e.gratuit);const paid=evtFiltered.filter(e=>!e.gratuit);setEvtResult({free:free.slice(0,3),premium:paid.slice(0,1)});};

  const PropBtn=()=>(<>
    <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:16,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}>
      <span style={{fontSize:16,flexShrink:0}}>👶</span>
      <p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les evenements proposes doivent etre destines aux enfants ou aux familles.</p>
    </div>
    <button onClick={()=>{if(!isLoggedIn){onRequireAuth&&onRequireAuth();return;}setShowFormEvt(true);}} style={{width:"100%",marginTop:10,padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Proposer un evenement</button>
    {!isLoggedIn&&<p style={{margin:"6px 0 0",fontSize:11,color:TM,textAlign:"center"}}>🔓 Compte gratuit requis</p>}
  </>);

  const FiltresEvt=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
      <select value={evtDept} onChange={e=>setEvtDept(e.target.value)} style={{padding:"10px 12px",borderRadius:10,border:BD,background:WH,fontSize:13,width:"100%",boxSizing:"border-box",color:TX}}>
        <option value="">Tous les departements</option>
        {DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}
      </select>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1}}>
          <p style={{margin:"0 0 4px",fontSize:11,color:TM}}>Du</p>
          <input type="date" value={evtDateDe} onChange={e=>setEvtDateDe(e.target.value)} style={{padding:"10px 12px",borderRadius:10,border:BD,background:WH,fontSize:13,width:"100%",boxSizing:"border-box",color:TX}}/>
        </div>
        <div style={{flex:1}}>
          <p style={{margin:"0 0 4px",fontSize:11,color:TM}}>Au</p>
          <input type="date" value={evtDateA} onChange={e=>setEvtDateA(e.target.value)} style={{padding:"10px 12px",borderRadius:10,border:BD,background:WH,fontSize:13,width:"100%",boxSizing:"border-box",color:TX}}/>
        </div>
      </div>
      {(evtDept||evtDateDe||evtDateA)&&(
        <button onClick={()=>{setEvtDept("");setEvtDateDe("");setEvtDateA("");}} style={{background:"none",border:"none",color:V,fontSize:12,cursor:"pointer",padding:0,textAlign:"left"}}>Effacer les filtres</button>
      )}
    </div>
  );

  return(
    <div style={{background:BG,minHeight:"100vh"}}>
      <div style={{padding:"20px 16px 0"}}>
        <h1 style={{fontSize:20,fontWeight:600,color:TX,margin:"0 0 12px"}}>Bibliothèque</h1>
        {/* Barre de recherche globale */}
        <div style={{position:"relative",marginBottom:12}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:TM}}>🔍</span>
          <input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)} placeholder="Rechercher activités, sorties, événements..." style={{width:"100%",padding:"11px 12px 11px 38px",borderRadius:14,border:BD,fontSize:13,background:WH,boxSizing:"border-box",outline:"none"}}/>
          {globalSearch&&<button onClick={()=>setGlobalSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:18,cursor:"pointer",color:TM}}>×</button>}
        </div>
        {globalSearch&&<p style={{fontSize:12,color:TM,margin:"0 0 10px"}}>{actFiltered.length+sortFiltered.length+evtFiltered.length} résultat{actFiltered.length+sortFiltered.length+evtFiltered.length!==1?"s":""} pour "{globalSearch}"</p>}
        <div style={{display:"flex",gap:6,background:WH,borderRadius:14,padding:4,border:BD}}>
          {["activites","sorties","evenements"].map(t=>(<button key={t} onClick={()=>{
            setTab(t);setDetail(null);setEvtDetail(null);
            if(t!=="evenements"){setEvtCat("");setEvtDept("");setEvtDateDe("");setEvtDateA("");}
            if(t!=="activites"){setFilterLieu("");setFilterMotiv("");setFilterCategorie("");}
            if(t!=="sorties"){setFilterDept("");setFilterType("");}
          }} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:tab===t?V:"transparent",color:tab===t?WH:TM,fontSize:13,fontWeight:500,cursor:"pointer"}}>{t==="activites"?"Activites":t==="sorties"?"Sorties":"Evenements"}</button>))}
        </div>
      </div>
      <div style={{padding:"12px 16px"}}>
        {tab==="activites"&&(
          <>
            <div style={{marginBottom:18}}>
              <FilterSectionTitle icon="📍" label="Lieu"/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:18}}>
                <FilterPill active={filterLieu===""} onClick={()=>setFilterLieu("")} label="Tous"/>
                <FilterPill active={filterLieu==="interieur"} onClick={()=>setFilterLieu("interieur")} icon="🏠" label="Intérieur"/>
                <FilterPill active={filterLieu==="exterieur"} onClick={()=>setFilterLieu("exterieur")} icon="🌳" label="Extérieur"/>
              </div>
              <FilterSectionTitle icon="❤️" label="Motivation"/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:18}}>
                <FilterPill active={filterMotiv===""} onClick={()=>setFilterMotiv("")} label="Toutes"/>
                <FilterPill active={filterMotiv==="fatigue"} onClick={()=>setFilterMotiv("fatigue")} icon="🥱" label="Fatigué"/>
                <FilterPill active={filterMotiv==="motiv"} onClick={()=>setFilterMotiv("motiv")} icon="🚀" label="Motivé"/>
              </div>
              <FilterSectionTitle icon="🧩" label="Type d'activité"/>
              <select value={filterCategorie} onChange={e=>setFilterCategorie(e.target.value)} style={{display:"block",width:"100%",padding:"9px 12px",borderRadius:14,border:"1.5px solid #E7E4F2",background:WH,fontSize:12,color:TX,boxSizing:"border-box",textAlign:"center"}}>
                <option value="">Tous les types</option>
                {toutesCategories.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {(filterLieu||filterMotiv||filterCategorie||globalSearch)&&(
                <div style={{textAlign:"center"}}><button onClick={()=>{setFilterLieu("");setFilterMotiv("");setFilterCategorie("");}} style={{background:"none",border:"none",color:V,fontSize:12,cursor:"pointer",padding:"10px 0 0",fontWeight:600}}>Effacer les filtres ×</button></div>
              )}
              {/* Tri */}
              <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
                {[{v:"pertinence",l:"⭐ Pertinence"},{v:"alpha",l:"🔤 A→Z"},{v:"recent",l:"🆕 Récents"},{v:"communaute",l:"👥 Communauté"}].map(({v,l})=>(
                  <button key={v} onClick={()=>setSortActiv(v)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${sortActiv===v?V:BD}`,background:sortActiv===v?VL:WH,color:sortActiv===v?V:TM,fontSize:11,fontWeight:sortActiv===v?700:400,cursor:"pointer"}}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8,margin:"0 0 14px"}}>
              <span style={{fontSize:16}}>💡</span>
              <div>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Suggestions pour vous</p>
                <p style={{margin:0,fontSize:11,color:TM}}>Des idées adaptées à vos critères</p>
              </div>
            </div>

            <div>
              {actFiltered.length===0&&(
                <div style={{textAlign:"center",padding:"40px 16px",background:WH,borderRadius:16,border:BD,marginBottom:16}}>
                  <p style={{fontSize:40,margin:"0 0 10px"}}>{globalSearch?"🔍":"🎨"}</p>
                  <p style={{fontSize:15,fontWeight:700,color:TX,margin:"0 0 8px"}}>{globalSearch?`Aucun résultat pour "${globalSearch}"`:"Aucune activité trouvée"}</p>
                  <p style={{fontSize:12,color:TM,margin:"0 0 16px"}}>Essayez d'autres filtres ou proposez cette activité à la communauté</p>
                  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                    {(filterLieu||filterMotiv||filterCategorie||globalSearch)&&<button onClick={()=>{setFilterLieu("");setFilterMotiv("");setFilterCategorie("");setGlobalSearch("");}} style={{padding:"8px 16px",borderRadius:20,background:VL,border:"none",color:V,fontWeight:600,fontSize:12,cursor:"pointer"}}>🔄 Réinitialiser</button>}
                    <button onClick={()=>{setDetail({type:"form_activite",item:null});}} style={{padding:"8px 16px",borderRadius:20,background:V,border:"none",color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>+ Proposer une activité</button>
                  </div>
                </div>
              )}
              {actFiltered.map(a=>(
                <ActiviteCard key={a.id} a={a} onClick={()=>{if(a.premium&&!isPremium){onOpenPremium&&onOpenPremium();return;}setDetail({item:a,type:"activite"});}} onReport={addReport} isFav={isFavBiblio(a,"activite")} onToggleFav={()=>toggleFavBiblio(a,"activite")} verrouille={!!a.premium&&!isPremium} customCatActivites={customCatActivites}/>
              ))}
            </div>
            <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:14,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les activites proposees doivent etre destinees aux enfants.</p></div>
            <button onClick={()=>{if(!isLoggedIn){onRequireAuth&&onRequireAuth();return;}setDetail({item:null,type:"form_activite"});}} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,background:BG,border:"1.5px dashed "+V,color:V,fontWeight:600,fontSize:14,cursor:"pointer"}}>Proposer une activite</button>
            {!isLoggedIn&&<p style={{margin:"6px 0 0",fontSize:11,color:TM,textAlign:"center"}}>🔓 Compte gratuit requis</p>}
          </>
        )}
        {tab==="sorties"&&(
          <>
            <div style={{marginBottom:18}}>
              <FilterSectionTitle icon="📍" label="Département"/>
              <select value={filterDept} onChange={e=>setFilterDept(e.target.value)} style={{display:"block",width:"100%",padding:"9px 12px",borderRadius:14,border:"1.5px solid #E7E4F2",background:WH,fontSize:12,color:TX,boxSizing:"border-box",marginBottom:18,textAlign:"center"}}>
                <option value="">Tous les departements</option>
                {DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}
              </select>
              <FilterSectionTitle icon="🗺️" label="Type de sortie"/>
              <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{display:"block",width:"100%",padding:"9px 12px",borderRadius:14,border:"1.5px solid #E7E4F2",background:WH,fontSize:12,color:TX,boxSizing:"border-box"}}>
                <option value="">Tous les types</option>
                {[...new Set([...SORTIES,...adminSortiesPubliees,...approvedSorts].map(s=>s.type||s.categorie).filter(Boolean))].sort().map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              {(filterDept||filterType)&&(
                <div style={{textAlign:"center"}}><button onClick={()=>{setFilterDept("");setFilterType("");}} style={{background:"none",border:"none",color:V,fontSize:12,cursor:"pointer",padding:"10px 0 0",fontWeight:600}}>Effacer les filtres ×</button></div>
              )}
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8,margin:"0 0 14px"}}>
              <span style={{fontSize:16}}>💡</span>
              <div>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Suggestions pour vous</p>
                <p style={{margin:0,fontSize:11,color:TM}}>Des idées de sorties adaptées</p>
              </div>
            </div>

            <div>
              {sortFiltered.filter(s=>(sigSort[s.id]||0)<3).length===0&&(
                <div style={{textAlign:"center",padding:"40px 16px",background:WH,borderRadius:16,border:BD,marginBottom:16}}>
                  <p style={{fontSize:40,margin:"0 0 10px"}}>{globalSearch?"🔍":"🗺️"}</p>
                  <p style={{fontSize:15,fontWeight:700,color:TX,margin:"0 0 8px"}}>{globalSearch?`Aucune sortie pour "${globalSearch}"`:"Aucune sortie trouvée"}</p>
                  <p style={{fontSize:12,color:TM,margin:"0 0 16px"}}>Essayez un autre département ou proposez une sortie</p>
                  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                    {(filterDept||filterType||globalSearch)&&<button onClick={()=>{setFilterDept("");setFilterType("");setGlobalSearch("");}} style={{padding:"8px 16px",borderRadius:20,background:VL,border:"none",color:V,fontWeight:600,fontSize:12,cursor:"pointer"}}>🔄 Réinitialiser</button>}
                    <button onClick={()=>{setDetail({type:"form_sortie",item:null});}} style={{padding:"8px 16px",borderRadius:20,background:"#27AE60",border:"none",color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>+ Proposer une sortie</button>
                  </div>
                </div>
              )}
              {sortFiltered.filter(s=>(sigSort[s.id]||0)<3).map(s=>(
                <SortieCard key={s.id} s={s} onClick={()=>setDetail({item:s,type:"sortie"})} onReport={addReport} isFav={isFavBiblio(s,"sortie")} onToggleFav={()=>toggleFavBiblio(s,"sortie")} customCatSorties={customCatSorties}/>
              ))}
            </div>
            <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:14,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les sorties proposees doivent etre adaptees aux enfants.</p></div>
            <button onClick={()=>{if(!isLoggedIn){onRequireAuth&&onRequireAuth();return;}setDetail({item:null,type:"form_sortie"});}} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,background:BG,border:"1.5px dashed "+V,color:V,fontWeight:600,fontSize:14,cursor:"pointer"}}>Proposer une sortie</button>
            {!isLoggedIn&&<p style={{margin:"6px 0 0",fontSize:11,color:TM,textAlign:"center"}}>🔓 Compte gratuit requis</p>}
          </>
        )}
        {tab==="evenements"&&(
          <>
            <div style={{display:"flex",gap:6,marginBottom:14}}>{[{k:"calendrier",l:"📋 Liste"},{k:"mensuel",l:"📅 Mois"},{k:"generateur",l:"🪄 Générateur"}].map(({k,l})=>(<button key={k} onClick={()=>setEvtView(k)} style={{flex:1,padding:"8px 4px",borderRadius:12,border:"1.5px solid "+(evtView===k?V:BD),background:evtView===k?VL:WH,color:evtView===k?V:TM,fontSize:12,cursor:"pointer",fontWeight:evtView===k?700:400}}>{l}</button>))}</div>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:8,scrollbarWidth:"none"}}>
              <button onClick={()=>setEvtCat("")} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid "+(evtCat===""?V:BD),background:evtCat===""?VL:WH,color:evtCat===""?V:TM,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>Tout</button>
              {[...new Set(allEvts.map(e=>e.categorie||e.type).filter(Boolean))].sort().map(cat=>{
                const def=[...EVT_CATEGORIES,...customCatEvenements].find(c=>c.k===cat||c.label===cat);
                return(<button key={cat} onClick={()=>setEvtCat(evtCat===cat?"":cat)} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid "+(evtCat===cat?V:BD),background:evtCat===cat?VL:WH,color:evtCat===cat?V:TM,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{def?.emoji||"🎪"} {def?.label||cat}</button>);
              })}
            </div>
            <FiltresEvt/>
            {evtView==="calendrier"&&(
              <div>
                {Object.keys(byDate).sort().map(date=>{
                  const evtsDate=byDate[date].filter(e=>{
                    if(calDept&&e.dept!==calDept)return false;
                    if(calDateDe&&e.date<calDateDe)return false;
                    if(calDateA&&e.date>calDateA)return false;
                    if(evtGratuit&&!e.gratuit)return false;
                    if(calPrix==="payant"&&e.gratuit)return false;
                    return true;
                  });
                  if(evtsDate.length===0)return null;
                  return(<div key={date} style={{marginBottom:12}}><div style={{background:V,borderRadius:10,padding:"6px 14px",marginBottom:10,display:"inline-flex"}}><span style={{fontSize:12,fontWeight:700,color:WH}}>{jourLabel(date)} {formatDate(date)}</span></div>{evtsDate.map(e=><EvtCard key={e.id} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport} customCatEvenements={customCatEvenements}/>)}</div>);
                })}
                {Object.keys(byDate).length===0&&<div style={{textAlign:"center",padding:"40px 0",color:TM}}><p style={{fontSize:32}}>📭</p><p style={{fontSize:14}}>Aucun evenement trouve.</p></div>}
                <PropBtn/>
              </div>
            )}
            {evtView==="mensuel"&&<CalendrierMensuel evtFiltered={evtFiltered} setEvtDetail={setEvtDetail} addReport={addReport} customCatEvenements={customCatEvenements}/>}

            {evtView==="generateur"&&(
              <div>
                <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
                  <h3 style={{fontSize:15,fontWeight:600,color:TX,margin:"0 0 12px"}}>Trouve-moi un evenement</h3>
                  <button onClick={genEvt} style={{width:"100%",padding:13,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Generer des evenements</button>
                </div>
                {evtResult&&(<>
                  {evtResult.free.length>0&&(<div style={{marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:GR,margin:"0 0 8px"}}>Gratuit ({evtResult.free.length})</p>{evtResult.free.map(e=><EvtCard key={e.id} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport} customCatEvenements={customCatEvenements}/>)}</div>)}
                  {evtResult.premium.length>0&&(<div><p style={{fontSize:12,fontWeight:600,color:OR,margin:"0 0 8px"}}>Premium</p>{evtResult.premium.map(e=>isPremium?(<EvtCard key={e.id} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport} customCatEvenements={customCatEvenements}/>):(<div key={e.id} style={{opacity:0.6,pointerEvents:"none"}}><EvtCard e={e} onClick={()=>{}} customCatEvenements={customCatEvenements}/></div>))}{!isPremium&&<button onClick={()=>onOpenPremium&&onOpenPremium()} style={{width:"100%",padding:11,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:13,cursor:"pointer",marginTop:4}}>Passer Premium</button>}</div>)}
                  {evtResult.free.length===0&&evtResult.premium.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:TM}}><p style={{fontSize:32}}>📭</p><p>Aucun evenement.</p></div>}
                </>)}
                <PropBtn/>
              </div>
            )}
          </>
        )}
      </div>
      {detail&&detail.type==="activite"&&<ActivityDetailPage activity={detail.item} isFavorite={isFavBiblio(detail.item,"activite")} onToggleFavorite={()=>toggleFavBiblio(detail.item,"activite")} onBack={()=>setDetail(null)} onReport={addReport} isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth}/>}
      {detail&&detail.type==="sortie"&&<SortieDetailPage sortie={detail.item} isFavorite={isFavBiblio(detail.item,"sortie")} onToggleFavorite={()=>toggleFavBiblio(detail.item,"sortie")} onBack={()=>setDetail(null)} onReport={addReport} isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth}/>}
      {detail&&detail.type==="form_activite"&&<FormActivite customCatActivites={customCatActivites} onClose={()=>setDetail(null)} onSubmit={(item)=>{setPendingContribs(prev=>[{...item,id:Date.now(),_type:"activite",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:"",_auteur:currentUser?.nom||"Anonyme",_auteurEmail:currentUser?.email||"non connecté"},...prev]);setDetail(null);showToast("Activite soumise, en attente de validation !");}}/>}
      {detail&&detail.type==="form_sortie"&&<FormSortie customCatSorties={customCatSorties} onClose={()=>setDetail(null)} onSubmit={(item)=>{setPendingContribs(prev=>[{...item,id:Date.now(),_type:"sortie",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:"",_auteur:currentUser?.nom||"Anonyme",_auteurEmail:currentUser?.email||"non connecté"},...prev]);setDetail(null);showToast("Sortie soumise, en attente de validation !");}}/>}
      {evtDetail&&<EvenementDetail evt={evtDetail} onBack={()=>setEvtDetail(null)} onReport={addReport} isFavorite={isFavBiblio(evtDetail,"evenement")} onToggleFavorite={()=>toggleFavBiblio(evtDetail,"evenement")} isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth} customCatEvenements={customCatEvenements}/>}
      {showFormEvt&&(<FormEvenement customCatEvenements={customCatEvenements} onClose={()=>{setShowFormEvt(false);setTypeEvtForm("");setTypeAutreForm("");}} onSubmit={handleSubmitEvt} onOpenAutrePopup={()=>{setTypeAutreTemp(typeAutreForm);setShowAutrePopup(true);}} typeAutre={typeAutreForm} typeEvt={typeEvtForm} setTypeEvt={setTypeEvtForm}/>)}
      {showAutrePopup&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}><div style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}><p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX,textAlign:"center"}}>Autre type</p><input value={typeAutreTemp} onChange={e=>setTypeAutreTemp(e.target.value)} placeholder="Ex : Festival, Portes ouvertes..." style={{padding:"12px 14px",borderRadius:12,border:"1.5px solid "+V,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:16}}/><div style={{display:"flex",gap:10}}><button onClick={()=>setShowAutrePopup(false)} style={{flex:1,padding:"11px 0",borderRadius:28,background:BG,border:"1px solid #E5E7EB",color:TX,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={()=>{if(typeAutreTemp.trim()){setTypeAutreForm(typeAutreTemp.trim());setTypeEvtForm("autre");}setShowAutrePopup(false);}} style={{flex:1,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Confirmer</button></div></div></div>)}
      {showFavorisLimitMsg&&(
        <div onClick={()=>setShowFavorisLimitMsg(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <div style={{fontSize:40,marginBottom:10}}>🔒</div>
            <p style={{margin:"0 0 18px",fontSize:14,color:TX,lineHeight:1.5,fontWeight:600}}>Limite de 10 favoris atteinte. Passe en Premium pour des favoris illimités !</p>
            <button onClick={()=>{setShowFavorisLimitMsg(false);onOpenPremium&&onOpenPremium();}} style={{width:"100%",padding:13,borderRadius:28,background:"#6C5CE7",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Voir Premium</button>
            <button onClick={()=>setShowFavorisLimitMsg(false)} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Fermer</button>
          </div>
        </div>
      )}
      {toast&&(<div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,zIndex:9999,whiteSpace:"nowrap"}}>{toast}</div>)}
    </div>
  );
}

// ─── DONNÉES ────────────────────────────────────────────────────────────────
const bibliotheque = [
  { id:1,  emoji:"🧦", titre:"Le lutin a caché les chaussettes",      description:"Toutes les chaussettes de la maison sont accrochées au sapin !",                                  materiel:["Chaussettes","Pinces à linge"] },
  { id:2,  emoji:"🍫", titre:"Le lutin a mangé le chocolat",           description:"Il a laissé des miettes partout et un petit mot d'excuse...",                                     materiel:["Chocolat","Papier","Stylo"] },
  { id:3,  emoji:"🎨", titre:"Le lutin a fait de la peinture",         description:"Des empreintes de mains vertes sur le mur du couloir !",                                          materiel:["Peinture verte","Papier journal"] },
  { id:4,  emoji:"🧸", titre:"Le lutin a kidnappé les peluches",       description:"Toutes les peluches sont attachées ensemble avec de la laine !",                                  materiel:["Pelote de laine"] },
  { id:5,  emoji:"🍪", titre:"Le lutin a préparé des cookies",         description:"Une recette magique de Noël l'attendait sur la table au réveil.",                                 materiel:["Farine","Beurre","Sucre","Oeufs","Pépites de chocolat"] },
  { id:6,  emoji:"🎭", titre:"Le lutin a mis des lunettes aux photos", description:"Toutes les photos de la maison ont été décorées de lunettes dessinées !",                        materiel:["Post-it","Stylo"] },
  { id:7,  emoji:"🧻", titre:"Le lutin a décoré avec du PQ",           description:"Le sapin est enroulé dans du papier toilette comme une momie !",                                  materiel:["Papier toilette"] },
  { id:8,  emoji:"🥣", titre:"Le lutin a inversé le petit déj",        description:"Les céréales sont dans le bol de lait et le lait dans la boîte de céréales !",                   materiel:["Céréales","Lait"] },
  { id:9,  emoji:"🎈", titre:"Le lutin a rempli la chambre de ballons",description:"Impossible d'entrer dans la chambre tellement il y a de ballons !",                              materiel:["Ballons"] },
  { id:10, emoji:"🪞", titre:"Le lutin a laissé un message",           description:"Un message secret est écrit à l'envers sur le miroir de la salle de bain.",                      materiel:["Savon liquide","Coton-tige"] },
  { id:11, emoji:"🎁", titre:"Le lutin a emballé la télécommande",     description:"La télécommande est emballée comme un cadeau de Noël !",                                         materiel:["Papier cadeau","Scotch"] },
  { id:12, emoji:"🍌", titre:"Le lutin a dessiné sur les bananes",     description:"Chaque banane a un visage dessiné avec un stylo !",                                              materiel:["Stylo noir"] },
  { id:13, emoji:"🎵", titre:"Le lutin a laissé une playlist",         description:"Un papier avec une playlist de chants de Noël à écouter ensemble.",                              materiel:["Papier","Stylo"] },
  { id:14, emoji:"❄️", titre:"Le lutin a fait neiger dans la maison",  description:"Des flocons de neige en papier sont accrochés partout au plafond !",                             materiel:["Papier blanc","Ciseaux","Scotch"] },
  { id:15, emoji:"🥛", titre:"Le lutin a laissé du lait pour le Père Noël", description:"Un verre de lait et des cookies sont posés près de la cheminée avec un mot.",              materiel:["Lait","Cookies","Papier","Stylo"] },
  { id:16, emoji:"🎪", titre:"Le lutin a organisé un mini cirque",     description:"Les jouets sont disposés en cercle comme un spectacle de cirque !",                              materiel:[] },
  { id:17, emoji:"🌟", titre:"Le lutin a créé une chasse aux étoiles", description:"Des étoiles en papier sont cachées dans toute la maison avec un indice.",                        materiel:["Papier doré","Ciseaux","Stylo"] },
  { id:18, emoji:"🧁", titre:"Le lutin a préparé une surprise sucrée", description:"Une recette de cupcakes de Noël attendait sur le plan de travail !",                             materiel:["Farine","Beurre","Oeufs","Sucre","Glaçage rouge"] },
  { id:19, emoji:"📸", titre:"Le lutin a créé un photobooth",          description:"Des accessoires rigolos sont posés avec un cadre photo pour faire des photos de famille !",      materiel:["Carton","Ciseaux","Feutres"] },
  { id:20, emoji:"🎯", titre:"Le lutin a organisé un concours",        description:"Un défi sportif est affiché avec les règles et une récompense à gagner !",                       materiel:["Papier","Stylo"] },
  { id:21, emoji:"🦌", titre:"Le lutin a laissé des traces de renne",  description:"Des empreintes de sabots mènent jusqu'au sapin !",                                               materiel:["Peinture marron","Carton"] },
  { id:22, emoji:"🎶", titre:"Le lutin a organisé un karaoké",         description:"Les paroles de chants de Noël sont affichées pour un karaoké en famille !",                     materiel:["Papier","Stylo"] },
  { id:23, emoji:"🌙", titre:"Le lutin a préparé un film de Noël",     description:"Une liste de films de Noël à regarder ensemble est affichée avec des pop-corns !",              materiel:["Pop-corn","Papier","Stylo"] },
  { id:24, emoji:"🎅", titre:"Le lutin repart au Pôle Nord",           description:"Une lettre d'adieu du lutin remerciant toute la famille est posée près du sapin.",              materiel:["Papier","Stylo","Enveloppe"] },
];

const JOUR_ACTUEL = (() => { const now = new Date(); return now.getMonth() === 11 ? Math.min(now.getDate(), 24) : 0; })();

const MOIS_FR = ["janv","févr","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"];
const formatJour = (n) => `${n} décembre`;

// ─── THEME LUTIN ─────────────────────────────────────────────────────────────
const LUTIN_BG   = "linear-gradient(180deg,#1a0533 0%,#0d1f0a 100%)";
const DARK = "#1a0533";
const GOLD = "#F5A623";
const GREEN= "#10B981";

// ─── COMPOSANTS UTILITAIRES ─────────────────────────────────────────────────
function Overlay({onClick,children}){
  return(
    <div onClick={onClick} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:390}}>
        {children}
      </div>
    </div>
  );
}

function Sheet({children,maxH="88vh"}){
  return(
    <div style={{background:DARK,borderRadius:"22px 22px 0 0",maxHeight:maxH,overflowY:"auto",border:"1px solid rgba(255,255,255,0.12)"}}>
      <div style={{width:36,height:4,borderRadius:4,background:"rgba(255,255,255,0.2)",margin:"14px auto 0"}}/>
      {children}
    </div>
  );
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function Confetti({active}){
  const [particles,setParticles]=useState([]);
  useEffect(()=>{
    if(!active)return;
    const colors=["#6C5CE7","#F5A623","#10B981","#EC4899","#3B82F6","#F59E0B","#EF4444","#8B5CF6"];
    const p=Array.from({length:60},(_,i)=>({
      id:i,x:Math.random()*100,y:-10,vx:(Math.random()-0.5)*3,vy:Math.random()*4+2,
      color:colors[Math.floor(Math.random()*colors.length)],
      size:Math.random()*8+4,rotation:Math.random()*360,shape:Math.random()>0.5?"rect":"circle",
    }));
    setParticles(p);
    const t=setTimeout(()=>setParticles([]),4000);
    return()=>clearTimeout(t);
  },[active]);
  if(particles.length===0)return null;
  return(
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:3000,overflow:"hidden"}}>
      {particles.map(p=>(
        <div key={p.id} style={{position:"absolute",left:p.x+"%",top:p.y+"%",width:p.size,height:p.size,background:p.color,borderRadius:p.shape==="circle"?"50%":"2px",animation:`confettiFall ${1.5+Math.random()*2}s linear forwards`,transform:`rotate(${p.rotation}deg)`,opacity:1}}/>
      ))}
      <style>{`@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(110vh) rotate(720deg);opacity:0;}}`}</style>
    </div>
  );
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function Onboarding({onDone,onDemo}){
  const [step,setStep]=useState(0);
  const steps=[
    {emoji:"🧩",titre:"Bienvenue sur Parent'Hèse",desc:"L'app pensée pour les familles avec des enfants TND — TSA, TDAH, DYS. Trouvez des activités et sorties adaptées en quelques secondes.",bg:"linear-gradient(135deg,#6C5CE7,#a78bfa)"},
    {emoji:"🪄",titre:"Générez des idées adaptées",desc:"Décrivez l'énergie et l'humeur du moment, l'app propose des activités personnalisées selon les besoins sensoriels de votre enfant.",bg:"linear-gradient(135deg,#10B981,#34d399)"},
    {emoji:"🗺️",titre:"Découvrez les sorties près de chez vous",desc:"Parcs, musées, fermes pédagogiques… filtrés par accessibilité et adaptabilité TND. Avec les avis d'autres parents.",bg:"linear-gradient(135deg,#F59E0B,#fcd34d)"},
    {emoji:"📅",titre:"Planifiez la semaine",desc:"Générez un planning d'activités sur mesure pour 3 ou 7 jours. L'emploi du temps en pictogrammes aide votre enfant à se préparer.",bg:"linear-gradient(135deg,#EC4899,#f9a8d4)"},
  ];
  const s=steps[step];
  return(
    <div style={{position:"fixed",inset:0,zIndex:2000,background:s.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"60px 32px 48px",maxWidth:390,margin:"0 auto"}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
        <div style={{fontSize:80,marginBottom:24,lineHeight:1}}>{s.emoji}</div>
        <h2 style={{margin:"0 0 16px",fontSize:24,fontWeight:800,color:"#fff",lineHeight:1.3}}>{s.titre}</h2>
        <p style={{margin:0,fontSize:15,color:"rgba(255,255,255,0.85)",lineHeight:1.7}}>{s.desc}</p>
      </div>
      <div style={{width:"100%"}}>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
          {steps.map((_,i)=><div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i===step?"#fff":"rgba(255,255,255,0.4)",transition:"width 0.3s"}}/>)}
        </div>
        {step<steps.length-1?(
          <div style={{display:"flex",gap:12}}>
            <button onClick={onDone} style={{flex:1,padding:"13px 0",borderRadius:28,background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer"}}>Passer</button>
            <button onClick={()=>setStep(p=>p+1)} style={{flex:2,padding:"13px 0",borderRadius:28,background:"#fff",border:"none",color:"#333",fontWeight:700,fontSize:14,cursor:"pointer"}}>Suivant →</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button onClick={onDone} style={{width:"100%",padding:"15px 0",borderRadius:28,background:"#fff",border:"none",color:"#333",fontWeight:800,fontSize:15,cursor:"pointer"}}>Créer un compte 🚀</button>
            {onDemo&&<button onClick={onDemo} style={{width:"100%",padding:"13px 0",borderRadius:28,background:"rgba(255,255,255,0.2)",border:"2px solid rgba(255,255,255,0.5)",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer"}}>👀 Voir la démo (sans compte)</button>}
          </div>
        )}
      </div>
    </div>
  );
}

function Toast({msg}){
  return(
    <div style={{position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",background:GREEN,color:WH,borderRadius:28,padding:"10px 22px",fontSize:13,fontWeight:700,zIndex:900,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
      {msg}
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
function LutinView({onBack,evenementsSaisonniers=[],isPremium=false,onOpenPremium}){
  const [calendrier,setCalendrier] = useState(
    Array.from({length:24},(_,i)=>({jour:i+1,betise:bibliotheque[i],debloque:true}))
  );
  const [jourSelectionne,setJourSelectionne] = useState(null);
  const [showBibliotheque,setShowBibliotheque] = useState(false);
  const [jourARemplacer,setJourARemplacer] = useState(null);
  const [showCourses,setShowCourses] = useState(false);
  const [checked,setChecked] = useState({});
  const [toast,setToast] = useState(null);
  const [showLockMsg,setShowLockMsg] = useState(false);

  const evenementNoel = evenementsSaisonniers.find(e => e.id === 'noel');
  const joursGratuits = evenementNoel ? (
    evenementNoel.apercuGratuitType === 'premiers'
      ? Array.from({ length: evenementNoel.apercuGratuitJours||3 }, (_, i) => i + 1)
      : Array.from({ length: evenementNoel.apercuGratuitJours||3 }, (_, i) => 24 - i).filter(j => j > 0)
  ) : [1,2,3];
  const jourEstAccessible = (jour) => {
    if (isPremium) return true;
    return joursGratuits.includes(jour);
  };

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const jourData = jourSelectionne!=null ? calendrier.find(c=>c.jour===jourSelectionne) : null;

  const remplacerBetise=(betise)=>{
    if(jourARemplacer==null)return;
    setCalendrier(prev=>prev.map(c=>c.jour===jourARemplacer?{...c,betise}:c));
    setShowBibliotheque(false);
    setJourSelectionne(null);
    setJourARemplacer(null);
    showToast("✅ Bêtise changée !");
  };

  // Liste de courses agrégée
  const tousMateriels = calendrier.flatMap(c=>(c.betise?.materiel||[]));
  const materielUnique = [...new Set(tousMateriels)].sort();
  const toggleChecked=(m)=>setChecked(prev=>({...prev,[m]:!prev[m]}));
  const toutCocher=()=>{const all={};materielUnique.forEach(m=>all[m]=true);setChecked(all);};

  return(
    <div style={{minHeight:"100vh",background:LUTIN_BG,fontFamily:"system-ui,-apple-system,sans-serif",paddingBottom:32}}>

      {/* Header */}
      <div style={{background:"rgba(26,5,51,0.95)",backdropFilter:"blur(10px)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,0.08)",position:"sticky",top:0,zIndex:100}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer",color:WH,flexShrink:0}}>←</button>
        <div style={{flex:1,textAlign:"center"}}>
          <p style={{margin:0,fontSize:16,fontWeight:800,color:WH}}>🎄 Calendrier du Lutin</p>
          <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.5)",letterSpacing:"0.1em"}}>ADVENT CALENDAR</p>
        </div>
        <div style={{width:36}}/>
      </div>

      {/* Hero */}
      <div style={{textAlign:"center",padding:"28px 16px 20px"}}>
        <p style={{margin:"0 0 6px",fontSize:22,fontWeight:800,color:WH}}>🎅 Les bêtises de décembre</p>
        <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.6)"}}>Appuie sur un jour pour voir ou changer la bêtise</p>
      </div>

      {/* Grille */}
      <div style={{padding:"0 14px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
        {calendrier.map(({jour,betise})=>{
          const isToday = jour===JOUR_ACTUEL;
          const accessible = jourEstAccessible(jour);
          return(
            <button key={jour} onClick={()=>accessible?setJourSelectionne(jour):setShowLockMsg(true)} style={{
              background:!accessible?"rgba(255,255,255,0.04)":isToday?"rgba(245,166,35,0.2)":"rgba(255,255,255,0.08)",
              border:`1.5px solid ${!accessible?"rgba(255,255,255,0.1)":isToday?GOLD:"rgba(255,255,255,0.15)"}`,
              borderRadius:12,padding:"10px 4px 8px",cursor:"pointer",
              boxShadow:isToday&&accessible?"0 0 14px rgba(245,166,35,0.4)":"none",
              display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              transition:"all 0.15s",position:"relative",
              opacity:accessible?1:0.55,
            }}>
              {isToday&&<div style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",background:GOLD,borderRadius:20,padding:"1px 7px",fontSize:8,fontWeight:800,color:"#000",whiteSpace:"nowrap"}}>Aujourd'hui</div>}
              <span style={{fontSize:18,fontWeight:800,color:isToday&&accessible?GOLD:WH}}>{jour}</span>
              {accessible?<span style={{fontSize:20}}>{betise.emoji}</span>:<span style={{fontSize:18}}>🔒</span>}
            </button>
          );
        })}
      </div>

      {/* Bouton liste de courses */}
      <div style={{padding:"0 14px"}}>
        <button onClick={()=>setShowCourses(!showCourses)} style={{width:"100%",padding:"14px 0",borderRadius:28,background:GOLD,border:"none",color:"#000",fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:12}}>
          🛒 {showCourses?"Masquer":"Voir"} la liste de courses du lutin
        </button>

        {showCourses&&(
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:16,border:"1px solid rgba(255,255,255,0.12)",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <p style={{margin:0,fontSize:14,fontWeight:700,color:WH}}>📋 {materielUnique.length} articles</p>
              <button onClick={toutCocher} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"5px 12px",color:WH,fontSize:12,fontWeight:600,cursor:"pointer"}}>📋 Tout cocher</button>
            </div>
            {materielUnique.map(m=>(
              <div key={m} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div onClick={()=>toggleChecked(m)} style={{width:20,height:20,borderRadius:5,border:`2px solid ${checked[m]?GREEN:"rgba(255,255,255,0.3)"}`,background:checked[m]?GREEN:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                    {checked[m]&&<span style={{fontSize:12,color:WH}}>✓</span>}
                  </div>
                  <span style={{fontSize:13,color:checked[m]?"rgba(255,255,255,0.4)":WH,textDecoration:checked[m]?"line-through":"none"}}>{m}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL DÉTAIL BÊTISE ───────────────────────────────────────────── */}
      {jourSelectionne!=null&&jourData&&!showBibliotheque&&(
        <div onClick={()=>setJourSelectionne(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:390,background:DARK,borderRadius:22,maxHeight:"85vh",overflowY:"auto",border:"1px solid rgba(255,255,255,0.12)",boxShadow:"0 16px 56px rgba(0,0,0,0.45)"}}>
            <div style={{padding:"22px 20px 28px"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Jour {jourData.jour} — {formatJour(jourData.jour)}</p>
              <div style={{textAlign:"center",margin:"16px 0 12px"}}>
                <div style={{fontSize:72,marginBottom:8,lineHeight:1}}>{jourData.betise.emoji}</div>
                <p style={{margin:"0 0 8px",fontSize:18,fontWeight:800,color:WH,lineHeight:1.3}}>{jourData.betise.titre}</p>
                <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.75)",lineHeight:1.6}}>{jourData.betise.description}</p>
              </div>

              {/* Matériel */}
              <div style={{marginBottom:22}}>
                <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:WH}}>🧺 Matériel nécessaire</p>
                {(jourData.betise.materiel||[]).length===0?(
                  <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:0}}>Aucun matériel nécessaire 🎉</p>
                ):(
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {(jourData.betise.materiel||[]).map(m=>(
                      <span key={m} style={{background:"rgba(255,255,255,0.12)",color:WH,borderRadius:20,padding:"5px 12px",fontSize:12,border:"1px solid rgba(255,255,255,0.15)"}}>{m}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Boutons */}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button onClick={()=>setJourSelectionne(null)} style={{width:"100%",padding:"13px 0",borderRadius:28,background:GREEN,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  ✅ Garder cette bêtise
                </button>
                <button onClick={()=>{setJourARemplacer(jourSelectionne);setShowBibliotheque(true);}} style={{width:"100%",padding:"13px 0",borderRadius:28,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  🔄 Changer cette bêtise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL BIBLIOTHÈQUE ────────────────────────────────────────────── */}
      {showBibliotheque&&(
        <Overlay onClick={()=>setShowBibliotheque(false)}>
          <Sheet maxH="90vh">
            <div style={{padding:"18px 16px 32px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <p style={{margin:0,fontSize:16,fontWeight:800,color:WH}}>🎄 Choisir une autre bêtise</p>
                <button onClick={()=>setShowBibliotheque(false)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"5px 12px",color:"rgba(255,255,255,0.6)",fontSize:12,cursor:"pointer"}}>Annuler</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {bibliotheque.map(b=>{
                  const isCurrente = calendrier.find(c=>c.jour===jourARemplacer)?.betise.id===b.id;
                  return(
                    <div key={b.id} onClick={()=>remplacerBetise(b)} style={{
                      background:isCurrente?"rgba(16,185,129,0.15)":"rgba(255,255,255,0.07)",
                      borderRadius:12,padding:"12px 14px",cursor:"pointer",
                      border:`1px solid ${isCurrente?"rgba(16,185,129,0.4)":"rgba(255,255,255,0.1)"}`,
                      display:"flex",alignItems:"flex-start",gap:12,
                      transition:"all 0.1s",
                    }}>
                      <span style={{fontSize:28,flexShrink:0,lineHeight:1}}>{b.emoji}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                          <p style={{margin:0,fontSize:13,fontWeight:700,color:WH,lineHeight:1.2}}>{b.titre}</p>
                          {isCurrente&&<span style={{fontSize:10,background:GREEN,color:WH,borderRadius:10,padding:"1px 7px",flexShrink:0,fontWeight:700}}>En cours</span>}
                        </div>
                        <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.55)",lineHeight:1.4}}>{b.description.slice(0,60)}…</p>
                      </div>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:18,flexShrink:0}}>›</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Sheet>
        </Overlay>
      )}

      {/* ── MESSAGE VERROUILLAGE FREEMIUM ──────────────────────────────────── */}
      {showLockMsg&&(
        <Overlay onClick={()=>setShowLockMsg(false)}>
          <Sheet>
            <div style={{padding:"28px 24px 32px",textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:12}}>🔒</div>
              <p style={{margin:"0 0 8px",fontSize:16,fontWeight:800,color:WH}}>Débloquez tout le calendrier avec Premium</p>
              <p style={{margin:"0 0 20px",fontSize:13,color:"rgba(255,255,255,0.65)",lineHeight:1.5}}>Accède à toutes les bêtises du calendrier de l'Avent, jour après jour.</p>
              <button onClick={()=>{setShowLockMsg(false);onOpenPremium&&onOpenPremium();}} style={{width:"100%",padding:"13px 0",borderRadius:28,background:GOLD,border:"none",color:"#000",fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:10}}>⭐ Voir Premium</button>
              <button onClick={()=>setShowLockMsg(false)} style={{width:"100%",padding:"11px 0",borderRadius:28,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:WH,fontWeight:600,fontSize:13,cursor:"pointer"}}>Fermer</button>
            </div>
          </Sheet>
        </Overlay>
      )}

      {/* Toast */}
      {toast&&<Toast msg={toast}/>}
    </div>
  );
}


function FichierViewer({fichier,couleur,onClose}){
  const isImage=fichier.type?.startsWith("image");
  const isPdf=fichier.type?.includes("pdf");
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:700,display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      {/* Header */}
      <div onClick={e=>e.stopPropagation()} style={{background:"rgba(0,0,0,0.6)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={onClose} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:0,fontSize:14,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fichier.nom}</p>
          <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.5)"}}>{fichier.taille}</p>
        </div>
        {fichier.dataUrl&&<a href={fichier.dataUrl} download={fichier.nom} style={{background:couleur,borderRadius:20,padding:"7px 14px",color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none",flexShrink:0}}>⬇ Télécharger</a>}
      </div>
      {/* Contenu */}
      <div onClick={e=>e.stopPropagation()} style={{flex:1,overflow:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        {isImage&&fichier.dataUrl&&(
          <img src={fichier.dataUrl} alt={fichier.nom} style={{maxWidth:"100%",maxHeight:"100%",borderRadius:12,objectFit:"contain",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}/>
        )}
        {isPdf&&fichier.dataUrl&&(
          <iframe src={fichier.dataUrl} title={fichier.nom} style={{width:"100%",height:"100%",border:"none",borderRadius:8,background:"#fff"}}/>
        )}
        {!fichier.dataUrl&&(
          <div style={{textAlign:"center",color:"#fff"}}>
            <p style={{fontSize:48,margin:"0 0 16px"}}>{isImage?"🖼️":isPdf?"📄":"📎"}</p>
            <p style={{fontSize:16,fontWeight:600,margin:"0 0 8px"}}>{fichier.nom}</p>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.6)",margin:"0 0 24px"}}>Aperçu non disponible</p>
          </div>
        )}
        {!isImage&&!isPdf&&fichier.dataUrl&&(
          <div style={{textAlign:"center",color:"#fff"}}>
            <p style={{fontSize:48,margin:"0 0 16px"}}>📎</p>
            <p style={{fontSize:16,fontWeight:600,margin:"0 0 8px"}}>{fichier.nom}</p>
            <a href={fichier.dataUrl} download={fichier.nom} style={{display:"inline-block",background:couleur,borderRadius:28,padding:"12px 24px",color:"#fff",fontSize:14,fontWeight:700,textDecoration:"none"}}>⬇ Télécharger</a>
          </div>
        )}
      </div>
    </div>
  );
}

function EvtGenerateur({evt,activites,favoris,setFavoris,isPremium=false}){
  const [genResult,setGenResult]=useState(null);
  const [genListe,setGenListe]=useState(null);
  const genActivity=()=>{
    const publiees=activites.filter(a=>a.statut==="published"||!a.statut);
    if(!publiees.length)return;
    if(isPremium){
      setGenResult(publiees[Math.floor(Math.random()*publiees.length)]);
      setGenListe(null);
    }else{
      const shuffled=[...publiees].sort(()=>Math.random()-0.5);
      setGenListe(shuffled.slice(0,Math.min(3,shuffled.length)));
      setGenResult(null);
    }
  };
  const choisirActivity=(item)=>{setGenResult(item);setGenListe(null);};
  const isFav=genResult&&favoris.some(f=>f.id===genResult.id&&f._type==="activite");
  return(
    <div style={{background:`linear-gradient(135deg,${evt.couleur}18,${evt.couleur}08)`,borderRadius:20,padding:"18px 16px",border:`1.5px solid ${evt.couleur}33`,marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:12,background:(evt.couleur||"#6C5CE7")+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎲</div>
        <div>
          <p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>Générateur {evt.nom}</p>
          <p style={{margin:0,fontSize:12,color:TM}}>Une idée d'activité au hasard</p>
        </div>
      </div>
      {genListe?(
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>
          <p style={{margin:"0 0 2px",fontSize:11,color:TM,textAlign:"center"}}>⭐ Passe en Premium pour une seule proposition en un clic</p>
          {genListe.map((item,i)=>(
            <div key={item.id||i} style={{background:WH,borderRadius:14,padding:"12px 14px",border:"1px solid rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontSize:11,background:(evt.couleur||"#6C5CE7")+"22",color:evt.couleur,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{item.categorie}</span>
                {item.duree&&<span style={{fontSize:11,background:BG,color:TM,padding:"3px 10px",borderRadius:20}}>⏱ {item.duree}</span>}
              </div>
              <p style={{margin:"0 0 8px",fontSize:14,fontWeight:700,color:TX}}>{item.titre}</p>
              <button onClick={()=>choisirActivity(item)} style={{width:"100%",padding:"9px 0",borderRadius:20,background:(evt.couleur||"#6C5CE7"),border:"none",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>Choisir cette activité</button>
            </div>
          ))}
        </div>
      ):genResult?(
        <div style={{background:WH,borderRadius:14,padding:"14px 14px 10px",marginBottom:12,border:"1px solid rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
            <span style={{fontSize:11,background:(evt.couleur||"#6C5CE7")+"22",color:evt.couleur,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{genResult.categorie}</span>
            {genResult.duree&&<span style={{fontSize:11,background:BG,color:TM,padding:"3px 10px",borderRadius:20}}>⏱ {genResult.duree}</span>}
          </div>
          <p style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:TX}}>{genResult.titre}</p>
          {genResult.desc&&<p style={{margin:"0 0 8px",fontSize:13,color:TM,lineHeight:1.5}}>{genResult.desc}</p>}
          {genResult.age&&<p style={{margin:0,fontSize:12,color:TM}}>👶 {genResult.age}</p>}
        </div>
      ):(
        <p style={{fontSize:13,color:TM,textAlign:"center",margin:"0 0 12px"}}>Clique pour découvrir une activité {evt.emoji}</p>
      )}
      <div style={{display:"flex",gap:8}}>
        <button onClick={genActivity} style={{flex:1,padding:"11px 0",borderRadius:28,background:(evt.couleur||"#6C5CE7"),border:"none",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {genResult||genListe?"🔄 Une autre":"✨ Générer une activité"}
        </button>
        {genResult&&<button onClick={()=>setFavoris(prev=>{if(isFav)return prev;return[...prev,{...genResult,nom:genResult.titre,_type:"activite"}];})} style={{flex:1,padding:"11px 0",borderRadius:28,background:isFav?BG:WH,border:`1.5px solid ${evt.couleur}`,color:evt.couleur,fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {isFav?"❤️ Sauvegardé":"❤️ Sauvegarder"}
        </button>}
      </div>
    </div>
  );
}

function PageAccueil({favoris,setFavoris,setPage,customEvents=[],popupShown=new Set(),setPopupShown,ideesMomentConfig=[],isLoggedIn=true,onRequireAuth,evenementsSaisonniers=[],isPremium=false,onOpenPremium,customCatActivites=[],customCatSorties=[],customCatEvenements=[],adminActivites=[],adminSorties=[],pendingContribs=[],setPendingContribs,deletedTitles=new Set(),currentUser=null,sosModeActif=true,enfants=[],enfantActif=null,setEnfantActif,onMarquerFait,historiqueActivites=[],filtresMemoActiv={},setFiltresMemoActiv,filtresMemoSortie={},setFiltresMemoSortie}){
  const FAVORIS_LIMITE_GRATUIT=10;
  const [showFavorisLimitMsg,setShowFavorisLimitMsg]=useState(false);
  const setFavorisGuarded=(updater)=>{
    if(!isLoggedIn){ onRequireAuth&&onRequireAuth(); return; }
    setFavoris(prev=>{
      const next=typeof updater==="function"?updater(prev):updater;
      if(!isPremium&&Array.isArray(next)&&Array.isArray(prev)&&next.length>prev.length&&next.length>FAVORIS_LIMITE_GRATUIT){
        setShowFavorisLimitMsg(true);
        return prev;
      }
      return next;
    });
  };
  const [tick,setTick]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setTick(p=>p+1),30000); return ()=>clearInterval(t); },[]);
  const [resultA,setResultA]=useState(null);
  const [dislikedIds,setDislikedIds]=useState(new Set()); // activités rejetées, non re-proposées dans la session
  const [resultS,setResultS]=useState(null);
  const [showFiltres,setShowFiltres]=useState(false);
  const [showEvtBiblio,setShowEvtBiblio]=useState(null); // evt object or null
  const [showFichier,setShowFichier]=useState(null); // fichier object or null
  const today=new Date().toISOString().split("T")[0];
  const activeCustomEvents=customEvents.filter(e=>e.actif&&(!e.dateDebut||e.dateDebut<=today)&&(!e.dateFin||e.dateFin>=today));
  const activeBanners=activeCustomEvents.filter(e=>e.banner);
  const pendingPopups=activeCustomEvents.filter(e=>e.popup&&!popupShown.has(e.id));
  const [currentPopup,setCurrentPopup]=useState(null);
  useEffect(()=>{if(pendingPopups.length>0&&!currentPopup){setCurrentPopup(pendingPopups[0]);if(setPopupShown)setPopupShown(prev=>new Set([...prev,pendingPopups[0].id]));}},[]); // eslint-disable-line
  const [showLutinView,setShowLutinView]=useState(false);
  const [showAdminSheet,setShowAdminSheet]=useState(false);
  const [adminActRandom,setAdminActRandom]=useState(null);
  const [showNatureSheet,setShowNatureSheet]=useState(false);
  const [showEvtAdminSheet,setShowEvtAdminSheet]=useState(false);
  const [showLutinSheet,setShowLutinSheet]=useState(false);
  const [lutinDetail,setLutinDetail]=useState(null);
  const [lutinStep,setLutinStep]=useState("filtres");
  const [lutinAgeF,setLutinAgeF]=useState(null);
  const LUTIN_AGES=["0-3 ans","3-6 ans","6-10 ans","10-12 ans"];
  const ALL_LUTIN_MAT=[...new Set(LUTINS_ACTIVITES.flatMap(a=>a.materiel||[]))].filter(Boolean).sort();
  const [lutinMat,setLutinMat]=useState([]);
  const toggleLutinMat=(m)=>setLutinMat(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m]);
  const lutinFiltered=LUTINS_ACTIVITES.filter(a=>
    lutinMat.length===0||(a.materiel||[]).length===0||(a.materiel||[]).every(m=>lutinMat.includes(m))
  );
  const [lieu,setLieu]=useState(filtresMemoActiv.lieu||null);
  const [energie,setEnergie]=useState(filtresMemoActiv.energie||null);
  const [ageEnfant,setAgeEnfant]=useState(filtresMemoActiv.ageEnfant||null);
  const AGE_OPTIONS=["0-2 ans","2-4 ans","4-7 ans","7-10 ans","10-12 ans"];
  const blockedTitles=new Set(deletedTitles||[]);
  const approvedActs=(pendingContribs||[]).filter(c=>c._type==="activite"&&c._statut==="published");
  const approvedSortsGen=(pendingContribs||[]).filter(c=>c._type==="sortie"&&c._statut==="published");
  const adminPublishedActs=(adminActivites||[]).filter(a=>a.statut==="published").map(a=>({...a,nom:a.nom||a.titre}));
  const adminPublishedSortsGen=(adminSorties||[]).filter(o=>o.statut==="published");
  const toutesActivites=[...ACTIVITES,...adminPublishedActs,...approvedActs].filter(a=>!blockedTitles.has(a.nom)&&!blockedTitles.has(a.titre));
  const toutesSorties=[...SORTIES,...adminPublishedSortsGen,...approvedSortsGen].filter(s=>!blockedTitles.has(s.nom)&&!blockedTitles.has(s.titre));
  const [resultsAList,setResultsAList]=useState(null);
  const genActivite=()=>{
    const ageNum=ageEnfant?parseInt(ageEnfant):null;
    const enfantCourant=enfants.find(e=>e.id===enfantActif);
    const niveaux=enfantCourant?.niveauxSensoriels||null;
    const pool=toutesActivites.filter(a=>{
      if(dislikedIds.has(a.id||a.nom))return false; // jamais re-proposer une activité rejetée
      if(lieu&&a.lieu!==lieu)return false;
      if(energie&&a.energie!==energie)return false;
      if(ageNum!=null&&a.age){
        const m=a.age.match(/(\d+)-(\d+)/);
        if(m&&(ageNum<parseInt(m[1])||ageNum>parseInt(m[2])))return false;
      }
      // Filtre sensoriel Premium : exclure activités incompatibles avec le profil enfant
      if(isPremium&&niveaux&&a.niveauxSensoriels){
        if((a.niveauxSensoriels.bruit||0)>66&&(niveaux.bruit||50)<35)return false;
        if((a.niveauxSensoriels.visuel||0)>66&&(niveaux.lumiere||50)<35)return false;
        if((a.niveauxSensoriels.physique||0)>66&&(niveaux.foule||50)<35)return false;
      }
      // Filtre par besoins spécifiques
      if(isPremium&&enfantCourant?.besoins?.length>0&&a.adaptations?.length>0){
        // Bonus : favoriser les activités qui correspondent aux besoins (pas d'exclusion stricte)
      }
      return true;
    });
    const source=pool.length?pool:toutesActivites;
    const shuffled=[...source].sort(()=>Math.random()-0.5);
    // 3 activités pour tout le monde
    // Premium : triées par score de compatibilité TND avec l'enfant actif
    if(isPremium&&enfantCourant){
      const score=(a)=>{
        let s=0;
        const n=enfantCourant.niveauxSensoriels||{};
        const besoins=enfantCourant.besoins||[];
        const ns=a.niveauxSensoriels||{};
        // Correspondance sensorielle (écart faible = bon score)
        if(ns.bruit!==undefined)s+=Math.max(0,50-Math.abs((n.bruit||50)-(100-ns.bruit)));
        if(ns.visuel!==undefined)s+=Math.max(0,50-Math.abs((n.lumiere||50)-(100-ns.visuel)));
        // Correspondance besoins/adaptations
        const adaps=a.adaptations||[];
        s+=besoins.filter(b=>adaps.includes(b)).length*15;
        // Correspondance profil TND
        const profilsEnfant=enfantCourant.profils||[];
        const profilsActiv=a.profilsTND||{};
        if(profilsActiv.tous)s+=20;
        if(profilsEnfant.includes("TSA")&&profilsActiv.tsa)s+=25;
        if(profilsEnfant.includes("TDAH")&&profilsActiv.tdah)s+=25;
        if(profilsEnfant.includes("DYS")&&profilsActiv.dys)s+=25;
        return s;
      };
      const scored=[...shuffled].map(a=>({...a,_score:score(a)})).sort((a,b)=>b._score-a._score);
      setResultsAList(scored.slice(0,Math.min(3,scored.length)));
    }else{
      setResultsAList(shuffled.slice(0,Math.min(3,shuffled.length)));
    }
    setResultA(null);
    setShowFiltres(false);
    if(setFiltresMemoActiv)setFiltresMemoActiv({lieu,energie,ageEnfant});
  };
  const [showFiltresSortie,setShowFiltresSortie]=useState(false);
  const [deptS,setDeptS]=useState(filtresMemoSortie.deptS||"");
  const [typeS,setTypeS]=useState(filtresMemoSortie.typeS||"");
  const [ageS,setAgeS]=useState(filtresMemoSortie.ageS||null);
  const [tndS,setTndS]=useState(null);
  const [prixS,setPrixS]=useState(filtresMemoSortie.prixS||null);
  const AGE_SORTIE=["0-2 ans","2-4 ans","4-7 ans","7-10 ans","10-12 ans"];
  const TND_OPTIONS=[{val:"tsa",label:"TSA",color:"#8B5CF6"},{val:"tdah",label:"TDAH",color:"#EC4899"},{val:"dys",label:"DYS",color:"#06B6D4"}];
  const PRIX_OPTIONS=[{val:"gratuit",label:"🆓 Gratuit"},{val:"moins20",label:"< 20 €"},{val:"moins40",label:"< 40 €"},{val:"plus40",label:"40 € +"}];
  const [resultsSList,setResultsSList]=useState(null);
  const genSortie=()=>{
    const ageNum=ageS?parseInt(ageS):null;
    const pool=toutesSorties.filter(s=>{
      if(deptS&&s.dept!==deptS)return false;
      if(typeS&&s.type!==typeS)return false;
      if(tndS&&s.tnd&&s.tnd[tndS]<4)return false;
      if(prixS==="gratuit"){const p=(s.prix||"").trim().toLowerCase();if(p!=="gratuit"&&p!=="0"&&p!=="0€"&&p!=="")return false;}
      if(prixS==="moins20"){const p=(s.prix||"").trim().toLowerCase();const isGrat=p==="gratuit"||p==="0"||p==="0€"||p==="";const n=parseFloat(s.prix);if(!isGrat&&(isNaN(n)||n>=20))return false;}
      if(prixS==="moins40"){const p=(s.prix||"").trim().toLowerCase();const isGrat=p==="gratuit"||p==="0"||p==="0€"||p==="";const n=parseFloat(s.prix);if(!isGrat&&(isNaN(n)||n>=40))return false;}
      if(prixS==="plus40"){const n=parseFloat(s.prix);if(isNaN(n)||n<40)return false;}
      if(ageNum!=null&&s.age){const m=s.age.match(/(\d+)-(\d+)/);if(m&&(ageNum<parseInt(m[1])||ageNum>parseInt(m[2])))return false;}
      return true;
    });
    const source=pool.length?pool:toutesSorties;
    if(isPremium){
      setResultS(source[Math.floor(Math.random()*source.length)]);
      setResultsSList(null);
    }else{
      const shuffled=[...source].sort(()=>Math.random()-0.5);
      setResultsSList(shuffled.slice(0,Math.min(3,shuffled.length)));
      setResultS(null);
    }
    setShowFiltresSortie(false);
    if(setFiltresMemoSortie)setFiltresMemoSortie({deptS,typeS,ageS,prixS});
  };
  const choisirDansListeA=(item)=>{setResultA(item);setResultsAList(null);};
  const choisirDansListeS=(item)=>{setResultS(item);setResultsSList(null);};
  const toggleFav=(item)=>{const t=resultA?"activite":"sortie";setFavorisGuarded(prev=>{const exists=prev.find(f=>f.id===item.id&&f._type===t);if(exists)return prev.filter(f=>!(f.id===item.id&&f._type===t));return[...prev,{...item,_type:t}];});if(resultA)setResultA(null);else setResultS(null);};
  const ideesMoment=[
    {
      id:"activites",
      label:"Activites creatives",
      nom:ACTIVITE_ADMIN.nom,
      admin:true,
      gradient:"linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",
      color:"#fff",
      illustration:(
        <svg viewBox="0 0 100 80" width="100" height="80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="28" fill="rgba(255,255,255,0.18)"/>
          <text x="50" y="52" textAnchor="middle" fontSize="34">🎨</text>
          <circle cx="30" cy="22" r="7" fill="rgba(255,255,255,0.25)"/>
          <circle cx="72" cy="18" r="5" fill="rgba(255,255,255,0.2)"/>
          <circle cx="78" cy="58" r="6" fill="rgba(255,255,255,0.15)"/>
        </svg>
      )
    },
    {
      id:"nature",
      label:"Sorties",
      nom:SORTIE_NATURE_ADMIN.nom,
      admin:true,
      gradient:"linear-gradient(135deg,#6ee7b7 0%,#059669 100%)",
      color:"#fff",
      illustration:(
        <svg viewBox="0 0 100 80" width="100" height="80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="28" fill="rgba(255,255,255,0.18)"/>
          <text x="50" y="52" textAnchor="middle" fontSize="34">🌳</text>
          <circle cx="28" cy="20" r="6" fill="rgba(255,255,255,0.2)"/>
          <circle cx="74" cy="60" r="7" fill="rgba(255,255,255,0.15)"/>
        </svg>
      )
    },
    {
      id:"evenements",
      label:"Evenements",
      nom:EVT_ADMIN.nom,
      admin:true,
      gradient:"linear-gradient(135deg,#fbbf24 0%,#d97706 100%)",
      color:"#fff",
      illustration:(
        <svg viewBox="0 0 100 80" width="100" height="80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="28" fill="rgba(255,255,255,0.18)"/>
          <text x="50" y="52" textAnchor="middle" fontSize="34">🎡</text>
          <circle cx="26" cy="24" r="5" fill="rgba(255,255,255,0.2)"/>
          <circle cx="76" cy="20" r="7" fill="rgba(255,255,255,0.15)"/>
        </svg>
      )
    },
  ];
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:8}}>
      {showLutinView&&<LutinView onBack={()=>setShowLutinView(false)} evenementsSaisonniers={evenementsSaisonniers} isPremium={isPremium} onOpenPremium={onOpenPremium}/>}

      {showFavorisLimitMsg&&(
        <div onClick={()=>setShowFavorisLimitMsg(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <div style={{fontSize:40,marginBottom:10}}>🔒</div>
            <p style={{margin:"0 0 18px",fontSize:14,color:TX,lineHeight:1.5,fontWeight:600}}>Limite de 10 favoris atteinte. Passe en Premium pour des favoris illimités !</p>
            <button onClick={()=>{setShowFavorisLimitMsg(false);onOpenPremium&&onOpenPremium();}} style={{width:"100%",padding:13,borderRadius:28,background:"#6C5CE7",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Voir Premium</button>
            <button onClick={()=>setShowFavorisLimitMsg(false)} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Fermer</button>
          </div>
        </div>
      )}
      <div style={{padding:"18px 16px 0"}}>
        {/* Titre principal centre */}
        <div style={{textAlign:"center",padding:"24px 8px 16px"}}>
          <p style={{margin:"0 0 6px",fontSize:26,fontWeight:800,color:TX,lineHeight:1.2}}>Que souhaitez-vous<br/>faire aujourd hui ? 🪄</p>
          <p style={{margin:0,fontSize:14,color:TM}}>Trouvez l inspiration parfaite en deux clics pour vos enfants.</p>
          {/* Rappel créer profil enfant */}
          {isLoggedIn&&enfants.length===0&&(
            <div onClick={()=>setPage("profil")} style={{background:"linear-gradient(135deg,#EDE9FF,#F5F0FF)",borderRadius:16,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:"1.5px solid rgba(108,92,231,0.2)"}}>
              <span style={{fontSize:32,flexShrink:0}}>👶</span>
              <div style={{flex:1}}>
                <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:V}}>Crée le profil de ton enfant</p>
                <p style={{fontSize:11,color:TM,margin:0}}>Le générateur s'adaptera à son profil TND et sensoriel pour de meilleures suggestions</p>
              </div>
              <span style={{color:V,fontSize:16,flexShrink:0}}>→</span>
            </div>
          )}

          {/* Streak counter */}
          {(()=>{
            if(historiqueActivites.length===0)return null;
            const today=new Date().toISOString().slice(0,10);
            const dates=[...new Set(historiqueActivites.map(h=>h.date?.slice(0,10)).filter(Boolean))].sort().reverse();
            let streak=0;
            let current=new Date();
            for(const d of dates){
              const diff=Math.floor((current-new Date(d))/(1000*60*60*24));
              if(diff>1)break;
              streak++;
              current=new Date(d);
            }
            if(streak===0)return null;
            return(
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#F59E0B,#F97316)",borderRadius:20,padding:"5px 14px",marginTop:10}}>
                <span style={{fontSize:16}}>🔥</span>
                <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{streak} jour{streak>1?"s":""} d'affilée !</span>
              </div>
            );
          })()}
        </div>

        {/* Suggestion "pas essayé depuis" */}
        {(()=>{
          if(historiqueActivites.length<3)return null;
          const catCounts=historiqueActivites.reduce((acc,h)=>{acc[h.categorie||"Autre"]=(acc[h.categorie||"Autre"]||0)+1;return acc;},{});
          const toutesLesCats=["Creatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"];
          const nonEssayees=toutesLesCats.filter(c=>!catCounts[c]);
          if(nonEssayees.length===0)return null;
          const suggestion=nonEssayees[Math.floor(Math.random()*nonEssayees.length)];
          const catEmojis={"Creatif":"🎨","Cuisine":"🍳","Nature":"🌳","Sport":"⚽","Calme":"😌","Construction":"🧱","Jeu":"🎮","Musique":"🎵","Science":"🔬"};
          return(
            <div style={{background:"linear-gradient(135deg,#EDE9FF,#F3F4F6)",borderRadius:16,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12,border:BD}}>
              <span style={{fontSize:28,flexShrink:0}}>{catEmojis[suggestion]||"✨"}</span>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:12,color:V,fontWeight:700}}>Pas encore essayé !</p>
                <p style={{margin:0,fontSize:13,color:TX}}>Et si vous tentiez une activité <strong>{suggestion}</strong> aujourd'hui ?</p>
              </div>
              <button onClick={()=>{setLieu(null);setEnergie(null);setShowFiltres(true);}} style={{background:V,border:"none",borderRadius:20,padding:"7px 12px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>Essayer</button>
            </div>
          );
        })()}

        {/* Sélecteur enfant actif */}
        {enfants.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <p style={{margin:0,fontSize:12,fontWeight:700,color:TM,textTransform:"uppercase",letterSpacing:"0.05em"}}>Pour qui générer ?</p>
              {isPremium&&<span style={{fontSize:10,color:V,fontWeight:600}}>⭐ Adapté au profil</span>}
            </div>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
              <button onClick={()=>setEnfantActif&&setEnfantActif(null)} style={{flexShrink:0,padding:"8px 14px",borderRadius:20,border:`2px solid ${!enfantActif?"#1a1a1a":"rgba(0,0,0,0.08)"}`,background:!enfantActif?"#1a1a1a":WH,color:!enfantActif?"#fff":TM,fontSize:12,fontWeight:!enfantActif?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>
                👨‍👩‍👧 Tous
              </button>
              {enfants.map(e=>{
                const actif=e.id===enfantActif;
                return(
                  <button key={e.id} onClick={()=>setEnfantActif&&setEnfantActif(e.id)} style={{flexShrink:0,padding:"8px 14px",borderRadius:20,border:`2px solid ${actif?(e.couleur||V):"rgba(0,0,0,0.08)"}`,background:actif?(e.couleur||V)+"15":WH,color:actif?(e.couleur||V):TM,fontSize:12,fontWeight:actif?700:400,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
                    <span>{e.emoji||"👦"}</span>
                    <span>{e.prenom}</span>
                    {actif&&isPremium&&<span style={{fontSize:9,opacity:0.8}}>✓ profil actif</span>}
                  </button>
                );
              })}
            </div>
            {enfantActif&&isPremium&&(()=>{
              const e=enfants.find(x=>x.id===enfantActif);
              if(!e||!e.profils?.length)return null;
              return <p style={{margin:"6px 0 0",fontSize:11,color:TM}}>Profils : {e.profils.map(p=>p.replace("_"," ")).join(", ")}</p>;
            })()}
          </div>
        )}

        {/* Generateurs */}
        <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"stretch"}}>
          <div style={{flex:1,background:WH,borderRadius:20,padding:"18px 14px 14px",border:BD,textAlign:"center",display:"flex",flexDirection:"column"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#F3EFFF",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🪄</div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Generer une activite</p>
            <p style={{margin:"0 0 14px",fontSize:11,color:TM,lineHeight:1.4,flex:1}}>Obtenez une idee adaptee a vos envies et a vos enfants</p>
            <button onClick={()=>setShowFiltres(true)} style={{width:"100%",padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer",position:"relative"}}>
              C est parti ✨
              {(lieu||energie||ageEnfant)&&<span style={{position:"absolute",top:-6,right:-6,background:"#F59E0B",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{[lieu,energie,ageEnfant].filter(Boolean).length}</span>}
            </button>
          </div>
          <div style={{flex:1,background:WH,borderRadius:20,padding:"18px 14px 14px",border:BD,textAlign:"center",display:"flex",flexDirection:"column"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#EDFAF3",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🗺️</div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Generer une sortie</p>
            <p style={{margin:"0 0 14px",fontSize:11,color:TM,lineHeight:1.4,flex:1}}>Trouvez la sortie parfaite pres de chez vous</p>
            <button onClick={()=>setShowFiltresSortie(true)} style={{width:"100%",padding:"11px 0",borderRadius:28,background:"#27AE60",border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>C est parti 🚀</button>
          </div>
        </div>

        {/* Idees du moment */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{fontSize:16,fontWeight:700,color:TX,margin:0}}>Idees du moment</p>

        </div>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8,marginBottom:20,scrollbarWidth:"none"}}>
          {ideesMoment.filter((item)=>{
            const cfg=ideesMomentConfig.find(c=>c.id===item.id);
            if(!cfg) return [SHOW_IDEE_ACTIVITES_CREATIVES,SHOW_IDEE_SORTIES_NATURE,SHOW_IDEE_EVENEMENTS][ideesMoment.indexOf(item)];
            if(!cfg.actif) return false;
            const prog=cfg.programmation;
            if(prog&&prog.date&&prog.heure&&prog.date.length===10&&prog.heure.length>=4){
              try{
                const [y,mo,d]=prog.date.split("-").map(Number);
                const [h,mi]=prog.heure.split(":").map(Number);
                const pubDate=new Date(y,mo-1,d,h,mi,0,0);
                const now=new Date();
                if(!isNaN(pubDate.getTime())&&pubDate>now) return false;
              }catch(e){}
            }
            return true;
          }).map((item,i,arr)=>{
            const cfg=ideesMomentConfig.find(c=>c.id===item.id);
            const displayItem=cfg?{...item,nom:cfg.label,label:cfg.label}:item;
            return(
            <div key={i} onClick={item.id==="activites"?()=>{setAdminActRandom(null);setShowAdminSheet(true);}:item.id==="nature"?()=>setShowNatureSheet(true):item.id==="evenements"?()=>setShowEvtAdminSheet(true):undefined}
              style={{minWidth:148,borderRadius:20,overflow:"hidden",position:"relative",flexShrink:0,cursor:"pointer",background:displayItem.gradient,boxShadow:"0 4px 16px rgba(0,0,0,0.13)"}}>
              {displayItem.admin&&<div style={{position:"absolute",top:8,left:8,background:"rgba(255,255,255,0.25)",backdropFilter:"blur(4px)",borderRadius:20,padding:"2px 8px",fontSize:9,color:WH,fontWeight:700,zIndex:2}}>⭐ Admin</div>}
              <div style={{height:90,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                {displayItem.illustration}
              </div>
              <div style={{padding:"0 11px 13px"}}>
                <p style={{margin:"0 0 2px",fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.5px",lineHeight:1.2}}>{cfg?.label||displayItem.label}</p>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:WH,lineHeight:1.3}}>{displayItem.nom}</p>
              </div>
            </div>
          );
          })}
        </div>

        {/* Banniere saisonniere — affichage controle par l'admin (Saisonnier) */}
        {evenementsSaisonniers.find(e=>e.id==="noel")?.actif&&(
          <div style={{background:"linear-gradient(135deg,#EDE9FF 60%,#d4ccf7 100%)",borderRadius:20,padding:"16px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12,border:BD}}>
            <span style={{fontSize:40,flexShrink:0}}>🎄</span>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:TX}}>Le Village du Lutin est ouvert !</p>
              <p style={{margin:0,fontSize:11,color:TM,lineHeight:1.4}}>Des activites magiques vous attendent jusqu au 24 decembre.</p>
            </div>
            <button onClick={()=>setShowLutinView(true)} style={{background:V,border:"none",borderRadius:28,color:WH,fontWeight:700,fontSize:12,padding:"9px 13px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>Decouvrir ✨</button>
          </div>
        )}

        {/* Bandeaux événements saisonniers personnalisés */}
        {activeBanners.map(evt=>{
          const verrouille=!!evt.premium&&!isPremium;
          return(
          <div key={evt.id} style={{background:`linear-gradient(135deg,${evt.couleur}dd,${evt.couleur}99)`,borderRadius:20,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12,boxShadow:`0 4px 16px ${evt.couleur}33`}}>
            <span style={{fontSize:36,flexShrink:0,filter:verrouille?"grayscale(0.4)":"none"}}>{verrouille?"🔒":evt.emoji}</span>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#fff"}}>{evt.nom}</p>
                {evt.premium&&<span style={{fontSize:9,background:"rgba(255,255,255,0.3)",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:700}}>👑</span>}
              </div>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.85)",lineHeight:1.4}}>{verrouille?"Réservé aux abonnés Premium":(evt.bannerTexte||"Découvrez nos activités spéciales !")}</p>
            </div>
            <button onClick={()=>{if(verrouille){onOpenPremium&&onOpenPremium();return;}setShowEvtBiblio(evt);}} style={{background:"rgba(255,255,255,0.25)",border:"none",borderRadius:28,color:"#fff",fontWeight:700,fontSize:11,padding:"8px 12px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",backdropFilter:"blur(4px)"}}>
              {verrouille?"Débloquer":"Découvrir ✨"}
            </button>
          </div>
          );
        })}

        {/* Widget événements à venir dans les 7 jours */}
        {(()=>{
          const now=new Date();
          const in7=new Date(now.getTime()+7*24*60*60*1000);
          const todayISO=now.toISOString().split("T")[0];
          const in7ISO=in7.toISOString().split("T")[0];
          const allEvts=[...evenementsSaisonniers.filter(e=>e.actif&&e.dateDebut&&e.dateDebut>=todayISO&&e.dateDebut<=in7ISO)];
          if(allEvts.length===0)return null;
          return(
            <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:16}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>📅 Cette semaine</p>
              {allEvts.slice(0,3).map((e,i)=>{
                const d=new Date(e.dateDebut);
                const jours=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
                const diff=Math.ceil((d-now)/(1000*60*60*24));
                return(
                  <div key={e.id||i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<Math.min(allEvts.length,3)-1?"1px solid rgba(108,92,231,0.07)":"none"}}>
                    <div style={{width:40,height:40,borderRadius:10,background:(e.couleur||V)+"22",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:8,fontWeight:700,color:e.couleur||V,textTransform:"uppercase"}}>{!isNaN(d.getTime())?jours[d.getDay()]:""}</span>
                      <span style={{fontSize:14,fontWeight:800,color:e.couleur||V}}>{!isNaN(d.getTime())?d.getDate():""}</span>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{margin:0,fontSize:13,fontWeight:600,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.emoji||"🎉"} {e.nom}</p>
                      <p style={{margin:0,fontSize:11,color:TM}}>{diff===0?"Aujourd'hui":diff===1?"Demain":`Dans ${diff} jours`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {showAdminSheet&&(()=>{
        const act=adminActRandom||ACTIVITE_ADMIN;
        return(
          <div onClick={()=>setShowAdminSheet(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)"}}>
              <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
              {!adminActRandom&&<div style={{background:VL,borderRadius:12,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>⭐</span>
                <p style={{margin:0,fontSize:12,color:V,fontWeight:600}}>{ACTIVITE_ADMIN.adminNote}</p>
              </div>}
              {adminActRandom&&<div style={{background:"#EDFAF3",borderRadius:12,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>🎲</span>
                <p style={{margin:0,fontSize:12,color:GR,fontWeight:600}}>Idee choisie aleatoirement pour vous !</p>
              </div>}
              <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                <span style={{fontSize:11,background:VL,color:V,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{act.categorie}</span>
                <span style={{fontSize:12,color:TM}}>{act.lieu==="interieur"?"🏠 Interieur":"🌳 Exterieur"}</span>
              </div>
              <p style={{margin:"0 0 4px",fontSize:19,fontWeight:800,color:TX}}>{act.nom}</p>
              <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>{act.age} · {act.energie==="fatigue"?"😴 Fatigues":"🚀 Motives"}</p>
              <p style={{margin:"0 0 14px",fontSize:13,color:TX,lineHeight:1.6}}>{act.desc}</p>
              <div style={{background:BG,borderRadius:12,padding:"10px 14px",marginBottom:16}}>
                <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:TX}}>🛒 Materiel</p>
                {(act.materiel||[]).map((m,i)=><p key={i} style={{margin:"2px 0",fontSize:12,color:TM}}>• {m}</p>)}
              </div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {act.tnd?.tsa!=null&&<span style={{fontSize:11,background:"#8B5CF618",color:"#8B5CF6",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #8B5CF640"}}>TSA {act.tnd.tsa}/5</span>}
                {act.tnd?.tdah!=null&&<span style={{fontSize:11,background:"#EC489918",color:"#EC4899",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #EC489940"}}>TDAH {act.tnd.tdah}/5</span>}
                {act.tnd?.dys!=null&&<span style={{fontSize:11,background:"#06B6D418",color:"#06B6D4",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #06B6D440"}}>DYS {act.tnd.dys}/5</span>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setAdminActRandom(toutesActivites[Math.floor(Math.random()*toutesActivites.length)])} style={{flex:1,padding:"12px 0",borderRadius:28,background:BG,border:"none",color:TX,fontWeight:600,fontSize:13,cursor:"pointer"}}>🔄 Une autre idée</button>
                <button onClick={()=>{setFavorisGuarded(prev=>{const exists=prev.find(f=>f.id===act.id&&f._type==="activite");if(exists)return prev;return[...prev,{...act,_type:"activite"}];});setShowAdminSheet(false);}} style={{flex:1,padding:"12px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>❤️ Sauvegarder</button>
              </div>
            </div>
          </div>
        );
      })()}

      {showNatureSheet&&(
        <div onClick={()=>setShowNatureSheet(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
            <div style={{background:"#EDFAF3",borderRadius:12,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>⭐</span>
              <p style={{margin:0,fontSize:12,color:GR,fontWeight:600}}>{SORTIE_NATURE_ADMIN.adminNote}</p>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
              <span style={{fontSize:11,background:"#EDFAF3",color:GR,padding:"3px 10px",borderRadius:20,fontWeight:600,border:"1px solid #6ee7b740"}}>{SORTIE_NATURE_ADMIN.type}</span>
              <span style={{fontSize:12,color:TM}}>🌳 Exterieur</span>
              <span style={{fontSize:12,color:TM}}>📍 {SORTIE_NATURE_ADMIN.ville}</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:19,fontWeight:800,color:TX}}>{SORTIE_NATURE_ADMIN.nom}</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>{SORTIE_NATURE_ADMIN.age} · {SORTIE_NATURE_ADMIN.prix} · Dept {SORTIE_NATURE_ADMIN.dept}</p>
            <p style={{margin:"0 0 14px",fontSize:13,color:TX,lineHeight:1.6}}>{SORTIE_NATURE_ADMIN.desc}</p>
            <div style={{background:BG,borderRadius:12,padding:"10px 14px",marginBottom:16}}>
              <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:TX}}>🎒 On emporte</p>
              {SORTIE_NATURE_ADMIN.materiel.map((m,i)=><p key={i} style={{margin:"2px 0",fontSize:12,color:TM}}>• {m}</p>)}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <span style={{fontSize:11,background:"#8B5CF618",color:"#8B5CF6",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #8B5CF640"}}>TSA {SORTIE_NATURE_ADMIN.tnd.tsa}/5</span>
              <span style={{fontSize:11,background:"#EC489918",color:"#EC4899",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #EC489940"}}>TDAH {SORTIE_NATURE_ADMIN.tnd.tdah}/5</span>
              <span style={{fontSize:11,background:"#06B6D418",color:"#06B6D4",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #06B6D440"}}>DYS {SORTIE_NATURE_ADMIN.tnd.dys}/5</span>
            </div>
            <button onClick={()=>{setFavorisGuarded(prev=>{const exists=prev.find(f=>f.id===SORTIE_NATURE_ADMIN.id&&f._type==="sortie");if(exists)return prev;return[...prev,{...SORTIE_NATURE_ADMIN,_type:"sortie"}];});setShowNatureSheet(false);}} style={{width:"100%",padding:"12px 0",borderRadius:28,background:GR,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>❤️ Sauvegarder</button>
          </div>
        </div>
      )}

      {showLutinSheet&&!lutinDetail&&(
        <div onClick={()=>setShowLutinSheet(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(180deg,#1a0a2e 0%,#2d1060 100%)",borderRadius:"24px 24px 0 0",padding:"0 0 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.4)",maxHeight:"88vh",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"20px 20px 0",flexShrink:0}}>
              <div style={{width:36,height:4,borderRadius:4,background:"rgba(255,255,255,0.2)",margin:"0 auto 18px"}}/>
              <div style={{textAlign:"center",marginBottom:16}}>
                <span style={{fontSize:36}}>🎄</span>
                <p style={{margin:"6px 0 2px",fontSize:20,fontWeight:800,color:WH}}>Village du Lutin</p>
                <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.6)"}}>24 bêtises du lutin du Père Noël</p>
              </div>
            </div>

            {lutinStep==="liste"&&(
              <>
                <div style={{padding:"0 20px 10px",flexShrink:0}}>
                  <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.45)",textAlign:"center"}}>Choisissez une bêtise à faire avec vos enfants 🎅</p>
                </div>
                <div style={{overflowY:"auto",padding:"0 16px",flex:1,scrollbarWidth:"none"}}>
                  <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:8}}>
                    {lutinFiltered.map(a=>(
                      <div key={a.jour} onClick={()=>setLutinDetail(a)} style={{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"13px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:"1px solid rgba(255,255,255,0.1)"}}>
                        <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <span style={{fontSize:22}}>{a.emoji}</span>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                            <span style={{fontSize:10,fontWeight:700,color:"#fbbf24",background:"rgba(251,191,36,0.15)",padding:"1px 7px",borderRadius:10}}>Jour {a.jour}</span>
                          </div>
                          <p style={{margin:0,fontSize:13,fontWeight:700,color:WH,lineHeight:1.3}}>{a.nom}</p>
                          <p style={{margin:"2px 0 0",fontSize:11,color:"rgba(255,255,255,0.5)",lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.desc}</p>
                        </div>
                        <span style={{color:"rgba(255,255,255,0.3)",fontSize:16,flexShrink:0}}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showLutinSheet&&lutinDetail&&(
        <div onClick={()=>setLutinDetail(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(180deg,#1a0a2e 0%,#2d1060 100%)",borderRadius:"24px 24px 0 0",padding:"24px 20px 40px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.4)"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"rgba(255,255,255,0.2)",margin:"0 auto 16px"}}/>
            <button onClick={()=>setLutinDetail(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"5px 14px",color:"rgba(255,255,255,0.7)",fontSize:12,cursor:"pointer",marginBottom:16}}>← Retour</button>
            <div style={{textAlign:"center",marginBottom:20}}>
              <span style={{fontSize:56}}>{lutinDetail.emoji}</span>
              <div style={{marginTop:8}}><span style={{fontSize:11,fontWeight:700,color:"#fbbf24",background:"rgba(251,191,36,0.2)",padding:"3px 12px",borderRadius:20}}>Jour {lutinDetail.jour}</span></div>
            </div>
            <p style={{margin:"0 0 12px",fontSize:22,fontWeight:800,color:WH,textAlign:"center",lineHeight:1.3}}>{lutinDetail.nom}</p>
            <p style={{margin:"0 0 16px",fontSize:14,color:"rgba(255,255,255,0.75)",textAlign:"center",lineHeight:1.7}}>{lutinDetail.desc}</p>
            {(lutinDetail.materiel||[]).length>0&&(
              <div style={{background:"rgba(255,255,255,0.07)",borderRadius:14,padding:"11px 14px",marginBottom:20}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>🛒 Matériel nécessaire</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(lutinDetail.materiel||[]).map((m,i)=>(
                    <span key={i} style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"rgba(251,191,36,0.15)",color:"#fbbf24",fontWeight:600,border:"1px solid rgba(251,191,36,0.3)"}}>{m}</span>
                  ))}
                </div>
              </div>
            )}
            {(lutinDetail.materiel||[]).length===0&&<div style={{marginBottom:20}}/>}
            <button onClick={()=>{setLutinDetail(null);setShowLutinSheet(false);}} style={{width:"100%",padding:"13px 0",borderRadius:28,background:"linear-gradient(135deg,#fbbf24,#f59e0b)",border:"none",color:"#1a0a2e",fontWeight:800,fontSize:14,cursor:"pointer"}}>🎄 On le fait !</button>
          </div>
        </div>
      )}

      {showEvtAdminSheet&&(
        <div onClick={()=>setShowEvtAdminSheet(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
            <div style={{background:"#FFF3E0",borderRadius:12,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>⭐</span>
              <p style={{margin:0,fontSize:12,color:OR,fontWeight:600}}>{EVT_ADMIN.adminNote}</p>
            </div>
            <div style={{background:OR,borderRadius:10,padding:"5px 14px",display:"inline-block",marginBottom:10}}>
              <span style={{fontSize:11,fontWeight:700,color:WH}}>{EVT_ADMIN.date.split("-").reverse().join("/")} · {EVT_ADMIN.ville}</span>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:11,background:"#FFF3E0",color:OR,padding:"3px 10px",borderRadius:20,fontWeight:600,border:"1px solid #fbbf2440"}}>🎪 {EVT_ADMIN.categorie.charAt(0).toUpperCase()+EVT_ADMIN.categorie.slice(1)}</span>
              <span style={{fontSize:11,background:"#D1FAE5",color:"#065F46",padding:"3px 10px",borderRadius:20,fontWeight:600}}>🆓 Gratuit</span>
              <span style={{fontSize:12,color:TM}}>👶 {EVT_ADMIN.age}</span>
            </div>
            <p style={{margin:"0 0 4px",fontSize:19,fontWeight:800,color:TX}}>{EVT_ADMIN.nom}</p>
            <p style={{margin:"0 0 14px",fontSize:12,color:TM}}>📍 {EVT_ADMIN.ville} · Dept {EVT_ADMIN.dept}</p>
            <p style={{margin:"0 0 16px",fontSize:13,color:TX,lineHeight:1.6}}>{EVT_ADMIN.desc}</p>
            <div style={{marginBottom:16}}>
              <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:TX}}>🧩 Infos accessibilité TND</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <div style={{background:"#D1FAE5",borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🔈</span><div><div style={{fontSize:10,color:TM}}>Son</div><div style={{fontSize:12,fontWeight:600,color:"#065F46"}}>Calme</div></div></div>
                <div style={{background:"#DBEAFE",borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>👥</span><div><div style={{fontSize:10,color:TM}}>Affluence</div><div style={{fontSize:12,fontWeight:600,color:"#1E3A5F"}}>Faible</div></div></div>
                <div style={{background:"#D1FAE5",borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🔮</span><div><div style={{fontSize:10,color:TM}}>Prévisibilité</div><div style={{fontSize:12,fontWeight:600,color:"#065F46"}}>Structurée</div></div></div>
                <div style={{background:"#F0FDF4",borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🌿</span><div><div style={{fontSize:10,color:TM}}>Zone calme</div><div style={{fontSize:12,fontWeight:600,color:"#374151"}}>Oui</div></div></div>
              </div>
            </div>
            <button onClick={()=>setShowEvtAdminSheet(false)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:OR,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>✅ Noté, on y va !</button>
          </div>
        </div>
      )}

      {/* Page bibliothèque événement */}
      {showEvtBiblio&&(
        <div style={{position:"fixed",inset:0,background:BG,zIndex:600,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
          {/* Header */}
          <div style={{background:`linear-gradient(135deg,${(showEvtBiblio.couleur||"#6C5CE7")}ee,${(showEvtBiblio.couleur||"#6C5CE7")}99)`,padding:"0 0 24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 16px 0"}}>
              <button onClick={()=>setShowEvtBiblio(null)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <div style={{width:36}}/>
            </div>
            <div style={{textAlign:"center",padding:"12px 20px 0"}}>
              <div style={{fontSize:52,marginBottom:8}}>{showEvtBiblio.emoji}</div>
              <p style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:"#fff"}}>{showEvtBiblio.nom}</p>
              <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.8)"}}>{(showEvtBiblio.bibliothequeActiv||[]).filter(a=>a.statut==="published").length} activités disponibles</p>
            </div>
          </div>
          {/* Contenu */}
          <div style={{padding:"20px 16px"}}>
            {(()=>{
              const activites=(showEvtBiblio.bibliothequeActiv||[]).filter(a=>a.statut==="published");
              const todayStr=new Date().toISOString().split("T")[0];
              const fichiersVisibles=(showEvtBiblio.fichiers||[]).filter(f=>
                (!f.dateDebut||f.dateDebut<=todayStr)&&(!f.dateFin||f.dateFin>=todayStr)
              );

              return(<>
                {/* Fichiers */}
                {fichiersVisibles.length>0&&(
                  <div style={{marginBottom:20}}>
                    <p style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 12px"}}>📎 Documents & Fichiers</p>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {fichiersVisibles.map((f,i)=>(
                        <div key={i} style={{background:WH,borderRadius:14,padding:"12px 14px",border:"1px solid rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 6px rgba(0,0,0,0.04)",cursor:"pointer"}}
                          onClick={()=>setShowFichier({...f,couleur:showEvtBiblio.couleur||"#6C5CE7"})}>
                          <div style={{width:42,height:42,borderRadius:10,background:f.type?.includes("pdf")?"#fee2e2":f.type?.includes("image")?"#dbeafe":"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                            {f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.nom}</p>
                            <p style={{margin:0,fontSize:11,color:TM}}>
                              {f.taille}
                              {f.dateDebut&&f.dateFin&&(()=>{const d=new Date(f.dateFin);return isNaN(d.getTime())?null:` · Visible jusqu'au ${d.toLocaleDateString("fr-FR")}`;})()}
                            </p>
                          </div>
                          <div style={{width:32,height:32,borderRadius:"50%",background:(showEvtBiblio.couleur||"#6C5CE7")+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <span style={{fontSize:14,color:(showEvtBiblio.couleur||"#6C5CE7")}}>↗</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Générateur lié */}
                {showEvtBiblio.generateur&&showEvtBiblio.generateurActif&&activites.length>0&&(
                  <EvtGenerateur evt={showEvtBiblio} activites={activites} favoris={favoris} setFavoris={setFavorisGuarded} isPremium={isPremium}/>
                )}

                {/* Bibliothèque */}
                {activites.length>0&&(
                  <p style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 12px"}}>📚 Toutes les activités</p>
                )}
                {activites.length===0&&fichiersVisibles.length===0?(
                  <div style={{textAlign:"center",padding:"48px 24px"}}>
                    <p style={{fontSize:36,margin:"0 0 12px"}}>{showEvtBiblio.emoji}</p>
                    <p style={{fontSize:15,fontWeight:600,color:TX,margin:"0 0 6px"}}>Aucune activité disponible</p>
                    <p style={{fontSize:13,color:TM}}>Les activités de cet événement arrivent bientôt !</p>
                  </div>
                ):activites.map(a=>(
                  <div key={a.id} style={{background:WH,borderRadius:16,padding:"14px 16px",border:"1px solid rgba(0,0,0,0.06)",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:11,background:(showEvtBiblio.couleur||"#6C5CE7")+"22",color:(showEvtBiblio.couleur||"#6C5CE7"),padding:"3px 10px",borderRadius:20,fontWeight:600}}>{a.categorie}</span>
                        {a.duree&&<span style={{fontSize:11,background:BG,color:TM,padding:"3px 10px",borderRadius:20}}>⏱ {a.duree}</span>}
                      </div>
                    </div>
                    <p style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:TX}}>{a.titre}</p>
                    {a.desc&&<p style={{margin:"0 0 8px",fontSize:13,color:TM,lineHeight:1.5}}>{a.desc}</p>}
                    {a.age&&<p style={{margin:"0 0 8px",fontSize:12,color:TM}}>👶 {a.age}</p>}
                    {a.materiel&&<div style={{background:BG,borderRadius:10,padding:"8px 12px",marginBottom:8}}><p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:TX}}>🛒 Matériel</p><p style={{margin:0,fontSize:12,color:TM}}>{a.materiel}</p></div>}
                    <button onClick={()=>setFavorisGuarded(prev=>{const exists=prev.find(f=>f.id===a.id&&f._type==="activite");if(exists)return prev;return[...prev,{...a,nom:a.titre,_type:"activite"}];})} style={{width:"100%",padding:"10px 0",borderRadius:28,background:favoris.some(f=>f.id===a.id&&f._type==="activite")?BG:showEvtBiblio.couleur,border:favoris.some(f=>f.id===a.id&&f._type==="activite")?`1.5px solid ${showEvtBiblio.couleur}`:"none",color:favoris.some(f=>f.id===a.id&&f._type==="activite")?showEvtBiblio.couleur:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      {favoris.some(f=>f.id===a.id&&f._type==="activite")?"❤️ Sauvegardé":"❤️ Sauvegarder"}
                    </button>
                  </div>
                ))}
              </>);
            })()}
          </div>
        </div>
      )}

      {showFichier&&<FichierViewer fichier={showFichier} couleur={showFichier.couleur||V} onClose={()=>setShowFichier(null)}/>}

      {/* Pop-up événement saisonnier */}
      {currentPopup&&(
        <div onClick={()=>setCurrentPopup(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:24,overflow:"hidden",width:"100%",maxWidth:340,boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{background:`linear-gradient(135deg,${currentPopup.couleur}dd,${currentPopup.couleur}99)`,padding:"32px 24px",textAlign:"center"}}>
              <div style={{fontSize:52,marginBottom:8}}>{currentPopup.emoji}</div>
              <p style={{margin:0,fontSize:20,fontWeight:800,color:"#fff"}}>{currentPopup.nom}</p>
            </div>
            <div style={{padding:"20px 24px 24px",textAlign:"center"}}>
              <p style={{margin:"0 0 20px",fontSize:14,color:TX,lineHeight:1.6}}>{currentPopup.popupTexte||"Découvrez nos activités spéciales pour cet événement !"}</p>
              <button onClick={()=>{setShowEvtBiblio(currentPopup);setCurrentPopup(null);}} style={{width:"100%",padding:"13px 0",borderRadius:28,background:(currentPopup.couleur||"#6C5CE7"),border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer"}}>Découvrir ✨</button>
              <button onClick={()=>setCurrentPopup(null)} style={{background:"none",border:"none",color:TM,fontSize:12,cursor:"pointer",marginTop:10,padding:"4px 0"}}>Plus tard</button>
            </div>
          </div>
        </div>
      )}

      {resultA&&<BottomSheet item={resultA} type="activite" onClose={()=>setResultA(null)} onFav={toggleFav} isFav={favoris.some(f=>f.id===resultA.id&&f._type==="activite")} onDone={onMarquerFait}/>}
      {resultA&&(
        <div style={{position:"fixed",bottom:82,left:"50%",transform:"translateX(-50%)",background:WH,borderRadius:28,padding:"8px 16px",boxShadow:"0 4px 20px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:12,zIndex:99,border:BD}}>
          <span style={{fontSize:12,color:TM,fontWeight:500}}>Cette idée ?</span>
          <button onClick={()=>{
            const newId=resultA.id||resultA.nom;
            setDislikedIds(prev=>{
              const next=new Set([...prev,newId]);
              // On passe le set à jour directement à genActivite via un re-render
              return next;
            });
            setTimeout(genActivite,0); // micro-delay pour que React ait appliqué le nouveau state
          }} style={{background:"#FEE2E2",border:"none",borderRadius:20,padding:"6px 14px",fontSize:14,cursor:"pointer"}} title="Pas pour moi">👎 Autre</button>
          <button onClick={()=>{onMarquerFait&&onMarquerFait(resultA);setResultA(null);}} style={{background:"#D1FAE5",border:"none",borderRadius:20,padding:"6px 14px",fontSize:14,cursor:"pointer"}} title="Parfait !">👍 Parfait</button>
        </div>
      )}
      {resultS&&<BottomSheet item={resultS} type="sortie" onClose={()=>setResultS(null)} onFav={toggleFav} isFav={favoris.some(f=>f.id===resultS.id&&f._type==="sortie")}/>}
      {resultsAList&&<ListePropositions items={resultsAList} type="activite" onChoisir={choisirDansListeA} onClose={()=>setResultsAList(null)} isPremium={isPremium} enfantActif={enfants.find(e=>e.id===enfantActif)||null}/>}
      {resultsSList&&<ListePropositions items={resultsSList} type="sortie" onChoisir={choisirDansListeS} onClose={()=>setResultsSList(null)} isPremium={isPremium} enfantActif={enfants.find(e=>e.id===enfantActif)||null}/>}

      {showFiltresSortie&&(
        <div onClick={()=>setShowFiltresSortie(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 20px"}}/>
            <p style={{margin:"0 0 20px",fontSize:18,fontWeight:800,color:TX,textAlign:"center"}}>Personnalisez votre sortie</p>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>📍 Département</p>
            <select value={deptS} onChange={e=>setDeptS(e.target.value)} style={{width:"100%",padding:"11px 14px",borderRadius:14,border:"1.5px solid rgba(108,92,231,0.2)",background:WH,fontSize:13,color:TX,marginBottom:20,fontFamily:"inherit"}}>
              <option value="">Tous les départements</option>
              {DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}
            </select>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>🎯 Type de sortie</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
              {[...TYPES_SORTIE,...customCatSorties.map(c=>c.label)].map(t=>(
                <button key={t} onClick={()=>setTypeS(typeS===t?"":t)} style={{padding:"7px 13px",borderRadius:20,border:"2px solid "+(typeS===t?V:"rgba(108,92,231,0.15)"),background:typeS===t?VL:BG,color:typeS===t?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{t}</button>
              ))}
            </div>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>👶 Âge des enfants</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
              {AGE_SORTIE.map(a=>(
                <button key={a} onClick={()=>setAgeS(ageS===a?null:a)} style={{padding:"8px 14px",borderRadius:20,border:"2px solid "+(ageS===a?V:"rgba(108,92,231,0.15)"),background:ageS===a?VL:BG,color:ageS===a?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{a}</button>
              ))}
            </div>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>🧩 Adapté TND</p>
            <div style={{display:"flex",gap:10,marginBottom:20}}>
              {TND_OPTIONS.map(o=>(
                <button key={o.val} onClick={()=>setTndS(tndS===o.val?null:o.val)} style={{flex:1,padding:"10px 0",borderRadius:14,border:"2px solid "+(tndS===o.val?o.color:"rgba(108,92,231,0.15)"),background:tndS===o.val?o.color+"18":BG,color:tndS===o.val?o.color:TX,fontWeight:700,fontSize:13,cursor:"pointer"}}>{o.label}</button>
              ))}
            </div>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>💶 Prix</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              {PRIX_OPTIONS.map(o=>(
                <button key={o.val} onClick={()=>setPrixS(prixS===o.val?null:o.val)} style={{padding:"8px 14px",borderRadius:20,border:"2px solid "+(prixS===o.val?"#27AE60":"rgba(108,92,231,0.15)"),background:prixS===o.val?"#EDFAF3":BG,color:prixS===o.val?"#27AE60":TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{o.label}</button>
              ))}
            </div>

            <button onClick={genSortie} style={{width:"100%",padding:"14px 0",borderRadius:28,background:"#27AE60",border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer"}}>🗺️ Générer une sortie</button>
            <button onClick={()=>{setDeptS("");setTypeS("");setAgeS(null);setTndS(null);setPrixS(null);}} style={{width:"100%",marginTop:10,padding:"10px 0",borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Réinitialiser les filtres</button>
          </div>
        </div>
      )}

      {showFiltres&&(
        <div onClick={()=>setShowFiltres(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
            <p style={{margin:"0 0 12px",fontSize:18,fontWeight:800,color:TX,textAlign:"center"}}>Personnalisez votre recherche</p>
            {/* Badge enfant actif */}
            {(()=>{
              const enfantCourant=enfants.find(e=>e.id===enfantActif);
              if(!enfantCourant)return null;
              const niveaux=enfantCourant.niveauxSensoriels||{};
              const alertes=[];
              if((niveaux.bruit||50)<35)alertes.push("🔇 Peu de bruit");
              if((niveaux.foule||50)<35)alertes.push("🚶 Peu de monde");
              if((niveaux.imprevu||50)<35)alertes.push("📋 Routine préférable");
              return(
                <div style={{background:VL,borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:22,flexShrink:0}}>{enfantCourant.emoji||"👦"}</span>
                  <div style={{flex:1}}>
                    <p style={{margin:0,fontSize:12,fontWeight:700,color:V}}>Filtres adaptés pour {enfantCourant.prenom||"votre enfant"}</p>
                    {alertes.length>0&&<p style={{margin:"2px 0 0",fontSize:11,color:TM}}>{alertes.join(" · ")}</p>}
                    {alertes.length===0&&isPremium&&<p style={{margin:"2px 0 0",fontSize:11,color:TM}}>Profil sensoriel équilibré ✓</p>}
                  </div>
                </div>
              );
            })()} 

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>📍 Lieu</p>
            <div style={{display:"flex",gap:10,marginBottom:20}}>
              {[{val:"interieur",label:"🏠 Intérieur"},{val:"exterieur",label:"🌳 Extérieur"}].map(o=>(
                <button key={o.val} onClick={()=>setLieu(lieu===o.val?null:o.val)} style={{flex:1,padding:"11px 0",borderRadius:14,border:"2px solid "+(lieu===o.val?V:"rgba(108,92,231,0.15)"),background:lieu===o.val?VL:BG,color:lieu===o.val?V:TX,fontWeight:600,fontSize:13,cursor:"pointer"}}>{o.label}</button>
              ))}
            </div>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>⚡ Votre motivation</p>
            <div style={{display:"flex",gap:10,marginBottom:20}}>
              {[{val:"fatigue",label:"😴 Fatigué"},{val:"motiv",label:"🚀 Motivé"}].map(o=>(
                <button key={o.val} onClick={()=>setEnergie(energie===o.val?null:o.val)} style={{flex:1,padding:"11px 0",borderRadius:14,border:"2px solid "+(energie===o.val?V:"rgba(108,92,231,0.15)"),background:energie===o.val?VL:BG,color:energie===o.val?V:TX,fontWeight:600,fontSize:13,cursor:"pointer"}}>{o.label}</button>
              ))}
            </div>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>👶 Âge des enfants</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              {AGE_OPTIONS.map(a=>(
                <button key={a} onClick={()=>setAgeEnfant(ageEnfant===a?null:a)} style={{padding:"8px 14px",borderRadius:20,border:"2px solid "+(ageEnfant===a?V:"rgba(108,92,231,0.15)"),background:ageEnfant===a?VL:BG,color:ageEnfant===a?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{a}</button>
              ))}
            </div>

            <button onClick={genActivite} style={{width:"100%",padding:"14px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer"}}>🪄 Générer une activité</button>
            <button onClick={()=>{setLieu(null);setEnergie(null);setAgeEnfant(null);}} style={{width:"100%",marginTop:10,padding:"10px 0",borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Réinitialiser les filtres</button>
          </div>
        </div>
      )}
      {/* Bouton SOS flottant */}
      {sosModeActif&&(
        <button onClick={()=>{if(!isPremium){onOpenPremium&&onOpenPremium();return;}setPage("planning");}} style={{position:"fixed",bottom:80,right:16,zIndex:400,width:52,height:52,borderRadius:"50%",background:isPremium?"linear-gradient(135deg,#dc2626,#ef4444)":"#9ca3af",border:"none",color:"#fff",fontSize:22,cursor:"pointer",boxShadow:"0 4px 16px rgba(239,68,68,0.45)",display:"flex",alignItems:"center",justifyContent:"center"}} title="Mode SOS">🆘</button>
      )}
    </div>
  );
}

function PagePlanning({sosLib=[],enfants=[],enfantActif,setEnfantActif,isPremium=false,onOpenPremium,sosModeActif=true,adminActivites=[],pendingContribs=[],deletedTitles=new Set()}){
  const [count,setCount]=useState(3);
  const [energieP,setEnergieP]=useState(null);
  const [lieuP,setLieuP]=useState(null);
  const [semaineType,setSemaineType]=useState(null); // null | "semaine" | "weekend"
  const [planning,setPlanning]=useState([]);
  const [showFiltresMat,setShowFiltresMat]=useState(false);
  const [materielDispo,setMaterielDispo]=useState([]);
  const [showSOS,setShowSOS]=useState(false);
  const [sosProfils,setSosProfils]=useState([]);
  const [sosCrise,setSosCrise]=useState(null);
  const [sosLieu,setSosLieu]=useState(null);
  const [sosTemps,setSosTemps]=useState(null);
  const [sosResults,setSosResults]=useState(null); // {main, alt}
  const [enfantsSelectionnes,setEnfantsSelectionnes]=useState(enfantActif?[enfantActif]:[]);
  const PROFIL_TO_TND={TSA:"tsa",TDAH:"tdah",DYS:"dys"};
  const tndKeysSelection=[...new Set(enfants.filter(e=>enfantsSelectionnes.includes(e.id)).flatMap(e=>e.profils||[]).map(p=>PROFIL_TO_TND[p]).filter(Boolean))];
  const scoreActivite=(a)=>tndKeysSelection.length===0?0:tndKeysSelection.reduce((s,k)=>s+(a.tnd?.[k]||0),0);
  const sosPublished=sosLib.filter(a=>a.statut==="published");
  const FALLBACK_ACTIVITIES=[
    {titre:"Respiration des bulles",desc:"Souffler lentement dans un tube imaginaire pour faire de grosses bulles. Focalise l'attention et régule la respiration.",duree:"1 min",tags:["Silencieux","Partout"],emoji:"🫧"},
    {titre:"Technique de la tortue",desc:"Se recroqueviller comme une tortue dans sa carapace, respirer 3 fois, puis ressortir. Technique validée pour les crises émotionnelles.",duree:"2 min",tags:["Partout","Tous profils"],emoji:"🐢"},
    {titre:"Squeeze imaginaire",desc:"Serrer et relâcher les poings 10 fois en imaginant presser une balle. Décharge l'énergie sans bouger.",duree:"1 min",tags:["Voiture OK","TDAH ✓"],emoji:"✊"},
  ];
  const toggleProfil=(p)=>setSosProfils(prev=>prev.includes(p)?prev.filter(k=>k!==p):[...prev,p]);
  const genSOS=()=>{
    let pool=[...sosPublished];
    // Filtre 1 — Profil
    if(sosProfils.length>0){
      const profMap={ordinaire:["profil_ordinaire"],tsa:["profil_tsa","profil_tsa_tdah"],tdah:["profil_tdah","profil_tsa_tdah"],dys:["profil_dys"],tsa_tdah:["profil_tsa_tdah"],bas_age:["profil_bas_age"]};
      const relevantKeys=sosProfils.flatMap(p=>profMap[p]||[]);
      const scored=pool.map(a=>({a,score:relevantKeys.filter(k=>a[k]).length})).sort((x,y)=>y.score-x.score);
      const best=scored.filter(x=>x.score>0).map(x=>x.a);
      if(best.length>0)pool=best;
    }
    // Filtre 2 — Type de crise
    if(sosCrise){
      const criseKey={sensorielle:"crise_sensorielle",emotionnelle:"crise_emotionnelle",agitation:"crise_agitation",concentration:"crise_concentration"}[sosCrise];
      if(criseKey){const m=pool.filter(a=>a[criseKey]);if(m.length>0)pool=m;}
    }
    // Filtre 3 — Lieu
    if(sosLieu&&sosLieu!=="all"){
      const lieuKey={maison:"lieu_maison",voiture:"lieu_voiture",ecole:"lieu_ecole",public:"lieu_public",dehors:"lieu_dehors"}[sosLieu];
      if(lieuKey){const m=pool.filter(a=>a[lieuKey]);if(m.length>0)pool=m;}
    }

    if(pool.length===0){setSosResults({main:null,alt:null,fallback:FALLBACK_ACTIVITIES});return;}
    const shuffle=[...pool].sort(()=>Math.random()-0.5);
    setSosResults({main:shuffle[0],alt:shuffle[1]||null,fallback:null});
  };
  const joursBase=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const joursSemaine=["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
  const joursWeekend=["Samedi","Dimanche"];
  const jours=semaineType==="semaine"?joursSemaine:semaineType==="weekend"?joursWeekend:joursBase;
  const blockedTitlesP=new Set(deletedTitles||[]);
  const approvedActsP=(pendingContribs||[]).filter(c=>c._type==="activite"&&c._statut==="published");
  const adminPubP=(adminActivites||[]).filter(a=>a.statut==="published").map(a=>({...a,nom:a.nom||a.titre,materiel:Array.isArray(a.materiel)?a.materiel:[]}));
  const toutesActivitesP=[...ACTIVITES,...adminPubP,...approvedActsP].filter(a=>!blockedTitlesP.has(a.nom)&&!blockedTitlesP.has(a.titre));
  const ALL_MATERIEL=[...new Set(toutesActivitesP.flatMap(a=>a.materiel||[]))].sort();
  const [sansMateriel,setSansMateriel]=useState(false);
  const toggleMat=(m)=>setMaterielDispo(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m]);
  const actMatOk=(a)=>{
    if(sansMateriel&&(a.materiel||[]).length>0)return false;
    return materielDispo.length===0||(a.materiel||[]).every(m=>materielDispo.includes(m));
  };
  const genPlanning=()=>{
    const pool=toutesActivitesP.filter(a=>(!energieP||a.energie===energieP)&&(!lieuP||a.lieu===lieuP)&&actMatOk(a));
    let source=pool.length?pool:toutesActivitesP;
    if(tndKeysSelection.length>0)source=[...source].sort((a,b)=>scoreActivite(b)-scoreActivite(a));
    const result=[];const used=new Set();
    for(let i=0;i<count;i++){
      const avail=source.filter(a=>!used.has(a.id));
      if(!avail.length)break;
      // Favorise les activités les mieux adaptées aux enfants sélectionnés, tout en gardant un peu d'aléatoire
      const shortlist=tndKeysSelection.length>0?avail.slice(0,Math.max(3,Math.ceil(avail.length*0.6))):avail;
      const pick=shortlist[Math.floor(Math.random()*shortlist.length)];
      used.add(pick.id);
      result.push({jour:jours[i%7],activite:pick});
    }
    setPlanning(result);
    setShowFiltresMat(false);
  };
  const remplacer=(i)=>{
    let pool=toutesActivitesP.filter(a=>(!energieP||a.energie===energieP)&&(!lieuP||a.lieu===lieuP)&&actMatOk(a)&&a.id!==planning[i].activite.id);
    if(!pool.length)return;
    if(tndKeysSelection.length>0)pool=[...pool].sort((a,b)=>scoreActivite(b)-scoreActivite(a));
    const shortlist=tndKeysSelection.length>0?pool.slice(0,Math.max(3,Math.ceil(pool.length*0.6))):pool;
    setPlanning(prev=>prev.map((p,idx)=>idx===i?{...p,activite:shortlist[Math.floor(Math.random()*shortlist.length)]}:p));
  };
  const allMateriel=[...new Set(planning.flatMap(p=>p.activite?.materiel||[]))];
  const [checkedMat,setCheckedMat]=useState({});
  const toggleChecked=(m)=>setCheckedMat(prev=>({...prev,[m]:!prev[m]}));

  // Sauvegarde / restauration du planning + liste de courses (stockage personnel persistant)
  const [saveToast,setSaveToast]=useState(null);
  const [isSaving,setIsSaving]=useState(false);
  useEffect(()=>{
    (async()=>{
      try{
        const res=await window.storage.get("planning_hebdo");
        if(res&&res.value){
          const data=JSON.parse(res.value);
          if(Array.isArray(data.planning)&&data.planning.length>0)setPlanning(data.planning.filter(p=>p&&p.activite&&p.jour));
          if(data.checkedMat)setCheckedMat(data.checkedMat);
          if(Array.isArray(data.enfantsSelectionnes))setEnfantsSelectionnes(data.enfantsSelectionnes);
        }
      }catch(e){
        // Pas encore de planning sauvegardé — rien à restaurer
      }
    })();
  },[]);
  const sauvegarderPlanning=async()=>{
    setIsSaving(true);
    try{
      await window.storage.set("planning_hebdo",JSON.stringify({planning,checkedMat,enfantsSelectionnes}));
      setSaveToast("💾 Planning et liste de courses sauvegardés !");
    }catch(e){
      setSaveToast("⚠️ La sauvegarde a échoué, réessayez.");
    }finally{
      setIsSaving(false);
      setTimeout(()=>setSaveToast(null),3000);
    }
  };

  // SOS full screen overlay
  if(!isPremium){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",textAlign:"center",fontFamily:"system-ui,-apple-system,sans-serif"}}>
        <div style={{fontSize:48,marginBottom:16}}>🔒</div>
        <p style={{margin:"0 0 8px",fontSize:16,fontWeight:700,color:TX}}>Fonctionnalité Premium</p>
        <p style={{margin:"0 0 24px",fontSize:13,color:TM,lineHeight:1.5}}>Le planning hebdomadaire et le mode SOS sont réservés aux membres Premium.</p>
        <button onClick={()=>onOpenPremium&&onOpenPremium()} style={{padding:"13px 28px",borderRadius:28,background:"#6C5CE7",border:"none",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>Débloquer avec Premium ⭐</button>
      </div>
    );
  }
  const FilterBtn=({active,onClick,children,color="#ef4444"})=>(<button onClick={onClick} style={{padding:"9px 14px",borderRadius:12,border:`2px solid ${active?color:"rgba(255,255,255,0.12)"}`,background:active?color+"22":"rgba(255,255,255,0.04)",color:active?color:"rgba(255,255,255,0.55)",fontSize:12,cursor:"pointer",fontWeight:active?700:400,transition:"all 0.15s",textAlign:"left"}}>{children}</button>);
  const ActivityCard=({act,isMain=false})=>(<div style={{background:isMain?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.04)",borderRadius:18,padding:"16px 16px",marginBottom:10,border:`1px solid ${isMain?"rgba(239,68,68,0.35)":"rgba(255,255,255,0.08)"}`}}>
    {isMain&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><div style={{width:6,height:6,borderRadius:"50%",background:"#ef4444"}}/><span style={{fontSize:10,color:"#fca5a5",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px"}}>Suggestion principale</span></div>}
    {!isMain&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><span style={{fontSize:10,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Alternative</span></div>}
    <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
      {act.duree&&<span style={{fontSize:10,background:"rgba(239,68,68,0.15)",color:"#fca5a5",padding:"2px 8px",borderRadius:10,fontWeight:600}}>⏱ {act.duree}</span>}
      {act.age&&<span style={{fontSize:10,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.5)",padding:"2px 8px",borderRadius:10}}>👶 {act.age}</span>}
      {act.tags&&act.tags.map((t,i)=><span key={i} style={{fontSize:10,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.4)",padding:"2px 8px",borderRadius:10}}>{t}</span>)}
    </div>
    <p style={{margin:"0 0 6px",fontSize:act.emoji?32:18,marginBottom:act.emoji?4:6}}>{act.emoji||""}</p>
    <p style={{margin:"0 0 6px",fontSize:16,fontWeight:700,color:"#fff"}}>{act.titre}</p>
    <p style={{margin:"0 0 8px",fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.5}}>{act.desc}</p>
    {Array.isArray(act.materiel)&&act.materiel.length>0&&<p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.35)"}}>Matériel : {act.materiel.join(", ")}</p>}
  </div>);
  if(showSOS) return(
    <div style={{background:"#0f0505",minHeight:"100vh",display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#7f1d1d,#dc2626)",padding:"16px 16px 20px",position:"relative"}}>
        <button onClick={()=>{setShowSOS(false);setSosResults(null);setSosProfils([]);setSosCrise(null);setSosLieu(null);setSosTemps(null);}} style={{position:"absolute",top:14,left:14,width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:4}}>🆘</div>
          <p style={{margin:"0 0 2px",fontSize:19,fontWeight:800,color:"#fff"}}>Mode SOS</p>
          <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.65)"}}>Activité adaptée en quelques secondes</p>
        </div>
      </div>
      <div style={{flex:1,padding:"16px 16px 24px",overflowY:"auto"}}>
        {!sosResults?(
          <div>
            {/* Filtre 1 — Profil */}
            <div style={{marginBottom:18}}>
              <p style={{fontSize:12,fontWeight:700,color:"#c4b5fd",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.5px"}}>🧩 Filtre 1 — Profil de l'enfant</p>
              <p style={{fontSize:10,color:"rgba(255,255,255,0.35)",margin:"0 0 10px"}}>Plusieurs profils possibles</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {[{v:"ordinaire",l:"😊 Profil ordinaire",c:"#10b981"},{v:"tsa",l:"🧩 TSA",c:"#a78bfa"},{v:"tdah",l:"⚡ TDAH",c:"#f472b6"},{v:"dys",l:"📖 DYS",c:"#67e8f9"},{v:"tsa_tdah",l:"🌀 TSA + TDAH",c:"#c084fc"},{v:"bas_age",l:"👶 Bas âge (- 4 ans)",c:"#fbbf24"}].map(p=>(
                  <button key={p.v} onClick={()=>toggleProfil(p.v)} style={{padding:"8px 14px",borderRadius:20,border:`2px solid ${sosProfils.includes(p.v)?p.c:"rgba(255,255,255,0.12)"}`,background:sosProfils.includes(p.v)?p.c+"22":"rgba(255,255,255,0.04)",color:sosProfils.includes(p.v)?p.c:"rgba(255,255,255,0.55)",fontSize:12,cursor:"pointer",fontWeight:sosProfils.includes(p.v)?700:400}}>{p.l}</button>
                ))}
              </div>
            </div>

            {/* Filtre 2 — Type de crise */}
            <div style={{marginBottom:18}}>
              <p style={{fontSize:12,fontWeight:700,color:"#fca5a5",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.5px"}}>😰 Filtre 2 — Type de crise</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[{v:"sensorielle",l:"🌊 Surcharge sensorielle",sub:"Trop de bruit, lumière, stimulations"},{v:"emotionnelle",l:"🌋 Crise émotionnelle",sub:"Colère, pleurs, frustration"},{v:"agitation",l:"🌪️ Agitation / hyperactivité",sub:"Impossible de rester en place"},{v:"concentration",l:"🌫️ Difficulté concentration",sub:"Dispersé, n'arrive pas à se poser"}].map(c=>(
                  <button key={c.v} onClick={()=>setSosCrise(sosCrise===c.v?null:c.v)} style={{padding:"10px 12px",borderRadius:14,border:`2px solid ${sosCrise===c.v?"#ef4444":"rgba(255,255,255,0.1)"}`,background:sosCrise===c.v?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.8)",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                    <p style={{margin:"0 0 2px",fontSize:12,fontWeight:sosCrise===c.v?700:500}}>{c.l}</p>
                    <p style={{margin:0,fontSize:10,color:"rgba(255,255,255,0.4)"}}>{c.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtre 3 — Lieu */}
            <div style={{marginBottom:18}}>
              <p style={{fontSize:12,fontWeight:700,color:"#6ee7b7",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.5px"}}>📍 Filtre 3 — Lieu</p>
              <p style={{fontSize:10,color:"rgba(255,255,255,0.35)",margin:"0 0 10px"}}>Le lieu filtre les activités faisables</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {[{v:"maison",l:"🏠 Maison"},{v:"voiture",l:"🚗 Voiture"},{v:"ecole",l:"🏫 École / extérieur"},{v:"public",l:"🛒 Lieu public"},{v:"dehors",l:"🌳 Dehors"}].map(o=>(
                  <button key={o.v} onClick={()=>setSosLieu(sosLieu===o.v?null:o.v)} style={{padding:"8px 14px",borderRadius:20,border:`2px solid ${sosLieu===o.v?"#6ee7b7":"rgba(255,255,255,0.12)"}`,background:sosLieu===o.v?"rgba(110,231,183,0.12)":"rgba(255,255,255,0.04)",color:sosLieu===o.v?"#6ee7b7":"rgba(255,255,255,0.55)",fontSize:12,cursor:"pointer",fontWeight:sosLieu===o.v?700:400}}>{o.l}</button>
                ))}
              </div>
            </div>

            <button onClick={genSOS} style={{width:"100%",padding:"16px 0",borderRadius:28,background:"linear-gradient(135deg,#dc2626,#ef4444)",border:"none",color:"#fff",fontWeight:800,fontSize:16,cursor:"pointer",boxShadow:"0 6px 20px rgba(239,68,68,0.4)"}}>
              🆘 Trouver une activité maintenant !
            </button>
          </div>
        ):(
          <div>
            {sosResults.fallback?(
              <div>
                <div style={{background:"rgba(239,68,68,0.08)",borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",gap:8}}><span>💡</span><p style={{margin:0,fontSize:12,color:"#fca5a5"}}>Aucune activité spécifique trouvée — voici 3 techniques universelles validées.</p></div>
                {sosResults.fallback.map((a,i)=><ActivityCard key={i} act={a} isMain={i===0}/>)}
              </div>
            ):(
              <div>
                {sosResults.main&&<ActivityCard act={sosResults.main} isMain={true}/>}
                {sosResults.alt&&<ActivityCard act={sosResults.alt} isMain={false}/>}
              </div>
            )}
            <div style={{display:"flex",gap:10,marginTop:4}}>
              <button onClick={genSOS} style={{flex:1,padding:"13px 0",borderRadius:28,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer"}}>🔄 Autre suggestion</button>
              <button onClick={()=>{setShowSOS(false);setSosResults(null);setSosProfils([]);setSosCrise(null);setSosLieu(null);setSosTemps(null);}} style={{flex:1,padding:"13px 0",borderRadius:28,background:"linear-gradient(135deg,#dc2626,#ef4444)",border:"none",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>✅ C'est parti !</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return(
    <div style={{padding:"20px 16px",background:BG,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <h1 style={{fontSize:20,fontWeight:600,color:TX,margin:0}}>Planning hebdo</h1>
          {enfants.length>0&&<EnfantMultiSelecteur enfants={enfants} selection={enfantsSelectionnes} setSelection={setEnfantsSelectionnes}/>}
        </div>
        {sosModeActif&&(
          <button onClick={()=>{if(!isPremium){onOpenPremium&&onOpenPremium();return;}setShowSOS(true);setSosResults(null);setSosProfils([]);setSosCrise(null);setSosLieu(null);setSosTemps(null);}} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 14px",borderRadius:28,background:isPremium?"linear-gradient(135deg,#dc2626,#ef4444)":"linear-gradient(135deg,#9ca3af,#6b7280)",border:"none",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:isPremium?"0 4px 12px rgba(239,68,68,0.35)":"none"}}>
            🆘 Mode SOS{!isPremium&&" ⭐"}
          </button>
        )}
      </div>
      <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
        {/* Filtre semaine / weekend */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{k:null,l:"📅 Toute la semaine"},{k:"semaine",l:"💼 Semaine"},{k:"weekend",l:"🌴 Weekend"}].map(({k,l})=>(
            <button key={String(k)} onClick={()=>{setSemaineType(k);if(k==="weekend")setCount(Math.min(count,2));}} style={{flex:1,padding:"7px 0",borderRadius:20,border:`2px solid ${semaineType===k?V:"rgba(108,92,231,0.15)"}`,background:semaineType===k?VL:BG,color:semaineType===k?V:TM,fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <span style={{fontSize:14,fontWeight:500,color:TX}}>Nombre de jours</span>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>setCount(Math.max(1,count-1))} style={{width:32,height:32,borderRadius:8,border:BD,background:WH,cursor:"pointer",fontSize:18,color:TX}}>-</button>
            <span style={{fontSize:18,fontWeight:600,color:V,minWidth:20,textAlign:"center"}}>{count}</span>
            <button onClick={()=>{const max=isPremium?7:3;if(count>=max&&!isPremium){onOpenPremium&&onOpenPremium();return;}setCount(Math.min(max,count+1));}} style={{width:32,height:32,borderRadius:8,border:BD,background:WH,cursor:"pointer",fontSize:18,color:TX}}>+</button>
            {!isPremium&&count>=3&&<span style={{fontSize:10,color:TM,background:VL,borderRadius:10,padding:"2px 8px",marginLeft:4}}>⭐ 7j</span>}
          </div>
        </div>
        {!isPremium&&<div style={{background:VL,borderRadius:10,padding:"8px 12px",marginBottom:12}}><p style={{fontSize:12,color:V,margin:0}}>⭐ Jusqu'à 7 jours avec Premium !</p></div>}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}><Chip val="fatigue" cur={energieP} set={setEnergieP} label="😴 Fatigué"/><Chip val="motiv" cur={energieP} set={setEnergieP} label="🚀 Motivé"/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}><Chip val="interieur" cur={lieuP} set={setLieuP} label="🏠 Intérieur"/><Chip val="exterieur" cur={lieuP} set={setLieuP} label="🌳 Extérieur"/></div>
        <button onClick={()=>setSansMateriel(p=>!p)} style={{width:"100%",marginBottom:10,padding:"11px 16px",borderRadius:12,background:WH,border:`1.5px solid ${sansMateriel?V:"rgba(108,92,231,0.15)"}`,color:sansMateriel?V:TM,fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span>✋ Sans matériel{sansMateriel?" (actif)":""}</span>
          <span style={{fontSize:11,background:sansMateriel?VL:"#F3F4F6",color:sansMateriel?V:TM,padding:"2px 10px",borderRadius:20}}>{sansMateriel?"ON":"OFF"}</span>
        </button>
        <button onClick={()=>setShowFiltresMat(true)} style={{width:"100%",marginBottom:10,padding:"11px 16px",borderRadius:12,background:WH,border:"1.5px solid "+(materielDispo.length>0?V:"rgba(108,92,231,0.15)"),color:materielDispo.length>0?V:TM,fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span>🛒 Matériel disponible{materielDispo.length>0?" ("+materielDispo.length+")":""}</span>
          <span style={{fontSize:16}}>›</span>
        </button>
        <button onClick={genPlanning} style={{width:"100%",padding:12,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>🪄 Générer le planning</button>
        {(energieP||lieuP||materielDispo.length>0||semaineType||sansMateriel)&&<button onClick={()=>{setEnergieP(null);setLieuP(null);setMaterielDispo([]);setSemaineType(null);setSansMateriel(false);}} style={{width:"100%",marginTop:8,padding:"9px 0",borderRadius:28,background:"none",border:"none",color:TM,fontSize:12,cursor:"pointer"}}>Réinitialiser les filtres</button>}
      </div>
      {planning.length>0&&(()=>{
        // Categorise materiel by rayon
        const RAYONS=[
          {label:"🎨 Créatif & Papeterie",color:"#8b5cf6",bg:"#ede9fe",keywords:["peinture","pinceau","feuille","papier","crayon","ciseaux","colle","marqueur","carton","dessin","feutre","gomme","taille","stylo","regle","compas","aquarelle","pastel","argile","pate"]},
          {label:"🍳 Cuisine & Épicerie",color:"#f97316",bg:"#fff7ed",keywords:["farine","oeuf","lait","beurre","sucre","sel","huile","levure","chocolat","vanille","citron","fruit","legume","pate","riz","noix","miel","creme","yaourt","fromage","tomate","carotte","oignon","ail","pomme"]},
          {label:"🌿 Nature & Extérieur",color:"#22c55e",bg:"#f0fdf4",keywords:["graine","terre","pot","arrosoir","pelle","râteau","seau","feuille","caillou","branche","fleur","plante","jardin","compost","filet"]},
          {label:"🏗️ Construction & Jeu",color:"#f59e0b",bg:"#fffbeb",keywords:["lego","duplo","puzzle","brique","kapla","bloc","cube","jeu","carte","de","pion","figurine","magnetique","aimant"]},
          {label:"🎵 Musique & Sons",color:"#ec4899",bg:"#fdf2f8",keywords:["instrument","tambour","flute","maracas","xylophone","casserole","baton","cloche","musique","son"]},
          {label:"🧴 Matériaux & Récup",color:"#06b6d4",bg:"#ecfeff",keywords:["carton","tube","bouteille","boite","bouchon","tissu","fil","laine","aiguille","coton","ruban","ficelle","papier journal","magazine","journal","aluminium","scotch","elastique"]},
          {label:"🛁 Eau & Sensoriel",color:"#3b82f6",bg:"#eff6ff",keywords:["eau","bain","sable","bac","bassine","seau","moule","serviette","eponge","savon","bulle"]},
        ];
        const getRayon=(item)=>{
          const lower=item.toLowerCase();
          for(const r of RAYONS){if(r.keywords.some(k=>lower.includes(k)))return r;}
          return {label:"📦 Divers",color:"#6b7280",bg:"#f9fafb",keywords:[]};
        };
        const grouped=allMateriel.reduce((acc,m)=>{
          const r=getRayon(m);
          if(!acc[r.label])acc[r.label]={...r,items:[]};
          acc[r.label].items.push(m);
          return acc;
        },{});
        const totalItems=allMateriel.length;
        const checkedCount=Object.values(checkedMat).filter(Boolean).length;
        const pct=totalItems>0?Math.round(checkedCount/totalItems*100):0;
        return(<>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
            {planning.map((p,i)=>(<div key={i} style={{background:WH,borderRadius:14,padding:"12px 14px",border:BD,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{flex:1,minWidth:0}}><span style={{fontSize:11,color:TM}}>{p.jour}</span><p style={{margin:"2px 0 0",fontSize:14,fontWeight:500,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.activite?.nom||""}</p></div><div style={{display:"flex",gap:6,marginLeft:8}}><button onClick={()=>remplacer(i)} style={{background:BG2,border:BD,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:16}} title="Remplacer">🔄</button></div></div>))}
          </div>
          {/* Boutons d'action */}
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <button onClick={sauvegarderPlanning} disabled={isSaving} style={{flex:2,padding:12,borderRadius:12,background:WH,border:"2px solid "+V,color:V,fontWeight:600,fontSize:13,cursor:isSaving?"default":"pointer",opacity:isSaving?0.7:1}}>
              {isSaving?"⏳":"💾"} {isSaving?"Sauvegarde...":"Sauvegarder"}
            </button>
            <button onClick={()=>{
              const texte="📅 Mon planning Parent'Hèse\n\n"+planning.map(p=>`${p.jour} : ${p.activite?.nom||""}`).join("\n")+"\n\nGénéré avec Parent'Hèse 🧩";
              if(navigator.share){navigator.share({title:"Mon planning",text:texte}).catch(()=>{});}
              else if(navigator.clipboard){navigator.clipboard.writeText(texte).then(()=>setSaveToast("📋 Planning copié !")).catch(()=>{});}
            }} style={{flex:1,padding:12,borderRadius:12,background:WH,border:"2px solid #10B981",color:"#10B981",fontWeight:600,fontSize:13,cursor:"pointer"}}>
              📤 Partager
            </button>
            <button onClick={()=>{
              const win=window.open("","_blank");
              if(!win)return;
              const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Planning Parent'Hèse</title><style>body{font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#2C2A3E}h1{color:#6C5CE7;font-size:22px;margin-bottom:4px}.subtitle{color:#7A7690;font-size:13px;margin-bottom:20px}.day{display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #EDE9FF}.day-name{font-weight:700;color:#6C5CE7;width:80px;flex-shrink:0}.act-name{font-size:15px}.courses{margin-top:24px;background:#F8FAFC;border-radius:12px;padding:16px}.courses h2{color:#6C5CE7;font-size:16px;margin:0 0 12px}.item{padding:4px 0;font-size:14px}@media print{body{margin:0}}</style></head><body><h1>📅 Mon Planning Parent'Hèse</h1><p class="subtitle">Généré le ${new Date().toLocaleDateString("fr-FR")}</p>${planning.map(p=>`<div class="day"><span class="day-name">${p.jour}</span><span class="act-name">${p.activite.nom||""}</span></div>`).join("")}${allMateriel.length>0?`<div class="courses"><h2>🛒 Liste de courses</h2>${allMateriel.map(m=>`<div class="item">☐ ${m}</div>`).join("")}</div>`:""}</body></html>`;
              win.document.write(html);
              win.document.close();
              win.print();
            }} style={{flex:1,padding:12,borderRadius:12,background:WH,border:"2px solid #6C5CE7",color:"#6C5CE7",fontWeight:600,fontSize:13,cursor:"pointer"}}>
              🖨️ Imprimer
            </button>
          </div>
          {allMateriel.length>0&&(
            <div style={{background:WH,borderRadius:20,border:BD,overflow:"hidden",marginBottom:8}}>
              {/* Header drive */}
              <div style={{background:"linear-gradient(135deg,#6C5CE7,#a78bfa)",padding:"16px 16px 14px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛒</div>
                    <div>
                      <p style={{margin:0,fontSize:15,fontWeight:800,color:"#fff"}}>Ma liste de courses</p>
                      <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.7)"}}>{totalItems} article{totalItems>1?"s":""} · {Object.keys(grouped).length} rayon{Object.keys(grouped).length>1?"s":""}</p>
                    </div>
                  </div>
                  <span style={{fontSize:18,fontWeight:800,color:"#fff"}}>{pct}%</span>
                </div>
                {/* Barre de progression */}
                <div style={{background:"rgba(255,255,255,0.2)",borderRadius:4,height:6,overflow:"hidden"}}>
                  <div style={{width:pct+"%",height:"100%",background:"#fff",borderRadius:4,transition:"width 0.4s"}}/>
                </div>
                {checkedCount>0&&<p style={{margin:"6px 0 0",fontSize:11,color:"rgba(255,255,255,0.75)"}}>{checkedCount}/{totalItems} cochés — {totalItems-checkedCount} restant{totalItems-checkedCount>1?"s":""}</p>}
              </div>

              {/* Rayons */}
              <div style={{padding:"8px 0"}}>
                {Object.values(grouped).map((rayon,ri)=>{
                  const allChecked=rayon.items.every(m=>checkedMat[m]);
                  const someChecked=rayon.items.some(m=>checkedMat[m]);
                  return(
                    <div key={ri}>
                      {/* Header rayon */}
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px 6px",borderTop:ri>0?`1px solid rgba(0,0,0,0.05)`:"none"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:rayon.color}}/>
                          <span style={{fontSize:12,fontWeight:700,color:"#374151"}}>{rayon.label}</span>
                          <span style={{fontSize:10,background:rayon.bg,color:rayon.color,padding:"1px 7px",borderRadius:8,fontWeight:600}}>{rayon.items.filter(m=>!checkedMat[m]).length} restant{rayon.items.filter(m=>!checkedMat[m]).length>1?"s":""}</span>
                        </div>
                        {someChecked&&!allChecked&&<span style={{fontSize:10,color:"#9ca3af"}}>{rayon.items.filter(m=>checkedMat[m]).length}/{rayon.items.length}</span>}
                        {allChecked&&<span style={{fontSize:11,color:"#22c55e",fontWeight:600}}>✓ Complet</span>}
                      </div>
                      {/* Items du rayon */}
                      {rayon.items.map((m,ii)=>{
                        const checked=!!checkedMat[m];
                        return(
                          <div key={ii} onClick={()=>toggleChecked(m)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 16px",background:checked?"rgba(34,197,94,0.04)":"transparent",cursor:"pointer",transition:"background 0.15s"}}>
                            <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked?"#22c55e":rayon.color+"55"}`,background:checked?"#22c55e":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                              {checked&&<span style={{fontSize:12,color:"#fff",lineHeight:1}}>✓</span>}
                            </div>
                            <span style={{flex:1,fontSize:13,color:checked?"#9ca3af":"#1f2937",textDecoration:checked?"line-through":"none",transition:"all 0.15s"}}>{m}</span>
                            {!checked&&<a href={"https://www.amazon.fr/s?k="+encodeURIComponent(m)} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:11,color:V,textDecoration:"none",background:VL,padding:"3px 9px",borderRadius:9,flexShrink:0}}>Amazon</a>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              {checkedCount===totalItems&&totalItems>0?(
                <div style={{margin:"0 16px 14px",background:"#f0fdf4",borderRadius:12,padding:"10px 14px",textAlign:"center",border:"1px solid #bbf7d0"}}>
                  <span style={{fontSize:13,color:"#16a34a",fontWeight:700}}>🎉 Tout est prêt ! Bonne activité !</span>
                </div>
              ):(
                <div style={{padding:"10px 16px 14px",display:"flex",gap:8}}>
                  <button onClick={()=>allMateriel.forEach(m=>setCheckedMat(p=>({...p,[m]:true})))} style={{flex:1,padding:"9px 0",borderRadius:20,background:BG2,border:`1px solid rgba(108,92,231,0.15)`,color:V,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                    ✓ Tout cocher
                  </button>
                  <button onClick={()=>setCheckedMat({})} style={{flex:1,padding:"9px 0",borderRadius:20,background:BG2,border:`1px solid rgba(108,92,231,0.15)`,color:"#6b7280",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                    ↺ Réinitialiser
                  </button>
                </div>
              )}
            </div>
          )}
        </>);
      })()}

      {showFiltresMat&&(
        <div onClick={()=>setShowFiltresMat(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",maxHeight:"85vh",display:"flex",flexDirection:"column"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px",flexShrink:0}}/>
            <p style={{margin:"0 0 4px",fontSize:18,fontWeight:800,color:TX,textAlign:"center",flexShrink:0}}>🛒 Matériel disponible</p>
            <p style={{margin:"0 0 16px",fontSize:13,color:TM,textAlign:"center",flexShrink:0}}>Cochez ce que vous avez à la maison</p>
            <div style={{overflowY:"auto",flex:1,marginBottom:16}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {ALL_MATERIEL.map(m=>{
                  const on=materielDispo.includes(m);
                  return(
                    <button key={m} onClick={()=>toggleMat(m)} style={{padding:"8px 14px",borderRadius:20,border:"2px solid "+(on?V:"rgba(108,92,231,0.15)"),background:on?VL:BG,color:on?V:TX,fontWeight:600,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                      {on&&<span style={{fontSize:10}}>✓</span>}{m}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>setMaterielDispo([])} style={{flex:1,padding:"11px 0",borderRadius:28,background:WH,border:"1.5px solid rgba(108,92,231,0.15)",color:TM,fontWeight:600,fontSize:13,cursor:"pointer"}}>Tout effacer</button>
              <button onClick={genPlanning} style={{flex:2,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>🪄 Générer</button>
            </div>
          </div>
        </div>
      )}
      {saveToast&&<Toast msg={saveToast}/>}
    </div>
  );
}

function PageFavoris({favoris,setFavoris,isPremium=false,onBack}){
  const LIMITE=10;
  const [tab,setTab]=useState("tous");
  const [search,setSearch]=useState("");
  const [sortMode,setSortMode]=useState("recent"); // "recent" | "alpha"
  const [tagModal,setTagModal]=useState(null); // item to tag
  const [newTag,setNewTag]=useState("");

  const TAGS_PRESET=["À faire ce weekend","Coup de cœur","Activité calme","Plein air","Rapide","À retester"];

  const retirer=(item)=>setFavoris(prev=>prev.filter(f=>!(f.id===item.id&&f._type===item._type)));
  const toggleTag=(item,tag)=>setFavoris(prev=>prev.map(f=>{
    if(!(f.id===item.id&&f._type===item._type))return f;
    const tags=f._tags||[];
    return{...f,_tags:tags.includes(tag)?tags.filter(t=>t!==tag):[...tags,tag]};
  }));
  const addCustomTag=(item)=>{
    if(!newTag.trim())return;
    toggleTag(item,newTag.trim());
    setNewTag("");
  };

  const allTags=[...new Set(favoris.flatMap(f=>f._tags||[]))];
  const badgeDe=(item)=>item._type==="activite"?(item.categorie||""):item._type==="sortie"?(item.type||item.categorie||""):(item.categorie||"");
  const sousTitreDe=(item)=>item._type==="activite"?(item.age||""):item._type==="sortie"?[item.ville,item.prix].filter(Boolean).join(" - "):[item.ville,item.prix].filter(Boolean).join(" - ");
  const typeIcon=(t)=>t==="activite"?"🎨":t==="sortie"?"🗺️":"📅";

  const filtered=favoris
    .filter(f=>{
      if(tab==="activites")return f._type==="activite";
      if(tab==="sorties")return f._type==="sortie";
      if(tab==="evenements")return f._type==="evenement";
      if(tab.startsWith("tag:"))return(f._tags||[]).includes(tab.slice(4));
      return true;
    })
    .filter(f=>{
      if(!search)return true;
      const q=search.toLowerCase();
      return(f.nom||f.titre||"").toLowerCase().includes(q)||(f._tags||[]).some(t=>t.toLowerCase().includes(q));
    })
    .sort((a,b)=>sortMode==="alpha"?(a.nom||"").localeCompare(b.nom||""):0);

  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      {/* Header */}
      <div style={{background:WH,padding:"16px 16px 0",borderBottom:BD}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          {onBack&&<button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TX,padding:0}}>←</button>}
          <h1 style={{fontSize:20,fontWeight:800,color:TX,margin:0,flex:1}}>❤️ Mes favoris</h1>
          <button onClick={()=>setSortMode(p=>p==="recent"?"alpha":"recent")} style={{background:VL,border:"none",borderRadius:20,padding:"5px 12px",fontSize:12,color:V,cursor:"pointer",fontWeight:600}}>
            {sortMode==="recent"?"🕐 Récents":"🔤 A-Z"}
          </button>
        </div>
        {/* Barre de recherche */}
        <div style={{position:"relative",marginBottom:12}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:TM}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher dans mes favoris..." style={{width:"100%",padding:"10px 12px 10px 36px",borderRadius:12,border:BD,fontSize:13,background:BG,boxSizing:"border-box",outline:"none"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:16,cursor:"pointer",color:TM}}>×</button>}
        </div>
        {/* Compteur + barre */}
        {!isPremium&&(
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,color:TM}}>{favoris.length}/{LIMITE} favoris</span>
              {favoris.length>=LIMITE&&<span style={{fontSize:11,color:V,fontWeight:600}}>⭐ Passez Premium</span>}
            </div>
            <div style={{width:"100%",background:"#F3F4F6",borderRadius:10,height:4,overflow:"hidden"}}>
              <div style={{width:(Math.min(favoris.length/LIMITE,1)*100)+"%",background:favoris.length>=LIMITE?RD:V,height:"100%",borderRadius:10,transition:"width 0.3s"}}/>
            </div>
          </div>
        )}
        {/* Onglets */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12,scrollbarWidth:"none"}}>
          {[
            {k:"tous",l:`Tous (${favoris.length})`},
            {k:"activites",l:`🎨 ${favoris.filter(f=>f._type==="activite").length}`},
            {k:"sorties",l:`🗺️ ${favoris.filter(f=>f._type==="sortie").length}`},
            {k:"evenements",l:`📅 ${favoris.filter(f=>f._type==="evenement").length}`},
            ...allTags.map(t=>({k:"tag:"+t,l:`🏷️ ${t}`})),
          ].map(({k,l})=>(
            <button key={k} onClick={()=>setTab(k)} style={{flexShrink:0,padding:"6px 14px",borderRadius:20,border:`2px solid ${tab===k?V:"rgba(108,92,231,0.15)"}`,background:tab===k?V:WH,color:tab===k?WH:TM,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div style={{padding:"16px 16px 0"}}>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 0",color:TM}}>
            <p style={{fontSize:40,margin:"0 0 12px"}}>{search?"🔍":"🤍"}</p>
            <p style={{fontSize:15,fontWeight:600,color:TX,margin:"0 0 6px"}}>{search?"Aucun résultat":"Aucun favori ici"}</p>
            <p style={{fontSize:13,color:TM}}>{search?"Essayez un autre mot-clé":"Explorez la bibliothèque pour en ajouter !"}</p>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map((item,i)=>(
              <div key={i} style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:14}}>{typeIcon(item._type)}</span>
                      <span style={{fontSize:11,background:VL,color:V,padding:"2px 8px",borderRadius:10,fontWeight:600}}>{badgeDe(item)}</span>
                      {(item._tags||[]).map(t=>(
                        <span key={t} style={{fontSize:10,background:"#FEF3C7",color:"#92400E",padding:"2px 8px",borderRadius:10,fontWeight:600}}>🏷️ {t}</span>
                      ))}
                    </div>
                    <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.nom||item.titre||""}</p>
                    <p style={{margin:0,fontSize:12,color:TM}}>{sousTitreDe(item)}</p>
                  </div>
                  <div style={{display:"flex",gap:6,marginLeft:10,flexShrink:0}}>
                    <button onClick={()=>setTagModal(item)} style={{background:VL,border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🏷️</button>
                    <button onClick={()=>retirer(item)} style={{background:"#FEE2E2",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal tags */}
      {tagModal&&(
        <div onClick={()=>setTagModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"20px 20px 0 0",padding:"20px 20px 36px",width:"100%",maxWidth:390,maxHeight:"70vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
            <p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX}}>🏷️ Tags — {tagModal.nom||tagModal.titre||""}</p>
            <p style={{margin:"0 0 16px",fontSize:12,color:TM}}>Organisez vos favoris avec des étiquettes personnalisées</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {TAGS_PRESET.map(t=>{
                const active=(tagModal._tags||[]).includes(t);
                return <button key={t} onClick={()=>{toggleTag(tagModal,t);setTagModal(prev=>({...prev,_tags:prev._tags?.includes(t)?prev._tags.filter(x=>x!==t):[...(prev._tags||[]),t]}));}} style={{padding:"6px 14px",borderRadius:20,border:`2px solid ${active?V:"rgba(108,92,231,0.2)"}`,background:active?VL:WH,color:active?V:TM,fontSize:12,fontWeight:600,cursor:"pointer"}}>{active?"✓ ":""}{t}</button>;
              })}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={newTag} onChange={e=>setNewTag(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustomTag(tagModal)} placeholder="Nouveau tag..." style={{flex:1,padding:"10px 14px",borderRadius:12,border:BD,fontSize:13,outline:"none"}}/>
              <button onClick={()=>addCustomTag(tagModal)} style={{padding:"10px 16px",borderRadius:12,background:V,border:"none",color:WH,fontSize:13,fontWeight:700,cursor:"pointer"}}>+</button>
            </div>
            <button onClick={()=>setTagModal(null)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BADGES / ACHIEVEMENTS ───────────────────────────────────────────────────
const BADGES_DEF=[
  {id:"first_gen",emoji:"🪄",titre:"Première idée",desc:"Générez votre première activité",cond:(s)=>s.historique>=1},
  {id:"streak3",emoji:"🔥",titre:"3 jours de suite",desc:"Utilisez l'app 3 jours consécutifs",cond:(s)=>s.streak>=3},
  {id:"explorer",emoji:"🗺️",titre:"Explorateur",desc:"Sauvegardez votre première sortie en favori",cond:(s)=>s.favSorties>=1},
  {id:"family5",emoji:"👨‍👩‍👧‍👦",titre:"Grande famille",desc:"Ajoutez 2 profils enfants",cond:(s)=>s.enfants>=2},
  {id:"tnd_pro",emoji:"🧩",titre:"Expert TND",desc:"Renseignez le carnet sensoriel d'un enfant",cond:(s)=>s.carnetSensoriel},
  {id:"history10",emoji:"📊",titre:"Régulier",desc:"Réalisez 10 activités",cond:(s)=>s.historique>=10},
  {id:"history30",emoji:"🏆",titre:"Champion",desc:"Réalisez 30 activités",cond:(s)=>s.historique>=30},
  {id:"reviewer",emoji:"⭐",titre:"Critique",desc:"Laissez un premier avis",cond:(s)=>s.avis>=1},
  {id:"premium",emoji:"👑",titre:"Parent Premium",desc:"Passez à l'abonnement Premium",cond:(s)=>s.isPremium},
  {id:"contributor",emoji:"🤝",titre:"Contributeur",desc:"Proposez une activité à la communauté",cond:(s)=>s.contributions>=1},
  {id:"planner",emoji:"📅",titre:"Planificateur",desc:"Sauvegardez votre premier planning",cond:(s)=>s.plannings>=1},
  {id:"favorites5",emoji:"❤️",titre:"Collectionneur",desc:"Sauvegardez 5 favoris",cond:(s)=>s.favTotal>=5},
];

function PageBadges({stats={},onBack}){
  const obtained=BADGES_DEF.filter(b=>b.cond(stats));
  const pending=BADGES_DEF.filter(b=>!b.cond(stats));
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      <div style={{background:WH,padding:"16px 16px 12px",borderBottom:BD,marginBottom:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TX,padding:0}}>←</button>
          <h1 style={{fontSize:20,fontWeight:800,color:TX,margin:0,flex:1}}>🏅 Mes badges</h1>
        </div>
        <p style={{margin:0,fontSize:13,color:TM}}>{obtained.length}/{BADGES_DEF.length} badges obtenus</p>
        <div style={{background:"#F3F4F6",borderRadius:10,height:6,overflow:"hidden",marginTop:10}}>
          <div style={{width:(obtained.length/BADGES_DEF.length*100)+"%",height:"100%",background:"linear-gradient(90deg,#F59E0B,#F97316)",borderRadius:10,transition:"width 0.5s"}}/>
        </div>
      </div>
      <div style={{padding:"16px"}}>
        {obtained.length>0&&(
          <>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:TM,textTransform:"uppercase",letterSpacing:"0.05em"}}>✅ Obtenus ({obtained.length})</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
              {obtained.map(b=>(
                <div key={b.id} style={{background:WH,borderRadius:14,padding:"14px 12px",border:"2px solid #F59E0B",textAlign:"center",boxShadow:"0 2px 8px rgba(245,158,11,0.15)"}}>
                  <div style={{fontSize:36,marginBottom:6}}>{b.emoji}</div>
                  <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:TX}}>{b.titre}</p>
                  <p style={{margin:0,fontSize:10,color:TM,lineHeight:1.3}}>{b.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {pending.length>0&&(
          <>
            <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:TM,textTransform:"uppercase",letterSpacing:"0.05em"}}>🔒 À débloquer ({pending.length})</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {pending.map(b=>(
                <div key={b.id} style={{background:WH,borderRadius:14,padding:"14px 12px",border:BD,textAlign:"center",opacity:0.6}}>
                  <div style={{fontSize:36,marginBottom:6,filter:"grayscale(1)"}}>{b.emoji}</div>
                  <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:TX}}>{b.titre}</p>
                  <p style={{margin:0,fontSize:10,color:TM,lineHeight:1.3}}>{b.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PAGE HISTORIQUE ─────────────────────────────────────────────────────────
function PageHistorique({historique=[],onBack,onClear}){
  const [search,setSearch]=useState("");
  const [filterCat,setFilterCat]=useState("");
  const categories=[...new Set(historique.map(h=>h.categorie||"Autre").filter(Boolean))].sort();

  const filtered=historique.filter(h=>{
    if(filterCat&&(h.categorie||"Autre")!==filterCat)return false;
    if(search&&!(h.nom||"").toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const parMois=filtered.reduce((acc,h)=>{
    const key=h.date?h.date.slice(0,7):"";
    const label=key?(()=>{const p=key.split("-");return(MOIS[parseInt(p[1])]||"")+` ${p[0]}`;})():"Date inconnue";
    if(!acc[label])acc[label]=[];
    acc[label].push(h);
    return acc;
  },{});

  const exportTxt=()=>{
    const txt="📊 Historique Parent'Hèse\n\n"+Object.entries(parMois).map(([mois,items])=>`${mois}\n${items.map(h=>`  • ${h.nom}${h.categorie?" ("+h.categorie+")":""}${h.date?" — "+new Date(h.date).toLocaleDateString("fr-FR"):""}`).join("\n")}`).join("\n\n");
    if(navigator.share)navigator.share({title:"Mon historique",text:txt}).catch(()=>{});
    else if(navigator.clipboard)navigator.clipboard.writeText(txt).catch(()=>{});
  };
  const exportCSV=()=>{
    try{
      const rows=["Date,Activité,Catégorie,Note",...historique.map(h=>`${h.date?new Date(h.date).toLocaleDateString("fr-FR"):""},${(h.nom||"").replace(/,/g," ")},${h.categorie||""},${(h.note||"").replace(/,/g," ")}`)];
      const csv=rows.join("\n");
      const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");a.href=url;a.download="historique-parenthese.csv";a.click();
      URL.revokeObjectURL(url);
    }catch(e){
      // Fallback: copier dans le presse-papier
      const rows=["Date,Activité,Catégorie,Note",...historique.map(h=>`${h.date?new Date(h.date).toLocaleDateString("fr-FR"):""},${h.nom||""},${h.categorie||""},${h.note||""}`)];
      navigator.clipboard?.writeText(rows.join("\n")).catch(()=>{});
    }
  };

  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      <div style={{background:WH,padding:"16px 16px 0",borderBottom:BD,marginBottom:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TX,padding:0}}>←</button>
          <h1 style={{fontSize:20,fontWeight:800,color:TX,margin:0,flex:1}}>📊 Historique</h1>
          <div style={{display:"flex",gap:8}}>
            {historique.length>0&&<button onClick={exportTxt} style={{background:VL,border:"none",borderRadius:20,padding:"6px 12px",fontSize:12,color:V,cursor:"pointer",fontWeight:600}}>📤 Partager</button>}
            {historique.length>0&&<button onClick={exportCSV} style={{background:"#ECFDF5",border:"none",borderRadius:20,padding:"6px 12px",fontSize:12,color:"#065F46",cursor:"pointer",fontWeight:600}}>📊 CSV</button>}
            {historique.length>0&&<button onClick={onClear} style={{background:"#FEE2E2",border:"none",borderRadius:20,padding:"6px 12px",fontSize:12,color:"#DC2626",cursor:"pointer",fontWeight:600}}>🗑️</button>}
          </div>
        </div>
        {/* Stats rapides */}
        {historique.length>0&&<div style={{display:"flex",gap:8,marginBottom:12}}>
          {[
            {v:historique.length,l:"Activités"},
            {v:new Set(historique.map(h=>h.date?.slice(0,10))).size,l:"Jours actifs"},
            {v:categories.length,l:"Catégories"},
          ].map(({v,l})=>(
            <div key={l} style={{flex:1,background:VL,borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
              <p style={{margin:0,fontSize:18,fontWeight:800,color:V}}>{v}</p>
              <p style={{margin:0,fontSize:10,color:TM}}>{l}</p>
            </div>
          ))}
        </div>}
        {/* Recherche + filtre */}
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher..." style={{flex:1,padding:"9px 12px",borderRadius:12,border:BD,fontSize:13,background:BG,outline:"none"}}/>
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{padding:"9px 12px",borderRadius:12,border:BD,fontSize:13,background:BG,color:TX,outline:"none"}}>
            <option value="">Toutes</option>
            {categories.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{padding:"12px 16px"}}>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{fontSize:48,margin:"0 0 12px"}}>{historique.length===0?"🌱":"🔍"}</p>
            <p style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 8px"}}>{historique.length===0?"Aucune activité réalisée":"Aucun résultat"}</p>
            <p style={{fontSize:13,color:TM}}>{historique.length===0?"Appuyez sur ✓ Fait ! après une activité générée pour la noter ici":"Essayez un autre filtre"}</p>
          </div>
        ):(
          Object.entries(parMois).map(([mois,items])=>(
            <div key={mois} style={{marginBottom:20}}>
              <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:TM,textTransform:"uppercase",letterSpacing:"0.05em"}}>{mois} · {items.length} activité{items.length>1?"s":""}</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map((h,i)=>(
                  <div key={i} style={{background:WH,borderRadius:12,padding:"10px 14px",border:BD,display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,borderRadius:10,background:VL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🎨</div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{margin:0,fontSize:13,fontWeight:600,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.nom}</p>
                      <p style={{margin:0,fontSize:11,color:TM}}>{h.categorie||"Activité"} · {h.date?new Date(h.date).toLocaleDateString("fr-FR","fr"):""}</p>
                      {h.note&&<p style={{margin:"2px 0 0",fontSize:11,color:V,fontStyle:"italic"}}>{h.note}</p>}
                    </div>
                    <span style={{fontSize:18,color:"#10B981",flexShrink:0}}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Toggle({on,onChange,disabled=false}){
  return(
    <div onClick={disabled?undefined:onChange} style={{width:44,height:24,borderRadius:12,background:on?"#6C5CE7":"#D1D5DB",position:"relative",cursor:disabled?"not-allowed":"pointer",transition:"background 0.2s",opacity:disabled?0.5:1,flexShrink:0}}>
      <div style={{position:"absolute",top:2,left:on?22:2,width:20,height:20,borderRadius:"50%",background:WH,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"left 0.2s"}}/>
    </div>
  );
}

function PagePremium({onBack,onSubscribe,isLoggedIn=true,onRequireAuth,premiumTrialUsed=false,onStartTrial}){
  const [planChoisi,setPlanChoisi]=useState("annuel"); // "mensuel" | "annuel"
  const [showPaiement,setShowPaiement]=useState(false);
  const [carteNum,setCarteNum]=useState("");
  const [carteExp,setCarteExp]=useState("");
  const [carteCvc,setCarteCvc]=useState("");
  const [traitement,setTraitement]=useState(false);
  const [infoModal,setInfoModal]=useState(null);
  const avantages=[
    {
      emoji:"📅",titre:"Planning hebdomadaire",desc:"Génère le planning complet de la semaine",
      illustration:"📅✨📋",
      valeur:"Gain de temps",
      detail:"Génère en 1 clic un planning d'activités sur 7 jours, adapté à l'énergie et aux envies de votre enfant. Inclut automatiquement la liste de courses pour préparer les activités.",
      exemple:"Lundi : peinture 🎨 · Mardi : cuisine 🍳 · Mercredi : nature 🌳...",
      gratuit:"3 jours seulement",
    },
    {
      emoji:"👶",titre:"Profils enfants illimités",desc:"Jusqu'à 6 enfants au lieu de 2",
      illustration:"👦👧👦👧👦👧",
      valeur:"Famille nombreuse",
      detail:"Créez un profil personnalisé pour chacun de vos enfants avec son propre carnet sensoriel, ses profils TND (TSA, TDAH, DYS) et ses préférences. Les suggestions s'adaptent à l'enfant sélectionné.",
      exemple:"Chaque enfant a ses propres suggestions adaptées à son profil.",
      gratuit:"2 profils maximum",
    },
    {
      emoji:"🆘",titre:"Mode SOS",desc:"Activités d'urgence pour les moments difficiles",
      illustration:"🆘💨🧘",
      valeur:"Gestion de crise",
      detail:"Une bibliothèque d'activités de régulation émotionnelle pour les moments de surcharge sensorielle, de crise ou d'agitation. Filtrées par type de profil TND et type de crise, accessibles en 2 secondes.",
      exemple:"Surcharge sensorielle TSA → Technique de la tortue 🐢 · Respiration des bulles 🫧",
      gratuit:"Non disponible",
    },
    {
      emoji:"🧠",titre:"Carnet sensoriel",desc:"Suivi détaillé des sensibilités de votre enfant",
      illustration:"🧠📊🎯",
      valeur:"Personnalisation maximale",
      detail:"Renseignez les niveaux de tolérance de votre enfant (bruit, lumière, foule, imprévu) via des curseurs intuitifs. Le générateur d'activités exclut automatiquement les environnements incompatibles avec son profil.",
      exemple:"Sensible au bruit → aucune activité 'bruyante' ne sera proposée.",
      gratuit:"Non disponible",
    },
    {
      emoji:"🧩",titre:"Emploi du temps pictogrammes",desc:"Prépare sorties et événements en images",
      illustration:"🧩🖼️📋",
      valeur:"Anticipation et routine",
      detail:"Créez des emplois du temps visuels avec des pictogrammes pour préparer votre enfant à une sortie, une journée spéciale ou un événement. Idéal pour les enfants TSA qui ont besoin d'anticiper.",
      exemple:"Zoo : 🚗 Voiture → 🎟️ Entrée → 🦁 Lions → 🍕 Pique-nique → 🏠 Retour",
      gratuit:"Non disponible",
    },
    {
      emoji:"❤️",titre:"Favoris illimités",desc:"Sauvegardez autant d'activités que vous voulez",
      illustration:"❤️📚🏷️",
      valeur:"Organisation",
      detail:"Plus de limite de 10 favoris. Organisez vos activités et sorties préférées avec des tags personnalisés (À faire ce weekend, Coup de cœur...) et retrouvez-les facilement par catégorie ou tag.",
      exemple:"Tag 'Activité calme' → 12 activités sauvegardées · Tag 'Weekend' → 8 sorties",
      gratuit:"10 favoris maximum",
    },
    {
      emoji:"🪄",titre:"Générateur en 1 clic",desc:"Une seule proposition directe, sans liste",
      illustration:"🪄⚡🎯",
      valeur:"Décision immédiate",
      detail:"Au lieu de choisir parmi 3 propositions, recevez directement LA meilleure activité adaptée à votre enfant. Le générateur tient compte du profil sensoriel, de l'historique et des préférences.",
      exemple:"Un clic → 'Peinture aux doigts 🎨' — c'est tout, pas de choix à faire.",
      gratuit:"3 propositions à choisir",
    },
  ];

  // Modal info fonctionnalité
  if(infoModal) return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}>
        <button onClick={()=>setInfoModal(null)} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>{infoModal.emoji} {infoModal.titre}</p>
        <div style={{width:36}}/>
      </div>
      <div style={{padding:"24px 16px"}}>
        {/* Illustration */}
        <div style={{background:"linear-gradient(135deg,#6C5CE7,#a78bfa)",borderRadius:24,padding:"32px 16px",textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:60,letterSpacing:8,marginBottom:12}}>{infoModal.illustration}</div>
          <span style={{background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:20,padding:"4px 16px",fontSize:12,fontWeight:700}}>{infoModal.valeur}</span>
        </div>
        {/* Description détaillée */}
        <div style={{background:WH,borderRadius:16,border:BD,padding:"16px",marginBottom:12}}>
          <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:V,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ce que ça change pour vous</p>
          <p style={{margin:0,fontSize:14,color:TX,lineHeight:1.7}}>{infoModal.detail}</p>
        </div>
        {/* Exemple concret */}
        <div style={{background:"#ECFDF5",borderRadius:16,border:"1px solid #A7F3D0",padding:"14px 16px",marginBottom:12}}>
          <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:"#065F46"}}>💡 Exemple concret</p>
          <p style={{margin:0,fontSize:13,color:"#065F46",lineHeight:1.6}}>{infoModal.exemple}</p>
        </div>
        {/* Gratuit vs Premium */}
        <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:20}}>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1,background:"#F3F4F6",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
              <p style={{margin:"0 0 4px",fontSize:10,fontWeight:700,color:TM}}>GRATUIT</p>
              <p style={{margin:0,fontSize:12,color:TM}}>{infoModal.gratuit}</p>
            </div>
            <div style={{flex:1,background:"#EDE9FF",borderRadius:10,padding:"10px 12px",textAlign:"center",border:`1px solid ${V}33`}}>
              <p style={{margin:"0 0 4px",fontSize:10,fontWeight:700,color:V}}>PREMIUM ⭐</p>
              <p style={{margin:0,fontSize:12,color:V,fontWeight:600}}>{infoModal.desc}</p>
            </div>
          </div>
        </div>
        <button onClick={()=>setInfoModal(null)} style={{width:"100%",padding:14,borderRadius:28,background:V,border:"none",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>
          ← Retour aux fonctionnalités
        </button>
      </div>
    </div>
  );

  const [emailPaiement,setEmailPaiement]=useState("");
  const [nomCarte,setNomCarte]=useState("");
  const [modePaiement,setModePaiement]=useState("abonnement"); // "abonnement" | "essai"

  const handleSubscribe=()=>{
    if(!isLoggedIn){ onRequireAuth&&onRequireAuth(); return; }
    setModePaiement("abonnement");
    setShowPaiement(true);
  };

  const handleStartTrial=()=>{
    if(!isLoggedIn){ onRequireAuth&&onRequireAuth(); return; }
    setModePaiement("essai");
    setShowPaiement(true);
  };

  const confirmerPaiement=()=>{
    const numPropre=carteNum.replace(/\s/g,"");
    if(!nomCarte.trim()){alert("Veuillez saisir le nom du titulaire.");return;}
    if(!emailPaiement.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPaiement)){alert("Adresse email invalide.");return;}
    if(numPropre.length<16){alert("Numéro de carte invalide (16 chiffres requis).");return;}
    if(!carteExp.match(/^\d{2}\/\d{2}$/)){ alert("Date d'expiration invalide (format MM/AA)."); return; }
    if(!carteCvc.match(/^\d{3,4}$/)){ alert("CVC invalide (3 ou 4 chiffres)."); return; }
    setTraitement(true);
    setTimeout(()=>{
      setTraitement(false);
      setShowPaiement(false);
      if(modePaiement==="essai"){
        onStartTrial&&onStartTrial();
      } else {
        onSubscribe&&onSubscribe();
      }
    },1200);
  };

  // Date de fin d'essai (7 jours)
  const dateFinEssai=new Date(Date.now()+7*24*60*60*1000).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});
  const datePremierPrelevement=dateFinEssai;
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      {/* Header */}
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>Premium</p>
        <div style={{width:36}}/>
      </div>

      <div style={{padding:"24px 16px 0"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:44,marginBottom:10}}>⭐</div>
          <h1 style={{margin:"0 0 6px",fontSize:21,fontWeight:800,color:TX}}>Passer en Premium ⭐</h1>
          <p style={{margin:0,fontSize:13,color:TM}}>Débloque toutes les fonctionnalités de Parent'Hèse</p>
        </div>

        {/* Avantages */}
        <div style={{background:WH,borderRadius:16,border:BD,padding:"6px 16px",marginBottom:20}}>
          {avantages.map((a,i)=>(
            <div key={a.titre} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<avantages.length-1?"1px solid rgba(108,92,231,0.08)":"none"}}>
              <span style={{fontSize:22,flexShrink:0}}>{a.emoji}</span>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>{a.titre}</p>
                <p style={{margin:0,fontSize:11,color:TM}}>{a.desc}</p>
              </div>
              <button onClick={()=>setInfoModal(a)} style={{width:26,height:26,borderRadius:"50%",background:VL,border:"none",color:V,fontWeight:800,fontSize:13,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}} title="En savoir plus">ℹ</button>
              <span style={{color:"#10B981",fontSize:16,flexShrink:0}}>✓</span>
            </div>
          ))}
        </div>

        {/* Tableau comparatif */}
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:20}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",background:BG,padding:"10px 16px",gap:8,alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:700,color:TM}}>Fonctionnalité</span>
            <span style={{fontSize:11,fontWeight:700,color:TM,textAlign:"center",width:52}}>Gratuit</span>
            <span style={{fontSize:11,fontWeight:700,color:V,textAlign:"center",width:52}}>⭐ Premium</span>
          </div>
          {[
            ["Générateur d'activités","3 choix","1 clic"],
            ["Profils enfants","2 max","6 max"],
            ["Favoris","10 max","Illimités"],
            ["Planning hebdomadaire","3 jours","7 jours"],
            ["Mode SOS","✗","✓"],
            ["Carnet sensoriel","✗","✓"],
            ["Pictogrammes","✗","✓"],
          ].map(([f,free,prem],i,arr)=>(
            <div key={f} style={{display:"grid",gridTemplateColumns:"1fr auto auto",padding:"11px 16px",gap:8,alignItems:"center",borderTop:"1px solid rgba(108,92,231,0.07)",background:i%2===0?"transparent":"rgba(108,92,231,0.02)"}}>
              <span style={{fontSize:12,color:TX}}>{f}</span>
              <span style={{fontSize:11,color:TM,textAlign:"center",width:52,fontWeight:500}}>{free}</span>
              <span style={{fontSize:11,color:V,textAlign:"center",width:52,fontWeight:700}}>{prem}</span>
            </div>
          ))}
        </div>

        {/* Tarifs */}
        <div style={{display:"flex",gap:10,marginBottom:20}}>
          <button onClick={()=>setPlanChoisi("mensuel")} style={{flex:1,textAlign:"left",background:WH,borderRadius:16,padding:"16px 14px",border:`2px solid ${planChoisi==="mensuel"?"#6C5CE7":"rgba(0,0,0,0.08)"}`,cursor:"pointer"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:TM}}>Mensuel</p>
            <p style={{margin:0,fontSize:20,fontWeight:800,color:TX}}>4,99€<span style={{fontSize:12,fontWeight:500,color:TM}}>/mois</span></p>
          </button>
          <button onClick={()=>setPlanChoisi("annuel")} style={{flex:1,textAlign:"left",background:WH,borderRadius:16,padding:"16px 14px",border:`2px solid ${planChoisi==="annuel"?"#6C5CE7":"rgba(0,0,0,0.08)"}`,cursor:"pointer",position:"relative"}}>
            <span style={{position:"absolute",top:-10,right:10,background:"#6C5CE7",color:WH,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10}}>Meilleure offre</span>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:TM}}>Annuel</p>
            <p style={{margin:0,fontSize:20,fontWeight:800,color:TX}}>39,99€<span style={{fontSize:12,fontWeight:500,color:TM}}>/an</span></p>
          </button>
        </div>

        {!isLoggedIn&&<p style={{margin:"0 0 10px",fontSize:12,color:TM,textAlign:"center"}}>Connecte-toi (gratuit) avant de t'abonner</p>}
        <button onClick={handleSubscribe} style={{width:"100%",padding:14,borderRadius:28,background:"#6C5CE7",border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:10}}>S'abonner</button>
        {!premiumTrialUsed&&isLoggedIn&&onStartTrial&&(
          <button onClick={handleStartTrial} style={{width:"100%",padding:12,borderRadius:28,background:"rgba(108,92,231,0.1)",border:"2px dashed #6C5CE7",color:"#6C5CE7",fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:10}}>🎁 Essayer 7 jours gratuitement</button>
        )}
        {premiumTrialUsed&&<p style={{textAlign:"center",fontSize:12,color:TM,margin:"0 0 10px"}}>Essai déjà utilisé — abonne-toi pour continuer</p>}
        <p style={{textAlign:"center",fontSize:11,color:TM,margin:0}}>Sans engagement · Annulable à tout moment</p>
      </div>

      {showPaiement&&(
        <div onClick={()=>!traitement&&setShowPaiement(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:700,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 40px",width:"100%",maxWidth:390,maxHeight:"92vh",overflowY:"auto",boxSizing:"border-box"}}>

            {/* En-tête */}
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{width:48,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
              {modePaiement==="essai"?(
                <>
                  <div style={{fontSize:36,marginBottom:6}}>🎁</div>
                  <p style={{margin:"0 0 4px",fontSize:17,fontWeight:800,color:TX}}>Démarrer l'essai gratuit</p>
                  <p style={{margin:0,fontSize:12,color:TM}}>7 jours gratuits — aucun prélèvement aujourd'hui</p>
                </>
              ):(
                <>
                  <div style={{fontSize:36,marginBottom:6}}>💳</div>
                  <p style={{margin:"0 0 4px",fontSize:17,fontWeight:800,color:TX}}>Paiement sécurisé</p>
                  <p style={{margin:0,fontSize:12,color:TM}}>{planChoisi==="annuel"?"39,99€ / an · soit 3,33€/mois":"4,99€ / mois"}</p>
                </>
              )}
            </div>

            {/* Récapitulatif essai */}
            {modePaiement==="essai"&&(
              <div style={{background:"#ECFDF5",borderRadius:14,padding:"14px 16px",marginBottom:16,border:"1px solid #A7F3D0"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:"#065F46",fontWeight:600}}>Aujourd'hui</span>
                  <span style={{fontSize:12,color:"#065F46",fontWeight:700}}>0,00€</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:"#065F46"}}>Fin de l'essai</span>
                  <span style={{fontSize:12,color:"#065F46",fontWeight:600}}>{dateFinEssai}</span>
                </div>
                <div style={{borderTop:"1px solid #A7F3D0",marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,color:"#065F46",fontWeight:600}}>Premier prélèvement</span>
                  <span style={{fontSize:12,color:"#065F46",fontWeight:700}}>4,99€ le {datePremierPrelevement}</span>
                </div>
              </div>
            )}

            {/* Champs carte */}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Email de confirmation *</label>
              <input value={emailPaiement} onChange={e=>setEmailPaiement(e.target.value)} placeholder="votre@email.fr" type="email" inputMode="email" style={FS}/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Titulaire de la carte *</label>
              <input value={nomCarte} onChange={e=>setNomCarte(e.target.value)} placeholder="PRÉNOM NOM" style={FS}/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Numéro de carte *</label>
              <input value={carteNum} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,16);setCarteNum(v.replace(/(.{4})/g,"$1 ").trim());}} placeholder="1234 5678 9012 3456" maxLength={19} inputMode="numeric" style={FS}/>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:18}}>
              <div style={{flex:1}}>
                <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Expiration *</label>
                <input value={carteExp} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);setCarteExp(v.length>2?v.slice(0,2)+"/"+v.slice(2):v);}} placeholder="MM/AA" maxLength={5} inputMode="numeric" style={FS}/>
              </div>
              <div style={{flex:1}}>
                <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>CVC *</label>
                <input value={carteCvc} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);setCarteCvc(v);}} placeholder="123" maxLength={4} inputMode="numeric" style={FS}/>
              </div>
            </div>

            {/* Rappel légal */}
            <div style={{background:"#FFF7ED",borderRadius:12,padding:"10px 14px",marginBottom:16,border:"1px solid #FDE68A"}}>
              <p style={{margin:0,fontSize:11,color:"#92400E",lineHeight:1.6}}>
                {modePaiement==="essai"
                  ? `🔔 Vous recevrez un email de rappel 3 jours avant la fin de votre essai (${dateFinEssai}). Sans annulation, le prélèvement de 4,99€/mois démarrera automatiquement. Annulation possible à tout moment depuis votre profil.`
                  : `🔒 Paiement sécurisé. Votre abonnement se renouvelle automatiquement. Annulation possible à tout moment depuis votre profil.`
                }
              </p>
            </div>

            <button onClick={confirmerPaiement} disabled={traitement} style={{width:"100%",padding:14,borderRadius:28,background:"#6C5CE7",border:"none",color:WH,fontWeight:700,fontSize:15,cursor:traitement?"default":"pointer",opacity:traitement?0.7:1,marginBottom:10}}>
              {traitement?"Traitement en cours...":(modePaiement==="essai"?"🎁 Démarrer mon essai gratuit":"✓ Confirmer le paiement")}
            </button>
            <button onClick={()=>setShowPaiement(false)} disabled={traitement} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button>
            <p style={{textAlign:"center",fontSize:10,color:TM,margin:"10px 0 0"}}>🔒 Paiement simulé — aucune donnée bancaire réelle traitée</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PageNotifications({onBack}){
  const [notifAll,setNotifAll]=useState(true);
  const [notifs,setNotifs]=useState({lundi:true,mercredi:true,dimanche:true,vendredi:true,vacances7j:true,vacancesJ1:true});
  const toggleNotif=(key)=>{if(!notifAll)return;setNotifs(prev=>({...prev,[key]:!prev[key]}));};
  const toggleAll=()=>{const v=!notifAll;setNotifAll(v);setNotifs({lundi:v,mercredi:v,dimanche:v,vendredi:v,vacances7j:v,vacancesJ1:v});};
  const Row=({icon,iconBg,title,sub,k,badge,badgeBg,badgeColor,last=false})=>(
    <div style={{padding:"13px 16px",display:"flex",alignItems:"center",gap:13,borderBottom:last?"none":"1px solid rgba(108,92,231,0.07)"}}>
      <div style={{width:42,height:42,borderRadius:12,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
      <div style={{flex:1}}>
        <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>{title}</p>
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
          <p style={{margin:0,fontSize:11,color:TM}}>{sub}</p>
          {badge&&<span style={{fontSize:9,background:badgeBg,color:badgeColor,padding:"1px 7px",borderRadius:8,fontWeight:600}}>{badge}</span>}
        </div>
      </div>
      <Toggle on={notifAll&&notifs[k]} onChange={()=>toggleNotif(k)} disabled={!notifAll}/>
    </div>
  );
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:24}}>
      {/* Header */}
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>Notifications</p>
        <div style={{width:36}}/>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* Bloc 1 — global */}
        <div style={{background:WH,borderRadius:16,padding:"13px 16px",border:BD,marginBottom:14,display:"flex",alignItems:"center",gap:13}}>
          <div style={{width:42,height:42,borderRadius:12,background:"#EDE9FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🔔</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>Toutes les notifications</p>
            <p style={{margin:0,fontSize:11,color:TM}}>Activer ou desactiver tout</p>
          </div>
          <Toggle on={notifAll} onChange={toggleAll}/>
        </div>

        {/* Bloc 2 — Rappels planning */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>📅 Rappels planning</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:14}}>
          <Row icon="🌅" iconBg="#FFF3E0" title="Debut de semaine" sub="Lundi a 9h00" k="lundi"/>
          <Row icon="🌙" iconBg="#DBEAFE" title="Mi-semaine" sub="Mercredi a 18h00" k="mercredi"/>
          <Row icon="🗓️" iconBg="#EDE9FF" title="Prepare la semaine" sub="Dimanche a 20h00" k="dimanche" last/>
        </div>

        {/* Bloc 3 — Rappels week-end */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>🎉 Rappels week-end</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:14}}>
          <Row icon="🎊" iconBg="#FDE8F0" title="C est bientot le week-end !" sub="Vendredi a 19h00" k="vendredi" badge="1x / semaine" badgeBg="#D1FAE5" badgeColor="#065F46" last/>
        </div>

        {/* Bloc 4 — Rappels vacances */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>🏖️ Rappels vacances</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:20}}>
          <Row icon="⚠️" iconBg="#FFF3E0" title="Vacances dans 7 jours" sub="7 jours avant chaque periode" k="vacances7j" badge="Automatique" badgeBg="#FEF3C7" badgeColor="#92400E"/>
          <Row icon="🎒" iconBg="#D1FAE5" title="C est les vacances !" sub="1er jour de vacances a 9h00" k="vacancesJ1" last/>
        </div>

        <p style={{textAlign:"center",fontSize:12,color:"#C0B8C8",lineHeight:1.5}}>💡 Les notifications push seront activees lors du telechargement de l application.</p>
      </div>
    </div>
  );
}

function PageAide({onBack,onGoConfidentialite,isPremium=false,setPremium,onOpenPremium}){
  const [openQuestion,setOpenQuestion]=useState(null);
  const [search,setSearch]=useState("");
  const [showBugModal,setShowBugModal]=useState(false);
  const [bugText,setBugText]=useState("");
  const [showBugToast,setShowBugToast]=useState(false);
  const [showAnnulerModal,setShowAnnulerModal]=useState(false);
  const [showAnnulerToast,setShowAnnulerToast]=useState(false);
  const confirmerAnnulation=()=>{
    setShowAnnulerModal(false);
    setPremium&&setPremium(false);
    setShowAnnulerToast(true);
    setTimeout(()=>setShowAnnulerToast(false),3000);
  };
  const toggleQuestion=(id)=>setOpenQuestion(openQuestion===id?null:id);
  const faqData=[
    {categorie:"🏠 General",couleur:"#EEEDFE",couleurTexte:"#3C3489",questions:[
      {id:"g1",question:"Comment fonctionne le generateur d activites ?",reponse:"Selectionne ton niveau d energie (Fatigue ou Motive) et le lieu souhaite (Interieur ou Exterieur), puis clique sur Trouve-moi une activite. L app te propose une activite adaptee parmi notre catalogue."},
      {id:"g2",question:"Comment ajouter une activite ou sortie en favori ?",reponse:"Sur la page detail d une activite ou sortie, clique sur le bouton Ajouter aux favoris. Tu retrouveras tous tes favoris dans l onglet Favoris de la barre de navigation."},
      {id:"g3",question:"C est quoi la version Premium ?",reponse:"La version Premium debloque le planning hebdomadaire, le mode SOS, les profils enfants illimites, le carnet sensoriel, l emploi du temps en pictogrammes, les favoris illimites (contre 10 en version gratuite), et le generateur en un clic (au lieu d une liste de 3 propositions a comparer)."},
      {id:"g4",question:"L app fonctionne-t-elle sans connexion internet ?",reponse:"Le contenu principal est disponible hors connexion une fois charge. Cependant, certaines fonctionnalites comme les suggestions communautaires necessitent une connexion."},
    ]},
    {categorie:"✍️ Contributions",couleur:"#EAF3DE",couleurTexte:"#3B6D11",questions:[
      {id:"c1",question:"Comment proposer une activite ou une sortie ?",reponse:"Dans l onglet Bibliotheque, va sur Activites ou Sorties et clique sur Proposer une activite/sortie en bas de la liste. Remplis le formulaire et envoie ta suggestion. Elle apparait immediatement avec un badge Communaute."},
      {id:"c2",question:"Pourquoi ma suggestion a-t-elle disparu ?",reponse:"Si ta suggestion a recu 3 signalements ou plus, elle est temporairement masquee en attente de verification par notre equipe."},
      {id:"c3",question:"Comment gagner des trophees ?",reponse:"Tu gagnes des trophees en proposant des activites, sorties et evenements. Des ta 1ere contribution tu obtiens le trophe Premiere contribution. Les paliers suivants sont a 3, 5, 10 et 20 contributions."},
      {id:"c4",question:"Les infos TND sont-elles verifiees ?",reponse:"Les informations TND sont renseignees par les parents de la communaute. Elles sont indicatives et basees sur des retours reels de familles concernees."},
    ]},
    {categorie:"🧩 TND & Accessibilite",couleur:"#FAEEDA",couleurTexte:"#633806",questions:[
      {id:"t1",question:"Que signifient les badges TSA, TDAH, DYS ?",reponse:"Ces badges indiquent que des parents d enfants avec ces profils ont note et commente la sortie ou l activite. Tu peux filtrer les avis par profil pour lire uniquement les retours qui te concernent."},
      {id:"t2",question:"Comment signaler une info TND incorrecte ?",reponse:"Sur la page detail d une sortie ou activite, utilise le bouton Signaler et selectionne Informations manquantes. Notre equipe verifiera et corrigera le contenu."},
      {id:"t3",question:"Mon enfant a un profil mixte (ex: TSA + TDAH), comment filtrer ?",reponse:"Pour l instant les filtres sont individuels. Nous travaillons sur un filtre multi-profils pour une prochaine version de l app."},
    ]},
    {categorie:"👤 Mon compte",couleur:BG,couleurTexte:"#444441",questions:[
      {id:"m1",question:"Comment modifier mon profil ?",reponse:"Dans l onglet Profil, clique sur ton avatar ou ton nom pour modifier tes informations personnelles (prenom, photo, nombre et age de tes enfants)."},
      {id:"m2",question:"Comment supprimer mon compte ?",reponse:"Dans Profil → Confidentialite → Supprimer mon compte. Cette action est irreversible et supprime toutes tes donnees. Tu devras taper SUPPRIMER pour confirmer."},
      {id:"m3",question:"Comment recuperer mes donnees personnelles ?",reponse:"Dans Profil → Confidentialite → Telecharger mes donnees. Tu recevras un email avec l ensemble de tes donnees sous 48h, conformement au RGPD."},
      {id:"m4",question:"Comment annuler mon abonnement Premium ?",reponse:"Dans Profil → Aide & FAQ, descends jusqu a la section Mon abonnement et clique sur Annuler mon abonnement Premium. Tu repasses immediatement en version gratuite, sans engagement."},
    ]},
  ];
  const filtered=search.trim().length>0
    ?faqData.map(cat=>({...cat,questions:cat.questions.filter(q=>q.question.toLowerCase().includes(search.toLowerCase()))})).filter(cat=>cat.questions.length>0)
    :faqData;
  const sendBug=()=>{setShowBugModal(false);setBugText("");setShowBugToast(true);setTimeout(()=>setShowBugToast(false),3000);};
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:24}}>
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>Aide & FAQ</p>
        <div style={{width:36}}/>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        {/* Barre de recherche */}
        <div style={{background:WH,borderRadius:12,border:BD,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",marginBottom:16}}>
          <span style={{fontSize:16,color:TM}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une question..." style={{flex:1,border:"none",outline:"none",fontSize:13,color:TX,background:"transparent",fontFamily:"inherit"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:TM,fontSize:16,padding:0}}>×</button>}
        </div>
        {/* FAQ */}
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"40px 0",color:TM}}>
            <p style={{fontSize:36,margin:"0 0 10px"}}>🔍</p>
            <p style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 4px"}}>Aucune question trouvee</p>
            <p style={{fontSize:13,color:TM,margin:0}}>Essaie d autres mots-cles</p>
          </div>
        ):filtered.map((cat,ci)=>(
          <div key={ci} style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:12,fontWeight:800,background:(cat.couleur||"#6C5CE7"),color:(cat.couleurTexte||"#fff"),padding:"3px 10px",borderRadius:20}}>{cat.categorie}</span>
            </div>
            <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden"}}>
              {cat.questions.map((q,qi)=>(
                <div key={q.id} style={{borderBottom:qi<cat.questions.length-1?"1px solid rgba(108,92,231,0.07)":"none"}}>
                  <div onClick={()=>toggleQuestion(q.id)} style={{padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",gap:10}}>
                    <p style={{margin:0,fontSize:13,fontWeight:500,color:TX,flex:1,lineHeight:1.4}}>{q.question}</p>
                    <span style={{fontSize:16,color:TM,transition:"transform 0.2s",display:"inline-block",transform:openQuestion===q.id?"rotate(90deg)":"rotate(0deg)",flexShrink:0}}>›</span>
                  </div>
                  {openQuestion===q.id&&(
                    <div style={{background:"#F9F9F9",padding:"12px 16px",borderTop:"1px solid rgba(108,92,231,0.07)"}}>
                      <p style={{margin:0,fontSize:13,color:TM,lineHeight:1.6}}>{q.reponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Mon abonnement */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>⭐ Mon abonnement</p>
        <div style={{background:WH,borderRadius:16,border:BD,padding:16,marginBottom:14}}>
          {isPremium?(
            <>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <span style={{fontSize:22}}>⭐</span>
                <div><p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>Premium actif</p><p style={{margin:0,fontSize:11,color:TM}}>Toutes les fonctionnalités sont débloquées</p></div>
              </div>
              <button onClick={()=>setShowAnnulerModal(true)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:WH,border:"1.5px solid #FCA5A5",color:"#DC2626",fontWeight:600,fontSize:13,cursor:"pointer"}}>Annuler mon abonnement Premium</button>
            </>
          ):(
            <>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <span style={{fontSize:22}}>🆓</span>
                <div><p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>Aucun abonnement Premium actif</p><p style={{margin:0,fontSize:11,color:TM}}>Tu utilises actuellement la version gratuite</p></div>
              </div>
              {onOpenPremium&&<button onClick={onOpenPremium} style={{width:"100%",padding:"12px 0",borderRadius:28,background:"#6C5CE7",border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>Découvrir Premium ⭐</button>}
            </>
          )}
        </div>
        {/* Support */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>💬 Nous contacter</p>
        <div style={{background:WH,borderRadius:16,border:BD,padding:16,marginBottom:14,display:"flex",flexDirection:"column",gap:10}}>
          <a href="mailto:support@parentales.fr?subject=Aide Parent'Hèse" style={{display:"block",width:"100%",padding:"12px 0",borderRadius:28,background:V,color:WH,fontWeight:700,fontSize:14,textAlign:"center",textDecoration:"none",boxSizing:"border-box"}}>✉️ Envoyer un email</a>
          <button onClick={()=>setShowBugModal(true)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:WH,border:"1.5px solid "+V,color:V,fontWeight:700,fontSize:14,cursor:"pointer"}}>🐛 Signaler un bug</button>
        </div>
        {/* A propos */}
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>ℹ️ A propos</p>
        <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,paddingBottom:8,borderBottom:"1px solid rgba(108,92,231,0.07)"}}>
            <span style={{fontSize:13,color:TM}}>Version de l app</span>
            <span style={{fontSize:13,fontWeight:600,color:TX}}>1.0.0</span>
          </div>
          <p style={{margin:"0 0 8px",fontSize:13,color:TM,paddingBottom:8,borderBottom:"1px solid rgba(108,92,231,0.07)"}}>Developpe avec ❤️ pour les parents</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <a href="https://instagram.com/parentales" target="_blank" rel="noreferrer" style={{fontSize:13,color:V,fontWeight:600,textDecoration:"none"}}>Instagram @parentales</a>
            <button onClick={onGoConfidentialite} style={{background:"none",border:"none",color:V,fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left",padding:0}}>Politique de confidentialite</button>
          </div>
        </div>
      </div>
      {/* Modal bug */}
      {showBugModal&&(
        <div onClick={()=>setShowBugModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:600,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 16px"}}/>
            <p style={{margin:"0 0 14px",fontSize:16,fontWeight:800,color:TX}}>Signaler un bug</p>
            <textarea value={bugText} onChange={e=>setBugText(e.target.value)} placeholder="Decris le probleme rencontre..." style={{width:"100%",minHeight:100,padding:"10px 12px",borderRadius:12,border:"1.5px solid #E5E7EB",fontSize:13,resize:"none",boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:14}}/>
            <button onClick={sendBug} disabled={!bugText.trim()} style={{width:"100%",padding:"12px 0",borderRadius:28,background:bugText.trim()?V:"#E5E7EB",border:"none",color:bugText.trim()?WH:"#9CA3AF",fontWeight:700,fontSize:14,cursor:bugText.trim()?"pointer":"not-allowed"}}>Envoyer</button>
          </div>
        </div>
      )}
      {/* Toast bug */}
      {showBugToast&&(
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
          ✅ Merci ! Nous avons bien recu ton signalement.
        </div>
      )}
      {/* Modal annulation Premium */}
      {showAnnulerModal&&(
        <div onClick={()=>setShowAnnulerModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <p style={{margin:"0 0 8px",fontSize:16,fontWeight:800,color:TX,textAlign:"center"}}>Annuler ton abonnement ?</p>
            <p style={{margin:"0 0 20px",fontSize:13,color:TM,textAlign:"center",lineHeight:1.5}}>Tu perdras l'accès au planning, au mode SOS, aux profils enfants illimités, au carnet sensoriel, à l'emploi du temps pictogrammes, aux favoris illimités et au générateur en 1 clic.</p>
            <button onClick={confirmerAnnulation} style={{width:"100%",padding:13,borderRadius:28,background:"#DC2626",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Confirmer l'annulation</button>
            <button onClick={()=>setShowAnnulerModal(false)} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Garder Premium</button>
          </div>
        </div>
      )}
      {/* Toast annulation */}
      {showAnnulerToast&&(
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#374151",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
          Abonnement Premium annulé
        </div>
      )}
    </div>
  );
}

function PageAmelioration({onBack}){
  const CATEGORIES=[
    {val:"fonctionnalite",label:"✨ Nouvelle fonctionnalite",desc:"Une idee de feature a ajouter"},
    {val:"bug",label:"🐛 Correction de bug",desc:"Quelque chose qui ne fonctionne pas bien"},
    {val:"contenu",label:"📚 Contenu",desc:"Activite, sortie ou evenement a ajouter"},
    {val:"design",label:"🎨 Design / Interface",desc:"Amelioration visuelle ou ergonomique"},
    {val:"autre",label:"💬 Autre",desc:"Tout autre type de suggestion"},
  ];
  const [categorie,setCategorie]=useState("");
  const [titre,setTitre]=useState("");
  const [detail,setDetail]=useState("");
  const [priorite,setPriorite]=useState("");
  const [showToast,setShowToast]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const canSend=categorie&&titre.trim().length>=5&&detail.trim().length>=10;
  const handleSend=()=>{
    if(!canSend)return;
    setSubmitted(true);
    setShowToast(true);
    setTimeout(()=>setShowToast(false),4000);
  };
  const handleReset=()=>{setCategorie("");setTitre("");setDetail("");setPriorite("");setSubmitted(false);};
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:32}}>
      {/* Header */}
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>Proposer une amelioration</p>
        <div style={{width:36}}/>
      </div>

      {submitted?(
        <div style={{padding:"48px 24px",textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:16}}>🎉</div>
          <p style={{fontSize:20,fontWeight:800,color:TX,margin:"0 0 8px"}}>Merci pour ta suggestion !</p>
          <p style={{fontSize:14,color:TM,lineHeight:1.6,margin:"0 0 32px"}}>Ton idee a bien ete envoyee a notre equipe. Nous l etudions avec attention pour ameliorer Parent'Hèse.</p>
          <button onClick={handleReset} style={{width:"100%",padding:"13px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>✨ Proposer une autre idee</button>
        </div>
      ):(
        <div style={{padding:"16px 16px 0"}}>
          {/* Bandeau info */}
          <div style={{background:"#FEF3C7",borderRadius:12,padding:12,marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:18,flexShrink:0}}>💡</span>
            <p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Tes idees comptent vraiment ! Chaque suggestion est lue par notre equipe. Les meilleures sont integrees dans les prochaines versions.</p>
          </div>

          {/* Categorie */}
          <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>🏷️ Categorie <span style={{color:RD}}>*</span></p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {CATEGORIES.map(c=>(
              <button key={c.val} onClick={()=>setCategorie(c.val)} style={{background:categorie===c.val?"#EEEDFE":WH,borderRadius:12,padding:"11px 14px",border:"2px solid "+(categorie===c.val?V:"rgba(108,92,231,0.15)"),cursor:"pointer",display:"flex",alignItems:"center",gap:10,textAlign:"left"}}>
                <div style={{flex:1}}>
                  <p style={{margin:0,fontSize:13,fontWeight:700,color:categorie===c.val?V:TX}}>{c.label}</p>
                  <p style={{margin:0,fontSize:11,color:TM}}>{c.desc}</p>
                </div>
                {categorie===c.val&&<span style={{fontSize:16,color:V}}>✓</span>}
              </button>
            ))}
          </div>

          {/* Titre */}
          <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>✏️ Titre de ta suggestion <span style={{color:RD}}>*</span></p>
          <input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Ex: Pouvoir filtrer par age dans la bibliotheque" maxLength={80} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid "+(titre.length>=5?"rgba(108,92,231,0.4)":"rgba(108,92,231,0.15)"),fontSize:13,color:TX,background:WH,marginBottom:4,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
          <p style={{margin:"0 0 16px",fontSize:11,color:TM,textAlign:"right"}}>{titre.length}/80</p>

          {/* Detail */}
          <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>📝 Decris ton idee en detail <span style={{color:RD}}>*</span></p>
          <textarea value={detail} onChange={e=>setDetail(e.target.value)} placeholder="Explique pourquoi cette amelioration serait utile, comment elle devrait fonctionner..." maxLength={500} style={{width:"100%",minHeight:110,padding:"11px 14px",borderRadius:12,border:"1.5px solid "+(detail.length>=10?"rgba(108,92,231,0.4)":"rgba(108,92,231,0.15)"),fontSize:13,color:TX,background:WH,resize:"none",marginBottom:4,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
          <p style={{margin:"0 0 16px",fontSize:11,color:TM,textAlign:"right"}}>{detail.length}/500</p>

          {/* Priorite */}
          <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>⚡ Importance pour toi</p>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {[{val:"faible",label:"🟢 Faible"},{val:"moyenne",label:"🟡 Moyenne"},{val:"haute",label:"🔴 Haute"}].map(p=>(
              <button key={p.val} onClick={()=>setPriorite(p.val)} style={{flex:1,padding:"9px 0",borderRadius:12,border:"2px solid "+(priorite===p.val?V:"rgba(108,92,231,0.15)"),background:priorite===p.val?"#EEEDFE":WH,color:priorite===p.val?V:TM,fontWeight:600,fontSize:12,cursor:"pointer"}}>{p.label}</button>
            ))}
          </div>

          <button onClick={handleSend} disabled={!canSend} style={{width:"100%",padding:"14px 0",borderRadius:28,background:canSend?V:"#E5E7EB",border:"none",color:canSend?WH:"#9CA3AF",fontWeight:700,fontSize:15,cursor:canSend?"pointer":"not-allowed",transition:"all 0.2s",marginBottom:8}}>
            🚀 Envoyer ma suggestion
          </button>
          {!canSend&&<p style={{textAlign:"center",fontSize:11,color:TM,margin:0}}>Remplis la categorie, le titre (5 car. min) et le detail (10 car. min)</p>}
        </div>
      )}

      {showToast&&(
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
          ✅ Suggestion envoyee, merci !
        </div>
      )}
    </div>
  );
}

function PageConfidentialite({onBack,onDeleteAccount}){
  const [dataPrefs,setDataPrefs]=useState({statistiques:true,personnalisation:true});
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [showDownloadToast,setShowDownloadToast]=useState(false);
  const [showDeletedToast,setShowDeletedToast]=useState(false);
  const [deleteText,setDeleteText]=useState("");
  const confirmerSuppressionCompte=()=>{
    if(deleteText!=="SUPPRIMER")return;
    setShowDeleteModal(false);
    setShowDeletedToast(true);
    setTimeout(()=>{ onDeleteAccount&&onDeleteAccount(); },1200);
  };
  const [legalModal,setLegalModal]=useState(null);
  const togglePref=(k)=>setDataPrefs(prev=>({...prev,[k]:!prev[k]}));
  const handleDownload=()=>{setShowDownloadToast(true);setTimeout(()=>setShowDownloadToast(false),3000);};
  const LEGAL={
    politique:{titre:"Politique de confidentialite",txt:"Parent'Hèse collecte uniquement les donnees necessaires au fonctionnement de l application (email, preferences, contributions). Vos donnees ne sont jamais vendues a des tiers. Conformement au RGPD, vous pouvez demander l acces, la modification ou la suppression de vos donnees a tout moment via support@parentales.fr"},
    conditions:{titre:"Conditions d utilisation",txt:"En utilisant Parent'Hèse, vous acceptez de ne pas publier de contenus inappropries, faux ou trompeurs. Les contenus soumis par les utilisateurs sont moderes avant publication. Parent'Hèse se reserve le droit de supprimer tout contenu ne respectant pas ces conditions."},
    cookies:{titre:"Cookies",txt:"Parent'Hèse utilise des cookies techniques necessaires au fonctionnement de l app et des cookies analytiques (desactivables) pour ameliorer l experience utilisateur. Aucun cookie publicitaire n est utilise."},
  };
  const PrefRow=({icon,iconBg,title,sub,k,last=false})=>(
    <div style={{padding:"13px 16px",display:"flex",alignItems:"center",gap:13,borderBottom:last?"none":"1px solid rgba(108,92,231,0.07)"}}>
      <div style={{width:42,height:42,borderRadius:12,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
      <div style={{flex:1}}>
        <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>{title}</p>
        <p style={{margin:0,fontSize:11,color:TM}}>{sub}</p>
      </div>
      <Toggle on={dataPrefs[k]} onChange={()=>togglePref(k)}/>
    </div>
  );
  const LinkRow=({icon,iconBg,title,sub,onClick,danger=false,last=false})=>(
    <div onClick={onClick} style={{padding:"13px 16px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",borderBottom:last?"none":"1px solid rgba(108,92,231,0.07)"}}>
      <div style={{width:42,height:42,borderRadius:12,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
      <div style={{flex:1}}>
        <p style={{margin:0,fontSize:13,fontWeight:700,color:danger?"#A32D2D":TX}}>{title}</p>
        <p style={{margin:0,fontSize:11,color:TM}}>{sub}</p>
      </div>
      <span style={{color:danger?"#A32D2D":TM,fontSize:16}}>›</span>
    </div>
  );
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:24}}>
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <p style={{flex:1,textAlign:"center",margin:0,fontSize:16,fontWeight:800,color:TX}}>Confidentialite</p>
        <div style={{width:36}}/>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        <div style={{background:"#EEEDFE",borderRadius:12,padding:12,marginBottom:14}}>
          <p style={{margin:0,fontSize:12,color:"#3C3489",lineHeight:1.5}}>🔒 Vos donnees sont protegees conformement au RGPD. Parent'Hèse ne vend jamais vos donnees personnelles.</p>
        </div>
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>👤 Mes donnees</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:14}}>
          <LinkRow icon="📋" iconBg="#EEEDFE" title="Telecharger mes donnees" sub="Recevoir une copie de toutes vos donnees" onClick={handleDownload}/>
          <LinkRow icon="🗑️" iconBg="#FCEBEB" title="Supprimer mon compte" sub="Supprime definitivement votre compte et vos donnees" onClick={()=>setShowDeleteModal(true)} danger last/>
        </div>
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>🍪 Preferences de donnees</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:14}}>
          <PrefRow icon="📊" iconBg="#EAF3DE" title="Statistiques d utilisation" sub="Nous aider a ameliorer l app" k="statistiques"/>
          <PrefRow icon="🎯" iconBg="#FAEEDA" title="Personnalisation" sub="Suggestions adaptees a votre profil" k="personnalisation" last/>
        </div>
        <p style={{fontSize:13,fontWeight:800,color:TX,margin:"0 0 8px"}}>📄 Documents legaux</p>
        <div style={{background:WH,borderRadius:16,border:BD,overflow:"hidden",marginBottom:20}}>
          <LinkRow icon="📜" iconBg="#EEEDFE" title="Politique de confidentialite" sub="Comment nous utilisons vos donnees" onClick={()=>setLegalModal("politique")}/>
          <LinkRow icon="📋" iconBg="#EEEDFE" title="Conditions d utilisation" sub="Les regles d utilisation de Parent'Hèse" onClick={()=>setLegalModal("conditions")}/>
          <LinkRow icon="🍪" iconBg="#EEEDFE" title="Gestion des cookies" sub="Vos preferences de cookies" onClick={()=>setLegalModal("cookies")} last/>
        </div>
        <p style={{textAlign:"center",fontSize:12,color:"#C0B8C8",lineHeight:1.5}}>💡 Les notifications push seront activees lors du telechargement de l application.</p>
      </div>
      {showDownloadToast&&(
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
          📧 Un email vous sera envoye avec vos donnees sous 48h.
        </div>
      )}
      {showDeletedToast&&(
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#374151",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
          🗑️ Compte supprimé
        </div>
      )}
      {showDeleteModal&&(
        <div onClick={()=>setShowDeleteModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <div style={{textAlign:"center",marginBottom:16}}><span style={{fontSize:48}}>🗑️</span></div>
            <p style={{margin:"0 0 10px",fontSize:16,fontWeight:800,color:"#A32D2D",textAlign:"center"}}>Supprimer mon compte ?</p>
            <p style={{margin:"0 0 16px",fontSize:13,color:TM,lineHeight:1.6,textAlign:"center"}}>Cette action est irreversible. Toutes vos donnees, favoris et contributions seront definitivement supprimes.</p>
            <input value={deleteText} onChange={e=>setDeleteText(e.target.value)} placeholder='Tapez SUPPRIMER pour confirmer' style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E7EB",fontSize:13,marginBottom:12,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
            <button onClick={confirmerSuppressionCompte} disabled={deleteText!=="SUPPRIMER"} style={{width:"100%",padding:"12px 0",borderRadius:28,background:deleteText==="SUPPRIMER"?"#DC2626":"#E5E7EB",border:"none",color:deleteText==="SUPPRIMER"?WH:"#9CA3AF",fontWeight:700,fontSize:14,cursor:deleteText==="SUPPRIMER"?"pointer":"not-allowed",marginBottom:10,transition:"all 0.2s"}}>
              Supprimer definitivement
            </button>
            <button onClick={()=>setShowDeleteModal(false)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:TX,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
          </div>
        </div>
      )}
      {legalModal&&(
        <div onClick={()=>setLegalModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:390,maxHeight:"80vh",overflowY:"auto",boxShadow:"0 -4px 32px rgba(0,0,0,0.12)"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 20px"}}/>
            <p style={{margin:"0 0 14px",fontSize:16,fontWeight:800,color:V}}>{LEGAL[legalModal].titre}</p>
            <p style={{margin:"0 0 24px",fontSize:13,color:TM,lineHeight:1.7}}>{LEGAL[legalModal].txt}</p>
            <button onClick={()=>setLegalModal(null)} style={{width:"100%",padding:"13px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GESTION ENFANTS ──────────────────────────────────────────────────────────

const COULEURS_ENFANT=["#6C5CE7","#10B981","#F97316","#EC4899","#3B82F6","#F59E0B"];
const EMOJIS_ENFANT=["👦","👧","🧒","👼","🐣","⭐"];
const PROFILS_TND=[
  {val:"TSA",label:"🧩 TSA",sub:"Troubles du spectre autistique",color:"#8B5CF6"},
  {val:"TDAH",label:"⚡ TDAH",sub:"Déficit de l'attention",color:"#EC4899"},
  {val:"DYS",label:"📖 DYS",sub:"Troubles dys",color:"#06B6D4"},
  {val:"Neurotypique",label:"🌱 Neurotypique",sub:"",color:"#10B981"},
  {val:"BasAge",label:"👶 Bas âge",sub:"Moins de 4 ans",color:"#F59E0B"},
  {val:"PMR",label:"♿ Mobilité réduite",sub:"",color:"#6366F1"},
];
const niveauColor=(v)=>v<=40?"#10B981":v<=70?"#F59E0B":"#EF4444";

function SensorialSlider({label,icon,value,onChange}){
  const c=niveauColor(value);
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:13,color:TX}}>{icon} {label}</span>
        <span style={{fontSize:11,fontWeight:700,color:c,background:c+"18",padding:"2px 8px",borderRadius:8}}>{value}%</span>
      </div>
      <input type="range" min="0" max="100" value={value} onChange={e=>onChange(+e.target.value)}
        style={{width:"100%",height:6,borderRadius:3,accentColor:c,cursor:"pointer"}}/>
    </div>
  );
}

function FormulaireEnfant({enfant,onSave,onCancel,isPremium=false,onOpenPremium}){
  const [form,setForm]=useState(enfant?{
    ...enfant,
    niveauxSensoriels:enfant.niveauxSensoriels||{bruit:50,lumiere:50,foule:50,imprevu:50},
    besoins:enfant.besoins||[],
    notesParent:enfant.notesParent||"",
  }:{
    prenom:"",age:0,emoji:"👦",couleur:"#6C5CE7",profils:[],
    niveauxSensoriels:{bruit:50,lumiere:50,foule:50,imprevu:50},
    besoins:[],notesParent:"",
  });
  const toggleProfil=(v)=>setForm(p=>({...p,profils:p.profils.includes(v)?p.profils.filter(x=>x!==v):[...p.profils,v]}));
  const toggleBesoin=(v)=>setForm(p=>({...p,besoins:(p.besoins||[]).includes(v)?(p.besoins||[]).filter(x=>x!==v):[...(p.besoins||[]),v]}));

  // Besoins disponibles selon profils sélectionnés
  const BESOINS_PAR_PROFIL={
    TSA:[
      "Peu de bruit","Lumière douce","Espace de retrait possible","Pas de foule","Transitions préparées","Emploi du temps visuel","Peu d'imprévus","Rituel d'entrée/sortie","Personnel formé TSA",
    ],
    TDAH:[
      "Activité physique possible","Grand espace","Peu d'attente","Stimulation variée","Pauses fréquentes","Règles simples","Retour rapide","Activité courte",
    ],
    DYS:[
      "Supports visuels","Pas de lecture requise","Rythme libre","Pas de contrainte d'écriture","Instructions orales","Personnel formé DYS",
    ],
    Haut_potentiel:[
      "Activité stimulante","Complexité adaptée","Autonomie possible","Défis intellectuels",
    ],
    Troubles_anxieux:[
      "Environnement prévisible","Pas de surprise","Cadre rassurant","Possibilité de quitter","Peu de monde",
    ],
  };

  const tousBesoins=[...new Set(form.profils.flatMap(p=>BESOINS_PAR_PROFIL[p]||[]))];

  return(
    <div style={{background:BG,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",padding:"16px 16px 12px",background:WH,borderBottom:BD,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TX,padding:"0 10px 0 0"}}>←</button>
        <p style={{margin:0,fontSize:17,fontWeight:700,color:TX,flex:1,textAlign:"center"}}>{enfant?"Modifier le profil":"Ajouter un enfant"}</p>
        <div style={{width:40}}/>
      </div>
      <div style={{padding:"20px 16px",maxHeight:"calc(100vh - 60px)",overflowY:"auto"}}>

        {/* Informations de base */}
        <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:12,border:BD}}>
          <p style={{margin:"0 0 10px",fontSize:14,fontWeight:700,color:TX}}>Informations</p>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Prénom *</label>
            <input value={form.prenom||""} onChange={e=>setForm(p=>({...p,prenom:e.target.value}))} placeholder="Ex : Lucas" style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`2px solid ${form.prenom?V:"rgba(108,92,231,0.15)"}`,fontSize:14,color:TX,background:BG,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Âge *</label>
            <select value={form.age} onChange={e=>setForm(p=>({...p,age:+e.target.value}))} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:BD,fontSize:14,color:TX,background:BG,outline:"none"}}>
              {Array.from({length:18},(_,i)=><option key={i} value={i}>{i===0?"0 an":i===1?"1 an":`${i} ans`}</option>)}
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:12,color:TM,display:"block",marginBottom:8}}>Emoji</label>
            <div style={{display:"flex",gap:8}}>{EMOJIS_ENFANT.map(e=><button key={e} onClick={()=>setForm(p=>({...p,emoji:e}))} style={{width:44,height:44,borderRadius:12,border:`2px solid ${form.emoji===e?V:"rgba(0,0,0,0.08)"}`,background:form.emoji===e?VL:WH,fontSize:22,cursor:"pointer"}}>{e}</button>)}</div>
          </div>
          <div>
            <label style={{fontSize:12,color:TM,display:"block",marginBottom:8}}>Couleur</label>
            <div style={{display:"flex",gap:10}}>{COULEURS_ENFANT.map(c=><button key={c} onClick={()=>setForm(p=>({...p,couleur:c}))} style={{width:32,height:32,borderRadius:"50%",background:c,border:form.couleur===c?"3px solid #fff":"2px solid transparent",outline:form.couleur===c?`2px solid ${c}`:"none",cursor:"pointer"}}/>)}</div>
          </div>
        </div>

        {/* Profil TND */}
        <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:12,border:BD}}>
          <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>🧩 Profil TND</p>
          <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Sélectionne le ou les profils de ton enfant</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              ...PROFILS_TND,
              {val:"Haut_potentiel",label:"🌟 Haut potentiel (HPI/HPE)",color:"#F59E0B",sub:"Intellectuellement ou émotionnellement précoce"},
              {val:"Troubles_anxieux",label:"😰 Troubles anxieux",color:"#06B6D4",sub:"Anxiété, phobie scolaire..."},
            ].map(p=>{
              const active=form.profils.includes(p.val);
              return(
                <button key={p.val} onClick={()=>toggleProfil(p.val)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:12,border:`2px solid ${active?p.color:"rgba(0,0,0,0.08)"}`,background:active?p.color+"15":BG,cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontSize:14,fontWeight:700,color:active?p.color:TM}}>{p.label}</span>
                  {p.sub&&<span style={{fontSize:11,color:TM}}>{p.sub}</span>}
                  {active&&<span style={{marginLeft:"auto",fontSize:12,color:p.color}}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Niveaux sensoriels */}
        <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:12,border:BD}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>🎚️ Profil sensoriel</p>
            {!isPremium&&<span style={{fontSize:10,background:VL,color:V,borderRadius:10,padding:"2px 8px",fontWeight:600}}>⭐ Premium</span>}
          </div>
          <p style={{margin:"0 0 14px",fontSize:12,color:TM}}>Le générateur adaptera automatiquement ses suggestions à ces niveaux</p>
          {isPremium?(
            [
              {k:"bruit",icon:"🔊",label:"Tolérance au bruit",left:"Très sensible",right:"Tolère bien"},
              {k:"lumiere",icon:"💡",label:"Tolérance à la lumière",left:"Très sensible",right:"Tolère bien"},
              {k:"foule",icon:"👥",label:"Tolérance à la foule",left:"Très sensible",right:"Tolère bien"},
              {k:"imprevu",icon:"❓",label:"Tolérance à l'imprévu",left:"Besoin de routine",right:"Aime la spontanéité"},
            ].map(({k,icon,label,left,right})=>{
              const val=form.niveauxSensoriels[k]||50;
              const col=val<=30?"#EF4444":val<=60?"#F59E0B":"#10B981";
              const badge=val<=30?"Très sensible":val<=60?"Modéré":"Tolère bien";
              return(
                <div key={k} style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:600,color:TX}}>{icon} {label}</span>
                    <span style={{fontSize:11,fontWeight:700,color:col,background:col+"18",padding:"2px 10px",borderRadius:20}}>{badge}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:9,color:TM,width:60,flexShrink:0,textAlign:"right"}}>{left}</span>
                    <div style={{flex:1,height:5,background:"#E5E7EB",borderRadius:6,overflow:"hidden"}}>
                      <div style={{height:"100%",width:val+"%",background:col,borderRadius:6,transition:"width 0.2s"}}/>
                    </div>
                    <span style={{fontSize:9,color:TM,width:60,flexShrink:0}}>{right}</span>
                  </div>
                  <input type="range" min={0} max={100} value={val} onChange={e=>setForm(p=>({...p,niveauxSensoriels:{...p.niveauxSensoriels,[k]:Number(e.target.value)}}))} style={{width:"100%",marginTop:4,accentColor:col,cursor:"pointer"}}/>
                </div>
              );
            })
          ):(
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <p style={{fontSize:12,color:TM,margin:"0 0 10px"}}>Le carnet sensoriel est une fonctionnalité Premium</p>
              <button onClick={()=>onOpenPremium&&onOpenPremium()} style={{padding:"8px 20px",borderRadius:28,background:V,border:"none",color:WH,fontWeight:600,fontSize:12,cursor:"pointer"}}>⭐ Découvrir Premium</button>
            </div>
          )}
        </div>

        {/* Besoins spécifiques selon profil */}
        {isPremium&&tousBesoins.length>0&&(
          <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:12,border:BD}}>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>✅ Besoins spécifiques</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Cochez ce qui correspond à votre enfant — le générateur en tiendra compte</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {tousBesoins.map(b=>{
                const actif=(form.besoins||[]).includes(b);
                return(
                  <button key={b} onClick={()=>toggleBesoin(b)} style={{padding:"8px 10px",borderRadius:10,border:`1.5px solid ${actif?V:"#E5E7EB"}`,background:actif?VL:BG,color:actif?V:TM,fontSize:11,fontWeight:actif?700:400,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:6}}>
                    <span>{actif?"☑":"☐"}</span>{b}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button onClick={()=>{if(!form.prenom)return;onSave(form);}} style={{width:"100%",padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:10}}>Enregistrer</button>
        <button onClick={onCancel} style={{width:"100%",padding:14,borderRadius:28,background:WH,border:BD,color:TM,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
      </div>
    </div>
  );
}

function GestionEnfants({enfants,setEnfants,enfantActif,setEnfantActif,onBack,isPremium=false,onOpenPremium}){
  const [formMode,setFormMode]=useState(null); // null | 'add' | enfant object
  const [confirmDel,setConfirmDel]=useState(null);
  if(!isPremium){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",textAlign:"center",fontFamily:"system-ui,-apple-system,sans-serif"}}>
        <button onClick={onBack} style={{position:"absolute",top:16,left:16,background:WH,border:BD,borderRadius:"50%",width:36,height:36,fontSize:18,cursor:"pointer",color:TX}}>←</button>
        <div style={{fontSize:48,marginBottom:16}}>🔒</div>
        <p style={{margin:"0 0 8px",fontSize:16,fontWeight:700,color:TX}}>Fonctionnalité Premium</p>
        <p style={{margin:"0 0 24px",fontSize:13,color:TM,lineHeight:1.5}}>La gestion des profils enfants (TND, niveaux sensoriels...) est réservée aux membres Premium.</p>
        <button onClick={()=>onOpenPremium&&onOpenPremium()} style={{padding:"13px 28px",borderRadius:28,background:"#6C5CE7",border:"none",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>Débloquer avec Premium ⭐</button>
      </div>
    );
  }
  const save=(data)=>{
    if(formMode==="add") setEnfants(prev=>[...prev,{...data,id:Date.now().toString()}]);
    else setEnfants(prev=>prev.map(e=>e.id===formMode.id?{...e,...data}:e));
    setFormMode(null);
  };
  if(formMode) return <FormulaireEnfant enfant={formMode==="add"?null:formMode} onSave={save} onCancel={()=>setFormMode(null)} isPremium={isPremium} onOpenPremium={onOpenPremium}/>;
  return(
    <div style={{background:BG,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",padding:"16px 16px 12px",background:WH,borderBottom:BD,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TX,padding:"0 10px 0 0"}}>←</button>
        <p style={{margin:0,fontSize:17,fontWeight:700,color:TX,flex:1,textAlign:"center"}}>Mes enfants</p>
        {enfants.length<(isPremium?6:2)?(
          <button onClick={()=>setFormMode("add")} style={{width:34,height:34,borderRadius:"50%",background:V,border:"none",color:WH,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        ):!isPremium&&enfants.length>=2?(
          <button onClick={()=>onOpenPremium&&onOpenPremium()} style={{fontSize:11,background:"#FEF3C7",border:"none",borderRadius:20,padding:"4px 10px",color:"#92400E",cursor:"pointer",fontWeight:600}}>⭐ Max 2</button>
        ):(
          <div style={{width:34}}/>
        )}
      </div>
      <div style={{padding:"16px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {enfants.map(e=>{
            const isActif=e.id===enfantActif;
            return(
              <div key={e.id} style={{background:WH,borderRadius:18,padding:"16px",border:`2px solid ${isActif?(e.couleur||"#6C5CE7")+"66":"rgba(0,0,0,0.06)"}`,position:"relative"}}>
                {isActif&&<div style={{position:"absolute",top:10,right:10,background:(e.couleur||"#6C5CE7"),color:WH,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10}}>Actif</div>}
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:(e.couleur||"#6C5CE7")+"22",border:`3px solid ${e.couleur||"#6C5CE7"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{e.emoji||"👦"}</div>
                  <div style={{flex:1}}>
                    <p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX}}>{e.prenom||"Enfant"}, {e.age||0} an{(e.age||0)>1?"s":""}</p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {(e.profils||[]).map(p=>{const pt=PROFILS_TND.find(x=>x.val===p);return (<span key={p} style={{fontSize:10,background:pt?pt.color+"18":"#EDE9FF",color:pt?pt.color:V,padding:"1px 8px",borderRadius:8,fontWeight:600}}>{pt?pt.label:p}</span>);})}
                    </div>
                  </div>
                </div>
                {/* Niveaux sensoriels — affichage visuel */}
                {(()=>{
                  const niv=e.niveauxSensoriels||{};
                  const items=[["🔊","Bruit","bruit"],["💡","Lumière","lumiere"],["👥","Foule","foule"],["❓","Imprévu","imprevu"]];
                  const hasData=items.some(([,,k])=>(niv[k]||0)!==0);
                  if(!hasData)return<p style={{fontSize:11,color:TM,margin:"0 0 8px",fontStyle:"italic"}}>Carnet sensoriel non renseigné</p>;
                  return(
                    <div style={{marginBottom:10}}>
                      <p style={{fontSize:10,fontWeight:700,color:TM,margin:"0 0 6px",textTransform:"uppercase",letterSpacing:"0.05em"}}>Profil sensoriel</p>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
                        {items.map(([ico,lbl,key])=>{
                          const v=(niv[key]||0);
                          const label=v<=30?"Sensible":v<=60?"Modéré":"Tolérant";
                          const bg=v<=30?"#FEE2E2":v<=60?"#FEF3C7":"#D1FAE5";
                          const col=v<=30?"#DC2626":v<=60?"#D97706":"#065F46";
                          return(
                            <div key={key} style={{display:"flex",alignItems:"center",gap:6,background:bg,borderRadius:8,padding:"4px 8px"}}>
                              <span style={{fontSize:14,flexShrink:0}}>{ico}</span>
                              <div style={{flex:1,minWidth:0}}>
                                <p style={{margin:0,fontSize:10,fontWeight:700,color:col}}>{label}</p>
                                <p style={{margin:0,fontSize:9,color:col,opacity:0.8}}>{lbl}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
                <div style={{display:"flex",gap:8}}>
                  {!isActif&&<button onClick={()=>setEnfantActif(e.id)} style={{flex:1,padding:"8px 0",borderRadius:20,background:(e.couleur||"#6C5CE7")+"18",border:`1.5px solid ${(e.couleur||"#6C5CE7")}44`,color:(e.couleur||"#6C5CE7"),fontSize:12,fontWeight:700,cursor:"pointer"}}>Sélectionner</button>}
                  <button onClick={()=>setFormMode(e)} style={{flex:1,padding:"8px 0",borderRadius:20,background:BG,border:BD,color:TX,fontSize:12,fontWeight:600,cursor:"pointer"}}>✏️ Modifier</button>
                  {enfants.length>1&&<button onClick={()=>setConfirmDel(e.id)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(239,68,68,0.08)",border:"none",color:"#EF4444",fontSize:14,cursor:"pointer"}}>🗑️</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Confirm delete */}
      {confirmDel&&(
        <div onClick={()=>setConfirmDel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,maxWidth:300,width:"100%"}}>
            <p style={{margin:"0 0 8px",fontSize:16,fontWeight:700,color:TX,textAlign:"center"}}>Supprimer ce profil ?</p>
            <p style={{margin:"0 0 20px",fontSize:13,color:TM,textAlign:"center"}}>Cette action est irréversible.</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDel(null)} style={{flex:1,padding:12,borderRadius:28,background:BG,border:BD,color:TM,fontWeight:600,cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{setEnfants(prev=>prev.filter(e=>e.id!==confirmDel));if(enfantActif===confirmDel)setEnfantActif(enfants.find(e=>e.id!==confirmDel)?.id||"");setConfirmDel(null);}} style={{flex:1,padding:12,borderRadius:28,background:"#EF4444",border:"none",color:WH,fontWeight:700,cursor:"pointer"}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EnfantMultiSelecteur({enfants,selection,setSelection}){
  const [open,setOpen]=useState(false);
  const toggle=(id)=>setSelection(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const choisis=enfants.filter(e=>selection.includes(e.id));
  const coul=choisis.length>0?choisis[0].couleur:V;
  const label=choisis.length===0?"Choisir des enfants":choisis.length===1?choisis[0].prenom:choisis.length+" enfants";
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px 4px 4px",borderRadius:20,background:coul+"18",border:`1.5px solid ${coul}44`,cursor:"pointer"}}>
        <div style={{display:"flex"}}>
          {choisis.length>0?choisis.slice(0,3).map((e,i)=>(
            <div key={e.id} style={{width:26,height:26,borderRadius:"50%",background:(e.couleur||"#6C5CE7")+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:i>0?-8:0,border:"2px solid "+WH}}>{e.emoji||"👦"}</div>
          )):<div style={{width:26,height:26,borderRadius:"50%",background:coul+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>👶</div>}
        </div>
        <span style={{fontSize:12,fontWeight:600,color:coul}}>{label}</span>
        <span style={{fontSize:10,color:coul}}>▾</span>
      </button>
      {open&&(
        <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:400}} />
      )}
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:WH,borderRadius:14,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:BD,zIndex:500,minWidth:200,overflow:"hidden"}}>
          {enfants.map(e=>{
            const checked=selection.includes(e.id);
            return(
              <button key={e.id} onClick={()=>toggle(e.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:checked?(e.couleur||"#6C5CE7")+"12":WH,border:"none",cursor:"pointer",borderBottom:BD}}>
                <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${checked?(e.couleur||"#6C5CE7"):"rgba(0,0,0,0.15)"}`,background:checked?(e.couleur||"#6C5CE7"):"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {checked&&<span style={{fontSize:11,color:WH}}>✓</span>}
                </div>
                <div style={{width:26,height:26,borderRadius:"50%",background:(e.couleur||"#6C5CE7")+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{e.emoji||"👦"}</div>
                <span style={{fontSize:13,fontWeight:600,color:checked?(e.couleur||"#6C5CE7"):TX}}>{e.prenom}</span>
              </button>
            );
          })}
          {enfants.length>1&&(
            <button onClick={()=>setSelection(selection.length===enfants.length?[]:enfants.map(e=>e.id))} style={{width:"100%",padding:"9px 14px",background:BG2,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,color:V}}>
              {selection.length===enfants.length?"Tout désélectionner":"Tout sélectionner"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PICTOGRAMMES — Emploi du temps visuel pour enfants TND
// ============================================================
const PICTO_BG = "#F5F0EB";

const bibliothequePictogrammes = [
  { id: 'p1',  emoji: '🚗', label: 'Trajet voiture' },
  { id: 'p2',  emoji: '🚶', label: 'Marcher' },
  { id: 'p3',  emoji: '🚪', label: 'Arrivée' },
  { id: 'p4',  emoji: '🎫', label: 'Billet / entrée' },
  { id: 'p5',  emoji: '🤫', label: 'Être calme' },
  { id: 'p6',  emoji: '🍽️', label: 'Repas' },
  { id: 'p7',  emoji: '🚻', label: 'Toilettes' },
  { id: 'p8',  emoji: '⏳', label: 'Attendre' },
  { id: 'p9',  emoji: '🎁', label: 'Boutique' },
  { id: 'p10', emoji: '🚙', label: 'Retour maison' },
  { id: 'p11', emoji: '⏰', label: 'Réveil' },
  { id: 'p12', emoji: '🪥', label: 'Brossage dents' },
  { id: 'p13', emoji: '👕', label: "S'habiller" },
  { id: 'p14', emoji: '🥣', label: 'Petit déjeuner' },
  { id: 'p15', emoji: '🎒', label: 'Sac école' },
  { id: 'p16', emoji: '🏫', label: 'École' },
  { id: 'p17', emoji: '🍪', label: 'Goûter' },
  { id: 'p18', emoji: '📚', label: 'Devoirs' },
  { id: 'p19', emoji: '🎮', label: 'Temps de jeu' },
  { id: 'p20', emoji: '🛁', label: 'Bain' },
  { id: 'p21', emoji: '📖', label: 'Histoire du soir' },
  { id: 'p22', emoji: '😴', label: 'Dormir' },
  { id: 'p23', emoji: '🖼️', label: 'Visiter une salle' },
  { id: 'p24', emoji: '📸', label: 'Prendre une photo' },
  { id: 'p25', emoji: '🌳', label: 'Aller dehors' },
];

const templateJournee = [
  { emoji: '⏰', label: 'Réveil' },
  { emoji: '🪥', label: 'Brossage dents' },
  { emoji: '👕', label: "S'habiller" },
  { emoji: '🥣', label: 'Petit déjeuner' },
  { emoji: '🎒', label: 'Sac école' },
  { emoji: '🏫', label: 'École' },
  { emoji: '🍪', label: 'Goûter' },
  { emoji: '📚', label: 'Devoirs' },
  { emoji: '🎮', label: 'Temps de jeu' },
  { emoji: '🛁', label: 'Bain' },
  { emoji: '📖', label: 'Histoire du soir' },
  { emoji: '😴', label: 'Dormir' },
];

// ─── Pictogrammes générés à partir de catégories génériques de sorties ─────
const CATEGORIES_SORTIE_PICTO = [
  { type: "Parc", label: "Parc", emoji: "🌳" },
  { type: "Parc d attraction", label: "Parc d'attractions", emoji: "🎢" },
  { type: "Zoo", label: "Zoo", emoji: "🦁" },
  { type: "Musee", label: "Musée", emoji: "🏛️" },
  { type: "Aquarium", label: "Aquarium", emoji: "🐠" },
  { type: "Piscine", label: "Piscine", emoji: "🏊" },
  { type: "Plage", label: "Plage", emoji: "🏖️" },
  { type: "Ferme pedagogique", label: "Ferme pédagogique", emoji: "🐄" },
  { type: "Bowling", label: "Bowling", emoji: "🎳" },
  { type: "Cinema", label: "Cinéma", emoji: "🎬" },
  { type: "Patinoire", label: "Patinoire", emoji: "⛸️" },
  { type: "Escape game", label: "Escape game", emoji: "🔍" },
  { type: "Restaurant", label: "Restaurant", emoji: "🍽️" },
  { type: "Balade", label: "Balade", emoji: "🚶" },
  { type: "Evenement", label: "Événement", emoji: "🎉" },
];

const templatesParTypeSortie = {
  "Parc d attraction": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend les billets' },
    { emoji: '🎢', label: 'On fait des attractions' },
    { emoji: '🍽️', label: 'On fait une pause repas' },
    { emoji: '🎁', label: 'On passe à la boutique' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Zoo": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend les billets' },
    { emoji: '🚶', label: 'On regarde les animaux' },
    { emoji: '🍽️', label: 'On pique-nique' },
    { emoji: '🎁', label: 'On passe à la boutique' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Musee": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend les billets' },
    { emoji: '🖼️', label: 'On visite les salles' },
    { emoji: '🤫', label: 'On parle doucement' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Piscine": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👕', label: 'On se change' },
    { emoji: '🏊', label: 'On se baigne' },
    { emoji: '🚻', label: 'On se douche' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Ferme pedagogique": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🐄', label: 'On regarde les animaux' },
    { emoji: '🤫', label: 'On reste calme près des animaux' },
    { emoji: '🍽️', label: 'On pique-nique' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Bowling": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👟', label: 'On met les chaussures spéciales' },
    { emoji: '🎳', label: 'On joue au bowling' },
    { emoji: '⏳', label: "On attend son tour calmement" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Plage": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👕', label: 'On se change' },
    { emoji: '🌳', label: 'On va sur le sable' },
    { emoji: '🤫', label: "On reste calme près de l'eau" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Escape game": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🚪', label: 'On arrive et on écoute les règles' },
    { emoji: '🤫', label: 'On cherche les indices calmement' },
    { emoji: '⏳', label: 'On a un temps limité' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  "Parc": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🌳', label: 'On arrive au parc' },
    { emoji: '🛝', label: 'On joue aux jeux' },
    { emoji: '🧃', label: 'On fait une pause goûter' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Balade": [
    { emoji: '👟', label: 'On met les chaussures' },
    { emoji: '🚶', label: 'On part en balade' },
    { emoji: '🔍', label: 'On observe la nature' },
    { emoji: '💧', label: 'On boit de l\'eau' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Cinema": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎬', label: 'On arrive au cinéma' },
    { emoji: '🤫', label: 'On reste calme pendant le film' },
    { emoji: '🍿', label: 'On mange du pop-corn' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Patinoire": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '⛸️', label: 'On met les patins' },
    { emoji: '🧊', label: 'On patine doucement' },
    { emoji: '🤝', label: 'On s\'aide si besoin' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Restaurant": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🍽️', label: 'On s\'installe au restaurant' },
    { emoji: '🤫', label: 'On parle doucement' },
    { emoji: '🍕', label: 'On mange le repas' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Aquarium": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🐠', label: 'On arrive à l\'aquarium' },
    { emoji: '🔇', label: 'On reste calme (il fait sombre)' },
    { emoji: '🐟', label: 'On observe les poissons' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  "Evenement": [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎉', label: 'On arrive à l\'événement' },
    { emoji: '👀', label: 'On regarde et on écoute' },
    { emoji: '😊', label: 'C\'est fini, bravo !' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
};
const templateSortieGenerique = [
  { emoji: '🚗', label: 'On prend la voiture' },
  { emoji: '🚪', label: 'On arrive sur place' },
  { emoji: '🤫', label: 'On reste calme' },
  { emoji: '🚙', label: 'On rentre à la maison' },
];

const EVT_EMOJI_PAR_CATEGORIE = Object.fromEntries(EVT_CATEGORIES.map(c => [c.k, c.emoji]));

const templatesParCategorieEvt = {
  kermesse: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🚪', label: 'On arrive sur place' },
    { emoji: '🎪', label: 'On fait des jeux' },
    { emoji: '🍪', label: 'On goûte aux stands gourmands' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  fete_village: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎉', label: 'On profite des animations' },
    { emoji: '🍽️', label: 'On mange ensemble' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  spectacle: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend les billets' },
    { emoji: '🤫', label: "On s'assoit et on est calme" },
    { emoji: '🎭', label: 'On regarde le spectacle' },
    { emoji: '👏', label: 'On applaudit à la fin' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  marche_noel: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🚶', label: 'On marche entre les stands' },
    { emoji: '🍪', label: 'On goûte une douceur' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  chasse_oeufs: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🥚', label: 'On cherche les œufs' },
    { emoji: '🤫', label: 'On attend calmement son tour' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  halloween: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎭', label: 'On met son déguisement' },
    { emoji: '🍬', label: 'On participe aux jeux ou à la collecte' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  atelier: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🚪', label: "On arrive et on s'installe" },
    { emoji: '🎨', label: 'On crée notre activité' },
    { emoji: '🧹', label: 'On range à la fin' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  medieval: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend les billets' },
    { emoji: '🐴', label: 'On regarde le spectacle' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  foire_agri: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🚜', label: 'On regarde les animaux et les machines' },
    { emoji: '🤫', label: 'On reste calme près des animaux' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  fete_foraine: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🎫', label: 'On prend des tickets' },
    { emoji: '🎡', label: 'On fait des attractions' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  cinema_plein_air: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '🧺', label: 'On installe la couverture' },
    { emoji: '🤫', label: 'On reste calme pendant le film' },
    { emoji: '🎬', label: 'On regarde le film' },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  salon_jeunesse: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '📚', label: 'On regarde les livres' },
    { emoji: '🤫', label: "On reste calme s'il y a du monde" },
    { emoji: '🚙', label: 'On rentre à la maison' },
  ],
  cirque: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👕', label: 'On s\'habille' },
    { emoji: '🤹', label: 'On va au cirque' },
    { emoji: '🎪', label: 'On regarde le spectacle' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  concert: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👕', label: 'On s\'habille' },
    { emoji: '🎵', label: 'On va au concert' },
    { emoji: '🎤', label: 'On écoute la musique' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  sport: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👟', label: 'On met les baskets' },
    { emoji: '🏃', label: 'On va voir le sport' },
    { emoji: '🏆', label: 'On regarde la compétition' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
  autre: [
    { emoji: '🚗', label: 'On prend la voiture' },
    { emoji: '👕', label: 'On s\'habille' },
    { emoji: '🎉', label: 'On participe à l\'événement' },
    { emoji: '😊', label: 'C\'est fini, bravo !' },
    { emoji: '🏠', label: 'On rentre à la maison' },
  ],
};
const templateEvtGenerique = [
  { emoji: '🚗', label: 'On prend la voiture' },
  { emoji: '🚪', label: 'On arrive sur place' },
  { emoji: '🤫', label: 'On reste calme' },
  { emoji: '🚙', label: 'On rentre à la maison' },
];

function PictogrammeView({ onBack, isPremium = false, onOpenPremium, adminEvenements=[], pendingContribs=[] }) {
  const [mode, setMode] = useState(null); // null | 'sortie' | 'evenement' | 'journee'
  const [sortieChoisie, setSortieChoisie] = useState(''); // type générique de la sortie choisie (ex: "Zoo")
  const [evenementChoisi, setEvenementChoisi] = useState(''); // id de l'événement choisi
  const [etapes, setEtapes] = useState([]);
  const [showBibliotheque, setShowBibliotheque] = useState(false);
  const [etapeARemplacer, setEtapeARemplacer] = useState(null);
  const [showImpression, setShowImpression] = useState(false);
  const [printMsg, setPrintMsg] = useState(false);

  if (!isPremium) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: WH, border: BD, borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: TX }}>←</button>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: TX }}>Fonctionnalité Premium</p>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: TM, lineHeight: 1.5 }}>L'emploi du temps en pictogrammes pour préparer une sortie, un événement ou la routine du jour est réservé aux membres Premium.</p>
        <button onClick={() => onOpenPremium && onOpenPremium()} style={{ padding: "13px 28px", borderRadius: 28, background: "#6C5CE7", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Débloquer avec Premium ⭐</button>
      </div>
    );
  }

  const approvedEvtsPicto=(pendingContribs||[]).filter(c=>c._type==="evenement"&&c._statut==="published");
  const adminEvtsPicto=(adminEvenements||[]).filter(e=>e.statut==="published").map(e=>({id:e.id,nom:e.titre,ville:e.ville||"",categorie:e.type||"autre"}));
  const tousEvenements=[...EVENEMENTS_INIT,...adminEvtsPicto,...approvedEvtsPicto];
  const categorieSortieSelectionnee = CATEGORIES_SORTIE_PICTO.find(c => c.type === sortieChoisie);
  const evenementSelectionne = tousEvenements.find(e => String(e.id) === String(evenementChoisi));
  const sousTitre = mode === 'journee'
    ? "Routine du jour"
    : mode === 'sortie'
      ? (categorieSortieSelectionnee ? categorieSortieSelectionnee.label : "Choisis une sortie")
      : mode === 'evenement'
        ? (evenementSelectionne ? evenementSelectionne.nom : "Choisis un événement")
        : "Routine du jour";

  const choisirModeSortie = () => {
    if (!isPremium) { onOpenPremium && onOpenPremium(); return; }
    setSortieChoisie('');
    setMode('sortie');
  };

  const choisirModeEvenement = () => {
    if (!isPremium) { onOpenPremium && onOpenPremium(); return; }
    setEvenementChoisi('');
    setMode('evenement');
  };

  const choisirModeJournee = () => {
    setMode('journee');
    setEtapes(templateJournee.map(e => ({ ...e })));
  };

  const choisirSortie = (type) => {
    if (!type) return;
    setSortieChoisie(type);
    const template = templatesParTypeSortie[type] || templateSortieGenerique;
    setEtapes(template.map(e => ({ ...e })));
  };

  const choisirEvenement = (id) => {
    if (!id) return;
    const ev = tousEvenements.find(x => String(x.id) === String(id));
    if (!ev) return;
    setEvenementChoisi(id);
    const template = templatesParCategorieEvt[ev.categorie] || templateEvtGenerique;
    setEtapes(template.map(e => ({ ...e })));
  };

  const ouvrirBibliothequeAjout = () => { setEtapeARemplacer(null); setShowBibliotheque(true); };
  const ouvrirBibliothequeRemplacer = (index) => { setEtapeARemplacer(index); setShowBibliotheque(true); };
  const fermerBibliotheque = () => { setShowBibliotheque(false); setEtapeARemplacer(null); };

  const choisirPictogramme = (pic) => {
    const nouvelleEtape = { emoji: pic.emoji, label: pic.label };
    setEtapes(prev => {
      if (etapeARemplacer !== null && etapeARemplacer < prev.length) {
        const copie = [...prev];
        copie[etapeARemplacer] = nouvelleEtape;
        return copie;
      }
      return [...prev, nouvelleEtape];
    });
    fermerBibliotheque();
  };

  const supprimerEtape = (index) => setEtapes(prev => prev.filter((_, i) => i !== index));

  const recommencer = () => {
    setMode(null);
    setSortieChoisie('');
    setEvenementChoisi('');
    setEtapes([]);
    setShowImpression(false);
  };

  const handleExport = () => {
    if (!isPremium) { onOpenPremium && onOpenPremium(); return; }
    setShowImpression(true);
  };

  const handlePrint = () => {
    try {
      if (typeof window !== "undefined" && typeof window.print === "function") {
        window.print();
      } else {
        setPrintMsg(true);
        setTimeout(() => setPrintMsg(false), 3000);
      }
    } catch (e) {
      setPrintMsg(true);
      setTimeout(() => setPrintMsg(false), 3000);
    }
  };

  return (
    <div style={{ background: PICTO_BG, minHeight: "100vh", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 16px 12px", background: WH, borderBottom: BD, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => onBack && onBack()} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: TX, padding: "0 10px 0 0" }}>←</button>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: TX, flex: 1, textAlign: "center" }}>Emploi du temps pictogrammes</p>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: "20px 16px 100px" }}>
        {mode === null && (
          <>
            <p style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: TX, textAlign: "center" }}>🧩 Crée un emploi du temps visuel</p>
            <p style={{ margin: "0 0 24px", fontSize: 13, color: TM, textAlign: "center" }}>Aide ton enfant à se préparer avec des pictogrammes</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={choisirModeSortie} style={{ width: "100%", background: WH, borderRadius: 16, border: BD, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", position: "relative", textAlign: "left" }}>
                <span style={{ fontSize: 30, flexShrink: 0 }}>🗺️</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: TX }}>Préparer une sortie</span>
                  {isPremium
                    ? <span style={{ fontSize: 11, color: TM }}>Choisis une sortie de ta bibliothèque</span>
                    : <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>Débloquer avec Premium ⭐</span>}
                </span>
                {!isPremium && <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>}
              </button>
              <button onClick={choisirModeEvenement} style={{ width: "100%", background: WH, borderRadius: 16, border: BD, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", position: "relative", textAlign: "left" }}>
                <span style={{ fontSize: 30, flexShrink: 0 }}>🎉</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: TX }}>Préparer un événement</span>
                  {isPremium
                    ? <span style={{ fontSize: 11, color: TM }}>Choisis un événement de ta bibliothèque</span>
                    : <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>Débloquer avec Premium ⭐</span>}
                </span>
                {!isPremium && <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>}
              </button>
              <button onClick={choisirModeJournee} style={{ width: "100%", background: WH, borderRadius: 16, border: BD, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 30, flexShrink: 0 }}>📅</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: TX }}>Routine de la journée</span>
                  <span style={{ fontSize: 11, color: TM }}>Matin, école, soir...</span>
                </span>
              </button>
            </div>
          </>
        )}

        {mode === 'sortie' && sortieChoisie === '' && (
          <div style={{ background: WH, borderRadius: 16, border: BD, padding: 18 }}>
            <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: TX, textAlign: "center" }}>Quel type de sortie veux-tu préparer ?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {CATEGORIES_SORTIE_PICTO.map(c => (
                <button key={c.type} onClick={() => choisirSortie(c.type)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 14, border: "1.5px solid rgba(0,0,0,0.08)", background: PICTO_BG, cursor: "pointer" }}>
                  <span style={{ fontSize: 28 }}>{c.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TX, textAlign: "center" }}>{c.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setMode(null)} style={{ marginTop: 14, width: "100%", background: "none", border: "none", color: TM, fontSize: 12, cursor: "pointer" }}>← Retour</button>
          </div>
        )}

        {mode === 'evenement' && evenementChoisi === '' && (
          <div style={{ background: WH, borderRadius: 16, border: BD, padding: 18 }}>
            <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: TX, textAlign: "center" }}>Quel événement veux-tu préparer ?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tousEvenements.map(ev => (
                <button key={ev.id} onClick={() => choisirEvenement(ev.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.08)", background: PICTO_BG, cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{EVT_EMOJI_PAR_CATEGORIE[ev.categorie] || customCatEvenements.find(c=>c.k===ev.categorie)?.emoji || "📍"}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: TX }}>{ev.nom}</span>
                    <span style={{ fontSize: 11, color: TM }}>{ev.ville}</span>
                  </span>
                </button>
              ))}
            </div>
            <button onClick={() => setMode(null)} style={{ marginTop: 14, width: "100%", background: "none", border: "none", color: TM, fontSize: 12, cursor: "pointer" }}>← Retour</button>
          </div>
        )}

        {etapes.length > 0 && (
          <>
            <div style={{ marginTop: mode === null ? 0 : 4, marginBottom: 16 }}>
              <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 800, color: TX }}>📋 Ton emploi du temps</p>
              <p style={{ margin: 0, fontSize: 12, color: TM }}>{sousTitre}</p>
            </div>

            <div>
              {etapes.map((etape, i) => (
                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < etapes.length - 1 ? 14 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 26, flexShrink: 0 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: V, color: WH, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    {i < etapes.length - 1 && <div style={{ flex: 1, width: 2, background: "rgba(108,92,231,0.2)", marginTop: 2 }} />}
                  </div>
                  <div style={{ flex: 1, background: WH, borderRadius: 14, border: BD, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 0, minHeight: 26 }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{etape.emoji}</span>
                    <span style={{ flex: 1, fontSize: 13, color: TX, fontWeight: 500 }}>{etape.label}</span>
                    <button onClick={() => ouvrirBibliothequeRemplacer(i)} title="Remplacer" style={{ background: "none", border: "none", fontSize: 15, cursor: "pointer", color: TM, padding: 4, flexShrink: 0 }}>🔄</button>
                    <button onClick={() => supprimerEtape(i)} title="Supprimer" style={{ background: "none", border: "none", fontSize: 15, cursor: "pointer", color: TM, padding: 4, flexShrink: 0 }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={ouvrirBibliothequeAjout} style={{ width: "100%", marginTop: 8, padding: "12px 0", borderRadius: 14, background: VL, border: "none", color: V, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>➕ Ajouter une étape</button>

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {isPremium ? (
                <button onClick={handleExport} style={{ width: "100%", padding: 14, borderRadius: 28, background: V, border: "none", color: WH, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🖨️ Exporter pour impression</button>
              ) : (
                <button onClick={handleExport} style={{ width: "100%", padding: 14, borderRadius: 28, background: "#F3F4F6", border: "1.5px dashed #D1D5DB", color: TM, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🔒 Export Premium uniquement</button>
              )}
              <button onClick={recommencer} style={{ width: "100%", padding: 14, borderRadius: 28, background: WH, border: "1.5px solid #E5E7EB", color: TM, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>🔄 Recommencer</button>
            </div>
          </>
        )}
      </div>

      {showBibliotheque && (
        <div onClick={fermerBibliotheque} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 600, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: WH, borderRadius: "20px 20px 0 0", padding: "18px 16px 24px", width: "100%", maxWidth: 480, maxHeight: "75vh", overflowY: "auto" }}>
            <div style={{ width: 36, height: 4, background: "#E5E7EB", borderRadius: 2, margin: "0 auto 14px" }} />
            <p style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: TX, textAlign: "center" }}>Choisir un pictogramme</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              {bibliothequePictogrammes.map(pic => (
                <button key={pic.id} onClick={() => choisirPictogramme(pic)} style={{ background: WH, border: "1.5px solid #E5E7EB", borderRadius: 12, padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <span style={{ fontSize: 28 }}>{pic.emoji}</span>
                  <span style={{ fontSize: 9, color: TX, textAlign: "center", lineHeight: 1.2 }}>{pic.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showImpression && (
        <div style={{ position: "fixed", inset: 0, background: WH, zIndex: 700, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: BD, position: "sticky", top: 0, background: WH, zIndex: 5 }}>
            <button onClick={handlePrint} style={{ padding: "8px 16px", borderRadius: 20, background: V, border: "none", color: WH, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>🖨️ Imprimer</button>
            <button onClick={() => setShowImpression(false)} style={{ background: "none", border: "none", fontSize: 14, color: TM, cursor: "pointer", fontWeight: 600 }}>✕ Fermer</button>
          </div>
          {printMsg && <p style={{ margin: "10px 16px 0", fontSize: 12, color: "#D97706", textAlign: "center" }}>Fonction d'impression native bientôt disponible</p>}
          <div style={{ maxWidth: 600, margin: "20px auto", padding: "32px 24px", border: BD, borderRadius: 8, aspectRatio: "1 / 1.414", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: TX, textAlign: "center" }}>Mon emploi du temps</p>
            <p style={{ margin: "0 0 28px", fontSize: 16, color: TM, textAlign: "center" }}>{sousTitre}</p>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignContent: "start" }}>
              {etapes.map((etape, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ position: "relative", width: 90, height: 90, borderRadius: "50%", border: `3px solid ${V}`, display: "flex", alignItems: "center", justifyContent: "center", background: WH }}>
                    <span style={{ position: "absolute", top: -6, left: -6, width: 24, height: 24, borderRadius: "50%", background: V, color: WH, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                    <span style={{ fontSize: 48 }}>{etape.emoji}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TX, textAlign: "center" }}>{etape.label}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: "28px 0 0", fontSize: 11, color: TM, textAlign: "center" }}>Créé avec Parent'Hèse 🧩</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PageProfil({setPage,enfants=[],setEnfants,enfantActif,setEnfantActif,showGestionEnfants,setShowGestionEnfants,currentUser,onLogout,onRequireAuth,isPremium=false,setPremium,evenementsSaisonniers=[],onOpenPremium,onDeleteAccount,favoris=[],adminEvenements=[],pendingContribs=[],darkMode=false,setDarkMode,historiqueActivites=[],setHistoriqueActivites}){
  const isLoggedIn=!!currentUser;
  const [subPage,setSubPage]=useState(null);
  const [profil,setProfil]=useState({nom:currentUser?.nom||"",pseudo:"",photo:null});
  const [editMode,setEditMode]=useState(false);
  const [editBuf,setEditBuf]=useState({nom:"",pseudo:""});
  const [showProfilToast,setShowProfilToast]=useState(false);
  const [showPhotoMsg,setShowPhotoMsg]=useState(false);
  const [showAnnulerModal,setShowAnnulerModal]=useState(false);
  const [showAnnulerToast,setShowAnnulerToast]=useState(false);
  const confirmerAnnulationPremium=()=>{
    setShowAnnulerModal(false);
    setPremium&&setPremium(false);
    setShowAnnulerToast(true);
    setTimeout(()=>setShowAnnulerToast(false),3000);
  };
  const saveProfile=()=>{if(!editBuf.nom.trim())return;setProfil(prev=>({...prev,nom:editBuf.nom.trim(),pseudo:editBuf.pseudo.trim()}));setEditMode(false);setShowProfilToast(true);setTimeout(()=>setShowProfilToast(false),3000);};
  const initiales=profil.nom?.trim()?profil.nom.trim()[0].toUpperCase():"👤";
  const [contributions,setContributions]=useState({total:3,activites:2,sorties:1,evenements:0,tnd:0});
  const [popupTrophee,setPopupTrophee]=useState(null);
  const trophees=[
    {id:"t1",emoji:"🌱",nom:"Premiere contribution",desc:"Tu as propose ta 1ere activite, sortie ou evenement",requis:1,type:"total"},
    {id:"t2",emoji:"⭐",nom:"Contributeur",desc:"Tu participes activement a la communaute",requis:3,type:"total"},
    {id:"t3",emoji:"🎖️",nom:"Explorateur",desc:"Tu partages tes decouvertes avec les autres parents",requis:5,type:"total"},
    {id:"t4",emoji:"🏅",nom:"Expert Parent'Hèse",desc:"Tu es une reference dans la communaute",requis:10,type:"total"},
    {id:"t5",emoji:"👑",nom:"Ambassadeur",desc:"Tu es l un des piliers de Parent'Hèse",requis:20,type:"total"},
    {id:"t6",emoji:"🎨",nom:"Maitre des activites",desc:"5 activites proposees",requis:5,type:"activites",badge:"Activites",badgeColor:"#EEEDFE",badgeText:"#3C3489"},
    {id:"t7",emoji:"🗺️",nom:"Guide des sorties",desc:"5 sorties proposees",requis:5,type:"sorties",badge:"Sorties",badgeColor:"#E1F5EE",badgeText:"#085041"},
    {id:"t8",emoji:"🎪",nom:"Organisateur",desc:"3 evenements proposes",requis:3,type:"evenements",badge:"Evenements",badgeColor:"#FAEEDA",badgeText:"#633806"},
    {id:"t9",emoji:"🧩",nom:"Champion TND",desc:"3 sorties avec infos TND completes",requis:3,type:"tnd",badge:"TND",badgeColor:"#EEEDFE",badgeText:"#3C3489"},
  ];
  const isDebloque=(t)=>contributions[t.type]>=t.requis;
  const tropheesDebloques=trophees.filter(t=>isDebloque(t)).length;
  const prochain=trophees.find(t=>!isDebloque(t));
  const prochainPalier=prochain?prochain.requis:contributions.total;
  const progressPct=prochain?Math.min(100,(contributions[prochain.type]/prochain.requis)*100):100;
  const tropheesProg=trophees.slice(0,5);
  const tropheesSpec=trophees.slice(5);
  const addContrib=()=>{
    setContributions(prev=>{
      const next={...prev,total:prev.total+1};
      const newDebloques=trophees.filter(t=>next[t.type]>=t.requis&&prev[t.type]<t.requis);
      if(newDebloques.length>0)setPopupTrophee(newDebloques[0]);
      return next;
    });
  };
  if(subPage==="notifications") return <PageNotifications onBack={()=>setSubPage(null)}/>;
  if(subPage==="confidentialite") return <PageConfidentialite onBack={()=>setSubPage(null)} onDeleteAccount={onDeleteAccount}/>;
  if(subPage==="aide") return <PageAide onBack={()=>setSubPage(null)} onGoConfidentialite={()=>setSubPage("confidentialite")} isPremium={isPremium} setPremium={setPremium} onOpenPremium={onOpenPremium}/>;
  if(subPage==="amelioration") return <PageAmelioration onBack={()=>setSubPage(null)}/>;
  if(subPage==="pictogrammes") return <PictogrammeView onBack={()=>setSubPage(null)} isPremium={isPremium} onOpenPremium={onOpenPremium} adminEvenements={adminEvenements} pendingContribs={pendingContribs}/>;
  if(subPage==="historique") return <PageHistorique historique={historiqueActivites} onBack={()=>setSubPage(null)} onClear={()=>setHistoriqueActivites&&setHistoriqueActivites([])}/>;
  if(subPage==="badges"){
    const badgeStats={
      historique:historiqueActivites.length,
      streak:(()=>{const dates=[...new Set(historiqueActivites.map(h=>h.date?.slice(0,10)).filter(Boolean))].sort().reverse();let s=0,cur=new Date();for(const d of dates){const diff=Math.floor((cur-new Date(d))/(1000*60*60*24));if(diff>1)break;s++;cur=new Date(d);}return s;})(),
      favSorties:favoris.filter(f=>f._type==="sortie").length,
      favTotal:favoris.length,
      enfants:enfants.length,
      carnetSensoriel:enfants.some(e=>Object.values(e.niveauxSensoriels||{}).some(v=>v!==50)),
      isPremium,
      contributions:0, // tracked externally
      plannings:0,     // tracked externally
      avis:0,          // tracked externally
    };
    return <PageBadges stats={badgeStats} onBack={()=>setSubPage(null)}/>;
  }
  if(showGestionEnfants) return <GestionEnfants enfants={enfants} setEnfants={setEnfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} onBack={()=>setShowGestionEnfants(false)} isPremium={isPremium} onOpenPremium={onOpenPremium}/>;

  const menuItems=[
    {icon:"🔔",bg:"#EDE9FF",color:"#6C5CE7",label:"Notifications",sub:"Gerer vos notifications",page:"notifications"},
    {icon:"🔒",bg:"#D1FAE5",color:"#059669",label:"Confidentialite",sub:"Vos donnees personnelles",page:"confidentialite"},
    {icon:"❓",bg:"#DBEAFE",color:"#2563EB",label:"Aide et FAQ",sub:"Besoin d aide ? On est la !",page:"aide"},
    {icon:"💡",bg:"#FEF3C7",color:"#D97706",label:"Proposer une amelioration",sub:"Partagez vos idees avec nous",page:"amelioration"},
  ];
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:16}}>
      <div style={{padding:"16px 16px 0"}}>
        {/* En-tete profil dynamique */}
        <div style={{background:WH,borderRadius:16,padding:20,border:BD,marginBottom:12,position:"relative"}}>
          <button onClick={()=>{setEditBuf({nom:profil.nom,pseudo:profil.pseudo});setEditMode(true);}} style={{position:"absolute",top:14,right:14,background:WH,border:BD,borderRadius:20,padding:"4px 12px",fontSize:12,color:V,fontWeight:600,cursor:"pointer"}}>✏️ Modifier</button>
          <div style={{textAlign:"center"}}>
            <div style={{position:"relative",width:80,height:80,margin:"0 auto 12px"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:profil.nom?"linear-gradient(135deg,"+V+",#a78bfa)":"linear-gradient(135deg,#EDE9FF,#d4ccf7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:profil.nom?28:36,color:WH,border:"3px solid "+WH,boxShadow:"0 2px 12px rgba(108,92,231,0.2)",fontWeight:800}}>
                {profil.nom?initiales:"👤"}
              </div>
              <button onClick={()=>setShowPhotoMsg(true)} style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:WH,border:"1.5px solid #E5E7EB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,0.12)"}}>📷</button>
            </div>
            {profil.nom?(
              <>
                <p style={{margin:"0 0 2px",fontSize:18,fontWeight:800,color:TX}}>{profil.nom}</p>
                {profil.pseudo&&<p style={{margin:"0 0 6px",fontSize:14,color:V,fontWeight:600}}>@{profil.pseudo}</p>}
                <p style={{margin:0,fontSize:13,color:TM}}>👶 {enfants.length} enfant{enfants.length!==1?"s":""}</p>
              </>
            ):(
              <>
                <p style={{margin:"0 0 12px",fontSize:14,color:TM}}>Complete ton profil</p>
                <button onClick={()=>{setEditBuf({nom:"",pseudo:""});setEditMode(true);}} style={{padding:"9px 20px",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>✏️ Creer mon profil</button>
              </>
            )}
            {showPhotoMsg&&<div style={{marginTop:10,background:"#EEEDFE",borderRadius:10,padding:"8px 12px"}}><p style={{margin:0,fontSize:11,color:V}}>La photo de profil sera disponible apres connexion Firebase.</p><button onClick={()=>setShowPhotoMsg(false)} style={{background:"none",border:"none",color:TM,fontSize:11,cursor:"pointer",marginTop:4}}>OK</button></div>}
          </div>
        </div>

        {!isLoggedIn&&(
          <button onClick={()=>onRequireAuth&&onRequireAuth()} style={{width:"100%",padding:12,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:12}}>Se connecter / Créer un compte gratuit</button>
        )}

        {/* Formulaire edition */}
        {editMode&&(
          <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:800,color:TX}}>👤 Mon identite</p>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,fontWeight:600,color:TM,display:"block",marginBottom:4}}>Prenom et nom</label>
              <input value={editBuf.nom} onChange={e=>setEditBuf(prev=>({...prev,nom:e.target.value}))} placeholder="Ex : Marie Dupont" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid rgba(108,92,231,0.2)",fontSize:13,color:TX,background:WH,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{fontSize:12,fontWeight:600,color:TM,display:"block",marginBottom:4}}>Pseudo</label>
              <div style={{display:"flex",alignItems:"center",background:BG2,borderRadius:10,border:"1.5px solid rgba(108,92,231,0.2)",overflow:"hidden"}}>
                <span style={{padding:"0 10px",fontSize:13,color:V,fontWeight:700}}>@</span>
                <input value={editBuf.pseudo} onChange={e=>setEditBuf(prev=>({...prev,pseudo:e.target.value}))} placeholder="maman_creative" style={{flex:1,padding:"10px 12px 10px 0",border:"none",fontSize:13,color:TX,background:"transparent",outline:"none",fontFamily:"inherit"}}/>
              </div>
              <p style={{margin:"4px 0 0",fontSize:11,color:TM}}>Visible dans la communaute</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <button onClick={saveProfile} style={{width:"100%",padding:"13px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>✅ Enregistrer</button>
              <button onClick={()=>setEditMode(false)} style={{width:"100%",padding:"13px 0",borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:TM,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
            </div>
          </div>
        )}

        {/* Statut du compte — gratuit ou payant */}
        {!isLoggedIn ? (
          <div style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:20}}>🆓</span>
              <div>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Mode invité</p>
                <p style={{margin:0,fontSize:11,color:TM}}>Générateur, sorties, bibliothèque et événements : accès libre</p>
              </div>
            </div>
            <p style={{margin:0,fontSize:12,color:TM,lineHeight:1.5}}>Connecte-toi pour enregistrer tes préférences : favoris, contributions, avis et trophées.</p>
          </div>
        ) : isPremium ? (
          <div style={{background:"linear-gradient(135deg,#EDE9FF,#F5F0FF)",borderRadius:16,padding:"14px 16px",border:`1px solid ${VL}`,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:20}}>⭐</span>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:V}}>Premium actif</p>
                <p style={{margin:0,fontSize:11,color:TM}}>Profils enfants illimités (jusqu'à 6) et emploi du temps pictogrammes complet débloqués</p>
              </div>
              {setPremium&&<button onClick={()=>setPremium(false)} style={{fontSize:11,color:TM,background:WH,border:BD,borderRadius:14,padding:"6px 10px",cursor:"pointer",flexShrink:0}}>Démo : revenir gratuit</button>}
            </div>
            <button onClick={()=>setShowAnnulerModal(true)} style={{width:"100%",padding:11,borderRadius:28,background:WH,border:"1.5px solid #FCA5A5",color:"#DC2626",fontWeight:600,fontSize:13,cursor:"pointer"}}>Annuler l'abonnement Premium</button>
          </div>
        ) : (
          <div style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:20}}>✅</span>
              <div>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Compte gratuit actif</p>
                <p style={{margin:0,fontSize:11,color:TM}}>Favoris, avis, propositions et trophées débloqués</p>
              </div>
            </div>
            <div style={{background:"linear-gradient(135deg,#EDE9FF,#F5F0FF)",borderRadius:12,padding:"10px 12px",border:`1px solid ${VL}`,marginBottom:10}}>
              <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:V}}>⭐ Avec Premium en plus :</p>
              <p style={{margin:0,fontSize:11,color:TM,lineHeight:1.5}}>Planning hebdomadaire · Mode SOS · Profils enfants illimités · Carnet sensoriel · Emploi du temps pictogrammes · Favoris illimités · Générateur en 1 clic</p>
            </div>
            {(()=>{
              const evtSaisonActif=evenementsSaisonniers.find(e=>e.actif&&e.essaiActif===false);
              if(!evtSaisonActif)return null;
              return (
                <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 12px",border:"1px solid #FDE68A",marginBottom:10}}>
                  <p style={{margin:0,fontSize:11,color:"#92400E",lineHeight:1.5}}>🎄 Pas d'essai pendant le Village du Lutin — mais tu peux découvrir {evtSaisonActif.apercuGratuitJours||3} jours du calendrier gratuitement avant de t'abonner !</p>
                </div>
              );
            })()}
            <button onClick={()=>onOpenPremium?onOpenPremium():setPremium&&setPremium(true)} style={{width:"100%",padding:12,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>⭐ Voir Premium</button>
          </div>
        )}

        {/* 🎯 Barre de complétion du profil */}
        {(()=>{
          const steps=[
            {done:isLoggedIn,label:"Se connecter",emoji:"🔐"},
            {done:enfants.length>0,label:"Ajouter un enfant",emoji:"👶"},
            {done:enfants.some(e=>((e.profils||[]).length>0)),label:"Renseigner les profils TND",emoji:"🧩"},
            {done:isPremium?enfants.some(e=>Object.values(e.niveauxSensoriels||{}).some(v=>v!==50)):true,label:"Compléter le carnet sensoriel",emoji:"🧠",premium:true},
            {done:historiqueActivites.length>0,label:"Réaliser une première activité",emoji:"✅"},
            {done:favoris.length>0,label:"Sauvegarder un favori",emoji:"❤️"},
          ];
          const done=steps.filter(s=>s.done).length;
          const total=steps.length;
          if(done===total)return null; // profil complet, pas besoin d'afficher
          const next=steps.find(s=>!s.done);
          return(
            <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>🎯 Complétez votre profil</p>
                <span style={{fontSize:12,fontWeight:700,color:V}}>{done}/{total}</span>
              </div>
              <div style={{background:"#F3F4F6",borderRadius:10,height:6,overflow:"hidden",marginBottom:10}}>
                <div style={{width:(done/total*100)+"%",height:"100%",background:"linear-gradient(90deg,#6C5CE7,#a78bfa)",borderRadius:10,transition:"width 0.5s"}}/>
              </div>
              {next&&(
                <div style={{background:VL,borderRadius:10,padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16,flexShrink:0}}>{next.emoji}</span>
                  <p style={{margin:0,fontSize:12,color:V,fontWeight:600}}>{next.label}{next.premium?" ⭐":""}</p>
                  <span style={{marginLeft:"auto",fontSize:11,color:TM}}>Prochain →</span>
                </div>
              )}
            </div>
          );
        })()}

        {/* 👶 Mes enfants — nouveau système */}
        <div style={{background:WH,borderRadius:20,padding:"14px 16px",border:BD,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>👶 Mes enfants</p>
            <button onClick={()=>setShowGestionEnfants(true)} style={{fontSize:12,color:V,background:VL,border:"none",borderRadius:20,padding:"4px 12px",cursor:"pointer",fontWeight:600}}>Gérer →</button>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
            {enfants.map(e=>(
              <button key={e.id} onClick={()=>setEnfantActif(e.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 12px",borderRadius:14,border:`2px solid ${e.id===enfantActif?(e.couleur||"#6C5CE7"):"rgba(0,0,0,0.06)"}`,background:e.id===enfantActif?(e.couleur||"#6C5CE7")+"12":BG,cursor:"pointer",flexShrink:0,minWidth:64}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:(e.couleur||"#6C5CE7")+"22",border:`2px solid ${e.couleur||"#6C5CE7"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{e.emoji||"👦"}</div>
                <span style={{fontSize:11,fontWeight:600,color:e.id===enfantActif?(e.couleur||"#6C5CE7"):TM,whiteSpace:"nowrap"}}>{e.prenom}</span>
                {e.id===enfantActif&&<span style={{fontSize:9,color:(e.couleur||"#6C5CE7"),fontWeight:700}}>Actif</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 🧩 Emploi du temps pictogrammes */}
        <div onClick={()=>setSubPage("pictogrammes")} style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
          <div style={{width:44,height:44,borderRadius:14,background:"#FFF4EC",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🧩</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Emploi du temps pictogrammes</p>
            <p style={{margin:0,fontSize:12,color:TM}}>Prepare une sortie ou une routine en images</p>
          </div>
          <span style={{color:V,fontSize:16}}>→</span>
        </div>

        {/* 📊 Historique des activités */}
        <div onClick={()=>setSubPage("historique")} style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
          <div style={{width:44,height:44,borderRadius:14,background:"#ECFDF5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📊</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Historique des activités</p>
            <p style={{margin:0,fontSize:12,color:TM}}>{historiqueActivites.length>0?`${historiqueActivites.length} activité${historiqueActivites.length>1?"s":""} réalisée${historiqueActivites.length>1?"s":""}  🌱`:"Notez vos activités réalisées ✓"}</p>
          </div>
          {historiqueActivites.length>0&&<span style={{background:"#10B981",color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{historiqueActivites.length}</span>}
          <span style={{color:V,fontSize:16}}>→</span>
        </div>

        {/* 🏅 Mes badges */}
        {(()=>{
          const badgeStats={historique:historiqueActivites.length,streak:0,favSorties:favoris.filter(f=>f._type==="sortie").length,favTotal:favoris.length,enfants:enfants.length,carnetSensoriel:enfants.some(e=>Object.values(e.niveauxSensoriels||{}).some(v=>v!==50)),isPremium,contributions:0,plannings:0,avis:0};
          const nbBadges=BADGES_DEF.filter(b=>b.cond(badgeStats)).length;
          return(
            <div onClick={()=>setSubPage("badges")} style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
              <div style={{width:44,height:44,borderRadius:14,background:"#FFFBEB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🏅</div>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Mes badges</p>
                <p style={{margin:0,fontSize:12,color:TM}}>{nbBadges}/{BADGES_DEF.length} badge{nbBadges!==1?"s":""} obtenu{nbBadges!==1?"s":""}</p>
              </div>
              {nbBadges>0&&<div style={{display:"flex",gap:-4}}>{BADGES_DEF.filter(b=>b.cond(badgeStats)).slice(0,3).map(b=><span key={b.id} style={{fontSize:18}}>{b.emoji}</span>)}</div>}
              <span style={{color:V,fontSize:16}}>→</span>
            </div>
          );
        })()}

        {/* 📬 Mes contributions */}
        {(()=>{
          const mesContribs=(pendingContribs||[]).filter(c=>c._auteurEmail===currentUser?.email||c._auteur===currentUser?.nom);
          if(mesContribs.length===0)return null;
          const rejetees=mesContribs.filter(c=>c._statut==="rejected");
          const publiees=mesContribs.filter(c=>c._statut==="published");
          const enAttente=mesContribs.filter(c=>c._statut==="pending");
          return(
            <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:12}}>
              <p style={{margin:"0 0 10px",fontSize:14,fontWeight:700,color:TX}}>📬 Mes contributions</p>
              {rejetees.length>0&&(
                <div style={{background:"#FEF2F2",borderRadius:12,padding:"10px 14px",marginBottom:8,border:"1px solid #FECACA"}}>
                  <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:"#DC2626"}}>❌ {rejetees.length} contribution{rejetees.length>1?"s":""} refusée{rejetees.length>1?"s":""}</p>
                  {rejetees.map(c=>(
                    <div key={c.id} style={{borderTop:"1px solid #FECACA",paddingTop:6,marginTop:6}}>
                      <p style={{margin:0,fontSize:12,color:"#DC2626",fontWeight:600}}>{c.nom||c.titre}</p>
                      {c._raisonSignalement&&<p style={{margin:"2px 0 0",fontSize:11,color:"#9CA3AF"}}>Motif : {c._raisonSignalement}</p>}
                    </div>
                  ))}
                </div>
              )}
              {publiees.length>0&&<p style={{margin:"0 0 6px",fontSize:12,color:"#10B981",fontWeight:600}}>✅ {publiees.length} publiée{publiees.length>1?"s":""}</p>}
              {enAttente.length>0&&<p style={{margin:0,fontSize:12,color:TM}}>⏳ {enAttente.length} en attente de validation</p>}
            </div>
          );
        })()}

        {/* ❤️ Mes favoris */}
        <div onClick={()=>setPage("favoris")} style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:12,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
          <div style={{width:44,height:44,borderRadius:14,background:"#FCEBEB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>❤️</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>Mes favoris</p>
            <p style={{margin:0,fontSize:12,color:TM}}>{favoris.length} activité{favoris.length!==1?"s":""}, sortie{favoris.length!==1?"s":""} et événement{favoris.length!==1?"s":""} sauvegardés</p>
          </div>
          <span style={{color:V,fontSize:16}}>→</span>
        </div>

        {/* Trophees */}
        {isLoggedIn ? (
          <>
            {/* Trophees — compteur global */}
            <div style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{fontSize:15,fontWeight:700,color:TX}}>⭐ {contributions.total} contribution{contributions.total>1?"s":""}</span>
                {prochain&&<span style={{fontSize:11,color:TM,marginLeft:"auto"}}>Prochain : {prochain.nom} ({prochain.requis})</span>}
              </div>
              <div style={{background:"#EBEBEB",borderRadius:4,height:6,overflow:"hidden",marginBottom:6}}>
                <div style={{width:progressPct+"%",background:V,height:"100%",borderRadius:4,transition:"width 0.4s"}}/>
              </div>
              <p style={{margin:0,fontSize:12,color:TM}}>{tropheesDebloques} / 9 trophees remportes</p>
            </div>

            {/* Trophees de progression */}
            <div style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:10}}>
              <p style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:TX}}>🏆 Progression</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {tropheesProg.map(t=>{
                  const ok=isDebloque(t);
                  return(
                    <div key={t.id} style={{background:ok?"#EEEDFE":"#F5F5F5",borderRadius:12,padding:12,textAlign:"center",border:"1.5px solid "+(ok?"rgba(108,92,231,0.25)":"transparent"),opacity:ok?1:0.65}}>
                      <div style={{fontSize:32,marginBottom:6,filter:ok?"none":"grayscale(1)"}}>{t.emoji}</div>
                      <p style={{margin:"0 0 3px",fontSize:12,fontWeight:700,color:ok?V:"#888",lineHeight:1.2}}>{t.nom}</p>
                      <p style={{margin:"0 0 6px",fontSize:10,color:ok?"#6C5CE799":"#aaa",lineHeight:1.3}}>{t.desc}</p>
                      {ok
                        ?<span style={{fontSize:10,background:"#D1FAE5",color:"#065F46",padding:"2px 8px",borderRadius:10,fontWeight:600}}>✓ Obtenu</span>
                        :<span style={{fontSize:10,background:"#E5E5E5",color:"#888",padding:"2px 8px",borderRadius:10}}>{t.requis} contrib.</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trophees specialises */}
            <div style={{background:WH,borderRadius:16,padding:"14px 16px",border:BD,marginBottom:14}}>
              <p style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:TX}}>🎯 Specialises</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {tropheesSpec.map(t=>{
                  const ok=isDebloque(t);
                  return(
                    <div key={t.id} style={{background:ok?"#EEEDFE":"#F5F5F5",borderRadius:12,padding:12,textAlign:"center",border:"1.5px solid "+(ok?"rgba(108,92,231,0.25)":"transparent"),opacity:ok?1:0.65}}>
                      {t.badge&&<span style={{fontSize:9,background:t.badgeColor,color:t.badgeText,padding:"1px 7px",borderRadius:8,fontWeight:700,display:"inline-block",marginBottom:6}}>{t.badge}</span>}
                      <div style={{fontSize:32,marginBottom:6,filter:ok?"none":"grayscale(1)"}}>{t.emoji}</div>
                      <p style={{margin:"0 0 3px",fontSize:12,fontWeight:700,color:ok?V:"#888",lineHeight:1.2}}>{t.nom}</p>
                      <p style={{margin:"0 0 6px",fontSize:10,color:ok?"#6C5CE799":"#aaa",lineHeight:1.3}}>{t.desc}</p>
                      {ok
                        ?<span style={{fontSize:10,background:"#D1FAE5",color:"#065F46",padding:"2px 8px",borderRadius:10,fontWeight:600}}>✓ Obtenu</span>
                        :<span style={{fontSize:10,background:"#E5E5E5",color:"#888",padding:"2px 8px",borderRadius:10}}>{t.requis} contrib.</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div onClick={()=>onRequireAuth&&onRequireAuth()} style={{background:WH,borderRadius:16,padding:"20px 16px",border:BD,marginBottom:14,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:32,marginBottom:8}}>🔒</div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Trophées réservés aux comptes</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Crée un compte gratuit pour suivre tes contributions et débloquer des trophées</p>
            <span style={{display:"inline-block",fontSize:13,color:V,fontWeight:700,background:VL,padding:"8px 18px",borderRadius:20}}>Se connecter / Créer un compte</span>
          </div>
        )}

        {/* Menu */}
        <div style={{background:WH,borderRadius:20,border:BD,overflow:"hidden",marginBottom:14}}>
          {menuItems.map((item,i)=>(
            <div key={i} onClick={item.page?()=>setSubPage(item.page):undefined} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:item.page?"pointer":"default",borderBottom:i<menuItems.length-1?"1px solid rgba(108,92,231,0.08)":"none"}}>
              <div style={{width:44,height:44,borderRadius:14,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.icon}</div>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>{item.label}</p>
                <p style={{margin:0,fontSize:12,color:TM}}>{item.sub}</p>
              </div>
              <div style={{width:28,height:28,borderRadius:"50%",background:BG2,border:BD,display:"flex",alignItems:"center",justifyContent:"center",color:TM,fontSize:14}}>›</div>
            </div>
          ))}
        </div>

        {/* Connexion / Deconnexion */}
        {/* Statistiques & Dark mode */}
        <div style={{background:WH,borderRadius:16,border:BD,padding:"14px 16px",marginBottom:12}}>
          <p style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:TX}}>⚙️ Préférences</p>
          {/* Dark mode toggle */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:BD}}>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:500,color:TX}}>{darkMode?"🌙":"☀️"} Mode {darkMode?"nuit":"jour"}</p>
              <p style={{margin:0,fontSize:11,color:TM}}>Interface sombre pour les soirs</p>
            </div>
            <Toggle on={darkMode} onChange={()=>setDarkMode&&setDarkMode(p=>!p)}/>
          </div>
          {/* Historique stats */}
          {historiqueActivites.length>0&&(
            <div style={{padding:"10px 0 0"}}>
              <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:TM}}>📊 Votre activité</p>
              <div style={{display:"flex",gap:8}}>
                <div style={{flex:1,background:VL,borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                  <p style={{margin:0,fontSize:20,fontWeight:800,color:V}}>{historiqueActivites.length}</p>
                  <p style={{margin:0,fontSize:10,color:TM}}>Activités<br/>réalisées</p>
                </div>
                <div style={{flex:1,background:"#ECFDF5",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                  <p style={{margin:0,fontSize:20,fontWeight:800,color:"#10B981"}}>{new Set(historiqueActivites.map(h=>h.date?.slice(0,7))).size}</p>
                  <p style={{margin:0,fontSize:10,color:TM}}>Mois<br/>actifs</p>
                </div>
                <div style={{flex:1,background:"#FEF3C7",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                  <p style={{margin:0,fontSize:20,fontWeight:800,color:"#D97706"}}>{new Set(historiqueActivites.map(h=>h.categorie||"Autre")).size}</p>
                  <p style={{margin:0,fontSize:10,color:TM}}>Types<br/>explorés</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          onLogout&&<button onClick={onLogout} style={{width:"100%",padding:12,borderRadius:14,background:WH,border:"1.5px solid #FCA5A5",color:"#DC2626",fontWeight:600,fontSize:13,cursor:"pointer",marginBottom:12}}>🚪 Se déconnecter</button>
        ) : (
          onRequireAuth&&<button onClick={onRequireAuth} style={{width:"100%",padding:12,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:12}}>🔓 Se connecter / Créer un compte</button>
        )}

        {/* Boutons discrets */}
        <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:12,flexWrap:"wrap"}}>
          <button onClick={addContrib} style={{background:"none",border:"none",color:"#ccc",fontSize:11,cursor:"pointer",padding:"4px 10px"}}>[Test] +1 contribution</button>
          <button onClick={()=>{if(!isLoggedIn){onRequireAuth&&onRequireAuth();return;}setPremium&&setPremium(!isPremium);}} style={{background:"none",border:"none",color:"#ccc",fontSize:11,cursor:"pointer",padding:"4px 10px"}}>[Test] Activer/Désactiver Premium</button>
        </div>

        {/* Modal annulation Premium */}
        {showAnnulerModal&&(
          <div onClick={()=>setShowAnnulerModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
              <p style={{margin:"0 0 8px",fontSize:16,fontWeight:800,color:TX,textAlign:"center"}}>Annuler ton abonnement ?</p>
              <p style={{margin:"0 0 20px",fontSize:13,color:TM,textAlign:"center",lineHeight:1.5}}>Tu perdras l'accès au planning, au mode SOS, aux profils enfants illimités, au carnet sensoriel, à l'emploi du temps pictogrammes, aux favoris illimités et au générateur en 1 clic.</p>
              <button onClick={confirmerAnnulationPremium} style={{width:"100%",padding:13,borderRadius:28,background:"#DC2626",border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Confirmer l'annulation</button>
              <button onClick={()=>setShowAnnulerModal(false)} style={{width:"100%",padding:11,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Garder Premium</button>
            </div>
          </div>
        )}
        {/* Toast annulation */}
        {showAnnulerToast&&(
          <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#374151",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
            Abonnement Premium annulé
          </div>
        )}

        {/* Popup felicitations */}
        {popupTrophee&&(
          <div onClick={()=>setPopupTrophee(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,textAlign:"center",width:"100%",maxWidth:340,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
              <div style={{fontSize:64,marginBottom:12}}>{popupTrophee.emoji}</div>
              <p style={{margin:"0 0 6px",fontSize:16,fontWeight:800,color:V}}>🎉 Nouveau trophée !</p>
              <p style={{margin:"0 0 6px",fontSize:14,fontWeight:700,color:TX}}>{popupTrophee.nom}</p>
              <p style={{margin:"0 0 20px",fontSize:13,color:TM}}>{popupTrophee.desc}</p>
              <button onClick={()=>setPopupTrophee(null)} style={{width:"100%",padding:"12px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Super !</button>
            </div>
          </div>
        )}

        {showProfilToast&&(
          <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:600,zIndex:700,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
            ✅ Profil mis a jour !
          </div>
        )}

        {/* Banniere communaute */}
        <div style={{background:"linear-gradient(135deg,#EDE9FF 0%,#ddd6fe 100%)",borderRadius:20,padding:"18px 16px",border:BD,display:"flex",alignItems:"center",gap:12,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-8,right:-8,width:60,height:60,borderRadius:"50%",background:"rgba(108,92,231,0.08)"}}/>
          <div style={{position:"absolute",bottom:-5,right:20,fontSize:20,opacity:0.3}}>💜</div>
          <div style={{position:"absolute",top:10,right:60,fontSize:14,opacity:0.2}}>💜</div>
          <span style={{fontSize:44,flexShrink:0}}>👧</span>
          <div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:TX,lineHeight:1.3}}>Merci de faire partie<br/>de la communaute Parent'Hèse 💜</p>
            <p style={{margin:0,fontSize:12,color:TM,lineHeight:1.4}}>Ensemble, on rend la vie de famille<br/>plus simple et plus joyeuse !</p>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id:"1", nom:"Sophie Martin", email:"sophie.martin@email.com", enfants:[5,8], premium:true, statut:"active", inscription:"15/01/2024", contributions:8 },
  { id:"2", nom:"Julie Bernard", email:"julie.bernard@email.com", enfants:[3], premium:false, statut:"active", inscription:"20/02/2024", contributions:2 },
  { id:"3", nom:"Marie Dubois", email:"marie.dubois@email.com", enfants:[2,6,10], premium:true, statut:"active", inscription:"10/03/2024", contributions:15 },
  { id:"4", nom:"Thomas Petit", email:"thomas.petit@email.com", enfants:[4,7], premium:false, statut:"suspended", inscription:"05/04/2024", contributions:1 },
  { id:"5", nom:"Emma Leroy", email:"emma.leroy@email.com", enfants:[6], premium:true, statut:"active", inscription:"12/05/2024", contributions:22 },
  { id:"6", nom:"Lucie Morel", email:"lucie.morel@email.com", enfants:[1,4], premium:false, statut:"active", inscription:"03/06/2024", contributions:5 },
];
// ─── PAGINATION HOOK ─────────────────────────────────────────────────────────
function usePagination(items=[],perPage=10){
  const [page,setPage]=useState(1);
  const totalPages=Math.ceil(items.length/perPage)||1;
  const slice=items.slice((page-1)*perPage,page*perPage);
  const reset=()=>setPage(1);
  const Pagination=()=>totalPages<=1?null:(
    <div style={{display:"flex",gap:6,justifyContent:"center",alignItems:"center",padding:"16px 0"}}>
      <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{padding:"6px 14px",borderRadius:20,border:BD,background:page===1?"#F3F4F6":"#fff",color:page===1?"#9CA3AF":"#6C5CE7",cursor:page===1?"default":"pointer",fontWeight:600,fontSize:13}}>←</button>
      {Array.from({length:Math.min(totalPages,5)},(_,i)=>{
        let p=i+1;
        if(totalPages>5){if(page<=3)p=i+1;else if(page>=totalPages-2)p=totalPages-4+i;else p=page-2+i;}
        return <button key={p} onClick={()=>setPage(p)} style={{width:32,height:32,borderRadius:"50%",border:`2px solid ${page===p?"#6C5CE7":BD}`,background:page===p?"#6C5CE7":"#fff",color:page===p?"#fff":"#6C5CE7",cursor:"pointer",fontWeight:700,fontSize:13}}>{p}</button>;
      })}
      <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{padding:"6px 14px",borderRadius:20,border:BD,background:page===totalPages?"#F3F4F6":"#fff",color:page===totalPages?"#9CA3AF":"#6C5CE7",cursor:page===totalPages?"default":"pointer",fontWeight:600,fontSize:13}}>→</button>
      <span style={{fontSize:11,color:"#9CA3AF",marginLeft:4}}>{page}/{totalPages}</span>
    </div>
  );
  return{slice,page,totalPages,setPage,reset,Pagination};
}

const MOCK_ACTIVITES = [
  { id:"1", titre:"Yoga en plein air", categorie:"Sport", lieu:"exterieur", ageMin:4, ageMax:10, duree:"30 min", premium:false, statut:"published", auteur:"Admin", date:"10/01/2024" },
  { id:"2", titre:"Cuisine créative", categorie:"Cuisine", lieu:"interieur", ageMin:5, ageMax:12, duree:"45 min", premium:true, statut:"published", auteur:"Admin", date:"15/02/2024" },
  { id:"3", titre:"Chasse au trésor", categorie:"Jeu", lieu:"exterieur", ageMin:3, ageMax:8, duree:"60 min", premium:false, statut:"pending", auteur:"sophie.martin@email.com", date:"20/03/2024" },
  { id:"4", titre:"Peinture sur toile", categorie:"Créatif", lieu:"interieur", ageMin:6, ageMax:14, duree:"90 min", premium:true, statut:"draft", auteur:"Admin", date:"01/04/2024" },
  { id:"5", titre:"Jardinage en famille", categorie:"Nature", lieu:"exterieur", ageMin:3, ageMax:10, duree:"45 min", premium:false, statut:"published", auteur:"marie.dubois@email.com", date:"05/05/2024" },
];
const MOCK_SORTIES = [
  { id:"1", titre:"Parc des Expositions", dept:"75 - Paris", adresse:"123 Av. des Parcs", horaires:"9h-18h", prix:"Gratuit", categorie:"Parc", statut:"published" },
  { id:"2", titre:"Ferme du Soleil", dept:"78 - Yvelines", adresse:"45 Rte de la Ferme", horaires:"10h-17h", prix:"8€/pers", categorie:"Ferme pedagogique", statut:"published" },
  { id:"3", titre:"Musée des Enfants", dept:"75 - Paris", adresse:"78 Rue du Musée", horaires:"10h-18h", prix:"12€", categorie:"Musee", statut:"published" },
  { id:"4", titre:"Accrobranche Les Pins", dept:"77 - Seine-et-Marne", adresse:"12 Allée des Pins", horaires:"9h-19h", prix:"18€", categorie:"Balade", statut:"draft" },
];
const MOCK_EVENTS = [
  { id:"1", titre:"Festival de Musique", date:"2025-06-15", fin:"2025-06-16", ville:"Paris", organisateur:"Mairie de Paris", prix:"Gratuit", type:"spectacle", statut:"published" },
  { id:"2", titre:"Salon du Jouet", date:"2025-07-20", fin:"2025-07-21", ville:"Lyon", organisateur:"EventCo", prix:"10€", type:"salon_jeunesse", statut:"draft" },
  { id:"3", titre:"Kermesse Saint-Martin", date:"2025-06-01", fin:"2025-06-01", ville:"Paris", organisateur:"Ecole St-Martin", prix:"Gratuit", type:"kermesse", statut:"published" },
];
const MOCK_REPORTS = [
  { id:"1", type:"activite", titre:"Chasse au trésor", raison:"Contenu inapproprié", signalePar:"julie.bernard@email.com", date:"22/03/2024", statut:"pending" },
  { id:"2", type:"sortie", titre:"Ferme du Soleil", raison:"Informations incorrectes", signalePar:"thomas.petit@email.com", date:"18/04/2024", statut:"resolved" },
  { id:"3", type:"evenement", titre:"Salon du Jouet", raison:"Doublon", signalePar:"emma.leroy@email.com", date:"25/07/2024", statut:"pending" },
  { id:"4", type:"activite", titre:"Yoga en plein air", raison:"Information manquante", signalePar:"lucie.morel@email.com", date:"12/01/2024", statut:"dismissed" },
];
const MOCK_SUBS = [
  { id:"1", nom:"Sophie Martin", email:"sophie.martin@email.com", plan:"mensuel", montant:4.99, debut:"15/01/2024", renouvellement:"15/07/2024", statut:"active" },
  { id:"2", nom:"Marie Dubois", email:"marie.dubois@email.com", plan:"annuel", montant:39.99, debut:"10/03/2024", renouvellement:"10/03/2025", statut:"active" },
  { id:"3", nom:"Emma Leroy", email:"emma.leroy@email.com", plan:"mensuel", montant:4.99, debut:"12/05/2024", renouvellement:"12/07/2024", statut:"active" },
  { id:"4", nom:"Thomas Petit", email:"thomas.petit@email.com", plan:"annuel", montant:39.99, debut:"05/04/2023", renouvellement:"05/04/2024", statut:"expired" },
];
const MOCK_ADMINS = [
  { id:"1", prenom:"Alexandre", nom:"Fontaine", email:"alex@parentales.fr", role:"super_admin", statut:"active", cree:"01/01/2024", connexion:"Aujourd hui" },
  { id:"2", prenom:"Camille", nom:"Rousseau", email:"camille@parentales.fr", role:"admin", statut:"active", cree:"15/02/2024", connexion:"Hier" },
  { id:"3", prenom:"Nathan", nom:"Girard", email:"nathan@parentales.fr", role:"moderateur", statut:"active", cree:"01/03/2024", connexion:"20/06/2024" },
  { id:"4", prenom:"Inès", nom:"Leblanc", email:"ines@parentales.fr", role:"moderateur", statut:"suspended", cree:"10/04/2024", connexion:"jamais" },
];
const MOCK_COMMS = [
  { id:"1", type:"banner", titre:"Soldes d'été", message:"Profitez de -30% sur le Premium jusqu'au 31 juillet !", debut:"01/07/2024", fin:"31/07/2024", actif:true },
  { id:"2", type:"popup", titre:"Bienvenue !", message:"Découvrez nos nouvelles activités de l'été.", debut:"01/06/2024", fin:"31/08/2024", actif:false },
  { id:"3", type:"push", titre:"Rappel planning", message:"N'oubliez pas de préparer votre semaine !", debut:"01/01/2024", fin:"31/12/2024", actif:true },
];
const MOCK_SEASONAL = [
  { id:"1", type:"christmas", nom:"Noël", emoji:"🎄", color:"#10b981", actif:true, banner:true, popup:true, debut:"01/12", fin:"24/12" },
  { id:"2", type:"easter", nom:"Pâques", emoji:"🐣", color:"#f59e0b", actif:false, banner:false, popup:false, debut:"14/04", fin:"22/04" },
  { id:"3", type:"halloween", nom:"Halloween", emoji:"🎃", color:"#f97316", actif:false, banner:false, popup:false, debut:"25/10", fin:"31/10" },
  { id:"4", type:"summer", nom:"Vacances d'été", emoji:"☀️", color:"#0ea5e9", actif:false, banner:false, popup:false, debut:"01/07", fin:"31/08" },
];

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#0d1117", sidebar: "#0d1117", card: "#161b22", border: "#30363d",
  text: "#e6edf3", muted: "#8b949e", accent: "#7c3aed",
  green: "#10b981", red: "#ef4444", yellow: "#f59e0b",
  blue: "#3b82f6", pink: "#ec4899", orange: "#f97316",
};
const s = {
  card: { background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20 },
  input: { background: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, width: "100%", outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
  btn: (bg, color="#fff") => ({ background: bg, border: "none", borderRadius: 8, padding: "8px 16px", color, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }),
  btnOutline: (color) => ({ background: "transparent", border: `1px solid ${color}`, borderRadius: 8, padding: "6px 14px", color, fontWeight: 600, fontSize: 12, cursor: "pointer" }),
  badge: (bg, color) => ({ background: bg, color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, display: "inline-block" }),
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` },
  label: { fontSize: 12, color: C.muted, display: "block", marginBottom: 6, fontWeight: 500 },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const statutBadge = (st) => {
  const map = { published:["#10b981","#d1fae5"], pending:["#f59e0b","#fef3c7"], draft:["#6b7280","#f3f4f6"], scheduled:["#3b82f6","#dbeafe"], active:["#10b981","#d1fae5"], suspended:["#ef4444","#fee2e2"], resolved:["#10b981","#d1fae5"], dismissed:["#6b7280","#e5e7eb"], expired:["#ef4444","#fee2e2"], cancelled:["#6b7280","#e5e7eb"] };
  const labels = { published:"Publié", pending:"En attente", draft:"Brouillon", scheduled:"⏰ Programmé", active:"Actif", suspended:"Suspendu", resolved:"Résolu", dismissed:"Ignoré", expired:"Expiré", cancelled:"Annulé" };
  const [c,bg] = map[st]||["#6b7280","#e5e7eb"];
  return <span style={s.badge(bg,c)}>{labels[st]||st}</span>;
};
const roleBadge = (r) => {
  const map = { super_admin:["#7c3aed","#ede9fe","👑 Super Admin"], admin:["#3b82f6","#dbeafe","🛡️ Admin"], moderateur:["#6b7280","#f3f4f6","👁️ Modérateur"] };
  const [c,bg,label] = map[r]||["#6b7280","#f3f4f6",r];
  return <span style={s.badge(bg,c)}>{label}</span>;
};
const Avatar = ({nom,size=36}) => {
  const initials = nom?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()||"?";
  const colors = ["#7c3aed","#3b82f6","#10b981","#f59e0b","#ec4899","#f97316"];
  const bg = colors[nom?.charCodeAt(0)%colors.length||0];
  return <div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color:"#fff",flexShrink:0}}>{initials}</div>;
};
const StatCard = ({label,val,sub,color,emoji}) => (
  <div style={{...s.card,flex:1,minWidth:140}}>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
      <span style={{fontSize:22}}>{emoji}</span>
      <span style={{fontSize:11,color:color||C.green,fontWeight:600}}>{sub}</span>
    </div>
    <div style={{fontSize:28,fontWeight:800,color:C.text,marginBottom:2}}>{val}</div>
    <div style={{fontSize:12,color:C.muted}}>{label}</div>
  </div>
);
const SearchBar = ({value,onChange,placeholder}) => (
  <div style={{position:"relative",marginBottom:16}}>
    <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>🔍</span>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||"Rechercher..."} style={{...s.input,paddingLeft:34}}/>
  </div>
);
const Modal = ({title,onClose,children,width=480}) => (
  <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
    <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",borderBottom:`1px solid ${C.border}`}}>
        <span style={{fontSize:15,fontWeight:700,color:C.text}}>{title}</span>
        <button onClick={onClose} style={{background:"transparent",border:"none",color:C.muted,fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
      </div>
      <div style={{padding:22}}>{children}</div>
    </div>
  </div>
);
const AdminField = ({label,children}) => (
  <div style={{marginBottom:14}}>
    <label style={s.label}>{label}</label>
    {children}
  </div>
);
const Tog = ({on,onChange}) => (
  <div onClick={onChange} style={{width:40,height:22,borderRadius:11,background:on?C.accent:"#374151",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
    <div style={{position:"absolute",top:3,left:on?21:3,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left 0.2s"}}/>
  </div>
);

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const MENU = [
  {k:"dashboard",label:"Dashboard",emoji:"📊"},
  {k:"contributions",label:"Contributions",emoji:"📥"},
  {k:"activites",label:"Activités",emoji:"🎨"},
  {k:"sorties",label:"Sorties",emoji:"🗺️"},
  {k:"evenements",label:"Événements",emoji:"📅"},
  {k:"saisonnier",label:"Saisonnier",emoji:"🎄"},
  {k:"categories",label:"Catégories",emoji:"🏷️"},
  {k:"utilisateurs",label:"Utilisateurs",emoji:"👥"},
  {k:"abonnements",label:"Abonnements",emoji:"💳"},
  {k:"signalements",label:"Signalements",emoji:"🚩"},
  {k:"communication",label:"Communication",emoji:"📢"},
  {k:"admins",label:"Administrateurs",emoji:"🛡️"},
  {k:"sos",label:"Mode SOS",emoji:"🆘"},
];

// ─── PAGES ────────────────────────────────────────────────────────────────────
function Dashboard({sharedActivites=[],sharedSorties=[],sharedEvenements=[],pendingContribs=[],userReports=[],dashUserReports=[]}) {
  const [liveUsers,setLiveUsers] = useState(MOCK_USERS.length);
  const [liveOnline,setLiveOnline] = useState(Math.floor(MOCK_USERS.length*0.4));
  const [pulse,setPulse] = useState(false);
  const [history,setHistory] = useState(()=>Array.from({length:12},(_,i)=>({t:i,v:Math.floor(MOCK_USERS.length*0.3)+Math.floor(Math.random()*3)})));

  const liveUsersRef = useRef(liveUsers);
  const liveOnlineRef = useRef(liveOnline);
  useEffect(()=>{ liveUsersRef.current=liveUsers; },[liveUsers]);
  useEffect(()=>{ liveOnlineRef.current=liveOnline; },[liveOnline]);
  useEffect(()=>{
    const interval=setInterval(()=>{
      const delta=Math.random()<0.6?1:Math.random()<0.3?2:0;
      const onlineDelta=(Math.random()<0.5?1:-1)*(Math.floor(Math.random()*2));
      if(delta>0){
        setLiveUsers(p=>p+delta);
        setPulse(true);
        setTimeout(()=>setPulse(false),600);
      }
      setLiveOnline(p=>Math.max(1,Math.min(p+onlineDelta,liveUsersRef.current)));
      setHistory(p=>[...p.slice(1),{t:Date.now(),v:liveOnlineRef.current}]);
    },4000);
    return()=>clearInterval(interval);
  },[]);

  const stats = [
    {label:"Utilisateurs",val:liveUsers,sub:"dont "+liveOnline+" en ligne",emoji:"👥",color:C.blue},
    {label:"Activités publiées",val:MOCK_ACTIVITES.filter(a=>a.statut==="published").length+sharedActivites.filter(a=>a.statut==="published").length+pendingContribs.filter(c=>c._type==="activite"&&c._statut==="published").length,sub:`Admin: ${MOCK_ACTIVITES.filter(a=>a.statut==="published").length+sharedActivites.filter(a=>a.statut==="published").length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="activite"&&c._statut==="published").length}`,emoji:"🎨",color:C.accent},
    {label:"Sorties",val:MOCK_SORTIES.length+sharedSorties.length+pendingContribs.filter(c=>c._type==="sortie"&&c._statut==="published").length,sub:`Admin: ${MOCK_SORTIES.length+sharedSorties.length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="sortie"&&c._statut==="published").length}`,emoji:"🗺️",color:C.pink},
    {label:"Événements",val:MOCK_EVENTS.length+sharedEvenements.length+pendingContribs.filter(c=>c._type==="evenement"&&c._statut==="published").length,sub:`Admin: ${MOCK_EVENTS.length+sharedEvenements.length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="evenement"&&c._statut==="published").length}`,emoji:"📅",color:C.orange},
    {label:"Signalements",val:dashUserReports.length+MOCK_REPORTS.length,sub:`${[...dashUserReports,...MOCK_REPORTS].filter(r=>r.statut==="pending").length} en attente · ${[...dashUserReports,...MOCK_REPORTS].filter(r=>r.statut==="resolved").length} résolus`,emoji:"🚩",color:C.red},
    {label:"Abonnements actifs",val:MOCK_SUBS.filter(s=>s.statut==="active").length,sub:`Mensuel: ${MOCK_SUBS.filter(s=>s.statut==="active"&&s.plan==="mensuel").length} · Annuel: ${MOCK_SUBS.filter(s=>s.statut==="active"&&s.plan==="annuel").length}`,emoji:"💳",color:C.green},
  ];
  const pendingContribsCount=pendingContribs.filter(c=>c._statut==="pending").length;
  const publishedContribsCount=pendingContribs.filter(c=>c._statut==="published").length;
  const revenue = MOCK_SUBS.filter(s=>s.statut==="active").reduce((a,s)=>a+(Number(s.montant)||0),0);
  const maxH=Math.max(...history.map(h=>h.v),1);
  return (
    <div>
      <h1 style={{fontSize:24,fontWeight:800,color:C.text,margin:"0 0 4px"}}>Dashboard</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 20px"}}>Vue d'ensemble de la plateforme Parent'Hèse</p>

      {/* Live users card */}
      <div style={{...s.card,marginBottom:16,background:"linear-gradient(135deg,#1e1b4b,#2d1b69)",border:"1px solid rgba(124,58,237,0.3)"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:`0 0 6px ${C.green}`,animation:"none"}}/>
              <span style={{fontSize:11,color:C.green,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>Temps réel</span>
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
              <span style={{fontSize:42,fontWeight:800,color:"#fff",transition:"all 0.3s",transform:pulse?"scale(1.06)":"scale(1)",display:"inline-block"}}>{liveUsers}</span>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>utilisateurs inscrits</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:22,fontWeight:800,color:C.green}}>{liveOnline}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>en ligne maintenant</div>
          </div>
        </div>
        {/* Mini sparkline */}
        <div style={{display:"flex",alignItems:"flex-end",gap:3,height:36}}>
          {history.map((h,i)=>(
            <div key={i} style={{flex:1,background:i===history.length-1?"#a78bfa":"rgba(124,58,237,0.35)",borderRadius:"3px 3px 0 0",height:Math.max(4,Math.round((h.v/maxH)*36))+"px",transition:"height 0.4s"}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>Il y a 48s</span>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>Maintenant</span>
        </div>
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:24}}>
        {stats.map((st,i)=><StatCard key={i} {...st}/>)}
      </div>
      {/* Widget contributions réelles */}
      {pendingContribs.length>0&&<div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 12px"}}>📥 Contributions communautaires</p>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1,background:"rgba(251,191,36,0.12)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(251,191,36,0.3)"}}>
            <p style={{margin:0,fontSize:22,fontWeight:800,color:"#d97706"}}>{pendingContribsCount}</p>
            <p style={{margin:0,fontSize:11,color:C.muted}}>En attente</p>
          </div>
          <div style={{flex:1,background:"rgba(16,185,129,0.12)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(16,185,129,0.3)"}}>
            <p style={{margin:0,fontSize:22,fontWeight:800,color:"#10b981"}}>{publishedContribsCount}</p>
            <p style={{margin:0,fontSize:11,color:C.muted}}>Publiées</p>
          </div>
          <div style={{flex:1,background:"rgba(108,92,231,0.08)",borderRadius:12,padding:"10px 14px",border:BD}}>
            <p style={{margin:0,fontSize:22,fontWeight:800,color:C.accent}}>{pendingContribs.length}</p>
            <p style={{margin:0,fontSize:11,color:C.muted}}>Total</p>
          </div>
        </div>
        {pendingContribsCount>0&&<div style={{background:"#FFFBEB",borderRadius:10,padding:"8px 12px",border:"1px solid #FDE68A"}}>
          <p style={{margin:0,fontSize:12,color:"#92400E"}}>⚠️ {pendingContribsCount} contribution{pendingContribsCount>1?"s":""} en attente de modération</p>
        </div>}
      </div>}

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
        <div style={s.card}>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 16px"}}>💰 Revenus Premium</p>
          {(()=>{
            const mensuelCount=MOCK_SUBS.filter(s=>s.plan==="mensuel"&&s.statut==="active").length;
            const annuelCount=MOCK_SUBS.filter(s=>s.plan==="annuel"&&s.statut==="active").length;
            const revMensuel=mensuelCount*4.99;
            const revAnnuel=annuelCount*(39.99/12);
            const totalMois=revMensuel+revAnnuel;
            const totalAnnuel=mensuelCount*4.99*12+annuelCount*39.99;
            const totalUsers=liveUsers||MOCK_USERS.length;
            const premiumUsers=MOCK_USERS.filter(u=>u.premium).length;
            const tauxConversion=Math.round((premiumUsers/totalUsers)*100);
            return(<>
              {/* Revenus principaux */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                <div style={{background:"rgba(16,185,129,0.08)",borderRadius:12,padding:"14px 16px",border:"1px solid rgba(16,185,129,0.2)"}}>
                  <p style={{margin:"0 0 2px",fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>Ce mois</p>
                  <p style={{margin:0,fontSize:28,fontWeight:800,color:C.green}}>{totalMois.toFixed(2)} €</p>
                  <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>{mensuelCount+annuelCount} abonnés actifs</p>
                </div>
                <div style={{background:"rgba(16,185,129,0.05)",borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`}}>
                  <p style={{margin:"0 0 2px",fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>Annuel estimé</p>
                  <p style={{margin:0,fontSize:28,fontWeight:800,color:C.text}}>{totalAnnuel.toFixed(2)} €</p>
                  <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>projection annuelle</p>
                </div>
              </div>

              {/* Détail par plan */}
              <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>Répartition par plan</p>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {[
                  {label:"📅 Mensuel",count:mensuelCount,prix:"4.99 €/mois",rev:revMensuel,color:"#3b82f6",pct:mensuelCount/(mensuelCount+annuelCount||1)*100},
                  {label:"🗓️ Annuel",count:annuelCount,prix:"39.99 €/an",rev:revAnnuel,color:"#f59e0b",pct:annuelCount/(mensuelCount+annuelCount||1)*100},
                ].map((p,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div>
                        <span style={{fontSize:13,fontWeight:600,color:C.text}}>{p.label}</span>
                        <span style={{fontSize:11,color:C.muted,marginLeft:8}}>{p.prix}</span>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <span style={{fontSize:14,fontWeight:700,color:p.color}}>{p.rev.toFixed(2)} €</span>
                        <span style={{fontSize:11,color:C.muted,display:"block"}}>{p.count} abonné{p.count!==1?"s":""}</span>
                      </div>
                    </div>
                    <div style={{background:"rgba(255,255,255,0.05)",borderRadius:4,height:5,overflow:"hidden"}}>
                      <div style={{width:p.pct+"%",height:"100%",background:p.color,borderRadius:4,transition:"width 0.5s"}}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Taux de conversion */}
              <div style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",borderRadius:12,padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:20}}>👑</span>
                    <div>
                      <p style={{margin:0,fontSize:13,fontWeight:700,color:"#fff"}}>Taux de conversion</p>
                      <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.6)"}}>{premiumUsers} Premium / {totalUsers} inscrits</p>
                    </div>
                  </div>
                  <span style={{fontSize:26,fontWeight:800,color:"#fff"}}>{tauxConversion}%</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.15)",borderRadius:4,height:6,overflow:"hidden"}}>
                  <div style={{width:tauxConversion+"%",height:"100%",background:"#fff",borderRadius:4}}/>
                </div>
              </div>
            </>);
          })()}
        </div>
      </div>

      {/* Graphiques statistiques utilisation */}
      {(()=>{
        const JOURS=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
        const HEURES=["6h","8h","10h","12h","14h","16h","18h","20h","22h"];
        const data=[
          [1,2,3,4,3,4,5,6,3],
          [1,2,3,4,3,3,4,5,2],
          [2,3,5,6,5,6,7,8,4],
          [1,2,3,4,3,3,4,5,2],
          [1,2,3,4,4,4,5,6,3],
          [2,4,6,7,6,7,8,9,5],
          [3,5,7,8,7,7,8,9,6],
        ];
        const totalJour=data.map(row=>row.reduce((a,b)=>a+b,0));
        const totalHeure=HEURES.map((_,hi)=>data.reduce((a,row)=>a+row[hi],0));
        const maxJour=Math.max(...totalJour);
        const maxHeure=Math.max(...totalHeure);
        const W=520,H=160,PL=36,PR=16,PT=16,PB=28;
        const chartW=W-PL-PR, chartH=H-PT-PB;
        // Bar chart — jours
        const barW=chartW/JOURS.length;
        // Line chart — heures
        const pts=totalHeure.map((v,i)=>({x:PL+i*(chartW/(HEURES.length-1)),y:PT+chartH-(v/maxHeure)*chartH}));
        const pathD=pts.map((p,i)=>(i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`)).join(" ");
        const areaD=`${pathD} L${pts[pts.length-1].x},${PT+chartH} L${pts[0].x},${PT+chartH} Z`;
        return(
          <div style={{...s.card,marginTop:16}}>
            <p style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:C.text}}>📊 Utilisation de l'application</p>
            <p style={{fontSize:12,color:C.muted,margin:"0 0 20px"}}>Activité simulée — 7 derniers jours</p>

            {/* Graphique barres — par jour */}
            <p style={{fontSize:12,fontWeight:600,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Sessions par jour</p>
            <div style={{overflowX:"auto",marginBottom:24}}>
              <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block"}}>
                {/* Grille */}
                {[0,0.25,0.5,0.75,1].map((p,i)=>{
                  const y=PT+chartH*(1-p);
                  return(<g key={i}>
                    <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    <text x={PL-6} y={y+4} fontSize="9" fill="#8b949e" textAnchor="end">{Math.round(maxJour*p)}</text>
                  </g>);
                })}
                {/* Barres */}
                {totalJour.map((v,i)=>{
                  const bh=Math.round((v/maxJour)*chartH);
                  const x=PL+i*barW+barW*0.15;
                  const w=barW*0.7;
                  const isMax=v===maxJour;
                  return(<g key={i}>
                    <rect x={x} y={PT+chartH-bh} width={w} height={bh} rx="4"
                      fill={isMax?"#a78bfa":"rgba(124,58,237,0.45)"}/>
                    {isMax&&<rect x={x} y={PT+chartH-bh} width={w} height={4} rx="2" fill="#c4b5fd"/>}
                    <text x={x+w/2} y={H-8} fontSize="10" fill="#8b949e" textAnchor="middle">{JOURS[i]}</text>
                    {isMax&&<text x={x+w/2} y={PT+chartH-bh-5} fontSize="9" fill="#a78bfa" textAnchor="middle" fontWeight="700">{v}</text>}
                  </g>);
                })}
              </svg>
            </div>

            {/* Graphique ligne — par heure */}
            <p style={{fontSize:12,fontWeight:600,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Sessions par heure</p>
            <div style={{overflowX:"auto",marginBottom:16}}>
              <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block"}}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                {/* Grille */}
                {[0,0.5,1].map((p,i)=>{
                  const y=PT+chartH*(1-p);
                  return(<g key={i}>
                    <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    <text x={PL-6} y={y+4} fontSize="9" fill="#8b949e" textAnchor="end">{Math.round(maxHeure*p)}</text>
                  </g>);
                })}
                {/* Aire */}
                <path d={areaD} fill="url(#areaGrad)"/>
                {/* Ligne */}
                <path d={pathD} fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinejoin="round"/>
                {/* Points et labels */}
                {pts.map((p,i)=>(
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4" fill={totalHeure[i]===maxHeure?"#c4b5fd":"#7c3aed"} stroke="#0d1117" strokeWidth="2"/>
                    <text x={p.x} y={H-8} fontSize="10" fill="#8b949e" textAnchor="middle">{HEURES[i]}</text>
                    {totalHeure[i]===maxHeure&&<text x={p.x} y={p.y-8} fontSize="9" fill="#c4b5fd" textAnchor="middle" fontWeight="700">{totalHeure[i]}</text>}
                  </g>
                ))}
              </svg>
            </div>

            {/* Insights */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {[
                {label:"Jour le + actif",val:JOURS[totalJour.indexOf(maxJour)],emoji:"📅"},
                {label:"Heure de pointe",val:HEURES[totalHeure.indexOf(maxHeure)],emoji:"⏰"},
                {label:"Sessions / semaine",val:String(data.flat().reduce((a,b)=>a+b,0)*12),emoji:"📱"},
              ].map((ins,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",border:`1px solid ${C.border}`,textAlign:"center"}}>
                  <span style={{fontSize:20}}>{ins.emoji}</span>
                  <p style={{margin:"4px 0 2px",fontSize:16,fontWeight:800,color:C.text}}>{ins.val}</p>
                  <p style={{margin:0,fontSize:10,color:C.muted}}>{ins.label}</p>
                </div>
              ))}
            </div>

            {/* Graphique par mois */}
            {(()=>{
              const MOIS=["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
              const dataMois=[120,145,210,280,320,490,540,480,360,290,180,620];
              const maxMois=Math.max(...dataMois);
              const WM=520,HM=180,PLM=44,PRM=16,PTM=16,PBM=28;
              const chartWM=WM-PLM-PRM,chartHM=HM-PTM-PBM;
              const barWM=chartWM/MOIS.length;
              const moisActuel=new Date().getMonth();
              return(<>
                <p style={{fontSize:12,fontWeight:600,color:C.muted,margin:"20px 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Sessions par mois</p>
                <div style={{overflowX:"auto"}}>
                  <svg viewBox={`0 0 ${WM} ${HM}`} width="100%" style={{display:"block"}}>
                    {[0,0.25,0.5,0.75,1].map((p,i)=>{
                      const y=PTM+chartHM*(1-p);
                      return(<g key={i}>
                        <line x1={PLM} y1={y} x2={WM-PRM} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                        <text x={PLM-6} y={y+4} fontSize="9" fill="#8b949e" textAnchor="end">{Math.round(maxMois*p)}</text>
                      </g>);
                    })}
                    {dataMois.map((v,i)=>{
                      const bh=Math.round((v/maxMois)*chartHM);
                      const x=PLM+i*barWM+barWM*0.15;
                      const w=barWM*0.7;
                      const isCurrent=i===moisActuel;
                      const isMax=v===maxMois;
                      const fill=isCurrent?"#10b981":isMax?"#a78bfa":"rgba(124,58,237,0.4)";
                      return(<g key={i}>
                        <rect x={x} y={PTM+chartHM-bh} width={w} height={bh} rx="4" fill={fill}/>
                        {(isCurrent||isMax)&&<rect x={x} y={PTM+chartHM-bh} width={w} height={4} rx="2" fill={isCurrent?"#34d399":"#c4b5fd"}/>}
                        <text x={x+w/2} y={HM-8} fontSize="9" fill="#8b949e" textAnchor="middle">{MOIS[i]}</text>
                        {(isCurrent||isMax)&&<text x={x+w/2} y={PTM+chartHM-bh-6} fontSize="9" fill={isCurrent?"#34d399":"#c4b5fd"} textAnchor="middle" fontWeight="700">{v}</text>}
                      </g>);
                    })}
                    {/* Ligne de tendance */}
                    {(()=>{
                      const pts2=dataMois.map((v,i)=>({x:PLM+i*barWM+barWM*0.5,y:PTM+chartHM-(v/maxMois)*chartHM}));
                      const d2=pts2.map((p,i)=>i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`).join(" ");
                      return <path d={d2} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4,3" strokeLinejoin="round"/>;
                    })()}
                  </svg>
                </div>
                <div style={{display:"flex",gap:12,marginTop:10,flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:2,background:"#a78bfa"}}/><span style={{fontSize:11,color:C.muted}}>Record</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:2,background:"#10b981"}}/><span style={{fontSize:11,color:C.muted}}>Mois en cours</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:24,height:2,borderTop:"2px dashed rgba(255,255,255,0.2)"}}/><span style={{fontSize:11,color:C.muted}}>Tendance</span></div>
                </div>
              </>);
            })()}
          </div>
        );
      })()}
    </div>
  );
}

const ETIQUETTES_PRESET=[
  {val:"teste_equipe",label:"✅ Testé par notre équipe",hasText:false,color:"#10b981",bg:"#d1fae5"},
  {val:"tnd_friendly",label:"🧩 TND Friendly",hasText:false,color:"#8b5cf6",bg:"#ede9fe"},
  {val:"coup_coeur",label:"❤️ Coup de cœur",hasText:false,color:"#ec4899",bg:"#fce7f3"},
  {val:"nouveaute",label:"🆕 Nouveauté",hasText:false,color:"#3b82f6",bg:"#dbeafe"},
  {val:"gratuit",label:"🆓 Gratuit",hasText:false,color:"#059669",bg:"#d1fae5"},
  {val:"pmr",label:"♿ Accessible PMR",hasText:false,color:"#6366f1",bg:"#e0e7ff"},
];

function EtiquettesField({value=[],onChange}){
  const [showCustom,setShowCustom]=useState(false);
  const [customText,setCustomText]=useState("");
  const [customColor,setCustomColor]=useState("#6b7280");
  const CUSTOM_COLORS=["#6b7280","#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#f97316"];
  const toggle=(preset)=>{
    const exists=value.find(e=>e.val===preset.val);
    if(exists) onChange(value.filter(e=>e.val!==preset.val));
    else onChange([...value,preset]);
  };
  const addCustom=()=>{
    if(!customText.trim())return;
    onChange([...value,{val:"custom_"+Date.now(),label:customText.trim(),hasText:false,color:customColor,bg:customColor+"22"}]);
    setCustomText("");setShowCustom(false);
  };
  return(
    <div style={{marginBottom:14}}>
      <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>🏷️ Étiquettes</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
        {ETIQUETTES_PRESET.map(p=>{
          const active=value.some(e=>e.val===p.val);
          return(
            <button key={p.val} onClick={()=>toggle(p)} style={{padding:"6px 12px",borderRadius:20,border:`2px solid ${active?p.color:"rgba(255,255,255,0.1)"}`,background:active?p.bg+"33":"transparent",color:active?p.color:C.muted,fontSize:12,cursor:"pointer",fontWeight:active?700:400,transition:"all 0.15s"}}>
              {p.label}
            </button>
          );
        })}
        <button onClick={()=>setShowCustom(!showCustom)} style={{padding:"6px 12px",borderRadius:20,border:`2px solid ${showCustom?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.1)"}`,background:showCustom?"rgba(255,255,255,0.08)":"transparent",color:showCustom?C.text:C.muted,fontSize:12,cursor:"pointer",fontWeight:showCustom?700:400,transition:"all 0.15s"}}>
          ✏️ Personnalisée
        </button>
      </div>
      {showCustom&&(
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"12px 14px",marginBottom:8,border:`1px solid ${C.border}`}}>
          <p style={{margin:"0 0 8px",fontSize:11,color:C.muted,fontWeight:600}}>Créer une étiquette personnalisée</p>
          <input value={customText} onChange={e=>setCustomText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustom()} placeholder="Ex : Coup de cœur été, Idéal pluie..." style={{...s.input,marginBottom:8}} maxLength={30}/>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:11,color:C.muted}}>Couleur :</span>
            {CUSTOM_COLORS.map(col=>(
              <button key={col} onClick={()=>setCustomColor(col)} style={{width:22,height:22,borderRadius:"50%",background:col,border:customColor===col?"3px solid #fff":"2px solid transparent",outline:customColor===col?`2px solid ${col}`:"none",cursor:"pointer",flexShrink:0}}/>
            ))}
            {customText&&<span style={{marginLeft:"auto",padding:"3px 10px",borderRadius:20,background:customColor+"22",color:customColor,fontSize:11,fontWeight:600}}>{customText}</span>}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addCustom} disabled={!customText.trim()} style={{...s.btn(customText.trim()?C.accent:"#374151"),fontSize:12,padding:"7px 14px"}}>✓ Ajouter</button>
            <button onClick={()=>{setShowCustom(false);setCustomText("");}} style={{...s.btnOutline(C.muted),fontSize:12,padding:"7px 12px"}}>Annuler</button>
          </div>
        </div>
      )}
      {value.length>0&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {value.map((e,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",fontSize:12,fontWeight:600,border:`1px solid ${(e.color||"#e5e7eb")}44`}}>
              {e.label}
              <button onClick={()=>onChange(value.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:e.color||"#6b7280",cursor:"pointer",fontSize:13,padding:0,lineHeight:1}}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgrammedField({value,onChange,label="📅 Publication programmée"}){
  return(
    <div style={{marginBottom:14}}>
      <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:6,fontWeight:500}}>{label}</label>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <input type="date" value={value?.date||""} onChange={e=>onChange({...value,date:e.target.value})} style={{...s.input,fontSize:12}}/>
        <input type="time" value={value?.heure||""} onChange={e=>onChange({...value,heure:e.target.value})} style={{...s.input,fontSize:12}}/>
      </div>
      {value?.date&&value?.heure&&(()=>{const dt=new Date(value.date+"T"+value.heure);return isNaN(dt.getTime())?null:(
        <p style={{margin:"6px 0 0",fontSize:11,color:C.accent}}>
          ✓ Publication prévue le {dt.toLocaleString("fr-FR",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
        </p>
      );})()}
      {value?.date&&!value?.heure&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>Choisissez aussi une heure</p>}
      {(value?.date||value?.heure)&&<button onClick={()=>onChange({date:"",heure:""})} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",marginTop:4,padding:0}}>× Supprimer la programmation</button>}
    </div>
  );
}

function useScheduler(setItems,syncFn){
  useEffect(()=>{
    const check=()=>{
      const now=new Date();
      setItems(prev=>{
        let changed=false;
        const next=prev.map(item=>{
          if(item.statut==="scheduled"&&item.programmation?.date&&item.programmation?.heure){
            const pub=new Date(item.programmation.date+"T"+item.programmation.heure);
            if(pub<=now){ changed=true; return {...item,statut:"published"}; }
          }
          return item;
        });
        if(changed&&syncFn)syncFn(next);
        return changed?next:prev;
      });
    };
    check();
    const interval=setInterval(check,30000);
    return()=>clearInterval(interval);
  },[]);
}

function Activites({sharedActivites,setSharedActivites,customCatActivites=[]}) {
  const MOCK_IDS=new Set(MOCK_ACTIVITES.map(a=>a.id));
  const [items,setItems] = useState(()=>[...MOCK_ACTIVITES,...(sharedActivites||[]).filter(a=>!MOCK_IDS.has(a.id)&&a._source!=="noel")]);
  const syncItems=(newItems)=>{
    setItems(newItems);
    if(setSharedActivites){
      const mine=newItems.filter(a=>!MOCK_IDS.has(a.id)).map(a=>({...a,_source:"activites"}));
      setSharedActivites(prev=>[...prev.filter(a=>a._source!=="activites"),...mine]);
    }
  };
  useScheduler(setItems,syncItems);
  const [search,setSearch] = useState("");
  const [filterStatut,setFilterStatut] = useState("");
  const [modal,setModal] = useState(null);
  const emptyForm = {titre:"",desc:"",duree:"",difficulte:"",lieu:"",energie:"",categorie:"",ageMin:"",ageMax:"",materielStr:"",etapes:"",premium:false,statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false};
  const [form,setForm] = useState(emptyForm);
  const tf = (key) => setForm(prev=>({...prev,[key]:!prev[key]}));
  const filtered = items.filter(a=>(filterStatut===""||a.statut===filterStatut)&&(!search||((a.titre||a.nom||"").toLowerCase()).includes(search.toLowerCase())));
  const {slice:filteredPage,Pagination:PagActiv,reset:resetPagActiv}=usePagination(filtered,8);
  useEffect(()=>resetPagActiv(),[search,filterStatut]);
  const save = () => {
    if(!form.titre) return;
    const normalized={
      ...form,
      nom:form.titre,
      age:(form.ageMin&&form.ageMax)?form.ageMin.replace(" an","").replace(" ans","")+" - "+form.ageMax.replace(" an","").replace(" ans","")+" ans":form.ageMin||form.ageMax||"Tous ages",
      energie:form.energie||"motiv",
      materiel:form.materielStr?form.materielStr.split(",").map(m=>m.trim()):[],
      tnd:null,
    };
    if(modal?.mode==="edit") syncItems(items.map(a=>a.id===modal.item.id?{...a,...normalized}:a));
    else syncItems([...items,{id:Date.now().toString(),...normalized,auteur:"Admin",date:new Date().toLocaleDateString()}]);
    setModal(null);
  };
  const chkStyle = (active) => ({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(124,58,237,0.4)":C.border}`,background:active?"rgba(124,58,237,0.1)":"transparent",color:active?"#a78bfa":C.muted,fontSize:12,cursor:"pointer",userSelect:"none",marginBottom:4,flexShrink:0});
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Activités</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez le catalogue d'activités</p></div>
        <button style={s.btn(C.accent)} onClick={()=>{setForm(emptyForm);setModal({mode:"add"});}}>+ Proposer une activite</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher une activité..."/>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["","published","pending","draft"].map(f=>(
          <button key={f} onClick={()=>setFilterStatut(f)} style={{...s.btnOutline(filterStatut===f?C.accent:C.muted),background:filterStatut===f?"rgba(124,58,237,0.15)":"transparent"}}>{f===""?"Tous":f==="published"?"Publiés":f==="pending"?"En attente":"Brouillons"}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filteredPage.map(a=>(
          <div key={a.id} style={{...s.card}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <span style={s.badge("rgba(124,58,237,0.15)","#a78bfa")}>{a.categorie}</span>
              {statutBadge(a.statut)}
            </div>
            <p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{a.titre}</p>
            {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
            <p style={{fontSize:12,color:C.muted,margin:"0 0 10px"}}>{a.lieu==="interieur"?"🏠 Intérieur":"🌳 Extérieur"} · {a.ageMin}-{a.ageMax} ans</p>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}>
              {a.duree&&<div>⏱ {a.duree}</div>}
              <div>{a.premium?"👑 Premium":"🆓 Gratuit"}</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({...emptyForm,...a});setModal({mode:"edit",item:a});}}>✏️ Modifier</button>
              <button style={s.btnOutline(C.red)} onClick={()=>syncItems(items.filter(x=>x.id!==a.id))}>🗑️</button>
            </div>
          </div>
        ))}
        <PagActiv/>
      </div>
      {modal&&<Modal title={modal.mode==="edit"?"Modifier l'activite":"Proposer une activite"} onClose={()=>setModal(null)} width={620}>
        {(()=>{
          const tf=(key)=>setForm(prev=>({...prev,[key]:!prev[key]}));
          const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(124,58,237,0.4)":C.border}`,background:active?"rgba(124,58,237,0.1)":"transparent",color:active?"#a78bfa":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
          return(<div>
          <AdminField label="Titre *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Peinture avec les doigts"/></AdminField>
          <AdminField label="Photo (optionnel)">
            <input id="admin-act-photo" type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={async e=>{const file=e.target.files[0];if(!file)return;try{const compressed=await compresserImage(file);setForm(prev=>({...prev,photo:compressed}));}catch(err){alert("Impossible de lire cette image.");}}}/>
            {form.photo?(
              <div style={{position:"relative",borderRadius:10,overflow:"hidden",height:120}}>
                <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <button onClick={()=>document.getElementById("admin-act-photo").click()} style={{background:WH,border:"none",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>Changer</button>
                  <button onClick={()=>setForm(prev=>({...prev,photo:null}))} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer",color:WH}}>Supprimer</button>
                </div>
              </div>
            ):(
              <div onClick={()=>document.getElementById("admin-act-photo").click()} style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"16px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
                <div style={{fontSize:22,marginBottom:4}}>⬆️</div>
                <p style={{margin:0,fontSize:13,color:C.text}}>Ajouter une photo</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>JPG, PNG, WEBP - Max 8MB</p>
              </div>
            )}
          </AdminField>
          <AdminField label="Description *"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={form.desc||""} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Decris l activite..."/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Duree *"><select style={s.input} value={form.duree||""} onChange={e=>setForm({...form,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Difficulte *"><select style={s.input} value={form.difficulte||""} onChange={e=>setForm({...form,difficulte:e.target.value})}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Lieu *"><select style={s.input} value={form.lieu||""} onChange={e=>setForm({...form,lieu:e.target.value})}><option value="">Choisir</option><option value="interieur">Interieur</option><option value="exterieur">Exterieur</option></select></AdminField>
            <AdminField label="Motivation *"><select style={s.input} value={form.energie||""} onChange={e=>setForm({...form,energie:e.target.value})}><option value="">Choisir</option><option value="fatigue">Fatigue</option><option value="motiv">Motiv</option></select></AdminField>
          </div>
          <AdminField label="Categorie *">
            <select style={s.input} value={(form.categorie&&![...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)].includes(form.categorie)&&form.categorie!=="")?"__autre__":form.categorie||""} onChange={e=>{if(e.target.value==="__autre__")setForm({...form,categorie:"__autre__"});else setForm({...form,categorie:e.target.value});}}>
              <option value="">Choisir</option>
              {[...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)].map(v=><option key={v}>{v}</option>)}
              <option value="__autre__">✏️ Autre type d'activité...</option>
            </select>
            {(form.categorie==="__autre__"||(form.categorie&&![...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)].includes(form.categorie)))&&(
              <input style={{...s.input,marginTop:8}} value={form.categorie==="__autre__"?"":form.categorie||""} onChange={e=>setForm({...form,categorie:e.target.value})} placeholder="Précisez le type (ex: Théâtre, Poterie, Yoga...)"/>
            )}
          </AdminField>
          <AdminField label="Age conseille">
            <div style={{display:"flex",gap:8}}>
              <select style={{...s.input,flex:1}} value={form.ageMin||""} onChange={e=>setForm({...form,ageMin:e.target.value})}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select>
              <select style={{...s.input,flex:1}} value={form.ageMax||""} onChange={e=>setForm({...form,ageMax:e.target.value})}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select>
            </div>
          </AdminField>
          <AdminField label="Materiel necessaire"><input style={s.input} value={form.materielStr||""} onChange={e=>setForm({...form,materielStr:e.target.value})} placeholder="Ex : peinture, papier, tablier"/></AdminField>
          <AdminField label="Etapes"><textarea style={{...s.input,minHeight:80,resize:"vertical"}} value={form.etapes||""} onChange={e=>setForm({...form,etapes:e.target.value})} placeholder={"1. Preparer le materiel\n2. ..."}/></AdminField>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginBottom:14}}>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:"#1a1a1a"}}>🧩 Compatibilité TND</p>
            <p style={{margin:"0 0 14px",fontSize:11,color:C.muted}}>Ces informations aident les familles à trouver les activités adaptées à leur enfant.</p>

            {/* Profils */}
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:C.text}}>Profils TND adaptés :</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {[
                {k:"profilTous",l:"🌱 Tous profils",bg:"#EAF3DE",bc:"#3B6D11",col:"#3B6D11"},
                {k:"profilTSA",l:"🧩 TSA",bg:"#EEEDFE",bc:"#3C3489",col:"#3C3489"},
                {k:"profilTDAH",l:"⚡ TDAH",bg:"#E1F5EE",bc:"#085041",col:"#085041"},
                {k:"profilDYS",l:"📖 DYS",bg:"#FAEEDA",bc:"#633806",col:"#633806"},
              ].map(({k,l,bg,bc,col})=>(
                <button key={k} onClick={()=>setForm(p=>({...p,[k]:!p[k]}))} style={{padding:"7px 14px",borderRadius:20,border:`2px solid ${form[k]?bc:"#E5E7EB"}`,background:form[k]?bg:WH,color:form[k]?col:"#9CA3AF",fontSize:12,fontWeight:form[k]?700:400,cursor:"pointer"}}>
                  {form[k]?"✓ ":""}{l}
                </button>
              ))}
            </div>

            {/* Niveaux sensoriels sliders */}
            <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:C.text}}>Niveaux sensoriels :</p>
            {[
              {k:"niveauBruit",l:"🔊 Niveau sonore",left:"Silencieux",right:"Bruyant"},
              {k:"niveauVisuel",l:"💡 Stimulation visuelle",left:"Calme",right:"Intense"},
              {k:"niveauPhysique",l:"🤸 Activité physique",left:"Aucune",right:"Intense"},
              {k:"niveauAttention",l:"⏱️ Durée d'attention",left:"Courte",right:"Longue"},
            ].map(({k,l,left,right})=>{
              const val=form[k]||0;
              const col=val<=33?"#10B981":val<=66?"#F59E0B":"#EF4444";
              const badge=val<=33?"Faible":val<=66?"Moyen":"Élevé";
              return(
                <div key={k} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:12,color:C.text}}>{l}</span>
                    <span style={{fontSize:11,fontWeight:700,color:col,background:col+"18",padding:"2px 10px",borderRadius:20}}>{badge}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:10,color:C.muted,width:52,textAlign:"right",flexShrink:0}}>{left}</span>
                    <div style={{flex:1,height:5,background:"#E5E7EB",borderRadius:6,overflow:"hidden"}}>
                      <div style={{height:"100%",width:val+"%",background:col,borderRadius:6}}/>
                    </div>
                    <span style={{fontSize:10,color:C.muted,width:52,flexShrink:0}}>{right}</span>
                  </div>
                  <input type="range" min={0} max={100} value={val} onChange={e=>setForm(p=>({...p,[k]:Number(e.target.value)}))} style={{width:"100%",marginTop:4,accentColor:col,cursor:"pointer"}}/>
                </div>
              );
            })}

            {/* Adaptations */}
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:C.text}}>Adaptations possibles :</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
              {["Peut se faire en silence","Rythme libre","Activité individuelle","Peu de règles","Résultat concret","Stimulation douce","Peut être interrompue","Adapté aux hypersensibles"].map(ad=>{
                const actif=(form.adaptations||[]).includes(ad);
                return(
                  <div key={ad} onClick={()=>setForm(p=>({...p,adaptations:actif?(p.adaptations||[]).filter(x=>x!==ad):[...(p.adaptations||[]),ad]}))} style={{padding:"7px 10px",borderRadius:8,border:`1.5px solid ${actif?"#6C5CE7":"#E5E7EB"}`,background:actif?"#EEEDFE":WH,color:actif?"#3C3489":"#9CA3AF",fontSize:11,fontWeight:actif?700:400,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                    <span>{actif?"☑":"☐"}</span>{ad}
                  </div>
                );
              })}
            </div>

            {/* Commentaire */}
            <AdminField label="Conseil TND (optionnel)">
              <textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={form.commentaireTND||""} onChange={e=>setForm({...form,commentaireTND:e.target.value.slice(0,200)})} placeholder="Ex : Idéal pour les enfants TSA, activité calme sans surprise..."/>
              <p style={{margin:"4px 0 0",fontSize:10,color:C.muted,textAlign:"right"}}>{(form.commentaireTND||"").length}/200</p>
            </AdminField>
          </div>
          <div style={{background:"#FFFBEB",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:16}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les activites proposees doivent etre destinees aux enfants.</p></div>
          <EtiquettesField value={form.etiquettes||[]} onChange={v=>setForm({...form,etiquettes:v})}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,padding:"10px 14px",background:"rgba(124,58,237,0.08)",borderRadius:10}}>
            <div><p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>👑 Contenu Premium</p><p style={{margin:0,fontSize:11,color:C.muted}}>Reserve aux abonnes</p></div>
            <Tog on={!!form.premium} onChange={()=>setForm({...form,premium:!form.premium})}/>
          </div>
          <AdminField label="Statut"><select style={s.input} value={form.statut||"draft"} onChange={e=>setForm({...form,statut:e.target.value})}><option value="draft">Brouillon</option><option value="pending">En attente</option><option value="published">Publié</option><option value="scheduled">⏰ Programmé</option></select></AdminField>
          {(form.statut==="scheduled"||(form.programmation?.date||form.programmation?.heure))&&(
            <ProgrammedField value={form.programmation||{date:"",heure:""}} onChange={v=>setForm({...form,programmation:v})}/>
          )}
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
            <button style={s.btn(C.accent)} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer"}</button>
          </div>
        </div>);
        })()}
      </Modal>}
    </div>
  );
}

function Sorties({sharedSorties=[],setSharedSorties,customCatSorties=[]}) {
  const DEPTS_ALL=[["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes-de-Haute-Provence"],["05","Hautes-Alpes"],["06","Alpes-Maritimes"],["07","Ardeche"],["08","Ardennes"],["09","Ariege"],["10","Aube"],["11","Aude"],["12","Aveyron"],["13","Bouches-du-Rhone"],["14","Calvados"],["15","Cantal"],["16","Charente"],["17","Charente-Maritime"],["18","Cher"],["19","Correze"],["20","Corse"],["21","Cote-d-Or"],["22","Cotes-d-Armor"],["23","Creuse"],["24","Dordogne"],["25","Doubs"],["26","Drome"],["27","Eure"],["28","Eure-et-Loir"],["29","Finistere"],["30","Gard"],["31","Haute-Garonne"],["32","Gers"],["33","Gironde"],["34","Herault"],["35","Ille-et-Vilaine"],["36","Indre"],["37","Indre-et-Loire"],["38","Isere"],["39","Jura"],["40","Landes"],["41","Loir-et-Cher"],["42","Loire"],["43","Haute-Loire"],["44","Loire-Atlantique"],["45","Loiret"],["46","Lot"],["47","Lot-et-Garonne"],["48","Lozere"],["49","Maine-et-Loire"],["50","Manche"],["51","Marne"],["52","Haute-Marne"],["53","Mayenne"],["54","Meurthe-et-Moselle"],["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Nievre"],["59","Nord"],["60","Oise"],["61","Orne"],["62","Pas-de-Calais"],["63","Puy-de-Dome"],["64","Pyrenees-Atlantiques"],["65","Hautes-Pyrenees"],["66","Pyrenees-Orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rhone"],["70","Haute-Saone"],["71","Saone-et-Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute-Savoie"],["75","Paris"],["76","Seine-Maritime"],["77","Seine-et-Marne"],["78","Yvelines"],["79","Deux-Sevres"],["80","Somme"],["81","Tarn"],["82","Tarn-et-Garonne"],["83","Var"],["84","Vaucluse"],["85","Vendee"],["86","Vienne"],["87","Haute-Vienne"],["88","Vosges"],["89","Yonne"],["90","Territoire de Belfort"],["91","Essonne"],["92","Hauts-de-Seine"],["93","Seine-Saint-Denis"],["94","Val-de-Marne"],["95","Val-d-Oise"],["971","Guadeloupe"],["972","Martinique"],["973","Guyane"],["974","La Reunion"]];
  const emptyForm={titre:"",dept:"",adresse:"",horaires:"",prix:"",categorie:"",statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false};
  const MOCK_IDS=new Set(MOCK_SORTIES.map(o=>o.id));
  const [items,setItems] = useState(()=>[...MOCK_SORTIES,...(sharedSorties||[]).filter(o=>!MOCK_IDS.has(o.id))]);
  const syncItems=(newItems)=>{setItems(newItems);if(setSharedSorties)setSharedSorties(newItems.filter(o=>!MOCK_IDS.has(o.id)));};
  useScheduler(setItems,syncItems);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState(emptyForm);
  const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
  const filtered = items.filter(a=>!search||((a.titre||a.nom||"").toLowerCase()).includes(search.toLowerCase()));
  const {slice:filteredPageS,Pagination:PagSort,reset:resetPagSort}=usePagination(filtered,8);
  useEffect(()=>resetPagSort(),[search]);
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") syncItems(items.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else syncItems([...items,{id:Date.now().toString(),...form}]);
    setModal(null);
  };
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Sorties</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez les lieux de sortie</p></div>
        <button style={s.btn(C.pink)} onClick={()=>{setForm(emptyForm);setModal({mode:"add"});}}>+ Nouvelle sortie</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher une sortie..."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filteredPageS.map(o=>(
          <div key={o.id} style={{...s.card}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <span style={s.badge("rgba(236,72,153,0.15)","#f472b6")}>{o.categorie}</span>
              {statutBadge(o.statut)}
            </div>
            <p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{o.titre}</p>
            <p style={{fontSize:12,color:C.muted,margin:"0 0 10px"}}>📍 {o.dept}</p>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}><div>🕐 {o.horaires}</div><div>💶 {o.prix}</div></div>
            <div style={{display:"flex",gap:6}}>
              <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({...emptyForm,...o});setModal({mode:"edit",item:o});}}>✏️ Modifier</button>
              <button style={s.btnOutline(C.red)} onClick={()=>syncItems(items.filter(x=>x.id!==o.id))}>🗑️</button>
            </div>
          </div>
        ))}
        <PagSort/>
      </div>
      {modal&&(()=>{
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(236,72,153,0.4)":C.border}`,background:active?"rgba(236,72,153,0.1)":"transparent",color:active?"#f472b6":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
        const toutesCategories=[...TYPES_SORTIE,...customCatSorties.map(c=>c.label)];
        const estAutre=form.categorie!==""&&!toutesCategories.includes(form.categorie);
        return(
        <Modal title={modal.mode==="edit"?"Modifier la sortie":"Proposer une sortie"} onClose={()=>setModal(null)} width={600}>
          <AdminField label="Titre *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Parc de la Villette"/></AdminField>
          <AdminField label="Département *">
            <select style={s.input} value={form.dept||""} onChange={e=>setForm({...form,dept:e.target.value})}>
              <option value="">Choisir un département</option>
              {DEPTS_ALL.map(([code,nom])=><option key={code} value={`${code} - ${nom}`}>{code} - {nom}</option>)}
            </select>
          </AdminField>
          <AdminField label="Type de sortie *">
            <select style={s.input} value={estAutre?"__autre__":(form.categorie||"")} onChange={e=>setForm({...form,categorie:e.target.value==="__autre__"?" ":e.target.value})}>
              <option value="">Choisir un type</option>
              {toutesCategories.map(t=><option key={t}>{t}</option>)}
              <option value="__autre__">Autre...</option>
            </select>
            {estAutre&&(
              <input style={{...s.input,marginTop:8}} value={form.categorie.trim()} onChange={e=>setForm({...form,categorie:e.target.value||" "})} placeholder="Precise le type de sortie" autoFocus/>
            )}
          </AdminField>
          <AdminField label="Adresse"><input style={s.input} value={form.adresse||""} onChange={e=>setForm({...form,adresse:e.target.value})} placeholder="123 rue de la Paix, Paris"/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Horaires"><input style={s.input} value={form.horaires||""} onChange={e=>setForm({...form,horaires:e.target.value})} placeholder="9h-18h"/></AdminField>
            <AdminField label="Prix"><input style={s.input} value={form.prix||""} onChange={e=>setForm({...form,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
          </div>

          {/* Accessibilité */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:4}}>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#3b82f6"}}>♿ Mobilité réduite PMR</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["pmr_fauteuil","Accès fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptées"],["pmr_personnel","Personnel formé"],["pmr_chemin","Chemin accessible"]].map(([k,l])=>(
                <div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>
              ))}
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#a78bfa"}}>🧩 Troubles du neurodéveloppement TND</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Ces infos aident les familles TND</p>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#8b5cf6"}}>TSA Autisme</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumière douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,l])=>(
                <div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>
              ))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#ec4899"}}>TDAH</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tdah_espace","Grand espace"],["tdah_physique","Activité physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variée"]].map(([k,l])=>(
                <div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>
              ))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#06b6d4"}}>DYS</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["dys_visuels","Supports visuels"],["dys_nonecrite","Non écrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,l])=>(
                <div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>
              ))}
            </div>
          </div>

          <div style={{background:"rgba(245,158,11,0.08)",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:16}}>👶</span>
            <p style={{margin:0,fontSize:12,color:"#f59e0b"}}>Les sorties proposées doivent être adaptées aux enfants.</p>
          </div>

          <EtiquettesField value={form.etiquettes||[]} onChange={v=>setForm({...form,etiquettes:v})}/>
          <AdminField label="Statut"><select style={s.input} value={form.statut||"draft"} onChange={e=>setForm({...form,statut:e.target.value})}><option value="draft">Brouillon</option><option value="pending">En attente</option><option value="published">Publié</option><option value="scheduled">⏰ Programmé</option></select></AdminField>
          {(form.statut==="scheduled"||(form.programmation?.date||form.programmation?.heure))&&(
            <ProgrammedField value={form.programmation||{date:"",heure:""}} onChange={v=>setForm({...form,programmation:v})}/>
          )}
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
            <button style={s.btn(C.pink)} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer"}</button>
          </div>
        </Modal>
        );
      })()}
    </div>
  );
}

function Evenements({sharedEvenements=[],setSharedEvenements,customCatEvenements=[]}) {
  const MOCK_IDS=new Set(MOCK_EVENTS.map(o=>o.id));
  const [items,setItems] = useState(()=>[...MOCK_EVENTS,...(sharedEvenements||[]).filter(o=>!MOCK_IDS.has(o.id))]);
  const syncItems=(newItems)=>{setItems(newItems);if(setSharedEvenements)setSharedEvenements(newItems.filter(o=>!MOCK_IDS.has(o.id)));};
  useScheduler(setItems,syncItems);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({titre:"",desc:"",type:"",ville:"",dept:"",date:"",fin:"",horaires:"",prix:"",adresse:"",organisateur:"",statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false});
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") syncItems(items.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else syncItems([...items,{id:Date.now().toString(),...form}]);
    setModal(null);
  };
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Événements</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez les événements ponctuels</p></div>
        <button style={s.btn(C.orange)} onClick={()=>{setForm({titre:"",date:"",fin:"",ville:"",organisateur:"",prix:"",type:"spectacle",statut:"draft"});setModal({mode:"add"});}}>+ Nouvel événement</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un événement..."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {items.filter(a=>!search||((a.titre||a.nom||"").toLowerCase()).includes(search.toLowerCase())).map(a=>(
          <div key={a.id} style={{...s.card}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <span style={s.badge("rgba(249,115,22,0.15)","#fb923c")}>{a.type}</span>
              {statutBadge(a.statut)}
            </div>
            <p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{a.titre}</p>
            {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
            <p style={{fontSize:12,color:C.muted,margin:"0 0 10px"}}>📍 {a.ville}</p>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}>
              <div>📅 {a.date}</div>
              {a.prix&&<div>💶 {a.prix}</div>}
            </div>
            <div style={{display:"flex",gap:6}}>
              <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({...a});setModal({mode:"edit",item:a});}}>✏️ Modifier</button>
              <button style={s.btnOutline(C.red)} onClick={()=>syncItems(items.filter(x=>x.id!==a.id))}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(()=>{
        const DEPTS_EVT=[["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes-de-Haute-Provence"],["05","Hautes-Alpes"],["06","Alpes-Maritimes"],["07","Ardeche"],["08","Ardennes"],["09","Ariege"],["10","Aube"],["11","Aude"],["12","Aveyron"],["13","Bouches-du-Rhone"],["14","Calvados"],["15","Cantal"],["16","Charente"],["17","Charente-Maritime"],["18","Cher"],["19","Correze"],["20","Corse"],["21","Cote-d-Or"],["22","Cotes-d-Armor"],["23","Creuse"],["24","Dordogne"],["25","Doubs"],["26","Drome"],["27","Eure"],["28","Eure-et-Loir"],["29","Finistere"],["30","Gard"],["31","Haute-Garonne"],["32","Gers"],["33","Gironde"],["34","Herault"],["35","Ille-et-Vilaine"],["36","Indre"],["37","Indre-et-Loire"],["38","Isere"],["39","Jura"],["40","Landes"],["41","Loir-et-Cher"],["42","Loire"],["43","Haute-Loire"],["44","Loire-Atlantique"],["45","Loiret"],["46","Lot"],["47","Lot-et-Garonne"],["48","Lozere"],["49","Maine-et-Loire"],["50","Manche"],["51","Marne"],["52","Haute-Marne"],["53","Mayenne"],["54","Meurthe-et-Moselle"],["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Nievre"],["59","Nord"],["60","Oise"],["61","Orne"],["62","Pas-de-Calais"],["63","Puy-de-Dome"],["64","Pyrenees-Atlantiques"],["65","Hautes-Pyrenees"],["66","Pyrenees-Orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rhone"],["70","Haute-Saone"],["71","Saone-et-Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute-Savoie"],["75","Paris"],["76","Seine-Maritime"],["77","Seine-et-Marne"],["78","Yvelines"],["79","Deux-Sevres"],["80","Somme"],["81","Tarn"],["82","Tarn-et-Garonne"],["83","Var"],["84","Vaucluse"],["85","Vendee"],["86","Vienne"],["87","Haute-Vienne"],["88","Vosges"],["89","Yonne"],["90","Territoire de Belfort"],["91","Essonne"],["92","Hauts-de-Seine"],["93","Seine-Saint-Denis"],["94","Val-de-Marne"],["95","Val-d-Oise"],["971","Guadeloupe"],["972","Martinique"],["973","Guyane"],["974","La Reunion"]];
        const TYPES_EVT=[...EVT_CATEGORIES,...customCatEvenements].map(c=>({val:c.k,label:c.emoji+" "+c.label}));
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(249,115,22,0.4)":C.border}`,background:active?"rgba(249,115,22,0.1)":"transparent",color:active?"#fb923c":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
        const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
        return(
        <Modal title={modal.mode==="edit"?"Modifier l'événement":"Nouvel événement"} onClose={()=>setModal(null)} width={600}>
          <AdminField label="Nom *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Kermesse de l'école"/></AdminField>
          <AdminField label="Photo (optionnel)">
            <input id="admin-evt-photo" type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={async e=>{const file=e.target.files[0];if(!file)return;try{const compressed=await compresserImage(file);setForm(prev=>({...prev,photo:compressed}));}catch(err){alert("Impossible de lire cette image.");}}}/>
            {form.photo?(
              <div style={{position:"relative",borderRadius:10,overflow:"hidden",height:120}}>
                <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <button onClick={()=>document.getElementById("admin-evt-photo").click()} style={{background:WH,border:"none",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>Changer</button>
                  <button onClick={()=>setForm(prev=>({...prev,photo:null}))} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer",color:WH}}>Supprimer</button>
                </div>
              </div>
            ):(
              <div onClick={()=>document.getElementById("admin-evt-photo").click()} style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"16px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
                <div style={{fontSize:24,marginBottom:4}}>📸</div>
                <p style={{margin:"0 0 2px",fontSize:13,color:C.text}}>Ajouter une photo</p>
                <p style={{margin:0,fontSize:11,color:C.muted}}>JPG, PNG, WEBP - Max 8MB</p>
              </div>
            )}
          </AdminField>
          <AdminField label="Description *"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={form.desc||""} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Décris l'événement..."/></AdminField>
          <AdminField label="Type *">
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {TYPES_EVT.map(t=>(
                <button key={t.val} onClick={()=>setForm({...form,type:t.val})} style={{padding:"8px 14px",borderRadius:20,border:`2px solid ${form.type===t.val?C.orange:C.border}`,background:form.type===t.val?"rgba(249,115,22,0.12)":"transparent",color:form.type===t.val?"#fb923c":C.muted,fontSize:12,cursor:"pointer",fontWeight:form.type===t.val?700:400}}>{t.label}</button>
              ))}
            </div>
          </AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Ville *"><input style={s.input} value={form.ville||""} onChange={e=>setForm({...form,ville:e.target.value})} placeholder="Paris"/></AdminField>
            <AdminField label="Département *">
              <select style={s.input} value={form.dept||""} onChange={e=>setForm({...form,dept:e.target.value})}>
                <option value="">Choisir</option>
                {DEPTS_EVT.map(([code,nom])=><option key={code} value={code}>{code} - {nom}</option>)}
              </select>
            </AdminField>
            <AdminField label="Date début *"><input style={s.input} type="date" value={form.date||""} onChange={e=>setForm({...form,date:e.target.value})}/></AdminField>
            <AdminField label="Date fin"><input style={s.input} type="date" value={form.fin||""} onChange={e=>setForm({...form,fin:e.target.value})}/></AdminField>
            <AdminField label="Horaires"><input style={s.input} value={form.horaires||""} onChange={e=>setForm({...form,horaires:e.target.value})} placeholder="10h-18h"/></AdminField>
            <AdminField label="Tarif"><input style={s.input} value={form.prix||""} onChange={e=>setForm({...form,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
          </div>
          <AdminField label="Adresse"><input style={s.input} value={form.adresse||""} onChange={e=>setForm({...form,adresse:e.target.value})} placeholder="123 rue de la Fête, Paris"/></AdminField>

          {/* Accessibilité */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:4}}>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#3b82f6"}}>♿ Mobilité réduite PMR</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["pmr_fauteuil","Accès fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptées"],["pmr_personnel","Personnel formé"],["pmr_chemin","Chemin accessible"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#a78bfa"}}>🧩 TND</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Ces infos aident les familles TND</p>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#8b5cf6"}}>TSA Autisme</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumière douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#ec4899"}}>TDAH</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tdah_espace","Grand espace"],["tdah_physique","Activité physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variée"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#06b6d4"}}>DYS</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["dys_visuels","Supports visuels"],["dys_nonecrite","Non écrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
          </div>

          <AdminField label="Statut"><select style={s.input} value={form.statut||"draft"} onChange={e=>setForm({...form,statut:e.target.value})}><option value="draft">Brouillon</option><option value="published">Publié</option><option value="scheduled">⏰ Programmé</option></select></AdminField>
          {(form.statut==="scheduled"||(form.programmation?.date||form.programmation?.heure))&&(
            <ProgrammedField value={form.programmation||{date:"",heure:""}} onChange={v=>setForm({...form,programmation:v})}/>
          )}
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
            <button style={s.btn(C.orange)} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer"}</button>
          </div>
        </Modal>
        );
      })()}
    </div>
  );
}

function BiblioNoel({onBack,sharedActivites=[],setSharedActivites}) {
  const MOCK_NOEL=[
    {id:"n1",titre:"Fabriquer des boules de Noël",categorie:"Créatif",age:"4-12 ans",duree:"45 min",statut:"published"},
    {id:"n2",titre:"Biscuits de Noël en famille",categorie:"Cuisine",age:"3-10 ans",duree:"60 min",statut:"published"},
    {id:"n3",titre:"Carte de vœux dessinée à la main",categorie:"Créatif",age:"5-12 ans",duree:"30 min",statut:"draft"},
  ];
  const MOCK_IDS=new Set(MOCK_NOEL.map(a=>a.id));
  const [activites,setActivites] = useState(()=>[...MOCK_NOEL,...(sharedActivites||[]).filter(a=>!MOCK_IDS.has(a.id)&&a._source==="noel")]);
  const syncActivites=(newItems)=>{
    setActivites(newItems);
    if(setSharedActivites){
      const mine=newItems.filter(a=>!MOCK_IDS.has(a.id)).map(a=>({...a,_source:"noel"}));
      setSharedActivites(prev=>[...prev.filter(a=>a._source!=="noel"),...mine]);
    }
  };
  useScheduler(setActivites,syncActivites);
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({titre:"",categorie:"",lieu:"",energie:"",duree:"",difficulte:"",ageMin:"",ageMax:"",desc:"",materiel:"",etapes:"",premium:false,statut:"draft"});
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") syncActivites(activites.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else syncActivites([...activites,{id:"n"+Date.now(),...form}]);
    setModal(null);
  };
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
        <button onClick={onBack} style={{...s.btnOutline(C.muted),display:"flex",alignItems:"center",gap:6}}>← Retour</button>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>🎄 Bibliothèque Noël</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Activités dédiées à l'événement Noël</p>
        </div>
        <button style={{...s.btn("#10b981"),marginLeft:"auto"}} onClick={()=>{setForm({titre:"",categorie:"",lieu:"",energie:"",duree:"",difficulte:"",ageMin:"",ageMax:"",desc:"",materiel:"",etapes:"",premium:false,statut:"draft"});setModal({mode:"add"});}}>+ Ajouter une activité</button>
      </div>

      {/* Stats */}
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        {[{label:"Total",val:activites.length,emoji:"🎁"},{label:"Publiées",val:activites.filter(a=>a.statut==="published").length,emoji:"✅"},{label:"Brouillons",val:activites.filter(a=>a.statut==="draft").length,emoji:"📝"}].map((st,i)=>(
          <div key={i} style={{...s.card,flex:1,padding:"14px 16px"}}>
            <div style={{fontSize:20,marginBottom:4}}>{st.emoji}</div>
            <div style={{fontSize:22,fontWeight:800,color:C.text}}>{st.val}</div>
            <div style={{fontSize:12,color:C.muted}}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Liste */}
      <div style={{...s.card,padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0d1117"}}>{["Titre","Catégorie","Âge","Durée","Statut","Actions"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{activites.map((a,i)=>(
            <tr key={a.id} style={{borderTop:`1px solid ${C.border}`}}>
              <td style={{padding:"12px 16px"}}>
                <p style={{margin:"0 0 4px",fontSize:13,color:C.text,fontWeight:500}}>{a.titre||"Sans titre"}</p>
                {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge("rgba(16,185,129,0.15)","#10b981")}>{a.categorie||"-"}</span></td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.age||"-"}</td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.duree||"-"}</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button style={s.btnOutline(C.accent)} onClick={()=>{setForm({...a});setModal({mode:"edit",item:a});}}>✏️</button>
                  {a.statut==="draft"&&<button style={s.btnOutline(C.green)} onClick={()=>syncActivites(activites.map(x=>x.id===a.id?{...x,statut:"published"}:x))}>✅</button>}
                  {a.statut==="published"&&<button style={s.btnOutline(C.yellow)} onClick={()=>syncActivites(activites.map(x=>x.id===a.id?{...x,statut:"draft"}:x))}>📝</button>}
                  <button style={s.btnOutline(C.red)} onClick={()=>syncActivites(activites.filter(x=>x.id!==a.id))}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
        {activites.length===0&&<div style={{padding:"40px 0",textAlign:"center",color:C.muted}}><p style={{fontSize:32,margin:"0 0 8px"}}>🎄</p><p>Aucune activité dans la bibliothèque Noël</p></div>}
      </div>

      {/* Modal add/edit */}
      {modal&&(()=>{
        const tf=(key)=>setForm(prev=>({...prev,[key]:!prev[key]}));
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"7px 11px",borderRadius:8,border:`1px solid ${active?"rgba(16,185,129,0.4)":C.border}`,background:active?"rgba(16,185,129,0.1)":"transparent",color:active?"#10b981":C.muted,fontSize:12,cursor:"pointer",userSelect:"none",marginBottom:4});
        return(
        <Modal title={modal.mode==="edit"?"Modifier l'activité":"Nouvelle activité Noël 🎄"} onClose={()=>setModal(null)} width={600}>
          <AdminField label="Titre *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Fabriquer une couronne de Noël"/></AdminField>
          <AdminField label="Photo (optionnel)">
            <input id="admin-noel-photo" type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={async e=>{const file=e.target.files[0];if(!file)return;try{const compressed=await compresserImage(file);setForm(prev=>({...prev,photo:compressed}));}catch(err){alert("Impossible de lire cette image.");}}}/>
            {form.photo?(
              <div style={{position:"relative",borderRadius:10,overflow:"hidden",height:120}}>
                <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <button onClick={()=>document.getElementById("admin-noel-photo").click()} style={{background:WH,border:"none",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>Changer</button>
                  <button onClick={()=>setForm(prev=>({...prev,photo:null}))} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:16,padding:"5px 12px",fontSize:12,cursor:"pointer",color:WH}}>Supprimer</button>
                </div>
              </div>
            ):(
              <div onClick={()=>document.getElementById("admin-noel-photo").click()} style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"18px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
                <div style={{fontSize:22,marginBottom:4}}>⬆️</div>
                <p style={{margin:0,fontSize:13,color:C.text}}>Ajouter une photo</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>JPG, PNG, WEBP - Max 8MB</p>
              </div>
            )}
          </AdminField>
          <AdminField label="Description *"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={form.desc||""} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Décris l'activité Noël..."/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Durée *"><select style={s.input} value={form.duree||""} onChange={e=>setForm({...form,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Difficulté *"><select style={s.input} value={form.difficulte||""} onChange={e=>setForm({...form,difficulte:e.target.value})}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Lieu *"><select style={s.input} value={form.lieu||""} onChange={e=>setForm({...form,lieu:e.target.value})}><option value="">Choisir</option><option value="interieur">Intérieur</option><option value="exterieur">Extérieur</option></select></AdminField>
            <AdminField label="Motivation *"><select style={s.input} value={form.energie||""} onChange={e=>setForm({...form,energie:e.target.value})}><option value="">Choisir</option><option value="fatigue">Fatigué</option><option value="motiv">Motivé</option></select></AdminField>
          </div>
          <AdminField label="Catégorie *"><select style={s.input} value={form.categorie||""} onChange={e=>setForm({...form,categorie:e.target.value})}><option value="">Choisir</option>{["Créatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          <AdminField label="Âge conseillé">
            <div style={{display:"flex",gap:8}}>
              <select style={{...s.input,flex:1}} value={form.ageMin||""} onChange={e=>setForm({...form,ageMin:e.target.value})}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select>
              <select style={{...s.input,flex:1}} value={form.ageMax||""} onChange={e=>setForm({...form,ageMax:e.target.value})}><option value="">À...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select>
            </div>
          </AdminField>
          <AdminField label="Matériel nécessaire"><input style={s.input} value={form.materiel||""} onChange={e=>setForm({...form,materiel:e.target.value})} placeholder="Ex : colle, paillettes, branches de sapin"/></AdminField>
          <AdminField label="Étapes"><textarea style={{...s.input,minHeight:80,resize:"vertical"}} value={form.etapes||""} onChange={e=>setForm({...form,etapes:e.target.value})} placeholder="1. Préparer le matériel&#10;2. ..."/></AdminField>

          {/* Accessibilité */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:4}}>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#3b82f6"}}>♿ Mobilité réduite PMR</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["pmr_fauteuil","Accès fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptées"],["pmr_personnel","Personnel formé"],["pmr_chemin","Chemin accessible"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#a78bfa"}}>🧩 Troubles du neurodéveloppement TND</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Ces infos aident les familles TND</p>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#8b5cf6"}}>TSA Autisme</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumière douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#ec4899"}}>TDAH</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tdah_espace","Grand espace"],["tdah_physique","Activité physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variée"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#06b6d4"}}>DYS</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["dys_visuels","Supports visuels"],["dys_nonecrite","Non écrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
          </div>

          {/* Note enfants */}
          <div style={{background:"rgba(245,158,11,0.08)",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:16}}>👶</span>
            <p style={{margin:0,fontSize:12,color:"#f59e0b"}}>Les activités proposées doivent être destinées aux enfants.</p>
          </div>

          {/* Premium */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(124,58,237,0.08)",borderRadius:10,marginBottom:14}}>
            <div><p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>👑 Contenu Premium</p><p style={{margin:0,fontSize:11,color:C.muted}}>Réservé aux abonnés</p></div>
            <Tog on={!!form.premium} onChange={()=>setForm({...form,premium:!form.premium})}/>
          </div>

          <AdminField label="Statut"><select style={s.input} value={form.statut||"draft"} onChange={e=>setForm({...form,statut:e.target.value})}><option value="draft">Brouillon</option><option value="pending">En attente</option><option value="published">Publié</option></select></AdminField>

          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
            <button style={s.btn("#10b981")} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer l'activité"}</button>
          </div>
        </Modal>
        );
      })()}
    </div>
  );
}

function CreerEvenement({onBack,onSave}) {
  const [form,setForm] = useState({nom:"",emoji:"🎉",couleur:"#7c3aed",dateDebut:"",dateFin:"",banner:false,bannerTexte:"",popup:false,popupTexte:"",bibliotheque:true,generateur:true,generateurActif:true,premium:false,essaiActif:false,apercuGratuitJours:3,fichiers:[]});
  const [bibliothequeActiv,setBibliothequeActiv] = useState([]);
  const [step,setStep] = useState("infos"); // infos | biblio
  const [modalActiv,setModalActiv] = useState(null);
  const [formActiv,setFormActiv] = useState({titre:"",categorie:"Créatif",duree:"",desc:"",statut:"draft"});
  const EMOJIS = ["🎉","🎄","🐣","🎃","☀️","❄️","🌸","🏖️","🎆","🎊","🦃","🎁"];
  const COLORS = ["#7c3aed","#10b981","#f59e0b","#f97316","#ef4444","#3b82f6","#ec4899","#06b6d4","#8b5cf6"];
  const tf = key => setForm(p=>({...p,[key]:!p[key]}));
  const saveActiv = () => {
    if(!formActiv.titre) return;
    if(modalActiv?.mode==="edit") setBibliothequeActiv(prev=>prev.map(a=>a.id===modalActiv.item.id?{...a,...formActiv}:a));
    else setBibliothequeActiv(prev=>[...prev,{id:"ca"+Date.now(),...formActiv}]);
    setModalActiv(null);
  };
  const handleSave = () => {
    if(!form.nom) return;
    onSave({...form,id:"evt"+Date.now(),type:"custom",actif:true,bibliothequeActiv,debut:form.dateDebut,fin:form.dateFin});
  };

  if(step==="biblio") return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
        <button onClick={()=>setStep("infos")} style={{...s.btnOutline(C.muted),display:"flex",alignItems:"center",gap:6}}>← Retour</button>
        <div>
          <h1 style={{fontSize:20,fontWeight:800,color:C.text,margin:0}}>{form.emoji} Bibliothèque — {form.nom||"Nouvel événement"}</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Activités dédiées à cet événement</p>
        </div>
        <button style={{...s.btn(C.accent),marginLeft:"auto"}} onClick={()=>{setFormActiv({titre:"",categorie:"Créatif",duree:"",desc:"",statut:"draft"});setModalActiv({mode:"add"});}}>+ Ajouter</button>
      </div>
      {bibliothequeActiv.length===0?(
        <div style={{...s.card,textAlign:"center",padding:"48px 24px"}}>
          <p style={{fontSize:36,margin:"0 0 12px"}}>📚</p>
          <p style={{fontSize:14,color:C.text,fontWeight:600,margin:"0 0 6px"}}>Aucune activité dans la bibliothèque</p>
          <p style={{fontSize:12,color:C.muted,margin:"0 0 16px"}}>Ajoute des activités dédiées à cet événement</p>
          <button style={s.btn(C.accent)} onClick={()=>{setFormActiv({titre:"",categorie:"Créatif",duree:"",desc:"",statut:"draft"});setModalActiv({mode:"add"});}}>+ Première activité</button>
        </div>
      ):(
        <div style={{...s.card,padding:0,overflow:"hidden",marginBottom:16}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#0d1117"}}>{["Titre","Catégorie","Durée","Statut","Actions"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
            <tbody>{bibliothequeActiv.map((a,i)=>(
              <tr key={a.id} style={{borderTop:`1px solid ${C.border}`}}>
                <td style={{padding:"12px 16px"}}>
                <p style={{margin:"0 0 4px",fontSize:13,color:C.text,fontWeight:500}}>{a.titre}</p>
                {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
              </td>
                <td style={{padding:"12px 16px"}}><span style={s.badge(`${form.couleur}22`,form.couleur)}>{a.categorie}</span></td>
                <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.duree}</td>
                <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
                <td style={{padding:"12px 16px"}}>
                  <div style={{display:"flex",gap:6}}>
                    <button style={s.btnOutline(C.accent)} onClick={()=>{setFormActiv({...a});setModalActiv({mode:"edit",item:a});}}>✏️</button>
                    <button style={s.btnOutline(C.red)} onClick={()=>setBibliothequeActiv(prev=>prev.filter(x=>x.id!==a.id))}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <button style={{...s.btn(C.accent),width:"100%",justifyContent:"center"}} onClick={handleSave}>✅ Créer l'événement saisonnier</button>
      {modalActiv&&<Modal title={modalActiv.mode==="edit"?"Modifier":"Nouvelle activité"} onClose={()=>setModalActiv(null)} width={480}>
        <AdminField label="Titre *"><input style={s.input} value={formActiv.titre} onChange={e=>setFormActiv({...formActiv,titre:e.target.value})} placeholder="Ex : Chasse aux œufs"/></AdminField>
        <AdminField label="Description"><textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={formActiv.desc} onChange={e=>setFormActiv({...formActiv,desc:e.target.value})}/></AdminField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Catégorie"><select style={s.input} value={formActiv.categorie} onChange={e=>setFormActiv({...formActiv,categorie:e.target.value})}>{["Créatif","Cuisine","Jeu","Nature","Calme","Construction","Musique","Sport"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          <AdminField label="Durée"><select style={s.input} value={formActiv.duree} onChange={e=>setFormActiv({...formActiv,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
        </div>
        <AdminField label="Statut"><select style={s.input} value={formActiv.statut} onChange={e=>setFormActiv({...formActiv,statut:e.target.value})}><option value="draft">Brouillon</option><option value="published">Publié</option></select></AdminField>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
          <button style={s.btnOutline(C.muted)} onClick={()=>setModalActiv(null)}>Annuler</button>
          <button style={s.btn(C.accent)} onClick={saveActiv}>{modalActiv.mode==="edit"?"Modifier":"Ajouter"}</button>
        </div>
      </Modal>}
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
        <button onClick={onBack} style={{...s.btnOutline(C.muted),display:"flex",alignItems:"center",gap:6}}>← Retour</button>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>✨ Créer un événement saisonnier</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Configurez un nouvel événement spécial pour l'app</p>
        </div>
      </div>

      {/* Identité */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>🏷️ Identité de l'événement</p>
        <AdminField label="Nom de l'événement *"><input style={s.input} value={form.nom||""} onChange={e=>setForm({...form,nom:e.target.value})} placeholder="Ex : Fête du Printemps"/></AdminField>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Emoji</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {EMOJIS.map(e=><button key={e} onClick={()=>setForm({...form,emoji:e})} style={{width:38,height:38,borderRadius:10,border:`2px solid ${form.emoji===e?C.accent:C.border}`,background:form.emoji===e?"rgba(124,58,237,0.15)":"transparent",fontSize:20,cursor:"pointer"}}>{e}</button>)}
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Couleur</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {COLORS.map(col=><button key={col} onClick={()=>setForm({...form,couleur:col})} style={{width:28,height:28,borderRadius:"50%",background:col,border:form.couleur===col?"3px solid #fff":"2px solid transparent",outline:form.couleur===col?`2px solid ${col}`:"none",cursor:"pointer"}}/>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Date de début *"><input style={s.input} type="date" value={form.dateDebut||""} onChange={e=>setForm({...form,dateDebut:e.target.value})}/></AdminField>
          <AdminField label="Date de fin"><input style={s.input} type="date" value={form.dateFin||""} onChange={e=>setForm({...form,dateFin:e.target.value})}/></AdminField>
        </div>
      </div>

      {/* Affichage */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>📱 Affichage dans l'app</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>📢 Bandeau d'accueil</p><p style={{margin:0,fontSize:11,color:C.muted}}>Affiche un bandeau coloré en haut de l'accueil</p></div>
          <Tog on={form.banner} onChange={()=>tf("banner")}/>
        </div>
        {form.banner&&<div style={{padding:"10px 0 4px"}}><AdminField label="Texte du bandeau"><input style={s.input} value={form.bannerTexte||""} onChange={e=>setForm({...form,bannerTexte:e.target.value})} placeholder={`Ex : ${form.nom||"L'événement"} est arrivé ! Découvrez nos activités 🎉`}/></AdminField></div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>💬 Pop-up de lancement</p><p style={{margin:0,fontSize:11,color:C.muted}}>S'affiche à l'ouverture de l'application</p></div>
          <Tog on={form.popup} onChange={()=>tf("popup")}/>
        </div>
        {form.popup&&<div style={{padding:"10px 0 4px"}}><AdminField label="Message de la pop-up"><textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={form.popupTexte||""} onChange={e=>setForm({...form,popupTexte:e.target.value})} placeholder="Ex : Bienvenue dans l'événement ! Découvrez nos activités spéciales..."/></AdminField></div>}
      </div>

      {/* Bibliothèque & Générateur */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>📚 Bibliothèque & Générateur</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>📚 Bibliothèque dédiée</p><p style={{margin:0,fontSize:11,color:C.muted}}>Activités spécifiques à cet événement</p></div>
          <Tog on={form.bibliotheque} onChange={()=>tf("bibliotheque")}/>
        </div>
        {form.bibliotheque&&(
          <div style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <button onClick={()=>setStep("biblio")} style={{...s.btn(C.accent),width:"100%",justifyContent:"center",borderRadius:10}}>
              📚 Gérer la bibliothèque ({bibliothequeActiv.length} activité{bibliothequeActiv.length!==1?"s":""}) →
            </button>
          </div>
        )}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>🎲 Générateur lié</p><p style={{margin:0,fontSize:11,color:C.muted}}>Génère une activité depuis la bibliothèque de l'événement</p></div>
          <Tog on={form.generateur} onChange={()=>tf("generateur")}/>
        </div>
        {form.generateur&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0"}}>
            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>⚡ Générateur actif</p><p style={{margin:0,fontSize:11,color:C.muted}}>Visible par les utilisateurs dans l'app</p></div>
            <Tog on={form.generateurActif} onChange={()=>tf("generateurActif")}/>
          </div>
        )}
      </div>

      {/* Premium */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>👑 Accès</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:form.premium?"rgba(251,191,36,0.08)":"rgba(255,255,255,0.03)",borderRadius:10,border:`1px solid ${form.premium?"rgba(251,191,36,0.3)":C.border}`,transition:"all 0.2s"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:10,background:form.premium?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>👑</div>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:600,color:form.premium?"#FCD34D":C.text}}>Réservé aux abonnés Premium</p>
              <p style={{margin:0,fontSize:11,color:C.muted}}>{form.premium?"Cet événement est exclusif Premium":"Accessible à tous les utilisateurs"}</p>
            </div>
          </div>
          <Tog on={form.premium} onChange={()=>tf("premium")}/>
        </div>
        {form.premium&&(
          <div style={{marginTop:10,padding:"10px 14px",background:"rgba(251,191,36,0.06)",borderRadius:8,border:`1px solid rgba(251,191,36,0.2)`}}>
            <p style={{margin:0,fontSize:12,color:"#FCD34D"}}>💡 Les utilisateurs gratuits verront l'événement verrouillé avec une invitation à passer Premium.</p>
          </div>
        )}
      </div>

      {/* Pilotage freemium */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>⚙️ Pilotage freemium</p>
        <div style={{background:"rgba(108,92,231,0.08)",border:"1px solid rgba(108,92,231,0.3)",borderRadius:12,padding:"12px 14px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",gap:10}}>
            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Essai 7 jours pendant l'événement</p><p style={{margin:0,fontSize:11,color:C.muted}}>Si désactivé, l'essai classique est suspendu pendant cette période</p></div>
            <Tog on={form.essaiActif} onChange={()=>tf("essaiActif")}/>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 0",borderTop:`1px solid ${C.border}`,gap:10}}>
            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Jours d'aperçu gratuit du calendrier</p><p style={{margin:0,fontSize:11,color:C.muted}}>Nombre de jours visibles gratuitement, peu importe la date d'arrivée de l'utilisateur</p></div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <button onClick={()=>setForm(p=>({...p,apercuGratuitJours:Math.max(0,(p.apercuGratuitJours||0)-1)}))} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>−</button>
              <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7",minWidth:18,textAlign:"center"}}>{form.apercuGratuitJours}</span>
              <button onClick={()=>setForm(p=>({...p,apercuGratuitJours:Math.min(10,(p.apercuGratuitJours||0)+1)}))} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fichiers */}
      <div style={{...s.card,marginBottom:20}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 4px"}}>📎 Fichiers attachés</p>
        <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Chaque fichier peut avoir une période d'affichage spécifique.</p>
        <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"20px",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)",marginBottom:12}}
          onClick={()=>document.getElementById("file-upload-saisonnier").click()}>
          <div style={{fontSize:28,marginBottom:6}}>⬆️</div>
          <p style={{margin:"0 0 2px",fontSize:13,color:C.text}}>Cliquez pour ajouter des fichiers</p>
          <p style={{margin:0,fontSize:11,color:C.muted}}>PDF, images, documents — Max 2MB par fichier (limite de stockage)</p>
          <input id="file-upload-saisonnier" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{display:"none"}}
            onChange={async e=>{
              const files=Array.from(e.target.files||[]);
              for(const file of files){
                if(file.size>2*1024*1024){ alert(`"${file.name}" depasse 2MB et ne peut pas etre ajoute (limite de stockage partagee).`); continue; }
                try{
                  const estImage=file.type.startsWith("image");
                  const dataUrl=estImage?await compresserImage(file,1000,0.75):await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=ev=>resolve(ev.target.result);reader.onerror=()=>reject(new Error("lecture impossible"));reader.readAsDataURL(file);});
                  setForm(prev=>{
                    const tailleActuelle=(prev.fichiers||[]).reduce((s,f)=>s+(f.dataUrl?.length||0),0);
                    if(tailleActuelle+dataUrl.length>3.5*1024*1024){ alert("Limite de stockage des fichiers atteinte pour cet evenement. Supprime un fichier avant d'en ajouter un autre."); return prev; }
                    return{...prev,fichiers:[...(prev.fichiers||[]),{nom:file.name,taille:(file.size/1024/1024).toFixed(1)+"MB",type:file.type,dateDebut:prev.dateDebut||"",dateFin:prev.dateFin||"",dataUrl}]};
                  });
                }catch(err){ alert(`Impossible de lire "${file.name}".`); }
              }
            }}/>
        </div>
        {(form.fichiers||[]).length>0&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {(form.fichiers||[]).map((f,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
                {/* Ligne fichier */}
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:20,flexShrink:0}}>{f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{margin:0,fontSize:13,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500}}>{f.nom}</p>
                    <p style={{margin:0,fontSize:10,color:C.muted}}>{f.taille}</p>
                  </div>
                  <button onClick={()=>setForm(prev=>({...prev,fichiers:prev.fichiers.filter((_,j)=>j!==i)}))} style={{background:"rgba(239,68,68,0.1)",border:"none",borderRadius:6,color:C.red,cursor:"pointer",fontSize:13,padding:"4px 8px",fontWeight:600}}>× Supprimer</button>
                </div>
                {/* Dates d'affichage */}
                <div style={{padding:"10px 14px"}}>
                  <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>📅 Période d'affichage</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div>
                      <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>Visible à partir du</label>
                      <input type="date" value={f.dateDebut||""} onChange={e=>{const updated=[...form.fichiers];updated[i]={...updated[i],dateDebut:e.target.value};setForm(prev=>({...prev,fichiers:updated}));}} style={{...s.input,fontSize:12,padding:"7px 10px"}}/>
                    </div>
                    <div>
                      <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>Jusqu'au</label>
                      <input type="date" value={f.dateFin||""} onChange={e=>{const updated=[...form.fichiers];updated[i]={...updated[i],dateFin:e.target.value};setForm(prev=>({...prev,fichiers:updated}));}} style={{...s.input,fontSize:12,padding:"7px 10px"}}/>
                    </div>
                  </div>
                  {f.dateDebut&&f.dateFin&&(
                    <p style={{margin:"6px 0 0",fontSize:11,color:C.accent}}>
                      {(()=>{const d1=new Date(f.dateDebut);const d2=new Date(f.dateFin);return(!isNaN(d1.getTime())&&!isNaN(d2.getTime()))?`✓ Visible du ${d1.toLocaleDateString('fr-FR')} au ${d2.toLocaleDateString('fr-FR')}`:null;})()}
                    </p>
                  )}
                  {f.dateDebut&&!f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>✓ Visible à partir du {(()=>{const d=new Date(f.dateDebut);return isNaN(d.getTime())?'':d.toLocaleDateString('fr-FR');})()} </p>}
                  {!f.dateDebut&&!f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>Sans restriction de dates — toujours visible</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{display:"flex",gap:12}}>
        <button style={{...s.btnOutline(C.muted),flex:1,justifyContent:"center",padding:"12px 0",borderRadius:10}} onClick={onBack}>Annuler</button>
        <button style={{...s.btn(C.accent),flex:2,justifyContent:"center",padding:"12px 0",borderRadius:10}} onClick={handleSave}>
          ✅ Créer l'événement saisonnier
        </button>
      </div>
    </div>
  );
}

function DetailEvenement({evt,onBack,onSave,onDelete,onArchive,toggleCustom}){
  const [form,setForm]=useState({...evt});
  const [tab,setTab]=useState("infos"); // infos | biblio | fichiers
  const [modalActiv,setModalActiv]=useState(null);
  const [formActiv,setFormActiv]=useState({titre:"",categorie:"Créatif",duree:"",desc:"",statut:"draft"});
  const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
  const saveActiv=()=>{
    if(!formActiv.titre)return;
    const biblio=form.bibliothequeActiv||[];
    if(modalActiv?.mode==="edit") setForm(p=>({...p,bibliothequeActiv:biblio.map(a=>a.id===modalActiv.item.id?{...a,...formActiv}:a)}));
    else setForm(p=>({...p,bibliothequeActiv:[...biblio,{id:"a"+Date.now(),...formActiv}]}));
    setModalActiv(null);
  };
  const COLORS=["#7c3aed","#10b981","#f59e0b","#f97316","#ef4444","#3b82f6","#ec4899","#06b6d4","#8b5cf6"];
  const EMOJIS=["🎉","🎄","🐣","🎃","☀️","❄️","🌸","🏖️","🎆","🎊","🦃","🎁"];
  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
        <button onClick={onBack} style={{...s.btnOutline(C.muted),display:"flex",alignItems:"center",gap:6}}>← Retour</button>
        <div style={{flex:1}}>
          <h1 style={{fontSize:20,fontWeight:800,color:C.text,margin:0}}>{form.emoji} {form.nom}</h1>
          <p style={{fontSize:13,color:C.muted,margin:"2px 0 0"}}>{form.debut||"Pas de date"}{form.fin?" → "+form.fin:""}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Tog on={form.actif} onChange={()=>tf("actif")}/>
          <span style={{fontSize:12,color:form.actif?C.green:C.muted,fontWeight:600}}>{form.actif?"Actif":"Inactif"}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,background:C.card,borderRadius:12,padding:4,border:`1px solid ${C.border}`,marginBottom:20}}>
        {[["infos","⚙️ Infos"],["biblio","📚 Bibliothèque"],["fichiers","📎 Fichiers"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",background:tab===k?C.accent:"transparent",color:tab===k?"#fff":C.muted,fontSize:12,fontWeight:tab===k?700:400,cursor:"pointer",transition:"all 0.15s"}}>{l}</button>
        ))}
      </div>

      {/* TAB INFOS */}
      {tab==="infos"&&(<div>
        <div style={{...s.card,marginBottom:14}}>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 14px"}}>🏷️ Identité</p>
          <AdminField label="Nom"><input style={s.input} value={form.nom||""} onChange={e=>setForm({...form,nom:e.target.value})}/></AdminField>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Emoji</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{EMOJIS.map(e=><button key={e} onClick={()=>setForm({...form,emoji:e})} style={{width:36,height:36,borderRadius:10,border:`2px solid ${form.emoji===e?C.accent:C.border}`,background:form.emoji===e?"rgba(124,58,237,0.15)":"transparent",fontSize:18,cursor:"pointer"}}>{e}</button>)}</div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Couleur</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{COLORS.map(col=><button key={col} onClick={()=>setForm({...form,couleur:col})} style={{width:26,height:26,borderRadius:"50%",background:col,border:form.couleur===col?"3px solid #fff":"2px solid transparent",outline:form.couleur===col?`2px solid ${col}`:"none",cursor:"pointer"}}/>)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Date début"><input style={s.input} type="date" value={form.dateDebut||""} onChange={e=>setForm({...form,dateDebut:e.target.value})}/></AdminField>
            <AdminField label="Date fin"><input style={s.input} type="date" value={form.dateFin||""} onChange={e=>setForm({...form,dateFin:e.target.value})}/></AdminField>
          </div>
        </div>
        <div style={{...s.card,marginBottom:14}}>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 14px"}}>📱 Affichage</p>
          {[["banner","📢 Bandeau d'accueil","Visible en haut de l'accueil"],["popup","💬 Pop-up lancement","S'affiche à l'ouverture de l'app"]].map(([k,l,sub])=>(
            <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
              <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>{l}</p><p style={{margin:0,fontSize:11,color:C.muted}}>{sub}</p></div>
              <Tog on={!!form[k]} onChange={()=>tf(k)}/>
            </div>
          ))}
          {form.banner&&<div style={{paddingTop:10}}><AdminField label="Texte du bandeau"><input style={s.input} value={form.bannerTexte||""} onChange={e=>setForm({...form,bannerTexte:e.target.value})} placeholder="Texte affiché dans le bandeau"/></AdminField></div>}
          {form.popup&&<div style={{paddingTop:form.banner?0:10}}><AdminField label="Message pop-up"><textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={form.popupTexte||""} onChange={e=>setForm({...form,popupTexte:e.target.value})}/></AdminField></div>}
        </div>
        <div style={{...s.card,marginBottom:14}}>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 14px"}}>🎲 Générateur</p>
          {[["generateur","🎲 Générateur lié","Pioche dans la bibliothèque de l'événement"],["generateurActif","⚡ Générateur actif","Visible par les utilisateurs"]].map(([k,l,sub])=>(
            <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
              <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>{l}</p><p style={{margin:0,fontSize:11,color:C.muted}}>{sub}</p></div>
              <Tog on={!!form[k]} onChange={()=>tf(k)}/>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0"}}>
            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>👑 Réservé Premium</p><p style={{margin:0,fontSize:11,color:C.muted}}>Accès exclusif aux abonnés</p></div>
            <Tog on={!!form.premium} onChange={()=>tf("premium")}/>
          </div>
        </div>

        {/* Pilotage freemium */}
        <div style={{...s.card,marginBottom:14}}>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 14px"}}>⚙️ Pilotage freemium</p>
          <div style={{background:"rgba(108,92,231,0.08)",border:"1px solid rgba(108,92,231,0.3)",borderRadius:12,padding:"12px 14px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",gap:10}}>
              <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Essai 7 jours pendant l'événement</p><p style={{margin:0,fontSize:11,color:C.muted}}>Si désactivé, l'essai classique est suspendu pendant cette période</p></div>
              <Tog on={!!form.essaiActif} onChange={()=>tf("essaiActif")}/>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 0",borderTop:`1px solid ${C.border}`,gap:10}}>
              <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Jours d'aperçu gratuit du calendrier</p><p style={{margin:0,fontSize:11,color:C.muted}}>Nombre de jours visibles gratuitement, peu importe la date d'arrivée de l'utilisateur</p></div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <button onClick={()=>setForm(p=>({...p,apercuGratuitJours:Math.max(0,(p.apercuGratuitJours??3)-1)}))} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>−</button>
                <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7",minWidth:18,textAlign:"center"}}>{form.apercuGratuitJours??3}</span>
                <button onClick={()=>setForm(p=>({...p,apercuGratuitJours:Math.min(10,(p.apercuGratuitJours??3)+1)}))} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <button style={{...s.btn(C.accent),flex:1,justifyContent:"center"}} onClick={()=>onSave(form)}>✅ Enregistrer les modifications</button>
        </div>
        {/* Archive */}
        <div style={{...s.card,border:`1px solid ${C.yellow}44`,background:"rgba(245,158,11,0.05)",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:"rgba(245,158,11,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📦</div>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:700,color:C.yellow}}>Archiver l'événement</p>
              <p style={{margin:0,fontSize:11,color:C.muted}}>L'événement sera conservé pour une réutilisation future</p>
            </div>
          </div>
          <p style={{margin:"0 0 12px",fontSize:12,color:C.muted,lineHeight:1.5}}>L'archivage désactive l'événement sans le supprimer. Vous pourrez le modifier et le réactiver l'année prochaine.</p>
          <button style={{...s.btn(C.yellow,"#000"),width:"100%",justifyContent:"center"}} onClick={()=>onArchive(evt.id)}>📦 Archiver cet événement</button>
        </div>
        {/* Suppression */}
        <div style={{...s.card,border:`1px solid ${C.red}22`,background:"rgba(239,68,68,0.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:"rgba(239,68,68,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🗑️</div>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:700,color:C.red}}>Supprimer l'événement</p>
              <p style={{margin:0,fontSize:11,color:C.muted}}>Action irréversible — toutes les données seront perdues</p>
            </div>
          </div>
          <button style={{...s.btn(C.red),width:"100%",justifyContent:"center"}} onClick={()=>onDelete(evt.id)}>🗑️ Supprimer définitivement</button>
        </div>
      </div>)}

      {/* TAB BIBLIO */}
      {tab==="biblio"&&(<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <p style={{margin:0,fontSize:13,color:C.muted}}>{(form.bibliothequeActiv||[]).filter(a=>a.statut==="published").length} activité(s) publiée(s)</p>
          <button style={s.btn(C.accent)} onClick={()=>{setFormActiv({titre:"",categorie:"Créatif",duree:"",desc:"",statut:"draft"});setModalActiv({mode:"add"});}}>+ Ajouter</button>
        </div>
        {(form.bibliothequeActiv||[]).length===0?(
          <div style={{...s.card,textAlign:"center",padding:"32px 16px"}}><p style={{fontSize:32,margin:"0 0 8px"}}>📚</p><p style={{fontSize:13,color:C.muted}}>Aucune activité dans la bibliothèque</p></div>
        ):(form.bibliothequeActiv||[]).map((a,i)=>(
          <div key={a.id} style={{...s.card,marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:4}}><span style={s.badge("rgba(124,58,237,0.15)","#a78bfa")}>{a.categorie}</span>{statutBadge(a.statut)}</div>
              <p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>{a.titre}</p>
              {a.duree&&<p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>⏱ {a.duree}</p>}
            </div>
            <div style={{display:"flex",gap:6}}>
              <button style={s.btnOutline(C.accent)} onClick={()=>{setFormActiv({...a});setModalActiv({mode:"edit",item:a});}}>✏️</button>
              <button style={s.btnOutline(a.statut==="published"?C.yellow:C.green)} onClick={()=>setForm(p=>({...p,bibliothequeActiv:(p.bibliothequeActiv||[]).map(x=>x.id===a.id?{...x,statut:x.statut==="published"?"draft":"published"}:x)}))}>
                {a.statut==="published"?"📝":"✅"}
              </button>
              <button style={s.btnOutline(C.red)} onClick={()=>setForm(p=>({...p,bibliothequeActiv:(p.bibliothequeActiv||[]).filter(x=>x.id!==a.id)}))}>🗑️</button>
            </div>
          </div>
        ))}
        {(form.bibliothequeActiv||[]).length>0&&<button style={{...s.btn(C.accent),width:"100%",justifyContent:"center",marginTop:8}} onClick={()=>onSave(form)}>✅ Enregistrer</button>}
        {modalActiv&&<Modal title={modalActiv.mode==="edit"?"Modifier":"Nouvelle activité"} onClose={()=>setModalActiv(null)} width={440}>
          <AdminField label="Titre *"><input style={s.input} value={formActiv.titre} onChange={e=>setFormActiv({...formActiv,titre:e.target.value})}/></AdminField>
          <AdminField label="Description"><textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={formActiv.desc} onChange={e=>setFormActiv({...formActiv,desc:e.target.value})}/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Catégorie"><select style={s.input} value={formActiv.categorie} onChange={e=>setFormActiv({...formActiv,categorie:e.target.value})}>{["Créatif","Cuisine","Jeu","Nature","Calme","Sport","Musique"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Durée"><select style={s.input} value={formActiv.duree} onChange={e=>setFormActiv({...formActiv,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          </div>
          <AdminField label="Statut"><select style={s.input} value={formActiv.statut} onChange={e=>setFormActiv({...formActiv,statut:e.target.value})}><option value="draft">Brouillon</option><option value="published">Publié</option></select></AdminField>
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModalActiv(null)}>Annuler</button>
            <button style={s.btn(C.accent)} onClick={saveActiv}>{modalActiv.mode==="edit"?"Modifier":"Ajouter"}</button>
          </div>
        </Modal>}
      </div>)}

      {/* TAB FICHIERS */}
      {tab==="fichiers"&&(<div>
        <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"18px",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)",marginBottom:14}}
          onClick={()=>document.getElementById("file-upload-detail").click()}>
          <div style={{fontSize:24,marginBottom:4}}>⬆️</div>
          <p style={{margin:"0 0 2px",fontSize:13,color:C.text}}>Ajouter des fichiers</p>
          <p style={{margin:0,fontSize:11,color:C.muted}}>PDF, images, documents — Max 2MB par fichier (limite de stockage)</p>
          <input id="file-upload-detail" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{display:"none"}}
            onChange={async e=>{
              for(const file of Array.from(e.target.files||[])){
                if(file.size>2*1024*1024){ alert(`"${file.name}" depasse 2MB et ne peut pas etre ajoute (limite de stockage partagee).`); continue; }
                try{
                  const estImage=file.type.startsWith("image");
                  const dataUrl=estImage?await compresserImage(file,1000,0.75):await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=ev=>resolve(ev.target.result);reader.onerror=()=>reject(new Error("lecture impossible"));reader.readAsDataURL(file);});
                  setForm(prev=>{
                    const tailleActuelle=(prev.fichiers||[]).reduce((s,f)=>s+(f.dataUrl?.length||0),0);
                    if(tailleActuelle+dataUrl.length>3.5*1024*1024){ alert("Limite de stockage des fichiers atteinte pour cet evenement. Supprime un fichier avant d'en ajouter un autre."); return prev; }
                    return{...prev,fichiers:[...(prev.fichiers||[]),{nom:file.name,taille:(file.size/1024/1024).toFixed(1)+"MB",type:file.type,dateDebut:"",dateFin:"",dataUrl}]};
                  });
                }catch(err){ alert(`Impossible de lire "${file.name}".`); }
              }
            }}/>
        </div>
        {(form.fichiers||[]).length===0?(
          <div style={{...s.card,textAlign:"center",padding:"32px 16px"}}><p style={{fontSize:32,margin:"0 0 8px"}}>📎</p><p style={{fontSize:13,color:C.muted}}>Aucun fichier attaché</p></div>
        ):(form.fichiers||[]).map((f,i)=>(
          <div key={i} style={{...s.card,marginBottom:10,padding:0,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:18}}>{f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}</span>
              <div style={{flex:1,minWidth:0}}><p style={{margin:0,fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.nom}</p><p style={{margin:0,fontSize:10,color:C.muted}}>{f.taille}</p></div>
              <button onClick={()=>setForm(p=>({...p,fichiers:(p.fichiers||[]).filter((_,j)=>j!==i)}))} style={{background:"rgba(239,68,68,0.1)",border:"none",borderRadius:6,color:C.red,cursor:"pointer",fontSize:12,padding:"4px 8px"}}>× Supprimer</button>
            </div>
            <div style={{padding:"10px 14px"}}>
              <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>📅 Période d'affichage</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>À partir du</label><input type="date" value={f.dateDebut||""} onChange={e=>{const u=[...(form.fichiers||[])];u[i]={...u[i],dateDebut:e.target.value};setForm(p=>({...p,fichiers:u}));}} style={{...s.input,fontSize:12,padding:"7px 10px"}}/></div>
                <div><label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>Jusqu'au</label><input type="date" value={f.dateFin||""} onChange={e=>{const u=[...(form.fichiers||[])];u[i]={...u[i],dateFin:e.target.value};setForm(p=>({...p,fichiers:u}));}} style={{...s.input,fontSize:12,padding:"7px 10px"}}/></div>
              </div>
                  {f.dateDebut&&f.dateFin&&(()=>{const d1=new Date(f.dateDebut);const d2=new Date(f.dateFin);return(!isNaN(d1.getTime())&&!isNaN(d2.getTime()))&&<p style={{margin:"6px 0 0",fontSize:11,color:C.accent}}>✓ Visible du {d1.toLocaleDateString("fr-FR")} au {d2.toLocaleDateString("fr-FR")}</p>;})()}
              {!f.dateDebut&&!f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>Toujours visible</p>}
            </div>
          </div>
        ))}
        {(form.fichiers||[]).length>0&&<button style={{...s.btn(C.accent),width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>onSave(form)}>✅ Enregistrer les fichiers</button>}
      </div>)}
    </div>
  );
}

function Saisonnier({sharedCustomEvents=[],setSharedCustomEvents,evenementsSaisonniers=[],setEvenementsSaisonniers,sharedActivites=[],setSharedActivites}) {
  const [sections,setSections] = useState(MOCK_SEASONAL);
  const customEvents = sharedCustomEvents;
  const setCustomEvents = setSharedCustomEvents||((fn)=>{});
  const [biblioNoel,setBiblioNoel] = useState(false);
  const [creerEvt,setCreerEvt] = useState(false);
  const [selectedEvt,setSelectedEvt] = useState(null); // event being viewed/edited
  const toggle = (id,field) => setSections(sections.map(s=>s.id===id?{...s,[field]:!s[field]}:s));
  const toggleCustom = (id,field) => setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,[field]:!e[field]}:e));
  const updateFreemium = (id,changes) => setEvenementsSaisonniers&&setEvenementsSaisonniers(prev=>prev.map(e=>e.id===id?{...e,...changes}:e));
  const handleSaveCustom = (evt) => { setCustomEvents(prev=>[...prev,evt]); setCreerEvt(false); };
  const handleUpdateEvt = (updated) => { setCustomEvents(prev=>prev.map(e=>e.id===updated.id?updated:e)); setSelectedEvt(null); };
  const handleDeleteEvt = (id) => { setCustomEvents(prev=>prev.filter(e=>e.id!==id)); setSelectedEvt(null); };
  const handleArchiveEvt = (id) => { setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,actif:false,archive:true}:e)); setSelectedEvt(null); };
  const handleRestoreEvt = (id) => { setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,archive:false}:e)); };
  if(biblioNoel) return <BiblioNoel onBack={()=>setBiblioNoel(false)} sharedActivites={sharedActivites} setSharedActivites={setSharedActivites}/>;
  if(creerEvt) return <CreerEvenement onBack={()=>setCreerEvt(false)} onSave={handleSaveCustom}/>;
  if(selectedEvt) return <DetailEvenement evt={selectedEvt} onBack={()=>setSelectedEvt(null)} onSave={handleUpdateEvt} onDelete={handleDeleteEvt} onArchive={handleArchiveEvt} toggleCustom={toggleCustom}/>;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Événements saisonniers</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez les événements spéciaux et leur visibilité dans l'app</p>
        </div>
        <button style={s.btn(C.accent)} onClick={()=>setCreerEvt(true)}>✨ Créer un événement</button>
      </div>

      {/* Événements personnalisés actifs */}
      {customEvents.filter(e=>!e.archive).length>0&&(
        <div style={{marginBottom:24}}>
          <p style={{fontSize:13,fontWeight:700,color:C.muted,margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Événements personnalisés</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {customEvents.filter(e=>!e.archive).map(evt=>(
              <div key={evt.id} onClick={()=>setSelectedEvt(evt)} style={{...s.card,border:`2px solid ${evt.actif?(evt.couleur||"#6C5CE7")+"44":C.border}`,position:"relative",overflow:"hidden",cursor:"pointer"}}>
                {evt.actif&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:(evt.couleur||"#6C5CE7")}}/>}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:44,height:44,borderRadius:12,background:(evt.couleur||"#6C5CE7")+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{evt.emoji}</div>
                    <div><p style={{margin:0,fontSize:15,fontWeight:700,color:C.text}}>{evt.nom}</p><p style={{margin:0,fontSize:12,color:C.muted}}>{evt.debut} → {evt.fin||"..."}</p></div>
                  </div>
                  <Tog on={evt.actif} onChange={()=>toggleCustom(evt.id,"actif")}/>
                </div>
                <div style={{fontSize:11,color:C.muted,display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
                  {evt.banner&&<span>📢 Bandeau</span>}
                  {evt.popup&&<span>💬 Pop-up</span>}
                  {evt.bibliotheque&&<span>📚 {evt.bibliothequeActiv?.length||0} activités</span>}
                  {evt.generateur&&<span style={{color:evt.generateurActif?C.green:C.muted}}>🎲 Générateur {evt.generateurActif?"actif":"inactif"}</span>}
                  {evt.premium&&<span style={{color:"#FCD34D"}}>👑 Premium</span>}
                  {evt.fichiers?.length>0&&<span>📎 {evt.fichiers.length} fichier{evt.fichiers.length>1?"s":""}</span>}
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button style={{...s.btnOutline(C.red),flex:1,justifyContent:"center"}} onClick={()=>setCustomEvents(prev=>prev.filter(e=>e.id!==evt.id))}>🗑️ Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Événements archivés */}
      {customEvents.filter(e=>e.archive).length>0&&(
        <div style={{marginBottom:24}}>
          <p style={{fontSize:13,fontWeight:700,color:C.muted,margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"}}>
            📦 Archives ({customEvents.filter(e=>e.archive).length})
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {customEvents.filter(e=>e.archive).map(evt=>(
              <div key={evt.id} onClick={()=>setSelectedEvt(evt)} style={{...s.card,border:`1px solid ${C.border}`,opacity:0.7,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#6b7280"}}/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:40,height:40,borderRadius:10,background:"rgba(107,114,128,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{evt.emoji}</div>
                    <div>
                      <p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{evt.nom}</p>
                      <p style={{margin:0,fontSize:11,color:C.muted}}>{evt.debut||""}{evt.fin?" → "+evt.fin:""}</p>
                    </div>
                  </div>
                  <span style={{fontSize:10,background:"rgba(107,114,128,0.15)",color:C.muted,padding:"3px 10px",borderRadius:20,fontWeight:600}}>📦 Archivé</span>
                </div>
                <div style={{fontSize:11,color:C.muted,display:"flex",gap:10,flexWrap:"wrap",marginBottom:10}}>
                  {evt.bibliothequeActiv?.length>0&&<span>📚 {evt.bibliothequeActiv.length} activité{evt.bibliothequeActiv.length>1?"s":""}</span>}
                  {evt.fichiers?.length>0&&<span>📎 {evt.fichiers.length} fichier{evt.fichiers.length>1?"s":""}</span>}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={{...s.btn(C.green),flex:1,justifyContent:"center"}} onClick={e=>{e.stopPropagation();handleRestoreEvt(evt.id);}}>▶ Réactiver</button>
                  <button style={{...s.btnOutline(C.red),flex:1,justifyContent:"center"}} onClick={e=>{e.stopPropagation();setCustomEvents(prev=>prev.filter(x=>x.id!==evt.id));}}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Événements prédéfinis */}
      <p style={{fontSize:13,fontWeight:700,color:C.muted,margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Événements prédéfinis</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {sections.map(sec=>(
          <div key={sec.id} style={{...s.card,border:`2px solid ${sec.actif?sec.color+"44":C.border}`,position:"relative",overflow:"hidden"}}>
            {sec.actif&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:sec.color}}/>}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:44,height:44,borderRadius:12,background:sec.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{sec.emoji}</div>
                <div><p style={{margin:0,fontSize:15,fontWeight:700,color:C.text}}>{sec.nom}</p><p style={{margin:0,fontSize:12,color:C.muted}}>{sec.debut} → {sec.fin}</p></div>
              </div>
              <Tog on={sec.actif} onChange={()=>toggle(sec.id,"actif")}/>
            </div>
            <div style={{opacity:sec.actif?1:0.4,transition:"opacity 0.2s"}}>
              {[["banner","📢 Bandeau d'accueil","Affiche le bandeau en haut de l'app"],["popup","💬 Pop-up","Affiche une pop-up au lancement"]].map(([field,label,sub])=>(
                <div key={field} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderTop:`1px solid ${C.border}`}}>
                  <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>{label}</p><p style={{margin:0,fontSize:11,color:C.muted}}>{sub}</p></div>
                  <Tog on={sec[field]} onChange={()=>sec.actif&&toggle(sec.id,field)}/>
                </div>
              ))}
              {sec.type==="christmas"&&(
                <div style={{paddingTop:12,borderTop:`1px solid ${C.border}`,marginTop:4}}>
                  <p style={{margin:"0 0 8px",fontSize:12,color:C.muted,fontWeight:600}}>📚 Contenu dédié</p>
                  <button onClick={()=>setBiblioNoel(true)} style={{...s.btn("#10b981"),width:"100%",justifyContent:"center",borderRadius:10}}>
                    <span>📚</span> Gérer la bibliothèque Noël →
                  </button>
                  {(() => {
                    const evt = evenementsSaisonniers.find(e=>e.type==="christmas");
                    if(!evt) return null;
                    return (
                      <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`}}>
                        <p style={{margin:"0 0 10px",fontSize:12,color:C.muted,fontWeight:600}}>🎄 Visibilité côté utilisateur</p>
                        <div style={{background:"rgba(108,92,231,0.08)",border:"1px solid rgba(108,92,231,0.3)",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Afficher le Village du Lutin</p><p style={{margin:0,fontSize:11,color:C.muted}}>Bandeau sur l'accueil + accès au calendrier de l'Avent. Désactivé par défaut.</p></div>
                            <Tog on={!!evt.actif} onChange={()=>updateFreemium(evt.id,{actif:!evt.actif})}/>
                          </div>
                        </div>
                        <p style={{margin:"0 0 10px",fontSize:12,color:C.muted,fontWeight:600}}>⚙️ Pilotage freemium</p>
                        <div style={{background:"rgba(108,92,231,0.08)",border:"1px solid rgba(108,92,231,0.3)",borderRadius:12,padding:"12px 14px"}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",gap:10}}>
                            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Essai 7 jours pendant l'événement</p><p style={{margin:0,fontSize:11,color:C.muted}}>Si désactivé, l'essai classique est suspendu pendant cette période</p></div>
                            <Tog on={evt.essaiActif} onChange={()=>updateFreemium(evt.id,{essaiActif:!evt.essaiActif})}/>
                          </div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderTop:`1px solid ${C.border}`,gap:10}}>
                            <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Jours d'aperçu gratuit du calendrier</p><p style={{margin:0,fontSize:11,color:C.muted}}>Nombre de jours visibles gratuitement, peu importe la date d'arrivée de l'utilisateur</p></div>
                            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitJours:Math.max(0,evt.apercuGratuitJours-1)})} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>−</button>
                              <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7",minWidth:18,textAlign:"center"}}>{evt.apercuGratuitJours}</span>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitJours:Math.min(10,evt.apercuGratuitJours+1)})} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>+</button>
                            </div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderTop:`1px solid ${C.border}`,gap:10}}>
                            <p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Quels jours sont gratuits</p>
                            <div style={{display:"flex",gap:6,flexShrink:0}}>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitType:"premiers"})} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${evt.apercuGratuitType==="premiers"?"#6C5CE7":C.border}`,background:evt.apercuGratuitType==="premiers"?"#6C5CE7":"transparent",color:evt.apercuGratuitType==="premiers"?"#fff":C.muted,fontSize:11,fontWeight:600,cursor:"pointer"}}>Premiers jours</button>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitType:"derniers"})} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${evt.apercuGratuitType==="derniers"?"#6C5CE7":C.border}`,background:evt.apercuGratuitType==="derniers"?"#6C5CE7":"transparent",color:evt.apercuGratuitType==="derniers"?"#fff":C.muted,fontSize:11,fontWeight:600,cursor:"pointer"}}>Derniers débloqués</button>
                            </div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 0",borderTop:`1px solid ${C.border}`,gap:10}}>
                            <p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Cartes postales gratuites</p>
                            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitCartesPostales:Math.max(0,evt.apercuGratuitCartesPostales-1)})} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>−</button>
                              <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7",minWidth:18,textAlign:"center"}}>{evt.apercuGratuitCartesPostales}</span>
                              <button onClick={()=>updateFreemium(evt.id,{apercuGratuitCartesPostales:Math.min(5,evt.apercuGratuitCartesPostales+1)})} style={{width:26,height:26,borderRadius:8,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:14}}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            {!sec.actif&&<p style={{margin:"10px 0 0",fontSize:11,color:C.muted,textAlign:"center"}}>Activer la section pour configurer l'affichage</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Utilisateurs() {
  const [users,setUsers] = useState(MOCK_USERS);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("");
  const [modal,setModal] = useState(null);
  const filtered = users.filter(u=>(filter===""||filter==="premium"?true:u.statut===filter)&&(filter!=="premium"||u.premium)&&(!search||(u.nom||"").toLowerCase().includes(search.toLowerCase())||(u.email||"").toLowerCase().includes(search.toLowerCase())));
  const {slice:filteredPageU,Pagination:PagUsers,reset:resetPagU}=usePagination(filtered,10);
  useEffect(()=>resetPagU(),[search,filter]);
  return (
    <div>
      <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:"0 0 4px"}}>Utilisateurs</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 16px"}}>Gérez les comptes utilisateurs</p>

      {/* Récapitulatif */}
      <div style={{...s.card,marginBottom:20,padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${C.border}`}}>
          {[
            {label:"Utilisateurs total",val:users.length,sub:`${users.filter(u=>u.statut==="active").length} actifs`,emoji:"👥",color:C.blue,bg:"rgba(59,130,246,0.06)"},
            {label:"Abonnés Premium",val:users.filter(u=>u.premium).length,sub:(users.length?Math.round(users.filter(u=>u.premium).length/users.length*100):0)+"% de conversion",emoji:"👑",color:"#f59e0b",bg:"rgba(245,158,11,0.06)"},
            {label:"Comptes suspendus",val:users.filter(u=>u.statut==="suspended").length,sub:users.filter(u=>u.statut==="suspended").length>0?"Action requise":"Aucun signalement",emoji:"🚫",color:users.filter(u=>u.statut==="suspended").length>0?C.red:C.green,bg:users.filter(u=>u.statut==="suspended").length>0?"rgba(239,68,68,0.06)":"rgba(16,185,129,0.04)"},
          ].map((st,i)=>(
            <div key={i} style={{padding:"18px 20px",background:st.bg,borderRight:i<2?`1px solid ${C.border}`:"none",cursor:"pointer",transition:"background 0.15s"}} onClick={()=>setFilter(i===0?"":i===1?"premium":i===2?"suspended":"")}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:22}}>{st.emoji}</span>
                {i===2&&users.filter(u=>u.statut==="suspended").length>0&&<span style={{fontSize:10,background:"rgba(239,68,68,0.15)",color:C.red,padding:"2px 8px",borderRadius:10,fontWeight:600}}>⚠️ À traiter</span>}
                {i===1&&<span style={{fontSize:10,background:"rgba(245,158,11,0.15)",color:"#f59e0b",padding:"2px 8px",borderRadius:10,fontWeight:600}}>Premium</span>}
              </div>
              <div style={{fontSize:30,fontWeight:800,color:st.color,marginBottom:2}}>{st.val}</div>
              <p style={{margin:"0 0 2px",fontSize:12,fontWeight:600,color:C.text}}>{st.label}</p>
              <p style={{margin:0,fontSize:11,color:C.muted}}>{st.sub}</p>
            </div>
          ))}
        </div>
        {/* Barre de progression taux conversion */}
        <div style={{padding:"12px 20px",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:C.muted,whiteSpace:"nowrap"}}>Taux Premium</span>
          <div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:6,overflow:"hidden"}}>
            <div style={{width:(users.length?Math.round(users.filter(u=>u.premium).length/users.length*100):0)+"%",height:"100%",background:"linear-gradient(90deg,#f59e0b,#fcd34d)",borderRadius:4,transition:"width 0.5s"}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:"#f59e0b",whiteSpace:"nowrap"}}>{(users.length?Math.round(users.filter(u=>u.premium).length/users.length*100):0)}%</span>
          <span style={{fontSize:11,color:C.muted}}>·</span>
          <span style={{fontSize:12,color:C.muted,whiteSpace:"nowrap"}}>Actifs</span>
          <div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:6,overflow:"hidden"}}>
            <div style={{width:(users.length?Math.round(users.filter(u=>u.statut==="active").length/users.length*100):0)+"%",height:"100%",background:"linear-gradient(90deg,#10b981,#34d399)",borderRadius:4}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:C.green,whiteSpace:"nowrap"}}>{Math.round(users.filter(u=>u.statut==="active").length/users.length*100)}%</span>
        </div>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher par nom ou email..."/>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["","active","suspended","premium"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{...s.btnOutline(filter===f?C.accent:C.muted),background:filter===f?"rgba(124,58,237,0.15)":"transparent"}}>{f===""?"Tous":f==="active"?"Actifs":f==="suspended"?"Suspendus":"👑 Premium"}</button>)}
      </div>

      {/* Liste utilisateurs enrichie */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filteredPageU.map(u=>(
          <div key={u.id} style={{...s.card,padding:0,overflow:"hidden",opacity:u.statut==="suspended"?0.7:1,border:u.statut==="suspended"?`1px solid ${C.red}33`:s.card.border}}>
            {/* Ligne principale */}
            <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer"}} onClick={()=>setModal(modal?.id===u.id?null:u)}>
              <Avatar nom={u.nom} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                  <p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{u.nom}</p>
                  {u.statut==="suspended"&&<span style={s.badge("rgba(239,68,68,0.15)","#fca5a5")}>🚫 Suspendu</span>}
                </div>
                <p style={{margin:0,fontSize:12,color:C.muted}}>✉️ {u.email}</p>
              </div>
              <div onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <span style={{fontSize:11,fontWeight:600,color:u.premium?"#f59e0b":C.muted}}>{u.premium?"👑 Premium":"Gratuit"}</span>
                <Tog on={!!u.premium} onChange={()=>setUsers(users.map(x=>x.id===u.id?{...x,premium:!x.premium}:x))}/>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <p style={{margin:"0 0 2px",fontSize:12,color:C.muted}}>👶 {(u.enfants||[]).length} enfant{(u.enfants||[]).length>1?"s":""}</p>
                <p style={{margin:0,fontSize:11,color:C.muted}}>{(u.enfants||[]).map(a=>a+" an"+(a>1?"s":"")).join(", ")}</p>
              </div>
              <span style={{fontSize:16,color:C.muted,marginLeft:4}}>{modal?.id===u.id?"▲":"▼"}</span>
            </div>

            {/* Détail dépliable */}
            {modal?.id===u.id&&(
              <div style={{borderTop:`1px solid ${C.border}`,background:"rgba(255,255,255,0.02)"}}>
                {/* Infos complètes */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
                  {[
                    ["✉️ Email",u.email],
                    ["📅 Inscription",u.inscription],
                    ["👶 Enfants",(u.enfants||[]).length+" enfant"+((u.enfants||[]).length>1?"s":"")+" ("+(u.enfants||[]).map(a=>a+" an"+(a>1?"s":"")).join(", ")+")"],
                    ["📊 Contributions",u.contributions+" contribution"+(u.contributions>1?"s":"")],
                    ["💳 Plan",u.premium?"Premium 👑":"Gratuit"],
                    ["📌 Statut",u.statut==="active"?"Actif ✅":"Suspendu 🚫"],
                  ].map(([k,v],i)=>(
                    <div key={i} style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,borderRight:i%2===0?`1px solid ${C.border}`:"none"}}>
                      <p style={{margin:"0 0 2px",fontSize:11,color:C.muted}}>{k}</p>
                      <p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>{v}</p>
                    </div>
                  ))}
                </div>
                {/* Actions */}
                <div style={{padding:"12px 16px",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                  <button style={s.btn(u.statut==="active"?C.red:C.green)} onClick={()=>setUsers(users.map(x=>x.id===u.id?{...x,statut:x.statut==="active"?"suspended":"active"}:x))}>
                    {u.statut==="active"?"🚫 Suspendre":"✅ Réactiver"}
                  </button>
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`}}>
                    <span style={{fontSize:13,color:C.text,fontWeight:600}}>👑 Premium</span>
                    <Tog on={!!u.premium} onChange={()=>setUsers(users.map(x=>x.id===u.id?{...x,premium:!x.premium}:x))}/>
                  </div>
                  <button style={{...s.btnOutline(C.red),marginLeft:"auto"}} onClick={()=>{setUsers(users.filter(x=>x.id!==u.id));setModal(null);}}>
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <PagUsers/>
        {filtered.length===0&&<div style={{...s.card,textAlign:"center",padding:"40px 16px",color:C.muted}}>Aucun utilisateur trouvé</div>}
      </div>
    </div>
  );
}

function Abonnements() {
  const [subs] = useState(MOCK_SUBS);
  const [sponsos,setSponsos] = useState([
    {id:"s1",entreprise:"Toys'R'Us",type:"sortie",contenu:"Parc des Expositions",montant:500,duree:"3 mois",debut:"01/04/2024",fin:"30/06/2024",statut:"active"},
    {id:"s2",entreprise:"LEGO France",type:"activite",contenu:"Construire des Lego",montant:800,duree:"6 mois",debut:"01/01/2024",fin:"30/06/2024",statut:"active"},
    {id:"s3",entreprise:"Disneyland Paris",type:"evenement",contenu:"Festival de Musique",montant:1200,duree:"1 mois",debut:"15/06/2024",fin:"15/07/2024",statut:"expired"},
  ]);
  const [showSponsoForm,setShowSponsoForm] = useState(false);
  const [sponsoForm,setSponsoForm] = useState({entreprise:"",type:"sortie",contenu:"",montant:"",duree:"",debut:"",fin:""});
  const stats = {
    total:subs.length,
    actifs:subs.filter(s=>s.statut==="active").length,
    mensuel:subs.filter(s=>s.plan==="mensuel"&&s.statut==="active").length,
    annuel:subs.filter(s=>s.plan==="annuel"&&s.statut==="active").length,
    revMensuel:subs.filter(s=>s.plan==="mensuel"&&s.statut==="active").length*4.99,
    revAnnuel:subs.filter(s=>s.plan==="annuel"&&s.statut==="active").length*(39.99/12),
    revSponso:sponsos.filter(s=>s.statut==="active").reduce((a,s)=>a+(Number(s.montant)||0),0),
  };
  const revTotal=stats.revMensuel+stats.revAnnuel+stats.revSponso/3;
  const typeIcon={sortie:"🗺️",activite:"🎨",evenement:"📅"};
  const typeColor={sortie:"#f472b6",activite:"#a78bfa",evenement:"#fb923c",default:"#94a3b8"};
  const getTypeColor=(t)=>typeColor[t]||typeColor.default;
  return (
    <div>
      <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:"0 0 4px"}}>Abonnements & Revenus</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 20px"}}>Abonnements Premium et partenariats sponsorisés</p>

      {/* Revenus banner */}
      <div style={{...s.card,background:"linear-gradient(135deg,#059669,#10b981)",marginBottom:16,padding:"18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div>
            <p style={{margin:"0 0 2px",fontSize:13,color:"rgba(255,255,255,0.7)"}}>Revenus totaux estimés / mois</p>
            <p style={{margin:0,fontSize:34,fontWeight:800,color:"#fff"}}>{revTotal.toFixed(2)} €</p>
          </div>
          <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>💰</div>
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[["📅 Mensuel",stats.revMensuel.toFixed(2)+"€",stats.mensuel+" abonnés"],["🗓️ Annuel (÷12)",stats.revAnnuel.toFixed(2)+"€",stats.annuel+" abonnés"],["🤝 Sponsoring",(stats.revSponso/3).toFixed(2)+"€","estimation/mois"]].map(([k,v,sub],i)=>(
            <div key={i} style={{flex:1,minWidth:100,background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px"}}>
              <p style={{margin:"0 0 2px",fontSize:11,color:"rgba(255,255,255,0.7)"}}>{k}</p>
              <p style={{margin:"0 0 1px",fontSize:18,fontWeight:800,color:"#fff"}}>{v}</p>
              <p style={{margin:0,fontSize:10,color:"rgba(255,255,255,0.6)"}}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats abonnements */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
        {[
          {label:"Total abonnements",val:stats.total,sub:`${stats.actifs} actifs`,emoji:"💳",color:C.blue},
          {label:"Plan mensuel",val:stats.mensuel,sub:"4.99 €/mois",emoji:"📅",color:C.accent},
          {label:"Plan annuel",val:stats.annuel,sub:"39.99 €/an",emoji:"🗓️",color:"#f59e0b"},
        ].map((st,i)=><StatCard key={i} {...st}/>)}
      </div>

      {/* Table abonnements */}
      <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 10px"}}>👥 Liste des abonnements</p>
      <div style={{...s.card,padding:0,overflow:"hidden",marginBottom:24}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0d1117"}}>{["Utilisateur","Plan","Montant","Début","Renouvellement","Statut"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{subs.map((sub,i)=>(
            <tr key={sub.id} style={{borderTop:`1px solid ${C.border}`,opacity:sub.statut!=="active"?0.6:1}}>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar nom={sub.nom} size={32}/><div><p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>{sub.nom}</p><p style={{margin:0,fontSize:11,color:C.muted}}>{sub.email}</p></div></div>
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge(sub.plan==="annuel"?"#fef3c7":"#dbeafe",sub.plan==="annuel"?"#92400e":"#1e40af")}>{sub.plan==="annuel"?"🗓️ Annuel":"📅 Mensuel"}</span></td>
              <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,color:C.green}}>{sub.montant}€</td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{sub.debut}</td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{sub.renouvellement}</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(sub.statut)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* Sponsorisations */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <p style={{fontSize:13,fontWeight:700,color:C.text,margin:0}}>🤝 Contenus sponsorisés</p>
        <button style={s.btn(C.accent)} onClick={()=>setShowSponsoForm(true)}>+ Nouveau partenariat</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
        {sponsos.map(sp=>(
          <div key={sp.id} style={{...s.card,display:"flex",alignItems:"center",gap:14,opacity:sp.statut==="expired"?0.6:1,border:sp.statut==="active"?`1px solid ${getTypeColor(sp.type)}33`:s.card.border}}>
            <div style={{width:44,height:44,borderRadius:12,background:getTypeColor(sp.type)+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{typeIcon[sp.type]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{sp.entreprise}</p>
                <span style={s.badge(sp.statut==="active"?"#d1fae5":"#e5e7eb",sp.statut==="active"?"#065f46":"#6b7280")}>{sp.statut==="active"?"✅ Actif":"Expiré"}</span>
                <span style={s.badge(getTypeColor(sp.type)+"22",getTypeColor(sp.type))}>{sp.type}</span>
              </div>
              <p style={{margin:0,fontSize:12,color:C.muted}}>📌 {sp.contenu} · 📅 {sp.debut} → {sp.fin} · ⏱ {sp.duree}</p>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <p style={{margin:"0 0 2px",fontSize:18,fontWeight:800,color:C.green}}>{sp.montant}€</p>
              <p style={{margin:0,fontSize:10,color:C.muted}}>contrat total</p>
            </div>
            <button style={s.btnOutline(C.red)} onClick={()=>setSponsos(sponsos.filter(x=>x.id!==sp.id))}>🗑️</button>
          </div>
        ))}
        {sponsos.length===0&&<div style={{...s.card,textAlign:"center",padding:"32px 16px",color:C.muted}}>Aucun partenariat enregistré</div>}
      </div>
      <div style={{...s.card,background:"rgba(124,58,237,0.04)",border:`1px solid ${C.accent}22`,padding:"10px 14px"}}>
        <p style={{margin:0,fontSize:12,color:C.muted}}>Total sponsorisations actives : <strong style={{color:C.green}}>{sponsos.filter(s=>s.statut==="active").reduce((a,s)=>a+(Number(s.montant)||0),0)}€</strong> · <strong style={{color:C.text}}>{sponsos.filter(s=>s.statut==="active").length} partenariat{sponsos.filter(s=>s.statut==="active").length>1?"s":""} actif{sponsos.filter(s=>s.statut==="active").length>1?"s":""}</strong></p>
      </div>

      {/* Modal nouveau partenariat */}
      {showSponsoForm&&<Modal title="Nouveau partenariat sponsorisé" onClose={()=>setShowSponsoForm(false)} width={480}>
        <AdminField label="Entreprise *"><input style={s.input} value={sponsoForm.entreprise||""} onChange={e=>setSponsoForm({...sponsoForm,entreprise:e.target.value})} placeholder="Ex : LEGO France"/></AdminField>
        <AdminField label="Type de contenu sponsorisé">
          <div style={{display:"flex",gap:8}}>
            {[["sortie","🗺️ Sortie"],["activite","🎨 Activité"],["evenement","📅 Événement"]].map(([v,l])=>(
              <button key={v} onClick={()=>setSponsoForm({...sponsoForm,type:v})} style={{flex:1,padding:"9px 0",borderRadius:10,border:`2px solid ${sponsoForm.type===v?C.accent:C.border}`,background:sponsoForm.type===v?"rgba(124,58,237,0.12)":"transparent",color:sponsoForm.type===v?C.accent:C.muted,fontSize:12,cursor:"pointer",fontWeight:sponsoForm.type===v?700:400}}>{l}</button>
            ))}
          </div>
        </AdminField>
        <AdminField label="Contenu associé"><input style={s.input} value={sponsoForm.contenu||""} onChange={e=>setSponsoForm({...sponsoForm,contenu:e.target.value})} placeholder="Nom de la sortie / activité / événement"/></AdminField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Montant (€)"><input style={s.input} type="number" value={sponsoForm.montant||""} onChange={e=>setSponsoForm({...sponsoForm,montant:+e.target.value})} placeholder="500"/></AdminField>
          <AdminField label="Durée"><input style={s.input} value={sponsoForm.duree||""} onChange={e=>setSponsoForm({...sponsoForm,duree:e.target.value})} placeholder="3 mois"/></AdminField>
          <AdminField label="Date début"><input style={s.input} type="date" value={sponsoForm.debut||""} onChange={e=>setSponsoForm({...sponsoForm,debut:e.target.value})}/></AdminField>
          <AdminField label="Date fin"><input style={s.input} type="date" value={sponsoForm.fin||""} onChange={e=>setSponsoForm({...sponsoForm,fin:e.target.value})}/></AdminField>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}>
          <button style={s.btnOutline(C.muted)} onClick={()=>setShowSponsoForm(false)}>Annuler</button>
          <button style={s.btn(C.accent)} onClick={()=>{if(!sponsoForm.entreprise)return;setSponsos([...sponsos,{id:"s"+Date.now(),...sponsoForm,statut:"active"}]);setShowSponsoForm(false);setSponsoForm({entreprise:"",type:"sortie",contenu:"",montant:"",duree:"",debut:"",fin:""});}}>Créer le partenariat</button>
        </div>
      </Modal>}
    </div>
  );
}

function Signalements({userReports=[],setUserReports,sharedActivites=[],setSharedActivites,sharedSorties=[],setSharedSorties,sharedEvenements=[],setSharedEvenements,onDeleteTitle,customCatActivites=[],customCatSorties=[],customCatEvenements=[]}) {
  const [reports,setReports] = useState(MOCK_REPORTS);
  const [editModal,setEditModal] = useState(null); // {report, mode:'edit'|'delete'}
  const [editForm,setEditForm] = useState({});
  const allReports=[...userReports,...reports].sort((a,b)=>Number(b.id)-Number(a.id)||0);
  const updateAll=(id,st)=>{
    setUserReports(prev=>prev.map(r=>r.id===id?{...r,statut:st}:r));
    setReports(prev=>prev.map(r=>r.id===id?{...r,statut:st}:r));
  };
  const pendingAll = allReports.filter(r=>r.statut==="pending").length;
  const update = (id,st) => updateAll(id,st);
  const typeColor = {activite:["#a78bfa","rgba(124,58,237,0.15)"],sortie:["#f472b6","rgba(236,72,153,0.15)"],evenement:["#fb923c","rgba(249,115,22,0.15)"],comment:["#94a3b8","rgba(148,163,184,0.15)"]};
  const typeIcon = {activite:"🎨",sortie:"🗺️",evenement:"📅"};
  const ACC_KEYS=["acc_poussette","acc_bebe","acc_allaitement","acc_langer","acc_aire03","acc_peubruyant","pmr_fauteuil","pmr_escaliers","pmr_parking","pmr_toilettes","pmr_personnel","pmr_chemin","tsa_foule","tsa_calme","tsa_lumiere","tsa_retrait","tsa_bruit","tsa_personnel","tdah_espace","tdah_physique","tdah_attente","tdah_stimulation","dys_visuels","dys_nonecrite","dys_rythme","dys_personnel"];
  const openEdit=(r)=>{
    const live=(r.type==="activite"&&sharedActivites.find(a=>a.nom===r.titre||a.titre===r.titre))||null;
    const accFlags={};
    ACC_KEYS.forEach(k=>{ accFlags[k]=!!(live&&live[k]); });
    setEditForm({titre:r.titre,raison:r.raison,detail:r.detail||"",desc:r.desc||"",duree:r.duree||"",difficulte:r.difficulte||"",lieu:r.lieu||"",energie:r.energie||"",categorie:r.categorie||"",ageMin:r.ageMin||"",ageMax:r.ageMax||"",materielStr:Array.isArray(r.materiel)?r.materiel.join(", "):"",dept:r.dept||"",adresse:r.adresse||"",horaires:r.horaires||"",prix:r.prix||"",date:r.date||"",fin:r.fin||"",ville:r.ville||"",organisateur:r.organisateur||"",type:r.typeEvt||"",...accFlags});
    setEditModal({report:r,mode:"edit"});
  };
  const openDelete=(r)=>setEditModal({report:r,mode:"delete"});
  const saveEdit=()=>{
    const r=editModal.report;
    setUserReports(prev=>prev.map(x=>x.id===r.id?{...x,...editForm}:x));
    setReports(prev=>prev.map(x=>x.id===r.id?{...x,...editForm}:x));
    const titre=r.titre;
    const garde=(val,fallback)=>(val!==undefined&&val!==null&&val!==""?val:fallback);
    if(r.type==="sortie"&&setSharedSorties){
      setSharedSorties(prev=>prev.map(s=>(s.nom===titre||s.titre===titre)?{
        ...s,
        titre:garde(editForm.titre,s.titre),
        nom:garde(editForm.titre,s.nom),
        dept:garde(editForm.dept,s.dept),
        adresse:garde(editForm.adresse,s.adresse),
        horaires:garde(editForm.horaires,s.horaires),
        prix:garde(editForm.prix,s.prix),
        ville:garde(editForm.ville,s.ville),
        type:garde(editForm.categorie,s.type),
      }:s));
    }else if(r.type==="evenement"&&setSharedEvenements){
      setSharedEvenements(prev=>prev.map(e=>(e.nom===titre||e.titre===titre)?{
        ...e,
        titre:garde(editForm.titre,e.titre),
        nom:garde(editForm.titre,e.nom),
        ville:garde(editForm.ville,e.ville),
        dept:garde(editForm.dept,e.dept),
        date:garde(editForm.date,e.date),
        fin:garde(editForm.fin,e.fin),
        prix:garde(editForm.prix,e.prix),
        organisateur:garde(editForm.organisateur,e.organisateur),
        type:garde(editForm.type,e.type),
      }:e));
    }else if(setSharedActivites){
      const accUpdates={};
      ACC_KEYS.forEach(k=>{ accUpdates[k]=!!editForm[k]; });
      setSharedActivites(prev=>prev.map(a=>(a.nom===titre||a.titre===titre)?{
        ...a,
        titre:garde(editForm.titre,a.titre),
        nom:garde(editForm.titre,a.nom),
        desc:garde(editForm.desc,a.desc),
        duree:garde(editForm.duree,a.duree),
        difficulte:garde(editForm.difficulte,a.difficulte),
        lieu:garde(editForm.lieu,a.lieu),
        energie:garde(editForm.energie,a.energie),
        categorie:garde(editForm.categorie,a.categorie),
        ageMin:garde(editForm.ageMin,a.ageMin),
        ageMax:garde(editForm.ageMax,a.ageMax),
        materiel:editForm.materielStr?editForm.materielStr.split(",").map(m=>m.trim()).filter(Boolean):a.materiel,
        ...accUpdates,
      }:a));
    }
    updateAll(r.id,"resolved");
    setEditModal(null);
  };
  const deleteItem=()=>{
    const titre=editModal.report.titre;
    const type=editModal.report.type;
    setUserReports(prev=>prev.filter(r=>r.id!==editModal.report.id));
    setReports(prev=>prev.filter(r=>r.id!==editModal.report.id));
    if(type==="sortie"&&setSharedSorties) setSharedSorties(prev=>prev.filter(s=>s.nom!==titre&&s.titre!==titre));
    else if(type==="evenement"&&setSharedEvenements) setSharedEvenements(prev=>prev.filter(e=>e.nom!==titre&&e.titre!==titre));
    else if(setSharedActivites) setSharedActivites(prev=>prev.filter(a=>a.nom!==titre&&a.titre!==titre));
    if(onDeleteTitle)onDeleteTitle(titre);
    setEditModal(null);
  };
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Signalements</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Traitez les signalements de la communaute</p></div>
        {pendingAll>0&&<span style={s.badge("#fee2e2","#ef4444")}>{pendingAll} en attente</span>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {allReports.map(r=>{
          const [tc,tbg] = typeColor[r.type]||typeColor.comment;
          return(
            <div key={r.id} style={{...s.card,borderLeft:`3px solid ${r.statut==="pending"?C.yellow:r.statut==="resolved"?C.green:C.border}`}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:r.statut==="pending"?12:0}}>
                <div style={{width:40,height:40,borderRadius:10,background:tbg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{typeIcon[r.type]||"🚩"}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={s.badge(tbg,tc)}>{r.type}</span>
                    {statutBadge(r.statut)}
                  </div>
                  <p style={{margin:"0 0 2px",fontSize:14,fontWeight:600,color:C.text}}>{r.titre}</p>
                  <p style={{margin:"0 0 4px",fontSize:12,color:C.muted}}>Raison : {r.raison}</p>
                  {r.detail&&<p style={{margin:"0 0 4px",fontSize:11,color:C.muted,fontStyle:"italic"}}>"{r.detail}"</p>}
                  <p style={{margin:0,fontSize:11,color:C.muted}}>Signalé par {r.signalePar||"anonyme"} · {r.date||""}</p>
                </div>
              </div>
              {r.statut==="pending"&&(
                <div style={{display:"flex",gap:8,flexWrap:"wrap",paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                  <button style={s.btn(C.green)} onClick={()=>update(r.id,"resolved")}>✅ Resoudre</button>
                  <button style={{...s.btn(C.accent)}} onClick={()=>openEdit(r)}>✏️ Modifier le contenu</button>
                  <button style={s.btn(C.red)} onClick={()=>openDelete(r)}>🗑️ Supprimer</button>
                  <button style={s.btn(C.muted,"#fff")} onClick={()=>update(r.id,"dismissed")}>Ignorer</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal modifier — carte complète selon le type */}
      {editModal?.mode==="edit"&&(()=>{
        const r=editModal.report;
        const tf=(key)=>setEditForm(prev=>({...prev,[key]:!prev[key]}));
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(124,58,237,0.4)":C.border}`,background:active?"rgba(124,58,237,0.1)":"transparent",color:active?"#a78bfa":C.muted,fontSize:12,cursor:"pointer",userSelect:"none",marginBottom:4});
        return(
        <Modal title={"✏️ Modifier : "+r.titre} onClose={()=>setEditModal(null)} width={600}>
          {/* Bandeau signalement */}
          <div style={{background:"rgba(234,88,12,0.1)",borderRadius:10,padding:"10px 14px",marginBottom:18,display:"flex",gap:8,alignItems:"flex-start"}}>
            <span style={{fontSize:16,flexShrink:0}}>🚩</span>
            <div>
              <p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,color:"#fb923c"}}>Raison du signalement : {r.raison}</p>
              {r.detail&&<p style={{margin:0,fontSize:11,color:"#fb923c",opacity:0.8,fontStyle:"italic"}}>"{r.detail}"</p>}
            </div>
          </div>

          {/* CARTE ACTIVITE */}
          {r.type==="activite"&&(<div>
            <AdminField label="Titre *"><input style={s.input} value={editForm.titre||""} onChange={e=>setEditForm({...editForm,titre:e.target.value})}/></AdminField>
            <AdminField label="Description"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={editForm.desc||""} onChange={e=>setEditForm({...editForm,desc:e.target.value})} placeholder="Description de l activite..."/></AdminField>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <AdminField label="Duree"><select style={s.input} value={editForm.duree||""} onChange={e=>setEditForm({...editForm,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
              <AdminField label="Difficulte"><select style={s.input} value={editForm.difficulte||""} onChange={e=>setEditForm({...editForm,difficulte:e.target.value})}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
              <AdminField label="Lieu"><select style={s.input} value={editForm.lieu||""} onChange={e=>setEditForm({...editForm,lieu:e.target.value})}><option value="">Choisir</option><option value="interieur">Interieur</option><option value="exterieur">Exterieur</option></select></AdminField>
              <AdminField label="Motivation"><select style={s.input} value={editForm.energie||""} onChange={e=>setEditForm({...editForm,energie:e.target.value})}><option value="">Choisir</option><option value="fatigue">Fatigue</option><option value="motiv">Motiv</option></select></AdminField>
            </div>
            <AdminField label="Categorie"><select style={s.input} value={editForm.categorie||""} onChange={e=>setEditForm({...editForm,categorie:e.target.value})}><option value="">Choisir</option>{[...CATEGORIES_ACT_ALL,...customCatActivites.map(c=>c.label)].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Age conseille">
              <div style={{display:"flex",gap:8}}>
                <select style={{...s.input,flex:1}} value={editForm.ageMin||""} onChange={e=>setEditForm({...editForm,ageMin:e.target.value})}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select>
                <select style={{...s.input,flex:1}} value={editForm.ageMax||""} onChange={e=>setEditForm({...editForm,ageMax:e.target.value})}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select>
              </div>
            </AdminField>
            <AdminField label="Materiel"><input style={s.input} value={editForm.materielStr||""} onChange={e=>setEditForm({...editForm,materielStr:e.target.value})} placeholder="Ex: peinture, papier"/></AdminField>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
              <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#3b82f6"}}>♿ PMR</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{[["pmr_fauteuil","Acces fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptees"],["pmr_personnel","Personnel forme"],["pmr_chemin","Chemin accessible"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!editForm[k])}><span>{editForm[k]?"☑":"☐"}</span>{l}</div>))}</div>
              <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:"#a78bfa"}}>🧩 TND</p>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#8b5cf6"}}>TSA</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>{[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumiere douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!editForm[k])}><span>{editForm[k]?"☑":"☐"}</span>{l}</div>))}</div>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#ec4899"}}>TDAH</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>{[["tdah_espace","Grand espace"],["tdah_physique","Activite physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variee"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!editForm[k])}><span>{editForm[k]?"☑":"☐"}</span>{l}</div>))}</div>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:600,color:"#06b6d4"}}>DYS</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{[["dys_visuels","Supports visuels"],["dys_nonecrite","Non ecrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!editForm[k])}><span>{editForm[k]?"☑":"☐"}</span>{l}</div>))}</div>
            </div>
          </div>)}

          {/* CARTE SORTIE */}
          {r.type==="sortie"&&(<div>
            <AdminField label="Nom *"><input style={s.input} value={editForm.titre||""} onChange={e=>setEditForm({...editForm,titre:e.target.value})}/></AdminField>
            <AdminField label="Departement"><input style={s.input} value={editForm.dept||""} onChange={e=>setEditForm({...editForm,dept:e.target.value})} placeholder="Paris (75)"/></AdminField>
            <AdminField label="Adresse"><input style={s.input} value={editForm.adresse||""} onChange={e=>setEditForm({...editForm,adresse:e.target.value})}/></AdminField>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <AdminField label="Horaires"><input style={s.input} value={editForm.horaires||""} onChange={e=>setEditForm({...editForm,horaires:e.target.value})} placeholder="9h-18h"/></AdminField>
              <AdminField label="Prix"><input style={s.input} value={editForm.prix||""} onChange={e=>setEditForm({...editForm,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
            </div>
            <AdminField label="Categorie"><select style={s.input} value={editForm.categorie||""} onChange={e=>setEditForm({...editForm,categorie:e.target.value})}><option value="">Choisir</option>{[...TYPES_SORTIE,...customCatSorties.map(c=>c.label)].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          </div>)}

          {/* CARTE EVENEMENT */}
          {r.type==="evenement"&&(<div>
            <AdminField label="Titre *"><input style={s.input} value={editForm.titre||""} onChange={e=>setEditForm({...editForm,titre:e.target.value})}/></AdminField>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <AdminField label="Date debut"><input type="date" style={s.input} value={editForm.date||""} onChange={e=>setEditForm({...editForm,date:e.target.value})}/></AdminField>
              <AdminField label="Date fin"><input type="date" style={s.input} value={editForm.fin||""} onChange={e=>setEditForm({...editForm,fin:e.target.value})}/></AdminField>
              <AdminField label="Ville"><input style={s.input} value={editForm.ville||""} onChange={e=>setEditForm({...editForm,ville:e.target.value})}/></AdminField>
              <AdminField label="Prix"><input style={s.input} value={editForm.prix||""} onChange={e=>setEditForm({...editForm,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
            </div>
            <AdminField label="Organisateur"><input style={s.input} value={editForm.organisateur||""} onChange={e=>setEditForm({...editForm,organisateur:e.target.value})}/></AdminField>
            <AdminField label="Type"><select style={s.input} value={editForm.type||""} onChange={e=>setEditForm({...editForm,type:e.target.value})}><option value="">Choisir</option>{[...EVT_CATEGORIES,...customCatEvenements].map(c=><option key={c.k} value={c.k}>{c.emoji} {c.label}</option>)}</select></AdminField>
          </div>)}

          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setEditModal(null)}>Annuler</button>
            <button style={s.btn(C.accent)} onClick={saveEdit}>✅ Enregistrer et resoudre</button>
          </div>
        </Modal>
        );
      })()}

      {/* Modal supprimer */}
      {editModal?.mode==="delete"&&(
        <Modal title="Supprimer le contenu" onClose={()=>setEditModal(null)} width={420}>
          <div style={{textAlign:"center",padding:"8px 0 16px"}}>
            <div style={{fontSize:48,marginBottom:12}}>🗑️</div>
            <p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 8px"}}>Supprimer "{editModal.report.titre}" ?</p>
            <p style={{fontSize:13,color:C.muted,lineHeight:1.6,margin:"0 0 20px"}}>Cette action supprimera definitivement ce contenu de l application et marquera le signalement comme resolu.</p>
            <div style={{display:"flex",gap:8}}>
              <button style={{...s.btn(C.muted,"#fff"),flex:1,justifyContent:"center"}} onClick={()=>setEditModal(null)}>Annuler</button>
              <button style={{...s.btn(C.red),flex:1,justifyContent:"center"}} onClick={deleteItem}>🗑️ Supprimer definitivement</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function IdeeDetailModal({idee,onSave,onClose}){
  const [form,setForm]=useState({
    label:idee.label||"",
    description:idee.description||"",
    emoji:idee.emoji||"🎨",
    gradient:idee.gradient||"linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",
    actif:idee.actif!==false,
    activiteMiseEnAvant:idee.activiteMiseEnAvant||null,
    programmation:{date:idee.programmation?.date||"",heure:idee.programmation?.heure||""},
  });
  const [showBiblio,setShowBiblio]=useState(false);
  const [showPreview,setShowPreview]=useState(false);
  const GRADIENTS=["linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)","linear-gradient(135deg,#6ee7b7 0%,#059669 100%)","linear-gradient(135deg,#fde68a 0%,#f59e0b 100%)","linear-gradient(135deg,#fda4af 0%,#e11d48 100%)","linear-gradient(135deg,#67e8f9 0%,#0891b2 100%)","linear-gradient(135deg,#fcd34d 0%,#d97706 100%)","linear-gradient(135deg,#86efac 0%,#16a34a 100%)","linear-gradient(135deg,#f9a8d4 0%,#db2777 100%)"];
  const EMOJIS=["🎨","🌳","📅","🎂","🎪","⭐","🎯","🎵","🏃","🍳","🧩","💡","🎉","🌈","🦋"];
  const pubIsFuture=form.programmation.date&&form.programmation.heure?(()=>{const [y,mo,d]=form.programmation.date.split("-").map(Number);const [h,mi]=form.programmation.heure.split(":").map(Number);return new Date(y,mo-1,d,h,mi)>new Date();})():false;

  if(showPreview) return (
    <div onClick={()=>setShowPreview(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={e=>e.stopPropagation()} style={{width:360,background:BG,borderRadius:24,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
        <div style={{background:"rgba(0,0,0,0.08)",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:"#666",fontWeight:600}}>👁️ Aperçu utilisateur</span>
          <button onClick={()=>setShowPreview(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#666"}}>×</button>
        </div>
        {/* Simule la carte idée du moment */}
        <div style={{padding:16}}>
          <p style={{margin:"0 0 12px",fontSize:12,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.05em"}}>IDÉE DU MOMENT</p>
          <div style={{background:form.gradient,borderRadius:18,padding:"18px 16px",display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{form.emoji}</div>
            <div>
              <p style={{margin:"0 0 4px",fontSize:15,fontWeight:800,color:"#fff"}}>{form.label||"Titre de l'idée"}</p>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.75)",lineHeight:1.4}}>{form.description||"Description..."}</p>
            </div>
          </div>
          {!form.actif&&<div style={{marginTop:10,background:"#FEF2F2",borderRadius:10,padding:"8px 12px",border:"1px solid #FECACA"}}>
            <p style={{margin:0,fontSize:12,color:"#991B1B"}}>⚠️ Cette idée est masquée — les utilisateurs ne la verront pas</p>
          </div>}
          {form.actif&&<div style={{marginTop:10,background:"#ECFDF5",borderRadius:10,padding:"8px 12px",border:"1px solid #A7F3D0"}}>
            <p style={{margin:0,fontSize:12,color:"#065F46"}}>✅ Cette idée est active et visible par tous</p>
          </div>}
        </div>
      </div>
    </div>
  );
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:18,border:`1px solid ${C.border}`,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
        <div style={{background:form.gradient,padding:"20px 20px 24px",borderRadius:"18px 18px 0 0",position:"relative"}}>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{form.emoji}</div>
            <div><p style={{margin:"0 0 2px",fontSize:17,fontWeight:800,color:"#fff"}}>{form.label||"Vignette"}</p><span style={{fontSize:11,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"2px 10px",borderRadius:10}}>{form.actif?"✅ Visible":"🔴 Masqué"}</span></div>
          </div>
        </div>
        <div style={{padding:"18px 22px"}}>
          <AdminField label="Titre *"><input style={s.input} value={form.label||""} onChange={e=>setForm(p=>({...p,label:e.target.value}))}/></AdminField>
          <AdminField label="Description"><input style={s.input} value={form.description||""} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="Sous-titre de la vignette"/></AdminField>
          <div style={{marginBottom:14}}><label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Emoji</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{EMOJIS.map(e=><button key={e} onClick={()=>setForm(p=>({...p,emoji:e}))} style={{width:36,height:36,borderRadius:10,border:`2px solid ${form.emoji===e?C.accent:C.border}`,background:form.emoji===e?"rgba(124,58,237,0.15)":"transparent",fontSize:18,cursor:"pointer"}}>{e}</button>)}</div></div>
          <div style={{marginBottom:14}}><label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>Couleur</label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{GRADIENTS.map((g,gi)=><button key={gi} onClick={()=>setForm(p=>({...p,gradient:g}))} style={{width:36,height:36,borderRadius:10,background:g,border:form.gradient===g?"3px solid #fff":"2px solid transparent",outline:form.gradient===g?`2px solid ${C.accent}`:"none",cursor:"pointer"}}/>)}</div></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10,marginBottom:14,border:`1px solid ${C.border}`}}>
            <div><p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>Visibilité</p><p style={{margin:0,fontSize:11,color:C.muted}}>{form.actif?"Affiché sur l'accueil":"Masqué de l'accueil"}</p></div>
            <Tog on={form.actif} onChange={()=>setForm(p=>({...p,actif:!p.actif}))}/>
          </div>
          {/* Activité mise en avant */}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>🎯 Activité mise en avant</label>
            {form.activiteMiseEnAvant?(<div style={{background:"rgba(124,58,237,0.1)",borderRadius:10,padding:"10px 14px",border:`1px solid ${C.accent}44`,display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{flex:1}}><p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>{form.activiteMiseEnAvant.nom}</p><p style={{margin:0,fontSize:11,color:C.muted}}>{form.activiteMiseEnAvant.categorie}</p></div>
              <button onClick={()=>setForm(p=>({...p,activiteMiseEnAvant:null}))} style={{background:"rgba(239,68,68,0.1)",border:"none",borderRadius:6,color:C.red,cursor:"pointer",fontSize:12,padding:"4px 8px"}}>× Retirer</button>
            </div>):(<p style={{fontSize:12,color:C.muted,margin:"0 0 8px",fontStyle:"italic"}}>Aucune — la vignette ouvrira la bibliothèque</p>)}
            <button onClick={()=>setShowBiblio(!showBiblio)} style={{...s.btnOutline(C.accent),width:"100%",justifyContent:"center",padding:"9px 0",borderRadius:10}}>🔍 {form.activiteMiseEnAvant?"Changer":"Choisir dans la bibliothèque"}</button>
            {showBiblio&&<BiblioSearchPicker onSelect={a=>{ setForm(p=>({...p,activiteMiseEnAvant:a})); setShowBiblio(false); }} allActs={ACTIVITES}/>}
          </div>
          {/* Programmation */}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:8,fontWeight:500}}>📅 Programmer l'affichage</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>Date</label><input type="date" value={form.programmation.date} onChange={e=>setForm(p=>({...p,programmation:{...p.programmation,date:e.target.value},actif:true}))} style={{...s.input,fontSize:12}}/></div>
              <div><label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>Heure</label><input type="time" value={form.programmation.heure} onChange={e=>setForm(p=>({...p,programmation:{...p.programmation,heure:e.target.value},actif:true}))} style={{...s.input,fontSize:12}}/></div>
            </div>
            {form.programmation.date&&form.programmation.heure&&(
              <div style={{marginTop:8,padding:"8px 12px",borderRadius:8,background:pubIsFuture?"rgba(59,130,246,0.1)":"rgba(16,185,129,0.1)",border:`1px solid ${pubIsFuture?"rgba(59,130,246,0.3)":"rgba(16,185,129,0.3)"}`}}>
                <p style={{margin:0,fontSize:11,color:pubIsFuture?"#60a5fa":"#34d399"}}>{pubIsFuture?"⏰ Masquée jusqu'au ":"✅ Publiée depuis le "}{(()=>{const [y,mo,d]=form.programmation.date.split("-").map(Number);const [h,mi]=form.programmation.heure.split(":").map(Number);const dt=new Date(y,mo-1,d,h,mi);return isNaN(dt.getTime())?"date invalide":dt.toLocaleString("fr-FR",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});})()}</p>
              </div>
            )}
            {(form.programmation.date||form.programmation.heure)&&<button onClick={()=>setForm(p=>({...p,programmation:{date:"",heure:""}}))} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",marginTop:6,padding:0}}>× Supprimer la programmation</button>}
          </div>
          <div style={{display:"flex",gap:8,paddingTop:8,borderTop:`1px solid ${C.border}`}}>
            <button style={{...s.btnOutline(C.muted),flex:1,justifyContent:"center"}} onClick={onClose}>Annuler</button>
            <button style={{...s.btnOutline(C.muted),flex:1,justifyContent:"center"}} onClick={()=>setShowPreview(true)}>👁️ Aperçu</button>
            <button style={{...s.btn(C.accent),flex:2,justifyContent:"center"}} onClick={()=>onSave(form)}>✅ Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiblioSearchPicker({onSelect,allActs=[]}) {
  const [q,setQ]=useState("");
  const filtered=allActs.filter(a=>!q||a.nom?.toLowerCase().includes(q.toLowerCase())||a.categorie?.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{marginTop:10,background:"rgba(0,0,0,0.2)",borderRadius:12,padding:12,border:`1px solid ${C.border}`,maxHeight:220,overflowY:"auto"}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher une activité..." style={{...s.input,marginBottom:8}} autoFocus/>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {filtered.slice(0,20).map(a=>(
          <div key={a.id} onClick={()=>onSelect(a)} style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,0.04)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.border}`}}>
            <span style={{fontSize:14}}>{a.lieu==="interieur"?"🏠":"🌳"}</span>
            <div style={{flex:1,minWidth:0}}>
              <p style={{margin:0,fontSize:12,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.nom}</p>
              <p style={{margin:0,fontSize:10,color:C.muted}}>{a.categorie} · {a.age}</p>
            </div>
            <span style={{fontSize:10,background:"rgba(124,58,237,0.15)",color:"#a78bfa",padding:"2px 8px",borderRadius:8,flexShrink:0,fontWeight:600}}>{a.energie==="fatigue"?"😴":"⚡"}</span>
          </div>
        ))}
        {filtered.length===0&&<p style={{fontSize:12,color:C.muted,textAlign:"center",padding:"12px 0"}}>Aucune activité trouvée</p>}
      </div>
    </div>
  );
}

function Communication({ideesMomentConfig=[],setIdeesMomentConfig}) {
  const [comms,setComms] = useState(MOCK_COMMS);
  const [previewComm,setPreviewComm] = useState(null);
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({type:"banner",titre:"",message:"",debut:"",fin:"",actif:false});
  const [selectedIdee,setSelectedIdee] = useState(null); // index of selected idee
  const toggleActif = (id) => setComms(comms.map(c=>c.id===id?{...c,actif:!c.actif}:c));
  const save = () => {
    if(!form.titre||!form.message) return;
    if(modal?.mode==="edit") setComms(comms.map(c=>c.id===modal.item.id?{...c,...form}:c));
    else setComms([...comms,{id:Date.now().toString(),...form}]);
    setModal(null);
  };
  const typeInfo = {banner:["📢","Bandeau","#3b82f6"],popup:["💬","Pop-up","#7c3aed"],push:["🔔","Notification push","#10b981"]};
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Communication</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Bandeaux, pop-ups et notifications</p></div>
        <button style={s.btn(C.blue)} onClick={()=>{setForm({type:"banner",titre:"",message:"",debut:"",fin:"",actif:false});setModal({mode:"add"});}}>+ Nouveau message</button>
      </div>

      {/* Idées du moment */}
      <div style={{...s.card,marginBottom:20}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 4px"}}>💡 Idées du moment</p>
        <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Contrôlez les vignettes affichées sur l'accueil utilisateur</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {ideesMomentConfig.map((idee,i)=>(
            <div key={idee.id} onClick={()=>setSelectedIdee(i)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:`1px solid ${idee.actif?C.accent+"44":C.border}`,cursor:"pointer",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
              <div style={{width:42,height:42,borderRadius:12,background:idee.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{idee.emoji}</div>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:13,fontWeight:600,color:C.text}}>{idee.label}</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>
                  {idee.actif?"✅ Visible":"🔴 Masqué"}
                  {idee.programmation?.date&&idee.programmation?.heure&&(()=>{
                    const [y,mo,d]=idee.programmation.date.split("-").map(Number);
                    const [h,mi]=idee.programmation.heure.split(":").map(Number);
                    const pub=new Date(y,mo-1,d,h,mi);
                    const isFuture=pub>new Date();
                    return <span style={{color:isFuture?"#f59e0b":"#10b981"}}> · ⏰ {isFuture?"Programmé — masqué jusqu'au":"Publié depuis le"} {pub.toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</span>;
                  })()}
                </p>
              </div>
              <span style={{fontSize:18,color:C.muted}}>→</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11,color:C.muted,margin:"10px 0 0"}}>💡 Cliquez sur une vignette pour la modifier en détail.</p>
      </div>

      {/* Page détail vignette */}
      {selectedIdee!==null&&ideesMomentConfig[selectedIdee]&&<IdeeDetailModal idee={ideesMomentConfig[selectedIdee]} onSave={changes=>{setIdeesMomentConfig(prev=>prev.map((x,j)=>j===selectedIdee?{...x,...changes}:x));setSelectedIdee(null);}} onClose={()=>setSelectedIdee(null)}/>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {comms.map(comm=>{
          const [emoji,label,color] = typeInfo[comm.type]||typeInfo.banner;
          return(
            <div key={comm.id} style={{...s.card,border:`2px solid ${comm.actif?color+"44":C.border}`}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:38,height:38,borderRadius:10,background:color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{emoji}</div>
                  <span style={s.badge(color+"22",color)}>{label}</span>
                </div>
                <Tog on={comm.actif} onChange={()=>toggleActif(comm.id)}/>
              </div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:C.text}}>{comm.titre}</p>
              <p style={{margin:"0 0 10px",fontSize:12,color:C.muted,lineHeight:1.5}}>{comm.message}</p>
              <p style={{margin:"0 0 12px",fontSize:11,color:C.muted}}>📅 {comm.debut} → {comm.fin}</p>
              <div style={{display:"flex",gap:6}}>
                <button style={{...s.btnOutline(C.muted),flex:1}} onClick={()=>{
                  setPreviewComm(comm);
                }}>👁️ Aperçu</button>
                <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({...comm});setModal({mode:"edit",item:comm});}}>✏️ Modifier</button>
                <button style={s.btnOutline(C.red)} onClick={()=>setComms(comms.filter(c=>c.id!==comm.id))}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
      {modal&&<Modal title={modal.mode==="edit"?"Modifier":"Nouveau message"} onClose={()=>setModal(null)}>
        <AdminField label="Type"><select style={s.input} value={form.type||"banner"} onChange={e=>setForm({...form,type:e.target.value})}><option value="banner">📢 Bandeau</option><option value="popup">💬 Pop-up</option><option value="push">🔔 Notification push</option></select></AdminField>
        <AdminField label="Titre"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Titre du message"/></AdminField>
        <AdminField label="Message"><textarea style={{...s.input,minHeight:80,resize:"vertical"}} value={form.message||""} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Contenu du message..."/></AdminField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Début"><input style={s.input} value={form.debut||""} onChange={e=>setForm({...form,debut:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
          <AdminField label="Fin"><input style={s.input} value={form.fin||""} onChange={e=>setForm({...form,fin:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"rgba(59,130,246,0.08)",borderRadius:10,marginBottom:14}}>
          <p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>Activer immédiatement</p>
          <Tog on={form.actif} onChange={()=>setForm({...form,actif:!form.actif})}/>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
          <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
          <button style={s.btn(C.blue)} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer"}</button>
        </div>
      </Modal>}

      {/* Modal prévisualisation bannière */}
      {previewComm&&(
        <div onClick={()=>setPreviewComm(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{width:360,background:BG,borderRadius:24,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
            <div style={{background:"rgba(0,0,0,0.08)",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#666",fontWeight:600}}>👁️ Aperçu utilisateur — {previewComm.type==="banner"?"Bandeau":"Pop-up"}</span>
              <button onClick={()=>setPreviewComm(null)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#666"}}>×</button>
            </div>
            <div style={{padding:16}}>
              {/* Simule l'accueil */}
              <div style={{background:"#E5E7EB",borderRadius:12,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"#9CA3AF"}}/>
                <div style={{flex:1}}><div style={{height:8,background:"#D1D5DB",borderRadius:4,width:"60%",marginBottom:4}}/><div style={{height:6,background:"#E5E7EB",borderRadius:4,width:"40%"}}/></div>
              </div>
              {previewComm.type==="banner"?(
                <div style={{background:"linear-gradient(135deg,#6C5CE7,#a78bfa)",borderRadius:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                  <span style={{fontSize:24,flexShrink:0}}>📢</span>
                  <div>
                    <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:"#fff"}}>{previewComm.titre||"Titre du bandeau"}</p>
                    <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.85)",lineHeight:1.4}}>{previewComm.message||"Contenu du message..."}</p>
                  </div>
                </div>
              ):(
                <div style={{background:"rgba(0,0,0,0.5)",borderRadius:12,padding:16,textAlign:"center",marginBottom:10}}>
                  <p style={{margin:"0 0 6px",fontSize:15,fontWeight:700,color:"#fff"}}>{previewComm.titre||"Titre de la popup"}</p>
                  <p style={{margin:"0 0 12px",fontSize:12,color:"rgba(255,255,255,0.8)"}}>{previewComm.message||"Message..."}</p>
                  <button style={{padding:"8px 20px",borderRadius:20,background:"#6C5CE7",border:"none",color:"#fff",fontWeight:600,fontSize:12}}>OK</button>
                </div>
              )}
              <p style={{margin:0,fontSize:11,color:"#9CA3AF",textAlign:"center"}}>Valide du {previewComm.debut||"—"} au {previewComm.fin||"—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Categories({customCatActivites=[],setCustomCatActivites,customCatSorties=[],setCustomCatSorties,customCatEvenements=[],setCustomCatEvenements}) {
  const [tab,setTab]=useState("activites");
  const [label,setLabel]=useState("");
  const [emoji,setEmoji]=useState("");
  const reset=()=>{setLabel("");setEmoji("");};
  const ajouterSimple=(liste,setListe,defaults)=>{
    const lab=label.trim();
    if(!lab)return;
    const emo=emoji.trim()||"🏷️";
    const dejaDefaut=defaults.some(d=>d.toLowerCase()===lab.toLowerCase());
    const dejaCustom=liste.some(c=>c.label.toLowerCase()===lab.toLowerCase());
    if(dejaDefaut||dejaCustom){ alert("Cette catégorie existe déjà."); return; }
    setListe([...liste,{label:lab,emoji:emo}]);
    reset();
  };
  const ajouterEvenement=()=>{
    const lab=label.trim();
    if(!lab)return;
    const emo=emoji.trim()||"🎉";
    const k=lab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")||("cat"+Date.now());
    const dejaDefaut=EVT_CATEGORIES.some(c=>c.k===k||c.label.toLowerCase()===lab.toLowerCase());
    const dejaCustom=customCatEvenements.some(c=>c.k===k||c.label.toLowerCase()===lab.toLowerCase());
    if(dejaDefaut||dejaCustom){ alert("Cette catégorie existe déjà."); return; }
    setCustomCatEvenements([...customCatEvenements,{k,label:lab,emoji:emo}]);
    reset();
  };
  const supprimer=(liste,setListe,index)=>setListe(liste.filter((_,i)=>i!==index));
  const tabs=[{k:"activites",label:"Activités",defaults:CATEGORIES_ACT_ALL,custom:customCatActivites},{k:"sorties",label:"Sorties",defaults:TYPES_SORTIE,custom:customCatSorties},{k:"evenements",label:"Événements",defaults:EVT_CATEGORIES.map(c=>c.label),custom:customCatEvenements}];
  const current=tabs.find(t=>t.k===tab);
  return(
    <div>
      <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:"0 0 4px"}}>🏷️ Catégories</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 20px"}}>Ajoutez de nouveaux types d'activité, de sortie ou d'événement, avec leur propre emoji. Ils apparaîtront dans tous les formulaires et filtres de l'app.</p>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>{setTab(t.k);reset();}} style={{padding:"9px 18px",borderRadius:10,border:"none",background:tab===t.k?"rgba(124,58,237,0.18)":"rgba(255,255,255,0.04)",color:tab===t.k?"#a78bfa":C.muted,fontWeight:tab===t.k?700:400,fontSize:13,cursor:"pointer"}}>{t.label}</button>
        ))}
      </div>
      <div style={{...s.card,marginBottom:20}}>
        <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 12px"}}>+ Nouvelle catégorie {current.label.toLowerCase()}</p>
        <div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:160}}>
            <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:6}}>Nom</label>
            <input style={s.input} value={label} onChange={e=>setLabel(e.target.value)} placeholder="Ex : Theatre" onKeyDown={e=>e.key==="Enter"&&(tab==="evenements"?ajouterEvenement():ajouterSimple(current.custom,tab==="activites"?setCustomCatActivites:setCustomCatSorties,current.defaults))}/>
          </div>
          <div style={{width:90}}>
            <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:6}}>Emoji</label>
            <input style={{...s.input,textAlign:"center",fontSize:18}} value={emoji} onChange={e=>setEmoji(e.target.value)} placeholder="🎭" maxLength={4}/>
          </div>
          <button style={s.btn(C.accent)} onClick={()=>tab==="evenements"?ajouterEvenement():ajouterSimple(current.custom,tab==="activites"?setCustomCatActivites:setCustomCatSorties,current.defaults)}>+ Ajouter</button>
        </div>
      </div>
      <p style={{fontSize:12,fontWeight:700,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Catégories par défaut</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
        {tab==="evenements"?EVT_CATEGORIES.map(c=>(<span key={c.k} style={{...s.badge("rgba(255,255,255,0.05)",C.muted),padding:"6px 12px",fontSize:13}}>{c.emoji} {c.label}</span>)):current.defaults.map(d=>(<span key={d} style={{...s.badge("rgba(255,255,255,0.05)",C.muted),padding:"6px 12px",fontSize:13}}>{d}</span>))}
      </div>
      <p style={{fontSize:12,fontWeight:700,color:C.muted,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Catégories ajoutées ({current.custom.length})</p>
      {current.custom.length===0?(
        <p style={{fontSize:13,color:C.muted}}>Aucune catégorie personnalisée pour l'instant.</p>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {current.custom.map((c,i)=>(
            <div key={i} style={{...s.card,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:20}}>{c.emoji}</span>
              <span style={{flex:1,fontSize:14,color:C.text,fontWeight:600}}>{c.label}</span>
              <button style={s.btnOutline(C.red)} onClick={()=>supprimer(current.custom,tab==="activites"?setCustomCatActivites:tab==="sorties"?setCustomCatSorties:setCustomCatEvenements,i)}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Admins() {
  const [admins,setAdmins] = useState(MOCK_ADMINS);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({prenom:"",nom:"",email:"",role:"moderateur"});
  const save = () => {
    if(!form.prenom||!form.nom||!form.email) return;
    if(modal?.mode==="edit") setAdmins(admins.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else setAdmins([...admins,{id:Date.now().toString(),...form,statut:"active",cree:new Date().toLocaleDateString(),connexion:"jamais"}]);
    setModal(null);
  };
  const filtered = admins.filter(a=>!search||`${a.prenom||""} ${a.nom||""} ${a.email||""}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Administrateurs</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez les accès à l'interface admin</p></div>
        <button style={s.btn(C.accent)} onClick={()=>{setForm({prenom:"",nom:"",email:"",role:"moderateur"});setModal({mode:"add"});}}>+ Nouvel admin</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un administrateur..."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map(admin=>(
          <div key={admin.id} style={{...s.card,opacity:admin.statut==="suspended"?0.6:1}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
              <Avatar nom={`${admin.prenom} ${admin.nom}`} size={44}/>
              {roleBadge(admin.role)}
            </div>
            <p style={{margin:"0 0 2px",fontSize:15,fontWeight:700,color:C.text}}>{admin.prenom} {admin.nom}</p>
            <p style={{margin:"0 0 10px",fontSize:12,color:C.muted}}>{admin.email}</p>
            <div style={{fontSize:11,color:C.muted,marginBottom:12}}>
              <div>Créé le {admin.cree}</div>
              <div>Dernière connexion : {admin.connexion}</div>
            </div>
            {statutBadge(admin.statut)}
            <div style={{display:"flex",gap:6,marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({prenom:admin.prenom,nom:admin.nom,email:admin.email,role:admin.role});setModal({mode:"edit",item:admin});}}>✏️</button>
              {admin.role!=="super_admin"&&<>
                <button style={s.btnOutline(admin.statut==="active"?C.yellow:C.green)} onClick={()=>setAdmins(admins.map(a=>a.id===admin.id?{...a,statut:a.statut==="active"?"suspended":"active"}:a))}>{admin.statut==="active"?"⏸":"▶"}</button>
                <button style={s.btnOutline(C.red)} onClick={()=>setAdmins(admins.filter(a=>a.id!==admin.id))}>🗑️</button>
              </>}
            </div>
          </div>
        ))}
      </div>
      {modal&&<Modal title={modal.mode==="edit"?"Modifier l'administrateur":"Nouvel administrateur"} onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Prénom"><input style={s.input} value={form.prenom||""} onChange={e=>setForm({...form,prenom:e.target.value})}/></AdminField>
          <AdminField label="Nom"><input style={s.input} value={form.nom||""} onChange={e=>setForm({...form,nom:e.target.value})}/></AdminField>
        </div>
        <AdminField label="Email"><input style={s.input} type="email" value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})}/></AdminField>
        <AdminField label="Rôle"><select style={s.input} value={form.role||"moderateur"} onChange={e=>setForm({...form,role:e.target.value})}><option value="moderateur">👁️ Modérateur</option><option value="admin">🛡️ Admin</option><option value="super_admin">👑 Super Admin</option></select></AdminField>
        <div style={{background:"rgba(124,58,237,0.08)",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:C.muted}}>
          {form.role==="super_admin"&&"• Accès complet + gestion des administrateurs"}
          {form.role==="admin"&&"• Gestion du contenu, des utilisateurs et des signalements"}
          {form.role==="moderateur"&&"• Modération des signalements uniquement"}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
          <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
          <button style={s.btn(C.accent)} onClick={save}>{modal.mode==="edit"?"Modifier":"Créer"}</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function Contributions({items,updateContrib}){
  const pending=items.filter(c=>c._statut==="pending").sort((a,b)=>new Date(b._createdAt)-new Date(a._createdAt));
  const signales=items.filter(c=>c._signalements>0&&c._statut!=="rejected").sort((a,b)=>b._signalements-a._signalements);
  const approved=items.filter(c=>c._statut==="published");
  const typeIcon={activite:"🎨",sortie:"🗺️",evenement:"📅"};
  const typeLabel={activite:"Activite",sortie:"Sortie",evenement:"Evenement"};
  const Row=({c,showActions=true})=>(
    <div style={{background:c._signalements>0?"rgba(239,68,68,0.06)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"13px 16px",border:`1px solid ${c._signalements>0?"rgba(239,68,68,0.25)":C.border}`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        <div style={{width:38,height:38,borderRadius:10,background:c.photo?"transparent":"rgba(124,58,237,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,overflow:"hidden"}}>
          {c.photo?<img src={c.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:(typeIcon[c._type]||"📝")}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",gap:6,marginBottom:4,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,background:"rgba(124,58,237,0.15)",color:"#a78bfa",padding:"1px 8px",borderRadius:8,fontWeight:600}}>{typeLabel[c._type]}</span>
            {c._signalements>0&&<span style={{fontSize:11,background:"rgba(239,68,68,0.15)",color:"#fca5a5",padding:"1px 8px",borderRadius:8,fontWeight:600}}>🚩 {c._signalements} signalement{c._signalements>1?"s":""}</span>}
            <span style={{fontSize:10,color:C.muted,marginLeft:"auto"}}>{c._auteur||"Anonyme"} · {c._createdAt?(()=>{const d=new Date(c._createdAt);return isNaN(d.getTime())?"":d.toLocaleDateString("fr-FR");})():""}</span>
          </div>
          <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:C.text}}>{c.nom||c.titre||"Sans titre"}</p>
          {c._raisonSignalement&&<p style={{margin:"0 0 6px",fontSize:11,color:"#fca5a5"}}>⚠️ Raison : {c._raisonSignalement}</p>}
          <p style={{margin:0,fontSize:11,color:C.muted}}>{c._type==="activite"?c.categorie+" · "+c.age:c._type==="sortie"?c.dept+" · "+c.prix:c.ville}</p>
        </div>
      </div>
      {showActions&&c._statut==="pending"&&(
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <button onClick={()=>updateContrib(c.id,{_statut:"published"})} style={{flex:1,padding:"8px 0",borderRadius:20,background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",color:"#6ee7b7",fontWeight:700,fontSize:12,cursor:"pointer"}}>✅ Valider</button>
          <button onClick={()=>updateContrib(c.id,{_statut:"rejected"})} style={{flex:1,padding:"8px 0",borderRadius:20,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",color:"#fca5a5",fontWeight:700,fontSize:12,cursor:"pointer"}}>❌ Rejeter</button>
        </div>
      )}
      {showActions&&c._statut==="published"&&<p style={{margin:"8px 0 0",fontSize:11,color:"#6ee7b7",fontWeight:600}}>✅ Validee et visible dans la bibliotheque</p>}
      {showActions&&c._statut==="rejected"&&<p style={{margin:"8px 0 0",fontSize:11,color:"#fca5a5",fontWeight:600}}>❌ Rejetee — non visible</p>}
    </div>
  );
  return(
    <div>
      <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:"0 0 4px"}}>Contributions</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 20px"}}>Activites, sorties et evenements soumis par la communaute</p>
      {signales.length>0&&(
        <div style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:13,fontWeight:800,color:"#fca5a5"}}>🚩 Signalements urgents</span>
            <span style={{background:"rgba(239,68,68,0.15)",color:"#fca5a5",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:600}}>{signales.length}</span>
          </div>
          {signales.map(c=><Row key={c.id} c={c}/>)}
        </div>
      )}
      <div style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:800,color:C.text}}>📥 En attente de validation</span>
          <span style={{background:"rgba(124,58,237,0.15)",color:"#a78bfa",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:600}}>{pending.length}</span>
        </div>
        {pending.length===0?<p style={{fontSize:13,color:C.muted,padding:"20px 0",textAlign:"center"}}>Aucune contribution en attente</p>:pending.map(c=><Row key={c.id} c={c}/>)}
      </div>
      {approved.length>0&&(
        <div>
          <p style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:10}}>✅ Validees ({approved.length})</p>
          {approved.map(c=><Row key={c.id} c={c}/>)}
        </div>
      )}
    </div>
  );
}

const PAGES_FN = {dashboard:(props)=><Dashboard {...props}/>,sos:(props)=><AdminSOS {...props}/>,activites:(props)=><Activites {...props}/>,sorties:(props)=><Sorties {...props}/>,evenements:(props)=><Evenements {...props}/>,saisonnier:(props)=><Saisonnier {...props}/>,categories:(props)=><Categories {...props}/>,utilisateurs:()=><Utilisateurs/>,abonnements:()=><Abonnements/>,signalements:(props)=><Signalements {...props}/>,communication:(props)=><Communication key="comm" {...props}/>,admins:()=><Admins/>};

function AdminSOS({sosLib=[],setSosLib,sosModeActif=true,setSosModeActif}){
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({titre:"",desc:"",duree:"",age:"",materiel:"",statut:"published"});
  const save=()=>{
    if(!form.titre)return;
    const item={...form,id:"sos"+Date.now(),materiel:form.materiel?form.materiel.split(",").map(m=>m.trim()):[]};
    if(modal?.mode==="edit") setSosLib(prev=>prev.map(a=>a.id===modal.item.id?{...a,...item}:a));
    else setSosLib(prev=>[...prev,item]);
    setModal(null);
  };
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>🆘 Mode SOS</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Bibliothèque d'activités d'urgence — réservées aux utilisateurs Premium</p>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:`1px solid ${C.border}`}}>
            <span style={{fontSize:12,color:C.muted}}>Mode SOS</span>
            <Tog on={sosModeActif} onChange={()=>setSosModeActif&&setSosModeActif(!sosModeActif)}/>
            <span style={{fontSize:12,color:sosModeActif?C.green:C.red,fontWeight:600}}>{sosModeActif?"Actif":"Inactif"}</span>
          </div>
          <button style={s.btn("#ef4444")} onClick={()=>{setForm({titre:"",desc:"",duree:"",age:"",materiel:"",statut:"published"});setModal({mode:"add"});}}>+ Ajouter une activité</button>
        </div>
      </div>
      {!sosModeActif&&(
        <div style={{background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:12,padding:"10px 16px",marginBottom:16}}>
          <p style={{margin:0,fontSize:12,color:"#fca5a5",fontWeight:600}}>⚠️ Le mode SOS est actuellement désactivé : le bouton "🆘 Mode SOS" est masqué pour tous les utilisateurs, même Premium.</p>
        </div>
      )}

      {/* Stats */}
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        {[{label:"Total activités",val:sosLib.length,emoji:"📋",color:C.blue},{label:"Publiées",val:sosLib.filter(a=>a.statut==="published").length,emoji:"✅",color:C.green},{label:"Brouillons",val:sosLib.filter(a=>a.statut==="draft").length,emoji:"📝",color:C.muted}].map((st,i)=>(
          <div key={i} style={{...s.card,flex:1,padding:"14px 16px"}}>
            <div style={{fontSize:20,marginBottom:4}}>{st.emoji}</div>
            <div style={{fontSize:22,fontWeight:800,color:st.color}}>{st.val}</div>
            <div style={{fontSize:12,color:C.muted}}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div style={{background:"rgba(239,68,68,0.08)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start",border:"1px solid rgba(239,68,68,0.2)"}}>
        <span style={{fontSize:20,flexShrink:0}}>🆘</span>
        <div>
          <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:"#fca5a5"}}>Mode SOS — Activités d'urgence Premium</p>
          <p style={{fontSize:12,color:C.muted}}>Ces activités s'affichent dans le planning de l'utilisateur quand il appuie sur le bouton SOS. Elles doivent être rapides, simples et nécessiter peu de matériel.</p>
        </div>
      </div>

      {/* Liste */}
      <div style={{...s.card,padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0d1117"}}>{["Activité","Durée","Âge","Statut","Actions"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{sosLib.map((a,i)=>(
            <tr key={a.id} style={{borderTop:`1px solid ${C.border}`,opacity:a.statut==="draft"?0.6:1}}>
              <td style={{padding:"12px 16px"}}>
                <p style={{margin:"0 0 3px",fontSize:13,fontWeight:600,color:C.text}}>{a.titre}</p>
                <p style={{margin:0,fontSize:11,color:C.muted,maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.desc}</p>
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge("rgba(59,130,246,0.15)","#60a5fa")}>{a.duree||"—"}</span></td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.age||"Tous âges"}</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button style={s.btnOutline("#ef4444")} onClick={()=>{setForm({...a,materiel:Array.isArray(a.materiel)?a.materiel.join(", "):a.materiel||""});setModal({mode:"edit",item:a});}}>✏️</button>
                  <button style={s.btnOutline(a.statut==="published"?C.yellow:C.green)} onClick={()=>setSosLib(prev=>prev.map(x=>x.id===a.id?{...x,statut:x.statut==="published"?"draft":"published"}:x))}>
                    {a.statut==="published"?"📝":"✅"}
                  </button>
                  <button style={s.btnOutline(C.red)} onClick={()=>setSosLib(prev=>prev.filter(x=>x.id!==a.id))}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
        {sosLib.length===0&&<div style={{padding:"40px 0",textAlign:"center",color:C.muted}}><p style={{fontSize:32,margin:"0 0 8px"}}>🆘</p><p>Aucune activité SOS</p></div>}
      </div>

      {/* Modal */}
      {modal&&(()=>{
        const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
        const ChipBtn=({active,onClick,children,color="#6b7280"})=>(
          <button onClick={onClick} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${active?color:"rgba(255,255,255,0.1)"}`,background:active?color+"18":"transparent",color:active?color:C.muted,fontSize:12,cursor:"pointer",fontWeight:active?700:400,transition:"all 0.15s"}}>{children}</button>
        );
        return(
        <Modal title={modal.mode==="edit"?"Modifier l'activité SOS":"Nouvelle activité SOS"} onClose={()=>setModal(null)} width={580}>
          <div style={{background:"rgba(239,68,68,0.06)",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:8}}><span>💡</span><p style={{margin:0,fontSize:12,color:"#fca5a5"}}>Les activités SOS doivent être rapides à mettre en place, idéalement sans préparation.</p></div>

          <AdminField label="Titre *"><input style={s.input} value={form.titre} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Respiration des bulles"/></AdminField>
          <AdminField label="Description *"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Explication rapide de l'activité..."/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Durée"><select style={s.input} value={form.duree} onChange={e=>setForm({...form,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Âge conseillé"><input style={s.input} value={form.age||""} onChange={e=>setForm({...form,age:e.target.value})} placeholder="2-12 ans"/></AdminField>
          </div>
          <AdminField label="Matériel (séparé par virgules)"><input style={s.input} value={form.materiel} onChange={e=>setForm({...form,materiel:e.target.value})} placeholder="feuilles, crayons, pâte à modeler"/></AdminField>

          {/* ─── FILTRE 1 — PROFIL ─── */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
            <p style={{margin:"0 0 2px",fontSize:12,fontWeight:800,color:"#c4b5fd",textTransform:"uppercase",letterSpacing:"0.5px"}}>🧩 Filtre 1 — Profil de l'enfant</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Plusieurs profils possibles</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {[{v:"profil_ordinaire",l:"😊 Profil ordinaire",c:"#10b981"},{v:"profil_tsa",l:"🧩 TSA",c:"#a78bfa"},{v:"profil_tdah",l:"⚡ TDAH",c:"#f472b6"},{v:"profil_dys",l:"📖 DYS",c:"#67e8f9"},{v:"profil_tsa_tdah",l:"🌀 TSA + TDAH",c:"#c084fc"},{v:"profil_bas_age",l:"👶 Bas âge (- 4 ans)",c:"#fbbf24"}].map(p=>(
                <ChipBtn key={p.v} active={!!form[p.v]} onClick={()=>tf(p.v)} color={p.c}>{p.l}</ChipBtn>
              ))}
            </div>
          </div>

          {/* ─── FILTRE 2 — TYPE DE CRISE ─── */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
            <p style={{margin:"0 0 2px",fontSize:12,fontWeight:800,color:"#fca5a5",textTransform:"uppercase",letterSpacing:"0.5px"}}>😰 Filtre 2 — Type de crise</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
              {[{v:"crise_sensorielle",l:"🌊 Surcharge sensorielle",sub:"Trop de bruit, lumière, stimulations",c:"#7c3aed"},{v:"crise_emotionnelle",l:"🌋 Crise émotionnelle",sub:"Colère, pleurs, frustration",c:"#ef4444"},{v:"crise_agitation",l:"🌪️ Agitation / hyperactivité",sub:"Impossible de rester en place",c:"#f97316"},{v:"crise_concentration",l:"🌫️ Difficulté concentration",sub:"Dispersé, n'arrive pas à se poser",c:"#6b7280"}].map(c=>(
                <button key={c.v} onClick={()=>tf(c.v)} style={{padding:"10px 12px",borderRadius:12,border:`2px solid ${form[c.v]?c.c:"rgba(255,255,255,0.08)"}`,background:form[c.v]?c.c+"18":"rgba(255,255,255,0.02)",color:C.text,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                  <p style={{margin:"0 0 2px",fontSize:12,fontWeight:form[c.v]?700:500,color:form[c.v]?c.c:C.text}}>{c.l}</p>
                  <p style={{margin:0,fontSize:10,color:C.muted}}>{c.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ─── FILTRE 3 — LIEU ─── */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
            <p style={{margin:"0 0 2px",fontSize:12,fontWeight:800,color:"#6ee7b7",textTransform:"uppercase",letterSpacing:"0.5px"}}>📍 Filtre 3 — Lieu</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Le lieu filtre les activités faisables</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {[{v:"lieu_maison",l:"🏠 Maison",c:"#10b981"},{v:"lieu_voiture",l:"🚗 Voiture",c:"#3b82f6"},{v:"lieu_ecole",l:"🏫 École / extérieur",c:"#f59e0b"},{v:"lieu_public",l:"🛒 Lieu public",c:"#8b5cf6"},{v:"lieu_dehors",l:"🌳 Dehors",c:"#22c55e"}].map(p=>(
                <ChipBtn key={p.v} active={!!form[p.v]} onClick={()=>tf(p.v)} color={p.c}>{p.l}</ChipBtn>
              ))}
            </div>
          </div>

          <AdminField label="Statut"><select style={s.input} value={form.statut} onChange={e=>setForm({...form,statut:e.target.value})}><option value="published">Publié</option><option value="draft">Brouillon</option></select></AdminField>
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4}}>
            <button style={s.btnOutline(C.muted)} onClick={()=>setModal(null)}>Annuler</button>
            <button style={s.btn("#ef4444")} onClick={save}>{modal.mode==="edit"?"Modifier":"Ajouter"}</button>
          </div>
        </Modal>
        );
      })()}
    </div>
  );
}

function PageAdmin({onLogout,pendingContribs=[],updateContrib,adminActivites=[],setAdminActivites,adminSorties=[],setAdminSorties,adminEvenements=[],setAdminEvenements,adminReports=[],setAdminReports,addDeletedTitle,adminCustomEvents=[],setAdminCustomEvents,sosLib=[],setSosLib,sosModeActif=true,setSosModeActif,ideesMomentConfig=[],setIdeesMomentConfig,evenementsSaisonniers=[],setEvenementsSaisonniers,customCatActivites=[],setCustomCatActivites,customCatSorties=[],setCustomCatSorties,customCatEvenements=[],setCustomCatEvenements}) {
  const [page,setPage] = useState("dashboard");
  const [collapsed,setCollapsed] = useState(false);
  const pendingReports = [...adminReports,...MOCK_REPORTS].filter(r=>r.statut==="pending").length;
  return (
    <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',system-ui,sans-serif",color:C.text}}>
      {/* Sidebar */}
      <aside style={{width:collapsed?64:220,background:C.sidebar,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",transition:"width 0.2s",flexShrink:0}}>
        <div style={{padding:"18px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10,overflow:"hidden"}}>
          <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#7c3aed,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>P</div>
          {!collapsed&&<div><p style={{margin:0,fontSize:13,fontWeight:800,color:C.text}}>Parent'Hèse</p><p style={{margin:0,fontSize:10,color:C.muted}}>Admin</p></div>}
        </div>
        <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
          {MENU.map(item=>(
            <button key={item.k} onClick={()=>setPage(item.k)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:10,border:"none",background:page===item.k?"rgba(124,58,237,0.15)":"transparent",color:page===item.k?"#a78bfa":C.muted,cursor:"pointer",marginBottom:2,textAlign:"left",position:"relative",overflow:"hidden"}}>
              <span style={{fontSize:17,flexShrink:0}}>{item.emoji}</span>
              {!collapsed&&<span style={{fontSize:13,fontWeight:page===item.k?600:400,whiteSpace:"nowrap"}}>{item.label}</span>}
              {item.k==="signalements"&&pendingReports>0&&<span style={{marginLeft:"auto",background:C.red,color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{pendingReports}</span>}
              {item.k==="contributions"&&pendingContribs.filter(c=>c._statut==="pending").length>0&&<span style={{marginLeft:"auto",background:C.accent,color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{pendingContribs.filter(c=>c._statut==="pending").length}</span>}
            </button>
          ))}
        </nav>
        <button onClick={()=>setCollapsed(!collapsed)} style={{padding:"14px",borderTop:`1px solid ${C.border}`,background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:14}}>
          {collapsed?"→":"←"}
        </button>
      </aside>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <header style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,color:C.muted}}>
            {MENU.find(m=>m.k===page)?.emoji} <span style={{color:C.text,fontWeight:500}}>{MENU.find(m=>m.k===page)?.label}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(124,58,237,0.12)",border:"1px solid rgba(124,58,237,0.3)",borderRadius:8,padding:"7px 14px",color:"#a78bfa",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.25)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(124,58,237,0.12)";}}>
              <span style={{fontSize:14}}>📱</span> Mode utilisateur
            </button>
            <div style={{width:1,height:20,background:C.border}}/>
            <div style={{fontSize:11,color:C.muted}}>👑 Super Admin</div>
            <Avatar nom="Alexandre Fontaine" size={30}/>
          </div>
        </header>
        <main style={{flex:1,overflowY:"auto",padding:24}}>
          {page==="contributions"?<Contributions items={pendingContribs} updateContrib={updateContrib}/>:PAGES_FN[page]?PAGES_FN[page]({sharedActivites:adminActivites,setSharedActivites:setAdminActivites,sharedSorties:adminSorties,setSharedSorties:setAdminSorties,sharedEvenements:adminEvenements,setSharedEvenements:setAdminEvenements,userReports:adminReports,setUserReports:setAdminReports,onDeleteTitle:addDeletedTitle,sharedCustomEvents:adminCustomEvents,setSharedCustomEvents:setAdminCustomEvents,pendingContribs,dashUserReports:adminReports,sosLib,setSosLib,sosModeActif,setSosModeActif,ideesMomentConfig,setIdeesMomentConfig,evenementsSaisonniers,setEvenementsSaisonniers,customCatActivites,setCustomCatActivites,customCatSorties,setCustomCatSorties,customCatEvenements,setCustomCatEvenements}):null}
        </main>
      </div>
    </div>
  );
}


// ============================================================
// AUTHENTIFICATION — Compte local protégé par mot de passe
// (pas de serveur : les identifiants restent stockés sur cet appareil)
// ============================================================
function PageAuth({ onAuthSuccess, onCancel, onAdminSuccess }) {
  const [hasAccount, setHasAccount] = useState(null); // null = chargement
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [failedAttempts,setFailedAttempts]=useState(0);
  const [lockedUntil,setLockedUntil]=useState(null); // timestamp
  const [lockCountdown,setLockCountdown]=useState(0);
  const [adminStep,setAdminStep]=useState(false); // 2FA admin : email+mdp validés, attend le code admin
  const [adminCode2,setAdminCode2]=useState(""); // second facteur admin
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showResetSent, setShowResetSent] = useState(false);
  const [showResetCompte, setShowResetCompte] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get('auth_account');
        if (res && res.value) { setHasAccount(true); setMode('login'); }
        else { setHasAccount(false); setMode('signup'); }
      } catch (e) {
        setHasAccount(false);
        setMode('signup');
      }
    })();
  }, []);

  // Compte à rebours du verrou
  useEffect(()=>{
    if(!lockedUntil)return;
    const interval=setInterval(()=>{
      const remaining=Math.ceil((lockedUntil-Date.now())/1000);
      if(remaining<=0){setLockedUntil(null);setLockCountdown(0);setFailedAttempts(0);clearInterval(interval);}
      else setLockCountdown(remaining);
    },1000);
    return()=>clearInterval(interval);
  },[lockedUntil]);

  const handleSignup = async () => {
    setError('');
    if (hasAccount) { setError('Un compte existe déjà. Connecte-toi plutôt.'); return; }
    if (!nom.trim() || !email.trim() || !password.trim()) { setError('Merci de remplir tous les champs.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("L'adresse email n'est pas valide."); return; }
    if (password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères.'); return; }
    setLoading(true);
    const account = { nom: nom.trim(), email: email.trim().toLowerCase(), password, premium: false };
    // Essaie de sauvegarder — si le storage est indisponible, on continue quand même en mémoire
    try { await window.storage.set('auth_account', JSON.stringify(account)); } catch(e) {}
    try { await window.storage.set('auth_session', JSON.stringify({ nom: account.nom, email: account.email, premium: false })); } catch(e) {}
    setLoading(false);
    onAuthSuccess({ nom: account.nom, email: account.email, premium: false });
  };

  const handleLogin = async () => {
    setError('');
    if(lockedUntil&&Date.now()<lockedUntil){setError(`Trop de tentatives. Réessayez dans ${lockCountdown}s.`);return;}
    if (!email.trim() || !password.trim()) { setError('Merci de remplir tous les champs.'); return; }
    // Vérification admin
    const ADMIN_PW_H="d43d9b50d43d9b50d43d9b50d43d9b50d43d9b50d43d9b50d43d9b50d43d9b50";
    if (simpleHash(email.trim().toLowerCase())===simpleHash(ADMIN_EMAIL) && simpleHash(password)===ADMIN_PW_H) {
      setAdminStep(true); setAdminCode2(""); return;
    }
    setLoading(true);
    try {
      const res = await window.storage.get('auth_account',false);
      const account = res && res.value ? JSON.parse(res.value) : null;
      if (!account || account.email !== email.trim().toLowerCase() || account.password !== password) {
        const newAttempts=failedAttempts+1;
        setFailedAttempts(newAttempts);
        if(newAttempts>=3){const d=newAttempts>=5?120:30;setLockedUntil(Date.now()+d*1000);setError(`Identifiants incorrects. Compte verrouillé ${d}s.`);}
        else setError(`Identifiants incorrects. ${3-newAttempts} tentative${3-newAttempts>1?"s":""} restante${3-newAttempts>1?"s":""}.`);
        setLoading(false); return;
      }
      setFailedAttempts(0);
      try{ await window.storage.set('auth_session', JSON.stringify({ nom: account.nom, email: account.email, premium: !!account.premium })); }catch(e){}
      setLoading(false);
      onAuthSuccess({ nom: account.nom, email: account.email, premium: !!account.premium });
    } catch (e) {
      // Storage indisponible — propose la connexion en mode mémoire
      setError("Le stockage est temporairement indisponible. Recharge la page (F5) et réessaie dans quelques secondes.");
      setLoading(false);
    }
  };

  // Validation du 2ème facteur admin
  const handleAdminCode2 = () => {
    const SECRET_2FA="ADMIN2024"; // Peut être changé indépendamment du mot de passe
    if(adminCode2.trim()===SECRET_2FA){
      setAdminStep(false);
      setAdminCode2("");
      setFailedAttempts(0);
      onAdminSuccess && onAdminSuccess();
    }else{
      const newAttempts=failedAttempts+1;
      setFailedAttempts(newAttempts);
      if(newAttempts>=3){
        setAdminStep(false);
        setLockedUntil(Date.now()+60*1000);
        setError("Code incorrect. Accès verrouillé 60s.");
      }else{
        setError(`Code admin incorrect. ${3-newAttempts} essai${3-newAttempts>1?"s":""} restant${3-newAttempts>1?"s":""}.`);
      }
    }
  };

  const handleReset = () => {
    setShowReset(false);
    setShowResetSent(true);
    setTimeout(() => setShowResetSent(false), 4000);
  };

  const handleResetCompte = async () => {
    try {
      await window.storage.delete('auth_account');
      await window.storage.delete('auth_session');
    } catch (e) { /* rien à supprimer */ }
    finally {
      setShowResetCompte(false);
      setHasAccount(false);
      setMode('signup');
      setEmail(''); setPassword(''); setNom(''); setError('');
      setLoading(false);
    }
  };

  if (hasAccount === null) {
    return (
      <div style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: TM }}>Chargement...</p>
      </div>
    );
  }

  // Écran de 2ème facteur admin
  if(adminStep) return(
    <div style={{maxWidth:390,margin:"0 auto",minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",background:WH,borderRadius:24,padding:28,border:BD,boxShadow:"0 8px 32px rgba(108,92,231,0.15)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:10}}>🛡️</div>
          <p style={{margin:"0 0 6px",fontSize:18,fontWeight:800,color:TX}}>Vérification admin</p>
          <p style={{margin:0,fontSize:13,color:TM}}>Entrez le code d'accès administrateur pour continuer</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Code d'accès admin</label>
          <input type="password" value={adminCode2} onChange={e=>setAdminCode2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdminCode2()} placeholder="••••••••" autoFocus style={{...FS,letterSpacing:4,textAlign:"center",fontSize:18}} autoComplete="off"/>
        </div>
        {error&&<p style={{margin:"0 0 12px",fontSize:12,color:RD,fontWeight:600,textAlign:"center"}}>{error}</p>}
        {lockedUntil&&<p style={{margin:"0 0 12px",fontSize:12,color:OR,fontWeight:600,textAlign:"center"}}>🔒 Verrouillé encore {lockCountdown}s</p>}
        <button onClick={handleAdminCode2} disabled={!!lockedUntil||!adminCode2.trim()} style={{width:"100%",padding:14,borderRadius:28,background:lockedUntil?TM:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:lockedUntil?"default":"pointer",marginBottom:10}}>
          Valider
        </button>
        <button onClick={()=>{setAdminStep(false);setAdminCode2("");setError("");}} style={{width:"100%",padding:10,borderRadius:28,background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer"}}>
          ← Retour
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 24px", fontFamily: "system-ui,-apple-system,sans-serif", boxSizing: "border-box", position: "relative" }}>
      {onCancel && (
        <button onClick={onCancel} style={{ position: "absolute", top: 16, right: 16, width: 34, height: 34, borderRadius: "50%", background: WH, border: BD, fontSize: 16, color: TM, cursor: "pointer" }}>✕</button>
      )}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg," + V + ",#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 14px", boxShadow: "0 4px 16px rgba(108,92,231,0.3)" }}>🧩</div>
        <h1 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 800, color: TX }}>Parent'Hèse</h1>
        <p style={{ margin: 0, fontSize: 13, color: TM }}>{mode === 'signup' ? "Crée ton compte pour commencer" : "Connecte-toi pour continuer"}</p>
      </div>

      <div style={{ background: WH, borderRadius: 20, padding: 20, border: BD }}>
        {mode === 'signup' && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: TM, display: "block", marginBottom: 6 }}>Prénom et nom</label>
            <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex : Marie Dupont" style={FS} />
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: TM, display: "block", marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="toi@email.com" style={FS} />
        </div>
        <div style={{ marginBottom: 6 }}>
          <label style={{ fontSize: 12, color: TM, display: "block", marginBottom: 6 }}>Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && (mode === 'signup' ? handleSignup() : handleLogin())} placeholder="••••••" style={FS} />
        </div>

        {error && <p style={{ margin: "10px 0 0", fontSize: 12, color: RD, fontWeight: 600 }}>{error}</p>}
        {lockedUntil&&!adminStep&&<p style={{margin:"8px 0 0",fontSize:12,color:OR,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>🔒 Accès verrouillé — encore {lockCountdown}s</p>}

        <button onClick={mode === 'signup' ? handleSignup : handleLogin} disabled={loading||!!lockedUntil} style={{ width: "100%", marginTop: 16, padding: 14, borderRadius: 28, background: lockedUntil?TM:V, border: "none", color: WH, fontWeight: 700, fontSize: 14, cursor: (loading||lockedUntil) ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Patiente..." : mode === 'signup' ? "Créer mon compte" : "Se connecter"}
        </button>

        {mode === 'login' && (
          <>
            <button onClick={() => setShowReset(true)} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: TM, fontSize: 12, cursor: "pointer" }}>Mot de passe oublié ?</button>
            <button onClick={() => setShowResetCompte(true)} style={{ width: "100%", marginTop: 2, background: "none", border: "none", color: "#C7C2DA", fontSize: 11, cursor: "pointer" }}>Plus d'options</button>
          </>
        )}

        {(mode === 'signup' || !hasAccount) && (
          <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={{ width: "100%", marginTop: mode === 'login' ? 4 : 10, background: "none", border: "none", color: V, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {mode === 'signup' ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un compte"}
          </button>
        )}

        {/* Bouton démo */}
        {onCancel&&(
          <div style={{marginTop:20,borderTop:"1px solid rgba(108,92,231,0.1)",paddingTop:16,textAlign:"center"}}>
            <p style={{margin:"0 0 10px",fontSize:11,color:TM}}>Vous voulez juste explorer l'app ?</p>
            <button onClick={onCancel} style={{width:"100%",padding:12,borderRadius:28,background:"linear-gradient(135deg,#F59E0B,#F97316)",border:"none",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>
              🚀 Accéder à la démo gratuite
            </button>
            <p style={{margin:"8px 0 0",fontSize:10,color:TM}}>Toutes les fonctionnalités · Sans compte · Sans engagement</p>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: TM, marginTop: 16, lineHeight: 1.5 }}>🔒 Tes informations restent privées : elles sont stockées uniquement sur cet appareil, sans serveur externe.</p>

      {showReset && (
        <div onClick={() => setShowReset(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: WH, borderRadius: 20, padding: 24, maxWidth: 320, width: "100%" }}>
            <div style={{ fontSize: 36, textAlign: "center", marginBottom: 10 }}>📧</div>
            <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: TX, textAlign: "center" }}>Mot de passe oublié ?</p>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: TM, textAlign: "center", lineHeight: 1.5 }}>Un mail de réinitialisation va être envoyé à {email ? <strong>{email}</strong> : "ton adresse email"}.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowReset(false)} style={{ flex: 1, padding: 12, borderRadius: 28, background: BG, border: BD, color: TM, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleReset} style={{ flex: 1, padding: 12, borderRadius: 28, background: V, border: "none", color: WH, fontWeight: 700, cursor: "pointer" }}>Envoyer</button>
            </div>
          </div>
        </div>
      )}
      {showResetSent && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", background: "#065F46", color: WH, borderRadius: 20, padding: "10px 20px", fontSize: 13, fontWeight: 600, zIndex: 900, whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
          📧 Email de réinitialisation envoyé !
        </div>
      )}
      {showResetCompte && (
        <div onClick={() => setShowResetCompte(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 850, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: WH, borderRadius: 20, padding: 24, maxWidth: 320, width: "100%" }}>
            <div style={{ fontSize: 36, textAlign: "center", marginBottom: 10 }}>⚠️</div>
            <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: TX, textAlign: "center" }}>Plus du tout accès à ton compte ?</p>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: TM, textAlign: "center", lineHeight: 1.5 }}>En dernier recours, tu peux réinitialiser l'application : le compte actuel sera supprimé et tu pourras en créer un nouveau. <strong>Cette action est irréversible.</strong></p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowResetCompte(false)} style={{ flex: 1, padding: 12, borderRadius: 28, background: BG, border: BD, color: TM, fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={handleResetCompte} style={{ flex: 1, padding: 12, borderRadius: 28, background: "#EF4444", border: "none", color: WH, fontWeight: 700, cursor: "pointer" }}>Réinitialiser</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [authChecking,setAuthChecking]=useState(true);
  const [currentUser,setCurrentUser]=useState(null);
  const [showAuthGate,setShowAuthGate]=useState(false);
  const [showPremiumPage,setShowPremiumPage]=useState(false);
  const [globalToast,setGlobalToast]=useState(null);
  useEffect(()=>{
    (async()=>{
      try{
        const res=await window.storage.get("auth_session",false);
        if(res&&res.value)setCurrentUser(JSON.parse(res.value));
      }catch(e){
        // Pas de session active
      }finally{
        setAuthChecking(false);
      }
    })();
  },[]);
  const handleLogout=async()=>{
    try{ await window.storage.delete("auth_session"); }catch(e){ /* rien à supprimer */ }
    setCurrentUser(null);
    setPage("accueil");
  };
  const handleDeleteAccount=async()=>{
    try{
      await Promise.all([
        window.storage.delete("auth_account"),
        window.storage.delete("auth_session"),
        window.storage.delete("favoris"),
        window.storage.delete("enfants"),
        window.storage.delete("planning_hebdo"),
        window.storage.delete("popup_shown"),
      ]);
    }catch(e){ /* certaines cles peuvent deja etre absentes */ }
    setCurrentUser(null);
    setFavoris([]);
    setEnfants([]);
    setPopupShown(new Set());
    setPage("accueil");
  };
  const [demoMode,setDemoMode]=useState(false);
  const isPremiumUser=!!currentUser?.premium||demoMode;

  const activerDemo=()=>{
    setDemoMode(true);
    setGlobalToast("🚀 Mode démo activé — accès Premium complet !");
    setTimeout(()=>setGlobalToast(null),3000);
  };

  const setPremiumDemo=async(value)=>{
    if(!currentUser){setDemoMode(value);return;}
    const updatedUser={...currentUser,premium:value};
    setCurrentUser(updatedUser);
    try{
      await window.storage.set("auth_session",JSON.stringify(updatedUser));
      const res=await window.storage.get("auth_account",false);
      if(res&&res.value){
        const account=JSON.parse(res.value);
        await window.storage.set("auth_account",JSON.stringify({...account,premium:value}));
      }
    }catch(e){
      // La mise a jour locale reste appliquee meme si la sauvegarde echoue
    }
  };
  const [page,setPage]=useState("accueil");
  const [favoris,setFavoris]=useState([]);
  const [enfants,setEnfants]=useState([
    {id:"1",prenom:"Lucas",age:7,emoji:"👦",profils:["TSA"],couleur:"#6C5CE7",niveauxSensoriels:{bruit:30,lumiere:60,foule:80,imprevu:20}},
    {id:"2",prenom:"Emma",age:5,emoji:"👧",profils:["TDAH"],couleur:"#10B981",niveauxSensoriels:{bruit:70,lumiere:40,foule:50,imprevu:60}},
  ]);
  const [enfantActif,setEnfantActif]=useState("1");
  const [showGestionEnfants,setShowGestionEnfants]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  const adminSessionRef=useRef(null);
  useEffect(()=>{
    if(!isAdmin){if(adminSessionRef.current)clearTimeout(adminSessionRef.current);return;}
    // Session admin expire après 30 minutes d'inactivité
    const resetTimer=()=>{
      if(adminSessionRef.current)clearTimeout(adminSessionRef.current);
      adminSessionRef.current=setTimeout(()=>{setIsAdmin(false);setGlobalToast("⏱️ Session admin expirée — reconnectez-vous.");setTimeout(()=>setGlobalToast(null),4000);},30*60*1000);
    };
    resetTimer();
    window.addEventListener("click",resetTimer);
    window.addEventListener("keydown",resetTimer);
    return()=>{window.removeEventListener("click",resetTimer);window.removeEventListener("keydown",resetTimer);if(adminSessionRef.current)clearTimeout(adminSessionRef.current);};
  },[isAdmin]);
  const [pendingContribs,setPendingContribs]=useState([]);
  const [adminActivites,setAdminActivites]=useState([]);
  const [adminSorties,setAdminSorties]=useState([]);
  const [adminEvenements,setAdminEvenements]=useState([]);
  useScheduler(setAdminActivites);
  useScheduler(setAdminSorties);
  useScheduler(setAdminEvenements);
  const [adminReports,setAdminReports]=useState([]);
  const [deletedTitles,setDeletedTitles]=useState(new Set());
  const [customEvents,setCustomEvents]=useState([]);
  const [ideesMomentConfig,setIdeesMomentConfig]=useState([
    {id:"activites",label:"Activités créatives",emoji:"🎨",gradient:"linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",actif:true},
    {id:"nature",label:"Sorties nature",emoji:"🌳",gradient:"linear-gradient(135deg,#6ee7b7 0%,#059669 100%)",actif:true},
    {id:"evenements",label:"Événements",emoji:"📅",gradient:"linear-gradient(135deg,#fde68a 0%,#f59e0b 100%)",actif:true},
  ]);
  const [sosLib,setSosLib]=useState([
    {id:"sos1",titre:"Dessin libre",desc:"Donne-lui une feuille et des crayons, laisse faire sans contrainte. Idéal pour exprimer ce qui ne peut pas se dire.",duree:"moins de 15 min",age:"2-12 ans",materiel:["feuilles","crayons"],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_tdah:true,profil_dys:true,profil_bas_age:true,crise_agitation:true,crise_concentration:true,lieu_maison:true,lieu_ecole:true},
    {id:"sos2",titre:"Pâte à modeler",desc:"Sortir la pâte à modeler — presser, rouler, taper. L'action sensorielle régule l'agitation et la surcharge.",duree:"15-30 min",age:"2-8 ans",materiel:["pate a modeler"],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_bas_age:true,crise_sensorielle:true,crise_agitation:true,lieu_maison:true},
    {id:"sos3",titre:"Puzzle ou construction",desc:"Un puzzle adapté à l'âge ou des Lego. Occupe les mains et canalise le mental.",duree:"30-60 min",age:"3-12 ans",materiel:["puzzle ou lego"],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_tdah:true,profil_dys:true,crise_concentration:true,crise_agitation:true,lieu_maison:true},
    {id:"sos4",titre:"Respiration des bulles",desc:"Souffler lentement comme si on faisait de grosses bulles. 5 souffles lents. Régule le système nerveux en 1 minute.",duree:"1-2 min",age:"3-12 ans",materiel:[],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_tdah:true,profil_dys:true,profil_bas_age:true,crise_sensorielle:true,crise_emotionnelle:true,crise_agitation:true,lieu_maison:true,lieu_voiture:true,lieu_ecole:true,lieu_public:true,lieu_dehors:true},
    {id:"sos5",titre:"Technique de la tortue",desc:"Se recroqueviller comme une tortue dans sa carapace, respirer 3 fois, puis ressortir calmement. Technique validée pour les crises émotionnelles TSA.",duree:"2-3 min",age:"3-10 ans",materiel:[],statut:"published",profil_tsa:true,profil_ordinaire:true,crise_emotionnelle:true,crise_sensorielle:true,lieu_maison:true,lieu_ecole:true,lieu_public:true,lieu_voiture:true,lieu_dehors:true},
    {id:"sos6",titre:"Sac sensoriel anti-stress",desc:"Proposer un objet à toucher, triturer ou serrer fort — balle anti-stress, couverture lestée, fidget. Détourne la surcharge sensorielle.",duree:"5-10 min",age:"2-12 ans",materiel:["balle anti-stress ou objet texturé"],statut:"published",profil_tsa:true,profil_tdah:true,crise_sensorielle:true,crise_agitation:true,lieu_maison:true,lieu_voiture:true,lieu_ecole:true,lieu_public:true},
    {id:"sos7",titre:"Saut sur trampoline ou coussin",desc:"Sauter 50 fois. L'input proprioceptif est le moyen le plus rapide de réguler une surcharge chez les enfants TDAH et TSA.",duree:"5-10 min",age:"2-12 ans",materiel:["trampoline ou grand coussin"],statut:"published",profil_tsa:true,profil_tdah:true,crise_agitation:true,crise_sensorielle:true,lieu_maison:true,lieu_dehors:true},
    {id:"sos8",titre:"Espace calme cocon",desc:"Créer un espace doux : tente, placard sous les draps, coins de coussins. Lumière tamisée. Laisser l'enfant s'y réfugier sans parler.",duree:"10-20 min",age:"2-12 ans",materiel:["couverture","coussins"],statut:"published",profil_tsa:true,profil_ordinaire:true,crise_sensorielle:true,crise_emotionnelle:true,lieu_maison:true},
    {id:"sos9",titre:"Comptage ou ABC d'une catégorie",desc:"Citer 10 animaux, 10 couleurs, 10 marques de voitures... Détourne le mental de la crise vers quelque chose de concret et structuré.",duree:"2-5 min",age:"4-12 ans",materiel:[],statut:"published",profil_tsa:true,profil_tdah:true,profil_dys:false,crise_emotionnelle:true,crise_agitation:true,lieu_maison:true,lieu_voiture:true,lieu_ecole:true,lieu_public:true,lieu_dehors:true},
    {id:"sos10",titre:"Marche rapide ou course",desc:"Sortir 5 minutes et marcher vite ou courir. L'activité physique est le meilleur régulateur pour le TDAH en crise d'agitation.",duree:"5-10 min",age:"4-12 ans",materiel:[],statut:"published",profil_tdah:true,profil_ordinaire:true,crise_agitation:true,crise_concentration:true,lieu_dehors:true,lieu_maison:true},
    {id:"sos11",titre:"Écouter sa musique favorite",desc:"Mettre les écouteurs et écouter LA chanson ou LA playlist préférée. Simple, rapide, efficace. Prévoir une playlist dédiée à l'avance.",duree:"5-10 min",age:"3-12 ans",materiel:["écouteurs","téléphone"],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_tdah:true,profil_dys:true,crise_emotionnelle:true,crise_sensorielle:true,lieu_maison:true,lieu_voiture:true,lieu_ecole:true,lieu_public:true},
    {id:"sos12",titre:"Timer visuel 5 minutes",desc:"Poser un timer visuel ou horloge analogique : 'dans 5 minutes on fait X'. Donne un cadre temporel concret qui réduit l'anxiété de l'imprévu.",duree:"5 min",age:"3-12 ans",materiel:["timer visuel ou minuteur"],statut:"published",profil_tsa:true,profil_tdah:true,crise_agitation:true,crise_concentration:true,lieu_maison:true,lieu_ecole:true},
    {id:"sos13",titre:"Squeeze imaginaire",desc:"Serrer et relâcher les poings 10 fois en imaginant presser une balle. Décharge l'énergie sans bouger. Parfait en voiture ou en public.",duree:"1-2 min",age:"4-12 ans",materiel:[],statut:"published",profil_tdah:true,profil_ordinaire:true,crise_agitation:true,crise_emotionnelle:true,lieu_maison:true,lieu_voiture:true,lieu_ecole:true,lieu_public:true,lieu_dehors:true},
    {id:"sos14",titre:"Eau froide sur les poignets",desc:"Passer les poignets sous l'eau froide 30 secondes. Active le nerf vague et réduit rapidement l'état de surcharge émotionnelle.",duree:"1-2 min",age:"5-12 ans",materiel:[],statut:"published",profil_ordinaire:true,profil_tsa:true,profil_tdah:true,crise_emotionnelle:true,crise_agitation:true,lieu_maison:true,lieu_ecole:true},
    {id:"sos15",titre:"Livre audio ou podcast enfant",desc:"Mettre un livre audio ou podcast enfant connu et apprécié. Distrait sans demander d'effort visuel ou de lecture.",duree:"15-30 min",age:"4-12 ans",materiel:["enceinte ou écouteurs"],statut:"published",profil_dys:true,profil_ordinaire:true,profil_tsa:true,crise_concentration:true,crise_emotionnelle:true,lieu_maison:true,lieu_voiture:true},
  ]);
  const [sosModeActif,setSosModeActif]=useState(true);
  const [customCatActivites,setCustomCatActivites]=useState([]); // [{label,emoji}]
  const [customCatSorties,setCustomCatSorties]=useState([]); // [{label,emoji}]
  const [customCatEvenements,setCustomCatEvenements]=useState([]); // [{k,label,emoji}]
  const [popupShown,setPopupShown]=useState(new Set());
  const [evenementsSaisonniers,setEvenementsSaisonniers]=useState([
    {id:"noel",type:"christmas",nom:"Noël",actif:false,essaiActif:false,apercuGratuitJours:3,apercuGratuitType:"premiers",apercuGratuitCartesPostales:1},
  ]);
  const addReport=(report)=>setAdminReports(prev=>[{...report,id:Date.now(),date:new Date().toLocaleDateString("fr-FR"),statut:"pending",signalePar:currentUser?.email||report.signalePar||"anonyme"},...prev]);
  const addDeletedTitle=(titre)=>setDeletedTitles(prev=>new Set([...prev,titre]));
  const addPendingContrib=(item)=>setPendingContribs(prev=>[{...item,id:Date.now(),_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:"",_auteur:currentUser?.nom||"Anonyme",_auteurEmail:currentUser?.email||"non connecté"},  ...prev]);
  const updateContrib=(id,changes)=>setPendingContribs(prev=>prev.map(c=>c.id===id?{...c,...changes}:c));

  // ── Persistance : donnees personnelles (privees) + catalogue admin (partage entre tous) ──
  const [dataLoaded,setDataLoaded]=useState(false);
  const [onboardingDone,setOnboardingDone]=useState(false);
  const [premiumTrialUsed,setPremiumTrialUsed]=useState(false);
  const [historiqueActivites,setHistoriqueActivites]=useState([]); // [{id,nom,date,type}]
  const [darkMode,setDarkMode]=useState(false);
  const [showConfetti,setShowConfetti]=useState(false);
  const [isOnline,setIsOnline]=useState(typeof navigator!=="undefined"?navigator.onLine:true);
  useEffect(()=>{
    const on=()=>setIsOnline(true);
    const off=()=>setIsOnline(false);
    window.addEventListener("online",on);
    window.addEventListener("offline",off);
    return()=>{window.removeEventListener("online",on);window.removeEventListener("offline",off);};
  },[]);
  const [filtresMemoActiv,setFiltresMemoActiv]=useState({}); // {lieu, energie, ageEnfant}
  const [filtresMemoSortie,setFiltresMemoSortie]=useState({}); // {deptS, typeS, prixS}
  // ── Sauvegarde globale — toutes les données privées en 1 clé ─────────────
  const sauvegarderPrivé=async(données)=>{
    try{ await window.storage.set("app_v1_private",JSON.stringify(données),false); }catch(e){}
  };
  const sauvegarderPartagé=async(données)=>{
    try{ await window.storage.set("app_v1_shared",JSON.stringify(données),true); }catch(e){}
  };

  useEffect(()=>{
    (async()=>{
      // 2 lectures au lieu de 24 → évite totalement le rate limit
      try{
        const prv=await window.storage.get("app_v1_private",false);
        if(prv&&prv.value){
          const d=JSON.parse(prv.value);
          if(d.favoris)setFavoris(d.favoris);
          if(d.enfants)setEnfants(d.enfants);
          if(d.onboarding_done)setOnboardingDone(d.onboarding_done);
          if(d.popup_shown)setPopupShown(new Set(Array.isArray(d.popup_shown)?d.popup_shown:[]));
          if(d.dark_mode!==undefined)setDarkMode(d.dark_mode);
          if(d.historique_activites)setHistoriqueActivites(d.historique_activites);
          if(d.premium_trial_used)setPremiumTrialUsed(d.premium_trial_used);
          if(d.filtres_memo_activ)setFiltresMemoActiv(d.filtres_memo_activ);
          if(d.filtres_memo_sortie)setFiltresMemoSortie(d.filtres_memo_sortie);
        }
      }catch(e){}
      try{
        const shr=await window.storage.get("app_v1_shared",true);
        if(shr&&shr.value){
          const d=JSON.parse(shr.value);
          if(d.customEvents)setCustomEvents(d.customEvents);
          if(d.ideesMomentConfig)setIdeesMomentConfig(d.ideesMomentConfig);
          if(d.evenementsSaisonniers)setEvenementsSaisonniers(d.evenementsSaisonniers);
          if(d.sosModeActif!==undefined)setSosModeActif(d.sosModeActif);
          if(d.pendingContribs)setPendingContribs(d.pendingContribs);
          if(d.deletedTitles)setDeletedTitles(new Set(d.deletedTitles));
          if(d.adminReports)setAdminReports(d.adminReports);
          if(d.customCatActivites)setCustomCatActivites(d.customCatActivites);
          if(d.customCatSorties)setCustomCatSorties(d.customCatSorties);
          if(d.customCatEvenements)setCustomCatEvenements(d.customCatEvenements);
          if(d.adminActivites)setAdminActivites(d.adminActivites);
          if(d.adminSorties)setAdminSorties(d.adminSorties);
          if(d.adminEvenements)setAdminEvenements(d.adminEvenements);
          if(d.sosLib)setSosLib(d.sosLib);
        }
      }catch(e){}
      // Auth session séparée
      try{
        const ses=await window.storage.get("auth_session",false);
        if(ses&&ses.value)setCurrentUser(JSON.parse(ses.value));
      }catch(e){}
      setDataLoaded(true);
    })();
  },[]);
  // ── 2 sauvegardes groupées (1 privée + 1 partagée) pour éviter le rate limit ──
  useEffect(()=>{
    if(!dataLoaded)return;
    const timer=setTimeout(()=>{
      sauvegarderPrivé({favoris,enfants,onboarding_done:onboardingDone,popup_shown:[...popupShown],dark_mode:darkMode,historique_activites:historiqueActivites,premium_trial_used:premiumTrialUsed,filtres_memo_activ:filtresMemoActiv,filtres_memo_sortie:filtresMemoSortie});
    },1500);
    return()=>clearTimeout(timer);
  },[favoris,enfants,popupShown,onboardingDone,premiumTrialUsed,historiqueActivites,darkMode,filtresMemoActiv,filtresMemoSortie,dataLoaded]);

  useEffect(()=>{
    if(!dataLoaded)return;
    const timer=setTimeout(()=>{
      sauvegarderPartagé({customEvents,ideesMomentConfig,evenementsSaisonniers,sosModeActif,pendingContribs,deletedTitles:[...deletedTitles],adminReports,customCatActivites,customCatSorties,customCatEvenements,adminActivites,adminSorties,adminEvenements,sosLib});
    },2000);
    return()=>clearTimeout(timer);
  },[customEvents,ideesMomentConfig,evenementsSaisonniers,sosModeActif,pendingContribs,deletedTitles,adminReports,customCatActivites,customCatSorties,customCatEvenements,adminActivites,adminSorties,adminEvenements,sosLib,dataLoaded]);

  const leftTabs=[{k:"accueil",icon:"🏠",label:"Accueil"},{k:"biblio",icon:"📖",label:"Biblio"}];
  const rightTabs=[{k:"planning",icon:"📅",label:"Planning"},{k:"profil",icon:"👤",label:"Profil"}];
  if(authChecking||!dataLoaded) return <div style={{maxWidth:390,margin:"0 auto",minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center"}}><p style={{fontSize:13,color:TM}}>Chargement...</p></div>;
  if(!onboardingDone) return <Onboarding onDone={()=>setOnboardingDone(true)} onDemo={()=>{setOnboardingDone(true);activerDemo();}}/>;
  const isLoggedIn=!!currentUser;
  const requireAuth=()=>setShowAuthGate(true);
  const openPremium=()=>setShowPremiumPage(true);
  const handleSubscribe=async()=>{
    await setPremiumDemo(true);
    setShowPremiumPage(false);
    setShowConfetti(true);
    setGlobalToast("⭐ Bienvenue dans Premium !");
    setTimeout(()=>setGlobalToast(null),3000);
    setTimeout(()=>setShowConfetti(false),4500);
  };
  if(isAdmin) return <PageAdmin onLogout={()=>{ setIsAdmin(false); setPage("profil"); }} pendingContribs={pendingContribs} updateContrib={updateContrib} adminActivites={adminActivites} setAdminActivites={setAdminActivites} adminSorties={adminSorties} setAdminSorties={setAdminSorties} adminEvenements={adminEvenements} setAdminEvenements={setAdminEvenements} adminReports={adminReports} setAdminReports={setAdminReports} addDeletedTitle={addDeletedTitle} adminCustomEvents={customEvents} setAdminCustomEvents={setCustomEvents} sosLib={sosLib} setSosLib={setSosLib} sosModeActif={sosModeActif} setSosModeActif={setSosModeActif} ideesMomentConfig={ideesMomentConfig} setIdeesMomentConfig={setIdeesMomentConfig} evenementsSaisonniers={evenementsSaisonniers} setEvenementsSaisonniers={setEvenementsSaisonniers} customCatActivites={customCatActivites} setCustomCatActivites={setCustomCatActivites} customCatSorties={customCatSorties} setCustomCatSorties={setCustomCatSorties} customCatEvenements={customCatEvenements} setCustomCatEvenements={setCustomCatEvenements}/>;
  return(
    <div style={{maxWidth:390,margin:"0 auto",background:BG,minHeight:"100vh",position:"relative",fontFamily:"system-ui,-apple-system,sans-serif",color:TX,transition:"background 0.3s,color 0.3s"}} className={darkMode?"dm":""}>
      <style>{`
        .dm {
          --c-bg: #0f0f1a;
          --c-bg2: #161625;
          --c-wh: #1e1e2e;
          --c-tx: #e2e8f0;
          --c-tm: #9ca3af;
          --c-bd: 1px solid rgba(139,92,246,0.25);
        }
        .dm input:not([type=range]), .dm textarea, .dm select {
          background: #1e1e2e !important;
          color: #e2e8f0 !important;
          border-color: rgba(139,92,246,0.35) !important;
        }
        .dm input::placeholder, .dm textarea::placeholder { color: #6b7280 !important; }
      `}</style>
      {showAuthGate&&(
        <div style={{position:"fixed",inset:0,background:BG,zIndex:920,overflowY:"auto"}}>
          <PageAuth onCancel={()=>{setShowAuthGate(false);activerDemo();}} onAuthSuccess={(u)=>{setCurrentUser(u);setShowAuthGate(false);}} onAdminSuccess={()=>{setIsAdmin(true);setShowAuthGate(false);}}/>
        </div>
      )}
      {showPremiumPage&&(
        <div style={{position:"fixed",inset:0,background:BG,zIndex:910,overflowY:"auto"}}>
          <PagePremium onBack={()=>setShowPremiumPage(false)} onSubscribe={handleSubscribe} isLoggedIn={isLoggedIn} onRequireAuth={requireAuth} premiumTrialUsed={premiumTrialUsed} onStartTrial={()=>{setPremiumTrialUsed(true);setPremiumDemo(true);setShowPremiumPage(false);setShowConfetti(true);setGlobalToast("🎁 7 jours Premium activés ! Profitez-en !");setTimeout(()=>setGlobalToast(null),3000);setTimeout(()=>setShowConfetti(false),4500);}}/>
        </div>
      )}
      {globalToast&&<Toast msg={globalToast}/>}
      {!isOnline&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:390,background:"#1F2937",color:"#fff",padding:"10px 16px",fontSize:13,fontWeight:600,textAlign:"center",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <span>📵</span> Pas de connexion — certaines fonctions peuvent être limitées
      </div>}
      {/* Bannière démo pour non-connectés */}
      {!currentUser&&!demoMode&&!showAuthGate&&!showPremiumPage&&(
        <div style={{position:"fixed",bottom:72,left:"50%",transform:"translateX(-50%)",zIndex:500,display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#F59E0B,#F97316)",borderRadius:28,padding:"10px 20px",boxShadow:"0 4px 20px rgba(249,115,22,0.4)",cursor:"pointer",whiteSpace:"nowrap"}} onClick={activerDemo}>
          <span style={{fontSize:18}}>🚀</span>
          <span style={{color:"#fff",fontWeight:700,fontSize:13}}>Accéder à la démo gratuite</span>
        </div>
      )}
      <Confetti active={showConfetti}/>
      <div style={{paddingBottom:72}}>
        {page==="accueil"&&<PageAccueil favoris={favoris} setFavoris={setFavoris} setPage={setPage} customEvents={customEvents} popupShown={popupShown} setPopupShown={setPopupShown} ideesMomentConfig={ideesMomentConfig} isLoggedIn={isLoggedIn} onRequireAuth={requireAuth} evenementsSaisonniers={evenementsSaisonniers} isPremium={isPremiumUser} onOpenPremium={openPremium} customCatActivites={customCatActivites} customCatSorties={customCatSorties} customCatEvenements={customCatEvenements} adminActivites={adminActivites} adminSorties={adminSorties} pendingContribs={pendingContribs} setPendingContribs={setPendingContribs} deletedTitles={deletedTitles} currentUser={currentUser} sosModeActif={sosModeActif} enfants={enfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} onMarquerFait={(item)=>setHistoriqueActivites(prev=>[{id:item.id||Date.now(),nom:item.nom||item.titre||"",categorie:item.categorie||"",date:item._date||new Date().toISOString(),type:"activite",note:item._note||""},...prev.slice(0,99)])} historiqueActivites={historiqueActivites} filtresMemoActiv={filtresMemoActiv} setFiltresMemoActiv={setFiltresMemoActiv} filtresMemoSortie={filtresMemoSortie} setFiltresMemoSortie={setFiltresMemoSortie}/>}
        {page==="biblio"&&<PageBiblio pendingContribs={pendingContribs} setPendingContribs={setPendingContribs} adminActivites={adminActivites} adminSorties={adminSorties} adminEvenements={adminEvenements} addReport={addReport} adminReports={adminReports} deletedTitles={deletedTitles} isLoggedIn={isLoggedIn} onRequireAuth={requireAuth} favoris={favoris} setFavoris={setFavoris} isPremium={isPremiumUser} onOpenPremium={openPremium} customCatActivites={customCatActivites} customCatSorties={customCatSorties} customCatEvenements={customCatEvenements} currentUser={currentUser}/>}
        {page==="generer"&&<PageAccueil favoris={favoris} setFavoris={setFavoris} setPage={setPage} customEvents={customEvents} popupShown={popupShown} setPopupShown={setPopupShown} ideesMomentConfig={ideesMomentConfig} isLoggedIn={isLoggedIn} onRequireAuth={requireAuth} evenementsSaisonniers={evenementsSaisonniers} isPremium={isPremiumUser} onOpenPremium={openPremium} customCatActivites={customCatActivites} customCatSorties={customCatSorties} customCatEvenements={customCatEvenements} adminActivites={adminActivites} adminSorties={adminSorties} pendingContribs={pendingContribs} setPendingContribs={setPendingContribs} deletedTitles={deletedTitles} currentUser={currentUser} sosModeActif={sosModeActif} enfants={enfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} onMarquerFait={(item)=>setHistoriqueActivites(prev=>[{id:item.id||Date.now(),nom:item.nom||item.titre||"",categorie:item.categorie||"",date:item._date||new Date().toISOString(),type:"activite",note:item._note||""},...prev.slice(0,99)])} historiqueActivites={historiqueActivites} filtresMemoActiv={filtresMemoActiv} setFiltresMemoActiv={setFiltresMemoActiv} filtresMemoSortie={filtresMemoSortie} setFiltresMemoSortie={setFiltresMemoSortie}/>}
        {page==="planning"&&<PagePlanning sosLib={sosLib} enfants={enfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} isPremium={isPremiumUser} onOpenPremium={openPremium} sosModeActif={sosModeActif} adminActivites={adminActivites} pendingContribs={pendingContribs} deletedTitles={deletedTitles}/>}
        {page==="profil"&&<PageProfil setPage={setPage} enfants={enfants} setEnfants={setEnfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} showGestionEnfants={showGestionEnfants} setShowGestionEnfants={setShowGestionEnfants} currentUser={currentUser} onLogout={handleLogout} onRequireAuth={requireAuth} isPremium={isPremiumUser} setPremium={setPremiumDemo} evenementsSaisonniers={evenementsSaisonniers} onOpenPremium={openPremium} onDeleteAccount={handleDeleteAccount} favoris={favoris} adminEvenements={adminEvenements} pendingContribs={pendingContribs} darkMode={darkMode} setDarkMode={setDarkMode} historiqueActivites={historiqueActivites} setHistoriqueActivites={setHistoriqueActivites}/>}
        {page==="favoris"&&<PageFavoris favoris={favoris} setFavoris={setFavoris} isPremium={isPremiumUser} onBack={()=>setPage("profil")}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:390,background:WH,borderTop:BD,display:"flex",alignItems:"flex-end",zIndex:200,paddingBottom:4}}>
        {leftTabs.map(t=>{
          const streak=(()=>{if(historiqueActivites.length===0)return 0;const dates=[...new Set(historiqueActivites.map(h=>h.date?.slice(0,10)).filter(Boolean))].sort().reverse();let s=0,cur=new Date();for(const d of dates){const diff=Math.floor((cur-new Date(d))/(1000*60*60*24));if(diff>1)break;s++;cur=new Date(d);}return s;})();
          const badge=t.k==="accueil"&&streak>=2?`🔥${streak}`:null;
          return(
            <button key={t.k} onClick={()=>setPage(t.k)} style={{flex:1,padding:"10px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
              <span style={{fontSize:20,filter:page===t.k?"none":"grayscale(1) opacity(0.5)"}}>{t.icon}</span>
              <span style={{fontSize:10,color:page===t.k?V:TM,fontWeight:page===t.k?700:400}}>{t.label}</span>
              {badge&&<span style={{position:"absolute",top:6,right:"18%",background:"#F97316",color:"#fff",borderRadius:10,padding:"1px 5px",fontSize:9,fontWeight:800}}>{badge}</span>}
            </button>
          );
        })}
        <button onClick={()=>setPage("planning")} style={{flex:1,padding:"10px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
          <span style={{fontSize:22,filter:page==="planning"?"none":"grayscale(1) opacity(0.5)"}}>⚡</span>
          <span style={{fontSize:10,color:page==="planning"?V:TM,fontWeight:page==="planning"?700:400}}>Planning</span>
        </button>
        <button onClick={()=>setPage("profil")} style={{flex:1,padding:"10px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
          <span style={{fontSize:20,filter:page==="profil"?"none":"grayscale(1) opacity(0.5)"}}>👤</span>
          <span style={{fontSize:10,color:page==="profil"?V:TM,fontWeight:page==="profil"?700:400}}>Profil</span>
          {favoris.length>0&&<span style={{position:"absolute",top:6,right:"18%",background:V,color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{favoris.length>9?"9+":favoris.length}</span>}
        </button>
      </div>
    </div>
  );
}
