import { fileToJSON } from "./fileToJSON.ts";
import fs from "fs";

export class CSVToJSON implements fileToJSON {
  public toJSON(filePath: string): Record<string, string>[] {
    const elements = this.pathToArray(filePath);

    const headers = elements[0];

    
  }

  private importCSV(path: string): string {
      return fs.readFileSync(path, "utf-8");
  }

  public pathToArray(path: string): string[][] {
      const flatCSV = this.importCSV(path);
      const trimmedCSV = flatCSV.trim();
      const splitCSV = trimmedCSV.split("\n"); // split into rows using new line operator
      const trimmedElemenets = this.trimRowElements((splitCSV))
      const csvArray = trimmedElemenets.map((row) => row.split(",")); // split rows into columns

      return csvArray;
  }

  private trimRowElements(row: string[]): string[]{
      return row
          .map(element => (element.replace("\r", "")))
          .map(element => (element.replace("\t", "")))
  }
}
