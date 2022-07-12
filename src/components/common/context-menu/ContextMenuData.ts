export const menuSpecMap = new Map();

export type menuSpecItem = {
    name: string;
    action: () => void
}

export function addNewMenu( el: HTMLElement, spec: menuSpecItem[] ) {
    menuSpecMap.set( el, spec );
}