import { Installments } from "src/app/shared/button-toggle/installment.model";


export function getInstallmentsAsText(installment: Installments): string {
    return installment === Installments.DEACRISING ? 'raty malejące' : 'raty równe';
}

export function round(num: number): number {
    return Math.round(num * 100) / 100;
}