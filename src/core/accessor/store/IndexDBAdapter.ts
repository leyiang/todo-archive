export default class IndexDBAdapter {
    #db: IDBDatabase | null;
    beforeDBSetup: Function[];
    initCallback: null | Function;

    constructor(name: string, version: number) {
        const request = indexedDB.open(name, version);

        this.#db = null;
        this.initCallback = null;
        /**
         * Callbacks that ran before db is connected
         */
        this.beforeDBSetup = [];

        request.onupgradeneeded = (e) => {
            // stupid event thing
            // @ts-ignore
            const db = this.#db = e.target.result;

            if (typeof this.initCallback === "function") {
                this.initCallback(db);
            }
        }

        request.onsuccess = (e) => {
            // @ts-ignore
            this.#db = e.target.result;
            this.beforeDBSetup.forEach(callback => {
                callback(this.#db);
            });
        }
    }

    /**
     *
     */
    init(callback: Function) {
        this.initCallback = callback;
    }

    connected(callback: Function) {
        if (this.#db) {
            callback(this.#db);
        } else {
            this.beforeDBSetup.push(callback);
        }
    }

    getAll(store: string,): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.#db === null) {
                return reject("No DB");
            }

            const request = this.#db
                .transaction([store], "readwrite")
                .objectStore(store)
                .getAll()

            request.onsuccess = () => {
                resolve(request.result);
            }

            request.onerror = e => {
                reject(e);
            }
        });
    }

    addItem(store: string, value: {}): Promise<void> {
        return new Promise((resolve, reject) => {
            if( this.#db === null ) {
                return reject("DB Not connected");
            }

            const request = this.#db
                .transaction([store], "readwrite")
                .objectStore(store)
                .add(value);

            request.onsuccess = () => {
                resolve();
            }

            request.onerror = () => {
                console.log("Write error");
            }
        });
    }

    clear(store: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if( this.#db === null ) {
                return reject("DB Not connected");
            }

            const request = this.#db
                .transaction([store], "readwrite")
                .objectStore(store)
                .clear();

            request.onsuccess = () => {
                resolve();
            }

            request.onerror = (e) => {
                reject(e);
            }
        });
    }
}