import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement((props) => {
  const { value, order, handleChange } = props;
  return (
    <tr>
      <th>{order}</th>
      <th>{value.key}</th>
      <td>
        <input
          name="name"
          className="form-control"
          type="text"
          placeholder="Descrição"
          value={value.name}
          onChange={e => handleChange(e, value.key)}
        />
      </td>
      <td>
        <input
          name="locked"
          type="checkbox"
          aria-label="Checkbox for locked definition"
          onChange={e => handleChange(e, value.key)}
          value={value.locked}
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
          <option value="5">Soma de valores distintos</option>
        </select>
      </td>
      <td>
        <input
          name={value.key}
          className="form-control"
          type="text"
          placeholder="Tamanho"
          value={value.width}
          onChange={e => handleChange(e, value.key)}
        />
      </td>
      <td>
        <input
          name={value.key}
          type="checkbox"
          aria-label="Checkbox for hidden definition"
          onChange={e => handleChange(e, value.key)}
          value={value.hidden}
        />
      </td>
    </tr>
  );
});

const SortableList = SortableContainer(({ items, handleChange }) => {
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
            order={index}
            value={value}
            handleChange={handleChange}
          />);
        })}
      </tbody>
    </table>
  );
});

class SortableComponent extends Component {
  state = {
    items: this.props.columnsDef
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  handleChange = (e, key) => {
    console.log(key, e);
  }

  render() {
    return (<SortableList
      items={this.state.items}
      handleChange={this.handleChange}
      onSortEnd={this.onSortEnd}
    />);
  }
}

export default SortableComponent;
