import SkeletonListItem from '@/components/SkeletonListItem'

export default function Loading() {
	return (
		<div className='flex flex-wrap justify-center max-w-[1100px] mx-auto px-[20px] py-24 gap-20'>
			{Array.from({ length: 6 }).map((_: unknown, i: number) => (
				<SkeletonListItem key={i} />
			))}
		</div>
	)
}
