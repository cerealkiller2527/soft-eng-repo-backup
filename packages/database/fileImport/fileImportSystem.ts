import {fileToJSON} from "./fileToJSON.ts";

export class fileImportSystem{
    importer: fileToJSON;

    constructor (importer: fileToJSON){
        this.importer = importer;
    }

    public switchFileImporter(importer: fileToJSON){
        this.importer = importer;
    }

}