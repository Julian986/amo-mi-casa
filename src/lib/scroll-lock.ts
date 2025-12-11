let lockCount = 0

export function lockScroll(): void {
	if (typeof document === "undefined") return
	if (lockCount === 0) {
		document.documentElement.classList.add("overflow-hidden")
	}
	lockCount++
}

export function unlockScroll(): void {
	if (typeof document === "undefined") return
	lockCount = Math.max(0, lockCount - 1)
	if (lockCount === 0) {
		document.documentElement.classList.remove("overflow-hidden")
	}
}


