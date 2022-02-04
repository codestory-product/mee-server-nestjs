import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
import { AllowRequestConfiguration } from "./allow.security";

@Injectable()
export class SecurityMiddleware implements NestMiddleware {

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly allow: AllowRequestConfiguration
    ) {}

    use(req: Request, res: any, next: () => void) {
        console.log(req.baseUrl);
        console.log(this.allow.isAllow(req.baseUrl));
        if(this.allow.isAllow(req.baseUrl)) {
            this.cacheManager.get(req.sessionID, (err, result) => {
                console.log(err);
                console.log(result);
            });
        }
        next();
    }

}