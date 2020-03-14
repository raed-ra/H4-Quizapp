# Homework-4

Features:

You can choose questions from 3 different categories.  Two categories download questions from another website(https://opentdb.com/) using API.
One category has the questions stored in a JSON file locally to the index.html file. 
Note: A lot more question category/topic can be added using the API used above. However whats put on the website is to show the capability of the application, more topics can be added.

It has a CSS loader that will not allow load the next page until the quesions are availabe from the internet.

When an answer is chosen all the other answers will become locked and user can't change answer.

On the last page after quiz is finished, If the username is not entered the save button will not be active for empty user name. Hence the user wont save his score if no name entered.

The leaderboard is sorted and  gets recorded in the local storage. If a high score qualifies to get in the top 5 the player that drops rank to 6 will be cut off from the leader board.

The questions with right and wrong answer will initiat a sound. However user can mute the game on the first page.
