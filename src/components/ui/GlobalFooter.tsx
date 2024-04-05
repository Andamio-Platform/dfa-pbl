import Image from "next/image";

export default function GlobalFooter() {
	return (
		<footer className='footer px-24 py-10 text-primary-content mt-12'>
			<Image
				src='/DFALogotransp.png'
				width={80}
				height={80}
				alt='andamio'
				className='rounded-full'
			/>
			<nav>
				<header className='footer-title'>SingularityNet</header>
				<a className='link link-hover' href='https://discord.gg/snet'>
					Discord
				</a>
				<a
					className='link link-hover'
					href='https://twitter.com/SingularityNET'>
					Twitter
				</a>
				<a
					className='link link-hover'
					href='https://singularitynet.io/roadmap/'>
					Roadmap
				</a>
			</nav>
			<nav>
				<header className='footer-title'>Deep Funding</header>
				<a className='link link-hover' href='https://deepfunding.ai/'>
					Website
				</a>
				<a className='link link-hover' href='https://twitter.com/DeepFunding'>
					Twitter
				</a>
				<a
					className='link link-hover'
					href='https://www.youtube.com/@deepfunding'>
					YouTube
				</a>
			</nav>
			<nav>
				<header className='footer-title'>Deep Funding Academy</header>
				<a className='link link-hover' href='https://twitter.com/DeepFunding'>
					Twitter
				</a>
				<a className='link link-hover' href='https://deepfunding.academy/'>
					Website
				</a>
			</nav>
		</footer>
	);
}
