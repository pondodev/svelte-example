export class PersonData {
    name    : string = "";
    age     : number = 0;

    static fromFormData(nameStr: string, ageStr: string) : PersonData {
        const toReturn: PersonData = {
            name: nameStr,
            age: parseInt(ageStr),
        };

        return toReturn;
    }

    static fromResponse(data: any) : PersonData {
        const toReturn: PersonData = {
            name: data["name"],
            age: data["age"],
        };

        return toReturn;
    }
}

export namespace API {
    export interface APIResponse {
        success : boolean;
        data?   : any;
    }

    type RequestCompleteCallback = (response: APIResponse) => void;

    export function get(url: string, completeCallback: RequestCompleteCallback) : void {
        const opts: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {},
        };

        fetch(url, opts)
            .then((response: Response) => {
                if (! response.ok)
                    completeCallback({ success: false });

                response.json()
                    .then((body: any) => {
                        if (body["success"] != null)
                            completeCallback(body);
                        else
                            completeCallback({ success: false });
                    })
                    .catch(() => {
                        completeCallback({ success: false });
                    });
            }).catch(() => {
                completeCallback({ success: false });
            });
    }

    export function put(url: string, body: any, completeCallback: RequestCompleteCallback) : void {
        const opts: RequestInit = {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        };

        fetch(url, opts)
            .then((response: Response) => {
                if (! response.ok)
                    completeCallback({ success: false });

                response.json()
                    .then((body: any) => {
                        if (body["success"] != null)
                            completeCallback(body);
                        else
                            completeCallback({ success: false });
                    }).catch(() => {
                        completeCallback({ success: false });
                    });
            }).catch(() => {
                completeCallback({ success: false });
            });
    }
}
