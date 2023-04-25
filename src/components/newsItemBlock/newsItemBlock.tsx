import { useNewsItemBlock } from './newsItemBlock.service'
import C from './newsItemBlock.module.scss'
import { NewsItem } from '~/interfaces'

export function NewsItemBlock(props: {newStorie: NewsItem, index: number}) {
	const [state, api] = useNewsItemBlock(props.newStorie, props.index)

	if (state.one) return (
		<div className={C.newsItem + ' gsapNewsItem'}>
			{state.content}				
		</div>
	)

	return (
		<a
			onClick={() => api.goTo('/' + props.newStorie.id.toString())}
			className={C.newsItem + ' gsapNewsItem'}
		>
			{state.content}				
		</a>
	)
}