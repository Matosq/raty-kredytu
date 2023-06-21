export interface SectionCard {
    cardHeader: SectionCardHeader;
}

export enum SectionCardHeader {
    LOAN = 'parametry kredytu',
    TRANCHES = 'transze',
    COSTS = 'koszty dodatkowe',
    OVERPAYMENTS = 'nadpłaty',
    RATE = 'oprocentowanie',
    SUMMARY = 'podsumowanie',
    SIMULATION = 'raty kredytu'
}