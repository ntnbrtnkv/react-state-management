import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';
import { computed } from 'mobx';

// * Observer is a reaction - update virtual DOM on store changes
@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoStore, viewStore} = this.props;
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				id="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<label htmlFor="toggle-all"></label>
			<ul className="todo-list">
				{this.visibleTodos.map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
					/>)
				)}
			</ul>
		</section>
	}

	// * Computed value, try to comment next line and watch console
	@computed
	get visibleTodos() {
		console.log(`Compute visible todos: ${this.props.viewStore.todoFilter}`);
		return this.props.todoStore.todos.filter(todo => {
			switch (this.props.viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	// * Action inside TodoStore
	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
