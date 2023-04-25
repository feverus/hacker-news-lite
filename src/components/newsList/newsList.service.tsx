import { useState, useEffect } from 'react'
import { UseNewsList } from "./newsList.props"
import { getNewsItems, getNewsList } from "~/api"
import { setStore } from '~/store/setStore'

const useNewsList:UseNewsList = (newsItems) => {
	const autoUpdateInterval = 60000
	const [items, setItems] = useState(newsItems)
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

	const updateIds = async () => {
		console.log('Попытка обновления списка новостей')
		
		const ids = items.map(item => item.id)

		let newIds = await getNewsList()
		if (typeof newIds === 'string') {
			console.log('Ошибка получения списка новостей: ',newIds) 
			return
		}
		
		newIds = newIds.slice(0, 100)
		const missedIds = newIds.filter(id => !ids.includes(id))
		if (missedIds.length === 0) {
			console.log('Новых новостей нет') 
			return
		}

		const missedNews = await getNewsItems(missedIds)
		let newItems = missedNews.concat(items)
		newItems = newItems.filter(item => (newIds as number[]).includes(item.id))

		console.log('Новых новостей: ' + missedNews.length)
		setItems(newItems)
	}

	useEffect(() => {
		setStore.forceRefresh && updateIds()
		setStore.setForceRefresh(false)
	}, [setStore.forceRefresh])

	useEffect(() => {
		if (setStore.autoRefresh) {
			const intervalUpdate = setInterval(updateIds, autoUpdateInterval)
			setIntervalId(intervalUpdate)
			return function cleanup() {
					clearInterval(intervalUpdate)
			}
		} else {
			intervalId && clearInterval(intervalId) 
		}
	}, [setStore.autoRefresh])
	

	const state = {
		newsItems: items,
	}
	const api = {
		updateIds: updateIds,
	}
	
	return (
		[state, api]
	)
}

export default useNewsList