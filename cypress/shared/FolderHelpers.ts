import {get} from "./utils";

export default class FolderHelpers {
    static CreateFolder( name: string ) {
        const chain = get("folder-add-new").click();

        if( ! name ) {
            chain.type("{enter}");
        } else {
            chain.type( name ).type("{enter}")
        }
    }

    static GetAll() {
        return get("folder-item");
    }
}