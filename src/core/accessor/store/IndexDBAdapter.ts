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

    fetchStore(name: string, mode="readwrite") {
        if( ! this.#db ) {
            throw new TypeError("DB Not connect");
        }

        return this.#db
            .transaction([ name ], mode )
            .objectStore( name );
    }

    getAll(storeName: string,): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.#db === null) {
                return reject("No DB");
            }

            const store = this.fetchStore(storeName);

            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            }

            request.onerror = e => {
                reject(e);
            }
        });
    }

    addItem(storeName: string, value: {}): Promise<number> {
        return new Promise((resolve, reject) => {
            if( this.#db === null ) {
                return reject("DB Not connected");
            }

            const store = this.fetchStore(storeName);
            const request = store.add(value);

            request.onsuccess = (e) => {
                // Everything with Event is so annoying
                //@ts-ignore
                resolve( e.target.result );
            }

            request.onerror = () => {
                reject("Add Error");
            }
        });
    }

    clear(storeName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if( this.#db === null ) {
                return reject("DB Not connected");
            }

            const store = this.fetchStore( storeName );
            const request = store.clear();

            request.onsuccess = () => {
                resolve();
            }

            request.onerror = (e) => {
                reject(e);
            }
        });
    }

    update(storeName: string, id: number, key: string, value: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const store = this.fetchStore(storeName);
            const request = store.get( id );

            request.onsuccess = () => {
                const data = request.result;
                data[ key ] = value;

                const updateRequest = store.put( data );

                updateRequest.onsuccess = () => {
                    resolve();
                }

                updateRequest.onerror = e => {
                    reject( e );
                }
            }

            request.onerror = (e) => {
                reject(e);
            }
        });
    }

    remove(storeName: string, id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const store = this.fetchStore( storeName );
            const request = store.delete( id );

            request.onsuccess = () => {
                resolve();
            }

            request.onerror = e => {
                reject( e );
            }
        });
    }
}