import { IDevSkimSettings } from "../devskimObjects";
export declare class DevSkimWorkerSettings {
    getSettings(settings?: IDevSkimSettings): IDevSkimSettings;
    getRulesDirectory(): string;
    defaultSettings(): IDevSkimSettings;
}
