import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialItems } from '../lib/constants'

export const useItemsStore = create(
	persist((setFunction: any) => ({
		items: initialItems,
		removeAllItems: () => {
			setFunction(() => ({ items: [] }))
		},
		resetToInitial: () => {
			setFunction(() => ({ items: initialItems }))
		},
		markAllAsComplete: () => {
			setFunction(({ items }: any) => {
				return {
					items: items.map((el: any) => ({
						...el,
						packed: true,
					})),
				}
			})
		},
		markAllAsIncomplete: () => {
			setFunction(({ items }: any) => {
				return {
					items: items.map((el: any) => ({
						...el,
						packed: false,
					})),
				}
			})
		},
		toggleItem: (id: number) => {
			setFunction(({ items }: any) => {
				const newItems = items.map((el: any) => {
					if (String(el.id) === String(id)) return { ...el, packed: !el.packed }
					return el
				})
				return {
					items: newItems,
				}
			})
		},
		addItem: (inputValue: string) => {
			setFunction(({ items }: any) => {
				const newItem = {
					id: new Date().getTime(),
					name: inputValue,
					packed: false,
				}
				const newArr = [newItem, ...items]

				return {
					items: newArr,
				}
			})
		},
		deleteItem: (id: number) => {
			setFunction(({ items }: any) => {
				const newItems = items.filter((el: any) => String(el.id) !== String(id))
				return {
					items: newItems,
				}
			})
		},
	}), {
    name: 'items'
  })
)
