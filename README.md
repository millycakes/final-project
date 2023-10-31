# Checkmate

## Overview
There are so many language learning apps on the market, but there aren't a lot that help you learn languages through human-to-human contact outside of tutoring apps. Learn With Me is a web app that connects two users together who each speak a language that the other wants to learn. Users create an account, selecting the language(s) they are proficient in and language(s) they are interested in learning, and Learn With Me will match them with their new study partners. Users can then send direct messages to their study partners through Learn With Me! Outside of one-on-one conversations, users can also post about struggles they're facing when learning their new langauge to everyone, and others can comment on the posts with their own insights.

## Team
I am working on this project with my friend Jenna Han (jennahan@nyu.edu).

## Data Model
The application will store Users and Challenges

* users can have multiple challenges (via references), sorted between previous challenges and current challenges

(__TODO__: sample documents)

An Example User:

```javascript
{
  username: "emily<3jenna",
  hash: // a password hash,
  email: "ilovehamilton@gmail.com",
  number: "1110001111",
  photo: //optional profile photo,
  preferences: {kind:["Fitness", "Diet"], experience: "none", focus: "motivation"},
  prev_challenges: //an array of references to Challenges documents,
  curr_challengs: //an array of references to Challenges documents,
  challengePhotos: //an array of photos for the challenge,            //check this with professor
}
```

An Example Challenge:

```javascript
{
  title: "Wake Up",
  duration: [new Date("2023-10-30"), new Date("2023-11-30")],
  challengePhotos: //an array of photos for the challenge,
  completed: false
}
```

## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

* (2 points) Integrate user authentication
    * We're going to be using passport for user authentication
* (3 points) Recommendation Algorithm
    * We're going to be implementing a recommendation algorithm that recommends to the user challenges based on their survey preferences
* (3 points) React Native
    * We will be learning React Native (and potentially Firebase) to create the frontend and store users and challenges

## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used


