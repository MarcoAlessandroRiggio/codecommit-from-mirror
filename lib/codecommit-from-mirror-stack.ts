import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Group, User} from "aws-cdk-lib/aws-iam";
import {injectable} from "inversify";
import {RepoProps} from "./entities/repo-service";
import {Service} from "./interfaces/service";
import {Repo} from "./repo";

export interface CodecommitFromMirrorStackProps extends StackProps {
    readonly repoNames: [string];
}

@injectable()
export class CodecommitFromMirrorStack extends Stack {

    constructor(repoService: Service<Repo, RepoProps>, scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) {
        super(scope, id, props);
        props?.repoNames.map(repoName => repoService.createInstance(this, `repository`, {repoName}));
        const group = new Group(this, `Pusher`);
        const user = new User(this, `User`);
        group.addUser(user);
    }

}
