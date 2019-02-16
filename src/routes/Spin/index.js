import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/vong-quay',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Spin = require('./containers/SpinContainer').default
      const reducer = require('./modules/reducer').default

      /*  Add the reducer to the store on key 'posts'  */
      injectReducer(store, { key: 'spin', reducer })


      /*  Return getComponent   */
      cb(null, Spin)

    /* Webpack named bundle   */
    }, 'spin')
  }
})
