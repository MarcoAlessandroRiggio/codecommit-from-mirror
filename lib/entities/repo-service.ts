import {Repo} from "../repo";
import "reflect-metadata";
import {Service} from "../interfaces/service";
import {injectable} from "inversify";
import {Construct} from "constructs";


export interface RepoProps {
    readonly repoName: string;
}

@injectable()
export class RepoService implements Service<Repo, RepoProps> {

    createInstance(scope: Construct, id: string, props: RepoProps): Repo {
        return new Repo(scope, id, props);
    }

}
