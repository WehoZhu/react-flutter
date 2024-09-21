import React from 'react';
import Button from './components/Button';
import Row from './components/Row';
import Text from './components/Text';
import Spacer from './components/Spacer';

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

interface AppState {
  clickCnt: number;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clickCnt: 0,
    };
  }

  increaseCnt = () => {
    console.log('clicked');
    this.setState(prevState => ({
      clickCnt: prevState.clickCnt + 1,
    }));
  };

  render(): React.ReactNode {
    return (
      <Row>
        <Spacer width={32} />
        <Button label='Click me~' onClick={this.increaseCnt} />
        <Spacer width={12} />
        <Text label={`Clicked ${this.state.clickCnt} times`} />
      </Row>
    );
  }
}

