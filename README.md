# discord-clone
**discord-clone** is a clone of [Discord](https://discord.com), a chatting platform that allows users to share messages and media privately or in servers. **discord-clone** aims to replicate those features both on the front and backend.

## Live site
[Open discord-clone](https://fxuls-discord-clone.herokuapp.com)

## Technologies used
### Frontend
* Javascript
* React
* Redux
* FontAwesome
### Backend
* PostgreSQL
* Python
* Flask
* SQLAlchemy
* SocketIO

## Getting started
1. Clone the repository 
```
git clone https://github.com/fxuls/discord-clone.git
```

2. Install python dependencies
```
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example provided

4. Setup your PostgreSQL credentials and database according to the variables set in .env

5. Active your pipenv then run the following command to open shell
```
pipenv shell
```

6. Migrate the database
```
flask db upgrade
```

7. Seed the database
```
flask seed all
```

8. Run the flask app
```
flask run
```

9. Navigate to `react-app`

10. Install dependencies
```
npm install
```

11. Start the frontend server
```
npm start
```

The application will now be running at http://localhost:3000/

## Features
### Friends
#### <img width="545" alt="image" src="https://user-images.githubusercontent.com/32501694/184978877-067ac2ee-337b-449c-aee9-19fe66a70d28.png">
* Open a direct message with a friend
* Remove a friend

#### <img width="545" alt="image" src="https://user-images.githubusercontent.com/32501694/184980530-ff7e1fb5-dda6-4181-bdf0-6e302e17064c.png">
* Accept or deny incoming friend requests
* Cancel sent friend request

#### <img width="545" alt="image" src="https://user-images.githubusercontent.com/32501694/184980388-3117bfd3-76aa-4974-a3ef-ddad650159d8.png">
* Send friend requests by username


### Direct Messages
#### <img width="545" alt="image" src="https://user-images.githubusercontent.com/32501694/184991987-6fab0ac9-1942-4ed5-8814-bba36ab324ed.png">
* View and send messages between you and another user
* Delete or edit messages that you have sent
