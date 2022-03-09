import * as cdk from "aws-cdk-lib";
import {CodecommitFromMirrorStack, CodecommitFromMirrorStackProps} from "../lib/codecommit-from-mirror-stack";
import {Template} from "aws-cdk-lib/assertions";

const setup = (props?: CodecommitFromMirrorStackProps): Template => {
    const app = new cdk.App();
    const stack = new CodecommitFromMirrorStack(app, 'MyTestStack', props);
    return Template.fromStack(stack);
}

const checkIfThereIsA = (resource: string) => {
    const template = setup({repoNames: ["unused"]});
    template.hasResource(resource, {});
}

describe(`CodecommitFromMirrorStack`, () => {
    test(`Have a Group`, () => checkIfThereIsA(`AWS::IAM::Group`))
    test(`Have a User`, () => checkIfThereIsA(`AWS::IAM::User`))
    test(`The User is a member in the group`, () => {
        const template = setup();
        template.hasResourceProperties(`AWS::IAM::User`, {
            "Groups": [{"Ref": Object.keys(template.findResources(`AWS::IAM::Group`)).pop()}]
        });
    })
})