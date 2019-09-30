/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';

import Trigger from '../src/point';
import 'rc-trigger/assets/index.less';
import './point.less';

const builtinPlacements = {
  topLeft: {
    points: ['tl', 'tl'],
  },
};

function InnerTrigger({ onClose }) {
  return (
    <ClickOutside onClickOutside={onClose}>
      <div
        style={{ padding: 20, background: 'rgba(0, 255, 0, 0.3)' }}
      >
        This is popup
      </div>
    </ClickOutside>
  );
}

class Test extends React.Component {
  state = {
    action: 'contextMenu',
    showPopup: false,
    piont: {},
  }

  handleCtxMenu = (e) => {
    e.preventDefault();
    this.setState({
      showPopup: true,
      point: {
        pageX: e.pageX,
        pageY: e.pageY,
      },
    });
  }

  handleClose = () => {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const { action } = this.state;

    return (
      <div>
        <div
          style={{
            border: '1px solid red',
            padding: '100px 0',
            textAlign: 'center',
          }}
          onContextMenu={this.handleCtxMenu}
        >
          Interactive region
        </div>


        <div style={{ margin: 50 }}>
          <Trigger
            popupPlacement="topLeft"
            popupVisible={this.state.showPopup}
            action={[action]}
            popupAlign={{
              overflow: {
                adjustX: 1,
                adjustY: 1,
              },
            }}
            point={this.state.point}
            popupClassName="point-popup"
            builtinPlacements={builtinPlacements}
            popup={(
              <InnerTrigger
                onClose={this.handleClose}
              />
            )}
            alignPoint
          />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Test />, document.getElementById('__react-content'));
