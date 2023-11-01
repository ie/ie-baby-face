<!-- <p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p> -->
<h1 align="center">
  IE BabyFace
</h1>

IE BabyFace website has been created from the gatsby starter for use with Netlify and Firebase for hosting.

The BabyFace site is basically ready to be build each year once the data, images, and game dates are updated and the hosting is configured.

Two primary steps are:

1. Update the code and site.
2. Create and deploy site to new hosting.
   
To update the BabyFace app one must do the following:

## Site Update
1. Login/signup for a Firebase account at Firebase.com
  1. Create a project (I suggest a matching name i.e. baby-face-[yyyy]
  2. Once setup Add a web app and use NPM.
  3. Copy the firebaseConfig code and place in the `./src/config/firebase.js`
  4. Create a Firestore database with a similar (or exact name).
     - Once configured update the `./src/config/firebase.js` with the property `databaserURL: 'https://[name of the database].firebaseio.com'`
2. Upload new photos of each participant into the images file
3. Modify the photos.json with
   - The full name of the participant
   - The file name of the photo of the participant
4. Navigate to the `/sync` page via browser to update the database with the photo's. (Only run once or you'll end up with them in twice, can easily delete them in firestore however)
5. Create a `.env.development` file with values below for start and end dates of comp. Otherwise it should default to run over November of current year
6. Finally, edit the date string on `./src/pages/index.js:30` so that it matches current year

## Hosting

The BabyFace site has been hosted Netlify or Vercel and the steps to setup are quite straighforward.

1. Go to Netlify and signup with an account
2. Select `Add new site` and `Import from existing project`
3. Select `Deploy with GitHub`
   1. You will need to Authenticate to your IE github connected account and select this repo
   2. Follow all of the recommended Build settings
   3. Click deploy site
4. Proceed to Site Configuration and `Change site name`
   - Recommended site name is `baby-face-[yyyy]`
  
      

<!--
## 💫 Deploy

Each year We can update 

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
-->
