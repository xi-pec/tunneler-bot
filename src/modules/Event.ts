export interface EventOptions {
    name: string
    callback: (...args: any) => Promise<void> | void
}

export class Event {
    name: string;
    callback: (...args: any) => Promise<void> | void;

    constructor(options: EventOptions) {
        this.name = options.name;
        this.callback = options.callback;
    }
}