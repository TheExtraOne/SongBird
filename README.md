# SongBird
The final task of the 1st stage of the RSS

1) Working with data, 
2) Writing a quiz algorithm (with random questions, correct scoring (each incorrect attempt = -1 point from the maximum points for the question), locking and unlocking interface elements depending on the answer, visual and audible marking of correct and incorrect answers), 
3) Creating a custom audio player (pause/play, rewinding, volume control, display length of track and played time),
4) Implementing an ability to change the language of the site (ENG/RU) and store your choice in the localStorage.

What can be improved: 
1) The player could be a class (OOP). I realized this too late, when the need to create a gallery of cards was added to the task, each of which had to have an independent player.
2) We were given data in the .js format. For me, it seems better to get a .json file from AJAX(fetch)
