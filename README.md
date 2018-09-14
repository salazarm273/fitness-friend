fitness-friend
# Features
* Registering
  * users can create a profile on the website so all their info can be stored.
  * screens needed: Signup

* Logging in
  * users can login so they can save and access their information.
  * screens needed: Login

* Viewing and Joining Challenges
  * users can look at available challenges (ex, run 100 miles in x amount of days) and join as many as they want to. If they complete the challenge, they get a notification and the number of challenges completed on their profile goes up.
  * screens needed: General Challenges, Specific Challenge

* Viewing and Editing Profile
  * users can view all their profile information and can hit a button to change their profile picture or hit a button to edit the rest of their profile, where they can then type in any different information they want.
  * screens needed: Profile screen, Change Pic screen, Edit Profile screen

* Log Food
  * Users can add food items they eat along with calorie information and these items will be saved in their food log.
  * screens needed: Food Log, Add Food, View Food History, Past Food Log

* Calorie Counter
  * An ideal daily calorie intake will be given to the user based on some profile information, but it can be manually changed. The calories the user’s eaten that day, along with the calories they’ve worked off through exercise will be used to calculate how many calories above/under they are compared to their current goal.
  * screens needed: Food Log, Change Calories, Past Food log

* Track Activities
  * users can log their physical activities and see how many calories they’ve burned and view their past activities.
  * screens needed: Activity Log, Add Activity, Activity History

* Track Weight
  * users can add their current weight and track how their weight changes over time.
  * screens needed: Weight Log, Add Weight

* Read Articles
  * users can read health  * based articles (ex, Everything You Need to Know about the Newest Superfood) published by the website.
  * screens needed: News, News Article

* Receive Notifications
  * users can receive and view notifications about challenges and friend requests.
  * screens needed: Notifications

* Contact
  * users can submit a message to whoever is managing the website.
  * screens needed: Contact

* Adding Friends
  * users can add friends by their usernames.
  * screens needed: Friend Finder

* Viewing Friends’ Activities and Updates
  * users can see a page telling them recent activities from their friends and any updates their friends have shared.
  * screens needed: Friend Feed

* Sharing Updates
  * users can share with their friends a text update.
  * screens needed: Friend Feed

# Screens
* About
  * will display information about how healthy living is important and talk about the purpose of the website. Will also have a link to the login screen and the signup screen, both of which can also be accessed at anytime through the top nav bar.

* Signup
  * if the user is not currently logged in, it will be a form with fields that the user can fill out and submit. The fields will be a username, password, email, age, weight, gender, bio, optional goal weight, and optional profile pic.
  * if the user is currently signed in, a message will display telling them they already have an account and there will be buttons, so they could choose to logout, go to their profile, or go to their friend feed.
  * features provided: Registering

* Login
  * if not currently logged in, a welcome message will display, and the user can enter a username and password in, and if they link to an account, they will be logged in, else, they will get a message that their login info is incorrect.
  * if the user is currently logged in, a message will display telling them they already are logged in and there will be buttons, so they could choose to logout, go to their profile, or go to their friend feed.
  * features provided: Logging in

* General Challenge
  * A list of challenges will be displayed, each with a brief description. Clicking on any challenge will bring the user to that challenge’s page.
  * features provided: Viewing Challenges

* Specific Challenge
  * the name of the challenge and all the challenge’s information, including dates and how many users are already trying that challenge, will be displayed. A button will let the user join the challenge.
  * features provided: Joining Challenges

* Profile
  * the user’s profile pic, bio, and basic information about them will be displayed. Buttons to change profile pic or edit profile will be displayed.
  * features provided: View Profile

* Change Pic
  * the current profile picture will be displayed, and a form to upload a file for a new profile picture will be displayed.
  * features provided: Edit Profile

* Edit Profile
  * the user’s current information will be prefilled into a form that they can edit and then submit after entering their password again.
  * features provided: Edit Profile

* Food Log
  * will display the date and a food diary for the day, as well as bars for each day of the current week showing the net amount of calories consumed for that day out of the goal amount of calories. There will be a button to add an item, and to view food history. If the user clicks on a question mark near their daily calories goal they’ll be taken to the change calories page.
  * features provided: Log Food

* Add Food
  * will be a form where the user can add a food item, choose what meal/snack it is, and type in how many calories it is.
  * features provided: Log Food

* View Food History
  * will have buttons with date ranges on them, each button representing a different week, so the user can click a button and go to that week’s food log.
  * features provided: Log Food

* Past Food Log
  * will display the dates of the week being looked at, as well as seven bars, one for each day of the week, showing the net calories consumed against the goal. Clicking on any day will display the food log for that day.
  * features provided: Log Food, Calorie Counter

* Change Calories
  * will give a blurb on how the ideal calorie amount is calculated, and the importance of eating healthy, and will have a form where the user can change their daily calorie goal, giving warnings when the calorie goal is below a recommended amount.
  * features provided: Calorie Counter

* Activity Log
  * will display the current date and then display a list of the activities done today, if any. For each activity, it displays the name of the activity, the time duration, the amount of calories burned, and possibly the distance. There is a button to add an activity, and a button to view activity history.
  * features provided: Track Activities

* Add Activity
  * will display a form where the user can input the name of the activity, the time they did it for, and optionally the distance they went. The calories burned will then be calculated and it will be added to their activity log.
  * features provided: Track Activities

* Activity History
  * will display different dates, which when clicked on display the activity log for that day.
  * features provided: Track Activities

* Weight Log
  * will display a line graph with the y axis as weight and the x axis as dates from one week ago to the current date. The graph will be filled out if any information has been logged. There will be a button to add a weight and, on the bottom, will be four buttons to change the range of the graph from a week, a month, a year, or forever.
  * features provided: Track Weight

* Add Weight
  * a user will enter the date and their weight, and it will be added to their weight log.
  * features provided: Track Weight

* News
  * will display a list of article heading’s along with a small picture and brief description of each article. Clicking on the article name will take the user to that article’s page.
  * features provided: Read Articles

* News Article
  * will display a health  * based article that the user can read.
  * features provided: Read Articles

* Notifications
  * will display any notifications about challenges or friend requests. The user can hit okay on a challenge notification and it will vanish. For each friend request, there will be a button that says add and a button that says don’t add.
  * features provided: Receive Notifications

* Contact
  * will display a form that users can fill out with their email address and a message.
  * features provided: Contact

* Friend Finder
  * will display a form where the user can type in the username of a friend and hit a lookup button. Then the user will either be told that the username does not exist or will be given that user’s profile picture and asked if they want to add them as a friend. There will be a button to add them, which sends a request to that user, and a button to cancel. 
  * features provided: Adding Friends

* Friend Feed
  * will have a button at the top to add an update, which then opens a form where the user can write their update. There will also be a button near the top right to add a friend. If the user has no friends, the friend feed will ask them if they want to add friends. If they have friends, the friend feed will show the latest activities and updates from their friends.
  * features provided: Viewing Friends’ Activities and Updates, Sharing Updates
