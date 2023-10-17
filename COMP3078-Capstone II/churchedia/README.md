# Requirement

In order to run the project, your computer needs to have these packages and environment installed and configured:
- [NodeJS](https://choosealicense.com/licenses/mit/) (version 14.5.3 and up)
- npm (version 6.14.9)
- [git](https://git-scm.com/downloads)

# How to set up the application
First, you need to clone the project to your local machine

```bash
git clone https://github.com/NamDo8467/churchedia.git
``` 
After succesfully cloning the project, switch to `development` branch:
```
git checkout development
```

Run the following commands to install all dependencies :

```bash
npm install
```

Run the command below command to start the project in development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Basic workflow
ATTENTION: right now login is already implemented, here is the credentials that you need to use to login.

Make sure to go to `/login` first when you first open the localhost

Username: testing@gmail.com

Password: 1234567

------


Every time you create a new branch from `development` , make sure to stay at `development` first
by doing:
```
git checkout development
```
 and then run the following command to update your `development` local branch:
```
git pull
```
Next, you will have to create another branch from `development` branch and start working on this branch. You can create a branch like:
```
git checkout -b bug/implement-login-page
```
Remember to always have the "bug/" in your branch name.

Once you finish your task and ready to push the code, run the following command (after you already run `git add` and `git commit` ):
```
git push -u origin <your-branch>
```

And then, go to the repository on GitHub and make a pull request to `development` branch. Make sure you also link your issue with the pull request like below

![image](https://user-images.githubusercontent.com/77046082/223806200-14447b36-921d-401f-becf-b36a6f4fe5f7.png)



# Learning Path (in the order specified)
### 1. NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [NextJS tutorial (highly recommended)](https://www.youtube.com/watch?v=MFuwkrseXVE)
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### 2. TailwindCSS
Resource:
[Official document](https://tailwindcss.com/docs/installation)

### 3. Redux (Redux Toolkit)
We'll also use Redux for state management. Here is some useful resources for your reference:
- [Redux important concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [Redux Toolkit official documentation](https://redux-toolkit.js.org/)
- [Redux Toolkit setup tutorial](https://dev.to/raaynaldo/redux-toolkit-setup-tutorial-5fjf)
- [Redux Youtube tutorial (highly recommended)](https://www.youtube.com/watch?v=bbkBuqC1rU4)

### 4. react-icons
To use icons, I have installed `react-icons` package. Please take a look at the following resource:
- [react-icons](https://react-icons.github.io/react-icons/)
