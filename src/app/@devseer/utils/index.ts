export class DevSeerUtils {
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString(mainArr, searchText): any {
        if (searchText === '') {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj, searchText): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            const value = itemObj[prop];

            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            } else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr, searchText): boolean {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value, searchText): any {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string {
        function S4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    public static toggleInArray(item, array): void {
        if (array.indexOf(item) === -1) {
            array.push(item);
        } else {
            array.splice(array.indexOf(item), 1);
        }
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize(text): string {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    // public static contractReadable(contract): Promise<Contract> {
    //     return new Promise(async (resolve, reject) => {
    //       let ct: any;
    //       ct = new Contract(contract);
    //       console.log(ct);
    //       ct.methods = await ct.abi.filter((a) => a.type === 'function');
    //       ct.methods = await this.abiMethodToForm(ct.methods);
    //       resolve(ct);
    //     });
    //   }

    //   // eslint-disable-next-line @typescript-eslint/ban-types
    //   public static abiMethodToForm(func: any[]): Method[] {
    //     const md: any[] = [];
    //     func.map(f => md.push(new Method(f)));
    //     return md;
    //   }

    public static isEmpty(obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    public static factoryProviders() {
        return [
            {
                1: [
                    {
                        name: "Uniswap",
                        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
                        linkSwap: "https://app.uniswap.org/#/swap?outputCurrency=",
                        factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
                    },
                    {
                        name: "Sushiswap",
                        address: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
                        linkSwap: "https://app.sushi.com/swap#/swap?outputCurrency=",
                        factory: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"
                    },
                ],
                43114: [
                    {
                        name: "Traderjoexyz",
                        address: "0xEC3452f87CBa05c5a8c3529b6c961779EB77f257",
                        linkSwap: "https://traderjoexyz.com/trade?outputCurrency=",
                        factory: "0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10"
                    }, {
                        name: "Pangolin",
                        address: "0xaF1481a933f721ab6eC027b07fc535dFB4e894aD",
                        linkSwap: "https://app.pangolin.exchange/#/swap?outputCurrency=",
                        factory: "0xefa94DE7a4656D787667C749f7E1223D71E9FD88"
                    }
                ],
                56: [
                    {
                        name: "Pancakeswap",
                        address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
                        linkSwap: "https://pancakeswap.finance/swap?outputCurrency=",
                        factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
                    }, {
                        name: "PinkSwap",
                        address: "0x319EF69a98c8E8aAB36Aea561Daba0Bf3D0fa3ac",
                        linkSwap: "https://exchange.pinkswap.finance/#/swap?outputCurrency=",
                        factory: "0x7D2Ce25C28334E40f37b2A068ec8d5a59F11Ea54"
                    }, {
                        name: "ApeSwap",
                        address: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
                        linkSwap: "https://dex.apeswap.finance/#/swap?outputCurrency=",
                        factory: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6"
                    }
                ],
                97: [
                    {
                        name: "Pancakeswap",
                        address: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
                        linkSwap: "https://pancakeswap.finance/swap?outputCurrency=",
                        factory: "0x6725F303b657a9451d8BA641348b6761A6CC7a17"
                    }, {
                        name: "PinkSwap Testnet",
                        address: "0xBBe737384C2A26B15E23a181BDfBd9Ec49E00248",
                        linkSwap: "https://test-swap.pinksale.finance/#/swap?outputCurrency=",
                        factory: "0xaADB9Ef09AAF53019Ebe3ebB25aEcbb2c9E63210"
                    }
                ],
                80001: [],
                137: [
                    {
                        name: "QuickSwap",
                        address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
                        linkSwap: "https://quickswap.exchange/#/swap?outputCurrency=",
                        factory: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32"
                    }
                ],
                321: [
                    {
                        name: "Kuswap",
                        address: "0xa58350d6dee8441aa42754346860e3545cc83cda",
                        linkSwap: "https://kuswap.finance/#/swap?outputCurrency=",
                        factory: "0xa58350d6dee8441aa42754346860e3545cc83cda"
                    }
                ],
                250: [
                    {
                        name: "SpookySwap",
                        address: "0xf491e7b69e4244ad4002bc14e878a34207e38c29",
                        linkSwap: "https://spookyswap.finance/swap?outputCurrency=",
                        factory: "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3"
                    }, {
                        name: "SpiritSwap",
                        address: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52",
                        linkSwap: "https://app.spiritswap.finance/#/swap?outputCurrency=",
                        factory: "0xef45d134b73241eda7703fa787148d9c9f4950b0"
                    }
                ],
                1645810916854: [
                    {
                        name: "BitValley",
                        address: "0xdd8b490001d081ed065239644dae8d1a77b8a91f",
                        linkSwap: "https://bitvalley.io",
                        factory: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
                    }
                ]
            }
        ]

    }


    public static networkManager() {
        return [
            {
                name: "Ethereum Mainnet",
                chainId: 1,
                chainName: "ETH",
                icon: 'ether.svg',
                currency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: ["https://mainnet.infura.io/v3/20e078e98de64af88b26c6b1bb47f822"],
                blockExplorerUrls: ["https://etherscan.io"]
            }, {
                name: "BNB Smart Chain Mainnet",
                chainId: 56,
                chainName: "BSC",
                icon: 'bsc.png',
                currency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                rpcUrls: ["https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed.binance.org"],
                blockExplorerUrls: ["https://bscscan.com"]
            },
            {
                name: "Cronos Chain",
                chainId: 25,
                chainName: "CRO",
                icon: 'cronos.png',
                currency: {
                    name: "Cronos",
                    symbol: "CRO",
                    decimals: 8
                },
                rpcUrls: ["https://evm-cronos.crypto.org"],
                blockExplorerUrls: ["https://cronos.crypto.org/explorer/"]
            },
            {
                name: "Avalanche Mainnet C-Chain",
                chainId: 43114,
                chainName: "AVAX",
                icon: 'avalanche.svg',
                currency: {
                    name: "AVAX",
                    symbol: "AVAX",
                    decimals: 18
                },
                rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://cchain.explorer.avax.network/"]
            },


        ];
    }


    public static chainNativeCoins() {
        return [
            {
                1: [
                    {
                        name: "ETH",
                        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                        tx: "0x898F9c8185fe683231De7DE6c3bc39441394BdA7",
                    }, {
                        name: "USDT",
                        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                        tx: "0x898F9c8185fe683231De7DE6c3bc39441394BdA7",
                    }, {
                        name: "USDC",
                        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                        tx: "0x898F9c8185fe683231De7DE6c3bc39441394BdA7"
                    }
                ],
                25: [
                    {
                        name: "CRO",
                        address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
                        tx: "0xEa51570b71d439fd638f9c09c27662bBCa6813F5",
                    }
                ],
                43114: [
                    {
                        name: "WAVAX",
                        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
                        tx: "0x5922C005cCdAd39917790E20DE0442644db7078F"
                    }
                ],
                56: [
                    {
                        name: "BNB",
                        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                        tx: "0xe7a2Acd49b165499dd3590747440122C12E735aE"
                    }, {
                        name: "BUSD",
                        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                        tx: "0xe7a2Acd49b165499dd3590747440122C12E735aE"
                    }
                ]
            }
        ]
    }

    public static form() {
        return [
            {
                'stepname': 'basic',
                'formFields': [
                    {
                        'key': 'tokenAddress',
                        'input': 'text',
                        'valids': [{
                            'valid': 'required',
                            'error': 'tokenAddress is required'
                        },
                            {
                                'valid': 'pattern',
                                'validator': '^[a-zA-Z]+$',
                                'error': 'tokenAddress is accept only text'
                            },
                            {
                                'valid': 'minlength',
                                'length': 3,
                                'error': 'tokenAddress must be at least 3 characters'
                            }
                        ]
                    },
                ]
            },
            {
                'stepname': 'contact',
                'formFields': [
                    {
                        'key': 'emailId',
                        'input': 'email',
                        'valids': [{
                            'valid': 'required',
                            'error': 'emailId is required'
                        },
                            {
                                'valid': 'emailId',
                                'error': 'emailId must be valid'
                            }
                        ]
                    }
                ]
            },
            {
                'stepname': 'other',
                'formFields': [
                    {
                        'key': 'country',
                        'input': 'text',
                        'valids': [{
                            'valid': 'required',
                            'error': 'country is required'
                        },
                        ]
                    },
                    {
                        'key': 'state',
                        'input': 'text',
                        'valids': [{
                            'valid': 'required',
                            'error': 'state is required'
                        },
                        ]
                    }
                ]
            }
        ];
    }
}
