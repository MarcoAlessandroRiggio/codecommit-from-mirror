const SERVICE_IDENTIFIER = {
    REPO_SERVICE: Symbol.for("RepoServiceImpl"),
    STACK: Symbol.for("CodecommitFromMirrorStack")
};

const CFN = {
    CODECOMMIT_REPOSITORY: `AWS::CodeCommit::Repository`,
    IAM_GROUP: `AWS::IAM::Group`,
    IAM_USER: `AWS::IAM::User`
}
export default SERVICE_IDENTIFIER;

export {CFN}
