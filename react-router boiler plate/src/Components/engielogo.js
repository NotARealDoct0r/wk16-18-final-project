// imported React + 'with(color)border' component to wrap a local image 
import React from 'react';
import withGreenBorder from './withGreenBorder';
import LogoImage from './ENGIE logo.png';

// customized how it is displayed
const EngieLogo = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-end' }}>
            <img style={{ width: '200px', height: 'auto' }} src={LogoImage} alt="Logo" />
        </div>
    );
}

export default withGreenBorder(EngieLogo);