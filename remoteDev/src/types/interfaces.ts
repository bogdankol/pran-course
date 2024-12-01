export interface IJobItem {
	badgeLetters: string
	company: string
	daysAgo: number
	id: number
	relevanceScore: number
	title: string
}

export interface IJobItemById {
  badgeLetters: string
  company: string
  companyURL: string
  coverImgURL: string
  daysAgo: number
  description: string
  duration: string
  id: number
  location: string
  qualifications: string[]
  relevanceScore: number
  reviews: string[]
  salary: string
  title: string
}