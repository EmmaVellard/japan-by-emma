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
            name: 'Edomae Unagi Kamameshi Edosada',
            category: 'Restaurant · Asakusa',
            note: 'An eel and kamameshi address kept in my personal Mapstr list.',
            source: 'mapstr',
          },
          {
            name: 'Economy Hotel Hoteiya',
            category: 'Hotel · Taitō',
            note: 'A simple, budget-friendly stay kept in my personal Mapstr list.',
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
            note: 'A neighbourhood sushi address saved in my personal Mapstr list.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Akihabara & Kanda',
        description:
          'Electronics, games, manga and dense vertical shops around Akihabara, balanced by the calmer shrine streets of nearby Kanda.',
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
        recommendations: [],
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
        recommendations: [],
      },
      {
        name: 'Ginza, Marunouchi & Nihonbashi',
        description:
          'Architecture, stationery, food halls and a polished city walk around Tokyo Station and the Imperial Palace edge.',
        pointsOfInterest: [
          'Tokyo Station',
          'Imperial Palace East Gardens',
          'Ginza and Nihonbashi streets',
        ],
        recommendations: [],
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
        pointsOfInterest: [
          'Odaiba Seaside Park',
          'Rainbow Bridge viewpoints',
          'Toyosu Market',
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
            note: 'A small Kyoto stay kept in my personal Mapstr list.',
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
            note: 'A café kept in my personal Mapstr list.',
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
            note: 'A restaurant kept in my personal Mapstr list.',
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
            note: 'An apartment stay kept in my personal Mapstr list.',
            source: 'mapstr',
          },
        ],
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
            name: 'Edomae Unagi Kamameshi Edosada',
            category: 'Restaurant · Asakusa',
            note: 'Une adresse d’anguille et de kamameshi conservée dans ma liste personnelle Mapstr.',
            source: 'mapstr',
          },
          {
            name: 'Economy Hotel Hoteiya',
            category: 'Hôtel · Taitō',
            note: 'Une adresse simple et économique conservée dans ma liste personnelle Mapstr.',
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
            note: 'Une adresse de quartier conservée dans ma liste personnelle Mapstr.',
            source: 'mapstr',
          },
        ],
      },
      {
        name: 'Akihabara & Kanda',
        description:
          'Électronique, jeux, mangas et boutiques verticales autour d’Akihabara, puis rues plus calmes près du sanctuaire de Kanda.',
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
        recommendations: [],
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
        recommendations: [],
      },
      {
        name: 'Ginza, Marunouchi & Nihonbashi',
        description:
          'Architecture, papeteries, sous-sols gourmands et promenade urbaine soignée autour de la gare de Tokyo.',
        pointsOfInterest: [
          'Gare de Tokyo',
          'Jardins est du Palais impérial',
          'Rues de Ginza et Nihonbashi',
        ],
        recommendations: [],
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
        pointsOfInterest: [
          'Parc marin d’Odaiba',
          'Points de vue sur le Rainbow Bridge',
          'Marché de Toyosu',
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
            note: 'Une petite adresse à Kyoto conservée dans ma liste personnelle Mapstr.',
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
            note: 'Un café conservé dans ma liste personnelle Mapstr.',
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
            note: 'Un restaurant conservé dans ma liste personnelle Mapstr.',
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
            note: 'Un appartement conservé dans ma liste personnelle Mapstr.',
            source: 'mapstr',
          },
        ],
      },
    ],
  },
};
