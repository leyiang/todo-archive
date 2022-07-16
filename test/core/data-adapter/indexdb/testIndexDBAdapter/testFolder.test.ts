// @ts-ignore
import IndexDBAdapter from "@/core/data-adapter/indexdb/IndexDBAdapter";
import {describe, it, expect, beforeEach} from 'vitest'
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import {isRawFolder, type rawFolder} from "@/core/model/rawTypes";
import type {filterOptionsType} from "@/core/model/folder/FilterOptions";

let adapter = new IndexDBAdapter();

describe('IndexDB Adapter - Folder', () => {
    beforeEach(() => {
        // @ts-ignore, Global Variable
        indexedDB = new IDBFactory( true );
        adapter = new IndexDBAdapter();
    })

    it("Able to add Folder", async () => {
        const name = "new Folder";

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        });

        await adapter.addFolder(name);

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 1 );
            expect( folders[0].name ).toBe( name );
        })
    });

    it('Empty folder name will not be added', async () => {
        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        });

        await expect( adapter.addFolder('') ).rejects.toThrow("empty");

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        })
    });

    it("Able to set folder prop", async () => {
        const name = "new Folder";
        const prop = {
            name: "New Folder Name",
            order: 9,
            filterOptions: {
                today: true
            } as filterOptionsType
        } as const;

        await adapter.addFolder(name);

        let folder = null as null | rawFolder;

        await adapter.loadData().then( folders => {
            folder = folders[0];
            expect( folder.name ).toBe( name );
            expect( folder.order === 10 || folder.order === undefined ).toBeTruthy();
            expect( folder.filterOptions ).toMatchObject({});
        });

        if( isRawFolder(folder) ) {
            let key: keyof typeof prop;
            for(key in prop) {
                await adapter.setFolderProp(folder.id, key, prop[key]);
            }

            await adapter.loadData().then( folders => {
                folder = folders[0];

                expect( folder.name ).toBe( prop.name );
                expect( folder.order ).toBe( prop.order );
                expect( folder.filterOptions ).toMatchObject( prop.filterOptions );
            });
        } else {
            throw "Something went wrong!";
        }
    });

    it("Able to remove Folder", async () => {
        const name = "new Folder";

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        });

        const rawFolder = await adapter.addFolder(name);
        await adapter.removeFolder( rawFolder.id );

        await adapter.loadData().then( folders => {
            expect( folders.length ).toBe( 0 );
        })
    });
});
