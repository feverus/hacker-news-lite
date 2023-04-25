import { Suspense } from "react"
import { Await, defer, useLoaderData } from "react-router-dom"
import { getNewsItems, getNewsList } from "~/api"
import NewsList from "~/components/newsList"
import NewsLayout from "~/components/newsLayout"
import Loader from "~/components/loader"
import type { NewsItem } from "~/interfaces"

async function dataLoader() {
  let newsItems: NewsItem[] = []
  
  try {
		const newsIds = await getNewsList()
    if (typeof newsIds !== 'string') newsItems = await getNewsItems(newsIds)
	} catch (error) {
    return (error as Error).message
  }

  return newsItems.filter(item => item !== undefined)
}

export const loaderIndex = async () => {
  const dataLoaderPromise = dataLoader()

  return defer({
    newsItems: dataLoaderPromise,
  })
}

export function Index() {
  const data = useLoaderData() as {newsItems: string | NewsItem[]}

  return (
    <Suspense
      fallback={
        <NewsLayout autoUpdateChekbox = {true} backButton = {false}>          
          <Loader />
        </NewsLayout>  
      }
    >
      <NewsLayout autoUpdateChekbox = {true} backButton = {false}>
          <Await
            resolve={data.newsItems}
            errorElement={
              <p>Error loading package location!</p>
            }
          >
            {(newsItems) => (
              ((typeof newsItems !== 'string') && (typeof newsItems !== null)) ?
                <NewsList newsItems={newsItems as NewsItem[]} />
                :
                newsItems as string
            )}
          </Await>
      </NewsLayout>    
    </Suspense>
  )
}
