import React from "react"
import ReactDOM from "react-dom"

import * as serviceWorker from "./serviceWorker"
import "semantic-ui-css/semantic.min.css"

import "./styles/index.scss"
import App from "./components/App"

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister()