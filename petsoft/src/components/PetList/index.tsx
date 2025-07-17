import Image from 'next/image'

export default function PetList() {
	return (
		<ul className='bg-white border-b border-black/[0.08]'>
			<li>
				<button className='flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-color1 focus:bg-color1 transition'>
					<Image 
						src='https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png'
						alt='Pet image'
						title="Pet image"
						width={45}
						height={45}
						className='rounded-full object-cover'
					/>

					<p className='font-semibold'>Benjamin</p>
				</button>
			</li>

			<li>
				<button className='flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-color1 focus:bg-color1 transition'>
					<Image 
						src='https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png'
						alt='Pet image'
						title="Pet image"
						width={45}
						height={45}
						className='rounded-full object-cover'
					/>

					<p className='font-semibold'>Benjamin 2</p>
				</button>
			</li>
		</ul>
	)
}
