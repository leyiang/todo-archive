import { getTodayString } from "@/shared/utils";
import { isRawTask, type rawStep, type rawTask } from "../rawTypes";

export const availableOptions = ["today", "important", "all"];

export interface filterOptionsType {
    today?: boolean;
    important?: boolean;
    all: boolean;
}

export default class FilterParser {
    constructor() {

    }

    checkValid( option: string, plan: rawTask | rawStep, ) {
        if( availableOptions.includes( option ) ) {
            if( option === "today" ) {
                return plan.date === getTodayString();
            }

            if( option === "important" && isRawTask(plan) ) {
                return !! plan.important;
            }

            if( option === "all" ) {
                return isRawTask( plan );
            }
        } else {
            // No Good
            return false;
        }
    }
}