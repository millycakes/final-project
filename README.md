# Checkmate

## Overview
I frequently see my friends diligently working on their assignments and achieving their academic goals. However, I also see the same friends (and myself) pushing back personal goals like going to the gym, cooking more often, or spending less money.

Checkmate is a habit tracker app that helps users, especially college students, reach their personal goals as effectively as their academic goals by enforcing social and structural accountability. Users can join habit-building challenges and bet money on themselves. For the duration of the challenge, they will have to upload a photo of themselves completing the challenge as proof of completion. If they complete the goal they set for themselves, they win a small monetary prize. If they fail to achieve their goal, they lose a percentage of the money they bet.

## Team
I am working on this project with my friend Jenna Han (jennahan@nyu.edu).

## Data Model
The application will store Users and Challenges

* users can have multiple challenges (via references), sorted between previous challenges and current challenges

An Example User:

```javascript
{
  username: "jenna<3jenna",
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

## Key Screens

### Set goals and get held accountable
- Customized feed of challenges based on your goals and experience
- Snap a photo of you working on your goal by a set deadline as proof of completion
- Your proof of completion will be visible to others working on the same challenge

![IMG_7478](https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-millycakes/assets/105938846/8a230f20-3143-4c10-8678-1534b3265743)

### Bet money on yourself and earn monetary prizes
- It’s like a swear jar!
- Deposit money. You’ll earn a prize if you complete your goal and lose a part of your deposit if you fail to
- Redeem prize money for fun gift cards

![IMG_2516](https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-millycakes/assets/105938846/cb804bdd-780b-4ef8-a538-7624fd40c536)

### Join the community and spread support
- View other goal-getters’ proof of completion and hold them accountable
- Send support with reactions
- Track your progress compared to other group members

![IMG_9846](https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-millycakes/assets/105938846/d1c8d479-2995-4a9b-9809-8c9a722d75f2)

### All screens
View all screens on

![IMG_5522](https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-millycakes/assets/105938846/8fd43f66-8792-4e5e-9072-1e01b54fbf04)

## Site map

You can test out the prototype [here](https://www.figma.com/proto/895qnnItxZDRUSWQtnc2pR/CheckMate?page-id=340%3A5213&type=design&node-id=388-4889&viewport=401%2C-2535%2C0.51&t=I7VivEIM5ZO5Hf6y-1&scaling=scale-down&starting-point-node-id=388%3A4889&mode=design)

## User Stories or Use Cases

![IMG_8409](https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-millycakes/assets/105938846/9ad0c4a8-f00b-40a4-8f71-4cfbf492868b)


## Research Topics

* (3 points) Integrate user authentication
    * We're going to be using passport for user authentication. We will be using it for both normal email and password login and other login options
    like Google login.
    * When testing out the app, you can either create your own account or use a test user account that will be provided here: ****
* (3 points) Recommendation Algorithm
    * We're going to be implementing a recommendation algorithm that recommends to the user challenges based on their survey preferences. We're not sure how complex we want it to be yet (and whether or not AI will be used in the recommendation). The number of points assigned here might be adjusted later on based on how complex the algorithm is.
* (2 points) React Native
    * We will be learning React Native (and potentially Firebase) to create the frontend and the storage database. While React and React Native share some similarities, it is still a completely different language. We also need to use React Native to provide support for iOS and Android. If we use Firebase, we will have to learn how to integrate it into the app and potentially learn how to use its cloud messaging systems.

## [Link to Initial Main Project File](app.mjs) 

## Annotations / References Used

