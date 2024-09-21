import React from 'react';

type SpacerProps = 
  | { width: number; height?: number }
  | { width?: number; height: number }; 

class Spacer extends React.Component<SpacerProps> {
  render() {
    // @ts-ignore
    return <rn-spacer props={this.props} />;
  }
}

export default Spacer;
