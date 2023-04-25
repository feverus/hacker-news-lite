import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import {Index, loaderIndex} from '~/routes'
import NewStorie, {loaderNewStorie} from '~/routes/$newStorieId'
import {setStore} from './store/setStore'


const stores = {
  setStore,
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: loaderIndex,
  },
  {
    path: ":newStorieId",
    element: <NewStorie />,
    loader: loaderNewStorie,
  }
], {
  basename: '/hacker-news-lite',
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider {...stores}>
      <RouterProvider router={router} />
  </Provider>
)