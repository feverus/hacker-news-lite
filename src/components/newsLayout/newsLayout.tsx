import useAnimations from './newsLayout.service'
import C from './newsLayout.module.scss'
import Header from "~/components/header"

type P = {
    children: JSX.Element | string,
		autoUpdateChekbox: boolean,
		backButton: boolean,
}

export function NewsLayout(props: P) {
  const {mainRef} = useAnimations();

	return (  		
		<div className={C.wrapper} ref={mainRef}>
			<Header 			
				autoUpdateChekbox = {props.autoUpdateChekbox}
				backButton = {props.backButton}
			/>	
			<main>			
				{props.children}
			</main>
		</div>
	)
}