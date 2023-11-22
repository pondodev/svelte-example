# svelte example
a little exploration into svelte, to help me (and hopefully others!) see how it can be used to create complex
applications through simple examples.

## a little bit of background i suppose
so i had to learn react for work some time ago, and i got frustrated very quickly with it for many reasons (an opinion
that i later learned isn't actually that uncommon). i don't really care to get into too much of the _why_ here, but i
do want to mention at least the things that drew me to svelte:

- it's dead simple, with anyone who's just learned html + css + js being able to pick up and play with it right away (in
  theory)
- it's very unopinionated about how you approach most problems
- it still has most of the core functionality that you'd want from a front end framework (value binding, component
  system, partial DOM rendering, etc)

react was getting harder and harder to work with over time, and i got sick of it. that's why this repo exists.

i'm still very much learning svelte, and as i figure out some more things i'll add them to this repo.

## running everything
if you're already experienced with this stuff, then here's the necessary commands:

- from directory `example-app` run `npm run dev -- --open`
- from directory `example-server` run `flask --app http_server --port 8000`

if you don't know what the above means, then read ahead.

this is a full stack application, with svelte for the front end and flask for the back end. make sure that you have
[nodejs](https://nodejs.org/en/), [python 3](https://www.python.org/), and
[pip](https://packaging.python.org/en/latest/tutorials/installing-packages/) installed before continuing.

to get the svelte app running, `cd` into `example-app` and run `npm install` to pull down all the dependencies. then run
`npm run dev -- --open` to start serving the svelte app and open it in your browser.

to get the http server running, `cd` into `example-server` and run `pip3 install -r requirements.txt`. then you should
just be able to run `flask --app http_server run --port 8000` and the server will start handling http requests on
`http://localhost:8000`.

