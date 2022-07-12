import {useEventListener} from "@/composables/useEventListener";

export function useClickOutside( el: HTMLElement, callback: () => void ) {
    useEventListener("click", e => {
        if( e.target !== el ) {
            callback();
        }
    });
}
