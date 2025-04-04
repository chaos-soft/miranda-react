import { createHashRouter } from 'react-router-dom'

import Index from '../pages/index'
import Jill from '../pages/jill'
import Main from '../pages/main'
import Stream from '../pages/stream'
import TwoB from '../pages/2b'

const router = createHashRouter([
  { path: '/', element: <Index /> },
  { path: '/2b', element: <TwoB /> },
  { path: '/jill', element: <Jill /> },
  { path: '/main', element: <Main /> },
  { path: '/stream', element: <Stream /> }
])

export default router
