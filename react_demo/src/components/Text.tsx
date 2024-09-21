import React from 'react';

class Text extends React.Component<{ label: string; }> {
  render() {
    // @ts-ignore
    return <rn-text props={this.props} />;
  }
}

export default Text;
