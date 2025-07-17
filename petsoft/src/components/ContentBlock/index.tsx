export default function ContentBlock({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='bg-bg4 shadow-sm rounded-md overflow-hidden h-full w-full'>{children}</div>
	)
}
