import { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes))
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function capitalize(str: string) {
  return `${str.slice(0, 1).toUpperCase() + str.slice(1)}`
}

