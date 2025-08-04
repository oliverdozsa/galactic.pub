# Galactic Pub
This is the client part of [Galactic Pub](https://galactic.pub).
The server is found [here](https://github.com/oliverdozsa/galactic.host)
Includes the following sub-projects.

## Voting
A privacy first voting platform powered by blockchain technology. Inspired by [stellot](https://github.com/stanbar/stellot).
Work-in-progress.

### How does it work?
#### Casting a vote
It's based on [blind signatures](https://en.wikipedia.org/wiki/Blind_signature#Blind_RSA_signatures).
1. The voter first authenticates with server. In order to get a vote token anonymously, it creates a concealed request, which contains information
   about the voter's account where the vote token should be delivered.
2. The concealed request will be sent to the server for signing
3. From the signature on the concealed request voter creates the signature for the revealed request.
4. Voter becomes anonymous, and sends the revealed signature, and request to the server.
5. The server checks the revealed signature, so that it knows the anonymous voter is a participant of the voting in question.
6. Server sends back the transaction so that voter can obtain the vote token.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
