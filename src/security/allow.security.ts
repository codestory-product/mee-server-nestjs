import { Injectable } from "@nestjs/common";

// 간단한 security configuration
@Injectable()
export class AllowRequestConfiguration {

    allowed: Map<string, string>

    constructor() {
        this.allowed = new Map<string, string>();

        this.allow('/user/authentication/signin')
            .allow('/user/authentication/signup')
            .allow('/shop/buy')
    }
    
    allow(allowReqUrl: string): AllowRequestConfiguration {
        this.allowed.set(allowReqUrl, allowReqUrl);
        return this;
    }

    isAllow(reqUrl: string) {
        return this.allowed.has(reqUrl);
    }

}
