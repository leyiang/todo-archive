import StoreAccessor from "./StoreAccessor";
const instance = new StoreAccessor();

export default {
    install(app : any) {
        app.provide("accessor", instance);
    }
}