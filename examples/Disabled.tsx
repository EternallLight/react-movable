import * as React from 'react';
import { List, arrayMove } from '../src/index';

type TItems = { label: String; disabled?: boolean }[];

class Disabled extends React.Component<{}, { items: TItems }> {
  state = {
    items: [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
      { label: 'Item 4', disabled: true },
      { label: 'Item 5', disabled: true },
      { label: 'Item 6' }
    ]
  };
  render() {
    return (
      <div
        style={{
          maxWidth: '300px',
          margin: '0px auto',
          backgroundColor: '#F7F7F7',
          padding: '3em'
        }}
      >
        <List
          values={this.state.items}
          onChange={({ oldIndex, newIndex }) =>
            this.setState((prevState: { items: TItems }) => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            }))
          }
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => (
            <li
              {...props}
              style={{
                ...props.style,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged
                  ? 'grabbing'
                  : value.disabled
                  ? 'default'
                  : 'grab',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: value.disabled ? '#888' : '#333',
                borderRadius: '5px',
                outline: value.disabled ? 'none' : undefined,
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor:
                  isDragged || isSelected
                    ? '#EEE'
                    : value.disabled
                    ? '#EEE'
                    : '#FFF'
              }}
            >
              {value.label}
            </li>
          )}
        />
      </div>
    );
  }
}

export default Disabled;
