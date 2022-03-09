import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Repo} from "./repo";
import {Group, User} from "aws-cdk-lib/aws-iam";

export interface CodecommitFromMirrorStackProps extends StackProps {
    readonly repoName: [string];
}

export class CodecommitFromMirrorStack extends Stack {
    constructor(scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) {
        super(scope, id, props);
        const repos = props?.repoName.map(repoName => new Repo(this, `repository`, {repoName}));
        const group = new Group(this, `Pusher`);
        const user = new User(this, `User`);
        group.addUser(user);
    }
}
