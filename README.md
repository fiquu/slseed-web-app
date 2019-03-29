# Fi Slseed App

Serveless Seed Web App project.

## Getting started

1. Run `npm i`.
1. Run `npm run setup`, select `stack`, select stage and define stack values.
1. Wait for it to finish...
1. Run `npm run setup`, select `env` and select stage.
1. Run `npm start`.

That's it. Your App should be running wherever it says it's running.

## Deploying

1. Make sure you have the `.env` file for the stage you want to deploy by running `npm run setup`, selecting the stage and checking if the `.env.[stage]` exists.
1. Run `npm run build` to generate the dist files.
1. Run `npm run deploy` and select stage.

## Using as seed

1. Create a repo.
1. Add remote as slseed:
    - `git remote add slseed git@github.com:FinalDevStudio/fi-slseed-app.git`
1. Disable pushing:
    - `git remote set-url --push slseed DISABLED`
1. Fetch the latest changes:
    - `git fetch slseed`
1. Merge the master into your branch:
    - `git merge slseed/master`

Repeat the last 2 steps to update your repo with the latest changes from this one:

`git fetch slseed && git merge slseed/master`

And have fun resolving conflicts!

# Favicons and App Icons

All icons were generated with https://realfavicongenerator.net/.
