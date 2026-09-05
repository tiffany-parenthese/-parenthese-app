import * as ReactNS from "react";
const React = ReactNS.default || ReactNS;
const { useState } = ReactNS;

const V="#6C5CE7",VL="#EDE9FF",BG="#F8FAFC",BG2="#F3F4F6",TX="#2C2A3E",TM="#7A7690",WH="#FFFFFF",GR="#27AE60",OR="#E67E22",RD="#E74C3C";
const BD="1px solid rgba(108,92,231,0.15)";
const FS={padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,width:"100%",background:"#FFFFFF",boxSizing:"border-box"};
const FST={padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,width:"100%",background:"#FFFFFF",boxSizing:"border-box",fontFamily:"inherit",resize:"none"};

const ACTIVITES=[
  {id:1,nom:"Peinture avec les doigts",lieu:"interieur",energie:"fatigue",categorie:"Creatif",materiel:["peinture lavable","papier epais","tablier"],age:"2-8 ans",desc:"Une activite sensorielle parfaite.",tnd:{tsa:4,tdah:3,dys:5}},
  {id:2,nom:"Chasse au tresor jardin",lieu:"exterieur",energie:"motiv",categorie:"Jeu",materiel:["tresors","indices"],age:"4-10 ans",desc:"Creez un parcours avec des enigmes.",tnd:{tsa:3,tdah:5,dys:3}},
  {id:3,nom:"Lecture sous la couette",lieu:"interieur",energie:"fatigue",categorie:"Calme",materiel:["livres","coussins"],age:"0-12 ans",desc:"Plongez dans une histoire ensemble.",tnd:{tsa:5,tdah:2,dys:4}},
  {id:4,nom:"Cuisine crepes",lieu:"interieur",energie:"motiv",categorie:"Cuisine",materiel:["farine","oeufs","lait","beurre"],age:"3-12 ans",desc:"Faites des crepes ensemble !",tnd:{tsa:3,tdah:4,dys:4}},
  {id:5,nom:"Balade nature collecte",lieu:"exterieur",energie:"motiv",categorie:"Nature",materiel:["sacs","loupe"],age:"2-12 ans",desc:"Ramassez feuilles et cailloux.",tnd:{tsa:5,tdah:4,dys:5}},
  {id:6,nom:"Construire des Lego",lieu:"interieur",energie:"fatigue",categorie:"Construction",materiel:["Lego"],age:"3-12 ans",desc:"Construisez librement ensemble.",tnd:{tsa:5,tdah:3,dys:4}},
  {id:7,nom:"Danse freestyle salon",lieu:"interieur",energie:"motiv",categorie:"Sport",materiel:["enceinte"],age:"0-12 ans",desc:"Mettez la musique et dansez !",tnd:{tsa:2,tdah:5,dys:5}},
  {id:8,nom:"Jardinage en pots",lieu:"exterieur",energie:"fatigue",categorie:"Nature",materiel:["terre","pots","graines"],age:"3-12 ans",desc:"Plantez des graines.",tnd:{tsa:4,tdah:3,dys:5}},
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
// Mettre à false pour masquer la bannière Village du Lutin
const SHOW_LUTIN_BANNER = true;
// Code secret administrateur — à changer avant mise en production
const ADMIN_CODE = "ADMIN2024";
// Idees du moment — mettre à false pour masquer chaque vignette
const SHOW_IDEE_ACTIVITES_CREATIVES = true;
const SHOW_IDEE_SORTIES_NATURE      = true;
const SHOW_IDEE_EVENEMENTS          = true;
const SHOW_IDEE_ANNIVERSAIRE        = true;
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
];

const EVT_TYPE_OPTIONS=[
  {k:"kermesse",l:"🎪 Kermesse"},{k:"fete_foraine",l:"🎡 Fete foraine"},{k:"spectacle",l:"🎭 Spectacle"},
  {k:"cirque",l:"🎪 Cirque"},{k:"marche_noel",l:"🎄 Saisonnier"},{k:"concert",l:"🎵 Concert"},
  {k:"sport",l:"🏃 Sport"},{k:"autre",l:"Autre"},
];

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
const TYPES_SORTIE=["Parc","Balade","Musee","Aquarium","Zoo","Bowling","Cinema","Escape game","Piscine","Plage","Patinoire","Ferme pedagogique","Restaurant","Parc d attraction","Evenement"];
const MATERIEL_MAP={"Peinture avec une eponge":["Eponge","Peinture lavable","Feuille A4"],"Faire des cupcakes":["Farine","Oeufs","Beurre","Sucre","Moules"],"Puzzle geant":["Puzzle"],"Lecture a voix haute":["Livre"],"Balade a velo":["Velo","Casque"],"Planter des graines":["Graines","Pot","Terre","Arrosoir"],"Foot dans le jardin":["Ballon"],"Jeu de role":["Deguisements"],"Soiree jeux de societe":["Jeu de societe"],"Jeu de flechettes mousse":["Flechettes mousse","Cible"]};
const ETAPES_MAP={"Peinture avec une eponge":["Trempe l eponge","Tamponne sur la feuille","Laisse secher 5 min"],"Faire des cupcakes":["Prechauffe le four","Melange les ingredients","Verse dans les moules","Enfourne 20 min","Decore"],"Puzzle geant":["Etale les pieces","Commence par les bords","Assemble par zones"],"Lecture a voix haute":["Choisis un livre","Installez-vous","Lis avec le ton","Discutez"],"Balade a velo":["Verifiez les velos","Choisissez l itineraire","Partez","Pause gouter"],"Planter des graines":["Remplis le pot","Fais un trou","Depose les graines","Arrose","Place au soleil"],"Foot dans le jardin":["Delimitez le terrain","Formez les equipes","C est parti"],"Jeu de role":["Choisissez vos personnages","Inventez une situation","Jouez"],"Soiree jeux de societe":["Choisissez un jeu","Lisez les regles","Jouez"],"Jeu de flechettes mousse":["Accrochez la cible","Definissez les regles","Lancez"]};
const AVIS_DEMO=[
  {profils:["General","TSA"],stars:5,pseudo:"Famille Dupont",temps:"il y a 2 jours",texte:"Super sortie ! Personnel accueillant."},
  {profils:["TDAH"],stars:4,pseudo:"Maman de Lucas",temps:"il y a 1 semaine",texte:"Beaucoup d espace pour courir."},
  {profils:["General"],stars:4,pseudo:"Les Martins",temps:"il y a 3 semaines",texte:"Tres belle sortie en famille."},
];
const MOIS=["","janv","fev","mars","avr","mai","juin","juil","aout","sept","oct","nov","dec"];
function formatDateFR(d){if(!d)return"";const p=d.split("-");return p[2]+" "+MOIS[parseInt(p[1])]+" "+p[0];}
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

function SectionAccessibilite(){
  return(
    <>
      <div style={{background:"#FFF8F0",borderRadius:14,padding:"14px 16px"}}>
        <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:TX}}>Bebes et jeunes enfants</p>
        <p style={{margin:"0 0 10px",fontSize:12,color:TM}}>Coche ce qui correspond</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>
          {["Adapte poussette","Adapte bebe","Espace allaitement","Table a langer","Aire de jeux 0-3 ans","Peu bruyant"].map(item=>(<label key={item} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:TX,cursor:"pointer"}}><input type="checkbox" style={{accentColor:OR,flexShrink:0}}/>{item}</label>))}
        </div>
      </div>
      <div style={{background:"#F0F4FF",borderRadius:14,padding:"14px 16px"}}>
        <p style={{margin:"0 0 10px",fontSize:14,fontWeight:600,color:TX}}>Mobilite reduite PMR</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>
          {["Acces fauteuil","Sans escaliers","Parking PMR","Toilettes adaptees","Personnel forme","Chemin accessible"].map(item=>(<label key={item} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:TX,cursor:"pointer"}}><input type="checkbox" style={{accentColor:"#3B82F6",flexShrink:0}}/>{item}</label>))}
        </div>
      </div>
      <div>
        <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:TX}}>Troubles du neurodeveloppement TND</p>
        <p style={{margin:"0 0 10px",fontSize:12,color:TM}}>Ces infos aident les familles TND</p>
        <div style={{background:"#EDE9FF",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:V}}>TSA Autisme</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{["Peu de foule","Env calme","Lumiere douce","Espace retrait","Peu de bruit","Personnel TSA"].map(item=>(<label key={item} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" style={{accentColor:V,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <div style={{background:"#F0FFF4",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:GR}}>TDAH</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{["Grand espace","Activite physique","Peu attente","Stimulation variee"].map(item=>(<label key={item} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" style={{accentColor:GR,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <div style={{background:"#FFF4EC",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:OR}}>DYS</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 4px"}}>{["Supports visuels","Non ecrite","Rythme libre","Personnel DYS"].map(item=>(<label key={item} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TX,cursor:"pointer"}}><input type="checkbox" style={{accentColor:OR,flexShrink:0}}/>{item}</label>))}</div>
        </div>
        <textarea placeholder="Commentaire TND" rows={3} style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:13,width:"100%",boxSizing:"border-box",background:WH,fontFamily:"inherit",resize:"none"}}/>
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
            <div style={{textAlign:"center",marginBottom:14}}><p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>{RAISONS.find(r=>r.k===raison)&&RAISONS.find(r=>r.k===raison).l}</p></div>
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
      {step==="detail"&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={()=>setStep("idle")}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 12px 48px rgba(0,0,0,0.22)"}}><div style={{textAlign:"center",marginBottom:14}}><p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>{RAISONS.find(r=>r.k===raison)&&RAISONS.find(r=>r.k===raison).l}</p></div><textarea value={detail} onChange={e=>setDetail(e.target.value.slice(0,300))} placeholder="Ajoute des details" rows={3} style={{width:"100%",borderRadius:12,border:"1px solid #E5E7EB",padding:"12px 14px",fontSize:13,fontFamily:"inherit",resize:"none",boxSizing:"border-box",outline:"none",color:TX,marginBottom:4}}/><div style={{textAlign:"right",fontSize:11,color:TM,marginBottom:14}}>{detail.length}/300</div><button onClick={handleEnvoyer} style={{width:"100%",padding:13,borderRadius:28,background:RD,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>Envoyer</button><div style={{display:"flex",gap:8}}><button onClick={()=>setStep("choix")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Retour</button><button onClick={()=>setStep("idle")} style={{flex:1,padding:"10px 0",borderRadius:28,background:BG2,border:"none",color:TM,fontSize:13,cursor:"pointer"}}>Annuler</button></div></div></div>)}
      {toast&&(<div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#065F46",color:WH,borderRadius:20,padding:"10px 20px",fontSize:13,zIndex:999,whiteSpace:"nowrap"}}>Signalement pris en compte.</div>)}
    </div>
  );
}

function AvisForm(){
  const PROFILS=["General","TSA","TDAH","DYS","Bebe","PMR"];
  const [selected,setSelected]=useState(["General"]);
  const [stars,setStars]=useState(0);
  const [hover,setHover]=useState(0);
  const [text,setText]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const toggle=(p)=>setSelected(prev=>prev.includes(p)?(prev.length===1?prev:prev.filter(x=>x!==p)):[...prev,p]);
  if(submitted)return(<div style={{background:WH,borderRadius:16,padding:20,marginBottom:12,textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>🎉</div><p style={{fontWeight:600,color:TX,margin:0}}>Merci pour ton avis !</p></div>);
  return(
    <div style={{background:WH,borderRadius:16,padding:16,marginBottom:12}}>
      <p style={{margin:"0 0 14px",fontSize:15,fontWeight:600,color:TX}}>Donner mon avis</p>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>{[1,2,3,4,5].map(i=>(<span key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>setStars(i)} style={{fontSize:28,cursor:"pointer",color:(hover||stars)>=i?"#F5A623":"#E5E7EB"}}>★</span>))}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14,justifyContent:"center"}}>{PROFILS.map(p=>{const on=selected.includes(p);return(<button key={p} onClick={()=>toggle(p)} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid "+(on?V:"#E5E7EB"),background:on?VL:WH,color:on?V:"#6B7280",fontSize:13,cursor:"pointer"}}>{p}</button>);})}</div>
      <textarea value={text} onChange={e=>setText(e.target.value.slice(0,300))} placeholder="Partage ton experience" rows={4} style={{width:"100%",borderRadius:12,border:"1px solid #E5E7EB",padding:"12px 14px",fontSize:13,fontFamily:"inherit",resize:"none",boxSizing:"border-box",color:TX,outline:"none"}}/>
      <div style={{textAlign:"right",fontSize:12,color:TM,marginBottom:14}}>{text.length}/300</div>
      <button onClick={()=>stars>0&&setSubmitted(true)} style={{width:"100%",padding:"14px 0",borderRadius:28,background:stars>0?V:"#C4B8F8",border:"none",color:WH,fontWeight:600,fontSize:15,cursor:stars>0?"pointer":"default"}}>Publier mon avis</button>
    </div>
  );
}

function BottomSheet({item,type,onClose,onFav,isFav}){
  if(!item)return null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"20px 20px 0 0",padding:24,width:"100%",boxSizing:"border-box",maxHeight:"70vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:"#DDD",borderRadius:2,margin:"0 auto 16px"}}/>
        <span style={{fontSize:11,background:VL,color:V,padding:"3px 10px",borderRadius:12,fontWeight:500}}>{type==="activite"?item.categorie:item.type}</span>
        <h3 style={{margin:"8px 0 4px",fontSize:18,color:TX}}>{item.nom}</h3>
        {type==="activite"&&<p style={{margin:0,fontSize:13,color:TM}}>{item.age}</p>}
        {type==="sortie"&&<p style={{margin:0,fontSize:13,color:TM}}>{item.ville} - {item.prix}</p>}
        <p style={{fontSize:14,color:TX,lineHeight:1.6,margin:"12px 0"}}>{item.desc}</p>
        <TND tnd={item.tnd}/>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <button onClick={onClose} style={{flex:1,padding:"11px 0",borderRadius:12,background:BG,border:"none",color:TX,fontWeight:500,fontSize:14,cursor:"pointer"}}>Relancer</button>
          <button onClick={()=>onFav(item)} style={{flex:1,padding:"11px 0",borderRadius:12,background:isFav?V:VL,border:"none",color:isFav?WH:V,fontWeight:500,fontSize:14,cursor:"pointer"}}>{isFav?"Sauvegarde":"Favoris"}</button>
        </div>
      </div>
    </div>
  );
}

function FormActivite({onClose,onSubmit}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px 12px 40px"}}>
      <div style={{background:WH,borderRadius:20,width:"100%",maxWidth:420,boxSizing:"border-box"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 20px 0"}}><h2 style={{fontSize:18,fontWeight:600,color:TX,margin:0}}>Proposer une activite</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TM}}>x</button></div>
        <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
          <Field label="Titre" required><input placeholder="Ex : Peinture avec les doigts" style={FS}/></Field>
          <Field label="Photo (optionnel)"><div style={{border:"1.5px dashed rgba(108,92,231,0.3)",borderRadius:12,padding:"20px 0",textAlign:"center",cursor:"pointer",background:BG}}><div style={{fontSize:22,marginBottom:6}}>⬆️</div><p style={{margin:0,fontSize:13,color:TX}}>Ajouter une photo</p><p style={{margin:"2px 0 0",fontSize:11,color:TM}}>JPG, PNG - Max 5MB</p></div></Field>
          <Field label="Description" required><textarea placeholder="Decris l activite" rows={3} style={FST}/></Field>
          <div style={{display:"flex",gap:8}}><Field label="Duree" required style={{flex:1}}><select style={FS}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Difficulte" required style={{flex:1}}><select style={FS}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select></Field></div>
          <div style={{display:"flex",gap:8}}><Field label="Lieu" required style={{flex:1}}><select style={FS}><option value="">Choisir</option><option value="interieur">Interieur</option><option value="exterieur">Exterieur</option></select></Field><Field label="Motivation" required style={{flex:1}}><select style={FS}><option value="">Choisir</option><option value="fatigue">Fatigue</option><option value="motiv">Motiv</option></select></Field></div>
          <Field label="Categorie" required><select style={FS}><option value="">Choisir</option>{["Creatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"].map(v=><option key={v}>{v}</option>)}</select></Field>
          <Field label="Age conseille"><div style={{display:"flex",gap:8}}><select style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select><select style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select></div></Field>
          <Field label="Materiel necessaire"><input placeholder="Ex : peinture, papier, tablier" style={FS}/></Field>
          <Field label="Etapes"><textarea placeholder="1. Preparer..." rows={4} style={FST}/></Field>
          <SectionAccessibilite/>
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les activites proposees doivent etre destinees aux enfants.</p></div>
          <button onClick={()=>{if(onSubmit)onSubmit({nom:"Nouvelle activite",categorie:"Creatif",lieu:"interieur",energie:"motiv",age:"3-10 ans",materiel:[],tnd:{tsa:3,tdah:3,dys:3},_type:"activite"});}} style={{padding:14,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",width:"100%"}}>Envoyer ma suggestion</button>
        </div>
      </div>
    </div>
  );
}

function FormSortie({onClose,onSubmit}){
  const [typeAutreSortie,setTypeAutreSortie]=useState("");
  const [showAutreSortiePopup,setShowAutreSortiePopup]=useState(false);
  const [typeAutreSortieTemp,setTypeAutreSortieTemp]=useState("");
  const [typeSortieSelected,setTypeSortieSelected]=useState("");
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px 12px 40px"}}>
      <div style={{background:WH,borderRadius:20,width:"100%",maxWidth:420,boxSizing:"border-box"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 20px 0"}}><h2 style={{fontSize:18,fontWeight:600,color:TX,margin:0}}>Proposer une sortie</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:TM}}>x</button></div>
        <div style={{padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
          <input placeholder="Nom de la sortie" style={FS}/>
          <textarea placeholder="Description..." rows={3} style={FST}/>
          <div style={{display:"flex",gap:8}}><input placeholder="Ville" style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}/><select style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}><option value="">Dept</option>{DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}</select></div>
          <div><p style={{margin:"0 0 5px",fontSize:13,fontWeight:500,color:TX}}>Type de sortie</p><select value={typeSortieSelected} onChange={e=>{if(e.target.value==="autre"){setTypeAutreSortieTemp(typeAutreSortie);setShowAutreSortiePopup(true);}else{setTypeSortieSelected(e.target.value);}}} style={FS}><option value="">Choisir un type</option>{TYPES_SORTIE.map(t=><option key={t} value={t}>{t}</option>)}<option value="autre">{typeAutreSortie?"Autre: "+typeAutreSortie:"Autre..."}</option></select></div>
          <div style={{display:"flex",gap:8}}><input placeholder="Tarif" style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}/><input placeholder="Horaires" style={{padding:"12px 14px",borderRadius:12,border:"1px solid rgba(108,92,231,0.15)",fontSize:14,flex:1,background:WH}}/></div>
          <SectionAccessibilite/>
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les sorties proposees doivent etre adaptees aux enfants.</p></div>
          <button onClick={()=>{if(onSubmit)onSubmit({nom:"Nouvelle sortie",type:typeSortieSelected||"Parc",dept:"75",ville:"Paris",prix:"Gratuit",tnd:{tsa:3,tdah:3,dys:3},_type:"sortie"});}} style={{padding:14,borderRadius:14,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",width:"100%"}}>Envoyer ma suggestion</button>
        </div>
      </div>
      {showAutreSortiePopup&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}} onClick={()=>setShowAutreSortiePopup(false)}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}><p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX,textAlign:"center"}}>Autre type de sortie</p><input value={typeAutreSortieTemp} onChange={e=>setTypeAutreSortieTemp(e.target.value)} placeholder="Ex : Randonnee, Aquaparc..." style={{padding:"12px 14px",borderRadius:12,border:"1.5px solid "+V,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:16}}/><div style={{display:"flex",gap:10}}><button onClick={()=>setShowAutreSortiePopup(false)} style={{flex:1,padding:"11px 0",borderRadius:28,background:BG,border:"1px solid #E5E7EB",color:TX,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={()=>{if(typeAutreSortieTemp.trim()){setTypeAutreSortie(typeAutreSortieTemp.trim());setTypeSortieSelected("autre");}setShowAutreSortiePopup(false);}} style={{flex:1,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Confirmer</button></div></div></div>)}
    </div>
  );
}

function FormEvenement({onClose,onSubmit,onOpenAutrePopup,typeAutre,typeEvt,setTypeEvt}){
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
  const [localErrors,setLocalErrors]=useState({});
  const handlePhoto=(e)=>{const file=e.target.files[0];if(!file)return;if(file.size>5*1024*1024){alert("Max 5MB");return;}const reader=new FileReader();reader.onload=(ev)=>setPhotoPreview(ev.target.result);reader.readAsDataURL(file);};
  const validate=()=>{const e={};if(!nom.trim())e.nom="Champ obligatoire";if(!desc.trim())e.desc="Champ obligatoire";if(!typeEvt)e.typeEvt="Champ obligatoire";if(!ville.trim())e.ville="Champ obligatoire";if(!dept)e.dept="Champ obligatoire";if(!dateDebut)e.dateDebut="Champ obligatoire";setLocalErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=()=>{if(!validate())return;const datesStr=dateFin?formatDateFR(dateDebut)+" - "+formatDateFR(dateFin):formatDateFR(dateDebut);const isGratuit=!tarif.trim()||tarif.toLowerCase().includes("gratuit");const categorieFinale=typeEvt==="autre"?(typeAutre||"autre"):typeEvt;onSubmit({nom:nom.trim(),desc:desc.trim(),categorie:categorieFinale,ville:ville.trim()+" ("+dept+")",dept,date:dateDebut,periode:detectPeriode(dateDebut),prix:tarif.trim()||"Non renseigne",gratuit:isGratuit,communaute:true,signalements:0,age:"Tous ages",dates:datesStr,tnd:{son:"moyenne",affluence:"moyenne",prevision:"moyenne",zonecalme:false}});};
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
          <div><label style={lbl}>Photo (optionnel)</label><input id="evt-photo-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} style={{display:"none"}}/>{photoPreview?(<div style={{position:"relative",borderRadius:12,overflow:"hidden",height:160}}><img src={photoPreview} alt="Apercu" style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><button onClick={()=>document.getElementById("evt-photo-input").click()} style={{background:WH,border:"none",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:TX}}>Changer</button><button onClick={()=>setPhotoPreview(null)} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:20,padding:"6px 14px",fontSize:13,cursor:"pointer",color:WH}}>Supprimer</button></div></div>):(<div onClick={()=>document.getElementById("evt-photo-input").click()} style={{border:"1.5px dashed rgba(108,92,231,0.35)",borderRadius:12,padding:"24px 0",textAlign:"center",cursor:"pointer",background:"#FAFAFA"}}><div style={{fontSize:28,marginBottom:6}}>📸</div><p style={{margin:0,fontSize:13,color:TX,fontWeight:500}}>Ajouter une photo</p><p style={{margin:"4px 0 0",fontSize:11,color:TM}}>JPG, PNG, WEBP - Max 5MB</p></div>)}</div>
          <div><label style={lbl}>Description <span style={{color:RD}}>*</span></label><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Decris l evenement" rows={3} style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid "+(localErrors.desc?"#EF4444":"rgba(108,92,231,0.15)"),fontFamily:"inherit",resize:"none"}}/><Err k="desc"/></div>
          <div><label style={lbl}>Type <span style={{color:RD}}>*</span></label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{EVT_TYPE_OPTIONS.map(t=>{const on=typeEvt===t.k;const l2=t.k==="autre"&&typeAutre?"Autre: "+typeAutre:t.l;return(<button key={t.k} onClick={()=>{if(t.k==="autre"){onOpenAutrePopup();}else{setTypeEvt(t.k);setLocalErrors(p=>({...p,typeEvt:""}));}}} style={{padding:"7px 14px",borderRadius:20,border:"1.5px solid "+(on?V:"#E5E7EB"),background:on?V:WH,color:on?WH:"#374151",fontSize:13,cursor:"pointer"}}>{l2}</button>);})}</div>{localErrors.typeEvt&&<p style={{margin:"3px 0 0",fontSize:11,color:"#EF4444"}}>{localErrors.typeEvt}</p>}</div>
          <div style={{display:"flex",gap:10}}><div style={{flex:1}}><label style={lbl}>Ville <span style={{color:RD}}>*</span></label><input value={ville} onChange={e=>setVille(e.target.value)} placeholder="Ex : Lyon" style={se(localErrors.ville)}/><Err k="ville"/></div><div style={{flex:1}}><label style={lbl}>Dept <span style={{color:RD}}>*</span></label><select value={dept} onChange={e=>setDept(e.target.value)} style={se(localErrors.dept)}><option value="">Choisir</option>{DEPTS.map(d=><option key={d} value={d}>{d}</option>)}</select><Err k="dept"/></div></div>
          <div style={{display:"flex",gap:10}}><div style={{flex:1}}><label style={lbl}>Date debut <span style={{color:RD}}>*</span></label><input type="date" value={dateDebut} onChange={e=>setDateDebut(e.target.value)} style={se(localErrors.dateDebut)}/><Err k="dateDebut"/></div><div style={{flex:1}}><label style={lbl}>Date fin</label><input type="date" value={dateFin} onChange={e=>setDateFin(e.target.value)} style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div></div>
          <div><label style={lbl}>Horaires</label><input value={horaires} onChange={e=>setHoraires(e.target.value)} placeholder="Ex : 10h-20h" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <div><label style={lbl}>Tarif</label><input value={tarif} onChange={e=>setTarif(e.target.value)} placeholder="Ex : Gratuit / 5 euros" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <div><label style={lbl}>Adresse</label><input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Ex : Place du Capitole" style={{padding:"12px 14px",borderRadius:12,fontSize:14,width:"100%",boxSizing:"border-box",background:WH,border:"1px solid rgba(108,92,231,0.15)"}}/></div>
          <SectionAccessibilite/>
          <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les evenements proposes doivent etre destines aux enfants ou aux familles.</p></div>
          <div style={{display:"flex",gap:10}}><button onClick={onClose} style={{flex:1,padding:14,borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:"#374151",fontWeight:500,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={handleSubmit} style={{flex:2,padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Envoyer</button></div>
        </div>
      </div>
    </div>
  );
}

function SortieDetailPage({sortie,isFavorite,onToggleFavorite,onBack,onReport}){
  const card={background:WH,borderRadius:16,padding:14,marginBottom:12,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"};
  const sec=(t)=>(<div style={{fontSize:12,fontWeight:600,color:V,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{t}</div>);
  const emo=sortie.type==="Zoo"?"🦁":sortie.type==="Musee"?"🏛️":sortie.type==="Parc d attraction"?"🎢":sortie.type==="Plage"?"🏖️":sortie.type==="Bowling"?"🎳":sortie.type==="Escape game"?"🔐":sortie.type==="Ferme pedagogique"?"🐄":sortie.type==="Piscine"?"🏊":"🗺️";
  const tndRows=[{label:"TSA",bg:"#EEEDFE",col:"#3C3489",stars:sortie.tnd.tsa,avis:"2 avis"},{label:"TDAH",bg:"#E1F5EE",col:"#085041",stars:sortie.tnd.tdah,avis:"3 avis"},{label:"DYS",bg:"#FAEEDA",col:"#633806",stars:sortie.tnd.dys,avis:sortie.tnd.dys>0?"1 avis":null}];
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail de la sortie</span></div>
      <div style={{background:"linear-gradient(135deg,#E8F4FF,#D6EAFF)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:56,marginBottom:8,lineHeight:1}}>{emo}</div><div style={{display:"inline-block",background:V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{sortie.type}</div><div style={{fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:6}}>{sortie.nom}</div><div style={{fontSize:12,color:"#6B7280",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}><span>{sortie.ville}</span><span>{sortie.prix}</span>{sortie.note&&<span>{sortie.note}/5</span>}</div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{label:"Adresse",val:sortie.ville+", Dept "+sortie.dept,icon:"📍"},{label:"Horaires",val:"10h00 - 18h00",icon:"🕙"},{label:"Tarifs",val:sortie.prix,icon:"🎫"},{label:"Type",val:sortie.type,icon:"🏷️"}].map(({label,val,icon},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:14,width:20,flexShrink:0,marginTop:1}}>{icon}</span><div style={{flex:1}}><div style={{fontSize:11,color:"#9CA3AF",marginBottom:2}}>{label}</div><div style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</div></div></div>))}</div>
        <div style={card}>{sec("A propos")}<p style={{fontSize:13,color:"#374151",lineHeight:1.6,margin:0}}>{sortie.desc}</p></div>
        <div style={card}>{sec("Adapte TND")}<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>{[{label:"TSA",bg:"#EEEDFE",col:"#3C3489"},{label:"TDAH",bg:"#E1F5EE",col:"#085041"},{label:"DYS",bg:"#FAEEDA",col:"#633806"},{label:"PMR",bg:"#F0F4FF",col:"#1D4ED8"},{label:"Bebe",bg:"#FFF0F5",col:"#9D174D"}].map(({label,bg,col})=>(<span key={label} style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{label}</span>))}</div>{tndRows.map(({label,bg,col,stars,avis},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{label}</span>{avis?(<><Stars count={stars} size={13}/><span style={{fontSize:11,color:"#9CA3AF"}}>{avis}</span></>):(<><span style={{fontSize:11,color:"#9CA3AF"}}>Pas encore</span><span/></>)}</div>))}</div>
        <div style={card}>{sec("Notes")}<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}><span style={{fontSize:36,fontWeight:700,color:"#1a1a1a"}}>{sortie.note}</span><div><Stars count={Math.round(sortie.note)} size={18}/><div style={{fontSize:11,color:"#9CA3AF",marginTop:2}}>Sur {AVIS_DEMO.length} avis</div></div></div>{[5,4,3,2,1].map(n=>{const cnt=AVIS_DEMO.filter(a=>a.stars===n).length;const pct=Math.round((cnt/AVIS_DEMO.length)*100);return(<div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:11,color:"#9CA3AF",width:8}}>{n}</span><span style={{color:"#F5A623",fontSize:11}}>★</span><div style={{flex:1,height:6,background:BG2,borderRadius:10,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:"#F5A623",borderRadius:10}}/></div><span style={{fontSize:11,color:"#9CA3AF",width:16}}>{cnt}</span></div>);})}</div>
        <div style={card}>{sec("Les avis")}<div style={{display:"flex",flexDirection:"column",gap:12}}>{AVIS_DEMO.map((a,i)=>(<div key={i} style={{borderBottom:i<AVIS_DEMO.length-1?"0.5px solid #F3F4F6":"none",paddingBottom:i<AVIS_DEMO.length-1?12:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}><div><span style={{fontSize:13,fontWeight:600,color:TX}}>{a.pseudo}</span><div style={{display:"flex",gap:4,marginTop:2}}>{a.profils.map(p=>(<span key={p} style={{fontSize:10,background:VL,color:V,padding:"1px 7px",borderRadius:10}}>{p}</span>))}</div></div><div style={{textAlign:"right"}}><Stars count={a.stars} size={12}/><div style={{fontSize:11,color:"#9CA3AF"}}>{a.temps}</div></div></div><p style={{fontSize:13,color:"#374151",lineHeight:1.5,margin:0}}>{a.texte}</p></div>))}</div></div>
        <AvisForm/>
        <button onClick={onToggleFavorite} style={{width:"100%",background:isFavorite?"#FCEBEB":V,color:isFavorite?"#A32D2D":WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>{isFavorite?"Retirer des favoris":"Ajouter aux favoris"}</button>
        <button style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer"}}>Partager</button>
        <SignalementButton type="sortie" onSignaler={(raison,detail)=>{if(onReport)onReport({type:"sortie",titre:sortie.nom,raison,detail:detail||"",signalePar:"utilisateur@parentales.fr",dept:sortie.dept,prix:sortie.prix,ville:sortie.ville,categorie:sortie.type});}}/>
      </div>
    </div>
  );
}

function ActivityDetailPage({activity,isFavorite,onToggleFavorite,onBack,onReport}){
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
  const tndRows=[{label:"TSA",bg:"#EEEDFE",col:"#3C3489",stars:4,avis:"1 avis"},{label:"TDAH",bg:"#E1F5EE",col:"#085041",stars:5,avis:"1 avis"},{label:"DYS",bg:"#FAEEDA",col:"#633806",stars:0,avis:null}];
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail de l activite</span></div>
      <div style={{background:"linear-gradient(135deg,#EEEDFE,#DDD9FD)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:64,marginBottom:8,lineHeight:1}}>{emoji}</div><div style={{display:"inline-block",background:V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{categorie}</div><div style={{fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:6}}>{titre}</div><div style={{fontSize:12,color:"#6B7280",display:"flex",justifyContent:"center",gap:12}}>{duree&&<span>{duree}</span>}{difficulte&&<span>{difficulte}</span>}{lieuLabel&&<span>{lieuLabel}</span>}</div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{label:"Motivation",val:motLabel},{label:"Age conseille",val:activity.age||"Tous ages"},{label:"Difficulte",val:difficulte||"-"}].map(({label,val},i)=>(<div key={label} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<2?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:12,color:"#9CA3AF",width:80,flexShrink:0}}>{label}</span><span style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</span></div>))}</div>
        <div style={card}>{sec("Materiel")}{materiel?<div>{materiel.map((m,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,background:BG,borderRadius:20,padding:"4px 10px",fontSize:12,color:"#374151",margin:3}}>{m}</span>))}</div>:<span style={{fontSize:13,color:TM}}>Aucun materiel necessaire !</span>}</div>
        <div style={card}>{sec("Etapes")}{etapes?etapes.map((e,i)=>(<div key={i} style={{display:"flex",gap:10,padding:"6px 0"}}><div style={{width:22,height:22,borderRadius:"50%",background:V,color:WH,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div><div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{e}</div></div>)):<span style={{fontSize:13,color:TM}}>Laissez parler votre creativite !</span>}</div>
        <div style={card}>{sec("Notes")}<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28,fontWeight:700,color:"#1a1a1a"}}>4.3</span><div><Stars count={4} size={14}/><div style={{fontSize:11,color:"#9CA3AF"}}>4 avis</div></div></div>{tndRows.map(({label,bg,col,stars,avis},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{background:bg,color:col,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{label}</span>{avis?(<><Stars count={stars} size={12}/><span style={{fontSize:11,color:"#9CA3AF"}}>{avis}</span></>):(<><span style={{fontSize:11,color:"#9CA3AF"}}>Pas encore</span><span/></>)}</div>))}</div>
        <AvisForm/>
        <button onClick={onToggleFavorite} style={{width:"100%",background:isFavorite?"#FCEBEB":V,color:isFavorite?"#A32D2D":WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>{isFavorite?"Retirer des favoris":"Ajouter aux favoris"}</button>
        <button style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer"}}>Partager</button>
        <SignalementButton type="activite" onSignaler={(raison,detail)=>{if(onReport)onReport({type:"activite",titre:activity.nom||activity.titre||activity.title,raison,detail:detail||"",signalePar:"utilisateur@parentales.fr",categorie:activity.categorie,lieu:activity.lieu,age:activity.age});}}/>
      </div>
    </div>
  );
}

function EvenementDetail({evt,onBack,onReport}){
  const cat=EVT_CATEGORIES.find(c=>c.k===evt.categorie)||{emoji:"🎉",label:""};
  const card={background:WH,borderRadius:16,padding:14,marginBottom:12,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"};
  const sec=(t)=>(<div style={{fontSize:12,fontWeight:600,color:V,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{t}</div>);
  return(
    <div style={{position:"fixed",inset:0,background:BG,zIndex:50,overflowY:"auto",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:WH,padding:16,display:"flex",alignItems:"center",gap:10,borderBottom:"0.5px solid #E5E5E5",position:"sticky",top:0,zIndex:10}}><button onClick={onBack} style={{width:32,height:32,borderRadius:"50%",background:BG,border:"none",cursor:"pointer",fontSize:14}}>←</button><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>Detail evenement</span></div>
      <div style={{background:"linear-gradient(135deg,#FFF7ED,#FEE2CE)",padding:"28px 20px",textAlign:"center"}}><div style={{fontSize:56,marginBottom:8,lineHeight:1}}>{cat.emoji}</div><div style={{display:"inline-block",background:V,color:WH,fontSize:11,padding:"3px 12px",borderRadius:20,marginBottom:8}}>{cat.label||evt.categorie}</div><div style={{fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:6}}>{evt.nom}</div><div style={{fontSize:12,color:"#6B7280",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}><span>{evt.ville}</span><span>{evt.prix}</span><span>{evt.age}</span></div></div>
      <div style={{padding:16}}>
        <div style={card}>{sec("Informations")}{[{icon:"📍",label:"Lieu",val:evt.ville},{icon:"📅",label:"Date",val:evt.date},{icon:"🎫",label:"Tarif",val:evt.prix},{icon:"👶",label:"Age",val:evt.age}].map(({icon,label,val},i,arr)=>(<div key={label} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:i<arr.length-1?"0.5px solid #F3F4F6":"none"}}><span style={{fontSize:14,width:20,flexShrink:0,marginTop:1}}>{icon}</span><div style={{flex:1}}><div style={{fontSize:11,color:"#9CA3AF",marginBottom:2}}>{label}</div><div style={{fontSize:13,color:"#1a1a1a",fontWeight:500}}>{val}</div></div></div>))}</div>
        <div style={card}>{sec("Description")}<p style={{fontSize:13,color:"#374151",lineHeight:1.6,margin:0}}>{evt.desc}</p></div>
        <div style={card}>{sec("Adapte TND")}<TNDBadgesEvt tnd={evt.tnd}/></div>
        <button style={{width:"100%",background:V,color:WH,border:"none",borderRadius:28,padding:14,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>Sauvegarder</button>
        <button style={{width:"100%",background:WH,color:V,border:"1.5px solid "+V,borderRadius:28,padding:12,fontSize:14,cursor:"pointer"}}>Partager</button>
        <SignalCardBtn id={"evtdetail_"+(evt.id||evt.nom)} titre={evt.titre||evt.nom} type="evenement" onReport={onReport}/>
      </div>
    </div>
  );
}

function EvtCard({e,onClick,onReport}){
  const cat=EVT_CATEGORIES.find(c=>c.k===e.categorie);
  const catEmoji=cat?cat.emoji:"🎉";
  const tooMany=(e.signalements||0)>=3;
  const tnd=e.tnd||{};
  const tndItems=[
    {l:"Son",v:tnd.son==="calme"?"Calme":tnd.son==="moyenne"?"Moyenne":"Forte",c:tnd.son==="calme"?"#065F46":"#92400E",bg:tnd.son==="calme"?"#D1FAE5":"#FEF3C7",icon:"🔈"},
    {l:"Affluence",v:tnd.affluence==="faible"?"Faible":tnd.affluence==="moyenne"?"Moyenne":"Forte",c:"#1E3A5F",bg:"#DBEAFE",icon:"👥"},
    {l:"Previsibilite",v:tnd.prevision==="structuree"?"Structuree":"Imprevisible",c:tnd.prevision==="structuree"?"#065F46":"#991B1B",bg:tnd.prevision==="structuree"?"#D1FAE5":"#FEE2E2",icon:"🔮"},
    {l:"Zone calme",v:tnd.zonecalme?"Oui":"Non",c:"#374151",bg:"#F0FDF4",icon:"🌿"},
  ];
  if(tooMany)return(<div style={{background:"#FFF3E0",borderRadius:16,padding:16,border:"1px solid #FDE68A",display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{fontSize:20}}>⚠️</span><p style={{margin:0,fontSize:13,color:"#92400E"}}>Cet evenement est en cours de verification par l equipe.</p></div>);
  return(
    <div style={{background:WH,borderRadius:16,overflow:"hidden",border:BD,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
      <div style={{position:"relative",height:160,background:"linear-gradient(135deg,#EDE9FF,#C4B5FD)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={onClick}>
        <span style={{fontSize:64}}>{catEmoji}</span>
        <div style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:WH,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}><span style={{fontSize:16}}>🤍</span></div>
        <div style={{position:"absolute",top:10,left:10,background:e.gratuit?"#D1FAE5":"#FEF3C7",borderRadius:20,padding:"3px 10px"}}><span style={{fontSize:11,fontWeight:600,color:e.gratuit?"#065F46":"#92400E"}}>{e.prix}</span></div>
      </div>
      <div style={{padding:"12px 14px"}} onClick={onClick}>
        <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 4px"}}>{e.nom}</h3>
        <div style={{display:"flex",gap:12,marginBottom:10}}><span style={{fontSize:12,color:TM}}>📅 {e.date}</span><span style={{fontSize:12,color:TM}}>📍 {e.ville}</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>{tndItems.map(({l,v,c,bg,icon})=>(<div key={l} style={{background:bg,borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{icon}</span><div><div style={{fontSize:10,color:TM}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:c}}>{v}</div></div></div>))}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:TM}}>👥 {e.age}</span><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{color:"#F5A623",fontSize:13}}>★</span><span style={{fontSize:12,fontWeight:600,color:TX}}>{e.note||"4.5"}</span><span style={{fontSize:11,color:TM}}>(12 avis)</span></div></div>
      </div>
      <div style={{borderTop:"1px solid #F3F4F6",padding:"8px 14px",display:"flex",justifyContent:"flex-end"}}>
        <SignalCardBtn id={"evt_"+e.id} titre={e.nom||e.titre} type="evenement" onReport={onReport}/>
      </div>
    </div>
  );
}

function PageBiblio({pendingContribs=[],setPendingContribs,adminActivites=[],addReport,adminReports=[],deletedTitles=new Set()}){
  const [tab,setTab]=useState("activites");
  const [detail,setDetail]=useState(null);
  const [evtDetail,setEvtDetail]=useState(null);
  const [filterLieu,setFilterLieu]=useState("");
  const [filterMotiv,setFilterMotiv]=useState("");
  const [filterCategorie,setFilterCategorie]=useState("");
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
  const [signaledByMe,setSignaledByMe]=useState({});
  const [signalMenu,setSignalMenu]=useState(null);
  const [toast,setToast]=useState("");
  const [showAutrePopup,setShowAutrePopup]=useState(false);
  const [typeEvtForm,setTypeEvtForm]=useState("");
  const [typeAutreForm,setTypeAutreForm]=useState("");
  const [typeAutreTemp,setTypeAutreTemp]=useState("");

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),3000);};
  const handleSubmitEvt=(data)=>{setPendingContribs(prev=>[{...data,id:Date.now(),_type:"evenement",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:""},...prev]);setShowFormEvt(false);setTypeEvtForm("");setTypeAutreForm("");showToast("Evenement soumis, en attente de validation !");};
  const [signalRaison,setSignalRaison]=useState("Informations manquantes");
  const handleSignaler=(evtId)=>{
    const evtItem=evenements.find(e=>e.id===evtId)||pendingContribs.find(c=>c.id===evtId);
    setEvenements(prev=>prev.map(e=>e.id===evtId?{...e,signalements:(e.signalements||0)+1}:e));
    setPendingContribs(prev=>prev.map(c=>c.id===evtId||("evt_"+c.id)===evtId?{...c,_signalements:(c._signalements||0)+1,_raisonSignalement:signalRaison}:c));
    if(addReport)addReport({type:"evenement",titre:evtItem?.titre||evtItem?.nom||("Evenement #"+evtId),raison:signalRaison,signalePar:"utilisateur@parentales.fr",detail:""});
    setSignaledByMe(prev=>({...prev,[evtId]:true}));setSignalMenu(null);showToast("Signalement pris en compte.");
  };
  const CATEGORIES_ACT=[...new Set(ACTIVITES.map(a=>a.categorie))];
  const pendingActIds=new Set(pendingContribs.filter(c=>c._type==="activite"&&c._statut==="pending").map(c=>c.id));
  const approvedActs=pendingContribs.filter(c=>c._type==="activite"&&c._statut==="published");
  const adminPublished=(adminActivites||[]).filter(a=>a.statut==="published"&&!ACTIVITES.find(x=>x.id===a.id));
  // Items avec signalement pending -> masqués jusqu'à résolution
  const blockedTitles=new Set([...adminReports.filter(r=>r.statut==="pending").map(r=>r.titre),...deletedTitles]);
  const actFiltered=[...ACTIVITES,...adminPublished,...approvedActs].filter(a=>!blockedTitles.has(a.nom)&&!blockedTitles.has(a.titre)).filter(a=>
    (!filterLieu||a.lieu===filterLieu)&&
    (!filterMotiv||a.energie===filterMotiv)&&
    (!filterCategorie||a.categorie===filterCategorie)
  );
  const approvedSorts=pendingContribs.filter(c=>c._type==="sortie"&&c._statut==="published");
  const sortFiltered=[...SORTIES,...approvedSorts].filter(s=>!blockedTitles.has(s.nom)).filter(s=>(!filterDept||s.dept===filterDept)&&(!filterType||s.type===filterType));
  const signaler=(id)=>setSigSort(prev=>({...prev,[id]:(prev[id]||0)+1}));
  const cardStyle={background:WH,borderRadius:14,padding:"14px 16px",border:BD,cursor:"pointer"};
  const selStyle={flex:1,padding:"8px 10px",borderRadius:10,border:BD,background:WH,fontSize:13};

  const approvedEvts=pendingContribs.filter(c=>c._type==="evenement"&&c._statut==="published");
  const allEvts=[...evenements,...approvedEvts].filter(e=>!blockedTitles.has(e.titre)&&!blockedTitles.has(e.nom));
  const evtFiltered=allEvts.filter(e=>{
    if(evtCat&&e.categorie!==evtCat)return false;
    if(evtDept&&e.dept!==evtDept)return false;
    if(evtDateDe&&e.date<evtDateDe)return false;
    if(evtDateA&&e.date>evtDateA)return false;
    return true;
  });

  const byDate={};
  evtFiltered.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});

  const formatDate=(d)=>{if(!d)return"";const p=d.split("-");return p[2]+" "+MOIS[parseInt(p[1])];};
  const jourLabel=(d)=>{const days=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];return days[new Date(d).getDay()];};
  const genEvt=()=>{const free=evtFiltered.filter(e=>e.gratuit);const paid=evtFiltered.filter(e=>!e.gratuit);setEvtResult({free:free.slice(0,3),premium:paid.slice(0,1)});};

  const PropBtn=()=>(<>
    <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:16,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}>
      <span style={{fontSize:16,flexShrink:0}}>👶</span>
      <p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les evenements proposes doivent etre destines aux enfants ou aux familles.</p>
    </div>
    <button onClick={()=>setShowFormEvt(true)} style={{width:"100%",marginTop:10,padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>Proposer un evenement</button>
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
        <h1 style={{fontSize:20,fontWeight:600,color:TX,margin:"0 0 16px"}}>Bibliotheque</h1>
        <div style={{display:"flex",gap:6,background:WH,borderRadius:14,padding:4,border:BD}}>
          {["activites","sorties","evenements"].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:tab===t?V:"transparent",color:tab===t?WH:TM,fontSize:13,fontWeight:500,cursor:"pointer"}}>{t==="activites"?"Activites":t==="sorties"?"Sorties":"Evenements"}</button>))}
        </div>
      </div>
      <div style={{padding:"12px 16px"}}>
        {tab==="activites"&&(
          <>
            <div style={{marginBottom:14}}>
              <p style={{fontSize:12,fontWeight:700,color:TM,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Lieu</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                {[{val:"",label:"Tous"},{val:"interieur",label:"🏠 Intérieur"},{val:"exterieur",label:"🌳 Extérieur"}].map(o=>(
                  <button key={o.val} onClick={()=>setFilterLieu(o.val)} style={{padding:"7px 14px",borderRadius:20,border:"2px solid "+(filterLieu===o.val?V:"rgba(108,92,231,0.15)"),background:filterLieu===o.val?VL:WH,color:filterLieu===o.val?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{o.label}</button>
                ))}
              </div>
              <p style={{fontSize:12,fontWeight:700,color:TM,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Motivation</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                {[{val:"",label:"Toutes"},{val:"fatigue",label:"😴 Fatigué"},{val:"motiv",label:"🚀 Motivé"}].map(o=>(
                  <button key={o.val} onClick={()=>setFilterMotiv(o.val)} style={{padding:"7px 14px",borderRadius:20,border:"2px solid "+(filterMotiv===o.val?V:"rgba(108,92,231,0.15)"),background:filterMotiv===o.val?VL:WH,color:filterMotiv===o.val?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{o.label}</button>
                ))}
              </div>
              <p style={{fontSize:12,fontWeight:700,color:TM,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Type d activite</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:4}}>
                <button onClick={()=>setFilterCategorie("")} style={{padding:"7px 14px",borderRadius:20,border:"2px solid "+(filterCategorie===""?V:"rgba(108,92,231,0.15)"),background:filterCategorie===""?VL:WH,color:filterCategorie===""?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>Tous</button>
                {CATEGORIES_ACT.map(c=>(
                  <button key={c} onClick={()=>setFilterCategorie(filterCategorie===c?"":c)} style={{padding:"7px 14px",borderRadius:20,border:"2px solid "+(filterCategorie===c?V:"rgba(108,92,231,0.15)"),background:filterCategorie===c?VL:WH,color:filterCategorie===c?V:TX,fontWeight:600,fontSize:12,cursor:"pointer"}}>{c}</button>
                ))}
              </div>
              {(filterLieu||filterMotiv||filterCategorie)&&(
                <button onClick={()=>{setFilterLieu("");setFilterMotiv("");setFilterCategorie("");}} style={{background:"none",border:"none",color:V,fontSize:12,cursor:"pointer",padding:"8px 0 0",fontWeight:600}}>Effacer les filtres ×</button>
              )}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {actFiltered.map(a=>(<div key={a.id} onClick={()=>setDetail({item:a,type:"activite"})} style={cardStyle}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,background:VL,color:V,padding:"2px 8px",borderRadius:10,fontWeight:500}}>{a.categorie}</span><span style={{fontSize:12,color:TM}}>{a.lieu==="interieur"?"🏠":"🌳"}</span></div><h3 style={{fontSize:15,fontWeight:500,color:TX,margin:"6px 0 2px"}}>{a.nom}</h3><p style={{fontSize:12,color:TM,margin:"0 0 6px"}}>{a.age}</p><TND tnd={a.tnd}/>{a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:10,background:e.bg||"#EDE9FF",color:e.color||V,padding:"2px 8px",borderRadius:10,fontWeight:600,border:`1px solid ${(e.color||V)+"33"}`}}>{e.label}</span>)}</div>}<div style={{marginTop:8,textAlign:"right"}}><SignalCardBtn id={"act_"+a.id} titre={a.nom} type="activite" onReport={addReport}/></div></div>))}
            </div>
            <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:14,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les activites proposees doivent etre destinees aux enfants.</p></div>
            <button onClick={()=>setDetail({item:null,type:"form_activite"})} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,background:BG,border:"1.5px dashed "+V,color:V,fontWeight:600,fontSize:14,cursor:"pointer"}}>Proposer une activite</button>
          </>
        )}
        {tab==="sorties"&&(
          <>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              <select value={filterDept} onChange={e=>setFilterDept(e.target.value)} style={{...selStyle,flex:"none",width:"100%"}}><option value="">Tous les departements</option>{DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}</select>
              <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{...selStyle,flex:"none",width:"100%"}}><option value="">Tous les types de sortie</option>{TYPES_SORTIE.map(t=><option key={t} value={t}>{t}</option>)}</select>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {sortFiltered.filter(s=>(sigSort[s.id]||0)<3).map(s=>(<div key={s.id} onClick={()=>setDetail({item:s,type:"sortie"})} style={cardStyle}><div style={{display:"flex",justifyContent:"space-between"}}><div><span style={{fontSize:11,background:VL,color:V,padding:"2px 8px",borderRadius:10,fontWeight:500}}>{s.type}</span>{s.badge==="communaute"&&<span style={{fontSize:11,background:"#FFF3E0",color:OR,padding:"2px 8px",borderRadius:10,marginLeft:4}}>Communaute</span>}</div><span style={{color:V,fontSize:11}}>{"★".repeat(Math.round(s.note))}{"☆".repeat(5-Math.round(s.note))} <span style={{color:TM,fontSize:11}}>{s.note.toFixed(1)}</span></span></div><h3 style={{fontSize:15,fontWeight:500,color:TX,margin:"6px 0 2px"}}>{s.nom}</h3><p style={{fontSize:12,color:TM,margin:"0 0 6px"}}>{s.ville} - Dept {s.dept} - {s.prix}</p><TND tnd={s.tnd}/>{s.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>{s.etiquettes.map((e,i)=><span key={i} style={{fontSize:10,background:e.bg||"#EDE9FF",color:e.color||V,padding:"2px 8px",borderRadius:10,fontWeight:600,border:`1px solid ${(e.color||V)+"33"}`}}>{e.label}</span>)}</div>}<div style={{marginTop:8,textAlign:"right"}}><SignalCardBtn id={"sort_"+s.id} titre={s.nom} type="sortie" onReport={addReport}/></div></div>))}
            </div>
            <div style={{background:"#FFFBEB",borderRadius:12,padding:"10px 14px",marginTop:14,border:"1px solid #FDE68A",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>👶</span><p style={{margin:0,fontSize:12,color:"#92400E",lineHeight:1.5}}>Les sorties proposees doivent etre adaptees aux enfants.</p></div>
            <button onClick={()=>setDetail({item:null,type:"form_sortie"})} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,background:BG,border:"1.5px dashed "+V,color:V,fontWeight:600,fontSize:14,cursor:"pointer"}}>Proposer une sortie</button>
          </>
        )}
        {tab==="evenements"&&(
          <>
            <div style={{display:"flex",gap:6,marginBottom:14}}>{[{k:"calendrier",l:"Calendrier"},{k:"generateur",l:"Generateur"}].map(({k,l})=>(<button key={k} onClick={()=>setEvtView(k)} style={{flex:1,padding:"8px 4px",borderRadius:12,border:"1.5px solid "+(evtView===k?V:BD),background:evtView===k?VL:WH,color:evtView===k?V:TM,fontSize:12,cursor:"pointer"}}>{l}</button>))}</div>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:8,scrollbarWidth:"none"}}>
              <button onClick={()=>setEvtCat("")} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid "+(evtCat===""?V:BD),background:evtCat===""?VL:WH,color:evtCat===""?V:TM,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>Tout</button>
              {EVT_CATEGORIES.map(c=>(<button key={c.k} onClick={()=>setEvtCat(evtCat===c.k?"":c.k)} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid "+(evtCat===c.k?V:BD),background:evtCat===c.k?VL:WH,color:evtCat===c.k?V:TM,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{c.emoji} {c.label}</button>))}
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
                  return(<div key={date} style={{marginBottom:12}}><div style={{background:V,borderRadius:10,padding:"6px 14px",marginBottom:10,display:"inline-flex"}}><span style={{fontSize:12,fontWeight:700,color:WH}}>{jourLabel(date)} {formatDate(date)}</span></div>{evtsDate.map(e=><EvtCard key={e.id} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport}/>)}</div>);
                })}
                {Object.keys(byDate).length===0&&<div style={{textAlign:"center",padding:"40px 0",color:TM}}><p style={{fontSize:32}}>📭</p><p style={{fontSize:14}}>Aucun evenement trouve.</p></div>}
                <PropBtn/>
              </div>
            )}
            {evtView==="generateur"&&(
              <div>
                <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
                  <h3 style={{fontSize:15,fontWeight:600,color:TX,margin:"0 0 12px"}}>Trouve-moi un evenement</h3>
                  <button onClick={genEvt} style={{width:"100%",padding:13,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Generer des evenements</button>
                </div>
                {evtResult&&(<>
                  {evtResult.free.length>0&&(<div style={{marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:GR,margin:"0 0 8px"}}>Gratuit ({evtResult.free.length})</p>{evtResult.free.map(e=><EvtCard key={e.id} e={e} onClick={()=>setEvtDetail(e)} onReport={addReport}/>)}</div>)}
                  {evtResult.premium.length>0&&(<div><p style={{fontSize:12,fontWeight:600,color:OR,margin:"0 0 8px"}}>Premium</p>{evtResult.premium.map(e=>(<div key={e.id} style={{opacity:0.6,pointerEvents:"none"}}><EvtCard e={e} onClick={()=>{}}/></div>))}<button style={{width:"100%",padding:11,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:13,cursor:"pointer",marginTop:4}}>Passer Premium</button></div>)}
                  {evtResult.free.length===0&&evtResult.premium.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:TM}}><p style={{fontSize:32}}>📭</p><p>Aucun evenement.</p></div>}
                </>)}
                <PropBtn/>
              </div>
            )}
          </>
        )}
      </div>
      {detail&&detail.type==="activite"&&<ActivityDetailPage activity={detail.item} isFavorite={false} onToggleFavorite={()=>{}} onBack={()=>setDetail(null)} onReport={addReport}/>}
      {detail&&detail.type==="sortie"&&<SortieDetailPage sortie={detail.item} isFavorite={false} onToggleFavorite={()=>{}} onBack={()=>setDetail(null)} onReport={addReport}/>}
      {detail&&detail.type==="form_activite"&&<FormActivite onClose={()=>setDetail(null)} onSubmit={(item)=>{setPendingContribs(prev=>[{...item,id:Date.now(),_type:"activite",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:""},...prev]);setDetail(null);showToast("Activite soumise, en attente de validation !");}}/>}
      {detail&&detail.type==="form_sortie"&&<FormSortie onClose={()=>setDetail(null)} onSubmit={(item)=>{setPendingContribs(prev=>[{...item,id:Date.now(),_type:"sortie",_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:""},...prev]);setDetail(null);showToast("Sortie soumise, en attente de validation !");}}/>}
      {evtDetail&&<EvenementDetail evt={evtDetail} onBack={()=>setEvtDetail(null)} onReport={addReport}/>}
      {showFormEvt&&(<FormEvenement onClose={()=>{setShowFormEvt(false);setTypeEvtForm("");setTypeAutreForm("");}} onSubmit={handleSubmitEvt} onOpenAutrePopup={()=>{setTypeAutreTemp(typeAutreForm);setShowAutrePopup(true);}} typeAutre={typeAutreForm} typeEvt={typeEvtForm} setTypeEvt={setTypeEvtForm}/>)}
      {showAutrePopup&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}><div style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}><p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX,textAlign:"center"}}>Autre type</p><input value={typeAutreTemp} onChange={e=>setTypeAutreTemp(e.target.value)} placeholder="Ex : Festival, Portes ouvertes..." style={{padding:"12px 14px",borderRadius:12,border:"1.5px solid "+V,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none",marginBottom:16}}/><div style={{display:"flex",gap:10}}><button onClick={()=>setShowAutrePopup(false)} style={{flex:1,padding:"11px 0",borderRadius:28,background:BG,border:"1px solid #E5E7EB",color:TX,fontSize:14,cursor:"pointer"}}>Annuler</button><button onClick={()=>{if(typeAutreTemp.trim()){setTypeAutreForm(typeAutreTemp.trim());setTypeEvtForm("autre");}setShowAutrePopup(false);}} style={{flex:1,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>Confirmer</button></div></div></div>)}
      {signalMenu!==null&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setSignalMenu(null)}><div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:16,padding:16,maxWidth:280,width:"90%"}}><p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:TX,textAlign:"center"}}>Pourquoi signaler ?</p>{[["Informations manquantes","#F59E0B"],["Contenu inapproprie","#EF4444"],["Information incorrecte","#F97316"],["Doublon","#6B7280"]].map(([r,c],i,arr)=>(<div key={r} onClick={()=>{setSignalRaison(r);handleSignaler(signalMenu);}} style={{padding:12,borderBottom:i<arr.length-1?"1px solid #F3F4F6":"none",cursor:"pointer"}}><span style={{fontSize:13,color:c}}>{r}</span></div>))}<button onClick={()=>setSignalMenu(null)} style={{display:"block",width:"100%",marginTop:8,padding:"8px 0",background:"none",border:"none",color:TM,fontSize:13,cursor:"pointer",textAlign:"center"}}>Annuler</button></div></div>)}
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

const JOUR_ACTUEL = 7; // simulé

const MOIS_FR = ["janv","févr","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"];
const formatJour = (n:number) => `${n} décembre`;

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

function Toast({msg}){
  return(
    <div style={{position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",background:GREEN,color:WH,borderRadius:28,padding:"10px 22px",fontSize:13,fontWeight:700,zIndex:900,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
      {msg}
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
function LutinView({onBack}){
  const [calendrier,setCalendrier] = useState(
    Array.from({length:24},(_,i)=>({jour:i+1,betise:bibliotheque[i],debloque:true}))
  );
  const [jourSelectionne,setJourSelectionne] = useState(null);
  const [showBibliotheque,setShowBibliotheque] = useState(false);
  const [jourARemplacer,setJourARemplacer] = useState(null);
  const [showCourses,setShowCourses] = useState(false);
  const [checked,setChecked] = useState({});
  const [toast,setToast] = useState<string|null>(null);

  const showToast=(msg:string)=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const jourData = jourSelectionne!=null ? calendrier.find(c=>c.jour===jourSelectionne) : null;

  const remplacerBetise=(betise:any)=>{
    if(jourARemplacer==null)return;
    setCalendrier(prev=>prev.map(c=>c.jour===jourARemplacer?{...c,betise}:c));
    setShowBibliotheque(false);
    setJourSelectionne(null);
    setJourARemplacer(null);
    showToast("✅ Bêtise changée !");
  };

  // Liste de courses agrégée
  const tousMateriels = calendrier.flatMap(c=>c.betise.materiel);
  const materielUnique = [...new Set(tousMateriels)].sort();
  const toggleChecked=(m:string)=>setChecked(prev=>({...prev,[m]:!prev[m]}));
  const toutCocher=()=>{const all:Record<string,boolean>={};materielUnique.forEach(m=>all[m]=true);setChecked(all);};

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
          return(
            <button key={jour} onClick={()=>setJourSelectionne(jour)} style={{
              background:isToday?"rgba(245,166,35,0.2)":"rgba(255,255,255,0.08)",
              border:`1.5px solid ${isToday?GOLD:"rgba(255,255,255,0.15)"}`,
              borderRadius:12,padding:"10px 4px 8px",cursor:"pointer",
              boxShadow:isToday?"0 0 14px rgba(245,166,35,0.4)":"none",
              display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              transition:"all 0.15s",position:"relative",
            }}>
              {isToday&&<div style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",background:GOLD,borderRadius:20,padding:"1px 7px",fontSize:8,fontWeight:800,color:"#000",whiteSpace:"nowrap"}}>Aujourd'hui</div>}
              <span style={{fontSize:18,fontWeight:800,color:isToday?GOLD:WH}}>{jour}</span>
              <span style={{fontSize:20}}>{betise.emoji}</span>
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
                <button style={{background:"rgba(124,58,237,0.25)",border:"1px solid rgba(124,58,237,0.4)",borderRadius:20,padding:"4px 10px",color:"#c4b5fd",fontSize:11,fontWeight:600,cursor:"pointer"}}>🛒 Acheter</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL DÉTAIL BÊTISE ───────────────────────────────────────────── */}
      {jourSelectionne!=null&&jourData&&!showBibliotheque&&(
        <Overlay onClick={()=>setJourSelectionne(null)}>
          <Sheet>
            <div style={{padding:"18px 20px 32px"}}>
              <p style={{margin:"0 0 4px",fontSize:12,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Jour {jourData.jour} — {formatJour(jourData.jour)}</p>
              <div style={{textAlign:"center",margin:"16px 0 12px"}}>
                <div style={{fontSize:72,marginBottom:8,lineHeight:1}}>{jourData.betise.emoji}</div>
                <p style={{margin:"0 0 8px",fontSize:18,fontWeight:800,color:WH,lineHeight:1.3}}>{jourData.betise.titre}</p>
                <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.75)",lineHeight:1.6}}>{jourData.betise.description}</p>
              </div>

              {/* Matériel */}
              <div style={{marginBottom:22}}>
                <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:WH}}>🧺 Matériel nécessaire</p>
                {jourData.betise.materiel.length===0?(
                  <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:0}}>Aucun matériel nécessaire 🎉</p>
                ):(
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {jourData.betise.materiel.map(m=>(
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
          </Sheet>
        </Overlay>
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

function EvtGenerateur({evt,activites,favoris,setFavoris}){
  const [genResult,setGenResult]=useState(null);
  const genActivity=()=>setGenResult(activites[Math.floor(Math.random()*activites.length)]);
  const isFav=genResult&&favoris.some(f=>f.id===genResult.id&&f._type==="activite");
  return(
    <div style={{background:`linear-gradient(135deg,${evt.couleur}18,${evt.couleur}08)`,borderRadius:20,padding:"18px 16px",border:`1.5px solid ${evt.couleur}33`,marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:12,background:evt.couleur+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎲</div>
        <div>
          <p style={{margin:0,fontSize:15,fontWeight:700,color:TX}}>Générateur {evt.nom}</p>
          <p style={{margin:0,fontSize:12,color:TM}}>Une idée d'activité au hasard</p>
        </div>
      </div>
      {genResult?(
        <div style={{background:WH,borderRadius:14,padding:"14px 14px 10px",marginBottom:12,border:"1px solid rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
            <span style={{fontSize:11,background:evt.couleur+"22",color:evt.couleur,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{genResult.categorie}</span>
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
        <button onClick={genActivity} style={{flex:1,padding:"11px 0",borderRadius:28,background:evt.couleur,border:"none",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {genResult?"🔄 Une autre":"✨ Générer une activité"}
        </button>
        {genResult&&<button onClick={()=>setFavoris(prev=>{if(isFav||prev.length>=15)return prev;return[...prev,{...genResult,nom:genResult.titre,_type:"activite"}];})} style={{flex:1,padding:"11px 0",borderRadius:28,background:isFav?BG:WH,border:`1.5px solid ${evt.couleur}`,color:evt.couleur,fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {isFav?"❤️ Sauvegardé":"❤️ Sauvegarder"}
        </button>}
      </div>
    </div>
  );
}

function PageAccueil({favoris,setFavoris,setPage,customEvents=[],popupShown=new Set(),setPopupShown,ideesMomentConfig=[]}){
  const [tick,setTick]=useState(0);
  useState(()=>{ const t=setInterval(()=>setTick(p=>p+1),30000); const cleanup=()=>clearInterval(t); return cleanup; });
  const [resultA,setResultA]=useState(null);
  const [resultS,setResultS]=useState(null);
  const [showFiltres,setShowFiltres]=useState(false);
  const [showEvtBiblio,setShowEvtBiblio]=useState(null); // evt object or null
  const [showFichier,setShowFichier]=useState(null); // fichier object or null
  const today=new Date().toISOString().split("T")[0];
  const activeCustomEvents=customEvents.filter(e=>e.actif&&(!e.dateDebut||e.dateDebut<=today)&&(!e.dateFin||e.dateFin>=today));
  const activeBanners=activeCustomEvents.filter(e=>e.banner);
  const pendingPopups=activeCustomEvents.filter(e=>e.popup&&!popupShown.has(e.id));
  const [currentPopup,setCurrentPopup]=useState(null);
  useState(()=>{if(pendingPopups.length>0&&!currentPopup){setCurrentPopup(pendingPopups[0]);if(setPopupShown)setPopupShown(prev=>new Set([...prev,pendingPopups[0].id]));}}); 
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
  const ALL_LUTIN_MAT=[...new Set(LUTINS_ACTIVITES.flatMap(a=>a.materiel))].filter(Boolean).sort();
  const [lutinMat,setLutinMat]=useState([]);
  const toggleLutinMat=(m)=>setLutinMat(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m]);
  const lutinFiltered=LUTINS_ACTIVITES.filter(a=>
    lutinMat.length===0||a.materiel.length===0||a.materiel.every(m=>lutinMat.includes(m))
  );
  const [lieu,setLieu]=useState(null);
  const [energie,setEnergie]=useState(null);
  const [ageEnfant,setAgeEnfant]=useState(null);
  const AGE_OPTIONS=["0-2 ans","2-4 ans","4-7 ans","7-10 ans","10-12 ans"];
  const genActivite=()=>{
    const pool=ACTIVITES.filter(a=>(!lieu||a.lieu===lieu)&&(!energie||a.energie===energie));
    const source=pool.length?pool:ACTIVITES;
    setResultA(source[Math.floor(Math.random()*source.length)]);
    setShowFiltres(false);
  };
  const [showFiltresSortie,setShowFiltresSortie]=useState(false);
  const [deptS,setDeptS]=useState("");
  const [typeS,setTypeS]=useState("");
  const [ageS,setAgeS]=useState(null);
  const [tndS,setTndS]=useState(null);
  const [prixS,setPrixS]=useState(null);
  const AGE_SORTIE=["0-2 ans","2-4 ans","4-7 ans","7-10 ans","10-12 ans"];
  const TND_OPTIONS=[{val:"tsa",label:"TSA",color:"#8B5CF6"},{val:"tdah",label:"TDAH",color:"#EC4899"},{val:"dys",label:"DYS",color:"#06B6D4"}];
  const PRIX_OPTIONS=[{val:"gratuit",label:"🆓 Gratuit"},{val:"moins20",label:"< 20 €"},{val:"moins40",label:"< 40 €"},{val:"plus40",label:"40 € +"}];
  const genSortie=()=>{
    const pool=SORTIES.filter(s=>{
      if(deptS&&s.dept!==deptS)return false;
      if(typeS&&s.type!==typeS)return false;
      if(tndS&&s.tnd[tndS]<4)return false;
      if(prixS==="gratuit"&&s.prix!=="Gratuit")return false;
      if(prixS==="moins20"){const n=parseFloat(s.prix);if(s.prix!=="Gratuit"&&(isNaN(n)||n>=20))return false;}
      if(prixS==="moins40"){const n=parseFloat(s.prix);if(s.prix!=="Gratuit"&&(isNaN(n)||n>=40))return false;}
      if(prixS==="plus40"){const n=parseFloat(s.prix);if(isNaN(n)||n<40)return false;}
      return true;
    });
    const source=pool.length?pool:SORTIES;
    setResultS(source[Math.floor(Math.random()*source.length)]);
    setShowFiltresSortie(false);
  };
  const toggleFav=(item)=>{const t=resultA?"activite":"sortie";setFavoris(prev=>{const exists=prev.find(f=>f.id===item.id&&f._type===t);if(exists)return prev.filter(f=>!(f.id===item.id&&f._type===t));if(prev.length>=15)return prev;return[...prev,{...item,_type:t}];});if(resultA)setResultA(null);else setResultS(null);};
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
    {
      id:"anniversaire",
      label:"Anniversaire",
      nom:"Idees pour feter ca",
      admin:false,
      gradient:"linear-gradient(135deg,#93c5fd 0%,#2563eb 100%)",
      color:"#fff",
      illustration:(
        <svg viewBox="0 0 100 80" width="100" height="80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="28" fill="rgba(255,255,255,0.18)"/>
          <text x="50" y="52" textAnchor="middle" fontSize="34">🎂</text>
          <circle cx="30" cy="18" r="6" fill="rgba(255,255,255,0.2)"/>
          <circle cx="73" cy="58" r="5" fill="rgba(255,255,255,0.15)"/>
        </svg>
      )
    },
  ];
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:8}}>
      {showLutinView&&<LutinView onBack={()=>setShowLutinView(false)}/>}
      <div style={{padding:"18px 16px 0"}}>
        {/* Titre principal centre */}
        <div style={{textAlign:"center",padding:"24px 8px 22px"}}>
          <p style={{margin:"0 0 6px",fontSize:26,fontWeight:800,color:TX,lineHeight:1.2}}>Que souhaitez-vous<br/>faire aujourd hui ? 🪄</p>
          <p style={{margin:0,fontSize:14,color:TM}}>Trouvez l inspiration parfaite en deux clics pour vos enfants.</p>
        </div>

        {/* Generateurs */}
        <div style={{display:"flex",gap:10,marginBottom:20}}>
          <div style={{flex:1,background:WH,borderRadius:20,padding:"18px 14px 14px",border:BD,textAlign:"center"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#F3EFFF",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🪄</div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Generer une activite</p>
            <p style={{margin:"0 0 14px",fontSize:11,color:TM,lineHeight:1.4}}>Obtenez une idee adaptee a vos envies et a vos enfants</p>
            <button onClick={()=>setShowFiltres(true)} style={{width:"100%",padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>C est parti ✨</button>
          </div>
          <div style={{flex:1,background:WH,borderRadius:20,padding:"18px 14px 14px",border:BD,textAlign:"center"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#EDFAF3",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🗺️</div>
            <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Generer une sortie</p>
            <p style={{margin:"0 0 14px",fontSize:11,color:TM,lineHeight:1.4}}>Trouvez la sortie parfaite pres de chez vous</p>
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
            if(!cfg) return [SHOW_IDEE_ACTIVITES_CREATIVES,SHOW_IDEE_SORTIES_NATURE,SHOW_IDEE_EVENEMENTS,SHOW_IDEE_ANNIVERSAIRE][ideesMoment.indexOf(item)];
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

        {/* Banniere saisonniere — affichage contrôlé par SHOW_LUTIN_BANNER */}
        {SHOW_LUTIN_BANNER&&(
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
        {activeBanners.map(evt=>(
          <div key={evt.id} style={{background:`linear-gradient(135deg,${evt.couleur}dd,${evt.couleur}99)`,borderRadius:20,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12,boxShadow:`0 4px 16px ${evt.couleur}33`}}>
            <span style={{fontSize:36,flexShrink:0}}>{evt.emoji}</span>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 2px",fontSize:14,fontWeight:700,color:"#fff"}}>{evt.nom}</p>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.85)",lineHeight:1.4}}>{evt.bannerTexte||"Découvrez nos activités spéciales !"}</p>
            </div>
            <button onClick={()=>setShowEvtBiblio(evt)} style={{background:"rgba(255,255,255,0.25)",border:"none",borderRadius:28,color:"#fff",fontWeight:700,fontSize:11,padding:"8px 12px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",backdropFilter:"blur(4px)"}}>
              Découvrir ✨
            </button>
          </div>
        ))}
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
                {act.materiel.map((m,i)=><p key={i} style={{margin:"2px 0",fontSize:12,color:TM}}>• {m}</p>)}
              </div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <span style={{fontSize:11,background:"#8B5CF618",color:"#8B5CF6",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #8B5CF640"}}>TSA {act.tnd.tsa}/5</span>
                <span style={{fontSize:11,background:"#EC489918",color:"#EC4899",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #EC489940"}}>TDAH {act.tnd.tdah}/5</span>
                <span style={{fontSize:11,background:"#06B6D418",color:"#06B6D4",padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid #06B6D440"}}>DYS {act.tnd.dys}/5</span>
              </div>
              <button onClick={()=>{setFavoris(prev=>{const exists=prev.find(f=>f.id===act.id&&f._type==="activite");if(exists||prev.length>=15)return prev;return[...prev,{...act,_type:"activite"}];});setShowAdminSheet(false);}} style={{width:"100%",padding:"12px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>❤️ Sauvegarder</button>
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
            <button onClick={()=>{setFavoris(prev=>{const exists=prev.find(f=>f.id===SORTIE_NATURE_ADMIN.id&&f._type==="sortie");if(exists||prev.length>=15)return prev;return[...prev,{...SORTIE_NATURE_ADMIN,_type:"sortie"}];});setShowNatureSheet(false);}} style={{width:"100%",padding:"12px 0",borderRadius:28,background:GR,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>❤️ Sauvegarder</button>
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
            {lutinDetail.materiel.length>0&&(
              <div style={{background:"rgba(255,255,255,0.07)",borderRadius:14,padding:"11px 14px",marginBottom:20}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>🛒 Matériel nécessaire</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {lutinDetail.materiel.map((m,i)=>(
                    <span key={i} style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"rgba(251,191,36,0.15)",color:"#fbbf24",fontWeight:600,border:"1px solid rgba(251,191,36,0.3)"}}>{m}</span>
                  ))}
                </div>
              </div>
            )}
            {lutinDetail.materiel.length===0&&<div style={{marginBottom:20}}/>}
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
          <div style={{background:`linear-gradient(135deg,${showEvtBiblio.couleur}ee,${showEvtBiblio.couleur}99)`,padding:"0 0 24px"}}>
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
                          onClick={()=>setShowFichier({...f,couleur:showEvtBiblio.couleur})}>
                          <div style={{width:42,height:42,borderRadius:10,background:f.type?.includes("pdf")?"#fee2e2":f.type?.includes("image")?"#dbeafe":"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                            {f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:TX,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.nom}</p>
                            <p style={{margin:0,fontSize:11,color:TM}}>
                              {f.taille}
                              {f.dateDebut&&f.dateFin&&` · Visible jusqu'au ${new Date(f.dateFin).toLocaleDateString("fr-FR")}`}
                            </p>
                          </div>
                          <div style={{width:32,height:32,borderRadius:"50%",background:showEvtBiblio.couleur+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <span style={{fontSize:14,color:showEvtBiblio.couleur}}>↗</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Générateur lié */}
                {showEvtBiblio.generateur&&showEvtBiblio.generateurActif&&activites.length>0&&(
                  <EvtGenerateur evt={showEvtBiblio} activites={activites} favoris={favoris} setFavoris={setFavoris}/>
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
                        <span style={{fontSize:11,background:showEvtBiblio.couleur+"22",color:showEvtBiblio.couleur,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{a.categorie}</span>
                        {a.duree&&<span style={{fontSize:11,background:BG,color:TM,padding:"3px 10px",borderRadius:20}}>⏱ {a.duree}</span>}
                      </div>
                    </div>
                    <p style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:TX}}>{a.titre}</p>
                    {a.desc&&<p style={{margin:"0 0 8px",fontSize:13,color:TM,lineHeight:1.5}}>{a.desc}</p>}
                    {a.age&&<p style={{margin:"0 0 8px",fontSize:12,color:TM}}>👶 {a.age}</p>}
                    {a.materiel&&<div style={{background:BG,borderRadius:10,padding:"8px 12px",marginBottom:8}}><p style={{margin:"0 0 4px",fontSize:11,fontWeight:600,color:TX}}>🛒 Matériel</p><p style={{margin:0,fontSize:12,color:TM}}>{a.materiel}</p></div>}
                    <button onClick={()=>setFavoris(prev=>{const exists=prev.find(f=>f.id===a.id&&f._type==="activite");if(exists||prev.length>=15)return prev;return[...prev,{...a,nom:a.titre,_type:"activite"}];})} style={{width:"100%",padding:"10px 0",borderRadius:28,background:favoris.some(f=>f.id===a.id)?BG:showEvtBiblio.couleur,border:favoris.some(f=>f.id===a.id)?`1.5px solid ${showEvtBiblio.couleur}`:"none",color:favoris.some(f=>f.id===a.id)?showEvtBiblio.couleur:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      {favoris.some(f=>f.id===a.id)?"❤️ Sauvegardé":"❤️ Sauvegarder"}
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
              <button onClick={()=>{setShowEvtBiblio(currentPopup);setCurrentPopup(null);}} style={{width:"100%",padding:"13px 0",borderRadius:28,background:currentPopup.couleur,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer"}}>Découvrir ✨</button>
              <button onClick={()=>setCurrentPopup(null)} style={{background:"none",border:"none",color:TM,fontSize:12,cursor:"pointer",marginTop:10,padding:"4px 0"}}>Plus tard</button>
            </div>
          </div>
        </div>
      )}

      {resultA&&<BottomSheet item={resultA} type="activite" onClose={()=>setResultA(null)} onFav={toggleFav} isFav={favoris.some(f=>f.id===resultA.id&&f._type==="activite")}/>}
      {resultS&&<BottomSheet item={resultS} type="sortie" onClose={()=>setResultS(null)} onFav={toggleFav} isFav={favoris.some(f=>f.id===resultS.id&&f._type==="sortie")}/>}

      {showFiltresSortie&&(
        <div onClick={()=>setShowFiltresSortie(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:390,boxShadow:"0 -4px 32px rgba(0,0,0,0.12)",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 20px"}}/>
            <p style={{margin:"0 0 20px",fontSize:18,fontWeight:800,color:TX,textAlign:"center"}}>Personnalisez votre sortie</p>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>📍 Département</p>
            <select value={deptS} onChange={e=>setDeptS(e.target.value)} style={{width:"100%",padding:"11px 14px",borderRadius:14,border:"1.5px solid rgba(108,92,231,0.2)",background:LUTIN_BG,fontSize:13,color:TX,marginBottom:20,fontFamily:"inherit"}}>
              <option value="">Tous les départements</option>
              {DEPTS_NAMED.map(d=><option key={d.k} value={d.k}>{d.k} - {d.l}</option>)}
            </select>

            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>🎯 Type de sortie</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
              {TYPES_SORTIE.map(t=>(
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
            <div style={{width:36,height:4,borderRadius:4,background:"#E0E0E0",margin:"0 auto 20px"}}/>
            <p style={{margin:"0 0 20px",fontSize:18,fontWeight:800,color:TX,textAlign:"center"}}>Personnalisez votre recherche</p>

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
    </div>
  );
}

function PagePlanning({sosLib=[],enfants=[],enfantActif,setEnfantActif}){
  const [count,setCount]=useState(3);
  const [energieP,setEnergieP]=useState(null);
  const [lieuP,setLieuP]=useState(null);
  const [planning,setPlanning]=useState([]);
  const [showFiltresMat,setShowFiltresMat]=useState(false);
  const [materielDispo,setMaterielDispo]=useState([]);
  const [showSOS,setShowSOS]=useState(false);
  const [sosProfils,setSosProfils]=useState([]);
  const [sosCrise,setSosCrise]=useState(null);
  const [sosLieu,setSosLieu]=useState(null);
  const [sosTemps,setSosTemps]=useState(null);
  const [sosResults,setSosResults]=useState(null); // {main, alt}
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
    // Filtre 4 — Temps
    if(sosTemps){
      const tempsKey={"1-2min":"temps_1_2min","5min":"temps_5min","10-15min":"temps_10_15min","30min":"temps_30min"}[sosTemps];
      if(tempsKey){const m=pool.filter(a=>a[tempsKey]);if(m.length>0)pool=m;}
    }
    if(pool.length===0){setSosResults({main:null,alt:null,fallback:FALLBACK_ACTIVITIES});return;}
    const shuffle=[...pool].sort(()=>Math.random()-0.5);
    setSosResults({main:shuffle[0],alt:shuffle[1]||null,fallback:null});
  };
  const jours=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const ALL_MATERIEL=[...new Set(ACTIVITES.flatMap(a=>a.materiel))].sort();
  const toggleMat=(m)=>setMaterielDispo(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m]);
  const actMatOk=(a)=>materielDispo.length===0||a.materiel.every(m=>materielDispo.includes(m));
  const genPlanning=()=>{
    const pool=ACTIVITES.filter(a=>(!energieP||a.energie===energieP)&&(!lieuP||a.lieu===lieuP)&&actMatOk(a));
    const source=pool.length?pool:ACTIVITES;
    const result=[];const used=new Set();
    for(let i=0;i<count;i++){
      const avail=source.filter(a=>!used.has(a.id));
      if(!avail.length)break;
      const pick=avail[Math.floor(Math.random()*avail.length)];
      used.add(pick.id);
      result.push({jour:jours[i%7],activite:pick});
    }
    setPlanning(result);
    setShowFiltresMat(false);
  };
  const remplacer=(i)=>{const pool=ACTIVITES.filter(a=>(!energieP||a.energie===energieP)&&(!lieuP||a.lieu===lieuP)&&actMatOk(a)&&a.id!==planning[i].activite.id);if(!pool.length)return;setPlanning(prev=>prev.map((p,idx)=>idx===i?{...p,activite:pool[Math.floor(Math.random()*pool.length)]}:p));};
  const allMateriel=[...new Set(planning.flatMap(p=>p.activite.materiel))];
  const [checkedMat,setCheckedMat]=useState({});
  const toggleChecked=(m)=>setCheckedMat(prev=>({...prev,[m]:!prev[m]}));

  // SOS full screen overlay
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

            {/* Filtre 4 — Temps */}
            <div style={{marginBottom:20}}>
              <p style={{fontSize:12,fontWeight:700,color:"#fbbf24",margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.5px"}}>⏱️ Filtre 4 — Temps disponible</p>
              <p style={{fontSize:10,color:"rgba(255,255,255,0.35)",margin:"0 0 10px"}}>Crucial pour la pertinence en situation de crise</p>
              <div style={{display:"flex",gap:7}}>
                {[{v:"1-2min",l:"⚡ 1-2 min"},{v:"5min",l:"🕐 5 min"},{v:"10-15min",l:"🕙 10-15 min"},{v:"30min",l:"🕐 30 min+"}].map(o=>(
                  <button key={o.v} onClick={()=>setSosTemps(sosTemps===o.v?null:o.v)} style={{flex:1,padding:"9px 4px",borderRadius:12,border:`2px solid ${sosTemps===o.v?"#fbbf24":"rgba(255,255,255,0.12)"}`,background:sosTemps===o.v?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.04)",color:sosTemps===o.v?"#fbbf24":"rgba(255,255,255,0.55)",fontSize:11,cursor:"pointer",fontWeight:sosTemps===o.v?700:400,textAlign:"center"}}>{o.l}</button>
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
          {enfants.length>0&&<EnfantSelecteur enfants={enfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif}/>}
        </div>
        <button onClick={()=>{setShowSOS(true);setSosResults(null);setSosProfils([]);setSosCrise(null);setSosLieu(null);setSosTemps(null);}} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 14px",borderRadius:28,background:"linear-gradient(135deg,#dc2626,#ef4444)",border:"none",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:"0 4px 12px rgba(239,68,68,0.35)"}}>
          🆘 Mode SOS
        </button>
      </div>
      <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}><span style={{fontSize:14,fontWeight:500,color:TX}}>Nombre de jours</span><div style={{display:"flex",alignItems:"center",gap:12}}><button onClick={()=>setCount(Math.max(1,count-1))} style={{width:32,height:32,borderRadius:8,border:BD,background:LUTIN_BG,cursor:"pointer",fontSize:18,color:TX}}>-</button><span style={{fontSize:18,fontWeight:600,color:V,minWidth:20,textAlign:"center"}}>{count}</span><button onClick={()=>setCount(Math.min(3,count+1))} style={{width:32,height:32,borderRadius:8,border:BD,background:LUTIN_BG,cursor:"pointer",fontSize:18,color:TX}}>+</button></div></div>
        <div style={{background:VL,borderRadius:10,padding:"8px 12px",marginBottom:12}}><p style={{fontSize:12,color:V,margin:0}}>Passez Premium pour plus !</p></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}><Chip val="fatigue" cur={energieP} set={setEnergieP} label="😴 Fatigué"/><Chip val="motiv" cur={energieP} set={setEnergieP} label="🚀 Motivé"/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}><Chip val="interieur" cur={lieuP} set={setLieuP} label="🏠 Intérieur"/><Chip val="exterieur" cur={lieuP} set={setLieuP} label="🌳 Extérieur"/></div>
        <button onClick={()=>setShowFiltresMat(true)} style={{width:"100%",marginBottom:10,padding:"11px 16px",borderRadius:12,background:LUTIN_BG,border:"1.5px solid "+(materielDispo.length>0?V:"rgba(108,92,231,0.15)"),color:materielDispo.length>0?V:TM,fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span>🛒 Matériel disponible{materielDispo.length>0?" ("+materielDispo.length+")":""}</span>
          <span style={{fontSize:16}}>›</span>
        </button>
        <button onClick={genPlanning} style={{width:"100%",padding:12,borderRadius:12,background:V,border:"none",color:WH,fontWeight:600,fontSize:14,cursor:"pointer"}}>🪄 Générer le planning</button>
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
            {planning.map((p,i)=>(<div key={i} style={{background:WH,borderRadius:14,padding:"12px 14px",border:BD,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><span style={{fontSize:11,color:TM}}>{p.jour}</span><p style={{margin:"2px 0 0",fontSize:14,fontWeight:500,color:TX}}>{p.activite.nom}</p></div><button onClick={()=>remplacer(i)} style={{background:BG2,border:BD,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:16}}>🔄</button></div>))}
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
              <button onClick={()=>setMaterielDispo([])} style={{flex:1,padding:"11px 0",borderRadius:28,background:LUTIN_BG,border:"1.5px solid rgba(108,92,231,0.15)",color:TM,fontWeight:600,fontSize:13,cursor:"pointer"}}>Tout effacer</button>
              <button onClick={genPlanning} style={{flex:2,padding:"11px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>🪄 Générer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageFavoris({favoris,setFavoris}){
  const [tab,setTab]=useState("activites");
  const favAct=favoris.filter(f=>f._type==="activite");
  const favSort=favoris.filter(f=>f._type==="sortie");
  const current=tab==="activites"?favAct:favSort;
  const retirer=(item)=>setFavoris(prev=>prev.filter(f=>!(f.id===item.id&&f._type===item._type)));
  return(
    <div style={{padding:"20px 16px",background:BG,minHeight:"100vh"}}>
      <h1 style={{fontSize:20,fontWeight:600,color:TX,margin:"0 0 4px"}}>Mes favoris</h1>
      <p style={{fontSize:13,color:TM,margin:"0 0 16px"}}>{favoris.length}/15 sauvegardes</p>
      <div style={{width:"100%",background:WH,borderRadius:10,height:6,marginBottom:16,overflow:"hidden",border:BD}}><div style={{width:((favoris.length/15)*100)+"%",background:V,height:"100%",borderRadius:10}}/></div>
      <div style={{display:"flex",gap:6,background:WH,borderRadius:14,padding:4,border:BD,marginBottom:14}}>{["activites","sorties"].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:tab===t?V:"transparent",color:tab===t?WH:TM,fontSize:13,cursor:"pointer"}}>{t==="activites"?"Activites ("+favAct.length+")":"Sorties ("+favSort.length+")"}</button>))}</div>
      {current.length===0?(<div style={{textAlign:"center",padding:"40px 0",color:TM}}><p style={{fontSize:32}}>🤍</p><p style={{fontSize:14}}>Aucun favori.</p></div>):(<div style={{display:"flex",flexDirection:"column",gap:10}}>{current.map((item,i)=>(<div key={i} style={{background:WH,borderRadius:14,padding:"14px 16px",border:BD,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{flex:1}}><span style={{fontSize:11,background:VL,color:V,padding:"2px 8px",borderRadius:10}}>{item._type==="activite"?item.categorie:item.type}</span><p style={{margin:"6px 0 2px",fontSize:14,fontWeight:500,color:TX}}>{item.nom}</p><p style={{margin:0,fontSize:12,color:TM}}>{item._type==="activite"?item.age:item.ville+" - "+item.prix}</p></div><button onClick={()=>retirer(item)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:RD,padding:"0 0 0 10px"}}>❤️</button></div>))}</div>)}
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
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:LUTIN_BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
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

function PageAide({onBack,onGoConfidentialite}){
  const [openQuestion,setOpenQuestion]=useState(null);
  const [search,setSearch]=useState("");
  const [showBugModal,setShowBugModal]=useState(false);
  const [bugText,setBugText]=useState("");
  const [showBugToast,setShowBugToast]=useState(false);
  const toggleQuestion=(id)=>setOpenQuestion(openQuestion===id?null:id);
  const faqData=[
    {categorie:"🏠 General",couleur:"#EEEDFE",couleurTexte:"#3C3489",questions:[
      {id:"g1",question:"Comment fonctionne le generateur d activites ?",reponse:"Selectionne ton niveau d energie (Fatigue ou Motive) et le lieu souhaite (Interieur ou Exterieur), puis clique sur Trouve-moi une activite. L app te propose une activite adaptee parmi notre catalogue."},
      {id:"g2",question:"Comment ajouter une activite ou sortie en favori ?",reponse:"Sur la page detail d une activite ou sortie, clique sur le bouton Ajouter aux favoris. Tu retrouveras tous tes favoris dans l onglet Favoris de la barre de navigation."},
      {id:"g3",question:"C est quoi la version Premium ?",reponse:"La version Premium te permet de programmer jusqu a 20 activites dans le planning (contre 3 en version gratuite), d avoir des favoris illimites (contre 15), et d acceder a des fonctionnalites exclusives a venir."},
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
    ]},
  ];
  const filtered=search.trim().length>0
    ?faqData.map(cat=>({...cat,questions:cat.questions.filter(q=>q.question.toLowerCase().includes(search.toLowerCase()))})).filter(cat=>cat.questions.length>0)
    :faqData;
  const sendBug=()=>{setShowBugModal(false);setBugText("");setShowBugToast(true);setTimeout(()=>setShowBugToast(false),3000);};
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:24}}>
      <div style={{background:WH,borderBottom:BD,display:"flex",alignItems:"center",padding:"14px 16px",gap:12,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:LUTIN_BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
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
              <span style={{fontSize:12,fontWeight:800,background:cat.couleur,color:cat.couleurTexte,padding:"3px 10px",borderRadius:20}}>{cat.categorie}</span>
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
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:LUTIN_BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
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

function PageConfidentialite({onBack}){
  const [dataPrefs,setDataPrefs]=useState({statistiques:true,personnalisation:true});
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [showDownloadToast,setShowDownloadToast]=useState(false);
  const [deleteText,setDeleteText]=useState("");
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
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",border:BD,background:LUTIN_BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
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
      {showDeleteModal&&(
        <div onClick={()=>setShowDeleteModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
            <div style={{textAlign:"center",marginBottom:16}}><span style={{fontSize:48}}>🗑️</span></div>
            <p style={{margin:"0 0 10px",fontSize:16,fontWeight:800,color:"#A32D2D",textAlign:"center"}}>Supprimer mon compte ?</p>
            <p style={{margin:"0 0 16px",fontSize:13,color:TM,lineHeight:1.6,textAlign:"center"}}>Cette action est irreversible. Toutes vos donnees, favoris et contributions seront definitivement supprimes.</p>
            <input value={deleteText} onChange={e=>setDeleteText(e.target.value)} placeholder='Tapez SUPPRIMER pour confirmer' style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid #E5E7EB",fontSize:13,marginBottom:12,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
            <button disabled={deleteText!=="SUPPRIMER"} style={{width:"100%",padding:"12px 0",borderRadius:28,background:deleteText==="SUPPRIMER"?"#DC2626":"#E5E7EB",border:"none",color:deleteText==="SUPPRIMER"?WH:"#9CA3AF",fontWeight:700,fontSize:14,cursor:deleteText==="SUPPRIMER"?"pointer":"not-allowed",marginBottom:10,transition:"all 0.2s"}}>
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

function FormulaireEnfant({enfant,onSave,onCancel,isPremium=true}){
  const [form,setForm]=useState(enfant||{prenom:"",age:0,emoji:"👦",couleur:"#6C5CE7",profils:[],niveauxSensoriels:{bruit:50,lumiere:50,foule:50,imprevu:50}});
  const toggleProfil=(v)=>setForm(p=>({...p,profils:p.profils.includes(v)?p.profils.filter(x=>x!==v):[...p.profils,v]}));
  return(
    <div style={{background:BG,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",padding:"16px 16px 12px",background:WH,borderBottom:BD,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TX,padding:"0 10px 0 0"}}>←</button>
        <p style={{margin:0,fontSize:17,fontWeight:700,color:TX,flex:1,textAlign:"center"}}>{enfant?"Modifier le profil":"Ajouter un enfant"}</p>
        <div style={{width:40}}/>
      </div>
      <div style={{padding:"20px 16px",maxHeight:"calc(100vh - 60px)",overflowY:"auto"}}>
        {/* Prénom */}
        <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:12,border:BD}}>
          <p style={{margin:"0 0 10px",fontSize:14,fontWeight:700,color:TX}}>Informations</p>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:12,color:TM,display:"block",marginBottom:6}}>Prénom *</label>
            <input value={form.prenom} onChange={e=>setForm(p=>({...p,prenom:e.target.value}))} placeholder="Ex : Lucas" style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`2px solid ${form.prenom?V:"rgba(108,92,231,0.15)"}`,fontSize:14,color:TX,background:BG,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
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
          <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Profil TND</p>
          <p style={{margin:"0 0 12px",fontSize:12,color:TM}}>Sélectionne le ou les profils de ton enfant</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {PROFILS_TND.map(p=>{
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
        <div style={{background:WH,borderRadius:16,padding:"16px",marginBottom:20,border:BD}}>
          <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:TX}}>Niveaux sensoriels habituels</p>
          <p style={{margin:"0 0 14px",fontSize:12,color:TM}}>Ces infos aident l'app à suggérer les activités adaptées</p>
          <SensorialSlider label="Tolérance au bruit" icon="🔊" value={form.niveauxSensoriels.bruit} onChange={v=>setForm(p=>({...p,niveauxSensoriels:{...p.niveauxSensoriels,bruit:v}}))}/>
          <SensorialSlider label="Tolérance à la lumière" icon="💡" value={form.niveauxSensoriels.lumiere} onChange={v=>setForm(p=>({...p,niveauxSensoriels:{...p.niveauxSensoriels,lumiere:v}}))}/>
          <SensorialSlider label="Tolérance à la foule" icon="👥" value={form.niveauxSensoriels.foule} onChange={v=>setForm(p=>({...p,niveauxSensoriels:{...p.niveauxSensoriels,foule:v}}))}/>
          <SensorialSlider label="Tolérance à l'imprévu" icon="❓" value={form.niveauxSensoriels.imprevu} onChange={v=>setForm(p=>({...p,niveauxSensoriels:{...p.niveauxSensoriels,imprevu:v}}))}/>
        </div>
        <button onClick={()=>{if(!form.prenom)return;onSave(form);}} style={{width:"100%",padding:14,borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:10}}>Enregistrer</button>
        <button onClick={onCancel} style={{width:"100%",padding:14,borderRadius:28,background:WH,border:BD,color:TM,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
      </div>
    </div>
  );
}

function GestionEnfants({enfants,setEnfants,enfantActif,setEnfantActif,onBack,isPremium=true}){
  const [formMode,setFormMode]=useState(null); // null | 'add' | enfant object
  const [confirmDel,setConfirmDel]=useState(null);
  const save=(data)=>{
    if(formMode==="add") setEnfants(prev=>[...prev,{...data,id:Date.now().toString()}]);
    else setEnfants(prev=>prev.map(e=>e.id===formMode.id?{...e,...data}:e));
    setFormMode(null);
  };
  if(formMode) return <FormulaireEnfant enfant={formMode==="add"?null:formMode} onSave={save} onCancel={()=>setFormMode(null)} isPremium={isPremium}/>;
  return(
    <div style={{background:BG,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",padding:"16px 16px 12px",background:WH,borderBottom:BD,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TX,padding:"0 10px 0 0"}}>←</button>
        <p style={{margin:0,fontSize:17,fontWeight:700,color:TX,flex:1,textAlign:"center"}}>Mes enfants</p>
        {isPremium&&enfants.length<6?(
          <button onClick={()=>setFormMode("add")} style={{width:34,height:34,borderRadius:"50%",background:V,border:"none",color:WH,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        ):(
          <div style={{width:34}}/>
        )}
      </div>
      <div style={{padding:"16px"}}>
        {!isPremium&&(
          <div style={{background:"linear-gradient(135deg,#EDE9FF,#F5F0FF)",borderRadius:16,padding:"14px 16px",marginBottom:16,border:`1px solid ${VL}`,display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:22}}>👑</span>
            <div><p style={{margin:0,fontSize:13,fontWeight:700,color:V}}>Profils multiples — Premium</p><p style={{margin:0,fontSize:11,color:TM}}>Passez Premium pour ajouter jusqu'à 6 enfants</p></div>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {enfants.map(e=>{
            const isActif=e.id===enfantActif;
            return(
              <div key={e.id} style={{background:WH,borderRadius:18,padding:"16px",border:`2px solid ${isActif?e.couleur+"66":"rgba(0,0,0,0.06)"}`,position:"relative"}}>
                {isActif&&<div style={{position:"absolute",top:10,right:10,background:e.couleur,color:WH,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10}}>Actif</div>}
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:e.couleur+"22",border:`3px solid ${e.couleur}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{e.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:TX}}>{e.prenom}, {e.age} an{e.age>1?"s":""}</p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {e.profils.map(p=>{const pt=PROFILS_TND.find(x=>x.val===p);return<span key={p} style={{fontSize:10,background:pt?pt.color+"18":"#EDE9FF",color:pt?pt.color:V,padding:"1px 8px",borderRadius:8,fontWeight:600}}>{pt?pt.label:p}</span>;})}
                    </div>
                  </div>
                </div>
                {/* Niveaux sensoriels */}
                <div style={{marginBottom:10}}>
                  {[["🔊","Bruit","bruit"],["💡","Lumière","lumiere"],["👥","Foule","foule"],["❓","Imprévu","imprevu"]].map(([ico,lbl,key])=>{
                    const v=e.niveauxSensoriels[key]||0;
                    const c=niveauColor(v);
                    return(
                      <div key={key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <span style={{fontSize:12,width:20}}>{ico}</span>
                        <span style={{fontSize:11,color:TM,width:60}}>{lbl}</span>
                        <div style={{flex:1,height:5,background:"#E5E7EB",borderRadius:3,overflow:"hidden"}}>
                          <div style={{width:v+"%",height:"100%",background:c,borderRadius:3}}/>
                        </div>
                        <span style={{fontSize:10,fontWeight:700,color:c,width:30,textAlign:"right"}}>{v}%</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:8}}>
                  {!isActif&&<button onClick={()=>setEnfantActif(e.id)} style={{flex:1,padding:"8px 0",borderRadius:20,background:e.couleur+"18",border:`1.5px solid ${e.couleur}44`,color:e.couleur,fontSize:12,fontWeight:700,cursor:"pointer"}}>Sélectionner</button>}
                  <button onClick={()=>setFormMode(e)} style={{flex:1,padding:"8px 0",borderRadius:20,background:BG,border:BD,color:TX,fontSize:12,fontWeight:600,cursor:"pointer"}}>✏️ Modifier</button>
                  {enfants.length>1&&<button onClick={()=>setConfirmDel(e.id)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(239,68,68,0.08)",border:"none",color:"#EF4444",fontSize:14,cursor:"pointer"}}>🗑️</button>}
                </div>
              </div>
            );
          })}
        </div>
        {!isPremium&&(
          <button style={{width:"100%",padding:14,borderRadius:28,background:VL,border:`2px dashed ${V}`,color:V,fontWeight:700,fontSize:14,cursor:"pointer",marginTop:12}}>🔒 Profils multiples — Premium uniquement</button>
        )}
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

function EnfantSelecteur({enfants,enfantActif,setEnfantActif}){
  const [open,setOpen]=useState(false);
  const actif=enfants.find(e=>e.id===enfantActif)||enfants[0];
  if(!actif)return null;
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px 4px 4px",borderRadius:20,background:actif.couleur+"18",border:`1.5px solid ${actif.couleur}44`,cursor:"pointer"}}>
        <div style={{width:26,height:26,borderRadius:"50%",background:actif.couleur+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{actif.emoji}</div>
        <span style={{fontSize:12,fontWeight:600,color:actif.couleur}}>{actif.prenom}</span>
        <span style={{fontSize:10,color:actif.couleur}}>▾</span>
      </button>
      {open&&(
        <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:400}} />
      )}
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:WH,borderRadius:14,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:BD,zIndex:500,minWidth:160,overflow:"hidden"}}>
          {enfants.map(e=>(
            <button key={e.id} onClick={()=>{setEnfantActif(e.id);setOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:e.id===enfantActif?e.couleur+"12":WH,border:"none",cursor:"pointer",borderBottom:BD}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:e.couleur+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{e.emoji}</div>
              <span style={{fontSize:13,fontWeight:600,color:e.id===enfantActif?e.couleur:TX}}>{e.prenom}</span>
              {e.id===enfantActif&&<span style={{marginLeft:"auto",fontSize:12,color:e.couleur}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PageProfil({setPage,onAdminAccess,enfants=[],setEnfants,enfantActif,setEnfantActif,showGestionEnfants,setShowGestionEnfants}){
  const [subPage,setSubPage]=useState(null);
  const [profil,setProfil]=useState({nom:"",pseudo:"",photo:null,enfants:[]});
  const [editMode,setEditMode]=useState(false);
  const [showAddEnfant,setShowAddEnfant]=useState(false);
  const [newEnfant,setNewEnfant]=useState({prenom:"",age:""});
  const [editBuf,setEditBuf]=useState({nom:"",pseudo:""});
  const [showProfilToast,setShowProfilToast]=useState(false);
  const [showPhotoMsg,setShowPhotoMsg]=useState(false);
  const saveProfile=()=>{setProfil(prev=>({...prev,nom:editBuf.nom,pseudo:editBuf.pseudo}));setEditMode(false);setShowProfilToast(true);setTimeout(()=>setShowProfilToast(false),3000);};
  const addEnfant=()=>{if(!newEnfant.prenom.trim())return;setProfil(prev=>({...prev,enfants:[...prev.enfants,{prenom:newEnfant.prenom.trim(),age:newEnfant.age||"0"}]}));setNewEnfant({prenom:"",age:""});setShowAddEnfant(false);};
  const removeEnfant=(i)=>setProfil(prev=>({...prev,enfants:prev.enfants.filter((_,idx)=>idx!==i)}));
  const initiales=profil.nom?profil.nom.trim()[0].toUpperCase():"👤";
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
  if(subPage==="confidentialite") return <PageConfidentialite onBack={()=>setSubPage(null)}/>;
  if(subPage==="aide") return <PageAide onBack={()=>setSubPage(null)} onGoConfidentialite={()=>setSubPage("confidentialite")}/>;
  if(subPage==="amelioration") return <PageAmelioration onBack={()=>setSubPage(null)}/>;
  if(showGestionEnfants) return <GestionEnfants enfants={enfants} setEnfants={setEnfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} onBack={()=>setShowGestionEnfants(false)}/>;

  const menuItems=[
    {icon:"🔔",bg:"#EDE9FF",color:"#6C5CE7",label:"Notifications",sub:"Gerer vos notifications",page:"notifications"},
    {icon:"🔒",bg:"#D1FAE5",color:"#059669",label:"Confidentialite",sub:"Vos donnees personnelles",page:"confidentialite"},
    {icon:"❓",bg:"#DBEAFE",color:"#2563EB",label:"Aide et FAQ",sub:"Besoin d aide ? On est la !",page:"aide"},
    {icon:"💡",bg:"#FEF3C7",color:"#D97706",label:"Proposer une amelioration",sub:"Partagez vos idees avec nous",page:"amelioration"},
  ];
  return(
    <div style={{background:BG,minHeight:"100vh",paddingBottom:16}}>
      {/* Header */}
      <div style={{background:WH,padding:"18px 16px 14px",borderBottom:BD,display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <h1 style={{margin:"0 0 2px",fontSize:22,fontWeight:800,color:TX}}>Mon profil</h1>
          <p style={{margin:0,fontSize:13,color:TM}}>Gerez votre compte et vos preferences</p>
        </div>
        <div style={{position:"relative"}}>
          <div style={{width:40,height:40,borderRadius:"50%",border:BD,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,cursor:"pointer"}}>🔔</div>
          <div style={{position:"absolute",top:2,right:2,width:18,height:18,borderRadius:"50%",background:RD,border:"2px solid "+WH,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:9,color:WH,fontWeight:700}}>3</span>
          </div>
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* En-tete profil dynamique */}
        <div style={{background:WH,borderRadius:16,padding:20,border:BD,marginBottom:12,position:"relative"}}>
          <button onClick={()=>{setEditBuf({nom:profil.nom,pseudo:profil.pseudo});setEditMode(true);}} style={{position:"absolute",top:14,right:14,background:LUTIN_BG,border:BD,borderRadius:20,padding:"4px 12px",fontSize:12,color:V,fontWeight:600,cursor:"pointer"}}>✏️ Modifier</button>
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
                <p style={{margin:0,fontSize:13,color:TM}}>👶 {profil.enfants.length} enfant{profil.enfants.length!==1?"s":""}</p>
              </>
            ):(
              <>
                <p style={{margin:"0 0 12px",fontSize:14,color:TM}}>Complete ton profil</p>
                <button onClick={()=>{setEditBuf({nom:"",pseudo:""});setEditMode(true);}} style={{padding:"9px 20px",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:13,cursor:"pointer"}}>✏️ Creer mon profil</button>
              </>
            )}
            {showPhotoMsg&&<div style={{marginTop:10,background:"#EEEDFE",borderRadius:10,padding:"8px 12px"}}><p style={{margin:0,fontSize:11,color:V}}>La photo de profil sera disponible apres connexion Firebase.</p><button onClick={()=>setShowPhotoMsg(false)} style={{background:"none",border:"none",color:TM,fontSize:11,cursor:"pointer",marginTop:4}}>OK</button></div>}
          </div>
          {/* Premium banner */}
          <div style={{background:"linear-gradient(135deg,#FFF8EC,#FFF3E0)",borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",border:"1px solid #fde68a",cursor:"pointer",marginTop:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>👑</span>
              <div><p style={{margin:0,fontSize:12,fontWeight:700,color:"#92400e"}}>Passez en Premium</p><p style={{margin:0,fontSize:10,color:"#b45309"}}>Debloquez toutes nos fonctionnalites</p></div>
            </div>
            <div style={{width:26,height:26,borderRadius:"50%",background:V,display:"flex",alignItems:"center",justifyContent:"center",color:WH,fontSize:13,fontWeight:700}}>›</div>
          </div>
        </div>

        {/* Enfants hors editMode */}
        {!editMode&&profil.enfants.length>0&&(
          <div style={{background:WH,borderRadius:16,padding:"12px 16px",border:BD,marginBottom:12}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:TX}}>👶 Mes enfants</p>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
              {profil.enfants.map((e,i)=>(
                <span key={i} style={{flexShrink:0,background:"#EEEDFE",color:V,borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>
                  {i%2===0?"👦":"👧"} {e.prenom} · {e.age} an{parseInt(e.age)>1?"s":""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire edition */}
        {editMode&&(
          <div style={{background:WH,borderRadius:16,padding:16,border:BD,marginBottom:12}}>
            <p style={{margin:"0 0 14px",fontSize:14,fontWeight:800,color:TX}}>👤 Mon identite</p>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,fontWeight:600,color:TM,display:"block",marginBottom:4}}>Prenom et nom</label>
              <input value={editBuf.nom} onChange={e=>setEditBuf(prev=>({...prev,nom:e.target.value}))} placeholder="Ex : Marie Dupont" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid rgba(108,92,231,0.2)",fontSize:13,color:TX,background:LUTIN_BG,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{fontSize:12,fontWeight:600,color:TM,display:"block",marginBottom:4}}>Pseudo</label>
              <div style={{display:"flex",alignItems:"center",background:BG2,borderRadius:10,border:"1.5px solid rgba(108,92,231,0.2)",overflow:"hidden"}}>
                <span style={{padding:"0 10px",fontSize:13,color:V,fontWeight:700}}>@</span>
                <input value={editBuf.pseudo} onChange={e=>setEditBuf(prev=>({...prev,pseudo:e.target.value}))} placeholder="maman_creative" style={{flex:1,padding:"10px 12px 10px 0",border:"none",fontSize:13,color:TX,background:"transparent",outline:"none",fontFamily:"inherit"}}/>
              </div>
              <p style={{margin:"4px 0 0",fontSize:11,color:TM}}>Visible dans la communaute</p>
            </div>
            <p style={{margin:"0 0 10px",fontSize:14,fontWeight:800,color:TX}}>👶 Mes enfants</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
              {profil.enfants.map((e,i)=>(
                <div key={i} style={{background:BG2,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,border:BD}}>
                  <span style={{fontSize:20}}>{i%2===0?"👦":"👧"}</span>
                  <div style={{flex:1}}>
                    <p style={{margin:0,fontSize:13,fontWeight:700,color:TX}}>{e.prenom}</p>
                    <p style={{margin:0,fontSize:11,color:TM}}>{e.age} an{parseInt(e.age)>1?"s":""}</p>
                  </div>
                  <button onClick={()=>removeEnfant(i)} style={{background:"#FEE2E2",border:"none",borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:"#DC2626"}}>🗑️</button>
                </div>
              ))}
            </div>
            {profil.enfants.length<6&&!showAddEnfant&&(
              <button onClick={()=>setShowAddEnfant(true)} style={{background:"#EEEDFE",border:"none",borderRadius:20,padding:"8px 16px",color:V,fontWeight:600,fontSize:12,cursor:"pointer",marginBottom:14}}>➕ Ajouter un enfant</button>
            )}
            {showAddEnfant&&(
              <div style={{background:BG2,borderRadius:12,padding:12,border:BD,marginBottom:14}}>
                <input value={newEnfant.prenom} onChange={e=>setNewEnfant(prev=>({...prev,prenom:e.target.value}))} placeholder="Ex : Lucas" style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(108,92,231,0.15)",fontSize:13,color:TX,background:WH,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:8}}/>
                <select value={newEnfant.age} onChange={e=>setNewEnfant(prev=>({...prev,age:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(108,92,231,0.15)",fontSize:13,color:TX,background:WH,boxSizing:"border-box",marginBottom:10,fontFamily:"inherit"}}>
                  <option value="">Age de l enfant</option>
                  {Array.from({length:18},(_,i)=><option key={i} value={String(i)}>{i===0?"0 an":i===1?"1 an":i+" ans"}</option>)}
                </select>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={addEnfant} disabled={!newEnfant.prenom.trim()} style={{flex:1,padding:"9px 0",borderRadius:28,background:newEnfant.prenom.trim()?V:"#E5E7EB",border:"none",color:newEnfant.prenom.trim()?WH:"#9CA3AF",fontWeight:700,fontSize:13,cursor:newEnfant.prenom.trim()?"pointer":"not-allowed"}}>Ajouter</button>
                  <button onClick={()=>{setShowAddEnfant(false);setNewEnfant({prenom:"",age:""}); }} style={{flex:1,padding:"9px 0",borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:TM,fontWeight:600,fontSize:13,cursor:"pointer"}}>Annuler</button>
                </div>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <button onClick={saveProfile} style={{width:"100%",padding:"13px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer"}}>✅ Enregistrer</button>
              <button onClick={()=>setEditMode(false)} style={{width:"100%",padding:"13px 0",borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:TM,fontWeight:600,fontSize:14,cursor:"pointer"}}>Annuler</button>
            </div>
          </div>
        )}

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

        {/* 👶 Mes enfants — nouveau système */}
        <div style={{background:WH,borderRadius:20,padding:"14px 16px",border:BD,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <p style={{margin:0,fontSize:14,fontWeight:700,color:TX}}>👶 Mes enfants</p>
            <button onClick={()=>setShowGestionEnfants(true)} style={{fontSize:12,color:V,background:VL,border:"none",borderRadius:20,padding:"4px 12px",cursor:"pointer",fontWeight:600}}>Gérer →</button>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
            {enfants.map(e=>(
              <button key={e.id} onClick={()=>setEnfantActif(e.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 12px",borderRadius:14,border:`2px solid ${e.id===enfantActif?e.couleur:"rgba(0,0,0,0.06)"}`,background:e.id===enfantActif?e.couleur+"12":BG,cursor:"pointer",flexShrink:0,minWidth:64}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:e.couleur+"22",border:`2px solid ${e.couleur}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{e.emoji}</div>
                <span style={{fontSize:11,fontWeight:600,color:e.id===enfantActif?e.couleur:TM,whiteSpace:"nowrap"}}>{e.prenom}</span>
                {e.id===enfantActif&&<span style={{fontSize:9,color:e.couleur,fontWeight:700}}>Actif</span>}
              </button>
            ))}
          </div>
        </div>

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

        {/* Boutons discrets */}
        <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:12}}>
          <button onClick={addContrib} style={{background:"none",border:"none",color:"#ccc",fontSize:11,cursor:"pointer",padding:"4px 10px"}}>[Test] +1 contribution</button>
          <button onClick={onAdminAccess} style={{background:"none",border:"none",color:"#ccc",fontSize:11,cursor:"pointer",padding:"4px 10px"}}>⚙️ Admin</button>
        </div>

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
const MOCK_ACTIVITES = [
  { id:"1", titre:"Yoga en plein air", categorie:"Sport", lieu:"exterieur", ageMin:4, ageMax:10, duree:"30 min", premium:false, statut:"published", auteur:"Admin", date:"10/01/2024" },
  { id:"2", titre:"Cuisine créative", categorie:"Cuisine", lieu:"interieur", ageMin:5, ageMax:12, duree:"45 min", premium:true, statut:"published", auteur:"Admin", date:"15/02/2024" },
  { id:"3", titre:"Chasse au trésor", categorie:"Jeu", lieu:"exterieur", ageMin:3, ageMax:8, duree:"60 min", premium:false, statut:"pending", auteur:"sophie.martin@email.com", date:"20/03/2024" },
  { id:"4", titre:"Peinture sur toile", categorie:"Créatif", lieu:"interieur", ageMin:6, ageMax:14, duree:"90 min", premium:true, statut:"draft", auteur:"Admin", date:"01/04/2024" },
  { id:"5", titre:"Jardinage en famille", categorie:"Nature", lieu:"exterieur", ageMin:3, ageMax:10, duree:"45 min", premium:false, statut:"published", auteur:"marie.dubois@email.com", date:"05/05/2024" },
];
const MOCK_SORTIES = [
  { id:"1", titre:"Parc des Expositions", dept:"Paris (75)", adresse:"123 Av. des Parcs", horaires:"9h-18h", prix:"Gratuit", categorie:"Parc", statut:"published" },
  { id:"2", titre:"Ferme du Soleil", dept:"Yvelines (78)", adresse:"45 Rte de la Ferme", horaires:"10h-17h", prix:"8€/pers", categorie:"Ferme", statut:"published" },
  { id:"3", titre:"Musée des Enfants", dept:"Paris (75)", adresse:"78 Rue du Musée", horaires:"10h-18h", prix:"12€", categorie:"Musée", statut:"published" },
  { id:"4", titre:"Accrobranche Les Pins", dept:"Seine-et-Marne (77)", adresse:"12 Allée des Pins", horaires:"9h-19h", prix:"18€", categorie:"Sport", statut:"draft" },
];
const MOCK_EVENTS = [
  { id:"1", titre:"Festival de Musique", date:"15/06/2024", fin:"16/06/2024", ville:"Paris", organisateur:"Mairie de Paris", prix:"Gratuit", type:"spectacle", statut:"published" },
  { id:"2", titre:"Salon du Jouet", date:"20/07/2024", fin:"21/07/2024", ville:"Lyon", organisateur:"EventCo", prix:"10€", type:"salon", statut:"draft" },
  { id:"3", titre:"Kermesse Saint-Martin", date:"01/06/2024", fin:"01/06/2024", ville:"Paris", organisateur:"Ecole St-Martin", prix:"Gratuit", type:"kermesse", statut:"published" },
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
  {k:"activites",label:"Activités",emoji:"🎨"},
  {k:"sorties",label:"Sorties",emoji:"🗺️"},
  {k:"evenements",label:"Événements",emoji:"📅"},
  {k:"saisonnier",label:"Saisonnier",emoji:"🎄"},
  {k:"utilisateurs",label:"Utilisateurs",emoji:"👥"},
  {k:"abonnements",label:"Abonnements",emoji:"💳"},
  {k:"signalements",label:"Signalements",emoji:"🚩"},
  {k:"communication",label:"Communication",emoji:"📢"},
  {k:"admins",label:"Administrateurs",emoji:"🛡️"},
  {k:"sos",label:"Mode SOS",emoji:"🆘"},
];

// ─── PAGES ────────────────────────────────────────────────────────────────────
function Dashboard({sharedActivites=[],pendingContribs=[],userReports=[],dashUserReports=[]}) {
  const [liveUsers,setLiveUsers] = useState(MOCK_USERS.length);
  const [liveOnline,setLiveOnline] = useState(Math.floor(MOCK_USERS.length*0.4));
  const [pulse,setPulse] = useState(false);
  const [history,setHistory] = useState(()=>Array.from({length:12},(_,i)=>({t:i,v:Math.floor(MOCK_USERS.length*0.3)+Math.floor(Math.random()*3)})));

  useState(()=>{
    const interval=setInterval(()=>{
      const delta=Math.random()<0.6?1:Math.random()<0.3?2:0;
      const onlineDelta=(Math.random()<0.5?1:-1)*(Math.floor(Math.random()*2));
      if(delta>0){
        setLiveUsers(p=>p+delta);
        setPulse(true);
        setTimeout(()=>setPulse(false),600);
      }
      setLiveOnline(p=>Math.max(1,Math.min(p+onlineDelta,liveUsers)));
      setHistory(p=>[...p.slice(1),{t:Date.now(),v:liveOnline}]);
    },4000);
    return()=>clearInterval(interval);
  });

  const stats = [
    {label:"Utilisateurs",val:liveUsers,sub:"dont "+liveOnline+" en ligne",emoji:"👥",color:C.blue},
    {label:"Activités publiées",val:MOCK_ACTIVITES.filter(a=>a.statut==="published").length+sharedActivites.filter(a=>a.statut==="published").length+pendingContribs.filter(c=>c._type==="activite"&&c._statut==="published").length,sub:`Admin: ${MOCK_ACTIVITES.filter(a=>a.statut==="published").length+sharedActivites.filter(a=>a.statut==="published").length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="activite"&&c._statut==="published").length}`,emoji:"🎨",color:C.accent},
    {label:"Sorties",val:MOCK_SORTIES.length+pendingContribs.filter(c=>c._type==="sortie"&&c._statut==="published").length,sub:`Admin: ${MOCK_SORTIES.length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="sortie"&&c._statut==="published").length}`,emoji:"🗺️",color:C.pink},
    {label:"Événements",val:MOCK_EVENTS.length+pendingContribs.filter(c=>c._type==="evenement"&&c._statut==="published").length,sub:`Admin: ${MOCK_EVENTS.length} · Utilisateurs: ${pendingContribs.filter(c=>c._type==="evenement"&&c._statut==="published").length}`,emoji:"📅",color:C.orange},
    {label:"Signalements",val:dashUserReports.length+MOCK_REPORTS.length,sub:`${[...dashUserReports,...MOCK_REPORTS].filter(r=>r.statut==="pending").length} en attente · ${[...dashUserReports,...MOCK_REPORTS].filter(r=>r.statut==="resolved").length} résolus`,emoji:"🚩",color:C.red},
    {label:"Abonnements actifs",val:MOCK_SUBS.filter(s=>s.statut==="active").length,sub:`Mensuel: ${MOCK_SUBS.filter(s=>s.statut==="active"&&s.plan==="mensuel").length} · Annuel: ${MOCK_SUBS.filter(s=>s.statut==="active"&&s.plan==="annuel").length}`,emoji:"💳",color:C.green},
  ];
  const revenue = MOCK_SUBS.filter(s=>s.statut==="active").reduce((a,s)=>a+s.montant,0);
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
      {value?.date&&value?.heure&&(
        <p style={{margin:"6px 0 0",fontSize:11,color:C.accent}}>
          ✓ Publication prévue le {new Date(value.date+"T"+value.heure).toLocaleString("fr-FR",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
        </p>
      )}
      {value?.date&&!value?.heure&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>Choisissez aussi une heure</p>}
      {(value?.date||value?.heure)&&<button onClick={()=>onChange({date:"",heure:""})} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",marginTop:4,padding:0}}>× Supprimer la programmation</button>}
    </div>
  );
}

function useScheduler(items,setItems,syncFn){
  useState(()=>{
    const check=()=>{
      const now=new Date();
      setItems(prev=>prev.map(item=>{
        if(item.statut==="scheduled"&&item.programmation?.date&&item.programmation?.heure){
          const pub=new Date(item.programmation.date+"T"+item.programmation.heure);
          if(pub<=now){
            const updated={...item,statut:"published"};
            if(syncFn)syncFn(updated);
            return updated;
          }
        }
        return item;
      }));
    };
    check();
    const interval=setInterval(check,30000);
    return()=>clearInterval(interval);
  });
}

function Activites({sharedActivites,setSharedActivites}) {
  const [items,setItems] = useState(sharedActivites&&sharedActivites.length?sharedActivites:MOCK_ACTIVITES);
  const MOCK_IDS=new Set(MOCK_ACTIVITES.map(a=>a.id));
  const syncItems=(newItems)=>{setItems(newItems);if(setSharedActivites)setSharedActivites(newItems.filter(a=>!MOCK_IDS.has(a.id)));};
  const [search,setSearch] = useState("");
  const [filterStatut,setFilterStatut] = useState("");
  const [modal,setModal] = useState(null);
  const emptyForm = {titre:"",desc:"",duree:"",difficulte:"",lieu:"",energie:"",categorie:"",ageMin:"",ageMax:"",materielStr:"",etapes:"",premium:false,statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false};
  const [form,setForm] = useState(emptyForm);
  const tf = (key) => setForm(prev=>({...prev,[key]:!prev[key]}));
  const filtered = items.filter(a=>(filterStatut===""||a.statut===filterStatut)&&(!search||a.titre.toLowerCase().includes(search.toLowerCase())));
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
      <div style={{...s.card,padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0d1117"}}>{["Titre","Catégorie","Âge","Statut","Premium","Actions"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map((a,i)=>(
            <tr key={a.id} style={{borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":"rgba(255,255,255,0.01)"}}>
              <td style={{padding:"12px 16px"}}>
                <p style={{margin:"0 0 4px",fontSize:13,color:C.text,fontWeight:500}}>{a.titre}</p>
                {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge("rgba(124,58,237,0.15)","#a78bfa")}>{a.categorie}</span></td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.ageMin}-{a.ageMax} ans</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
              <td style={{padding:"12px 16px",fontSize:13}}>{a.premium?"👑 Oui":"Gratuit"}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button style={s.btnOutline(C.blue)} onClick={()=>setModal({mode:"view",item:a})}>👁</button>
                  <button style={s.btnOutline(C.accent)} onClick={()=>{setForm({...emptyForm,...a});setModal({mode:"edit",item:a});}}>✏️</button>
                  <button style={s.btnOutline(C.red)} onClick={()=>syncItems(items.filter(x=>x.id!==a.id))}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal&&<Modal title={modal.mode==="view"?"Detail activite":modal.mode==="edit"?"Modifier l'activite":"Proposer une activite"} onClose={()=>setModal(null)} width={620}>
        {modal.mode==="view"?(<div>
          <h2 style={{fontSize:18,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{modal.item.titre}</h2>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{statutBadge(modal.item.statut)}<span style={s.badge("rgba(124,58,237,0.15)","#a78bfa")}>{modal.item.categorie}</span>{modal.item.premium&&<span style={s.badge("#fef3c7","#92400e")}>👑 Premium</span>}</div>
          {[["Lieu",modal.item.lieu==="interieur"?"🏠 Intérieur":"🌳 Extérieur"],["Âge",`${modal.item.ageMin}-${modal.item.ageMax} ans`],["Durée",modal.item.duree],["Ajouté par",modal.item.auteur],["Date",modal.item.date]].map(([k,v],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}><span style={{fontSize:12,color:C.muted}}>{k}</span><span style={{fontSize:13,color:C.text,fontWeight:500}}>{v}</span></div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:16}}>
            {modal.item.statut!=="published"&&<button style={s.btn(C.green)} onClick={()=>{syncItems(items.map(a=>a.id===modal.item.id?{...a,statut:"published"}:a));setModal(null);}}>✅ Publier</button>}
            {modal.item.statut!=="draft"&&<button style={s.btn(C.yellow,"#000")} onClick={()=>{syncItems(items.map(a=>a.id===modal.item.id?{...a,statut:"draft"}:a));setModal(null);}}>📝 Brouillon</button>}
          </div>
        </div>):(()=>{
          const tf=(key)=>setForm(prev=>({...prev,[key]:!prev[key]}));
          const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(124,58,237,0.4)":C.border}`,background:active?"rgba(124,58,237,0.1)":"transparent",color:active?"#a78bfa":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
          return(<div>
          <AdminField label="Titre *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Peinture avec les doigts"/></AdminField>
          <AdminField label="Photo (optionnel)">
            <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"16px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
              <div style={{fontSize:22,marginBottom:4}}>⬆️</div>
              <p style={{margin:0,fontSize:13,color:C.text}}>Ajouter une photo</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>JPG, PNG - Max 5MB</p>
            </div>
          </AdminField>
          <AdminField label="Description *"><textarea style={{...s.input,minHeight:70,resize:"vertical"}} value={form.desc||""} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Decris l activite..."/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Duree *"><select style={s.input} value={form.duree||""} onChange={e=>setForm({...form,duree:e.target.value})}><option value="">Choisir</option>{["moins de 15 min","15-30 min","30-60 min","1h-2h","2h+"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Difficulte *"><select style={s.input} value={form.difficulte||""} onChange={e=>setForm({...form,difficulte:e.target.value})}><option value="">Choisir</option>{["Facile","Moyen","Difficile"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Lieu *"><select style={s.input} value={form.lieu||""} onChange={e=>setForm({...form,lieu:e.target.value})}><option value="">Choisir</option><option value="interieur">Interieur</option><option value="exterieur">Exterieur</option></select></AdminField>
            <AdminField label="Motivation *"><select style={s.input} value={form.energie||""} onChange={e=>setForm({...form,energie:e.target.value})}><option value="">Choisir</option><option value="fatigue">Fatigue</option><option value="motiv">Motiv</option></select></AdminField>
          </div>
          <AdminField label="Categorie *"><select style={s.input} value={form.categorie||""} onChange={e=>setForm({...form,categorie:e.target.value})}><option value="">Choisir</option>{["Creatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          <AdminField label="Age conseille">
            <div style={{display:"flex",gap:8}}>
              <select style={{...s.input,flex:1}} value={form.ageMin||""} onChange={e=>setForm({...form,ageMin:e.target.value})}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select>
              <select style={{...s.input,flex:1}} value={form.ageMax||""} onChange={e=>setForm({...form,ageMax:e.target.value})}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select>
            </div>
          </AdminField>
          <AdminField label="Materiel necessaire"><input style={s.input} value={form.materielStr||""} onChange={e=>setForm({...form,materielStr:e.target.value})} placeholder="Ex : peinture, papier, tablier"/></AdminField>
          <AdminField label="Etapes"><textarea style={{...s.input,minHeight:80,resize:"vertical"}} value={form.etapes||""} onChange={e=>setForm({...form,etapes:e.target.value})} placeholder={"1. Preparer le materiel\n2. ..."}/></AdminField>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginBottom:14}}>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#f97316"}}>🍼 Bebes et jeunes enfants</p>
            <p style={{margin:"0 0 8px",fontSize:11,color:C.muted}}>Coche ce qui correspond</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
              {[["acc_poussette","Adapte poussette"],["acc_bebe","Adapte bebe"],["acc_allaitement","Espace allaitement"],["acc_langer","Table a langer"],["acc_aire03","Aire de jeux 0-3 ans"],["acc_peubruyant","Peu bruyant"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#3b82f6"}}>♿ Mobilite reduite PMR</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
              {[["pmr_fauteuil","Acces fauteuil"],["pmr_escaliers","Sans escaliers"],["pmr_parking","Parking PMR"],["pmr_toilettes","Toilettes adaptees"],["pmr_personnel","Personnel forme"],["pmr_chemin","Chemin accessible"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#a78bfa"}}>🧩 Troubles du neurodeveloppement TND</p>
            <p style={{margin:"0 0 8px",fontSize:11,color:C.muted}}>Ces infos aident les familles TND</p>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#8b5cf6"}}>TSA Autisme</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tsa_foule","Peu de foule"],["tsa_calme","Env calme"],["tsa_lumiere","Lumiere douce"],["tsa_retrait","Espace retrait"],["tsa_bruit","Peu de bruit"],["tsa_personnel","Personnel TSA"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#ec4899"}}>TDAH</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["tdah_espace","Grand espace"],["tdah_physique","Activite physique"],["tdah_attente","Peu attente"],["tdah_stimulation","Stimulation variee"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
            <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:"#06b6d4"}}>DYS</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {[["dys_visuels","Supports visuels"],["dys_nonecrite","Non ecrite"],["dys_rythme","Rythme libre"],["dys_personnel","Personnel DYS"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
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

function Sorties() {
  const DEPTS_ALL=[["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes-de-Haute-Provence"],["05","Hautes-Alpes"],["06","Alpes-Maritimes"],["07","Ardeche"],["08","Ardennes"],["09","Ariege"],["10","Aube"],["11","Aude"],["12","Aveyron"],["13","Bouches-du-Rhone"],["14","Calvados"],["15","Cantal"],["16","Charente"],["17","Charente-Maritime"],["18","Cher"],["19","Correze"],["20","Corse"],["21","Cote-d-Or"],["22","Cotes-d-Armor"],["23","Creuse"],["24","Dordogne"],["25","Doubs"],["26","Drome"],["27","Eure"],["28","Eure-et-Loir"],["29","Finistere"],["30","Gard"],["31","Haute-Garonne"],["32","Gers"],["33","Gironde"],["34","Herault"],["35","Ille-et-Vilaine"],["36","Indre"],["37","Indre-et-Loire"],["38","Isere"],["39","Jura"],["40","Landes"],["41","Loir-et-Cher"],["42","Loire"],["43","Haute-Loire"],["44","Loire-Atlantique"],["45","Loiret"],["46","Lot"],["47","Lot-et-Garonne"],["48","Lozere"],["49","Maine-et-Loire"],["50","Manche"],["51","Marne"],["52","Haute-Marne"],["53","Mayenne"],["54","Meurthe-et-Moselle"],["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Nievre"],["59","Nord"],["60","Oise"],["61","Orne"],["62","Pas-de-Calais"],["63","Puy-de-Dome"],["64","Pyrenees-Atlantiques"],["65","Hautes-Pyrenees"],["66","Pyrenees-Orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rhone"],["70","Haute-Saone"],["71","Saone-et-Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute-Savoie"],["75","Paris"],["76","Seine-Maritime"],["77","Seine-et-Marne"],["78","Yvelines"],["79","Deux-Sevres"],["80","Somme"],["81","Tarn"],["82","Tarn-et-Garonne"],["83","Var"],["84","Vaucluse"],["85","Vendee"],["86","Vienne"],["87","Haute-Vienne"],["88","Vosges"],["89","Yonne"],["90","Territoire de Belfort"],["91","Essonne"],["92","Hauts-de-Seine"],["93","Seine-Saint-Denis"],["94","Val-de-Marne"],["95","Val-d-Oise"],["971","Guadeloupe"],["972","Martinique"],["973","Guyane"],["974","La Reunion"]];
  const TYPES_ALL=["Parc","Balade","Musee","Aquarium","Zoo","Bowling","Cinema","Escape game","Piscine","Plage","Patinoire","Ferme pedagogique","Restaurant","Parc d attraction","Evenement","Autre..."];
  const emptyForm={titre:"",dept:"",adresse:"",horaires:"",prix:"",categorie:"",statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false};
  const [items,setItems] = useState(MOCK_SORTIES);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState(emptyForm);
  const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
  const filtered = items.filter(a=>!search||a.titre.toLowerCase().includes(search.toLowerCase()));
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") setItems(items.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else setItems([...items,{id:Date.now().toString(),...form}]);
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
        {filtered.map(o=>(
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
              <button style={s.btnOutline(C.red)} onClick={()=>setItems(items.filter(x=>x.id!==o.id))}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(()=>{
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(236,72,153,0.4)":C.border}`,background:active?"rgba(236,72,153,0.1)":"transparent",color:active?"#f472b6":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
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
            <select style={s.input} value={form.categorie||""} onChange={e=>setForm({...form,categorie:e.target.value})}>
              <option value="">Choisir un type</option>
              {TYPES_ALL.map(t=><option key={t}>{t}</option>)}
            </select>
          </AdminField>
          <AdminField label="Adresse"><input style={s.input} value={form.adresse||""} onChange={e=>setForm({...form,adresse:e.target.value})} placeholder="123 rue de la Paix, Paris"/></AdminField>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <AdminField label="Horaires"><input style={s.input} value={form.horaires||""} onChange={e=>setForm({...form,horaires:e.target.value})} placeholder="9h-18h"/></AdminField>
            <AdminField label="Prix"><input style={s.input} value={form.prix||""} onChange={e=>setForm({...form,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
          </div>

          {/* Accessibilité */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:4}}>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#f97316"}}>🍼 Bébés et jeunes enfants</p>
            <p style={{margin:"0 0 8px",fontSize:11,color:C.muted}}>Coche ce qui correspond</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["acc_poussette","Adapté poussette"],["acc_bebe","Adapté bébé"],["acc_allaitement","Espace allaitement"],["acc_langer","Table à langer"],["acc_aire03","Aire de jeux 0-3 ans"],["acc_peubruyant","Peu bruyant"]].map(([k,l])=>(
                <div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>
              ))}
            </div>
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

function Evenements() {
  const [items,setItems] = useState(MOCK_EVENTS);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({titre:"",desc:"",type:"",ville:"",dept:"",date:"",fin:"",horaires:"",prix:"",adresse:"",organisateur:"",statut:"draft",programmation:{date:"",heure:""},etiquettes:[],acc_poussette:false,acc_bebe:false,acc_allaitement:false,acc_langer:false,acc_aire03:false,acc_peubruyant:false,pmr_fauteuil:false,pmr_escaliers:false,pmr_parking:false,pmr_toilettes:false,pmr_personnel:false,pmr_chemin:false,tsa_foule:false,tsa_calme:false,tsa_lumiere:false,tsa_retrait:false,tsa_bruit:false,tsa_personnel:false,tdah_espace:false,tdah_physique:false,tdah_attente:false,tdah_stimulation:false,dys_visuels:false,dys_nonecrite:false,dys_rythme:false,dys_personnel:false});
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") setItems(items.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else setItems([...items,{id:Date.now().toString(),...form}]);
    setModal(null);
  };
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>Événements</h1><p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Gérez les événements ponctuels</p></div>
        <button style={s.btn(C.orange)} onClick={()=>{setForm({titre:"",date:"",fin:"",ville:"",organisateur:"",prix:"",type:"spectacle",statut:"draft"});setModal({mode:"add"});}}>+ Nouvel événement</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un événement..."/>
      <div style={{...s.card,padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"#0d1117"}}>{["Titre","Type","Date","Ville","Statut","Actions"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{items.filter(a=>!search||a.titre.toLowerCase().includes(search.toLowerCase())).map((a,i)=>(
            <tr key={a.id} style={{borderTop:`1px solid ${C.border}`}}>
              <td style={{padding:"12px 16px"}}>
                <p style={{margin:"0 0 4px",fontSize:13,color:C.text,fontWeight:500}}>{a.titre}</p>
                {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge("rgba(249,115,22,0.15)","#fb923c")}>{a.type}</span></td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.date}</td>
              <td style={{padding:"12px 16px",fontSize:13,color:C.text}}>📍 {a.ville}</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button style={s.btnOutline(C.accent)} onClick={()=>{setForm({...a});setModal({mode:"edit",item:a});}}>✏️</button>
                  <button style={s.btnOutline(C.red)} onClick={()=>setItems(items.filter(x=>x.id!==a.id))}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal&&(()=>{
        const DEPTS_EVT=[["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes-de-Haute-Provence"],["05","Hautes-Alpes"],["06","Alpes-Maritimes"],["07","Ardeche"],["08","Ardennes"],["09","Ariege"],["10","Aube"],["11","Aude"],["12","Aveyron"],["13","Bouches-du-Rhone"],["14","Calvados"],["15","Cantal"],["16","Charente"],["17","Charente-Maritime"],["18","Cher"],["19","Correze"],["20","Corse"],["21","Cote-d-Or"],["22","Cotes-d-Armor"],["23","Creuse"],["24","Dordogne"],["25","Doubs"],["26","Drome"],["27","Eure"],["28","Eure-et-Loir"],["29","Finistere"],["30","Gard"],["31","Haute-Garonne"],["32","Gers"],["33","Gironde"],["34","Herault"],["35","Ille-et-Vilaine"],["36","Indre"],["37","Indre-et-Loire"],["38","Isere"],["39","Jura"],["40","Landes"],["41","Loir-et-Cher"],["42","Loire"],["43","Haute-Loire"],["44","Loire-Atlantique"],["45","Loiret"],["46","Lot"],["47","Lot-et-Garonne"],["48","Lozere"],["49","Maine-et-Loire"],["50","Manche"],["51","Marne"],["52","Haute-Marne"],["53","Mayenne"],["54","Meurthe-et-Moselle"],["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Nievre"],["59","Nord"],["60","Oise"],["61","Orne"],["62","Pas-de-Calais"],["63","Puy-de-Dome"],["64","Pyrenees-Atlantiques"],["65","Hautes-Pyrenees"],["66","Pyrenees-Orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rhone"],["70","Haute-Saone"],["71","Saone-et-Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute-Savoie"],["75","Paris"],["76","Seine-Maritime"],["77","Seine-et-Marne"],["78","Yvelines"],["79","Deux-Sevres"],["80","Somme"],["81","Tarn"],["82","Tarn-et-Garonne"],["83","Var"],["84","Vaucluse"],["85","Vendee"],["86","Vienne"],["87","Haute-Vienne"],["88","Vosges"],["89","Yonne"],["90","Territoire de Belfort"],["91","Essonne"],["92","Hauts-de-Seine"],["93","Seine-Saint-Denis"],["94","Val-de-Marne"],["95","Val-d-Oise"],["971","Guadeloupe"],["972","Martinique"],["973","Guyane"],["974","La Reunion"]];
        const TYPES_EVT=[{val:"kermesse",label:"🎪 Kermesse"},{val:"fete_foraine",label:"🎡 Fete foraine"},{val:"spectacle",label:"🎭 Spectacle"},{val:"cirque",label:"🎪 Cirque"},{val:"saisonnier",label:"🎄 Saisonnier"},{val:"concert",label:"🎵 Concert"},{val:"sport",label:"🏃 Sport"},{val:"autre",label:"Autre"}];
        const chkStyle=(active)=>({display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:8,border:`1px solid ${active?"rgba(249,115,22,0.4)":C.border}`,background:active?"rgba(249,115,22,0.1)":"transparent",color:active?"#fb923c":C.muted,fontSize:12,cursor:"pointer",userSelect:"none"});
        const tf=key=>setForm(p=>({...p,[key]:!p[key]}));
        return(
        <Modal title={modal.mode==="edit"?"Modifier l'événement":"Nouvel événement"} onClose={()=>setModal(null)} width={600}>
          <AdminField label="Nom *"><input style={s.input} value={form.titre||""} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Ex : Kermesse de l'école"/></AdminField>
          <AdminField label="Photo (optionnel)">
            <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"16px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
              <div style={{fontSize:24,marginBottom:4}}>📸</div>
              <p style={{margin:"0 0 2px",fontSize:13,color:C.text}}>Ajouter une photo</p>
              <p style={{margin:0,fontSize:11,color:C.muted}}>JPG, PNG, WEBP - Max 5MB</p>
            </div>
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
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#f97316"}}>🍼 Bébés et jeunes enfants</p>
            <p style={{margin:"0 0 8px",fontSize:11,color:C.muted}}>Coche ce qui correspond</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["acc_poussette","Adapté poussette"],["acc_bebe","Adapté bébé"],["acc_allaitement","Espace allaitement"],["acc_langer","Table à langer"],["acc_aire03","Aire de jeux 0-3 ans"],["acc_peubruyant","Peu bruyant"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
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

function BiblioNoel({onBack}) {
  const [activites,setActivites] = useState([
    {id:"n1",titre:"Fabriquer des boules de Noël",categorie:"Créatif",age:"4-12 ans",duree:"45 min",statut:"published"},
    {id:"n2",titre:"Biscuits de Noël en famille",categorie:"Cuisine",age:"3-10 ans",duree:"60 min",statut:"published"},
    {id:"n3",titre:"Carte de vœux dessinée à la main",categorie:"Créatif",age:"5-12 ans",duree:"30 min",statut:"draft"},
  ]);
  const [modal,setModal] = useState(null);
  const [form,setForm] = useState({titre:"",categorie:"",lieu:"",energie:"",duree:"",difficulte:"",ageMin:"",ageMax:"",desc:"",materiel:"",etapes:"",premium:false,statut:"draft"});
  const save = () => {
    if(!form.titre) return;
    if(modal?.mode==="edit") setActivites(activites.map(a=>a.id===modal.item.id?{...a,...form}:a));
    else setActivites([...activites,{id:"n"+Date.now(),...form}]);
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
                <p style={{margin:"0 0 4px",fontSize:13,color:C.text,fontWeight:500}}>{a.titre}</p>
                {a.etiquettes?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.etiquettes.map((e,i)=><span key={i} style={{fontSize:9,background:e.bg||"#f3f4f6",color:e.color||"#6b7280",padding:"1px 6px",borderRadius:8,fontWeight:600}}>{e.label}</span>)}</div>}
              </td>
              <td style={{padding:"12px 16px"}}><span style={s.badge("rgba(16,185,129,0.15)","#10b981")}>{a.categorie}</span></td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.age}</td>
              <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{a.duree}</td>
              <td style={{padding:"12px 16px"}}>{statutBadge(a.statut)}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6}}>
                  <button style={s.btnOutline(C.accent)} onClick={()=>{setForm({...a});setModal({mode:"edit",item:a});}}>✏️</button>
                  {a.statut==="draft"&&<button style={s.btnOutline(C.green)} onClick={()=>setActivites(activites.map(x=>x.id===a.id?{...x,statut:"published"}:x))}>✅</button>}
                  {a.statut==="published"&&<button style={s.btnOutline(C.yellow)} onClick={()=>setActivites(activites.map(x=>x.id===a.id?{...x,statut:"draft"}:x))}>📝</button>}
                  <button style={s.btnOutline(C.red)} onClick={()=>setActivites(activites.filter(x=>x.id!==a.id))}>🗑️</button>
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
            <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"18px 0",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)"}}>
              <div style={{fontSize:22,marginBottom:4}}>⬆️</div>
              <p style={{margin:0,fontSize:13,color:C.text}}>Ajouter une photo</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:C.muted}}>JPG, PNG - Max 5MB</p>
            </div>
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
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#f97316"}}>🍼 Bébés et jeunes enfants</p>
            <p style={{margin:"0 0 8px",fontSize:11,color:C.muted}}>Coche ce qui correspond</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {[["acc_poussette","Adapté poussette"],["acc_bebe","Adapté bébé"],["acc_allaitement","Espace allaitement"],["acc_langer","Table à langer"],["acc_aire03","Aire de jeux 0-3 ans"],["acc_peubruyant","Peu bruyant"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!form[k])}><span style={{fontSize:14}}>{form[k]?"☑":"☐"}</span>{l}</div>))}
            </div>
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
  const [form,setForm] = useState({nom:"",emoji:"🎉",couleur:"#7c3aed",dateDebut:"",dateFin:"",banner:false,bannerTexte:"",popup:false,popupTexte:"",bibliotheque:true,generateur:true,generateurActif:true,premium:false,fichiers:[]});
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
        <AdminField label="Nom de l'événement *"><input style={s.input} value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} placeholder="Ex : Fête du Printemps"/></AdminField>
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
          <AdminField label="Date de début *"><input style={s.input} type="date" value={form.dateDebut} onChange={e=>setForm({...form,dateDebut:e.target.value})}/></AdminField>
          <AdminField label="Date de fin"><input style={s.input} type="date" value={form.dateFin} onChange={e=>setForm({...form,dateFin:e.target.value})}/></AdminField>
        </div>
      </div>

      {/* Affichage */}
      <div style={{...s.card,marginBottom:16}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 14px"}}>📱 Affichage dans l'app</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>📢 Bandeau d'accueil</p><p style={{margin:0,fontSize:11,color:C.muted}}>Affiche un bandeau coloré en haut de l'accueil</p></div>
          <Tog on={form.banner} onChange={()=>tf("banner")}/>
        </div>
        {form.banner&&<div style={{padding:"10px 0 4px"}}><AdminField label="Texte du bandeau"><input style={s.input} value={form.bannerTexte} onChange={e=>setForm({...form,bannerTexte:e.target.value})} placeholder={`Ex : ${form.nom||"L'événement"} est arrivé ! Découvrez nos activités 🎉`}/></AdminField></div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
          <div><p style={{margin:0,fontSize:13,color:C.text,fontWeight:500}}>💬 Pop-up de lancement</p><p style={{margin:0,fontSize:11,color:C.muted}}>S'affiche à l'ouverture de l'application</p></div>
          <Tog on={form.popup} onChange={()=>tf("popup")}/>
        </div>
        {form.popup&&<div style={{padding:"10px 0 4px"}}><AdminField label="Message de la pop-up"><textarea style={{...s.input,minHeight:60,resize:"vertical"}} value={form.popupTexte} onChange={e=>setForm({...form,popupTexte:e.target.value})} placeholder="Ex : Bienvenue dans l'événement ! Découvrez nos activités spéciales..."/></AdminField></div>}
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

      {/* Fichiers */}
      <div style={{...s.card,marginBottom:20}}>
        <p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 4px"}}>📎 Fichiers attachés</p>
        <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Chaque fichier peut avoir une période d'affichage spécifique.</p>
        <div style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"20px",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)",marginBottom:12}}
          onClick={()=>document.getElementById("file-upload-saisonnier").click()}>
          <div style={{fontSize:28,marginBottom:6}}>⬆️</div>
          <p style={{margin:"0 0 2px",fontSize:13,color:C.text}}>Cliquez pour ajouter des fichiers</p>
          <p style={{margin:0,fontSize:11,color:C.muted}}>PDF, images, documents — Max 10MB par fichier</p>
          <input id="file-upload-saisonnier" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{display:"none"}}
            onChange={e=>{
              const files=Array.from(e.target.files||[]);
              files.forEach(file=>{
                const reader=new FileReader();
                reader.onload=(ev)=>{
                  setForm(prev=>({...prev,fichiers:[...prev.fichiers,{nom:file.name,taille:(file.size/1024/1024).toFixed(1)+"MB",type:file.type,dateDebut:prev.dateDebut||"",dateFin:prev.dateFin||"",dataUrl:ev.target.result}]}));
                };
                reader.readAsDataURL(file);
              });
            }}/>
        </div>
        {form.fichiers.length>0&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {form.fichiers.map((f,i)=>(
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
                      ✓ Visible du {new Date(f.dateDebut).toLocaleDateString("fr-FR")} au {new Date(f.dateFin).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                  {f.dateDebut&&!f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>✓ Visible à partir du {new Date(f.dateDebut).toLocaleDateString("fr-FR")}</p>}
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
          <p style={{margin:0,fontSize:11,color:C.muted}}>PDF, images, documents — Max 10MB</p>
          <input id="file-upload-detail" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{display:"none"}}
            onChange={e=>{
              Array.from(e.target.files||[]).forEach(file=>{
                const reader=new FileReader();
                reader.onload=(ev)=>setForm(prev=>({...prev,fichiers:[...(prev.fichiers||[]),{nom:file.name,taille:(file.size/1024/1024).toFixed(1)+"MB",type:file.type,dateDebut:"",dateFin:"",dataUrl:ev.target.result}]}));
                reader.readAsDataURL(file);
              });
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
              {f.dateDebut&&f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.accent}}>✓ Visible du {new Date(f.dateDebut).toLocaleDateString("fr-FR")} au {new Date(f.dateFin).toLocaleDateString("fr-FR")}</p>}
              {!f.dateDebut&&!f.dateFin&&<p style={{margin:"6px 0 0",fontSize:11,color:C.muted}}>Toujours visible</p>}
            </div>
          </div>
        ))}
        {(form.fichiers||[]).length>0&&<button style={{...s.btn(C.accent),width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>onSave(form)}>✅ Enregistrer les fichiers</button>}
      </div>)}
    </div>
  );
}

function Saisonnier({sharedCustomEvents=[],setSharedCustomEvents}) {
  const [sections,setSections] = useState(MOCK_SEASONAL);
  const customEvents = sharedCustomEvents;
  const setCustomEvents = setSharedCustomEvents||((fn)=>{});
  const [biblioNoel,setBiblioNoel] = useState(false);
  const [creerEvt,setCreerEvt] = useState(false);
  const [selectedEvt,setSelectedEvt] = useState(null); // event being viewed/edited
  const toggle = (id,field) => setSections(sections.map(s=>s.id===id?{...s,[field]:!s[field]}:s));
  const toggleCustom = (id,field) => setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,[field]:!e[field]}:e));
  const handleSaveCustom = (evt) => { setCustomEvents(prev=>[...prev,evt]); setCreerEvt(false); };
  const handleUpdateEvt = (updated) => { setCustomEvents(prev=>prev.map(e=>e.id===updated.id?updated:e)); setSelectedEvt(null); };
  const handleDeleteEvt = (id) => { setCustomEvents(prev=>prev.filter(e=>e.id!==id)); setSelectedEvt(null); };
  const handleArchiveEvt = (id) => { setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,actif:false,archive:true}:e)); setSelectedEvt(null); };
  const handleRestoreEvt = (id) => { setCustomEvents(prev=>prev.map(e=>e.id===id?{...e,archive:false}:e)); };
  if(biblioNoel) return <BiblioNoel onBack={()=>setBiblioNoel(false)}/>;
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
              <div key={evt.id} onClick={()=>setSelectedEvt(evt)} style={{...s.card,border:`2px solid ${evt.actif?evt.couleur+"44":C.border}`,position:"relative",overflow:"hidden",cursor:"pointer"}}>
                {evt.actif&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:evt.couleur}}/>}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:44,height:44,borderRadius:12,background:evt.couleur+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{evt.emoji}</div>
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
  const filtered = users.filter(u=>(filter===""||u.statut===filter)&&(!search||u.nom.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())));
  return (
    <div>
      <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:"0 0 4px"}}>Utilisateurs</h1>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 16px"}}>Gérez les comptes utilisateurs</p>

      {/* Récapitulatif */}
      <div style={{...s.card,marginBottom:20,padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${C.border}`}}>
          {[
            {label:"Utilisateurs total",val:users.length,sub:`${users.filter(u=>u.statut==="active").length} actifs`,emoji:"👥",color:C.blue,bg:"rgba(59,130,246,0.06)"},
            {label:"Abonnés Premium",val:users.filter(u=>u.premium).length,sub:Math.round(users.filter(u=>u.premium).length/users.length*100)+"% de conversion",emoji:"👑",color:"#f59e0b",bg:"rgba(245,158,11,0.06)"},
            {label:"Comptes suspendus",val:users.filter(u=>u.statut==="suspended").length,sub:users.filter(u=>u.statut==="suspended").length>0?"Action requise":"Aucun signalement",emoji:"🚫",color:users.filter(u=>u.statut==="suspended").length>0?C.red:C.green,bg:users.filter(u=>u.statut==="suspended").length>0?"rgba(239,68,68,0.06)":"rgba(16,185,129,0.04)"},
          ].map((st,i)=>(
            <div key={i} style={{padding:"18px 20px",background:st.bg,borderRight:i<2?`1px solid ${C.border}`:"none",cursor:"pointer",transition:"background 0.15s"}} onClick={()=>setFilter(i===0?"":i===1?"":i===2?"suspended":"")}>
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
            <div style={{width:Math.round(users.filter(u=>u.premium).length/users.length*100)+"%",height:"100%",background:"linear-gradient(90deg,#f59e0b,#fcd34d)",borderRadius:4,transition:"width 0.5s"}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:"#f59e0b",whiteSpace:"nowrap"}}>{Math.round(users.filter(u=>u.premium).length/users.length*100)}%</span>
          <span style={{fontSize:11,color:C.muted}}>·</span>
          <span style={{fontSize:12,color:C.muted,whiteSpace:"nowrap"}}>Actifs</span>
          <div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:6,overflow:"hidden"}}>
            <div style={{width:Math.round(users.filter(u=>u.statut==="active").length/users.length*100)+"%",height:"100%",background:"linear-gradient(90deg,#10b981,#34d399)",borderRadius:4}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:C.green,whiteSpace:"nowrap"}}>{Math.round(users.filter(u=>u.statut==="active").length/users.length*100)}%</span>
        </div>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher par nom ou email..."/>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["","active","suspended"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{...s.btnOutline(filter===f?C.accent:C.muted),background:filter===f?"rgba(124,58,237,0.15)":"transparent"}}>{f===""?"Tous":f==="active"?"Actifs":"Suspendus"}</button>)}
      </div>

      {/* Liste utilisateurs enrichie */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(u=>(
          <div key={u.id} style={{...s.card,padding:0,overflow:"hidden",opacity:u.statut==="suspended"?0.7:1,border:u.statut==="suspended"?`1px solid ${C.red}33`:s.card.border}}>
            {/* Ligne principale */}
            <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer"}} onClick={()=>setModal(modal?.id===u.id?null:u)}>
              <Avatar nom={u.nom} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                  <p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{u.nom}</p>
                  {u.statut==="suspended"&&<span style={s.badge("rgba(239,68,68,0.15)","#fca5a5")}>🚫 Suspendu</span>}
                  {u.premium?<span style={s.badge("#fef3c7","#92400e")}>👑 Premium</span>:<span style={s.badge("#e5e7eb","#6b7280")}>Gratuit</span>}
                </div>
                <p style={{margin:0,fontSize:12,color:C.muted}}>✉️ {u.email}</p>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <p style={{margin:"0 0 2px",fontSize:12,color:C.muted}}>👶 {u.enfants.length} enfant{u.enfants.length>1?"s":""}</p>
                <p style={{margin:0,fontSize:11,color:C.muted}}>{u.enfants.map(a=>a+" an"+(a>1?"s":"")).join(", ")}</p>
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
                    ["👶 Enfants",u.enfants.length+" enfant"+(u.enfants.length>1?"s":"")+" ("+u.enfants.map(a=>a+" an"+(a>1?"s":"")).join(", ")+")"],
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
                <div style={{padding:"12px 16px",display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={s.btn(u.statut==="active"?C.red:C.green)} onClick={()=>setUsers(users.map(x=>x.id===u.id?{...x,statut:x.statut==="active"?"suspended":"active"}:x))}>
                    {u.statut==="active"?"🚫 Suspendre":"✅ Réactiver"}
                  </button>
                  <button style={s.btn(u.premium?"#6b7280":"#f59e0b","#000")} onClick={()=>setUsers(users.map(x=>x.id===u.id?{...x,premium:!x.premium}:x))}>
                    {u.premium?"⬇ Retirer Premium":"👑 Offrir Premium"}
                  </button>
                  <button style={{...s.btnOutline(C.red),marginLeft:"auto"}} onClick={()=>{setUsers(users.filter(x=>x.id!==u.id));setModal(null);}}>
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
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
    revSponso:sponsos.filter(s=>s.statut==="active").reduce((a,s)=>a+s.montant,0),
  };
  const revTotal=stats.revMensuel+stats.revAnnuel+stats.revSponso/3;
  const typeIcon={sortie:"🗺️",activite:"🎨",evenement:"📅"};
  const typeColor={sortie:"#f472b6",activite:"#a78bfa",evenement:"#fb923c"};
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
          <div key={sp.id} style={{...s.card,display:"flex",alignItems:"center",gap:14,opacity:sp.statut==="expired"?0.6:1,border:sp.statut==="active"?`1px solid ${typeColor[sp.type]}33`:s.card.border}}>
            <div style={{width:44,height:44,borderRadius:12,background:typeColor[sp.type]+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{typeIcon[sp.type]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{sp.entreprise}</p>
                <span style={s.badge(sp.statut==="active"?"#d1fae5":"#e5e7eb",sp.statut==="active"?"#065f46":"#6b7280")}>{sp.statut==="active"?"✅ Actif":"Expiré"}</span>
                <span style={s.badge(typeColor[sp.type]+"22",typeColor[sp.type])}>{sp.type}</span>
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
        <p style={{margin:0,fontSize:12,color:C.muted}}>Total sponsorisations actives : <strong style={{color:C.green}}>{sponsos.filter(s=>s.statut==="active").reduce((a,s)=>a+s.montant,0)}€</strong> · <strong style={{color:C.text}}>{sponsos.filter(s=>s.statut==="active").length} partenariat{sponsos.filter(s=>s.statut==="active").length>1?"s":""} actif{sponsos.filter(s=>s.statut==="active").length>1?"s":""}</strong></p>
      </div>

      {/* Modal nouveau partenariat */}
      {showSponsoForm&&<Modal title="Nouveau partenariat sponsorisé" onClose={()=>setShowSponsoForm(false)} width={480}>
        <AdminField label="Entreprise *"><input style={s.input} value={sponsoForm.entreprise} onChange={e=>setSponsoForm({...sponsoForm,entreprise:e.target.value})} placeholder="Ex : LEGO France"/></AdminField>
        <AdminField label="Type de contenu sponsorisé">
          <div style={{display:"flex",gap:8}}>
            {[["sortie","🗺️ Sortie"],["activite","🎨 Activité"],["evenement","📅 Événement"]].map(([v,l])=>(
              <button key={v} onClick={()=>setSponsoForm({...sponsoForm,type:v})} style={{flex:1,padding:"9px 0",borderRadius:10,border:`2px solid ${sponsoForm.type===v?C.accent:C.border}`,background:sponsoForm.type===v?"rgba(124,58,237,0.12)":"transparent",color:sponsoForm.type===v?C.accent:C.muted,fontSize:12,cursor:"pointer",fontWeight:sponsoForm.type===v?700:400}}>{l}</button>
            ))}
          </div>
        </AdminField>
        <AdminField label="Contenu associé"><input style={s.input} value={sponsoForm.contenu} onChange={e=>setSponsoForm({...sponsoForm,contenu:e.target.value})} placeholder="Nom de la sortie / activité / événement"/></AdminField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Montant (€)"><input style={s.input} type="number" value={sponsoForm.montant} onChange={e=>setSponsoForm({...sponsoForm,montant:+e.target.value})} placeholder="500"/></AdminField>
          <AdminField label="Durée"><input style={s.input} value={sponsoForm.duree} onChange={e=>setSponsoForm({...sponsoForm,duree:e.target.value})} placeholder="3 mois"/></AdminField>
          <AdminField label="Date début"><input style={s.input} type="date" value={sponsoForm.debut} onChange={e=>setSponsoForm({...sponsoForm,debut:e.target.value})}/></AdminField>
          <AdminField label="Date fin"><input style={s.input} type="date" value={sponsoForm.fin} onChange={e=>setSponsoForm({...sponsoForm,fin:e.target.value})}/></AdminField>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}>
          <button style={s.btnOutline(C.muted)} onClick={()=>setShowSponsoForm(false)}>Annuler</button>
          <button style={s.btn(C.accent)} onClick={()=>{if(!sponsoForm.entreprise)return;setSponsos([...sponsos,{id:"s"+Date.now(),...sponsoForm,statut:"active"}]);setShowSponsoForm(false);setSponsoForm({entreprise:"",type:"sortie",contenu:"",montant:"",duree:"",debut:"",fin:""});}}>Créer le partenariat</button>
        </div>
      </Modal>}
    </div>
  );
}

function Signalements({userReports=[],setUserReports,sharedActivites=[],setSharedActivites,onDeleteTitle}) {
  const [reports,setReports] = useState(MOCK_REPORTS);
  const [editModal,setEditModal] = useState(null); // {report, mode:'edit'|'delete'}
  const [editForm,setEditForm] = useState({});
  const allReports=[...userReports,...reports].sort((a,b)=>b.id-a.id||0);
  const updateAll=(id,st)=>{
    setUserReports(prev=>prev.map(r=>r.id===id?{...r,statut:st}:r));
    setReports(prev=>prev.map(r=>r.id===id?{...r,statut:st}:r));
  };
  const pendingAll = allReports.filter(r=>r.statut==="pending").length;
  const update = (id,st) => updateAll(id,st);
  const typeColor = {activite:["#a78bfa","rgba(124,58,237,0.15)"],sortie:["#f472b6","rgba(236,72,153,0.15)"],evenement:["#fb923c","rgba(249,115,22,0.15)"],comment:["#94a3b8","rgba(148,163,184,0.15)"]};
  const typeIcon = {activite:"🎨",sortie:"🗺️",evenement:"📅"};
  const openEdit=(r)=>{setEditForm({titre:r.titre,raison:r.raison,detail:r.detail||"",desc:r.desc||"",duree:r.duree||"",difficulte:r.difficulte||"",lieu:r.lieu||"",energie:r.energie||"",categorie:r.categorie||"",ageMin:r.ageMin||"",ageMax:r.ageMax||"",materielStr:Array.isArray(r.materiel)?r.materiel.join(", "):"",dept:r.dept||"",adresse:r.adresse||"",horaires:r.horaires||"",prix:r.prix||"",date:r.date||"",fin:r.fin||"",ville:r.ville||"",organisateur:r.organisateur||"",type:r.typeEvt||""});setEditModal({report:r,mode:"edit"});};
  const openDelete=(r)=>setEditModal({report:r,mode:"delete"});
  const saveEdit=()=>{
    setUserReports(prev=>prev.map(r=>r.id===editModal.report.id?{...r,...editForm}:r));
    setReports(prev=>prev.map(r=>r.id===editModal.report.id?{...r,...editForm}:r));
    updateAll(editModal.report.id,"resolved");
    setEditModal(null);
  };
  const deleteItem=()=>{
    const titre=editModal.report.titre;
    setUserReports(prev=>prev.filter(r=>r.id!==editModal.report.id));
    setReports(prev=>prev.filter(r=>r.id!==editModal.report.id));
    if(setSharedActivites)setSharedActivites(prev=>prev.filter(a=>a.nom!==titre&&a.titre!==titre));
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
                  <p style={{margin:0,fontSize:11,color:C.muted}}>Signale par {r.signalePar} · {r.date}</p>
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
            <AdminField label="Categorie"><select style={s.input} value={editForm.categorie||""} onChange={e=>setEditForm({...editForm,categorie:e.target.value})}><option value="">Choisir</option>{["Creatif","Cuisine","Nature","Sport","Calme","Construction","Jeu","Musique","Science"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
            <AdminField label="Age conseille">
              <div style={{display:"flex",gap:8}}>
                <select style={{...s.input,flex:1}} value={editForm.ageMin||""} onChange={e=>setEditForm({...editForm,ageMin:e.target.value})}><option value="">De...</option>{["0 an","1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans"].map(v=><option key={v}>{v}</option>)}</select>
                <select style={{...s.input,flex:1}} value={editForm.ageMax||""} onChange={e=>setEditForm({...editForm,ageMax:e.target.value})}><option value="">A...</option>{["1 an","2 ans","3 ans","4 ans","5 ans","6 ans","7 ans","8 ans","9 ans","10 ans","11 ans","12 ans","12 ans+"].map(v=><option key={v}>{v}</option>)}</select>
              </div>
            </AdminField>
            <AdminField label="Materiel"><input style={s.input} value={editForm.materielStr||""} onChange={e=>setEditForm({...editForm,materielStr:e.target.value})} placeholder="Ex: peinture, papier"/></AdminField>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
              <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#f97316"}}>🍼 Bebes et jeunes enfants</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{[["acc_poussette","Adapte poussette"],["acc_bebe","Adapte bebe"],["acc_allaitement","Espace allaitement"],["acc_langer","Table a langer"],["acc_aire03","Aire de jeux 0-3 ans"],["acc_peubruyant","Peu bruyant"]].map(([k,l])=>(<div key={k} onClick={()=>tf(k)} style={chkStyle(!!editForm[k])}><span>{editForm[k]?"☑":"☐"}</span>{l}</div>))}</div>
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
            <AdminField label="Categorie"><select style={s.input} value={editForm.categorie||""} onChange={e=>setEditForm({...editForm,categorie:e.target.value})}><option value="">Choisir</option>{["Parc","Musee","Ferme","Zoo","Sport","Escape game","Cinema"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
          </div>)}

          {/* CARTE EVENEMENT */}
          {r.type==="evenement"&&(<div>
            <AdminField label="Titre *"><input style={s.input} value={editForm.titre||""} onChange={e=>setEditForm({...editForm,titre:e.target.value})}/></AdminField>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <AdminField label="Date debut"><input style={s.input} value={editForm.date||""} onChange={e=>setEditForm({...editForm,date:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
              <AdminField label="Date fin"><input style={s.input} value={editForm.fin||""} onChange={e=>setEditForm({...editForm,fin:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
              <AdminField label="Ville"><input style={s.input} value={editForm.ville||""} onChange={e=>setEditForm({...editForm,ville:e.target.value})}/></AdminField>
              <AdminField label="Prix"><input style={s.input} value={editForm.prix||""} onChange={e=>setEditForm({...editForm,prix:e.target.value})} placeholder="Gratuit"/></AdminField>
            </div>
            <AdminField label="Organisateur"><input style={s.input} value={editForm.organisateur||""} onChange={e=>setEditForm({...editForm,organisateur:e.target.value})}/></AdminField>
            <AdminField label="Type"><select style={s.input} value={editForm.type||""} onChange={e=>setEditForm({...editForm,type:e.target.value})}><option value="">Choisir</option>{["spectacle","kermesse","salon","festival","atelier"].map(v=><option key={v}>{v}</option>)}</select></AdminField>
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
  const GRADIENTS=["linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)","linear-gradient(135deg,#6ee7b7 0%,#059669 100%)","linear-gradient(135deg,#fde68a 0%,#f59e0b 100%)","linear-gradient(135deg,#fda4af 0%,#e11d48 100%)","linear-gradient(135deg,#67e8f9 0%,#0891b2 100%)","linear-gradient(135deg,#fcd34d 0%,#d97706 100%)","linear-gradient(135deg,#86efac 0%,#16a34a 100%)","linear-gradient(135deg,#f9a8d4 0%,#db2777 100%)"];
  const EMOJIS=["🎨","🌳","📅","🎂","🎪","⭐","🎯","🎵","🏃","🍳","🧩","💡","🎉","🌈","🦋"];
  const pubIsFuture=form.programmation.date&&form.programmation.heure?(()=>{const [y,mo,d]=form.programmation.date.split("-").map(Number);const [h,mi]=form.programmation.heure.split(":").map(Number);return new Date(y,mo-1,d,h,mi)>new Date();})():false;
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
          <AdminField label="Titre *"><input style={s.input} value={form.label} onChange={e=>setForm(p=>({...p,label:e.target.value}))}/></AdminField>
          <AdminField label="Description"><input style={s.input} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="Sous-titre de la vignette"/></AdminField>
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
                <p style={{margin:0,fontSize:11,color:pubIsFuture?"#60a5fa":"#34d399"}}>{pubIsFuture?"⏰ Masquée jusqu'au ":"✅ Publiée depuis le "}{(()=>{const [y,mo,d]=form.programmation.date.split("-").map(Number);const [h,mi]=form.programmation.heure.split(":").map(Number);return new Date(y,mo-1,d,h,mi).toLocaleString("fr-FR",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});})()}</p>
              </div>
            )}
            {(form.programmation.date||form.programmation.heure)&&<button onClick={()=>setForm(p=>({...p,programmation:{date:"",heure:""}}))} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",marginTop:6,padding:0}}>× Supprimer la programmation</button>}
          </div>
          <div style={{display:"flex",gap:8,paddingTop:8,borderTop:`1px solid ${C.border}`}}>
            <button style={{...s.btnOutline(C.muted),flex:1,justifyContent:"center"}} onClick={onClose}>Annuler</button>
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
        <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Contrôlez les 4 vignettes affichées sur l'accueil utilisateur</p>
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
      {selectedIdee!==null&&<IdeeDetailModal idee={ideesMomentConfig[selectedIdee]} onSave={changes=>{setIdeesMomentConfig(prev=>prev.map((x,j)=>j===selectedIdee?{...x,...changes}:x));setSelectedIdee(null);}} onClose={()=>setSelectedIdee(null)}/>}
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
                <button style={{...s.btnOutline(C.accent),flex:1}} onClick={()=>{setForm({...comm});setModal({mode:"edit",item:comm});}}>✏️ Modifier</button>
                <button style={s.btnOutline(C.red)} onClick={()=>setComms(comms.filter(c=>c.id!==comm.id))}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
      {modal&&<Modal title={modal.mode==="edit"?"Modifier":"Nouveau message"} onClose={()=>setModal(null)}>
        <AdminField label="Type"><select style={s.input} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="banner">📢 Bandeau</option><option value="popup">💬 Pop-up</option><option value="push">🔔 Notification push</option></select></AdminField>
        <AdminField label="Titre"><input style={s.input} value={form.titre} onChange={e=>setForm({...form,titre:e.target.value})} placeholder="Titre du message"/></AdminField>
        <AdminField label="Message"><textarea style={{...s.input,minHeight:80,resize:"vertical"}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Contenu du message..."/></AdminField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AdminField label="Début"><input style={s.input} value={form.debut} onChange={e=>setForm({...form,debut:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
          <AdminField label="Fin"><input style={s.input} value={form.fin} onChange={e=>setForm({...form,fin:e.target.value})} placeholder="JJ/MM/AAAA"/></AdminField>
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
  const filtered = admins.filter(a=>!search||`${a.prenom} ${a.nom} ${a.email}`.toLowerCase().includes(search.toLowerCase()));
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
          <AdminField label="Prénom"><input style={s.input} value={form.prenom} onChange={e=>setForm({...form,prenom:e.target.value})}/></AdminField>
          <AdminField label="Nom"><input style={s.input} value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})}/></AdminField>
        </div>
        <AdminField label="Email"><input style={s.input} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></AdminField>
        <AdminField label="Rôle"><select style={s.input} value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="moderateur">👁️ Modérateur</option><option value="admin">🛡️ Admin</option><option value="super_admin">👑 Super Admin</option></select></AdminField>
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
        <div style={{width:38,height:38,borderRadius:10,background:"rgba(124,58,237,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{typeIcon[c._type]||"📝"}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",gap:6,marginBottom:4,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,background:"rgba(124,58,237,0.15)",color:"#a78bfa",padding:"1px 8px",borderRadius:8,fontWeight:600}}>{typeLabel[c._type]}</span>
            {c._signalements>0&&<span style={{fontSize:11,background:"rgba(239,68,68,0.15)",color:"#fca5a5",padding:"1px 8px",borderRadius:8,fontWeight:600}}>🚩 {c._signalements} signalement{c._signalements>1?"s":""}</span>}
            <span style={{fontSize:10,color:C.muted,marginLeft:"auto"}}>{new Date(c._createdAt).toLocaleDateString("fr-FR")}</span>
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

const PAGES_FN = {dashboard:(props)=><Dashboard {...props}/>,sos:(props)=><AdminSOS {...props}/>,activites:(props)=><Activites {...props}/>,sorties:()=><Sorties/>,evenements:()=><Evenements/>,saisonnier:(props)=><Saisonnier {...props}/>,utilisateurs:()=><Utilisateurs/>,abonnements:()=><Abonnements/>,signalements:(props)=><Signalements {...props}/>,communication:(props)=><Communication key="comm" {...props}/>,admins:()=><Admins/>};

function AdminSOS({sosLib=[],setSosLib}){
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({titre:"",desc:"",duree:"",age:"",materiel:"",statut:"published"});
  const [sosActif,setSosActif]=useState(true);
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
            <Tog on={sosActif} onChange={()=>setSosActif(!sosActif)}/>
            <span style={{fontSize:12,color:sosActif?C.green:C.red,fontWeight:600}}>{sosActif?"Actif":"Inactif"}</span>
          </div>
          <button style={s.btn("#ef4444")} onClick={()=>{setForm({titre:"",desc:"",duree:"",age:"",materiel:"",statut:"published"});setModal({mode:"add"});}}>+ Ajouter une activité</button>
        </div>
      </div>

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
            <AdminField label="Âge conseillé"><input style={s.input} value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="2-12 ans"/></AdminField>
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

          {/* ─── FILTRE 4 — TEMPS ─── */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
            <p style={{margin:"0 0 2px",fontSize:12,fontWeight:800,color:"#fbbf24",textTransform:"uppercase",letterSpacing:"0.5px"}}>⏱️ Filtre 4 — Temps disponible</p>
            <p style={{margin:"0 0 10px",fontSize:11,color:C.muted}}>Crucial pour la pertinence en situation de crise</p>
            <div style={{display:"flex",gap:7}}>
              {[{v:"temps_1_2min",l:"⚡ 1-2 min"},{v:"temps_5min",l:"🕐 5 min"},{v:"temps_10_15min",l:"🕙 10-15 min"},{v:"temps_30min",l:"🕐 30 min+"}].map(p=>(
                <ChipBtn key={p.v} active={!!form[p.v]} onClick={()=>tf(p.v)} color="#fbbf24">{p.l}</ChipBtn>
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

function PageAdmin({onLogout,pendingContribs=[],updateContrib,adminActivites=[],setAdminActivites,adminReports=[],setAdminReports,addDeletedTitle,adminCustomEvents=[],setAdminCustomEvents,sosLib=[],setSosLib,ideesMomentConfig=[],setIdeesMomentConfig}) {
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
          {page==="contributions"?<Contributions items={pendingContribs} updateContrib={updateContrib}/>:PAGES_FN[page]?PAGES_FN[page]({sharedActivites:adminActivites,setSharedActivites:setAdminActivites,userReports:adminReports,setUserReports:setAdminReports,onDeleteTitle:addDeletedTitle,sharedCustomEvents:adminCustomEvents,setSharedCustomEvents:setAdminCustomEvents,pendingContribs,dashUserReports:adminReports,sosLib,setSosLib,ideesMomentConfig,setIdeesMomentConfig}):null}
        </main>
      </div>
    </div>
  );
}


export default function App(){
  const [page,setPage]=useState("accueil");
  const [favoris,setFavoris]=useState([]);
  const [enfants,setEnfants]=useState([
    {id:"1",prenom:"Lucas",age:7,emoji:"👦",profils:["TSA"],couleur:"#6C5CE7",niveauxSensoriels:{bruit:30,lumiere:60,foule:80,imprevu:20}},
    {id:"2",prenom:"Emma",age:5,emoji:"👧",profils:["TDAH"],couleur:"#10B981",niveauxSensoriels:{bruit:70,lumiere:40,foule:50,imprevu:60}},
  ]);
  const [enfantActif,setEnfantActif]=useState("1");
  const [showGestionEnfants,setShowGestionEnfants]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  const [pendingContribs,setPendingContribs]=useState([]);
  const [adminActivites,setAdminActivites]=useState([]);
  const [adminReports,setAdminReports]=useState([]);
  const [deletedTitles,setDeletedTitles]=useState(new Set());
  const [customEvents,setCustomEvents]=useState([]);
  const [ideesMomentConfig,setIdeesMomentConfig]=useState([
    {id:"activites",label:"Activités créatives",emoji:"🎨",gradient:"linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",actif:true},
    {id:"nature",label:"Sorties nature",emoji:"🌳",gradient:"linear-gradient(135deg,#6ee7b7 0%,#059669 100%)",actif:true},
    {id:"evenements",label:"Événements",emoji:"📅",gradient:"linear-gradient(135deg,#fde68a 0%,#f59e0b 100%)",actif:true},
    {id:"anniversaire",label:"Idées anniversaire",emoji:"🎂",gradient:"linear-gradient(135deg,#fda4af 0%,#e11d48 100%)",actif:true},
  ]);
  const [sosLib,setSosLib]=useState([
    {id:"sos1",titre:"Dessin libre",desc:"Donne-lui une feuille et des crayons, laisse faire.",duree:"moins de 15 min",age:"2-12 ans",materiel:["feuilles","crayons"],statut:"published"},
    {id:"sos2",titre:"Vidéo YouTube kids",desc:"Une vidéo courte pour souffler 10 minutes.",duree:"moins de 15 min",age:"2-10 ans",materiel:[],statut:"published"},
    {id:"sos3",titre:"Pâte à modeler",desc:"Sortir la pâte à modeler, c'est 30 min tranquilles garanties.",duree:"15-30 min",age:"2-8 ans",materiel:["pate a modeler"],statut:"published"},
    {id:"sos4",titre:"Puzzle ou construction",desc:"Un puzzle adapté à l'âge ou des Lego.",duree:"30-60 min",age:"3-12 ans",materiel:["puzzle ou lego"],statut:"published"},
  ]);
  const [popupShown,setPopupShown]=useState(new Set());
  const addReport=(report)=>setAdminReports(prev=>[{...report,id:Date.now(),date:new Date().toLocaleDateString("fr-FR"),statut:"pending"},...prev]);
  const addDeletedTitle=(titre)=>setDeletedTitles(prev=>new Set([...prev,titre]));
  const addPendingContrib=(item)=>setPendingContribs(prev=>[{...item,id:Date.now(),_createdAt:new Date().toISOString(),_statut:"pending",_signalements:0,_raisonSignalement:""},  ...prev]);
  const updateContrib=(id,changes)=>setPendingContribs(prev=>prev.map(c=>c.id===id?{...c,...changes}:c));
  const [showAdminLogin,setShowAdminLogin]=useState(false);
  const [adminCodeInput,setAdminCodeInput]=useState("");
  const [adminError,setAdminError]=useState(false);
  const handleAdminLogin=()=>{if(adminCodeInput===ADMIN_CODE){setIsAdmin(true);setShowAdminLogin(false);setAdminCodeInput("");}else{setAdminError(true);setTimeout(()=>setAdminError(false),2000);}};
  const leftTabs=[{k:"accueil",icon:"🏠",label:"Accueil"},{k:"biblio",icon:"📖",label:"Biblio"}];
  const rightTabs=[{k:"planning",icon:"📅",label:"Planning"},{k:"profil",icon:"👤",label:"Profil"}];
  if(isAdmin) return <PageAdmin onLogout={()=>{ setIsAdmin(false); setPage("profil"); }} pendingContribs={pendingContribs} updateContrib={updateContrib} adminActivites={adminActivites} setAdminActivites={setAdminActivites} adminReports={adminReports} setAdminReports={setAdminReports} addDeletedTitle={addDeletedTitle} adminCustomEvents={customEvents} setAdminCustomEvents={setCustomEvents} sosLib={sosLib} setSosLib={setSosLib} ideesMomentConfig={ideesMomentConfig} setIdeesMomentConfig={setIdeesMomentConfig}/>;
  return(
    <div style={{maxWidth:390,margin:"0 auto",background:BG,minHeight:"100vh",position:"relative",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      {showAdminLogin&&(
        <div onClick={()=>setShowAdminLogin(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 32px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:20,padding:28,width:"100%",maxWidth:320,boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,"+V+",#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px"}}>⚙️</div>
              <p style={{margin:"0 0 4px",fontSize:17,fontWeight:800,color:TX}}>Acces Administrateur</p>
              <p style={{margin:0,fontSize:12,color:TM}}>Entre le code secret pour continuer</p>
            </div>
            <div style={{position:"relative",marginBottom:8}}>
              <input type="password" value={adminCodeInput} onChange={e=>{setAdminCodeInput(e.target.value);setAdminError(false);}} onKeyDown={e=>e.key==="Enter"&&handleAdminLogin()} placeholder="Code secret..." style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"2px solid "+(adminError?"#DC2626":adminCodeInput?"rgba(108,92,231,0.4)":"rgba(108,92,231,0.15)"),fontSize:14,color:TX,background:BG,boxSizing:"border-box",outline:"none",fontFamily:"inherit",letterSpacing:"0.15em",textAlign:"center",transition:"border 0.2s"}}/>
            </div>
            {adminError&&<p style={{margin:"0 0 10px",fontSize:12,color:"#DC2626",textAlign:"center"}}>Code incorrect. Reessaie.</p>}
            <button onClick={handleAdminLogin} style={{width:"100%",padding:"13px 0",borderRadius:28,background:V,border:"none",color:WH,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:10}}>Entrer</button>
            <button onClick={()=>{setShowAdminLogin(false);setAdminCodeInput("");}} style={{width:"100%",padding:"11px 0",borderRadius:28,background:WH,border:"1.5px solid #E5E7EB",color:TM,fontWeight:600,fontSize:13,cursor:"pointer"}}>Annuler</button>
          </div>
        </div>
      )}
      <div style={{paddingBottom:72}}>
        {page==="accueil"&&<PageAccueil favoris={favoris} setFavoris={setFavoris} setPage={setPage} customEvents={customEvents} popupShown={popupShown} setPopupShown={setPopupShown} ideesMomentConfig={ideesMomentConfig}/>}
        {page==="biblio"&&<PageBiblio pendingContribs={pendingContribs} setPendingContribs={setPendingContribs} adminActivites={adminActivites} addReport={addReport} adminReports={adminReports} deletedTitles={deletedTitles}/>}
        {page==="generer"&&<PageAccueil favoris={favoris} setFavoris={setFavoris} setPage={setPage} customEvents={customEvents} popupShown={popupShown} setPopupShown={setPopupShown} ideesMomentConfig={ideesMomentConfig}/>}
        {page==="planning"&&<PagePlanning sosLib={sosLib} enfants={enfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif}/>}
        {page==="profil"&&<PageProfil setPage={setPage} onAdminAccess={()=>setShowAdminLogin(true)} enfants={enfants} setEnfants={setEnfants} enfantActif={enfantActif} setEnfantActif={setEnfantActif} showGestionEnfants={showGestionEnfants} setShowGestionEnfants={setShowGestionEnfants}/>}
        {page==="favoris"&&<PageFavoris favoris={favoris} setFavoris={setFavoris}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:390,background:WH,borderTop:BD,display:"flex",alignItems:"flex-end",zIndex:200,paddingBottom:4}}>
        {leftTabs.map(t=>(
          <button key={t.k} onClick={()=>setPage(t.k)} style={{flex:1,padding:"10px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:20,filter:page===t.k?"none":"grayscale(1) opacity(0.5)"}}>{t.icon}</span>
            <span style={{fontSize:10,color:page===t.k?V:TM,fontWeight:page===t.k?700:400}}>{t.label}</span>
          </button>
        ))}
        {/* Central Generer button */}
        <button onClick={()=>setPage("generer")} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:0,position:"relative",top:-10}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:V,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 4px 16px rgba(108,92,231,0.35)",border:"3px solid "+WH}}>🪄</div>
          <span style={{fontSize:10,color:page==="generer"?V:TM,fontWeight:700,marginTop:2}}>Générer</span>
        </button>
        {rightTabs.map(t=>(
          <button key={t.k} onClick={()=>setPage(t.k)} style={{flex:1,padding:"10px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:20,filter:page===t.k?"none":"grayscale(1) opacity(0.5)"}}>{t.icon}</span>
            <span style={{fontSize:10,color:page===t.k?V:TM,fontWeight:page===t.k?700:400}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
