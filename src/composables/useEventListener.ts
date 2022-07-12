export function useEventListener<E extends keyof WindowEventMap>( event: E, callback: ( e: WindowEventMap[E] ) => void ) {
    window.addEventListener(event, callback);
}