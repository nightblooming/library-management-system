import { Strategy } from 'passport-jwt';
import { Role } from '@prisma/client';
export interface JwtPayload {
    sub: number;
    email: string;
    role: Role;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
export {};
