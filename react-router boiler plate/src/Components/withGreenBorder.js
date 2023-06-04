import React, { Component } from "react";

// created a newly learned component to demonstrate + wrap an image
const withGreenBorder = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                // centered the component + customized the display
                <center>
                <br/><div style={{ border: "3px solid green", width: "205px", height: "auto" }}>
                    <WrappedComponent />
                </div>
                </center>
            );
        }
    }
}

export default withGreenBorder;