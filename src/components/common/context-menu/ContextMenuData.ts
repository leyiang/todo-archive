import type { ComputedRef } from "vue";

export const menuSpecMap = new Map();

export type menuSpecItem = {
    name: string | ComputedRef<string>
    action: () => void
}

export function addNewMenu( el: HTMLElement, spec: menuSpecItem[] ) {
    menuSpecMap.set( el, spec );
}