export abstract class fileToJSON{

    abstract toJSON(filePath: string): Record<string, string>[];

}