import { reactive, ref, watchEffect } from "vue";

const writeSolvedWordsToLocalStorage = () => {
  localStorage.setItem("solvedWords", JSON.stringify([...solvedWords]));
};

const readSolvedWordsToLocalStorage = () => {
  return new Set(JSON.parse(localStorage.getItem("solvedWords") ?? "[]"));
};

export const solvedWords = reactive(readSolvedWordsToLocalStorage());

watchEffect(() => {
  writeSolvedWordsToLocalStorage();
});

const words = new Set(
  [
    "STIFT",
    "ADLER",
    "AUGEN",
    "OHREN",
    "SCHAM",
    "TANGO",
    "BLITZ",
    "SOHLE",
    "ZEBRA",
    "BIENE",
    "BRAUT",
    "KAPPE",
    "WESTE",
    "ARMEE",
    "WAFFE",
    "HOTEL",
    "FABEL",
    "FAHNE",
    "GALLE",
    "GABEL",
    "ZELLE",
    "POKAL",
    "ZEILE",
    "SPIEL",
    "STAHL",
    "LOTTO",
    "METER",
    "PENIS",
    "HODEN",
    "INSEL",
    "GLEIS",
    "WAGEN",
    "SENSE",
    "KIOSK",
    "ZANGE",
    "HONIG",
    "ZUNFT",
    "SPALT",
    "BANDE",
    "STOFF",
    "STOCK",
    "STADT",
    "LEHNE",
    "DOCHT",
    "WACHS",
    "WACHE",
    "WINDE",
    "KNAST",
    "GEIER",
    "LOCKE",
    "LACHE",
    "LAUBE",
    "SIPPE",
    "PAPST",
    "BACKE",
    "BASIS",
    "WEBER",
    "KLEID",
    "BREZE",
    "PRUNK",
    "STUHL",
    "PEDAL",
    "HILFE",
    "FEUER",
    "FEIER",
    "ECHSE",
    "PARTY",
    "BURKA",
    "QUALM",
    "RAUCH",
    "QUARK",
    "QUARZ",
    "QUOTE",
    "FLECK",
    "SUPPE",
    "HIRSE",
    "SILBE",
    "STIRN",
    "HEXER",
    "MIXER",
    "WILLE",
    "WEIHE",
    "WAMPE",
    "RAMPE",
    "BRUST",
    "BUSEN",
    "SENKE",
    "SEIDE",
    "SEIFE",
    "WANZE",
    "WANNE",
    "WOLLE",
    "PERLE",
    "BLICK",
    "FAHRT",
    "BRIEF",
    "PAKET",
    "MARKE",
    "DISCO",
    "ROLLE",
    "KISTE",
    "GEIST",
    "SEELE",
    "TEMPO",
    "KREIS",
    "SCHAF",
    "BESEN",
    "LOIPE",
    "BLOCK",
    "KELCH",
    "KEULE",
    "KRISE",
    "KREUZ",
    "LEINE",
    "PRISE",
    "PREIS",
    "RIPPE",
    "KANAL",
    "GELEE",
    "GRUND",
    "PUMPE",
    "RILLE",
    "MAPPE",
    "COUCH",
    "SAITE",
    "KLAMM",
    "SEITE",
    "KLANG",
    "PILLE",
    "DOSIS",
    "SERUM",
    "FIRST",
    "KRIEG",
    "LIEGE",
    "HARKE",
    "HARFE",
    "WEIDE",
    "ORKAN",
    "STURM",
    "WETTE",
    "KELLE",
    "KLIMA",
    "WEISE",
    "GLANZ",
    "ZIEGE",
    "STALL",
    "SCHAL",
    "MESSE",
    "TACHO",
    "LICHT",
    "SPECK",
    "ZWECK",
    "MOBIL",
    "ZWIRN",
    "MOTOR",
    "LEBER",
    "SEGEN",
    "CELLO",
    "KANNE",
    "TROST",
    "KNOPF",
    "KACKE",
    "ARSCH",
    "PFURZ",
    "SALAT",
    "LIPPE",
    "ATLAS",
    "NAGEL",
    "SPIEL",
    "STAMM",
    "SPEER",
    "MATHE",
    "BOGEN",
    "TAUFE",
    "REGAL",
    "LAGER",
    "GRIFF",
    "BUSCH",
    "NIERE",
    "LUNGE",
    "TULPE",
    "ROSEN",
    "GEIGE",
    "STADT",
    "KAMIN",
    "LARVE",
    "WURST",
    "VOGEL",
    "MEISE",
    "AMPEL",
    "SCHUH",
    "FLUSS",
    "PAUSE",
    "WODKA",
    "HAKEN",
    "WELLE",
    "KARMA",
    "JACKE",
    "BIRNE",
    "APFEL",
    "GURKE",
    "BLUME",
    "LAMPE",
    "GABEL",
    "HAARE",
    "WAAGE",
    "RADIO",
    "BLATT",
    "NOTEN",
    "WOLKE",
    "ALPEN",
    "FISCH",
    "ZWEIG",
    "AMSEL",
    "BAUCH",
    "REGEN",
    "STROM",
    "STEIN",
    "FARBE",
    "KABEL",
    "KARTE",
    "RAUPE",
    "SOCKE",
    "MASSE",
    "MIKRO",
    "TASSE",
    "BIBER",
    "PFAHL",
    "PFAND",
    "KRACH",
    "MUSIK",
    "KERZE",
    "KATZE",
    "PLATZ",
    "WARZE",
    "TISCH",
    "NUDEL",
    "SPATZ",
    "NARBE",
    "WUNDE",
    "SONNE",
    "LEINE",
    "START",
    "BRETT",
    "STERN",
    "STAHL",
    "LICHT",
    "Kabel",
    "Krone",
    "Spule",
    "Feder",
    "Pflug",
    "Rinde",
    "Schuh",
    "Haken",
    "Frack",
    "Sonne",
    "Torte",
    "Kugel",
    "Flair",
    "Schar",
    "Pferd",
    "Zunge",
    "Decke",
    "Wagen",
    "Weide",
    "Blatt",
    "Heide",
    "Acker",
    "Alarm",
    "Angel",
    "Anker",
    "Anzug",
    "Apfel",
    "Armut",
    "Asche",
    "Birne",
    "Blase",
    "Blume",
    "Bombe",
    "Boote",
    "Brett",
    "Buche",
    "Bulle",
    "Chaos",
    "Dachs",
    "Eiche",
    "Eimer",
    "Eisen",
    "Eiter",
    "Enkel",
    "Ernte",
    "Fabel",
    "Fahrt",
    "Feder",
    "Fisch",
    "Flair",
    "Fuchs",
    "Gasse",
    "Gebet",
    "Hafen",
    "Haken",
    "Handy",
    "Harfe",
    "Hebel",
    "Heide",
    "Hobby",
    "Junge",
    "Kabel",
    "Kasse",
    "Kerze",
    "Kette",
    "Kugel",
    "Kunde",
    "Lachs",
    "Laser",
    "Leder",
    "Lehne",
    "Lilie",
    "Linde",
    "Lippe",
    "Lunge",
    "Magen",
    "Maler",
    "Mango",
    "Mauer",
    "Meile",
    "Messe",
    "Milch",
    "Minze",
    "Mitte",
    "Nacht",
    "Nagel",
    "Narbe",
    "Natur",
    "Nebel",
    "Notar",
    "Nudel",
    "Ochse",
    "Onkel",
    "Opfer",
    "Osten",
    "Otter",
    "Palme",
    "Papst",
    "Pasta",
    "Pause",
    "Pfeil",
    "Pferd",
    "Pflug",
    "Pfund",
    "Pizza",
    "Plane",
    "Platz",
    "Poker",
    "Polka",
    "Puppe",
    "Qualm",
    "Rasen",
    "Ratte",
    "Reise",
    "Rente",
    "Rinde",
    "Robbe",
    "Sahne",
    "Salat",
  ]
    .map((word) => word.toUpperCase())
    .filter(
      (word) =>
        solvedWords.has(word) === false &&
        word.length === 5 &&
        word.split("").every((char) => char.charCodeAt(0) <= "Z".charCodeAt(0))
    )
);

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.size);
  return [...words][randomIndex];
};

export const wantedWord = ref(getRandomWord());
