# @fiquu/slseed-web-app

Serveless Seed Web App project with [Vue](https://vuejs.org), [Fomantic UI](https://fomantic-ui.com), [AWS Amplify](https://aws.amazon.com/amplify/), automated setup and deploy with [AWS CloudFormation](https://aws.amazon.com/cloudformation/), [Amazon S3](https://aws.amazon.com/s3/), [Amazon CloudFront](https://aws.amazon.com/cloudfront/) and some other goodies.

## Description

This project aims to provide a template with sensible defaults and structure, using a set of technologies that ease development and improve usability with a strong focus on providing a secure and great end-user experience.

This seed or boilerplate does not ties you to any particular stack or backend, it just provides a comprehensive structure that you can use to connect to any endpoint you choose to as you can easily replace the default AWS Amplify Auth and API Client with any other module of your choosing (e.g., [Axios](https://github.com/axios/axios), [Vue Apollo Client](https://hasura.io/learn/graphql/vue/apollo-client/)). Adding or removing plugins is just as easy.

The folder structure is intended for scalability into even very large applications in an intuitive and predictable way.

## Technologies

### Amazon Web Services

[AWS](https://aws.amazon.com) provides great services at great prices, most of them have free tiers that you may never fully use. This way, you can have an account for your each stage of your project (ideally created with [AWS Organziations](https://aws.amazon.com/organizations)) so you don't use the free tier of your main account (`.env.production.local`) while developing on local (`.env.local.local`), developing on the cloud (`.env.development.local`), testing (`.env.testing.local`) or validating (`.env.staging.local`).

### Vue

[Vue](https://vuejs.org) allows you to work the way you feel most comfortable as it's very reliable and flexible with great scaling. The community is awesome and growing every day.

Here you can learn how it compares to other frameworks: https://vuejs.org/v2/guide/comparison.html.

### TypeScript

[TypeScript](https://www.typescriptlang.org) is a JavaScript superset that allows you to reduce type errors while writing your code and can also help you provide code completion, parameter info, quick info and member lists (AKA [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense)) for any component, plugin or module so you may have a simplified development experience.

It's worth noting that it may get in your way sometimes but it may be that you just need to rethink you code.

### Fomantic UI

[Fomantic UI](https://fomantic-ui.com) is a modern and up-to-date fork of [Semantic UI](https://semantic-ui.com) with some new additions like [Toast](https://fomantic-ui.com/modules/toast.html) and [Emoji](https://fomantic-ui.com/elements/emoji.html) that make it very robust and useful.

**NOTE:** It needs [JQuery](https://jquery.com) for now but Vue integration is coming on [V3](https://github.com/fomantic/Fomantic-UI/blob/master/ROADMAP.md).

## Getting started

Most of these steps apply to any project, but we're assuming you'll also be using [Slseed Web API](https://github.com/fiquu/slseed-web-api) for your backend.

**Important:** You may need to configure the [Slseed Web API](https://github.com/fiquu/slseed-web-api) project first to get the [AWS Cognito](https://aws.amazon.com/cognito/) values. If you don't need that, then you can just add a [Cognito User Pool](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html) into the app's CloudFormation stack template.

1. Configure your AWS profiles on `configs/aws.js` for each stage.
1. Run `npm i` and update as needed.
1. Set the input values to use on the CloudFormation template on `configs/stack/values.js`.
1. Configure your CloudFormation template on the `configs/stack/template/` folder.
1. Run `npm run setup` and select `stack` (or `npm run setup:stack`), select stage and enter the template values.
1. Wait for it to finish (it may take a while)...
1. Configure your [AWS Systems Manager](https://aws.amazon.com/systems-manager/) parameters to `.env` values on `configs/ssm-env.js`. These are the SSM parameter names only as the prefix is taken from the `.slseedrc.js` file and from the `package.json` `name` and `title` properties by default.
1. Run `npm run setup` and select `env` (or `npm run setup:env`) and select stage to set your `.env.{stage}.local` file.
1. Run `npm run semantic` to build and watch (or `npm run semantic:build` to just build) the Fomantic UI files.
1. Run `npm start`.

That's it. Your App should be running wherever it says it's running.

See the `"scripts"` section on the `package.json` for more commands.

## Deploying

### Manual

1. Make sure you have the `.env` file for the stage you want to deploy by running `npm run setup:env`, selecting the stage and checking if the `.env.{stage}.local` exists.
1. Run `npm version patch|minor|major` accordingly to make sure you're deploying a new version.
1. Run `npm run deploy`, select stage and follow the prompts.

### CI/CD

1. Add your AWS credentials environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION`).
1. Add the env setup script: `npm run setup:env -- --stage <stage> --useAwsProfiles false`.
1. Run the deploy script: `npm run deploy -- --useAwsProfiles false --autoDeploy true --stage <stage>`.

- The `stage` flag must match the stage names in your project (`development`, `staging`, etc.).
- The `useAwsProfiles` disables the configuration of an AWS profile thus using the env vars.
- The `autoDeploy` flag skips all deploy prompts and doing the following by default:
  - Builds distributable files.
  - Checks for deployed version and aborting if already deployed.
  - Pruning old versions and keeping the last 3.

## Using as seed

1. Create a repo.
1. Add remote as slseed:
    - `git remote add slseed git@github.com:fiquu/slseed-web-app.git`
1. Disable pushing (!):
    - `git remote set-url --push slseed DISABLED`
1. Fetch the latest changes:
    - `git fetch slseed`
1. Merge the master into your branch:
    - `git merge slseed/master --allow-unrelated-histories`

Repeat the last 2 steps to update your repo with the latest changes from this one:

`git fetch slseed && git merge slseed/master --allow-unrelated-histories`

And have fun resolving conflicts! :D

# Recommended Tools

- **Icons:** https://realfavicongenerator.net/
- **Image Optimization:** https://squoosh.app/
- **SVG Optimization:** https://jakearchibald.github.io/svgomg/
