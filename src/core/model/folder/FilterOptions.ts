import { getTodayString } from "@/shared/utils";

export const availableOptions = ["today", "important"];

export interface filterOptionsType {
    today?: boolean;
    important?: boolean;
}

export default class FilterParser {
    constructor() {

    }

    checkValid( option: string, plan: any, ) {
        if( availableOptions.includes( option ) ) {
            if( option === "today" ) {
                return plan.date === getTodayString();
            }

            if( option === "important" ) {
                return !! plan.important;
            }
        } else {
            // No Good
            return false;
        }
    }
}