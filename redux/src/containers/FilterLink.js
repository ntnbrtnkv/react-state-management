import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

// * 3. Dispatch actions from container component 
// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

// * 2. Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
