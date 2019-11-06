import React from 'react';


export const SearchWidget: React.FC =  () => {
    return <div style={styles.container}>
        <h1>Where are we going?</h1>
        <div style={styles.label}>Pick-up Location</div>
    </div>
}

const styles = ({
    container: {
        padding: 20,
        backgroundColor: '#f3ce56'
    },
    label: {
        fontWeight: 400
    }
})