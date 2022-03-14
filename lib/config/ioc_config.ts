import "reflect-metadata";
import {Container, interfaces} from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import {Construct} from "constructs";
import {CodecommitFromMirrorStack, CodecommitFromMirrorStackProps} from "../codecommit-from-mirror-stack";
import {Repo} from "../repo";
import {Service} from "../interfaces/service";
import {RepoProps, RepoService} from "../entities/repo-service";

const container = new Container();

container
    .bind<Service<Repo, RepoProps>>(SERVICE_IDENTIFIER.REPO_SERVICE)
    .to(RepoService);
container
    .bind<(scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) => CodecommitFromMirrorStack>(SERVICE_IDENTIFIER.STACK)
    .toFactory<CodecommitFromMirrorStack>((context: interfaces.Context) => {
        return (scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) => {
            const repoService = context.container.get<Service<Repo, RepoProps>>(SERVICE_IDENTIFIER.REPO_SERVICE)
            return new CodecommitFromMirrorStack(repoService, scope, id, props);
        }
    });

export default container;
