export interface WomensIPCSection {
  id: number;
  number: string;
  title: string;
  description: string;
  severity: string;
  punishment: string;
  howToReport: string;
}

export const womensIPCSections: WomensIPCSection[] = [
  {
    id: 1,
    number: '354',
    title: 'Outraging Modesty of Women',
    description: 'Any assault or criminal force used against a woman with the intention to outrage her modesty. This includes inappropriate touching, gestures, or remarks.',
    severity: 'High',
    punishment: 'Imprisonment up to 2 years, fine, or both',
    howToReport: 'File FIR at nearest police station, call 181 Women Helpline, or report online through police portal.',
  },
  {
    id: 2,
    number: '354A',
    title: 'Sexual Harassment',
    description: 'Physical contact with sexual intent, sexual advances, demands for sexual favors, or sexually colored remarks constituting unwelcome behavior.',
    severity: 'High',
    punishment: 'Rigorous imprisonment up to 3 years, fine, or both',
    howToReport: 'Report to local police, Internal Complaints Committee at workplace, or through online complaints portal.',
  },
  {
    id: 3,
    number: '354D',
    title: 'Stalking',
    description: 'Following, contacting, or attempting to contact a woman repeatedly despite her clear indication of disinterest, causing fear or distress.',
    severity: 'Medium',
    punishment: 'Imprisonment up to 3 years and fine for first offense, up to 5 years for subsequent offenses',
    howToReport: 'Document all evidence, report to police immediately, and consider getting a restraining order.',
  },
  {
    id: 4,
    number: '375-376',
    title: 'Rape',
    description: 'Non-consensual penetration or sexual assault. This is the most serious crime against women with severe legal consequences.',
    severity: 'Critical',
    punishment: 'Minimum 10 years imprisonment, can extend to life imprisonment',
    howToReport: 'Immediate medical attention, report to police without delay, preserve evidence, contact 181 helpline.',
  },
  {
    id: 5,
    number: '498A',
    title: 'Cruelty by Husband or In-laws',
    description: 'Physical or mental torture by husband or his relatives, including dowry-related harassment, domestic violence, or threats.',
    severity: 'High',
    punishment: 'Imprisonment up to 3 years and fine',
    howToReport: 'File complaint with police, approach Protection Officer, or contact women\'s helpline for immediate protection.',
  },
  {
    id: 6,
    number: '354C',
    title: 'Voyeurism',
    description: 'Watching or capturing images/videos of a woman without consent in private circumstances where she expects privacy.',
    severity: 'Medium',
    punishment: 'Imprisonment 1-3 years for first offense, 3-7 years for subsequent offenses',
    howToReport: 'Preserve digital evidence, report to cyber crime cell, file FIR at police station.',
  },
  {
    id: 7,
    number: '509',
    title: 'Insulting Modesty through Words/Gestures',
    description: 'Using words, sounds, gestures, or exhibiting objects intended to insult a woman\'s modesty, including eve-teasing.',
    severity: 'Medium',
    punishment: 'Simple imprisonment up to 3 years and fine',
    howToReport: 'Report to local police, document incidents with witnesses, use women safety apps.',
  },
  {
    id: 8,
    number: '354B',
    title: 'Assault with Intent to Disrobe',
    description: 'Using force against a woman with the intention to disrobe her or compel her to be naked, a serious violation of dignity.',
    severity: 'High',
    punishment: 'Imprisonment 3-7 years and fine',
    howToReport: 'Seek immediate medical attention, report to police urgently, contact victim support services.',
  },
];