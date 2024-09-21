import React from "react";
import ReactDOM from "react-dom";

const App = () => {
	return (
		<div>
			<h1>NoCookiePlease</h1>
			<p>Automatically decline non-essential cookies!</p>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("popup"));
