import type { NewsItem } from "~/interfaces"
import { useLoaderData } from "react-router-dom"
import { getNewsItems, getNewsList } from "~/api"
import NewsList from "~/components/newsList"
import NewsLayout from "~/components/newsLayout"

export const loaderIndex = async () => {
  let newsItems: NewsItem[] = []
  
  try {
		const newsIds = await getNewsList()
    if (typeof newsIds !== 'string') newsItems = await getNewsItems(newsIds)
	} catch (error) {
    return (error as Error).message
  }

  return newsItems.filter(item => item !== undefined)
}

export function Index() {
  const newsItems = useLoaderData()
  const newsItemsChild:string | JSX.Element = 
    ((typeof newsItems !== 'string') && (typeof newsItems !== null)) ?
      <NewsList newsItems={newsItems as NewsItem[]} />
      :
      newsItems as string

  return (
    <NewsLayout autoUpdateChekbox = {true} backButton = {false}>
      {newsItemsChild}
    </NewsLayout>    
  )
}
