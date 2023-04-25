import axios from "axios"
import type { NewsItem, CommentItem } from "~/interfaces";

const API_URL = 'https://hacker-news.firebaseio.com/v0/'

export const getNewsItem = async (id: number):Promise<NewsItem | undefined> => {
  try {
    const res = await axios.get(`${API_URL}item/${id}.json`)
    return res.data
  } catch (error) {
    return undefined
  }
}

export const getCommmentItem = async (id: number):Promise<CommentItem | undefined> => {
  try {
    const res = await axios.get(`${API_URL}item/${id}.json`)
    return res.data
  } catch (error) {
    return undefined
  }
}

export const getNewsItems = async (ids: number[]):Promise<NewsItem[]> => {
  let newsItems = []
  newsItems = await Promise.all(
    ids.slice(0, 100).map((id:number) => getNewsItem(id))
  )
  return newsItems.filter(item => item !== undefined) as NewsItem[]
}

export const getNewsList = async ():Promise<number[] | string> => {
  try {    
      const res = await axios.get(`${API_URL}newstories.json`)
      return res.data
  } catch (error) {
      return (error as Error).message
  }
}

  