import {observable, decorate} from 'mobx';
import { ALL_TODOS } from '../constants';

// * Filter - observable store value
export default class ViewStore {
	@observable todoBeingEdited = null;
	@observable todoFilter= ALL_TODOS;
}

// * If no decorators available
// export default class ViewStore {
// 	todoBeingEdited = null;
// 	todoFilter= ALL_TODOS;
// }

// decorate(ViewStore, {
//     todoBeingEdited: observable,
//     todoFilter: observable
// });