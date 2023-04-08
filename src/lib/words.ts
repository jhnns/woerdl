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
    "AUGEN",
    "OHREN",
    "NAGEL",
    "SPIEL",
    "STAMM",
    "BUSCH",
    "NIERE",
    "LEBER",
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
    "RAKET",
    "PAUSE",
    "WODKA",
    "HAKEN",
    "WELLE",
    "REAND",
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
    "Decke",
    "Eiche",
    "Eimer",
    "Eisen",
    "Eiter",
    "Elfen",
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
    "Käfer",
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
    "Möhre",
    "Mücke",
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
