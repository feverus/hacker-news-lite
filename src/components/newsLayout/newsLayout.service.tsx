import { useRef, useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setStore } from '~/store/setStore'

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const useAnimations = () => {
  const mainRef = useRef<HTMLDivElement | null>(null)

	const newsItemsTrigger = (item: gsap.DOMTarget) => {
		return {
			trigger: item,
			start: 'top bottom',
			end: "+=500",
		}
	}

	const newsItemStages = [
		{ autoAlpha: 0, xPercent: -100, scale: 0.1, duration: 0.15 },
		{ autoAlpha: 0.5, xPercent: 0, scale: 0.5, duration: 0.15 },
		{ autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.15 }
	]

	const headerStages = [
		{ autoAlpha: 0, yPercent: -100, duration: 0.15 },
		{ autoAlpha: 0.5, yPercent: 0, duration: 0.15 },
		{ autoAlpha: 1, yPercent: 0, duration: 0.15 }
	]

	const clearPage = () => {
		console.log('clearPage')

		setStore.setForceReverce(true)
	}

  useEffect(() => {		
    const ctx = gsap.context((self) => {	
			if ((self !== undefined) && (self.selector !== undefined)) {		

      	const newsItem = self.selector('.newsItem')
				newsItem.forEach((item: gsap.DOMTarget) => {
					gsap
						.set(item, newsItemStages[0]);
					gsap
						.timeline( {scrollTrigger: newsItemsTrigger(item), paused: true} )
						.to(item,	newsItemStages[1])		
						.to(item,	newsItemStages[2])		
				})

      	const headerButtons = self.selector('header>button, header>.box')
				headerButtons.forEach((item: gsap.DOMTarget) => {
					gsap
						.set(item, headerStages[0]);
					gsap
						.timeline()
						.to(item,	headerStages[1])		
						.to(item,	headerStages[2])		
				})
				
			}			
    }, mainRef);
  }, [])

	useEffect(() => {
		
		if (setStore.forceReverce) {
			const ctx = gsap.context((self) => {			

				if ((self !== undefined) && (self.selector !== undefined)) {	
	
					const newsItem = self.selector('.newsItem')
					newsItem.forEach((item: gsap.DOMTarget) => {
						gsap
							.timeline()
							.to(item,	newsItemStages[1])		
							.to(item,	newsItemStages[0])
					})
	
					const headerButtons = self.selector('header>button, header>.box')
					headerButtons.forEach((item: gsap.DOMTarget) => {
						gsap
							.timeline()
							.to(item,	headerStages[1])		
							.to(item,	headerStages[0])		
					})
					
					const comments = self.selector('.comment_block, .comment.delay')
					comments.forEach((item: gsap.DOMTarget) => {
						gsap
							.timeline()
							.to(item,	newsItemStages[1])		
							.to(item,	newsItemStages[0])
					})

				}			
			}, mainRef);	

			setStore.setForceReverce(false)
		}		
	}, [setStore.forceReverce])
	
	useEffect(() => {
		window.onpopstate = () => { setStore.setForceReverce(true) }
	})

  return {
		mainRef: mainRef, 
		clearPage: clearPage,
	}
	
}

export default useAnimations