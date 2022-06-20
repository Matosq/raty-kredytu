import { IconName } from "./icon-names.model";

export enum ButtonType {
    SMALL = 1
}
export interface ButtonConfig {
    type?: ButtonType;
    text: string;
    icon: IconName;
}