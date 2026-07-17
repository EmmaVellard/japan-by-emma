import { maps } from './maps';

export type RecommendationSource = 'mapstr' | 'google';

export interface DistrictRecommendation {
  name: string;
  category: string;
  note: string;
  source: RecommendationSource;
}

export interface CityDistrict {
  name: string;
  description: string;
  descriptionHighlights?: string[];
  pointsOfInterest: string[];
  recommendations: DistrictRecommendation[];
}

export const districtMapLinks = maps;

export const cityDistricts: Record<
  'en' | 'fr',
  Record<string, CityDistrict[]>
> = {
  en: {
    tokyo: [
      {
        name: 'Asakusa & Ueno',
        description:
          'Old Tokyo atmosphere, temples, kitchenware streets, museums and long walks around the east side of the city.',
        pointsOfInterest: [
          'Sensō-ji and Kaminarimon',
          'Nakamise-dōri',
          'Ueno Park and Tokyo National Museum',
        ],
        recommendations: [
          {
            name: 'Umetohoshi',
            category: 'Japanese set meals · Asakusa',
            note: 'Draw one of the Seven Lucky Gods and let that god choose your set meal at random.',
            source: 'mapstr',
          },
          {
            name: 'Edomae Unagi Kamameshi Edosada',
            category: 'Unagi & kamameshi · Asakusa',
            note: 'On a quieter street near Asakusa, this restaurant is known for its eel dishes, especially unagi kamameshi.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Ryōgoku & Sumida',
        description:
          'A calmer stretch of eastern Tokyo for riverside views, sumo history and a different pace from the busiest centres.',
        pointsOfInterest: [
          'Ryōgoku Kokugikan',
          'Tokyo Skytree',
          'Sumida River walks',
        ],
        recommendations: [
          {
            name: 'Daizen Sushi',
            category: 'Sushi · Sumida',
            note: 'A small neighbourhood sushi spot in Sumida for a simple meal away from Tokyo’s busiest areas.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Akihabara & Kanda',
        description:
          'Electronics, games, manga and dense vertical shops around Akihabara, balanced by the calmer shrine streets of nearby Kanda.',
        descriptionHighlights: ['games', 'manga'],
        pointsOfInterest: [
          'Akihabara Electric Town',
          'Kanda Myōjin',
          'Akihabara Radio Kaikan',
        ],
        recommendations: [],
      },
      {
        name: 'Shibuya, Harajuku & Omotesandō',
        description:
          'One full day can move from busy crossings and fashion streets to quieter back lanes, cafés and Meiji-jingū.',
        pointsOfInterest: [
          'Shibuya Crossing',
          'Meiji-jingū',
          'Yoyogi Park and Takeshita-dōri',
        ],
        recommendations: [
          {
            name: 'TsuruTonTan UDON NOODLE Brasserie Shibuya',
            category: 'Udon · Shibuya',
            note: 'A modern udon brasserie on the 13th floor of Shibuya Scramble Square, directly above the station.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Shinjuku',
        description:
          'Skyscraper views, department stores, tiny evening streets and one of Tokyo’s most useful transport hubs.',
        pointsOfInterest: [
          'Shinjuku Gyoen',
          'Tokyo Metropolitan Government observatories',
          'Omoide Yokochō',
        ],
        recommendations: [
          {
            name: 'Nakizakana',
            category: 'Seafood izakaya · Shinjuku',
            note: 'A seafood-focused izakaya where you can choose a whole seasonal fish and how you would like it prepared.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Ginza, Marunouchi & Nihonbashi',
        description:
          'Architecture, stationery, food halls and a polished city walk around Tokyo Station and the Imperial Palace edge.',
        descriptionHighlights: ['Tokyo Station'],
        pointsOfInterest: [
          'Tokyo Station',
          'Imperial Palace East Gardens',
          'Ginza and Nihonbashi streets',
        ],
        recommendations: [
          {
            name: 'Manten Sushi Marunouchi',
            category: 'Omakase sushi · Marunouchi',
            note: 'For an omakase experience where the chef prepares each sushi in front of you; book in advance.',
            source: 'mapstr',
          },
          {
            name: 'Nemuro Hanamaru · KITTE Marunouchi',
            category: 'Conveyor-belt sushi · Marunouchi',
            note: 'A livelier and more casual sushi option nearby, on the fifth floor of KITTE.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Daikanyama, Nakameguro & Ebisu',
        description:
          'A good area for a slower afternoon built around independent shops, cafés and wandering beside the Meguro River.',
        pointsOfInterest: [
          'Meguro River',
          'Daikanyama T-Site',
          'Yebisu Garden Place',
        ],
        recommendations: [],
      },
      {
        name: 'Odaiba & Toyosu',
        description:
          'Wide waterfront spaces, contemporary attractions and open views that feel very different from central Tokyo.',
        descriptionHighlights: ['contemporary attractions'],
        pointsOfInterest: [
          'Odaiba Seaside Park',
          'Rainbow Bridge viewpoints',
          'Toyosu Market',
          'teamLab Planets TOKYO',
        ],
        recommendations: [],
      },
    ],
    kyoto: [
      {
        name: 'Gion & Higashiyama',
        description:
          'Historic streets, temples and early-morning walks; this is an area I would explore slowly before it becomes busy.',
        pointsOfInterest: [
          'Kiyomizu-dera',
          'Yasaka-jinja',
          'Ninenzaka and Sannenzaka',
        ],
        recommendations: [],
      },
      {
        name: 'Central Kyoto & Nijō',
        description:
          'A practical base with markets, everyday streets and easy connections to several sides of the city.',
        pointsOfInterest: [
          'Nijō Castle',
          'Nishiki Market',
          'Kyoto Imperial Palace',
        ],
        recommendations: [
          {
            name: 'continue.nijojokita',
            category: 'Hotel · Kamigyō',
            note: 'A small, quiet stay north of Nijō Castle, away from Kyoto’s busiest streets.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Arashiyama',
        description:
          'River scenery, gardens and mountain edges; arriving early leaves more room to enjoy the landscape.',
        pointsOfInterest: [
          'Arashiyama Bamboo Grove',
          'Tenryū-ji',
          'Togetsukyō Bridge',
        ],
        recommendations: [
          {
            name: 'Arashiyama Itsukichaya',
            category: 'Saved address · Arashiyama',
            note: 'A place saved on my broader Google map for future trip planning.',
            source: 'google',
          },
        ],
      },
      {
        name: 'Fushimi',
        description:
          'Shrine paths, sake streets and canals south of the centre, with an atmosphere that rewards an early start.',
        pointsOfInterest: [
          'Fushimi Inari Taisha',
          'Fushimi sake district',
          'Canal walk and Gekkeikan museum',
        ],
        recommendations: [],
      },
    ],
    osaka: [
      {
        name: 'Namba & Dōtonbori',
        description:
          'The bright, food-centred heart of the city, best enjoyed as an evening of wandering rather than a checklist.',
        pointsOfInterest: [
          'Dōtonbori canal',
          'Hōzenji Yokochō',
          'Kuromon Ichiba Market',
        ],
        recommendations: [
          {
            name: 'Cafe Mog',
            category: 'Café · Namba',
            note: 'A relaxed café stop in central Namba for a break between the surrounding shopping streets.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Tennōji',
        description:
          'Parks, museums and neighbourhood streets south of the centre, with plenty of space for a relaxed afternoon.',
        pointsOfInterest: [
          'Shitennō-ji',
          'Tennōji Park and Tenshiba',
          'Abeno Harukas',
        ],
        recommendations: [
          {
            name: 'Aoi Napoli in the Park',
            category: 'Italian restaurant · Tennōji',
            note: 'An Italian restaurant in Tenshiba park for a slower lunch or dinner with some outdoor space.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Umeda & Nakazakichō',
        description:
          'Big-city views and transport around Umeda, balanced by smaller cafés and old houses in nearby Nakazakichō.',
        pointsOfInterest: [
          'Umeda Sky Building',
          'Grand Green Osaka',
          'Nakazakichō lanes',
        ],
        recommendations: [],
      },
      {
        name: 'Shinsekai',
        description:
          'A compact, lively district for retro signs, kushikatsu and an evening walk beneath Tsūtenkaku.',
        pointsOfInterest: [
          'Tsūtenkaku',
          'Jan-Jan Yokochō',
          'Shinsekai market streets',
        ],
        recommendations: [],
      },
      {
        name: 'Jūsō & northern Osaka',
        description:
          'A more local base north of the centre, convenient for moving between Osaka and Kyoto.',
        pointsOfInterest: [
          'Jūsō shopping streets',
          'Yodo River embankment',
          'Local covered arcades',
        ],
        recommendations: [
          {
            name: 'AFP Juso Apartment',
            category: 'Hotel · Jūsō',
            note: 'A practical apartment stay near Jūsō, with convenient connections to both Osaka and Kyoto.',
            source: 'mapstr',
          },
        ],
      },
    ],
    kamakura: [
      {
        name: 'Central Kamakura',
        description:
          'The ceremonial heart of the city, easy to explore on foot from the station through lively streets and shrine approaches.',
        pointsOfInterest: [
          'Tsurugaoka Hachimangū',
          'Komachi-dōri',
          'Wakamiya Ōji',
        ],
        recommendations: [],
      },
      {
        name: 'Hase & the coast',
        description:
          'Temples, sea air and the slower Enoden rhythm along the western side of Kamakura.',
        pointsOfInterest: [
          'Great Buddha at Kōtoku-in',
          'Hase-dera',
          'Yuigahama Beach',
        ],
        recommendations: [],
      },
      {
        name: 'Kita-Kamakura',
        description:
          'A quieter northern approach where wooded temple grounds make the journey feel removed from nearby Tokyo.',
        pointsOfInterest: ['Engaku-ji', 'Meigetsu-in', 'Kenchō-ji'],
        recommendations: [],
      },
      {
        name: 'Eastern hills',
        description:
          'Bamboo, moss and hillside temples for a more contemplative half-day away from the busiest central route.',
        pointsOfInterest: ['Hōkoku-ji', 'Sugimoto-dera', 'Zuisen-ji'],
        recommendations: [],
      },
    ],
    nara: [
      {
        name: 'Nara Park & Tōdai-ji',
        description:
          'The classic first chapter, where park paths, deer, museum grounds and major temples flow into one another.',
        pointsOfInterest: ['Nara Park', 'Tōdai-ji', 'Isuien Garden'],
        recommendations: [],
      },
      {
        name: 'Kasuga & Takabatake',
        description:
          'Lantern-lined paths and a greener, quieter edge of the city that rewards walking beyond the central lawns.',
        pointsOfInterest: [
          'Kasuga Taisha',
          'Kasugayama Primeval Forest',
          'Shin-Yakushi-ji',
        ],
        recommendations: [],
      },
      {
        name: 'Naramachi & the centre',
        description:
          'Old merchant houses, small museums and everyday streets that give Nara a life beyond the park.',
        pointsOfInterest: ['Naramachi', 'Gangō-ji', 'Kōfuku-ji'],
        recommendations: [],
      },
      {
        name: 'Nishinokyō',
        description:
          'A western temple area for travellers who want to extend the visit beyond the most familiar sights.',
        pointsOfInterest: ['Yakushi-ji', 'Tōshōdai-ji', 'Heijō Palace Site'],
        recommendations: [],
      },
    ],
    'shirakawa-go': [
      {
        name: 'Ogimachi village',
        description:
          'The lived-in heart of Shirakawa-go, where traditional houses, small lanes and fields form one continuous landscape.',
        pointsOfInterest: [
          'Wada House',
          'Myozenji Museum',
          'Shirakawa Hachiman Shrine',
        ],
        recommendations: [],
      },
      {
        name: 'Riverside & open-air museum',
        description:
          'Cross the river to see preserved gasshō houses more closely and understand how village life was organised.',
        pointsOfInterest: [
          'Deai-bashi suspension bridge',
          'Gasshō-zukuri Minkaen',
          'Shō River views',
        ],
        recommendations: [],
      },
      {
        name: 'Shiroyama & northern Ogimachi',
        description:
          'The higher edge of the village gives the clearest sense of how the roofs, fields and mountains fit together.',
        pointsOfInterest: [
          'Shiroyama viewpoint',
          'Ogimachi Castle Observation Area',
          'Northern rice-field paths',
        ],
        recommendations: [],
      },
    ],
    miyajima: [
      {
        name: 'Shrine & waterfront',
        description:
          'The island’s iconic approach, shaped by the tide, the shrine buildings and changing views of the great torii.',
        pointsOfInterest: [
          'Itsukushima Shrine',
          'Great Torii',
          'Senjōkaku and the five-storey pagoda',
        ],
        recommendations: [],
      },
      {
        name: 'Omotesandō & Machiya-dōri',
        description:
          'The lively arrival streets for local food and craft, with quieter old houses running behind the main arcade.',
        pointsOfInterest: [
          'Omotesandō shopping street',
          'Machiya-dōri',
          'Miyajima History and Folklore Museum',
        ],
        recommendations: [],
      },
      {
        name: 'Daishō-in & Momijidani',
        description:
          'Temple paths and maple woodland mark the transition from the town to the sacred mountain.',
        pointsOfInterest: ['Daishō-in', 'Momijidani Park', 'Miyajima Ropeway'],
        recommendations: [],
      },
      {
        name: 'Mount Misen',
        description:
          'A mountain chapter for a longer visit, with forest trails and wide views across the Seto Inland Sea.',
        pointsOfInterest: [
          'Mount Misen Observatory',
          'Reikadō Hall',
          'Daishō-in hiking course',
        ],
        recommendations: [],
      },
    ],
  },
  fr: {
    tokyo: [
      {
        name: 'Asakusa & Ueno',
        description:
          'L’atmosphère du vieux Tokyo, les temples, les rues d’ustensiles de cuisine, les musées et de longues promenades dans l’est de la ville.',
        pointsOfInterest: [
          'Sensō-ji et Kaminarimon',
          'Nakamise-dōri',
          'Parc d’Ueno et Musée national de Tokyo',
        ],
        recommendations: [
          {
            name: 'Umetohoshi',
            category: 'Menu japonais · Asakusa',
            note: 'On tire au sort l’un des Sept Dieux du Bonheur, qui choisit au hasard le menu qui sera servi.',
            source: 'mapstr',
          },
          {
            name: 'Edomae Unagi Kamameshi Edosada',
            category: 'Anguille & kamameshi · Asakusa',
            note: 'Dans une rue plus calme près d’Asakusa, ce restaurant est connu pour ses plats à base d’anguille, notamment l’unagi kamameshi.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Ryōgoku & Sumida',
        description:
          'Un Tokyo plus calme à l’est, entre vues sur la rivière, histoire du sumo et rythme différent des grands centres animés.',
        pointsOfInterest: [
          'Ryōgoku Kokugikan',
          'Tokyo Skytree',
          'Promenades le long de la Sumida',
        ],
        recommendations: [
          {
            name: 'Daizen Sushi',
            category: 'Sushi · Sumida',
            note: 'Une petite adresse de quartier à Sumida pour manger des sushis simplement, loin des zones les plus animées de Tokyo.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Akihabara & Kanda',
        description:
          'Électronique, jeux, mangas et boutiques verticales autour d’Akihabara, puis rues plus calmes près du sanctuaire de Kanda.',
        descriptionHighlights: ['jeux', 'mangas'],
        pointsOfInterest: [
          'Akihabara Electric Town',
          'Kanda Myōjin',
          'Akihabara Radio Kaikan',
        ],
        recommendations: [],
      },
      {
        name: 'Shibuya, Harajuku & Omotesandō',
        description:
          'Une journée entre grands carrefours, mode, petites rues plus calmes, cafés et le sanctuaire Meiji-jingū.',
        pointsOfInterest: [
          'Carrefour de Shibuya',
          'Meiji-jingū',
          'Parc Yoyogi et Takeshita-dōri',
        ],
        recommendations: [
          {
            name: 'TsuruTonTan UDON NOODLE Brasserie Shibuya',
            category: 'Udon · Shibuya',
            note: 'Une brasserie d’udon moderne au 13e étage de Shibuya Scramble Square, directement au-dessus de la gare.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Shinjuku',
        description:
          'Vues depuis les gratte-ciel, grands magasins, petites rues du soir et l’un des nœuds de transport les plus utiles de Tokyo.',
        pointsOfInterest: [
          'Shinjuku Gyoen',
          'Observatoires du gouvernement métropolitain',
          'Omoide Yokochō',
        ],
        recommendations: [
          {
            name: 'Nakizakana',
            category: 'Izakaya de poissons · Shinjuku',
            note: 'Un izakaya centré sur les produits de la mer, où l’on choisit un poisson entier de saison et sa préparation.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Ginza, Marunouchi & Nihonbashi',
        description:
          'Architecture, papeteries, sous-sols gourmands et promenade urbaine soignée autour de la gare de Tokyo.',
        descriptionHighlights: ['gare de Tokyo'],
        pointsOfInterest: [
          'Gare de Tokyo',
          'Jardins est du Palais impérial',
          'Rues de Ginza et Nihonbashi',
        ],
        recommendations: [
          {
            name: 'Manten Sushi Marunouchi',
            category: 'Sushi omakase · Marunouchi',
            note: 'Pour une expérience omakase où le chef prépare chaque sushi devant soi ; il faut réserver à l’avance.',
            source: 'mapstr',
          },
          {
            name: 'Nemuro Hanamaru · KITTE Marunouchi',
            category: 'Sushi sur tapis roulant · Marunouchi',
            note: 'Une option plus animée et décontractée juste à côté, au cinquième étage de KITTE.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Daikanyama, Nakameguro & Ebisu',
        description:
          'Un bon choix pour un après-midi plus lent entre boutiques indépendantes, cafés et promenade le long de la rivière Meguro.',
        pointsOfInterest: [
          'Rivière Meguro',
          'Daikanyama T-Site',
          'Yebisu Garden Place',
        ],
        recommendations: [],
      },
      {
        name: 'Odaiba & Toyosu',
        description:
          'De grands espaces au bord de l’eau, des lieux contemporains et des vues dégagées très différentes du centre de Tokyo.',
        descriptionHighlights: ['lieux contemporains'],
        pointsOfInterest: [
          'Parc marin d’Odaiba',
          'Points de vue sur le Rainbow Bridge',
          'Marché de Toyosu',
          'teamLab Planets TOKYO',
        ],
        recommendations: [],
      },
    ],
    kyoto: [
      {
        name: 'Gion & Higashiyama',
        description:
          'Rues historiques, temples et promenades matinales : un quartier que je préfère découvrir doucement avant la foule.',
        pointsOfInterest: [
          'Kiyomizu-dera',
          'Yasaka-jinja',
          'Ninenzaka et Sannenzaka',
        ],
        recommendations: [],
      },
      {
        name: 'Centre de Kyoto & Nijō',
        description:
          'Une base pratique entre marchés, rues du quotidien et connexions faciles vers plusieurs parties de la ville.',
        pointsOfInterest: [
          'Château de Nijō',
          'Marché de Nishiki',
          'Palais impérial de Kyoto',
        ],
        recommendations: [
          {
            name: 'continue.nijojokita',
            category: 'Hôtel · Kamigyō',
            note: 'Une petite adresse calme au nord du château de Nijō, à l’écart des rues les plus fréquentées de Kyoto.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Arashiyama',
        description:
          'Rivière, jardins et reliefs : arriver tôt laisse davantage de place pour profiter du paysage.',
        pointsOfInterest: [
          'Bambouseraie d’Arashiyama',
          'Tenryū-ji',
          'Pont Togetsukyō',
        ],
        recommendations: [
          {
            name: 'Arashiyama Itsukichaya',
            category: 'Adresse enregistrée · Arashiyama',
            note: 'Un lieu enregistré sur ma carte Google plus large pour préparer un prochain voyage.',
            source: 'google',
          },
        ],
      },
      {
        name: 'Fushimi',
        description:
          'Chemins de sanctuaire, rues du saké et canaux au sud du centre, avec une atmosphère qui mérite de commencer tôt.',
        pointsOfInterest: [
          'Fushimi Inari Taisha',
          'Quartier du saké de Fushimi',
          'Canal et musée Gekkeikan',
        ],
        recommendations: [],
      },
    ],
    osaka: [
      {
        name: 'Namba & Dōtonbori',
        description:
          'Le cœur lumineux et gourmand de la ville, à vivre le soir en se promenant plutôt qu’avec une liste à cocher.',
        pointsOfInterest: [
          'Canal de Dōtonbori',
          'Hōzenji Yokochō',
          'Marché Kuromon Ichiba',
        ],
        recommendations: [
          {
            name: 'Cafe Mog',
            category: 'Café · Namba',
            note: 'Un café tranquille au centre de Namba pour faire une pause entre les rues commerçantes.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Tennōji',
        description:
          'Parcs, musées et rues de quartier au sud du centre, avec assez d’espace pour un après-midi tranquille.',
        pointsOfInterest: [
          'Shitennō-ji',
          'Parc de Tennōji et Tenshiba',
          'Abeno Harukas',
        ],
        recommendations: [
          {
            name: 'Aoi Napoli in the Park',
            category: 'Restaurant italien · Tennōji',
            note: 'Un restaurant italien dans le parc Tenshiba pour un déjeuner ou un dîner plus tranquille, avec un espace extérieur.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Umeda & Nakazakichō',
        description:
          'Vues urbaines et transports autour d’Umeda, puis petites maisons et cafés dans le proche Nakazakichō.',
        pointsOfInterest: [
          'Umeda Sky Building',
          'Grand Green Osaka',
          'Ruelles de Nakazakichō',
        ],
        recommendations: [],
      },
      {
        name: 'Shinsekai',
        description:
          'Un quartier compact et animé pour les enseignes rétro, le kushikatsu et une promenade sous Tsūtenkaku.',
        pointsOfInterest: [
          'Tsūtenkaku',
          'Jan-Jan Yokochō',
          'Rues commerçantes de Shinsekai',
        ],
        recommendations: [],
      },
      {
        name: 'Jūsō & nord d’Osaka',
        description:
          'Une base plus locale au nord du centre, pratique pour circuler entre Osaka et Kyoto.',
        pointsOfInterest: [
          'Rues commerçantes de Jūsō',
          'Berges de la rivière Yodo',
          'Galeries couvertes locales',
        ],
        recommendations: [
          {
            name: 'AFP Juso Apartment',
            category: 'Hôtel · Jūsō',
            note: 'Un appartement pratique près de Jūsō, avec des connexions faciles vers Osaka et Kyoto.',
            source: 'mapstr',
          },
        ],
      },
    ],
    kamakura: [
      {
        name: 'Centre de Kamakura',
        description:
          'Le cœur cérémoniel de la ville, facile à parcourir à pied depuis la gare entre rues animées et grandes allées de sanctuaire.',
        pointsOfInterest: [
          'Tsurugaoka Hachimangū',
          'Komachi-dōri',
          'Wakamiya Ōji',
        ],
        recommendations: [],
      },
      {
        name: 'Hase & le littoral',
        description:
          'Temples, air marin et rythme tranquille de l’Enoden sur le côté ouest de Kamakura.',
        pointsOfInterest: [
          'Grand Bouddha de Kōtoku-in',
          'Hase-dera',
          'Plage de Yuigahama',
        ],
        recommendations: [],
      },
      {
        name: 'Kita-Kamakura',
        description:
          'Une entrée plus calme au nord, où les temples boisés donnent l’impression d’être déjà loin de Tokyo.',
        pointsOfInterest: ['Engaku-ji', 'Meigetsu-in', 'Kenchō-ji'],
        recommendations: [],
      },
      {
        name: 'Collines de l’est',
        description:
          'Bambous, mousse et temples à flanc de colline pour une demi-journée plus contemplative.',
        pointsOfInterest: ['Hōkoku-ji', 'Sugimoto-dera', 'Zuisen-ji'],
        recommendations: [],
      },
    ],
    nara: [
      {
        name: 'Parc de Nara & Tōdai-ji',
        description:
          'Le premier chapitre classique, où chemins du parc, daims, musées et grands temples se suivent naturellement.',
        pointsOfInterest: ['Parc de Nara', 'Tōdai-ji', 'Jardin Isuien'],
        recommendations: [],
      },
      {
        name: 'Kasuga & Takabatake',
        description:
          'Des chemins bordés de lanternes et une lisière plus verte qui invite à marcher au-delà des pelouses centrales.',
        pointsOfInterest: [
          'Kasuga Taisha',
          'Forêt primaire de Kasugayama',
          'Shin-Yakushi-ji',
        ],
        recommendations: [],
      },
      {
        name: 'Naramachi & le centre',
        description:
          'Anciennes maisons marchandes, petits musées et rues du quotidien qui racontent une ville au-delà du parc.',
        pointsOfInterest: ['Naramachi', 'Gangō-ji', 'Kōfuku-ji'],
        recommendations: [],
      },
      {
        name: 'Nishinokyō',
        description:
          'Un secteur de temples à l’ouest pour prolonger la visite au-delà des lieux les plus connus.',
        pointsOfInterest: ['Yakushi-ji', 'Tōshōdai-ji', 'Site du palais Heijō'],
        recommendations: [],
      },
    ],
    'shirakawa-go': [
      {
        name: 'Village d’Ogimachi',
        description:
          'Le cœur habité de Shirakawa-go, où maisons traditionnelles, petites rues et champs forment un seul paysage.',
        pointsOfInterest: [
          'Maison Wada',
          'Musée Myozenji',
          'Sanctuaire Shirakawa Hachiman',
        ],
        recommendations: [],
      },
      {
        name: 'Rivière & musée en plein air',
        description:
          'De l’autre côté de la rivière, les maisons gasshō préservées permettent de mieux comprendre la vie du village.',
        pointsOfInterest: [
          'Pont suspendu Deai-bashi',
          'Gasshō-zukuri Minkaen',
          'Vues sur la rivière Shō',
        ],
        recommendations: [],
      },
      {
        name: 'Shiroyama & nord d’Ogimachi',
        description:
          'La partie haute offre la meilleure lecture d’ensemble des toits, des champs et des montagnes.',
        pointsOfInterest: [
          'Belvédère de Shiroyama',
          'Observatoire du château d’Ogimachi',
          'Chemins entre les rizières du nord',
        ],
        recommendations: [],
      },
    ],
    miyajima: [
      {
        name: 'Sanctuaire & front de mer',
        description:
          'L’approche emblématique de l’île, transformée par la marée, les bâtiments du sanctuaire et les vues sur le grand torii.',
        pointsOfInterest: [
          'Sanctuaire d’Itsukushima',
          'Grand Torii',
          'Senjōkaku et pagode à cinq étages',
        ],
        recommendations: [],
      },
      {
        name: 'Omotesandō & Machiya-dōri',
        description:
          'Les rues animées de l’arrivée pour goûter et découvrir l’artisanat, avec de vieilles maisons plus calmes juste derrière.',
        pointsOfInterest: [
          'Rue commerçante Omotesandō',
          'Machiya-dōri',
          'Musée d’histoire et du folklore de Miyajima',
        ],
        recommendations: [],
      },
      {
        name: 'Daishō-in & Momijidani',
        description:
          'Les chemins du temple et la forêt d’érables marquent le passage de la ville à la montagne sacrée.',
        pointsOfInterest: [
          'Daishō-in',
          'Parc Momijidani',
          'Téléphérique de Miyajima',
        ],
        recommendations: [],
      },
      {
        name: 'Mont Misen',
        description:
          'Un chapitre de montagne pour une visite plus longue, entre sentiers forestiers et vues sur la mer intérieure de Seto.',
        pointsOfInterest: [
          'Observatoire du mont Misen',
          'Pavillon Reikadō',
          'Sentier de Daishō-in',
        ],
        recommendations: [],
      },
    ],
  },
};
