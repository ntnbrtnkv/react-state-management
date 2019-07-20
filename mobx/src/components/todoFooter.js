import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action, configure} from 'mobx';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

// * 7. Enforce changing state only from @actions
// configure({
// 	enforceActions: true
// });

// * 2. Declare, that our class is interested in stores updates
@observer
export default class TodoFooter extends React.Component {
	render() {
		const todoStore = this.props.todoStore;
		if (!todoStore.activeTodoCount && !todoStore.completedCount)
			return null;

		const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					{this.renderFilterLink(ALL_TODOS, "All")}
					{this.renderFilterLink(ACTIVE_TODOS, "Active")}
					{this.renderFilterLink(COMPLETED_TODOS, "Completed")}
				</ul>
				{ todoStore.completedCount === 0
					? null
					: 	<button
							className="clear-completed"
							onClick={this.clearCompleted}>
							Clear completed
						</button>
				}
			</footer>
		);
	}

	// * 1. View store is just a prop
	renderFilterLink(filterName, caption) {
		return (
			<li>
				<a
					href="#/"
					onClick={() => this.props.viewStore.todoFilter = filterName}
					className={filterName === this.props.viewStore.todoFilter ? "selected" : ""}>
					{caption}
				</a>
				{' '}
			</li>
		);
	}

	@action
	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
}

TodoFooter.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
