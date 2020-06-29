# ip-info-ui

This project was built with create-react-app. It's a simple web app that takes an IP Address and display various bits of info about it using GeoIp and Whois data.

The cloud resources for this project were created using Terraform. The configuration for that can be seen in [main.tf](main.tf).

When deployed, this application is served out of an S3 bucket with a CloudFront distribution sitting in front of it.

The corresponding serverless backend for this project can be seen [here](https://github.com/grantmcd/ip-info-api).

## CI

This project uses Github Action Workflows to automatically run tests on pushes to develop and PRs to master.

Pushes to master trigger a build of the project, deployment to an S3 bucket, and a CloudFront cache invalidation.

The secrets needed for deployments are stored as Github repo secrets.

This project is also set up with Dependabot to allow automated dependency update PRs.

## Linting

This project uses a husky precommit hook to properly format the staged code.

## Future Improvements

If I continued to work on this here's a short list of some things I'd want to add:

- Dark Theme :)
- Enable the service worker and enable precaching, PWA support
- Improve tests w/ service mocking
  - Currently they're only barebones Jest snapshot tests
- Debug the webgl globe. It doesn't load consistently for some reason.
