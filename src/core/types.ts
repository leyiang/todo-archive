export interface iTask {
    name: string;
    list_id: number;
    date: Date | null;
    important: boolean;
    finish: boolean;
}

export interface iList {
    id: number,
    name: string,
    icon: string | null,
    tasks: iTask[]
}