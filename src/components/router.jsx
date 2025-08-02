import { createHashRouter } from 'react-router-dom'

import Index from '../pages/index'
import Jill from '../pages/jill'
import Main from '../pages/main'
import Stream from '../pages/stream'

const router = createHashRouter([
  { path: '/', element: <Index /> },
  { path: '/jill', element: <Jill /> },
  { path: '/main', element: <Main /> },
  { path: '/stream', element: <Stream /> }
])

export default router
