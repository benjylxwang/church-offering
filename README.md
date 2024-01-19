# Church Offering Form

The goal of this project is to set up a church offering form that can be statically hosted on the church website.
On filling out of the form, the numbers will be automatically summed up, the user will be shown the final totals, and then can download the PDF report generated.
The idea is that the user can then send the PDF to the appropriate person.

## To Run Locally

Prereqs:

- Node
- NPM

Running for development:

```
npm ci
npm start

```

Running optimized built version:

```
# Install a static server
npm i -g serve

npm run build
serve -s build
```
