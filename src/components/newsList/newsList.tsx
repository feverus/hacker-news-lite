import useNewsList from './newsList.service'
import { NewsItem } from '~/interfaces'
import NewsItemBlock from '~/components/newsItemBlock'

export function NewsList(props: {newsItems: NewsItem[]}) {
	const [state] = useNewsList(props.newsItems)

	return (
		<>
		{state.newsItems.map((newStorie, index) => { 
			return newStorie &&  
				<NewsItemBlock newStorie={newStorie} index={index} key={newStorie.id}/>
			}
		)}
		</>
	)
}

