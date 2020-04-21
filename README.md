## Mars weather insight

Mars weather insight app.

![screenshot](https://i.imgur.com/DaQN7mG.png)

## Demo

[https://adrianapan.github.io/mars-weather-insight](https://adrianapan.github.io/mars-weather-insight)

## Installation

### Local

1. Clone the repository
2. Run `npm install`
3. Generate a NASA API key: [https://api.nasa.gov](https://api.nasa.gov)
3. Create a `.env` file in the root directory with the following information

```
REACT_APP_API_URL=your_nasa_api_key_here
```

4. Run the app with `npm start`

### Deployment

1. Create a production build with `npm run build`
2. For Node based environments:

- Using serve:

```
npm install -g serve
serve -s build
```

- Using Express:

```
npm install express
node server.js
```

## Changelog

### v0.1.0

* First stable release

## Credits

* Artwork: [https://www.vecteezy.com](https://www.vecteezy.com)
* Icons: [https://www.flaticon.com](https://www.flaticon.com)
* Intro: [https://github.com/adolfintel/warpspeed](https://github.com/adolfintel/warpspeed)