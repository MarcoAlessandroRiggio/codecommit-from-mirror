import * as cdk from "aws-cdk-lib";
import {CodecommitFromMirrorStack, CodecommitFromMirrorStackProps} from "../lib/codecommit-from-mirror-stack";
import {Template} from "aws-cdk-lib/assertions";
import container from "../lib/config/ioc_config";
import SERVICE_IDENTIFIER, {CFN} from "../lib/constants/identifiers";
import {Construct} from "constructs";

let stackService = container.get<(scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) => CodecommitFromMirrorStack>(SERVICE_IDENTIFIER.STACK);

const setup = (props?: CodecommitFromMirrorStackProps): Template => {
    const app = new cdk.App();
    const stack = stackService(app, "MyTestStack", props);
    return Template.fromStack(stack);
}

const checkIfThereIsA = (resource: string) => {
    const template = setup({repoNames: ["unused"]});
    template.hasResource(resource, {});
}

describe(`CodecommitFromMirrorStack`, () => {
    test(`Have a Group`, () => checkIfThereIsA(CFN.IAM_GROUP))
    test(`Have a User`, () => checkIfThereIsA(CFN.IAM_USER))
    test(`The User is a member in the group`, () => {
        const template = setup();
        template.hasResourceProperties(CFN.IAM_USER, {
            "Groups": [{"Ref": Object.keys(template.findResources(CFN.IAM_GROUP)).pop()}]
        });
    })
})
