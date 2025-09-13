export interface IPCSection {
  id: number;
  number: string;
  title: string;
  description: string;
  category: string;
  color: string;
  punishment: string;
}

export const ipcSections: IPCSection[] = [
  {
    id: 1,
    number: '354',
    title: 'Assault or Criminal Force to Woman with Intent to Outrage her Modesty',
    description: 'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished.',
    category: 'Women Safety',
    color: '#FF4C4C',
    punishment: 'Imprisonment of either description for a term which may extend to two years, or with fine, or with both.',
  },
  {
    id: 2,
    number: '354A',
    title: 'Sexual Harassment',
    description: 'A man committing any of the following acts: physical contact and advances involving unwelcome and explicit sexual overtures, or a demand or request for sexual favours.',
    category: 'Women Safety',
    color: '#FF4C4C',
    punishment: 'Rigorous imprisonment for a term which may extend to three years, or with fine, or with both.',
  },
  {
    id: 3,
    number: '354B',
    title: 'Assault or Use of Criminal Force to Woman with Intent to Disrobe',
    description: 'Any man who assaults or uses criminal force to any woman or abets such act with the intention of disrobing or compelling her to be naked.',
    category: 'Women Safety',
    color: '#FF4C4C',
    punishment: 'Imprisonment of either description for a term which shall not be less than three years but which may extend to seven years, and shall also be liable to fine.',
  },
  {
    id: 4,
    number: '354C',
    title: 'Voyeurism',
    description: 'Any man who watches, or captures the image of a woman engaging in a private act in circumstances where she would usually have the expectation of not being observed.',
    category: 'Privacy Rights',
    color: '#FFA500',
    punishment: 'Imprisonment of either description for a term which shall not be less than one year, but which may extend to three years, and shall also be liable to fine.',
  },
  {
    id: 5,
    number: '354D',
    title: 'Stalking',
    description: 'Any man who follows a woman and contacts, or attempts to contact such woman to foster personal interaction repeatedly despite a clear indication of disinterest.',
    category: 'Women Safety',
    color: '#FF4C4C',
    punishment: 'Imprisonment of either description for a term which may extend to three years, and shall also be liable to fine.',
  },
  {
    id: 6,
    number: '375',
    title: 'Rape',
    description: 'A man is said to commit rape if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person.',
    category: 'Serious Crimes',
    color: '#8B0000',
    punishment: 'Rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.',
  },
  {
    id: 7,
    number: '498A',
    title: 'Husband or Relative of Husband Subjecting a Woman to Cruelty',
    description: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished.',
    category: 'Domestic Violence',
    color: '#FF6347',
    punishment: 'Imprisonment for a term which may extend to three years and shall also be liable to fine.',
  },
  {
    id: 8,
    number: '509',
    title: 'Word, Gesture or Act Intended to Insult the Modesty of a Woman',
    description: 'Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object, intending that such word or sound shall be heard.',
    category: 'Women Safety',
    color: '#FF4C4C',
    punishment: 'Simple imprisonment for a term which may extend to three years, and also with fine.',
  },
];