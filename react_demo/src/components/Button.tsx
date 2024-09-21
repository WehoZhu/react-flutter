import React from 'react';

class Button extends React.Component<{ label: string; onClick: () => void }> {
  render() {
    // @ts-ignore
    return <rn-button props={this.props} />;
  }
}

export default Button;
