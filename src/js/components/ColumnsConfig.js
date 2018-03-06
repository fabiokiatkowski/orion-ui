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
          name="fixed"
          type="checkbox"
          aria-label="Checkbox for locked definition"
          onChange={e => handleChange(e, value.key)}
          checked={value.fixed}
        />
      </td>
      <td>
        <select
          className="form-control"
          name="summary"
          value={value.summary}
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
  // state = {
  //   items: this.props.columnsDef
  // };

  // componentWillReceiveProps() {
  //   this.setState({
  //     items: this.reordain(this.state.items)
  //   });
  // }

  onSortEnd = ({ oldIndex, newIndex }) => {
    let newItems = arrayMove(this.props.columnsDef, oldIndex, newIndex);
    newItems = this.reordain(newItems);
    // this.setState({
    //   items: newItems
    // });
    this.props.onChange(newItems);
  };

  handleChange = (e, key) => {
    let items = this.props.columnsDef.map((item) => {
      const virtualItem = item;
      if (item.key === key) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        virtualItem[e.target.name] = value;
      }
      return virtualItem;
    });
    if (e.target.name === 'fixed') {
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
    if (a.fixed && !b.fixed) {
      return -1;
    }
    if (b.fixed && !a.fixed) {
      return 1;
    }
    return a.position - b.position;
  }

  render() {
    return (<SortableList
      items={this.props.columnsDef}
      handleChange={this.handleChange}
      onSortEnd={this.onSortEnd}
    />);
  }
}

export default SortableComponent;
