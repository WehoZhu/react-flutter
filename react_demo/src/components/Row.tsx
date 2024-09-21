import React from 'react';

class Row extends React.Component {

    render() {
        // @ts-ignore
        const { children, ...otherProps } = this.props;
        return (
            // @ts-ignore
            <rn-row props={otherProps}> {children} </rn-row>
        );
    }
}

export default Row;
