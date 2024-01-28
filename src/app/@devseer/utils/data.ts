export class Data {
    public static getData(): any {
     
    }
}

export class BitVData {

    public static getAllCollections(): any {
        return Data.getData();
    }

    public static getDataByChain(chain: number): any[] {
        return Data.getData().filter((a) => a.chain === chain);
    }

    public static getDataByChainAndAtr(chain: number): any[] {
        return Data.getData().filter((a) => a.chain === chain && a.morphable == true);
    }
}