import LocalStoreManager from "@/core/accessor/store/LocalStorageManager";

class StatePreserver {
    #record: {
        [key: string]: any
    };
    #manager: LocalStoreManager;

    constructor() {
        this.#manager = new LocalStoreManager();
        this.#record = this.#manager.get("app-state") || {};
    }

    get(key:string) {
        return this.#record[ key ];
    }

    save(key: string, val: number | null) {
        this.#record[key] = val;
        this.#manager.set("app-state", this.#record);
    }
}

export default new StatePreserver();