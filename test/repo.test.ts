import {Match, Template} from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import {Stack} from "aws-cdk-lib";
import {Construct} from "constructs";
import {Repo} from "../lib/repo";
import {RepoProps} from "../lib/entities/repo-service";
import {CFN} from "../lib/constants/identifiers";

class RepoStack extends Stack {
    constructor(scope: Construct, id: string, props?: RepoProps) {
        super(scope, id, {});
        new Repo(this, 'repository', props);
    }
}

const setup = (props?: RepoProps): Template => {
    const app = new cdk.App();
    const stack = new RepoStack(app, 'MyTestStack', props);
    return Template.fromStack(stack);
}
const repoName = `wonderfulRepoName`;
const checkIfThereIsA = (resource: string) => setup({repoName}).hasResource(resource, {});

describe(`Repo Class`, () => {
    test(`Have a Repo`, () => checkIfThereIsA(CFN.CODECOMMIT_REPOSITORY))
    test('The repo have the right name', () => {
        const template = setup({repoName});
        template.hasResourceProperties(CFN.CODECOMMIT_REPOSITORY, {"RepositoryName": repoName});
    })
    test('There is a CfnOutput for the ssh repo url', () => {
        const template = setup({repoName});
        const output = template.findOutputs(`repoSshUrl${repoName}`, {
            Value: Match.objectEquals({
                "Fn::GetAtt": Match.arrayEquals([
                    Object.keys(template.findResources(CFN.CODECOMMIT_REPOSITORY)).pop(),
                    `CloneUrlSsh`
                ])
            })
        });
        expect(output).not.toEqual({});
    })
})
