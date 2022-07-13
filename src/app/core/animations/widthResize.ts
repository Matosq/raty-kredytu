import { animate, state, style, transition, trigger } from '@angular/animations';

export const widthResizeAnimation = trigger('widthResize', [
    state('true', style({ width: '{{size}}%' }),
        { params: { size: 0 } }),
    state('false', style({ width: '{{size}}%' }),
        { params: { size: 0 } }),
    transition('false <=> true',
        animate('500ms ease'))
]);

