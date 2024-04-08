import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return (
		<main className='flex-grow min-h-screen-mins-header-footer'>
			<div className='relative isolate overflow-hidden'>
				<div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
					<div className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
						<h1 className='text-6xl my-10 font-bold leading-[5rem] text-primary-content'>
							Deep Funding Academy
						</h1>
						<div className='flex flex-row gap-5 my-5'>
							<div className='btn bg-info btn-md rounded-lg drop-shadow text-black hover:bg-black hover:text-primary-content hover:border-solid hover:border-white'>
								<Link href='/course'>Start the Course</Link>
							</div>
							<div className='btn bg-info btn-md rounded-lg drop-shadow text-black hover:bg-black hover:text-primary-content hover:border-solid hover:border-white'>
								<Link href='https://deepfunding.academy/'>Learn More</Link>
							</div>
						</div>
					</div>
					<div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
						<div className='max-w-3xl flex-none rounded-xl p-3 sm:max-w-5xl lg:max-w-none'>
							<Link href='https://deepfunding.ai/'>
								<img
									src='/deepfunding-website-screenshot.png'
									alt='App screenshot'
									width={1623}
									height={894}
									className='w-[76rem] rounded-md opacity-75 hover:transform hover:scale-105 hover:shadow-white hover:shadow-md'
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
