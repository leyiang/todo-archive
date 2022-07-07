import type {filterOptionsType} from "@/core/model/folder/FilterOptions";
import type Task from "./Task";
import type Step from "./Step";

export interface rawFolder {
    id: number;
    name: string;
    order: number,
    filterOptions?: filterOptionsType,
    plans: (rawTask | rawStep)[]
}

export function getRawFolder(
    id: number,
    name: string,
    filterOptions: filterOptionsType = {},
    order: number = 10,
): rawFolder {
    return { id, name, filterOptions, order, plans: [] };
}

export function isRawFolder( raw: any ): raw is rawFolder {
    const requiredKeys = [ "id", "name" ];

    for(let key of requiredKeys) {
        if( ! raw.hasOwnProperty(key) ) {
            return false;
        }
    }

    return true;
}

export interface rawTask extends Task {
    id: number;
    name: string;
    folder_id: number;
    date: null | string;
    important: boolean;
    finished: boolean;
    steps: rawStep[];
    description: string;
    priority: number;
}

export function getRawTask(
    id: number,
    name: string,
    folder_id: number,
    date: string | null = null,
    important= false,
    finished = false,
    description = "",
    priority = 10,
): rawTask {
    return { id, name, folder_id, date, important, finished, description, priority, steps: [] };
}

export interface rawStep extends Step {
    id: number;
    name: string;
    date: null | string;
    task_id: number;
    finished: boolean
    priority: number;
}

export function isRawStep(raw: any): raw is rawStep {
    const requiredKeys = [ "id", "name", "task_id" ];

    for(let key of requiredKeys) {
        if( ! raw.hasOwnProperty(key) ) {
            return false;
        }
    }

    return true;
}

export function getRawStep(
    id: number,
    name: string,
    task_id: number,
    date: string | null = null,
    finished = false,
    priority = 10,
): rawStep {
    return { id, name, date, task_id, finished, priority };
}

export function isRawTask(raw: any): raw is rawTask {
    const requiredKeys = [ "id", "name", "folder_id" ];

    for(let key of requiredKeys) {
        if( ! raw.hasOwnProperty(key) ) {
            return false;
        }
    }

    return true;
}