

export interface Algorithm {

    findPath(startDesc: string, endDesc: string): Promise<number[][]>;

}