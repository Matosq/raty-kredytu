import { Installments } from "src/app/calculator/models/installment.model";


export function getInstallmentsAsText(installment: Installments): string {
  return installment === Installments.DEACRISING ? 'raty malejące' : 'raty równe';
}

export function round(num: number): number {
  return Math.round(num * 100) / 100;
}

export function getPeriodHintText(value: number): string {
  let hint = '';
  const numerals = ['2', '3', '4'];
  const years = Math.floor(value / 12);
  if (value <= 0 || years < 1) { return hint; }
  if (years === 1) {
    hint += '1 rok';
  } else {
    hint = `${years} `;
    hint += numerals.includes(years.toString()) ? 'lata' : 'lat';
  }
  const months = value % 12;
  if (months < 1) { return hint; }
  if (months === 1) {
    hint += ' 1 miesiąc';
    return hint;
  }
  hint += ` ${months} `
  hint += numerals.includes(months.toString()) ? 'miesiące' : 'miesięcy';
  return hint;
}