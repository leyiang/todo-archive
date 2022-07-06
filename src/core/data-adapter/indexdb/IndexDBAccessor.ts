type initCallback =  (
    db: IDBDatabase,
    createStore: (name: string, key: string[]) => void
) => void;

export default class IndexDBAccessor {
    private DBRequest: IDBOpenDBRequest;
    private db?: IDBDatabase;
    private onReadyCallback: (() => void) [] = [];
    private onInitCallback: initCallback[] = [];

    constructor(
        public dbName: string,
        public version: number
    ) {
        this.DBRequest = indexedDB.open( dbName, version );

        this.DBRequest.onsuccess = () => {
            this.db = this.DBRequest.result;

            /**
             * Database Ready
             */
            this.onReadyCallback.forEach( callback => {
                callback();
            });
        }

        /**
         * Init Database
         */
        this.DBRequest.onupgradeneeded = () => {
            this.db = this.DBRequest.result;

            const createStore = (
                name: string,
                keys: string[] = [],
                // callback: (
                //     store: IDBObjectStore,
                //     createIndex: (name: string) => void
                // ) => void,
            ) => {
                const store = this.db.createObjectStore(name, {
                    keyPath: "id",
                    autoIncrement: true
                });

                const createIndex = (name:string) => {
                    store.createIndex(name, name, {unique: false});
                }

                keys.forEach( key => {
                    createIndex( key );
                });
            }

            this.onInitCallback.forEach( callback => {
                if( this.db !== undefined ) {
                    callback( this.db, createStore );
                }
            });
        }
    }

    #getStore( storeName: string, mode:IDBTransactionMode = "readonly" ) {
        if( ! this.db ) {
            throw "DB is not ready, try use IndexDBAccessor.onReady"
        }

        const transaction = this.db.transaction( storeName, mode );
        return transaction.objectStore(storeName);
    }

    /**
     * Register On Ready
     */
    onReady( callback: () => void ) {
        if( this.db !== undefined ) {
            callback();
        } else {
            this.onReadyCallback.push( callback );
        }
    }

    onInitDatabase( callback: initCallback ) {
        this.onInitCallback.push( callback );
    }

    get( storeName:string ): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const request = this.#getStore( storeName ).getAll();

            request.onsuccess = () => {
                resolve( request.result );
            }
        });
    }

    add( storeName:string, item: any ): Promise<number> {
        return new Promise(resolve => {
            console.log( item );
            const request = this.#getStore(storeName, "readwrite")
                .add( item );

            request.onsuccess = () => {
                const id = request.result as number;
                resolve( id );
            }
        });
    }

    clear( storeName: string ): Promise<void> {
        return new Promise((resolve) => {
            const request = this.#getStore(storeName, "readwrite")
                .clear();

            request.onsuccess = () => {
                resolve();
            }
        });
    }
}