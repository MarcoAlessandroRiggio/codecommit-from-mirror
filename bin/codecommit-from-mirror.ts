#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodecommitFromMirrorStack } from '../lib/codecommit-from-mirror-stack';

const app = new cdk.App();
new CodecommitFromMirrorStack(app, 'CodecommitFromMirrorStack', {repoName: ["test"]});