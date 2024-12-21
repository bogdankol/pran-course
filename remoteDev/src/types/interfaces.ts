export interface IJobItem {
	badgeLetters: string
	company: string
	daysAgo: number
	id: number
	relevanceScore: number
	title: string
}

export interface IJobItemById extends IJobItem{
  companyURL: string
  coverImgURL: string
  description: string
  duration: string
  location: string
  qualifications: string[]
  reviews: string[]
  salary: string
}