import { ChildProcess, exec } from "child_process";
import { connect } from "ngrok";
import { join } from "path";
import { EventEmitter } from "events";

export class Server extends EventEmitter {
    state: ("idle" | "ready" | "processing" | "running") = "idle";
    shell: ChildProcess | null = null;
    url: string | null = null;

    async init() {
        try {
            const url = await connect({
                authtoken: process.env.NGROK_TOKEN,
                addr: 25565,
                proto: "tcp",
            });
    
            this.state = "ready";
            this.url = url;
    
            console.log("tunnel ready");
            this.emit("ready");
        } catch (e) {
            console.log("unable to tunnel, retrying in 5 seconds");
            setTimeout(() => { this.init(); }, 5000);
        }
    }

    start() {
        return new Promise<number>(async (y,n) => {
            if (this.state == "idle") n(1);
            if (this.state == "processing" || this.state == "running") n(2);

            const script = join(global.__dirname, "..", "server", "start.sh").split("\\").join("/");
            this.shell = exec(`sh ${script}`);
            y(0);

            this.shell.stdout?.on("data", (data) => {
                const msg: string = data.toString().trim();

                if (msg == "Starting org.bukkit.craftbukkit.Main") {
                    this.state = "processing";
                    this.emit("starting");
                } else if (msg.match(/\[.+ INFO\]: Done \(.+\)! For help, type "help"/)) {
                    this.state = "running";
                    this.emit("running");
                }
            });

            this.shell.on("close", () => {
                this.state = "ready";
                this.emit("stopped");
            });
        });
    }

    stop() {
        return new Promise(async (y,n) => {
            if (this.state == "idle") n(1);
            if (this.state == "processing" || this.state == "ready") n(2);

            const terminal = this.shell!.stdin!;
            terminal.write("stop");
            terminal.end();
            y(0);

            this.emit("stopping");
            this.state = "processing";
        });
    }

    constructor() {
        super();
        this.init();
    }

    ip() {
        if (this.state != "running") return null;
        return this.url!.split("tcp://").join("");
    }
}