import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement((props) => {
  const {
    value,
    position,
    handleChange
  } = props;
  return (
    <tr>
      <th>{position}</th>
      <th>{value.key}</th>
      <td>{value.name}</td>
      <td>
        <input
          name="locked"
          type="checkbox"
          aria-label="Checkbox for locked definition"
          onChange={e => handleChange(e, value.key)}
          checked={value.locked}
        />
      </td>
      <td>
        <select
          className="form-control"
          name="summary_index"
          value={value.summary_index}
          onChange={e => handleChange(e, value.key)}
        >
          <option value="0">Nenhum</option>
          <option value="1">Contador de linhas</option>
          <option value="2">Contador de linhas distintas</option>
          <option value="3">Media de valores</option>
          <option value="4">Soma de valores</option>
        </select>
      </td>
      <td>
        <input
          name="width"
          className="form-control"
          type="text"
          placeholder="Tamanho"
          value={value.width || ''}
          onChange={e => handleChange(e, value.key)}
        />
      </td>
      <td>
        <input
          name="hidden"
          type="checkbox"
          aria-label="Checkbox for hidden definition"
          onChange={e => handleChange(e, value.key)}
          checked={value.hidden}
        />
      </td>
    </tr>
  );
});

const SortableList = SortableContainer(({
  items, handleChange
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Order</th>
          <th scope="col">Chave</th>
          <th scope="col">Descrição</th>
          <th scope="col">Fixo</th>
          <th scope="col">Totalizador</th>
          <th scope="col">Tamanho(px)</th>
          <th scope="col">Visivel</th>
        </tr>
      </thead>
      <tbody>
        {items.map((value, index) => {
          const key = `item-${index}`;
          return (<SortableItem
            key={key}
            index={index}
            position={index}
            value={value}
            handleChange={handleChange}
          />);
        })}
      </tbody>
    </table>
  );
});

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    let newItems = arrayMove(this.props.columns, oldIndex, newIndex);
    newItems = this.reordain(newItems);
    this.props.onChange(newItems);
  };

  handleChange = (e, key) => {
    let items = this.props.columns.map((item) => {
      const virtualItem = item;
      if (item.key === key) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        virtualItem[e.target.name] = value;
        console.log(virtualItem[e.target.name], value);
      }
      return virtualItem;
    });
    if (e.target.name === 'locked') {
      items = this.reordain(items);
    }
    // this.setState({ items });
    this.props.onChange(items);
  }

  /* This is a n3 loop, probability this can be improve */
  reordain = (items) => {
    return items.map(this.reordainPositions)
      .sort(this.reordainSort)
      .map(this.reordainPositions);
  };

  reordainPositions = (item, index) => {
    const virtualItem = item;
    virtualItem.position = index;
    return virtualItem;
  }

  reordainSort = (a, b) => {
    if (a.locked && !b.locked) {
      return -1;
    }
    if (b.locked && !a.locked) {
      return 1;
    }
    return a.position - b.position;
  }

  render() {
    return (<SortableList
      items={this.props.columns}
      handleChange={this.handleChange}
      onSortEnd={this.onSortEnd}
    />);
  }
}

export default SortableComponent;
