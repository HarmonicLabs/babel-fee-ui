interface UnitRequest {
    unit: string;
    expireAfter?: string;
    lovelacesFee: number;
}

interface BabelFeeRequest {
    redeemerDataHex: string;
    txOutRef: string;
    resolvedCborHex: string;
    script: string;
    allowedAdaToSpend: string;
    tokePlicyID: string;
    tokenNameHex: string;
    tokenAmtToSend: string;
    expirationTime: string;
}

class BabelApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl; // Ensure no trailing slash
    }

    async postInput(request: UnitRequest): Promise<any> {
        const response = await fetch(`${this.baseUrl}/input`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });
        }
        return await response.json();
    }

    async postEstimate(request: UnitRequest): Promise<any> {
        const response = await fetch(`${this.baseUrl}/estimate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });
        }
        return await response.json();
    }

    async postBabelFee(request: BabelFeeRequest): Promise<any> {
        const response = await fetch(`${this.baseUrl}/tx/babelFee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });
        }
        return await response.json();
    }

    async getTokens(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/tokens`);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });
        }
        return await response.json();
    }

    async getScriptInline(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/script/inline`);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });
        }
        return await response.json();
    }

    async getScriptRefInput(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/script/refInput`);
        if (!response.ok) {
            
            const errorBody = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            return({
                status: "error",
                message: errorBody
            });

        }
        return await response.json();
    }
}

export default BabelApiClient;