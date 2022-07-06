export default class Step {
    constructor(
        public id: number,
        public name: string,
        public finished: boolean = false,
        public date: Date | null = null,
    ) {
        
    }
}