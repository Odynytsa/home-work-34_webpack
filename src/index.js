import Post from './post.js'
import { createStatistics } from './statistics.js'
import './styles.css'

console.log('Webpack works!')

const post = new Post('Webpack Post Title')

console.log('Post to string:', post.toString())

window.statistics = createStatistics()
