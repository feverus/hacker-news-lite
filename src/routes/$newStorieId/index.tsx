import { useEffect } from "react"
import {observer} from "mobx-react"
import { useFetcher, useLoaderData, LoaderFunctionArgs } from "react-router-dom"
import { getNewsItem } from "~/api"
import Comment from "~/components/comment"
import NewsLayout from "~/components/newsLayout"
import NewsItemBlock from '~/components/newsItemBlock'
import { NewsItem } from '~/interfaces'
import { setStore } from "~/store/setStore"

export const loaderNewStorie = async ({params}:LoaderFunctionArgs) => {
  console.log(params)
  if (params.newStorieId)
    try {
      const res = await getNewsItem(Number(params.newStorieId))
      return res
    } catch (error) {
      return (error as Error).message
    }
}

function NewStorie() {
  const data = useLoaderData()
  const fetcher = useFetcher()
  
  useEffect(() => {
    if (setStore.forceRefresh) {
      if (typeof data !== 'string') fetcher.load('/' + (data as NewsItem)?.id)
      setStore.setForceRefresh(false)
    }
  }, [setStore.forceRefresh])

  if (typeof data == 'string') {
    return (
      <NewsLayout autoUpdateChekbox = {false} backButton = {true}>
        {data}
      </NewsLayout>
    )
  } else {
    const items = (data as NewsItem)
    items.kids?.sort((a, b) => a - b)
    return (
      <NewsLayout autoUpdateChekbox = {false} backButton = {true}>     
         {(items?.dead || items?.deleted) ?
            'Ой! Новость удалена.'
            :
            <>
              <NewsItemBlock newStorie={items} index={-1} key={items.id}/>
              {items.kids?.map(id => <Comment id={id} depth={0} key={id} />)}
            </>
         }
      </NewsLayout>
    )
  }
}

export default observer(NewStorie)