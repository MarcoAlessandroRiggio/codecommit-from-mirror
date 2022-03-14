import {Construct} from "constructs";

export interface Service<Typo, Props> {
    createInstance(scope: Construct, id: string, props: Props): Typo
}
