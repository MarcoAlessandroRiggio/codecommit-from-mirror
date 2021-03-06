import {CfnOutput} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Repository} from "aws-cdk-lib/aws-codecommit";
import {RepoProps} from "./entities/repo-service";

export class Repo {

    constructor(scope: Construct, id: string, props?: RepoProps) {
        const repositoryName = props ? props.repoName : `name`;
        const repository = new Repository(scope, `repo-${repositoryName}`, {repositoryName});
        new CfnOutput(scope, `repoSshUrl${repositoryName}`, {
            value: repository.repositoryCloneUrlSsh,
            description: `the repository url that allow connection via ssh`,
            exportName: `${repositoryName}-ssh-url`
        });
    }

}
