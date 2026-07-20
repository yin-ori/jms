import type { Locale } from '@/utils/i18n';

export interface AcademicItem {
  title: string;
  note?: string;
  institution: string;
}

export interface ResearchFocus {
  title: string;
  subtitle: string;
}

export interface Talk {
  title: string;
  venue: string;
  date: string;
  note?: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  year: string;
}

export interface Publication {
  title: string;
  book: string;
  editors: string;
  publisher: string;
  year: string;
  isbn: string;
  url: string;
}

export interface ResearchData {
  pageTitle: string;
  sections: {
    academicCareer: string;
    researchFocus: string;
    talks: string;
    publications: string;
    translations: string;
    moreInfo: string;
  };
  moreInfoText: string;
  academicCareer: AcademicItem[];
  researchFocus: ResearchFocus[];
  talks: Talk[];
  publications: Publication[];
  translations: Translation[];
}

export const researchData: Record<Locale, ResearchData> = {
  de: {
    pageTitle: 'Forschung',
    sections: {
      academicCareer: 'Akademischer Werdegang',
      researchFocus: 'Forschungsschwerpunkte',
      talks: 'Vorträge',
      publications: 'Publikationen',
      translations: 'Wissenschaftliche Übersetzungen',
      moreInfo: 'Weitere Informationen',
    },
    moreInfoText: 'Eine vollständige Übersicht über meine Forschungsaktivitäten:',
    academicCareer: [
      { title: 'Promotion', note: 'fortlaufend', institution: 'Universität Bonn, Deutschland' },
      { title: 'Doctoral Course', note: 'bestanden', institution: 'Universität Tromsø, Norwegen' },
      { title: 'Master of Arts', note: 'ausgezeichnet', institution: 'Universität Bonn, Deutschland' },
      { title: 'Special Research Student', institution: 'Tohoku University, Japan' },
      { title: 'Bachelor of Arts', institution: 'Universität Bonn, Deutschland' },
    ],
    researchFocus: [
      { title: 'Betrachtungen textueller Emotionen im Zuge von Erdbeben in der Tôhoku-Region', subtitle: 'seit 2022' },
      { title: "'Corona-Katastrophe' (korona-ka) während TOKYO2020", subtitle: '2022 · veröffentlicht' },
      { title: 'Konzeptueller Bedeutungswandel am Beispiel von ka', subtitle: '2021 · Masterarbeit' },
      { title: 'Übersetzung von Zeitzeugenberichten der Atombombenüberlebenden Frau Kimura', subtitle: '2019–2020 · NET-GTAS Global Peace & Universität Bonn' },
    ],
    talks: [
      { title: 'On Emotion Expressions in Classical Japanese (bungo)', venue: 'Tohoku University BUNGO-bun project 第10回研究会', date: '2025/02', note: 'Vortrag auf Einladung' },
      { title: 'Reflections on Emotive Traces in Texts', venue: '20th STaPs Augsburg / Budapest / Vienna', date: '2023/02' },
      { title: 'Vernissage zur Plakatausstellung der Atombombenabwürfe auf Hiroshima und Nagasaki', venue: 'Hiroshima-Nagasaki-Project, Universität Bonn', date: '2019/10', note: 'Beitrag auf Einladung' },
    ],
    publications: [
      {
        title: 'Und auch der Mond schien inmitten der Gefahr bereits geflohen: Textuelle Emotionen in einigen Tanka zum Großen Kantō-Erdbeben von Yosano Akiko',
        book: 'Rückblicke zum Großen Kantō-Erdbeben von 1923: Literarische, historische, philosophische und visuelle Perspektiven',
        editors: 'Hrsg. Harald Meyer & Reinhard Zöllner',
        publisher: 'OSTASIEN Verlag, Gossenberg (ORIENTIERUNGEN, Themenband 2023)',
        year: '2024',
        isbn: '978-3-911262-05-7',
        url: 'https://www.ostasien-verlag.de/reihen/orientierungen/or/2023.html',
      },
      {
        title: 'Korona-ka: Das \'Corona-Unheil\' und die Olympischen Spiele',
        book: 'Die Sommerolympiade Tōkyō 2020 und die COVID-19-Pandemie in Japan: Mediendarstellungen und Analysen',
        editors: 'Hrsg. Mamoru Itō, Harald Meyer & Takahiro Nishiyama',
        publisher: 'OSTASIEN Verlag, Gossenberg (ORIENTIERUNGEN, Themenband 2022)',
        year: '2022',
        isbn: '978-3-946114-94-9',
        url: 'https://www.ostasien-verlag.de/reihen/orientierungen/or/2022.html',
      },
    ],
    translations: [
      { title: 'Nachrichten-Erfahrungen zu den Olympischen Spielen: Eine Fallstudie mit 18 Studierenden', subtitle: 'Shingo Dobashi, Hosei University · JP→DE', year: '2022' },
      { title: 'Zeugenaussagen der Atombombenüberlebenden Frau Hisako Kimura', subtitle: 'NET-GTAS Global Peace & Universität Bonn · JP↔DE', year: '2019' },
      { title: 'Agrarwissenschaftliche Fachtexte zu amacha und ajisai', subtitle: 'Promotionsprojekt, Landwirtschaftliche Fakultät Universität Bonn · JP→DE', year: '2019' },
      { title: '"Tosa Nikki": Übersetzungsanalyse der ersten drei Tage', subtitle: 'unpubliziert', year: '2019' },
      { title: 'Übersetzung aus "Tsūshi no hōhō" (通史の方法)', subtitle: 'Miyachi Masato · unpubliziert', year: '2019' },
    ],
  },
  en: {
    pageTitle: 'Research',
    sections: {
      academicCareer: 'Academic Career',
      researchFocus: 'Research Focus',
      talks: 'Talks',
      publications: 'Publications',
      translations: 'Academic Translations',
      moreInfo: 'More Information',
    },
    moreInfoText: 'A complete overview of my research activities:',
    academicCareer: [
      { title: 'Doctorate', note: 'ongoing', institution: 'University of Bonn, Germany' },
      { title: 'Doctoral Course', note: 'passed', institution: 'University of Tromsø, Norway' },
      { title: 'Master of Arts', note: 'with distinction', institution: 'University of Bonn, Germany' },
      { title: 'Special Research Student', institution: 'Tohoku University, Japan' },
      { title: 'Bachelor of Arts', institution: 'University of Bonn, Germany' },
    ],
    researchFocus: [
      { title: 'Observations on textual emotions in the context of earthquakes in the Tōhoku region', subtitle: 'since 2022' },
      { title: "'Corona Disaster' (korona-ka) during TOKYO2020", subtitle: '2022 · published' },
      { title: 'Conceptual semantic change using the example of ka', subtitle: '2021 · Master thesis' },
      { title: 'Translation of eyewitness accounts of atomic bomb survivor Mrs. Kimura', subtitle: '2019–2020 · NET-GTAS Global Peace & University of Bonn' },
    ],
    talks: [
      { title: 'On Emotion Expressions in Classical Japanese (bungo)', venue: 'Tohoku University BUNGO-bun project 第10回研究会', date: '2025/02', note: 'Invited talk' },
      { title: 'Reflections on Emotive Traces in Texts', venue: '20th STaPs Augsburg / Budapest / Vienna', date: '2023/02' },
      { title: 'Vernissage for the poster exhibition on the atomic bombings of Hiroshima and Nagasaki', venue: 'Hiroshima-Nagasaki-Project, University of Bonn', date: '2019/10', note: 'Invited contribution' },
    ],
    publications: [
      {
        title: 'Und auch der Mond schien inmitten der Gefahr bereits geflohen: Textuelle Emotionen in einigen Tanka zum Großen Kantō-Erdbeben von Yosano Akiko',
        book: 'Rückblicke zum Großen Kantō-Erdbeben von 1923: Literarische, historische, philosophische und visuelle Perspektiven',
        editors: 'Ed. Harald Meyer & Reinhard Zöllner',
        publisher: 'OSTASIEN Verlag, Gossenberg (ORIENTIERUNGEN, Themenband 2023)',
        year: '2024',
        isbn: '978-3-911262-05-7',
        url: 'https://www.ostasien-verlag.de/reihen/orientierungen/or/2023.html',
      },
      {
        title: 'Korona-ka: Das \'Corona-Unheil\' und die Olympischen Spiele',
        book: 'Die Sommerolympiade Tōkyō 2020 und die COVID-19-Pandemie in Japan: Mediendarstellungen und Analysen',
        editors: 'Ed. Mamoru Itō, Harald Meyer & Takahiro Nishiyama',
        publisher: 'OSTASIEN Verlag, Gossenberg (ORIENTIERUNGEN, Themenband 2022)',
        year: '2022',
        isbn: '978-3-946114-94-9',
        url: 'https://www.ostasien-verlag.de/reihen/orientierungen/or/2022.html',
      },
    ],
    translations: [
      { title: 'News experiences of the Olympic Games: A case study with 18 students', subtitle: 'Shingo Dobashi, Hosei University · JP→DE', year: '2022' },
      { title: 'Testimonies of atomic bomb survivor Mrs. Hisako Kimura', subtitle: 'NET-GTAS Global Peace & University of Bonn · JP↔DE', year: '2019' },
      { title: 'Agricultural science texts on amacha and ajisai', subtitle: 'PhD project, Faculty of Agriculture, University of Bonn · JP→DE', year: '2019' },
      { title: '"Tosa Nikki": Translation analysis of the first three days', subtitle: 'unpublished', year: '2019' },
      { title: 'Translation from "Tsūshi no hōhō" (通史の方法)', subtitle: 'Miyachi Masato · unpublished', year: '2019' },
    ],
  },
};

export function getResearchData(locale: Locale): ResearchData {
  return researchData[locale];
}
