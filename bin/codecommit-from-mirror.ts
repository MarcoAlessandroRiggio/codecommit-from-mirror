#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CodecommitFromMirrorStack, CodecommitFromMirrorStackProps} from '../lib/codecommit-from-mirror-stack';
import container from "../lib/config/ioc_config";
import {Construct} from "constructs";
import SERVICE_IDENTIFIER from "../lib/constants/identifiers";

const app = new cdk.App();
let stackService = container
    .get<(scope: Construct, id: string, props?: CodecommitFromMirrorStackProps) => CodecommitFromMirrorStack>(SERVICE_IDENTIFIER.STACK);
const stack = stackService(app, "MyTestStack", {repoNames: ["test"]});
