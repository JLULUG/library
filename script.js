const hash = s => Math.abs(s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0))
const colors = ['#DB2828','#F2711C','#FBBD08','#B5CC18','#21BA45','#00B5AD','#2185D0',
                '#6435C9','#A333C8','#E03997','#A5673F','#767676','#1B1C1D']

const app = Vue.createApp({
    data() {
        return {
            books_raw: [],
        }
    },
    computed: {
        books() {
            // filter out books with no stock (historical)
            // sort available books before lent out books
            return [...this.books_raw].filter(x => x.total > 0).sort((a,b) => (!!b.avail)-(!!a.avail))
        },
    },
    methods: {
        book_tags(tag_str) {
            return tag_str.split(';')        // split tag string by ;
                          .map(x=>x.trim())  // remove whitespaces
                          .filter(x=>x)      // remove empty item (consecutive ;;)
                          .map(x=>[x, colors[hash(x) % colors.length]])  // choose color by string hash
        },
    },
    async mounted() {
        this.books_raw = await (await fetch('./data.json')).json()
    },
})

app.mount('main')
