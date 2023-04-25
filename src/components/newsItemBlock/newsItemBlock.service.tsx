import { commentsOfNum, dateStampToDate } from '~/service/textFunction'
import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { UseNewsItemBlock } from './newsItemBlock.props'
import { setStore } from '~/store/setStore'
import { emptyNewsItem } from '~/interfaces'

export const useNewsItemBlock: UseNewsItemBlock = (newStorie, index) => {
	const [publishDateSafe, setPublishDateSafe] = useState('Недавно')
	const navigate = useNavigate()

	if (newStorie === undefined) newStorie = emptyNewsItem

	const goTo = (page: string) => {
		setStore.setForceReverce(true)
		navigate(page)
	}

	useEffect(() => {
		const publishDate = dateStampToDate(newStorie.time)
		setPublishDateSafe(publishDate)
	}, [])

	const one = index === -1	

	const title = one? 
		<h1>{newStorie.title}</h1>
		:
		<><span>{newStorie.id}</span> : <h1>{newStorie.title}</h1></>
	
	const link = one?	
		<div className='link'>
			<a href = {newStorie.url}
				className='cut'>
				{newStorie.url}
			</a>
		</div>
		:
		''

	const score = one?
		''
		:
		<><span>Рейтинг:</span> {newStorie.score}</>

	const comments = (newStorie.descendants === 0)?
		'Без комментариев'
		:
		`${newStorie.descendants} ${commentsOfNum(newStorie.descendants)}`

	const content = <>
		<div>
			{title}
		</div>
		{link}
		<div className='comments'>
			{comments}
		</div>
		<div className='status'>
			<div>{score}</div>
			<div><span>Автор:</span> {newStorie.by}</div>
			<div><span>Дата публикации:</span> {publishDateSafe}</div>
		</div>
	</>

  const state = {
    one,
    content
  }
  const api = {
    goTo,
  }

  return (
		[state, api]
	)

}
