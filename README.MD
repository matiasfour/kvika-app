# Kvika app

## Staging access

In order to access the staging app you need to do the following.
Make sure to have installed a dev client build on your phone

1. Open https://expo.dev/accounts/gislitg/projects/kvika-expo-app/branches/staging in your browser
2. Press the latest update
3. Press the preview button for the appropriate OS
4. Scan the QR code that appears on your screen
5. You should now see the Kvika app on your phone

## Development

### Running the app locally

1. Install the latest Node
2. Create an Expo account and let a team member invite you to the organisation
3. Install [Expo](https://expo.io/) - `npm install expo-cli --global`
4. `cd` into this project directory
5. Add `export NPM_TOKEN=value` with the value from 1Pass to your bash RC file (e.g. `~/.zshrc`) and restart the shell. Usually we would just login to NPM in our shell and not need to do this but our `.npmrc` file requires this as it's also used on EAS build servers and there it expects an NPM_TOKEN to be explicitly set.
6. `yarn`
7. Run `expo start`

### Flipper

Follow the instructions mentioned here https://docs.expo.dev/guides/using-flipper/.

You'll need to download the Flipper desktop app and set up a few libraries

## Firebase project

The firebase project that is required for push notifications to work is set up on the planner@gangverk.is gmail account. The google-services.json files are retrieved from there.

## Things to keep in mind when updating Expo versions

- As of this writing, the `react-native-skeleton-content` package has among its dependencies `react-native-reanimated` and `expo-linear-gradient`. It would be better if this was `peerDependencies` instead and I've asked them to move it https://github.com/alexZajac/react-native-skeleton-content/issues/80#issuecomment-1339109831. But, for now, we need to make sure to keep the versions of those packages in the `resolutions` part of `package.json` in sync with the versions themselves in `dependencies` above it. This makes sure we only have 1 proper version of those packages. If we don't do this, we have some issues with native builds.
  - So keep in mind to do this when updating Expo versions.
