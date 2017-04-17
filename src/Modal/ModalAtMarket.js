import React from 'react';

export function ModalAtMarket(props) {

    const getOverlayStyle = () => {
        return {
            width: '280px',
            height: '480px',
            backgroundColor: 'black',
            opacity: '0.8',
            zIndex: '10',
            position: 'absolute',
            top: '0px',
            left: '0px',
        }
    }

    const getModalStyle = () => {
        return {
            width: '140px',
            height: 'auto',
            zIndex: '11',
            backgroundColor: 'white',
            opacity: '1.0',
            borderRadius: '10px',
            padding: '10px',
            position: 'absolute',
            top: '20px',
            left: '60px',
        }
    }

    const getModalContent = () => {
        return (
            <span>Market Reached</span>
        )
    }

    return (
        <div style={getOverlayStyle()} >
            <div style={getModalStyle()} >
                {getModalContent()}
            </div>
        </div>
    );
}
