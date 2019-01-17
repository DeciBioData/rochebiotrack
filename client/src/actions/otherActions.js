export const formatDollar = (num) => {
	num = parseInt(num)
	if(num >= 1000000000) return `$${Math.round(num / 1000000000)}B`
	else if(num >= 1000000) return `$${Math.round(num / 1000000)}M`
	else if(num >= 1000) return `$${Math.round(num / 1000)}K`
	return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}